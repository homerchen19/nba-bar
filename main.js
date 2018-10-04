const path = require('path');
const { format } = require('url');
const {
  app,
  ipcMain,
  globalShortcut,
  Menu,
  shell,
  BrowserWindow,
  dialog,
  Notification,
} = require('electron');
const menubar = require('menubar');
const { autoUpdater } = require('electron-updater');
const isDev = require('electron-is-dev');
const prepareNext = require('electron-next');
const { resolve } = require('app-root-path');

if (isDev) {
  require('electron-debug')({ showDevTools: true });
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');

  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

const createAboutWindow = () => {
  const aboutWindow = new BrowserWindow({
    title: 'About',
    y: 0,
    width: 285,
    height: 165,
    backgroundColor: '#f7f7f7',
    show: false,
    resizable: isDev,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
  });

  const html = `
  <body style="margin: 0; padding: 20px; text-align: center; color: #32292F; font-family: sans-serif;">
    <h3>NBA Bar</h3>
    <p style="margin: 10px; font-size: 12px;">Version ${app.getVersion()}</p>
    <p style="margin: 10px; font-size: 12px;">Copyright © 2018 xxhomey19</p>
  </body>`;

  aboutWindow.loadURL(`data:text/html;charset=utf-8, ${encodeURI(html)}`);
  aboutWindow.on('close', e => {
    aboutWindow.hide();

    e.preventDefault();
  });

  return aboutWindow;
};

let aboutWindow;

const mb = menubar({
  alwaysOnTop: isDev,
  icon: path.join(app.getAppPath(), 'resources/menubarDefaultTemplate.png'),
  minWidth: 300,
  maxWidth: isDev ? undefined : 300,
  minHeight: 465,
  maxHeight: isDev ? undefined : 465,
  preloadWindow: true,
  resizable: isDev,
  movable: false,
  webPreferences: { webSecurity: false },
});

const reload = () => {
  if (isDev) {
    mb.window.reload();
  }
};

mb.on('ready', async () => {
  await prepareNext('./renderer', 8080);

  if (isDev) {
    await installExtensions();
  }

  globalShortcut.register('CommandOrControl+R', reload);
  globalShortcut.register('F5', reload);

  const devPath = 'http://localhost:8080/home';

  const prodPath = format({
    pathname: resolve('renderer/out/home/index.html'),
    protocol: 'file:',
    slashes: true,
  });

  const url = isDev ? devPath : prodPath;
  mb.window.loadURL(url);

  console.log('app is ready');
});

mb.on('after-create-window', () => {
  aboutWindow = createAboutWindow();

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'About NBA Bar',
      click: () => aboutWindow.show(),
    },
    {
      type: 'separator',
    },
    {
      label: 'Check for Updates…',
      click: item => {
        // eslint-disable-next-line no-param-reassign
        item.enabled = false;

        if (!isDev) {
          autoUpdater.checkForUpdates();
        } else {
          console.log('autoUpdater is only available in production');
        }
      },
    },
    {
      type: 'separator',
    },
    {
      label: 'Contribute',
      click: () => shell.openExternal('https://github.com/xxhomey19/nba-bar'),
    },
    {
      type: 'separator',
    },
    {
      role: 'quit',
      accelerator: 'Cmd+Q',
    },
  ]);

  mb.tray.on('right-click', () => {
    mb.tray.popUpContextMenu(contextMenu);
  });
});

mb.app.on('before-quit', () => {
  aboutWindow.removeAllListeners('close');
  aboutWindow.close();
});

mb.app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

ipcMain.on('quit', () => {
  mb.app.quit();
});

autoUpdater.on('error', error => {
  dialog.showErrorBox(
    'Update Failed: ',
    error == null ? 'unknown' : (error.stack || error).toString()
  );
});

autoUpdater.on('update-not-available', () => {
  new Notification({
    title: 'No updates available!',
    body: `You are running the latest version of ${mb.app.getName()} 🎉`,
  }).show();
});

autoUpdater.on('update-downloaded', () => {
  const message =
    'It will be installed the next time you restart the application.';

  dialog.showMessageBox(
    {
      type: 'question',
      buttons: ['Install and Relaunch', 'Later'],
      defaultId: 0,
      message: `An update for ${app.getName()} is available 🎉`,
      detail: message,
    },
    response => {
      if (response === 0) {
        setImmediate(() => {
          mb.app.removeAllListeners('window-all-closed');

          autoUpdater.quitAndInstall(false);
          mb.app.quit();
        });
      }
    }
  );
});
