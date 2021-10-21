import {JobCoinActionTypes} from '../enums';
import {
  GetAddressInformationAction,
  SavingTransferRecipientAction,
  SetAccountAction,
  ShowModalAction,
  SignOutAction,
  StoreAmountsActions,
  TransferJobCoinAction,
  UpdateAccountBalanceAction
} from '../interfaces';

export const setAccountAction = (account: string): SetAccountAction => {
  return {
    type: JobCoinActionTypes.saveAccountName,
    value: account,
  };
};

export const getAddressInformationAction = (): GetAddressInformationAction => {
  return {
    type: JobCoinActionTypes.getAddressInformation,
  };
};

export const updateAccountBalanceAction = (
  balance: string,
): UpdateAccountBalanceAction => {
  return {
    type: JobCoinActionTypes.updateAccountBalance,
    value: balance,
  };
};

export const transferJobCoinAction = (): TransferJobCoinAction => {
  return {
    type: JobCoinActionTypes.transferJobCoin,
  };
};

export const savingTransferRecipientAction = (
  toAddress: string,
  amount: string,
): SavingTransferRecipientAction => {
  return {
    type: JobCoinActionTypes.savedTransferRecipientAndAmount,
    value: {
      toAddress: toAddress,
      amount: amount,
    },
  };
};

export const showModalAction = (show: boolean): ShowModalAction => {
  return {
    type: JobCoinActionTypes.showModal,
    value: show,
  };
};

export const signOutAction = (): SignOutAction => {
  return {
    type: JobCoinActionTypes.signOut,
  };
};

export const storeAmountsAction = (
  amount: number[],
  toAddresses: string[],
  fromAddresses: string[],
): StoreAmountsActions => {
  return {
    type: JobCoinActionTypes.storeTransactionsAmounts,
    value: {
      amount,
      toAddresses,
      fromAddresses,
    },
  };
};
