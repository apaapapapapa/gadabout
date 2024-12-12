import { test, expect } from '@playwright/experimental-ct-react';
import CategoryButtonsStories from './CategoryButtons.stories';

test.describe('CategoryButtons Component', () => {
  test('カテゴリーボタンが表示される', async ({ mount }) => {
    const component = await mount(CategoryButtonsStories.Default);
    await expect(component.getByRole('button', { name: 'City' })).toBeVisible();
    await expect(component.getByRole('button', { name: 'Nature' })).toBeVisible();
    await expect(component.getByRole('button', { name: 'Culture' })).toBeVisible();
  });

  test('ボタンクリックでonSelectCategoryが呼ばれる', async ({ mount, page }) => {
    let selected = '';
    const component = await mount({
      ...CategoryButtonsStories.Default,
      args: {
        ...CategoryButtonsStories.Default.args,
        onSelectCategory: (cat) => { selected = cat; },
      },
    });
    await component.getByRole('button', { name: 'City' }).click();
    expect(selected).toBe('City');
  });
});
