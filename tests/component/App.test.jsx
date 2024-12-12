import { test, expect } from '@playwright/experimental-ct-react';
import AppStories from './App.stories';

test.describe('App Component', () => {
  test('初期表示：タイトルと説明が表示され、カテゴリボタンがある', async ({ mount }) => {
    const component = await mount(AppStories.Default);
    await expect(component.getByRole('heading', { name: 'Gadabout Explorer' })).toBeVisible();
    await expect(component.getByText('Select a category to discover your next adventure!')).toBeVisible();
    
    // カテゴリーボタンが表示されていること
    await expect(component.getByRole('button', { name: 'City' })).toBeVisible();
    await expect(component.getByRole('button', { name: 'Nature' })).toBeVisible();
    await expect(component.getByRole('button', { name: 'Culture' })).toBeVisible();
  });

  test('カテゴリを選択すると「Selected Category: ...」が表示', async ({ mount }) => {
    const component = await mount(AppStories.Default);
    const cityButton = component.getByRole('button', { name: 'City' });
    await cityButton.click();
    await expect(component.getByText('Selected Category: City')).toBeVisible();
  });

  test('カテゴリ選択後、Find Destinationボタン押下でモックDestinationが表示される', async ({ mount }) => {
    const component = await mount(AppStories.Default);
    await component.getByRole('button', { name: 'City' }).click();
    await component.getByRole('button', { name: 'Find Destination' }).click();
    await expect(component.getByText('Your Next Destination: Mock Destination')).toBeVisible();
  });
});
