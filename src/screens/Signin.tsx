import {View, Text, ActivityIndicator} from 'react-native';
import * as React from 'react';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {styles} from '../styles';
import {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  getAddressInformationAction,
  setAccountAction,
  signOutAction,
} from '../actions';

export const SignIn = ({navigation}) => {
  const [account, setAccount] = useState(undefined);
  const [error, showError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const accountInput = useRef<any>();

  useEffect(() => {
    dispatch(signOutAction());
  },[]);

  const onPress = () => {
    if (account !== undefined) {
      dispatch(setAccountAction(account));
      showError(false);
      setAccount(undefined);
      accountInput.current.clear();
      dispatch(getAddressInformationAction());
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigation.navigate('Dashboard');
      }, 3000);
    } else {
      showError(true);
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={[styles.horizontal]}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      )}
      <Text style={styles.logoName}>JobCoins</Text>
      <View style={styles.inputView}>
        <TextInput
          ref={accountInput}
          style={styles.inputTextSignIn}
          placeholder="Account..."
          placeholderTextColor="#003f5c"
          onChangeText={text => setAccount(text)}
        />
      </View>
      <TouchableOpacity>
        {error && (
          <Text style={styles.signInErrorText}>Username is needed</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        testID={'signIn:loginButton'}
        style={styles.loginBtn}
        onPress={onPress}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};
