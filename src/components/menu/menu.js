import React,{ PureComponent } from 'react';
import { View, Text, Image, Linking, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

//Componente necessário para acionar a transição da tela principal através de uma função filha
import { withNavigation } from 'react-navigation';

import EnderecoMod from '../modals/enderecoMod/enderecoMod';

const { width, height } = Dimensions.get("window");

class Menu extends PureComponent {

//Metodo de chamada do aplicativo de ligação do dispositivo, passando número de telefone retornado pela API
  callNumber = (url) =>{
      Linking.canOpenURL(url).then(supported => {
      if (!supported) {
       console.log('Can\'t handle url: ' + url);
      } else {
       return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

//função que rola a tela principal automaticamente até os comentários, usando como referência a altura da tela do dispositivo para obter maior precisão
  onButtonPress = () => {
    this.props.scroll.scrollTo({x: height*1, y: height*1.07, animated: true});
  }
 

  render = () => (
    <View style={[styles.container]}>
      
{/* renderização do modal do botão de endereço, passando como props para o mesmo o resultado da API necessário */}
      <EnderecoMod ref={c => this.enderecoModal = c}
        info={this.props.info}
      />

      <TouchableOpacity style={styles.button}
        onPress={() => 
          this.callNumber(`tel:0${this.props.info.telefone}`)
        }
      >
        <Image
          source={require('../../assets/imgs/ligar.png')}
          style={styles.icons}
        />
        <Text style={styles.btnTxt}>Ligar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}
        onPress= {() => 
          this.props.navigation.navigate('Servicos')
        }
      >
        <Image
          source={require('../../assets/imgs/servicos.png')}
          style={styles.icons}
        />
        <Text style={styles.btnTxt}>Serviços</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}
        onPress={() => {
          this.enderecoModal.setModalVisible(true);
        }}
      >
        <Image
          source={require('../../assets/imgs/pin.png')}
          style={styles.icons}
        />
        <Text style={styles.btnTxt}>Endereço</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}
// chamada do metodo de rolagem automátiva
        onPress={this.onButtonPress}
      >
        <Image
          source={require('../../assets/imgs/comentarios.png')}
          style={styles.icons}
        />
        <Text style={styles.btnTxt}>Comentários</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Image
          source={require('../../assets/imgs/favoritos.png')}
          style={styles.icons}
        />
        <Text style={styles.btnTxt}>favoritos</Text>
      </TouchableOpacity>

    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: height*0.09,
    borderBottomWidth: 1,
    borderColor: '#e6e6e6',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icons: {
    height: height*0.07,
    width: height*0.07,
  },
  btnTxt: {
    fontSize: width*0.03,
    color: '#cb8a19',
    width: width*0.18,
    textAlign: 'center',
    marginTop: -10,
  },
});

//exportação do componente Menu através do componente withNavigation
export default withNavigation(Menu);