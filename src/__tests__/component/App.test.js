import { test, expect } from '@playwright/experimental-ct-react';
import { Default } from '../../../tests/App.stories';

test.describe('App Component', () => {
  test('初期表示：タイトルと説明文が表示されている', async ({ mount }) => {
    // Storyオブジェクトを渡す
    const component = await mount(AppStories.Default);
    await expect(component.getByRole('heading', { name: 'Gadabout Explorer' })).toBeVisible();
    await expect(component.getByText('Select a category to discover your next adventure!')).toBeVisible();
  });

  test('カテゴリー選択ボタンが表示され、押下時に状態が変更される', async ({ mount }) => {
    const component = await mount(AppStories.Default);

    // カテゴリーボタンが全て表示されていること
    for (const category of ['City','Nature','Culture']) {
      await expect(component.getByRole('button', { name: category })).toBeVisible();
    }

    // "City" ボタンをクリックしてアクティブ状態になることを確認
    const cityButton = component.getByRole('button', { name: 'City' });
    await cityButton.click();
    await expect(cityButton).toHaveClass(/active/);

    // 選択したカテゴリー名が表示されていること
    await expect(component.getByText('Selected Category: City')).toBeVisible();
  });

  test('カテゴリー選択後、「Find Destination」ボタンを押すと目的地が表示される', async ({ mount }) => {
    const component = await mount(AppStories.Default);

    // Natureカテゴリを選択
    const natureButton = component.getByRole('button', { name: 'Nature' });
    await natureButton.click();
    await expect(natureButton).toHaveClass(/active/);
    await expect(component.getByText('Selected Category: Nature')).toBeVisible();

    // Find Destinationボタンをクリック
    const findDestinationButton = component.getByRole('button', { name: 'Find Destination' });
    await findDestinationButton.click();

    // 目的地が表示されることを確認
    const destinationLocator = component.locator('h3:has-text("Your Next Destination:")');
    await expect(destinationLocator).toBeVisible();
  });
});