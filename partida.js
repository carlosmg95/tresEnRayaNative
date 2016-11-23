import React, { Component } from 'react';
import { View,TouchableHighlight,Text } from 'react-native';
import MyButton from './src/js/MyButton';

const Cabecera = require('./src/js/Cabecera');
const Tablero = require('./src/js/Tablero');

var PartidaScene = React.createClass({
	render: function(){
		var state = this.props.state;
		var texto = state.turno.text ? "Turno del " + state.turno.text : "" + state.turno;
		return (
			<View style={{flex: 1, margin: 10}}>
				<Cabecera texto={texto}/>
				<Tablero valores={state.valores} name={state.turno.name} manejadorTableroClick={this.props.manejadorTableroClick} fin={state.fin} />
				<TouchableHighlight onPress={this.props.reiniciar}>
                	<Text>Reiniciar Partida</Text> 
                </TouchableHighlight>
                <TouchableHighlight onPress={this.props.guardar}>
                	<Text>Guardar Partida</Text> 
                </TouchableHighlight>
                <TouchableHighlight onPress={this.props.retomar}>
                	<Text>Continuar Partida Guardada</Text> 
                </TouchableHighlight>
                <MyButton onPress={this.props.onForward}  text={"Ver Historial"} />
				<MyButton onPress={this.props.onBack}  text={"Volver"} />
			</View>
		)
	}
});

export default PartidaScene;