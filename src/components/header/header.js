import React,{ PureComponent } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, StatusBar } from 'react-native';

import { Header as NavigationHeader, HeaderBackButton } from "react-navigation";

const { width, height } = Dimensions.get("window");

type Props = {
  title: String,
};

export default class Header extends PureComponent<Props> {
  static defaultProps = {
    title: '',
  };

  goBack = () => {
    this.props.navigation && this.props.navigation.goBack();
  };

  renderLeft = () => (
    <View style={styles.btnView}>
        <HeaderBackButton onPress={this.goBack} tintColor= 'white' />
    </View>
  );

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

  renderRight = () => (
    <View>
      <Image
        source={require('../../assets/imgs/lupa.png')}
        style={styles.searchIcon}
      />
    </View>
  );

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