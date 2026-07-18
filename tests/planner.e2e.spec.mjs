import { expect, test } from '@playwright/test';
import { startServer } from '../scripts/serve.mjs';

let server;

test.beforeAll(async () => {
  server = await startServer();
});

test.afterAll(async () => {
  if (server) {
    await new Promise((resolveClose, rejectClose) => {
      server.close((error) => error ? rejectClose(error) : resolveClose());
    });
  }
});

test('generates and exports a local recovery plan without credentials or network calls', async ({ context, page }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const externalRequests = [];
  const runtimeErrors = [];

  page.on('request', (request) => {
    const url = new URL(request.url());
    if (url.hostname !== '127.0.0.1') externalRequests.push(request.url());
  });
  page.on('pageerror', (error) => runtimeErrors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') runtimeErrors.push(message.text());
  });

  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle('CASPER Atlas · Multi-Agent Delivery Orchestrator');
  await expect(page.locator('#atlasSplash')).toHaveCount(0, { timeout: 6_000 });
  await expect(page.locator('.api-settings-btn')).toHaveCount(0);

  const concept = 'Complete an existing multi-tenant analytics dashboard, repair authentication, connect five API integrations, add end-to-end tests, and prepare a secure production release in 3 weeks.';
  await page.locator('#concept').fill(concept);
  await page.getByRole('button', { name: /Generate Atlas Plan/i }).click();
  await expect(page.locator('#output')).toHaveClass(/active/, { timeout: 8_000 });

  expect(await page.locator('#metrics .metric-card').count()).toBe(6);
  expect(await page.locator('#agents .agent-card').count()).toBeGreaterThan(4);
  await expect(page.locator('#decomposition')).toContainText('Completion & Finalization');
  await expect(page.locator('#decomposition')).toContainText('Quality Engineering');
  await expect(page.locator('#decomposition')).toContainText('Release Readiness');
  await expect(page.locator('#decomposition')).toContainText('3 weeks');
  await expect(page.locator('#hierarchy')).toContainText('Agent Hierarchy & Deployment');

  await page.getByRole('button', { name: /Copy JSON/i }).click();
  const exported = JSON.parse(await page.evaluate(() => navigator.clipboard.readText()));
  expect(exported.project).toBe(concept);
  expect(exported.epics.length).toBeGreaterThan(0);
  expect(exported.agents.length).toBeGreaterThan(0);

  const body = page.locator('body');
  const startedWarm = await body.evaluate((element) => element.classList.contains('theme-warm'));
  await page.locator('#themeToggle').click();
  await expect(body).toHaveClass(startedWarm ? /theme-dark/ : /theme-warm/);
  await page.getByRole('button', { name: /Reset/i }).click();
  await expect(page.locator('#concept')).toHaveValue('');
  await expect(page.locator('#output')).not.toHaveClass(/active/);

  const credentialKeys = await page.evaluate(() => [
    localStorage.getItem('api_key'),
    sessionStorage.getItem('api_key')
  ]);
  expect(credentialKeys).toEqual([null, null]);
  expect(externalRequests).toEqual([]);
  expect(runtimeErrors).toEqual([]);
});
