# Smart Mirror

#### Installation
In order to get started I suggest a clean install of Raspbian. You can snag a fresh copy of Jessie (recommended, it's the future) or Wheezy from the [Raspbian Download Page](https://www.raspberrypi.org/downloads/raspbian/).

You'll also need to install Node (v4.0.0+) which now comes bundled with npm.

##### Getting the code
Next up you'll want to clone this repository onto your Pi if you haven't already yet
```
git clone https://github.com/joestamour/smart-mirror-js
```

##### Setting up the configuration
Done? Excellent, let's continue.

Time to update the config file... You'll need to fill in one thing in `js/config.js`:

1. A [Forecast API key](https://developer.forecast.io/) (don't worry it's free)

##### Install dependencies and run
Before we can run the thing we've got to install the projects dependencies. From the root of the `smart-mirror` directory run:
```
npm install
```

This will take a minute, it has to download [electron-prebuilt](https://github.com/mafintosh/electron-prebuilt). Once that is done you can launch the mirror with
```
npm start
```

#### Disabling the debug console
If you don't want the debug console to open up every time you launch the mirror you'll want to comment this line out from `main.js`:
``` javascript
mainWindow.webContents.openDevTools();
```

### License:
MIT