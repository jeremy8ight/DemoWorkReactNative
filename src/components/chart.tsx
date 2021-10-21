import {LineChart} from 'react-native-chart-kit';
import * as React from 'react';
import {useSelector} from 'react-redux';
import {
  accountToAddressesSelector,
  accountTransactionsSelector,
  savedAccountNameSelector,
} from '../selectors';
import {ScrollView} from 'react-native-gesture-handler';

const accountInformationConversion = (
  accountName: string,
  accountTransAmount: number[],
  accountTransToAddresses: string[],
): number[] => {
  const amountBalance: number[] = [];
  let tempBalance: number = 0;
  for (let i = 0; i < accountTransAmount.length; i++) {
    if (accountTransToAddresses[i] === accountName) {
      tempBalance += parseFloat(String(accountTransAmount[i]));
      amountBalance.push(tempBalance);
    } else if (accountTransToAddresses[i] === undefined) {
      tempBalance += parseFloat(String(accountTransAmount[i]));
      amountBalance.push(tempBalance);
    } else if (accountTransToAddresses[i] !== accountName) {
      tempBalance -= parseFloat(String(accountTransAmount[i]));
      amountBalance.push(tempBalance);
    }
  }
  return amountBalance;
};

export const Charts = () => {
  const accountName = useSelector(savedAccountNameSelector);
  const accountTransAmount = useSelector(accountTransactionsSelector);
  const accountTransToAddresses = useSelector(accountToAddressesSelector);
  const dataArray: number[] = accountInformationConversion(
    accountName,
    accountTransAmount,
    accountTransToAddresses,
  );

  const numTransactions = Array.from(
    {length: dataArray.length},
    (_, index) => index + 1,
  );

  return (
    <ScrollView
      horizontal={true}
      contentOffset={{x: 10000, y: 0}}
      showsHorizontalScrollIndicator={true}>
      <LineChart
        data={{
          labels: numTransactions.map(String),
          datasets: [
            {
              data: dataArray,
            },
          ],
        }}
        width={2500}
        height={600}
        xLabelsOffset={10}
        xAxisLabel={'T'}
        yAxisLabel="$"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: '#000000',
          backgroundGradientFrom: '#000000',
          backgroundGradientTo: '#000000',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 20,
          },
          propsForDots: {
            r: '2',
            strokeWidth: '2',
            stroke: 'red',
          },
        }}
        withHorizontalLines={true}
        withVerticalLines={true}
        withHorizontalLabels={true}
        withInnerLines={true}
        withOuterLines={true}
        style={{
          paddingRight: 20,
        }}
        style={{
          marginVertical: 8,
          borderRadius: 15,
          marginHorizontal: 20,
        }}
      />
    </ScrollView>
  );
};
