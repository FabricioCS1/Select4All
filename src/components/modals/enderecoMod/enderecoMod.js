import React,{ PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Modal from 'react-native-modal';

export default class EnderecoMod extends PureComponent {
  state = {
    modalVisible: false,
  };

    setModalVisible(visible) {
    this.setState({modalVisible: visible});
  };
    render = () => (
//renderização do container modal
    <Modal
      style={styles.modalContainer}
      animationType="slide"
      transparent= {true}
      visible={this.state.modalVisible}
      onRequestClose={() => {
        alert('Modal has been closed.');
      }}
    >

{/* elementos visíveis do componente */}
      <View style={styles.container}>
        <Text style={styles.txt}>{this.props.info.endereco}.</Text>
        <Text style={styles.txt}>{this.props.info.bairro}, {this.props.info.cidade}.</Text>
      
        <TouchableOpacity
          style={styles.btn} 
// método de alteração do estado de visibilidade do modal
          onPress={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <Text>
            Fechar
          </Text>
        </TouchableOpacity>
      </View>

    </Modal>
  );
};
const styles = StyleSheet.create ({
  modalContainer: {
    paddingHorizontal: 30,
  },
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 15,
    elevation: 10,
  },
  txt: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    fontSize: 14,
    color: '#cb8a19',
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginTop: 15,
    elevation: 1,
  },
});