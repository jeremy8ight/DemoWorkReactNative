import {JobCoinActionTypes} from '../enums';

export interface SetAccountAction {
  type: JobCoinActionTypes.saveAccountName;
  value: string;
}

export interface GetAddressInformationAction {
  type: JobCoinActionTypes.getAddressInformation;
}

export interface UpdateAccountBalanceAction {
  type: JobCoinActionTypes.updateAccountBalance;
  value: string;
}

export interface TransferJobCoinAction {
  type: JobCoinActionTypes.transferJobCoin;
}

export interface SavingTransferRecipientAction {
  type: JobCoinActionTypes.savedTransferRecipientAndAmount;
  value: {
    toAddress: string;
    amount: string;
  };
}

export interface ShowModalAction {
  type: JobCoinActionTypes.showModal;
  value: boolean;
}

export interface SignOutAction {
  type: JobCoinActionTypes.signOut;
}

export interface StoreAmountsActions {
  type: JobCoinActionTypes.storeTransactionsAmounts;
  value: {
    amount: number[];
    fromAddresses: string[];
    toAddresses: string[];
  };
}
