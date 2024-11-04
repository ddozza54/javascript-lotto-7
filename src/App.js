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
        throw new Error('하나의 숫자로 입력해주세요');
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

      const countOfMatches = new Map();
      countOfMatches
        .set(3, 0)
        .set(4, 0)
        .set(5, 0)
        .set('5bonus', 0)
        .set(6, 0);

      const countingMatchNumbers = (
        lottos,
        winningNumbers
      ) => {
        lottos.forEach((lotto) => {
          const filteredMatchNumbers = lotto.filter(
            (number) => winningNumbers.includes(number)
          );
          if (
            countOfMatches.has(filteredMatchNumbers.length)
          ) {
            if (
              filteredMatchNumbers.length == 5 &&
              lotto.includes(bonusNumber)
            ) {
              countOfMatches.set(
                '5bonus',
                countOfMatches.get('5bonus') + 1
              );
            } else {
              countOfMatches.set(
                filteredMatchNumbers.length,
                countOfMatches.get(
                  filteredMatchNumbers.length
                ) + 1
              );
            }
          }
        });
      };
      countingMatchNumbers(lottos, winningNumbers);

      const printMatchCounting = (
        countOfMatches,
        prizeMenu
      ) => {
        countOfMatches.forEach((value, key) => {
          let printMessage = '';
          if (key == '5bonus') {
            printMessage = `5개 일치, 보너스 볼 일치 (${prizeMenu[
              '5bonus'
            ].toLocaleString('ko-KR')}원) - ${value}개`;
          } else {
            printMessage = `${key}개 일치 (${prizeMenu[
              key
            ].toLocaleString('ko-KR')}원) - ${value}개`;
          }
          Console.print(printMessage);
        });
      };

      Console.print('당첨 통계\n---');
      printMatchCounting(countOfMatches, prizeMenu);
    } catch (error) {
      throw Error(`[ERROR] ${error.message}`);
    }
  }
}

export default App;
