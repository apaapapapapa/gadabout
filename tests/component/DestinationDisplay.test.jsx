import { test, expect } from '@playwright/experimental-ct-react';
import DestinationDisplay from '../../src/DestinationDisplay';

test('should display the category and "Find Destination" button when category is provided', async ({ mount }) => {
  const component = await mount(
    <DestinationDisplay 
      category="Beaches" 
      onFindDestination={() => {}} 
    />
  );

  await expect(component.locator('h2')).toHaveText('Selected Category: Beaches');
  await expect(component.locator('.find-destination-btn')).toBeVisible();
  // Destination should not be visible if not provided
  await expect(component.locator('text=Your Next Destination:')).toHaveCount(0);
});

test('should display the destination when provided', async ({ mount }) => {
  const component = await mount(
    <DestinationDisplay 
      category="Beaches" 
      onFindDestination={() => {}} 
      destination="Hawaii"
    />
  );
  
  await expect(component.locator('h3')).toHaveText('Your Next Destination: Hawaii');
});

test('should call onFindDestination when the button is clicked', async ({ mount }) => {
  let clicked = false;
  const onFindDestination = () => {
    clicked = true;
  };

  const component = await mount(
    <DestinationDisplay 
      category="Beaches" 
      onFindDestination={onFindDestination} 
    />
  );

  await component.locator('.find-destination-btn').click();
  expect(clicked).toBe(true);
});