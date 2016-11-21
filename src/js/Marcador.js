const PANEL_STYLE = {
    float: 'left',
    marginLeft: '10px',
    marginTop: '10px',
    width: '110px'
};

import React, { Component } from 'react';
import { StyleSheet, View, ListView,Text} from 'react-native';

//import { Panel } from 'react-bootstrap';

var Marcador = React.createClass({
    render: function() {
        let marcador = this.props.jugadores.map(function(jugador) {
            let myKey = jugador.name;
            return(
                //<Panel style={PANEL_STYLE} key={myKey} header={jugador.name}>
                  //  {jugador.points}
                //</Panel>
                <View><Text>{jugador.points}</Text></View>
            );
        }, this);
        return(<View>{marcador}</View>);
    }
});

module.exports = Marcador;