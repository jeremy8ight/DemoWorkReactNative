import Modal from 'react-native-modal';
import * as React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAddressInformationAction,
  savingTransferRecipientAction,
  showModalAction,
  transferJobCoinAction,
} from '../actions';
import {showModalSelector} from '../selectors';
import {styles} from '../styles';
import {useCallback, useEffect, useRef, useState} from 'react';

function isNumber(n) {
  return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}

export const WrapperComponent = () => {
  const dispatch = useDispatch();
  const showModal = useSelector(showModalSelector);
  const [loading, setLoading] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState(undefined);
  const [recipientAmount, setRecipientAmount] = useState(undefined);
  const [error, showError] = useState(false);
  const recipientAddressInput = useRef<any>();
  const recipientAmountInput = useRef<any>();

  const closeModal = useCallback(() => {
    showError(false);
    dispatch(showModalAction(false));
  }, [dispatch]);

  const onPressForTransfer = useCallback(() => {
    if (
      recipientAmount !== undefined &&
      recipientAddress !== undefined &&
      isNumber(recipientAmount)
    ) {
      showError(false);
      recipientAddressInput.current.clear();
      recipientAmountInput.current?.clear();
      setRecipientAmount(undefined);
      setRecipientAddress(undefined);
      dispatch(
        savingTransferRecipientAction(recipientAddress, recipientAmount),
      );
      dispatch(transferJobCoinAction());
      dispatch(getAddressInformationAction());
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        dispatch(showModalAction(false));
      }, 5000);
    } else {
      showError(true);
    }
  }, [dispatch, recipientAddress, recipientAmount]);

  useEffect(() => {}, [dispatch, onPressForTransfer, closeModal]);

  return (
    <View>
      <Modal isVisible={showModal}>
        <View style={styles.modalContainer}>
          {loading && (
            <View style={[styles.horizontal]}>
              <ActivityIndicator size="large" color="blue" />
            </View>
          )}
          <Text style={styles.modalHeadlineText}>
            Who would you like to send JobCoins to?
          </Text>
          <View style={styles.modalRecipientTextContainer}>
            <TextInput
              ref={recipientAddressInput}
              style={styles.inputTextModal}
              placeholder="Recipient Address..."
              placeholderTextColor="#003f5c"
              onChangeText={text => setRecipientAddress(text)}
            />
          </View>
          <View style={styles.modalRecipientAmountTextContainer}>
            <TextInput
              ref={recipientAmountInput}
              style={styles.inputTextModal}
              placeholder="Recipient Amount..."
              placeholderTextColor="#003f5c"
              onChangeText={text => setRecipientAmount(text)}
            />
          </View>
          {error && (
            <Text style={styles.signInErrorText}>
              Please enter in correct address and amount!
            </Text>
          )}
          <View style={styles.modalSendJobCoinsContainer}>
            <TouchableOpacity
              onPress={onPressForTransfer}
              style={styles.modalSendJobCoinsButton}>
              <Text style={{color: 'white'}}>Send</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalCancelButtonContainer}>
            <TouchableOpacity
              onPress={closeModal}
              style={styles.modalCancelButton}>
              <Text style={{color: 'white'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
