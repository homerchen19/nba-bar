const path = require('path');
const { app, ipcMain, globalShortcut } = require('electron');
const menubar = require('menubar');

require('fix-path')();

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')({ showDevTools: true });
}

const installExtensions = async () => {
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer');

    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;

    return Promise.all(
      extensions.map(name => installer.default(installer[name], forceDownload))
    ).catch(console.log);
  }
};

const mb = menubar({
  alwaysOnTop: process.env.NODE_ENV === 'development',
  icon: path.join(app.getAppPath(), 'resources/IconTemplate.png'),
  minWidth: 300,
  // maxWidth: 300,
  minHeight: 470,
  // maxHeight: 470,
  preloadWindow: true,
  resizable: process.env.NODE_ENV === 'development',
});

mb.on('ready', async () => {
  await installExtensions();

  globalShortcut.register('CommandOrControl+R', () => {
    mb.window.reload();
  });

  console.log('app is ready');
});

// mb.on('focus-lost', () => {
//   mb.app.hide();
// });

mb.app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

ipcMain.on('quit', () => {
  app.quit();
});
