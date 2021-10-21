import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import Provider from 'react-redux/lib/components/Provider';
import {mainReducer} from './src/reducers';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SignIn} from './src/screens/Signin';
import {Dashboard} from './src/screens/Dashboard';
import mainSaga from './src/sagas';

const App = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(mainReducer, applyMiddleware(sagaMiddleware));
  const Stack = createStackNavigator();
  sagaMiddleware.run(mainSaga);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
