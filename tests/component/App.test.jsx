import { test, expect } from '@playwright/experimental-ct-react';
import App from '../../src/App';

test('should select a category and display a destination', async ({ mount }) => {

  const component = await mount(<App />);

  // "City"カテゴリーを選択
  await component.locator('button', { hasText: 'City' }).click();

  await expect(component.locator('h2')).toHaveText('Selected Category: City');

  // 目的地を生成するボタンをクリック
  await component.locator('button', { hasText: 'Find Destination' }).click();

  // 目的地が表示されていることを確認
  const destinationText = component.locator('h3');
  await expect(destinationText).toHaveText(/Your Next Destination:/);
  await expect(destinationText).toContainText(/Tokyo, Japan|New York, USA|Paris, France/);
});