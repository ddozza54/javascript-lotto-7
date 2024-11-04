import { MissionUtils } from '@woowacourse/mission-utils';
const { Console, Random } = MissionUtils;

class App {
  async run() {
    try {
      const purchaseAmount = Number(
        await Console.readLineAsync(
          '구입 금액을 입력해 주세요.'
        )
      );
      if (!purchaseAmount) {
        throw new Error('숫자로 입력해주세요');
      }
      if (purchaseAmount % 1000 !== 0) {
        throw new Error('1,000원 단위로 입력해주세요');
      }
      Console.print(purchaseAmount);

      const winningNumbersInput =
        await Console.readLineAsync(
          '당첨 번호를 입력해 주세요.'
        );
      const winningNumbers = winningNumbersInput
        .split(',')
        .map((number) => Number(number.trim()));
      if (winningNumbers.length !== 6) {
        throw new Error('로또 번호는 6개여야 합니다.');
      }
      if (winningNumbers.includes(NaN)) {
        throw new Error('숫자를 입력해주세요.');
      }
      if (
        winningNumbers.findIndex(
          (number) => number > 45 || number < 1
        ) !== -1
      ) {
        throw new Error(
          '로또 번호는 1부터 45 사이의 숫자여야 합니다.'
        );
      }
      const setTypeWinningNumbers = new Set(winningNumbers);
      if (
        setTypeWinningNumbers.size !== winningNumbers.length
      ) {
        throw new Error(
          '중복되지 않는 숫자를 입력해주세요.'
        );
      }
      Console.print(winningNumbers);
    } catch (error) {
      throw Error(`[ERROR] ${error.message}`);
    }
  }
}

export default App;
