import React, {PureComponent} from 'react';

import RootStack from './src/navigation/routes';

export default class App extends PureComponent {
  render= () => (
    <RootStack/>  
  );
};