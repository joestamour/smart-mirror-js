var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Report crashes to our server.
require('crash-reporter').start();

// Prevent the computer from going to sleep
const powerSaveBlocker = require('electron').powerSaveBlocker;
var id = powerSaveBlocker.start('prevent-display-sleep');
console.log(powerSaveBlocker.isStarted(id));

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

var exec = require('child_process').exec;
var cmd = 'python -m SimpleHTTPServer 8000';

exec(cmd, function(error, stdout, stderr) {
  // command output is in stdout
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {

  var browserWindowOptions = {width: 1080, height: 1920, icon: 'favicon.ico' , kiosk:false, autoHideMenuBar:true, darkTheme:true};

  // Create the browser window.
  mainWindow = new BrowserWindow(browserWindowOptions);

  // and load the index.html of the app.
  mainWindow.loadUrl('http://localhost:8000/index.html');

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
