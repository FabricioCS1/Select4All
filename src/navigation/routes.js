import {createStackNavigator} from 'react-navigation';

import Home from '../screens/home/home';
import Principal from '../screens/principal/principal';
import Servicos from '../screens/servicos/servicos';

const RootStack = createStackNavigator ({
    Home: { 
        screen: Home
    },
    Principal: {
        screen: Principal
    },
    Servicos: {
        screen: Servicos
    },
},
//desabilitação do header padrão
    {
        headerMode: 'none',
    },
);

export default RootStack;