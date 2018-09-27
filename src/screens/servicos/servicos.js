import React,{ PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Servicos extends PureComponent {
    render = () => (
        <View style={styles.container}>
            <Text>Serviços</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});