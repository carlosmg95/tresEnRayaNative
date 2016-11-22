import React, { Component } from 'react';
import { Text,View,TouchableHighlight, AsyncStorage } from 'react-native';
import { Navigator } from 'react-native';

import IndexScene from '../../inicio';
import PartidaScene from '../../partida';

//import { PageHeader } from 'react-bootstrap';
//import { Button } from 'react-bootstrap';

const Cabecera = require("./Cabecera");
const Tablero = require("./Tablero");
const Marcador = require("./Marcador");

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
        return {
            turno: JUGADORX,
            valores: VALORES,
            fin: false
        };
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

    appClick: function(numeroFila, numeroColumna) {
        let valores = this.state.valores;
        let nuevoValor = (this.state.turno === JUGADORX) ? 'X' : '0';
        valores[numeroFila][numeroColumna] = nuevoValor;
        this.state.turno.points++;
        this.setState({
            turno: (this.state.turno === JUGADORX) ? JUGADOR0 : JUGADORX,
            valores: this.state.valores
        });
        this.ganador(valores, numeroFila, numeroColumna);
    },

    reiniciar: function() {
        JUGADORX.points = 0;
        JUGADOR0.points = 0;
        this.setState({
            turno: JUGADORX,
            valores: [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']],
            fin: false
        });
    },
    guardar: async function() {
        try {
            await AsyncStorage.setItem('@Store:estado', JSON.stringify(this.state));
            alert('guardado con exito');
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
             alert(error);
        }
    },

    render: function() {
        //var texto = this.state.turno.text ? "Turno del " + this.state.turno.text : "" + this.state.turno;
        const routes = [
            {title: 'Index', index: 0},
            {title: 'Partida', index: 1},
        ];
        return (
            <Navigator
            initialRoute={routes[0]}
            initialRouteStack={routes}
            renderScene={(route, navigator) => {
                var onForward = function(){
                    const nextIndex = route.index + 1;
                    this.reiniciar
                    if(typeof routes[nextIndex] == "object"){
                        this.reiniciar
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
                }
            }}
            />
        );
    }
});

module.exports = App;
