const path = require('path');
const {
  app,
  ipcMain,
  globalShortcut,
  Menu,
  shell,
  BrowserWindow,
} = require('electron');
const menubar = require('menubar');

require('fix-path')();

if (process.env.NODE_ENV === 'development') {
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

const createAboutPage = () => {
  const aboutPage = new BrowserWindow({
    title: 'About',
    y: 0,
    width: 285,
    height: 165,
    backgroundColor: '#f7f7f7',
    show: false,
    resizable: process.env.NODE_ENV === 'development',
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

  aboutPage.loadURL(`data:text/html;charset=utf-8, ${encodeURI(html)}`);
  aboutPage.on('close', e => {
    aboutPage.hide();

    e.preventDefault();
  });

  return aboutPage;
};

const mb = menubar({
  alwaysOnTop: process.env.NODE_ENV === 'development',
  icon: path.join(app.getAppPath(), 'resources/menubarDefaultTemplate.png'),
  minWidth: 300,
  maxWidth: process.env.NODE_ENV === 'development' ? undefined : 300,
  minHeight: 465,
  maxHeight: process.env.NODE_ENV === 'development' ? undefined : 465,
  preloadWindow: true,
  resizable: process.env.NODE_ENV === 'development',
  movable: false,
});

mb.on('ready', async () => {
  if (process.env.NODE_ENV === 'development') {
    await installExtensions();
  }

  globalShortcut.register('CommandOrControl+R', () => {
    mb.window.reload();
  });

  console.log('app is ready');
});

mb.on('after-create-window', () => {
  const aboutPage = createAboutPage();

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'About NBA Bar',
      click: () => aboutPage.show(),
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

mb.on('focus-lost', () => {
  if (process.env.NODE_ENV !== 'development') {
    mb.app.hide();
  }
});

mb.app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

ipcMain.on('quit', () => {
  app.quit();
});
