const path = require('path');
const { app, ipcMain } = require('electron');
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
  minHeight: 400,
  // maxHeight: 400,
  preloadWindow: true,
  resizable: true,
});

mb.on('ready', async () => {
  await installExtensions();

  console.log('app is ready');
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// mb.on('focus-lost', () => {
//   mb.app.hide();
// });

ipcMain.on('quit', () => {
  app.quit();
});
