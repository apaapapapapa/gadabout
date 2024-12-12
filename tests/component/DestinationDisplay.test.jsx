import { test, expect } from '@playwright/experimental-ct-react';
import DestinationDisplayStories from './DestinationDisplay.stories';

test.describe('DestinationDisplay Component', () => {
  test('カテゴリがない場合、Selected CategoryやFind Destinationボタンが表示されない', async ({ mount }) => {
    const component = await mount(DestinationDisplayStories.NoCategory);
    await expect(component.getByText('Selected Category:', { exact: false })).toHaveCount(0);
    await expect(component.getByRole('button', { name: 'Find Destination' })).toHaveCount(0);
    await expect(component.getByText('Your Next Destination:', { exact: false })).toHaveCount(0);
  });

  test('カテゴリがある場合、Selected CategoryとFind Destinationボタンが表示される', async ({ mount }) => {
    const component = await mount(DestinationDisplayStories.WithCategory);
    await expect(component.getByText('Selected Category: City')).toBeVisible();
    await expect(component.getByRole('button', { name: 'Find Destination' })).toBeVisible();
  });

  test('目的地がある場合、Your Next Destinationが表示される', async ({ mount }) => {
    const component = await mount(DestinationDisplayStories.WithDestination);
    await expect(component.getByText('Your Next Destination: Tokyo, Japan')).toBeVisible();
  });

  test('Find DestinationボタンクリックでonFindDestinationが呼ばれる', async ({ mount }) => {
    let clicked = false;
    const component = await mount({
      ...DestinationDisplayStories.WithCategory,
      args: {
        ...DestinationDisplayStories.WithCategory.args,
        onFindDestination: () => { clicked = true; },
      },
    });
    await component.getByRole('button', { name: 'Find Destination' }).click();
    expect(clicked).toBe(true);
  });
});
