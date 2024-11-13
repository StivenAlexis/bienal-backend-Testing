import { test, expect } from '@playwright/test';

test('Prueba de búsqueda de escultor', async ({ page }) => {
  // 1. Navega a la URL de la aplicación
  await page.goto('https://bienal-front-end-viuu.vercel.app/');

  // 2. Accede al campo de búsqueda y escribe 'pepe'
  await page.getByPlaceholder('Buscar nombre de escultor o').click();
  await page.getByPlaceholder('Buscar nombre de escultor o').fill('pepe');

  // 3. Presiona Enter para realizar la búsqueda
  await page.getByPlaceholder('Buscar nombre de escultor o').press('Enter');

  // 4. Verifica que el resultado esperado esté visible
  const result = page.locator('text=Pepe'); // Ajusta este texto con el esperado
  await expect(result).toBeVisible();
});
