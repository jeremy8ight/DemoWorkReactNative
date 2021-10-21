import {takeEvery, select, put} from 'redux-saga/effects';
import {JobCoinActionTypes} from '../enums';
import {
  getTempTransferAmountSelector,
  getTempTransferRecipientSelector,
  savedAccountNameSelector,
} from '../selectors';
import {storeAmountsAction, updateAccountBalanceAction} from '../actions';

export function* getAccountInformation() {
  const account = yield select(savedAccountNameSelector);
  const transactionsAmounts = [];
  const transactionsToAddress = [];
  const transactionsFromAddress = [];
  const url = `http://jobcoin.gemini.com/coliseum-seventh/api/addresses/${account}`;
  const response = yield fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const data = yield response.status === 200 ? response.json() : [];
  if (response.status === 200) {
    data.transactions.map(item => {
      transactionsAmounts.push(item.amount);
      transactionsToAddress.push(item.toAddress);
      transactionsFromAddress.push(item.fromAddress);
    });
    yield put(
      storeAmountsAction(
        transactionsAmounts,
        transactionsToAddress,
        transactionsFromAddress,
      ),
    );
    yield put(updateAccountBalanceAction(data.balance));
  } else {
    console.log('error recieved while getting balance------>');
  }
}

export function* transferJobCoin() {
  const account = yield select(savedAccountNameSelector);
  const tempAmount = yield select(getTempTransferAmountSelector);
  const tempTransferRecipient = yield select(getTempTransferRecipientSelector);
  const url = 'http://jobcoin.gemini.com/coliseum-seventh/api/transactions';
  const response = yield fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fromAddress: account,
      toAddress: tempTransferRecipient,
      amount: tempAmount,
    }),
  });
  console.log('response status', response.status);
}

export default function* mainSaga() {
  yield takeEvery(
    JobCoinActionTypes.getAddressInformation,
    getAccountInformation,
  );
  yield takeEvery(JobCoinActionTypes.transferJobCoin, transferJobCoin);
}
