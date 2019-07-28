import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStackNavigator} from 'react-navigation';
import {} from 'react-native';
import Reducers from './Reducers';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import SplashScreen from './Components/SplashScreen';
import Home from './Components/Home';



const RootStack = createStackNavigator(
  {
    Splash: { screen: SplashScreen },
    Home: { screen: Home },

  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
  }
);

export default class App extends Component {
  render() {
     const store = createStore(Reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}
