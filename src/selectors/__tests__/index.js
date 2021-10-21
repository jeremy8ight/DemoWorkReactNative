import {
  accountFromAddressesSelector,
  accountToAddressesSelector,
  accountTransactionsSelector,
  getAccountBalanceSelector,
  getTempTransferAmountSelector,
  getTempTransferRecipientSelector,
  savedAccountNameSelector,
  showModalSelector,
} from '../index';

describe('Main selectors', () => {
  describe('saved account named selector', () => {
    it('should return nothing with no state', () => {
      expect(savedAccountNameSelector({})).toBeUndefined();
    });

    it('should return correct account', () => {
      const testState = {
        account: 'mockAccount',
      };
      expect(savedAccountNameSelector(testState)).toEqual('mockAccount');
    });
  });

  describe('get balance account selector', () => {
    it('should return nothing with no state', () => {
      expect(getAccountBalanceSelector({})).toBeUndefined();
    });

    it('should return correct account balance', () => {
      const testState = {
        accountBalance: 45,
      };
      expect(getAccountBalanceSelector(testState)).toEqual(45);
    });
  });

  describe('get balance account selector', () => {
    it('should return nothing with no state', () => {
      expect(getAccountBalanceSelector({})).toBeUndefined();
    });

    it('should return correct account balance', () => {
      const testState = {
        accountBalance: 45,
      };
      expect(getAccountBalanceSelector(testState)).toEqual(45);
    });
  });

  describe('get temp transfer amount selector', () => {
    it('should return nothing with no state', () => {
      expect(getTempTransferAmountSelector({})).toBeUndefined();
    });

    it('should return correct account balance', () => {
      const testState = {
        tempRecipientAmount: 45,
      };
      expect(getTempTransferAmountSelector(testState)).toEqual(45);
    });
  });

  describe('get temp transfer recipient selector', () => {
    it('should return nothing with no state', () => {
      expect(getTempTransferRecipientSelector({})).toBeUndefined();
    });

    it('should return correct account balance', () => {
      const testState = {
        toAddressTemp: 'mockToAddress',
      };
      expect(getTempTransferRecipientSelector(testState)).toEqual(
        'mockToAddress',
      );
    });
  });

  describe('show modal selector', () => {
    it('should return correct boolean value for true', () => {
      const testState = {
        showModal: true,
      };
      expect(showModalSelector(testState)).toEqual(true);
    });

    it('should return correct boolean value for false', () => {
      const testState = {
        showModal: false,
      };
      expect(showModalSelector(testState)).toEqual(false);
    });
  });

  describe('amount transactions selector', () => {
    it('should return nothing when empty', () => {
      const testState = {
        transactions: {
          amounts: [],
        },
      };
      expect(accountTransactionsSelector(testState)).toEqual([]);
    });

    it('should return correct amounts in array fashion', () => {
      const testState = {
        transactions: {
          amounts: [1, 2, 3, 4],
        },
      };
      expect(accountTransactionsSelector(testState)).toEqual([1, 2, 3, 4]);
    });
  });

  describe('amount to addresses selector', () => {
    it('should return nothing when empty', () => {
      const testState = {
        transactions: {
          toAddresses: [],
        },
      };
      expect(accountToAddressesSelector(testState)).toEqual([]);
    });

    it('should return correct amounts in array fashion', () => {
      const testState = {
        transactions: {
          toAddresses: ['mockAddress1', 'mockAddress2'],
        },
      };
      expect(accountToAddressesSelector(testState)).toEqual([
        'mockAddress1',
        'mockAddress2',
      ]);
    });
  });

  describe('amount from addresses selector', () => {
    it('should return nothing when empty', () => {
      const testState = {
        transactions: {
          fromAddresses: [],
        },
      };
      expect(accountFromAddressesSelector(testState)).toEqual([]);
    });

    it('should return correct amounts in array fashion', () => {
      const testState = {
        transactions: {
          fromAddresses: ['mockAddress1', 'mockAddress2'],
        },
      };
      expect(accountFromAddressesSelector(testState)).toEqual([
        'mockAddress1',
        'mockAddress2',
      ]);
    });
  });
});
