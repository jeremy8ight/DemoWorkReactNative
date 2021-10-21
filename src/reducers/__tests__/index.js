import {mainReducer} from '../../reducers/index';
import {
  savingTransferRecipientAction,
  setAccountAction,
  showModalAction,
  signOutAction,
  storeAmountsAction,
  updateAccountBalanceAction,
} from '../../actions';
describe('Main reducer', () => {
  it('should handle the save account name action', () => {
    const state = {};
    const savedAccountName = {account: 'mockAccount'};
    expect(mainReducer(state, setAccountAction('mockAccount'))).toEqual(
      savedAccountName,
    );
  });

  it('should handle the update account balance action', () => {
    const state = {};
    const savedAccountBalance = {accountBalance: 50};
    expect(mainReducer(state, updateAccountBalanceAction(50))).toEqual(
      savedAccountBalance,
    );
  });

  it('should handle the saveTransferRecipientAndAmount action', () => {
    const state = {};
    const tempRecipientAddressAndAmount = {
      tempRecipientAmount: '1',
      toAddressTemp: 'mockRecipient',
    };
    expect(
      mainReducer(state, savingTransferRecipientAction('mockRecipient', '1')),
    ).toEqual(tempRecipientAddressAndAmount);
  });

  it('should handle the show modal action', () => {
    const state = {};
    const showModal = {showModal: true};
    expect(mainReducer(state, showModalAction(true))).toEqual(showModal);
  });

  it('should handle the signout action', () => {
    const state = {};
    const initialState = {
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
    expect(mainReducer(state, signOutAction())).toEqual(initialState);
  });

  it('should handle the store transaction amounts action', () => {
    const state = {};
    const transactionsStore = {
      transactions: {
        amounts: [1],
        toAddresses: ['mockToAddress'],
        fromAddresses: ['mockFromAddress'],
      },
    };
    expect(
      mainReducer(
        state,
        storeAmountsAction([1], ['mockToAddress'], ['mockFromAddress']),
      ),
    ).toEqual(transactionsStore);
  });
});
