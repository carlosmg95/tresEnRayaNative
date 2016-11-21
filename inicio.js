import React, { Component } from 'react';
import { View } from 'react-native';
import MyButton from './src/js/MyButton';

var IndexScene = React.createClass({
	render: function(){
		return (
			<View>
				<MyButton onPress={this.props.onForward}  text={"Iniciar partida"} />
			</View>
		)
	}
});

module.exports = IndexScene;