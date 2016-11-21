import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

//import { Button } from 'react-bootstrap';

const styles = StyleSheet.create({
 casillaStyle: {
  flex: 1,
  padding: 10,
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 1,
  borderColor: "black"
 },
 casillaStyleText: {
  fontSize: 60
 }
});

let Casilla = React.createClass({
   _casillaClick: function () {
        if(this.props.valor === "-" && !this.props.fin) {
            this.props.manejadorClick(this.props.indiceFila, this.props.indiceColumna);
        }
    },
    
    render: function() {
        return (
            <TouchableHighlight style={styles.casillaStyle} 
                                onPress={this._casillaClick} 
                                disabled={this.props.valor !== "-"}>
              <Text style={styles.casillaStyleText}>{this.props.valor}</Text> 
            </TouchableHighlight>
        )
    }
});

module.exports = Casilla;
