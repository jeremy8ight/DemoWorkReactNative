import {states} from '../states';
import {JobCoinActionTypes} from '../enums';

export const mainReducer = (state = states, action) => {
  switch (action.type) {
    case JobCoinActionTypes.saveAccountName:
      return {...state, account: action.value};
    case JobCoinActionTypes.updateAccountBalance:
      return {...state, accountBalance: action.value};
    case JobCoinActionTypes.savedTransferRecipientAndAmount:
      return {
        ...state,
        tempRecipientAmount: action.value.amount,
        toAddressTemp: action.value.toAddress,
      };
    case JobCoinActionTypes.showModal:
      return {...state, showModal: action.value};
    case JobCoinActionTypes.signOut:
      return {
        ...state,
        account: undefined,
        password: undefined,
        transactions: {
          amounts: [],
          fromAddresses: [],
          toAddresses: [],
        },
        accountBalance: 0,
        toAddressTemp: '',
        tempRecipientAmount: '',
        showModal: false,
      };
    case JobCoinActionTypes.storeTransactionsAmounts:
      return {
        ...state,
        transactions: {
          amounts: action.value.amount,
          toAddresses: action.value.toAddresses,
          fromAddresses: action.value.fromAddresses,
        },
      };
    default:
      return {...state};
  }
};
