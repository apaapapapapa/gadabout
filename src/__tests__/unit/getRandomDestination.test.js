import { getRandomDestination, destinations } from "../../App";

describe("getRandomDestination", () => {
  test("有効なカテゴリを渡した場合、そのカテゴリの中から1つを返す", () => {
    const category = "City";
    const result = getRandomDestination(category);
    expect(destinations[category]).toContain(result);
  });

  test("存在しないカテゴリを渡した場合、空文字を返す", () => {
    const result = getRandomDestination("Unknown");
    expect(result).toBe("");
  });

  test("カテゴリが渡されなかった場合、空文字を返す", () => {
    const result = getRandomDestination();
    expect(result).toBe("");
  });

  test("ランダム性のテスト（多くの回数を実行してカテゴリ内のいずれかを返すことを確認）", () => {
    const category = "Culture";
    const results = new Set();
    for (let i = 0; i < 50; i++) {
      results.add(getRandomDestination(category));
    }
    // 全て同じ値になることは稀であり、その中のいくつかが揃うことを確認
    // 厳密なランダム性はテストしないが、少なくともカテゴリー内のオプションに限定される
    for (let item of results) {
      expect(destinations[category]).toContain(item);
    }
  });
});
