import { test, expect } from '@playwright/experimental-ct-react';
import CategoryButtons from '../../src/CategoryButtons';

test('renders all category buttons', async ({ mount }) => {
  const categories = ['Beaches', 'Mountains', 'Cities'];
  const component = await mount(
    <CategoryButtons 
      categories={categories} 
      selectedCategory="Beaches" 
      onSelectCategory={() => {}} 
    />
  );

  for (const cat of categories) {
    await expect(component.locator('button', { hasText: cat })).toBeVisible();
  }
});

test('highlights the selected category button', async ({ mount }) => {
  const categories = ['Beaches', 'Mountains', 'Cities'];
  const selectedCategory = 'Mountains';
  const component = await mount(
    <CategoryButtons 
      categories={categories} 
      selectedCategory={selectedCategory} 
      onSelectCategory={() => {}} 
    />
  );

  // 'Mountains'ボタンのみactiveクラスをもつことを確認
  for (const cat of categories) {
    const button = component.locator('button', { hasText: cat });
    if (cat === selectedCategory) {
      await expect(button).toHaveClass(/active/);
    } else {
      await expect(button).not.toHaveClass(/active/);
    }
  }
});

test('calls onSelectCategory with the correct category when a button is clicked', async ({ mount }) => {
  const categories = ['Beaches', 'Mountains', 'Cities'];
  let selectedCat = null;
  const onSelectCategory = (cat) => {
    selectedCat = cat;
  };

  const component = await mount(
    <CategoryButtons 
      categories={categories} 
      selectedCategory="Beaches"
      onSelectCategory={onSelectCategory} 
    />
  );

  await component.locator('button', { hasText: 'Cities' }).click();
  expect(selectedCat).toBe('Cities');
});