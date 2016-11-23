import React, { Component } from 'react';
import { View,ListView,AsyncStorage,Text } from 'react-native';
import MyButton from './src/js/MyButton';

var RecordScene = React.createClass({
	render: function(){
		return (
			<View style={{flex: 1, marginTop: 25}}>
				<ListView dataSource={this.props.state.dataSource} renderRow={this.props.renderRow} enableEmptySections={true}/>
				<MyButton onPress={this.props.onBack}  text={"Volver a la partida"} />
			</View>			
		);
	}
});

module.exports = RecordScene;