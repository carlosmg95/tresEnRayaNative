import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

var MyButton = React.createClass({
	render: function(){
		return (
			<TouchableHighlight onPress={this.props.onPress}>
			<Text style={styles.mybutton}>{this.props.text}</Text>
			</TouchableHighlight>
		)
	}
});
const styles = StyleSheet.create({
	mybutton: {
		padding: 10, 
		margin: 20, 
		fontSize: 25,
		backgroundColor: 'white', 
		color: 'black', 
		borderWidth: 3, 
		borderColor: 'black'
	}
});
export default MyButton;
