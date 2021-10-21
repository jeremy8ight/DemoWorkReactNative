import {
  getAddressInformationAction, savingTransferRecipientAction,
  setAccountAction,
  setPasswordAction,
  showModalAction,
  signOutAction,
  storeAmountsAction,
  transferJobCoinAction,
  updateAccountBalanceAction,
} from '../index';
import {JobCoinActionTypes} from '../../enums';

describe('actions', () => {
  it('should return correct signOut action', () => {
    const action = signOutAction();
    expect(action.type).toEqual(JobCoinActionTypes.signOut);
  });

  it('should return correct set account action', () => {
    const action = setAccountAction('mockAccount');
    expect(action.type).toEqual(JobCoinActionTypes.saveAccountName);
    expect(action.value).toEqual('mockAccount');
  });

  it('should return get address information action', () => {
    const action = getAddressInformationAction();
    expect(action.type).toEqual(JobCoinActionTypes.getAddressInformation);
  });

  it('should return update account balance action', () => {
    const action = updateAccountBalanceAction();
    expect(action.type).toEqual(JobCoinActionTypes.updateAccountBalance);
  });

  it('should return transfer job coin action', () => {
    const action = transferJobCoinAction();
    expect(action.type).toEqual(JobCoinActionTypes.transferJobCoin);
  });

  it('should return saving transaction recipient action', () => {
    const action = savingTransferRecipientAction('mockRecipient', '1');
    expect(action.type).toEqual(
      JobCoinActionTypes.savedTransferRecipientAndAmount,
    );
    expect(action.value.toAddress).toEqual('mockRecipient');
    expect(action.value.amount).toEqual('1');
  });

  it('should return show modal action', () => {
    const action = showModalAction();
    expect(action.type).toEqual(JobCoinActionTypes.showModal);
  });

  it('should return store amounts actions', () => {
    const action = storeAmountsAction(
      [1],
      ['mockToAddress'],
      ['mockFromAddress'],
    );
    expect(action.type).toEqual(JobCoinActionTypes.storeTransactionsAmounts);
    expect(action.value.toAddresses).toEqual(['mockToAddress']);
    expect(action.value.fromAddresses).toEqual(['mockFromAddress']);
    expect(action.value.amount).toEqual([1]);
  });
});
