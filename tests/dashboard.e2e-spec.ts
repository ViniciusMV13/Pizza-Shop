import { expect, test } from '@playwright/test'

test('display day orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(page.getByText('10', { exact: true })).toBeVisible()
  await expect(page.getByText('+2% em relação a ontem')).toBeVisible()
})

test('display month orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(page.getByText('80', { exact: true })).toBeVisible()
  await expect(page.getByText('+24% em relação ao mês passado')).toBeVisible()
})

test('display month canceled orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(page.getByText('13', { exact: true })).toBeVisible()
  await expect(page.getByText('-2% em relação ao mês passado')).toBeVisible()
})

test('display month revenue metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(page.getByText('R$ 12,39')).toBeVisible()
  await expect(page.getByText('+242% em relação ao mês passado')).toBeVisible()
})
