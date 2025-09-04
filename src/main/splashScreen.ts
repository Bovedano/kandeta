import { BrowserWindow } from 'electron'
import { join } from 'path'
import { readFileSync } from 'fs'
import icon from '../../resources/icon.png?asset'

let splashWindow: BrowserWindow | null = null

export function createSplashScreen(): BrowserWindow {
  splashWindow = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    icon
  })

  // Get version from package.json
  let appVersion = '1.0.0'
  try {
    const packageJsonPath = join(process.cwd(), 'package.json')
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
    appVersion = packageJson.version || '1.0.0'
  } catch (error) {
    console.log('Could not load version from package.json')
  }

  // Get icon as base64
  let logoBase64 = ''
  try {
    // Try multiple possible paths
    const possiblePaths = [
      join(__dirname, '../renderer/src/assets/icon.png'),
      join(__dirname, '../../src/renderer/src/assets/icon.png'),
      join(process.cwd(), 'src/renderer/src/assets/icon.png')
    ]
    
    for (const iconPath of possiblePaths) {
      try {
        const iconBuffer = readFileSync(iconPath)
        logoBase64 = `data:image/png;base64,${iconBuffer.toString('base64')}`
        break
      } catch (e) {
        continue
      }
    }
  } catch (error) {
    console.log('Could not load assets icon, using fallback')
    // Fallback to placeholder if icon not found
  }

  // Load splash screen HTML - for development, use data URL with HTML content
  const splashHTML = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Kandeta - Loading</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        background: linear-gradient(135deg, #222222 0%, #1b1b1f 100%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        color: rgba(255, 255, 245, 0.86);
        overflow: hidden;
      }

      .logo-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        animation: fadeInUp 1s ease-out;
      }

      .logo {
        width: auto;
        height: 120px;
        margin-bottom: 20px;
        animation: pulse 2s infinite;
        background: transparent;
        filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3));
      }

      .logo-placeholder {
        width: 80px;
        height: 80px;
        margin-bottom: 20px;
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: pulse 2s infinite;
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 36px;
        font-weight: 700;
        color: white;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
      }

      .app-name {
        font-size: 28px;
        font-weight: 600;
        margin-bottom: 8px;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        letter-spacing: 1px;
      }

      .app-version {
        font-size: 16px;
        font-weight: 300;
        color: rgba(235, 235, 245, 0.6);
        text-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
      }


      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
      }


      .particles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
      }

      .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        animation: float 6s ease-in-out infinite;
      }

      .particle:nth-child(1) { left: 10%; animation-delay: 0s; }
      .particle:nth-child(2) { left: 20%; animation-delay: 1s; }
      .particle:nth-child(3) { left: 30%; animation-delay: 2s; }
      .particle:nth-child(4) { left: 40%; animation-delay: 0.5s; }
      .particle:nth-child(5) { left: 50%; animation-delay: 1.5s; }
      .particle:nth-child(6) { left: 60%; animation-delay: 3s; }
      .particle:nth-child(7) { left: 70%; animation-delay: 2.5s; }
      .particle:nth-child(8) { left: 80%; animation-delay: 4s; }
      .particle:nth-child(9) { left: 90%; animation-delay: 1.8s; }

      @keyframes float {
        0%, 100% {
          transform: translateY(100vh) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(-10vh) rotate(360deg);
          opacity: 0;
        }
      }
    </style>
  </head>
  <body>
    <div class="particles">
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
    </div>
    
    <div class="logo-container">
      ${logoBase64 ? `<img src="${logoBase64}" alt="Kandeta Logo" class="logo" />` : '<div class="logo-placeholder">K</div>'}
      <div class="app-name">Kandeta</div>
      <div class="app-version">v${appVersion}</div>
    </div>
  </body>
</html>
  `
  splashWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(splashHTML)}`)

  splashWindow.on('closed', () => {
    splashWindow = null
  })

  return splashWindow
}

export function closeSplashScreen(): void {
  if (splashWindow) {
    splashWindow.close()
    splashWindow = null
  }
}