import {View, Text} from 'react-native';
import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAccountBalanceSelector,
  savedAccountNameSelector,
} from '../selectors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {styles} from '../styles';
import {useCallback, useEffect} from 'react';
import {getAddressInformationAction, showModalAction} from '../actions';
import {WrapperComponent} from '../components/modal';
import {Charts} from '../components/chart';

export const Dashboard = ({navigation}) => {
  const accountName = useSelector(savedAccountNameSelector);
  const accountBalance = useSelector(getAccountBalanceSelector);
  const dispatch = useDispatch();

  const showModal = useCallback(() => {
    dispatch(showModalAction(true));
  }, [dispatch]);

  const signOut = useCallback(() => {
    navigation.navigate('SignIn');
  }, [navigation]);

  useEffect(() => {
    dispatch(getAddressInformationAction());
  }, [accountBalance, dispatch, showModal, accountName]);

  return (
    <View style={styles.dashboard}>
      <WrapperComponent />
      <View style={{top: '5%'}}>
        <View>
          <Text style={styles.accountNameLabel}>{accountName}</Text>
          <Text style={styles.accountBalanceLabel}>
            {`Balance: $${accountBalance}`}
          </Text>
        </View>
        <View>
          <Text style={styles.transactionHistoryLabel}>
            Transaction History
          </Text>
        </View>
        <Charts />
      </View>
      <View style={styles.dashboardButtonsContainer}>
        <TouchableOpacity style={styles.sendJobCoinsButton} onPress={showModal}>
          <Text style={styles.sendJobCoinText}>Send JobCoins</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};
