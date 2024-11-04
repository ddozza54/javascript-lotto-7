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

      const numberOfLottoTickets = purchaseAmount / 1000;
      Console.print(
        `${numberOfLottoTickets}개를 구매했습니다.`
      );

      const generatingRandomNumbers = (count) => {
        const randomLottos = [];
        for (let i = 0; i < count; i++) {
          randomLottos.push(
            Random.pickUniqueNumbersInRange(1, 45, 6).sort(
              (num1, num2) => num1 - num2
            )
          );
        }
        return randomLottos;
      };

      const lottos = generatingRandomNumbers(
        numberOfLottoTickets
      );
      lottos.forEach((lotto) => Console.print(lotto));

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

      const bonusNumber = Number(
        await Console.readLineAsync(
          '보너스 번호를 입력해 주세요.'
        )
      );
      if (!bonusNumber) {
        throw new Error('올바른 숫자를 입력해주세요.');
      }
      if (winningNumbers.includes(bonusNumber)) {
        throw new Error(
          '기존 당첨 번호를 제외한 숫자를 입력해주세요.'
        );
      }
      if (bonusNumber > 45 || bonusNumber < 1) {
        throw new Error(
          '로또 번호는 1부터 45 사이의 숫자여야 합니다.'
        );
      }
      Console.print(bonusNumber);

      const prizeMenu = {
        3: 5000,
        4: 50000,
        5: 1500000,
        '5bonus': 30000000,
        6: 2000000000,
      };

      const countOfMatches = {
        3: 0,
        4: 0,
        5: 0,
        '5bonus': 0,
        6: 0,
      };
      const countingMatchNumbers = (
        lottos,
        winningNumbers
      ) => {
        lottos.forEach((lotto) => {
          const matchNumbers = lotto.filter((number) =>
            winningNumbers.includes(number)
          );

          if (
            Object.keys(countOfMatches).includes(
              matchNumbers.length.toString()
            )
          ) {
            if (
              matchNumbers.length === 5 &&
              lotto.includes(bonusNumber)
            ) {
              console.log('5개 매치 + 보너스');
              countOfMatches['5bonus']++;
            }
            countOfMatches[matchNumbers.length]++;
          }
        });
      };
      countingMatchNumbers(lottos, winningNumbers);
    } catch (error) {
      throw Error(`[ERROR] ${error.message}`);
    }
  }
}

export default App;
