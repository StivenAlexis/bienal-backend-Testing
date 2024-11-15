import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://bienal-front-end-viuu.vercel.app/');
  await page.getByPlaceholder('Buscar...').click();
  await page.getByPlaceholder('Buscar...').fill('gonzalo');
  await page.getByRole('link', { name: 'Gonzalo Escultor: Frontvi' }).click();
});