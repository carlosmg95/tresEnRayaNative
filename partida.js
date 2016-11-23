import React, { Component } from 'react';
import { StyleSheet,View,TouchableHighlight,Text } from 'react-native';
import MyButton from './src/js/MyButton';

const Cabecera = require('./src/js/Cabecera');
const Tablero = require('./src/js/Tablero');
const styles = StyleSheet.create({
	  button: {
		padding: 5, 
		margin: 3, 
		fontSize: 15,
		backgroundColor: 'white', 
		color: 'black', 
		textAlign: 'center',
		borderWidth: 2, 
		borderColor: 'black'
	}
});
var PartidaScene = React.createClass({
	render: function(){
		var state = this.props.state;
		var texto = state.turno.text ? "Turno del " + state.turno.text : "" + state.turno;
		return (
			<View style={{flex: 1, margin: 10}}>
				<Cabecera texto={texto}/>
				<Tablero valores={state.valores} name={state.turno.name} manejadorTableroClick={this.props.manejadorTableroClick} fin={state.fin} />
				<View>
					<TouchableHighlight onPress={this.props.reiniciar}>
                		<Text style={styles.button}>Reiniciar Partida</Text> 
                	</TouchableHighlight>
                	<TouchableHighlight onPress={this.props.guardar}>
                		<Text style={styles.button}>Guardar Partida</Text> 
                	</TouchableHighlight>
                	<TouchableHighlight onPress={this.props.retomar}>
                		<Text style={styles.button}>Continuar Partida Guardada</Text> 
                	</TouchableHighlight>
                </View>
                <View style={{
                	flexDirection:'row',
                	justifyContent:'space-around',
                	}}>
				<MyButton onPress={this.props.onBack}  text={"Volver"} />
				<MyButton onPress={this.props.onForward}  text={"Ver Historial"} />
				</View>
			</View>
		)
	}
});

export default PartidaScene;