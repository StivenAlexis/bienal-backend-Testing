// Importa la biblioteca de pruebas de Playwright
const { test, expect } = require('@playwright/test');

test('Prueba de búsqueda de escultor o escultura', async ({ page }) => {
  // 1. Visita la URL de la aplicación en Vercel
  await page.goto('https://bienal-front-end-viuu.vercel.app/');

  // 2. Accede al campo de búsqueda y escribe el término de búsqueda
  const searchField = page.locator('input[placeholder="Buscar escultor o scultura"]');
  await searchField.fill('pepe');  // Ajusta el término según lo que quieras buscar

  // 3. Simula el Enter para ejecutar la búsqueda
  await searchField.press('Enter');

  
});

