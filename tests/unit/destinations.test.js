import { destinations, getRandomDestination } from '../../src/destinations';

describe('destinations', () => {
  it('should have expected categories', () => {
    expect(Object.keys(destinations)).toEqual(["City", "Nature", "Culture"]);
  });
});

describe('getRandomDestination', () => {
  it('should return an empty string if no category is provided', () => {
    expect(getRandomDestination()).toBe("");
  });

  it('should return an empty string if an invalid category is provided', () => {
    expect(getRandomDestination("InvalidCategory")).toBe("");
  });

  it('should return one of the City destinations', () => {
    const cityDestinations = destinations.City;
    const result = getRandomDestination("City");
    expect(cityDestinations).toContain(result);
  });

  it('should return one of the Nature destinations', () => {
    const natureDestinations = destinations.Nature;
    const result = getRandomDestination("Nature");
    expect(natureDestinations).toContain(result);
  });

  it('should return one of the Culture destinations', () => {
    const cultureDestinations = destinations.Culture;
    const result = getRandomDestination("Culture");
    expect(cultureDestinations).toContain(result);
  });

  it('should return a consistent value for a mocked random value', () => {
    // Math.random()をモックして、期待値を固定する
    jest.spyOn(Math, 'random').mockReturnValue(0); 
    // 0を返した場合、Math.floor(0 * length) = 0 となり、最初の要素が選ばれる
    expect(getRandomDestination("City")).toBe("Tokyo, Japan");
    // モックを元に戻す
    Math.random.mockRestore();
  });
});