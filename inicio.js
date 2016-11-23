import React, { Component } from 'react';
import { View } from 'react-native';
import MyButton from './src/js/MyButton';

var IndexScene = React.createClass({
	render: function(){
		return (
			<View style={{
				flex:1,
				flexDirection:'column',
				alignItems:'center',
				justifyContent:'center',
			}}
			>
				<MyButton  onPress={this.props.onForward}  text={"Iniciar partida"} />
			</View>
		)
	}
});

module.exports = IndexScene;