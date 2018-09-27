import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import axios from 'axios';

export default class Home extends PureComponent {
    state = {
        lista: [],
    };

    componentDidMount = () => {
        axios.get('http://dev.4all.com:3003/tarefa')
            .then( ({data, status}) => {
                if (status === 200) {
                    this.setState({ lista: data.lista })
                }
            })
    };

    renderLista = () => (
        this.state.lista.map((item, index) => (
            
            <TouchableOpacity
                style={styles.item}
                key={index}
                onPress= {() => this.props.navigation.navigate('Principal', {id:item})}
            >
                <Text>{item}</Text>
            </TouchableOpacity>
        ))
    );

    render = () => ( 
        <View style={styles.container}>
            {this.renderLista()}
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
      margin: 5,
      paddingHorizontal: 5,
  },
});