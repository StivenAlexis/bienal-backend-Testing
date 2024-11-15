import { test, expect } from '@playwright/test';
//Test Escultor
test('test', async ({ page }) => {
  await page.goto('https://bienal-front-end-viuu.vercel.app/');
  await page.getByPlaceholder('Buscar...').click();
  await page.getByPlaceholder('Buscar...').fill('Aquinopla');
  await page.getByPlaceholder('Buscar...').press('Enter');
  await page.getByRole('link', { name: 'Aquinopla Obras: cristoaaa' }).click();
});
