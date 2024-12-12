// tests/gadabout.spec.js
import { test, expect } from '@playwright/test';
const { spawn } = require('child_process');

// Reactアプリケーションのプロセスを管理
let reactProcess;

// Reactアプリケーションをバックグラウンドで起動
const startReactApp = () => {
  reactProcess = spawn('npm', ['start'], { shell: true });

  reactProcess.stdout.on('data', (data) => {
    if (data.includes('Compiled successfully')) {
      console.log('React app started successfully');
    }
  });

  reactProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  reactProcess.on('close', (code) => {
    console.log(`React app stopped with code ${code}`);
  });
};

// アプリを停止するための処理
const stopReactApp = () => {
  if (reactProcess) {
    reactProcess.kill('SIGINT'); // 'SIGINT' で終了シグナルを送信
  }
};

test.beforeAll(async () => {
  // Reactアプリケーションをバックグラウンドで起動
  startReactApp();

  // アプリが起動するまで待機
  await new Promise((resolve) => setTimeout(resolve, 10000)); // 必要に応じて調整
});

test.afterAll(() => {
  // Reactアプリケーションを終了
  stopReactApp();
});

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000');  // ローカルでのアプリのURL
});

test.describe('Gadabout Explorer App', () => {
  test('should display the app header and buttons', async ({ page }) => {
    // ヘッダーが表示されているか確認
    await expect(page.locator('h1')).toHaveText('Gadabout Explorer');
    
    // カテゴリー選択ボタンが表示されているか確認
    const buttons = page.locator('.buttons button');
    await expect(buttons).toHaveCount(3); // City, Nature, Culture のボタン
  });

  test('should select a category and display selected category', async ({ page }) => {
    // "City"カテゴリーをクリック
    await page.locator('button', { hasText: 'City' }).click();

    // 選択したカテゴリーが表示されていることを確認
    await expect(page.locator('h2')).toHaveText('Selected Category: City');
  });

  test('should show a random destination after selecting a category', async ({ page }) => {
    // "City"カテゴリーを選択
    await page.locator('button', { hasText: 'City' }).click();

    // 目的地を生成するボタンをクリック
    await page.locator('button', { hasText: 'Find Destination' }).click();

    // 目的地が表示されていることを確認
    const destinationText = page.locator('h3');
    await expect(destinationText).toHaveText(/Your Next Destination:/);
    await expect(destinationText).toContainText(/Tokyo, Japan|New York, USA|Paris, France/);
  });

  test('should display correct destination based on selected category', async ({ page }) => {
    // "Nature"カテゴリーを選択
    await page.locator('button', { hasText: 'Nature' }).click();

    // 目的地を生成するボタンをクリック
    await page.locator('button', { hasText: 'Find Destination' }).click();

    // 目的地が表示されていることを確認
    const destinationText = page.locator('h3');
    await expect(destinationText).toHaveText(/Your Next Destination:/);
    await expect(destinationText).toContainText(/Yellowstone, USA|Banff, Canada|Great Barrier Reef, Australia/);
  });

  test('should clear destination when a new category is selected', async ({ page }) => {
    // "City"カテゴリーを選択
    await page.locator('button', { hasText: 'City' }).click();

    // 目的地を生成するボタンをクリック
    await page.locator('button', { hasText: 'Find Destination' }).click();

    // "Nature"カテゴリーを選択
    await page.locator('button', { hasText: 'Nature' }).click();

    // 新しいカテゴリーが選択されたことを確認
    await expect(page.locator('h2')).toHaveText('Selected Category: Nature');

    // 目的地がクリアされていることを確認
    const destinationText = page.locator('h3');
    const count = await destinationText.count();
    expect(count).toBe(0);  // h3タグが存在しないことを確認
  });

  test('should toggle the active class for selected category button', async ({ page }) => {
    // "City"カテゴリーを選択
    await page.locator('button', { hasText: 'City' }).click();
    
    // ボタンがアクティブになっているか確認
    await expect(page.locator('button', { hasText: 'City' })).toHaveClass(/active/);

    // "Nature"カテゴリーを選択
    await page.locator('button', { hasText: 'Nature' }).click();
    
    // "Nature"ボタンがアクティブになっているか確認
    await expect(page.locator('button', { hasText: 'Nature' })).toHaveClass(/active/);
    
    // "City"ボタンが非アクティブになっているか確認
    await expect(page.locator('button', { hasText: 'City' })).not.toHaveClass(/active/);
  });
});