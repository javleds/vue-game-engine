import { chromium } from 'playwright'
import { createServer } from 'vite'
import { fileURLToPath } from 'node:url'

const outputDir = fileURLToPath(new URL('../assets/components', import.meta.url))
const viteConfig = fileURLToPath(new URL('./vite.config.ts', import.meta.url))

const componentNames = [
  'EngineActionDialog',
  'EngineCardShell',
  'EngineCardStack',
  'EngineChatForm',
  'EngineChatMessages',
  'EngineDeckCard',
  'EngineFloatingChat',
  'EngineGalleryOverlay',
  'EngineHelpButton',
  'EngineHelpModal',
  'EngineLobbyChat',
  'EngineLobbyPlayerList',
  'EnginePlayerStatusPanel',
  'EngineRoomSummary',
  'EngineTabs',
  'EngineTurnOrder',
]

const server = await createServer({
  configFile: viteConfig,
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: false,
  },
})

let browser

try {
  await server.listen()

  const [url] = server.resolvedUrls?.local ?? []

  if (!url) {
    throw new Error('Vite did not expose a local URL.')
  }

  browser = await launchBrowser()
  const page = await browser.newPage({ viewport: { width: 1200, height: 1000 }, deviceScaleFactor: 2 })

  await page.goto(url, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)

  for (const componentName of componentNames) {
    const shot = page.locator(`[data-shot="${componentName}"]`)
    await shot.scrollIntoViewIfNeeded()
    await shot.screenshot({
      path: `${outputDir}/${componentName}.png`,
      animations: 'disabled',
    })
  }
} finally {
  await browser?.close()
  await server.close()
}

async function launchBrowser() {
  const channel = process.env.PLAYWRIGHT_CHROME_CHANNEL ?? 'chrome'

  try {
    return await chromium.launch({ channel })
  } catch (error) {
    if (channel !== 'chrome') {
      throw error
    }

    return chromium.launch()
  }
}
