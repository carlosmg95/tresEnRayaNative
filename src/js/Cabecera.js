import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

var Cabecera = React.createClass({
    render: function() {
        return (
            <Text style={styles.cabecera}>
                {this.props.texto}
            </Text>
        );
    }
});

 const styles = StyleSheet.create({
  cabecera: {
    padding: 5,
    fontSize: 25,
    marginBottom: 20
      },
 });

module.exports = Cabecera;
