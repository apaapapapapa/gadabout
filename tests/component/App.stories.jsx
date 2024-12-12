import App from '../../src/App';
import { destinations } from '../../src/destinations';

// モック化したgetRandomDestination関数を定義
function mockGetRandomDestination(category) {
  if (!category || !destinations[category]) return "";
  // テストしやすいよう、固定値を返す
  return 'Mock Destination';
}

export default {
  title: 'App',
  component: App
};

export const Default = {
  args: {
    getRandomDestination: mockGetRandomDestination,
  },
};
