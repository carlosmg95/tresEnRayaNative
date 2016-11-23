import React, { Component } from 'react';
import { Text,View,TouchableHighlight, AsyncStorage,ListView } from 'react-native';
import { Navigator } from 'react-native';

import IndexScene from '../../inicio';
import PartidaScene from '../../partida';
import RecordScene from '../../historial';

//import { PageHeader } from 'react-bootstrap';
//import { Button } from 'react-bootstrap';

const Cabecera = require("./Cabecera");
const Tablero = require("./Tablero");
const Marcador = require("./Marcador");

let n=0;
let JUGADORX = {name: "JUGADORX", text: "jugador 1 - las X", points: 0};
let JUGADOR0 = {name: "JUGADOR0", text: "jugador 0 - los 0", points: 0};
const VALORES = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
let jugadores = [JUGADOR0, JUGADORX];

var horizontal = function(valores, numeroFila) {
    return valores[numeroFila][0] === valores[numeroFila][1] && valores[numeroFila][0] === valores[numeroFila][2];
};

var vertical = function(valores, numeroColumna) {
    return valores[0][numeroColumna] === valores[1][numeroColumna] && valores[0][numeroColumna] === valores[2][numeroColumna];
};


var diagonal = function(valores) {
    let diagonal1 = [[valores[0][0], valores[1][1], valores[2][2]], ['-', '-', '-']];
    let diagonal2 = [[valores[0][2], valores[1][1], valores[2][0]], ['-', '-', '-']];

    return (diagonal1[0].indexOf('-') < 0 && horizontal(diagonal1, 0)) || (diagonal2[0].indexOf('-') < 0 && horizontal(diagonal2, 0));
};

var App = React.createClass({
    getInitialState: function() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            turno: JUGADORX,
            valores: VALORES,
            fin: false,
            dataSource: ds
        };
    },

    componentDidMount: function() {
        const actions = [];
        dataSource= this.state.dataSource.cloneWithRows(actions);
        this.setState({dataSource: dataSource});
    },

    ganador: function(valores, numeroFila, numeroColumna) {
        if(horizontal(valores, numeroFila) || vertical(valores, numeroColumna) || diagonal(valores)) {
            alert("El ganador es el " + this.state.turno.name);
            this.setState({
                turno: "Juego acabado",
                fin: true
            });
        } else if (JUGADORX.points + JUGADOR0.points >= 9) {
            alert("Empate");
            this.setState({
                turno: "Juego acabado",
                fin: true
            });
        }
    },

    _getActionsFromDataSource: function() {
        let actions = [];
        for(var i=0; i<this.state.dataSource.getRowCount(); i++){
            actions.push(this.state.dataSource.getRowData(0,i));
        }
        return actions;
    },

    appClick: async function(numeroFila, numeroColumna) {
        let valores = this.state.valores;
        let nuevoValor = (this.state.turno === JUGADORX) ? 'X' : '0';
        let action = 'Jugador de las ' + nuevoValor + ' seleccionó la casilla [' + numeroFila + ',' + numeroColumna + ']';
        let actions = this._getActionsFromDataSource();
        actions.push(action);
        dataSource = this.state.dataSource.cloneWithRows(actions);

        valores[numeroFila][numeroColumna] = nuevoValor;

        this.state.turno.points++;
        this.setState({
            turno: (this.state.turno === JUGADORX) ? JUGADOR0 : JUGADORX,
            valores: this.state.valores,
            dataSource: dataSource
        });
        this.ganador(valores, numeroFila, numeroColumna);
    },

    _reiniciaDataSource: function() {
        actions = [];
        dataSource = this.state.dataSource.cloneWithRows(actions);
        this.setState({dataSource: dataSource});
    },

    reiniciar: function() {
        JUGADORX.points = 0;
        JUGADOR0.points = 0;
        this.setState({
            turno: JUGADORX,
            valores: [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']],
            fin: false,
         
        });
        this._reiniciaDataSource();
    },

    guardar: async function() {
        try {
            await AsyncStorage.setItem('@Store:estado', JSON.stringify(this.state));
        } catch (error) {
            alert('fallo al guardar');
        }
    },

    retomar: async function() {
        try {
            const value = await AsyncStorage.getItem('@Store:estado');
            if (value !== null){
                // We have data!! 
                var state = JSON.parse(value);
                this.setState(state);
            }
        } catch (error) {
             // Error retrieving data
             alert('error al recuperar partida');
             alert(error);
        }
    },

 
    _renderRow: function(action) {
        return(
            <View style={{flexDirection: 'row'}}>
                <Text tyle={{fontsize: 30}}>{action}</Text>
            </View>
        )
    },

    render: function() {
        //var texto = this.state.turno.text ? "Turno del " + this.state.turno.text : "" + this.state.turno;
        const routes = [
            {title: 'Index', index: 0},
            {title: 'Partida', index: 1},
            {title: 'Historial', index:2}
        ];
        return (
            <Navigator
            initialRoute={routes[0]}
            initialRouteStack={routes}
            renderScene={(route, navigator) => {
                var onForward = function(){
                    const nextIndex = route.index + 1;
                    if(typeof routes[nextIndex] == "object"){
                        navigator.push(routes[nextIndex])
                    }
                }
                var onBack = function(){
                    if (route.index > 0){
                        navigator.pop();
                    }
                }
                switch(route.index){
                    case 0:
                        return <IndexScene onForward={onForward} onBack={onBack} />
                    case 1:
                        return <PartidaScene onForward={onForward} onBack={onBack} state={this.state} manejadorTableroClick={this.appClick} reiniciar={this.reiniciar} guardar={this.guardar} retomar={this.retomar} />
                    case 2:
                        return <RecordScene onForward={onForward} onBack={onBack} renderRow={this._renderRow} state={this.state}/>
                }
            }}
            />
        );
    }
});

module.exports = App;
