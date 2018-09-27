import React,{ PureComponent } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, StatusBar } from 'react-native';

import { Header as NavigationHeader, HeaderBackButton } from "react-navigation";

//medição da tela e declaração da variável que torna o layout adaptável
const { width } = Dimensions.get("window");

type Props = {
  title: String,
};

//Exportação do componente header personalizado
export default class Header extends PureComponent<Props> {
  static defaultProps = {
    title: '',
  };

//retornar a tela anterior 
  goBack = () => {
    this.props.navigation && this.props.navigation.goBack();
  };

//montagem do botão de voltar
  renderLeft = () => (
    <View style={styles.btnView}>
        <HeaderBackButton onPress={this.goBack} tintColor= 'white' />
    </View>
  );

//montagem do título da tela
  renderCenter = () => (
    <View style={styles.titleContainer}>
        <StatusBar backgroundColor='#cb8a19'/>
        <Image 
            source={require('../../assets/imgs/pin.png')}
            style={styles.pin}
            tintColor= 'white'
        />
        <Text style={styles.txt}>{this.props.title}</Text>
    </View>
  );

//montagem do botão de pesquisa
  renderRight = () => (
    <View>
      <Image
        source={require('../../assets/imgs/lupa.png')}
        style={styles.searchIcon}
      />
    </View>
  );

//renderização do componente
  render = () => (
    <View style={[styles.container]}>
        {this.renderLeft()}
        {this.renderCenter()}
        {this.renderRight()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#cb8a19',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: NavigationHeader.HEIGHT,
    width: width,
    elevation: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pin: {
      height: 30,
      width: 30,
  },
  txt: {
    fontSize: 14,
    color: 'white'
  },
  searchIcon: {
    height: width*0.05,
    width: width*0.05,
    marginHorizontal: width*0.035,
  },
});