import DestinationDisplay from '../../src/DestinationDisplay';

export default {
  title: 'DestinationDisplay',
  component: DestinationDisplay
};

export const NoCategory = {
  args: {
    category: '',
    destination: '',
    onFindDestination: () => {},
  },
};

export const WithCategory = {
  args: {
    category: 'City',
    destination: '',
    onFindDestination: () => {},
  },
};

export const WithDestination = {
  args: {
    category: 'City',
    destination: 'Tokyo, Japan',
    onFindDestination: () => {},
  },
};
