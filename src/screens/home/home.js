import React, { PureComponent } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import axios from "axios";
import Header from "../../components/header/header.js";

export default class Home extends PureComponent {
  state = {
    lista: []
  };

//chamada inicial da api, se não retornar erro, seta o array com os elementos
  componentDidMount = () => {
    axios.get("http://dev.4all.com:3003/tarefa").then(({ data, status }) => {
      if (status === 200) {
        this.setState({ lista: data.lista });
      }
    });
  };

//estrutura dos elementos retornados
  renderLista = () =>
    this.state.lista.map((item, index) => (
      <TouchableOpacity
        style={styles.item}
        key={index}
        onPress={() =>
          this.props.navigation.navigate("Principal", { id: item })
        }
      >
        <Text>{item}</Text>
        <Text style={styles.itemIcon}>></Text>
      </TouchableOpacity>
    ));

//renderização da tela
  render = () => (
    <View style={styles.container}>
      <Header title="Teste 4all" />
      {this.renderLista()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  item: {
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  itemIcon: {
    fontSize: 18,
    color: "#666"
  }
});
