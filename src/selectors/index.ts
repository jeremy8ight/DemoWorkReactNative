export const savedAccountNameSelector = state => state.account;
export const getAccountBalanceSelector = state => state.accountBalance;
export const getTempTransferRecipientSelector = state => state.toAddressTemp;
export const getTempTransferAmountSelector = state => state.tempRecipientAmount;
export const showModalSelector = state => state.showModal;
export const accountTransactionsSelector = state => state.transactions.amounts;
export const accountToAddressesSelector = state =>
  state.transactions.toAddresses;
export const accountFromAddressesSelector = state =>
  state.transactions.fromAddresses;
