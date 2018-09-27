import React,{ PureComponent } from 'react';
import { View, Image, Dimensions, Text, ScrollView, StyleSheet } from 'react-native';

//imports de libs
import axios from 'axios';
import MapView,{ Marker } from 'react-native-maps';

//import de componentes pessoais
import Header from '../../components/header/header';
import Menu from '../../components/menu/menu';

const { width, height } = Dimensions.get('window');

export default class Principal extends PureComponent {
//estado inicial dos states
    state = {
        info:{},
        comentarios: [],
//state guardando o item chave da tela anterior
        id: this.props.navigation.getParam('id'),
    };

    componentDidMount = () => (
//soma da chamada inicial da api com o item selecionado para o retorno das informações corretas
        axios.get('http://dev.4all.com:3003/tarefa/'+this.state.id)
            .then( ({data,status}) => {
                if (status === 200) {
                    this.setState({ info: data, comentarios: data.comentarios })
                }
            })
    );

//Estrutura de cada caixa de comentário
    renderComentarios = () => (
        this.state.comentarios.map((item, index) => 
            <View style={styles.comentContainer} key={index}>    

                <Image
                 source={{uri:item.urlFoto ? item.urlFoto : null}}
                 style={styles.userImg}
                />

                <View style={styles.comentInfo}>
                    <View style={styles.comentHeader}>
                        <View>
                            <Text style={styles.userName}>
                                {item.nome}
                            </Text>
                            <Text style={styles.comentInfoTxt}>
                                {item.titulo}
                            </Text>
                        </View>
{/* criação das estrelas referenciando a nota dada pelo usuário, com verificação condicional para alterar o preenchimento de cada uma*/}
                        <View style={styles.favView}>
                            <Image source={require('../../assets/imgs/favoritos.png')} 
                                    style={ item.nota > 0 ? styles.favTrue : styles.favFalse }
                            />
                            <Image source={require('../../assets/imgs/favoritos.png')} style={styles.favImg}
                                    style={ item.nota > 1 ? styles.favTrue : styles.favFalse }
                            />
                            <Image source={require('../../assets/imgs/favoritos.png')} style={styles.favImg}
                                    style={ item.nota > 2 ? styles.favTrue : styles.favFalse }
                            />
                            <Image source={require('../../assets/imgs/favoritos.png')} style={styles.favImg}
                                    style={ item.nota > 3 ? styles.favTrue : styles.favFalse }
                            />
                            <Image source={require('../../assets/imgs/favoritos.png')} style={styles.favImg}
                                    style={ item.nota > 4 ? styles.favTrue : styles.favFalse }
                            />
                        </View>

                    </View>
                    
                    <Text style={styles.comentInfoTxt}>
                        {item.comentario}
                    </Text>
                </View>
            </View>
        )
    );

    render = () => (
        <View style={styles.container}>
            <Header
                title= {`${this.state.info.cidade} - ${this.state.info.bairro}`}
                navigation={this.props.navigation}
            />
{/*criação da tela de rolagem com referenciação do elemento scroll para ser usado futuramente pelo componente Menu*/}
            <ScrollView 
                ref={(d) => {this.scroll = d }}
                contentContainerStyle={styles.scroll}
            >
                <View style={styles.absolutesView}>
                    <Image
                        source={{uri:this.state.info.urlFoto ? this.state.info.urlFoto : null}}
                        style={styles.img}
                    />
                    <Image
                        source={{uri:this.state.info.urlLogo ? this.state.info.urlLogo : null}}
                        style={styles.logo}
                    />
                    <Text style={styles.titulo}>
                        {this.state.info.titulo}
                    </Text>
                </View>

                <View style={styles.menuView}>
{/* Renderização do componente Menu, sendo passado como props o scroll e o resultado do da chamada da api para uso interno */}
                    <Menu
                        scroll={this.scroll}
                        info={this.state.info}
                    />
                    <Text style={styles.text}> {this.state.info.texto} </Text>
                </View>

                <View style={styles.mapContainer}>
                    <View style={styles.mapView}>

                    {/* verificação dos dados de posicionamento retornados pela api antes de renderizar o mapa */}
                        {this.state.info.latitude && this.state.info.longitude && (
                            <MapView 
                                style={styles.map}
                                initialRegion={{
                                    latitude: this.state.info.latitude,
                                    longitude: this.state.info.longitude,
                                    latitudeDelta: 0.0100,
                                    longitudeDelta: 0.0100,}}
                            >
                                <Marker 
                                    coordinate={{latitude: this.state.info.latitude,
                                        longitude: this.state.info.longitude}}
                                    pinColor= '#cb8a19'
                                />
                            </MapView>
                        )}
                    </View>

                    <Text style={styles.mapBottomTxt}>
                        {this.state.info.endereco}
                    </Text>
                    <Image
                        source={require('../../assets/imgs/pin.png')}
                        style={styles.loguinho}
                    />
                </View>

                {/* renderização dos elementos retornados pela chamada de comentários da API */}
                {this.renderComentarios()}

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    scroll: {
        backgroundColor: '#f2f2f2',
        width: width,
    },
    absolutesView: {
        width: width,
        height: height*0.422,
        marginBottom: 10,
    },
    img: {
        backgroundColor: '#c1c7cd',
        position: 'absolute',
        left: 0,
        top: 0,
        width: width,
        height: height*0.35,
    },
    logo: {
        backgroundColor: 'white',
        borderRadius: 50,
        position: 'absolute',
        height: width*0.25,
        width: width*0.25,
        right: width*0.025,
        bottom: 0,
    },
    titulo: {
        color: '#cb8a19',
        fontSize: 24,
        position: 'absolute',
        left: width*0.025,
        bottom: height*0.001,
    },
    menuView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
    },
    text: {
        color: '#cb8a19',
        fontSize: 16,
        marginHorizontal: 26,
        marginVertical: 13,
    },
    mapContainer: {
        flex: 1,
        width: width,
    },
    mapView: {
        backgroundColor: '#f2f2f2',
        width: width,
        height: height*0.15,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    mapBottomTxt: {
        backgroundColor: '#cb8a19',
        color: 'white',
        textAlign: 'right',
        paddingVertical: 1.5,
        paddingHorizontal: 50,
    },
    loguinho: {
        backgroundColor: 'white',
        borderRadius: 50,
        position: 'absolute',
        height: width*0.1,
        width: width*0.1,
        right: 3,
        bottom: 3,
    },

// estilos relacionados aos comentários
    comentContainer: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 6,
        paddingHorizontal: 10,
        margin: 2,
        borderRadius: 10,
    },
    userImg: {
        backgroundColor: '#f2f2f2',
        borderRadius: 50,
        height: width*0.25,
        width: width*0.25,
        margin: 5,
    },
    comentInfo: {
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 5,
    },
    comentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    userName: {
        color: '#cb8a19',
        fontWeight: 'bold',
    },
    comentInfoTxt: {
        color: '#cb8a19',
    },
    favView: {
        flexDirection: 'row',

    },
    favTrue: {
        tintColor: '#cb8a19',
        height: width*0.05,
        width: width*0.05,
        marginHorizontal: -2.5,
    },
    favFalse: {
        tintColor: '#c1c7cd',
        height: width*0.05,
        width: width*0.05,
        marginHorizontal: -2.5,
    },
});