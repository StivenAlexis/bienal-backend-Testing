import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://bienal-front-end-viuu.vercel.app/');
  await page.getByPlaceholder('Buscar nombre de escultor o').click();
  await page.getByPlaceholder('Buscar nombre de escultor o').fill('Pepe');
  await page.getByPlaceholder('Buscar nombre de escultor o').press('Enter');
// 4. Verifica que los resultados sean visibles en la página
const result = page.locator('text=pepe'); // Ajusta este selector según el texto esperado
await expect(result).toBeVisible();
});