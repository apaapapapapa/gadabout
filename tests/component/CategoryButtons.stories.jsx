import CategoryButtons from '../../src/CategoryButtons';

export default {
  title: 'CategoryButtons',
  component: CategoryButtons
};

export const Default = {
  args: {
    categories: ['City', 'Nature', 'Culture'],
    selectedCategory: '',
    onSelectCategory: () => {}, // デフォルトでは空関数
  },
};