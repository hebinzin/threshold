const S = require("Storage");
const X = g.getWidth();
const Y = g.getHeight();

// Global interval IDs to prevent accumulation
let clockInterval, counterInterval;

function save(object, key, value, file)
// Save an object's value to a file
{
  object[key] = value;
  S.writeJSON(file, object);
}

function drawUI()
// Display the user interface, accounting for variables
{
  g.clear();

  // Clear any existing intervals to prevent accumulation
  if (clockInterval) clearInterval(clockInterval);
  if (counterInterval) clearInterval(counterInterval);

  // Display clock first, then set its refresh rate
  drawClock();
  clockInterval = setInterval(drawClock, 60000);

  // Read data from json file
  let data = Object.assign({
    bio: 1,
    height: 1.70,
    weight: 70,
    counter: 0,
    volume: 150,
    ratio: 4.5,
  }, S.readJSON('threshold.json', true) || {});

  // Display counter
  g.setFontAlign(0, 0).setFont("6x8", 3);
  g.drawString(data.counter, X * 0.28, Y * 0.72, true);

  // Display current beverage settings below counter (two lines)
  g.setFont("6x8", 1);
  g.drawString(data.volume + "ml", X * 0.28, Y * 0.82, true);
  g.drawString(data.ratio + "%", X * 0.28, Y * 0.90, true);

  // Set a regular check for the counter timeout
  counterInterval = setInterval(clearCounter, 60000);

  let bac = calcBAC(
    calcABV(data.volume, data.ratio),
    data.counter,
    calcTBV(data.bio, data.height, data.weight)
  );

  drawEnd(inferEnd(bac, data.bio));

  waitPrompt(warn(bac));

  g.setFontAlign(0, 0).setFont("6x8", 3);
  g.drawString(bac.toFixed(2).substring(1), X * 0.72, Y * 0.72, true);
  g.drawString(' %', X * 0.72, Y * 0.86, true);

  let glass = [
    X * 0.09, Y * 0.59,
    X * 0.16, Y * 0.93,
    X * 0.36, Y * 0.93,
    X * 0.43, Y * 0.59
  ];
  g.drawPoly(glass);

  // Swipe-up hint chevron at bottom center
  g.setFontAlign(0, 1).setFont("6x8", 2);
  g.setColor("#888");
  g.drawString("^", X * 0.5, Y - 2);
  g.reset();

  Bangle.drawWidgets();
}

function drawClock()
// Draw current time
{
  g.reset();
  let time = require('locale').time(new Date(), 1);
  g.setFontAlign(0, 0).setFont("6x8", 4);
  g.drawString(time, X * 0.5, Y * 0.3, true);
}

function clearCounter()
// Clears the counter at the time specified in scope
{
  let scope = Object.assign({
    counter: 0,
    cooldown: Date.now()
  }, S.readJSON('threshold.json', true) || {});

  let localCounter = scope.counter;

  if (Date.now() > scope.cooldown) {
    localCounter = 0;
    save(scope, 'counter', localCounter, 'threshold.json');
    drawUI();
  }
}

function calcABV(volume, ratio)
// Estimates the alcohol mass by volume in a beverage
{
  return ((volume * ratio) / 100) * 0.79;
}

function calcTBV(isMale, h, w)
// Estimates the user's Total Blood Volume (based on Nadler's Formula)
{
  if (isMale)
    return 0.37 * (h * h * h) + 0.032 * w + 0.6;
  else
    return 0.36 * (h * h * h) + 0.033 * w + 0.18;
}

function calcBAC(abv, drinks, tbv)
// Returns the user "Blood Alcohol Content" (based on Widmark Formula)
{
  return (abv * drinks) / (tbv * 100);
}

function inferEnd(bac, isMale)
// Anticipates the alcohol metabolization time
{
  let scope = Object.assign({
    cooldown: Date.now(),
    lastDrink: Date.now()
  }, S.readJSON('threshold.json', true) || {});

  let rate = isMale ? 0.015 : 0.017;
  let endTime = (3600000 * (bac / rate)) + scope.lastDrink;
  save(scope, 'cooldown', endTime, 'threshold.json');
  return endTime;
}

function drawEnd(timestamp)
// Display the approximate time by when the user's BAC will be processed
{
  g.reset();
  if (timestamp > Date.now()) {
    let ClearOutTime = require('locale').time(new Date(timestamp), 1);
    g.setFontAlign(0, 0).setFont("6x8", 2);
    g.drawString(ClearOutTime, X * 0.5, Y * 0.48, true);
  }
}

function warn(bac)
// Sets warning color and returns prompt text based on BAC level
{
  let msg;
  if (bac > 0.159) {
    g.setColor(1, 0, 0);
    msg = 'You shouldn\'t go on. Count another?';
  } else if (bac > 0.079) {
    g.setColor(1, 1, 0);
    msg = 'Be careful! Count another glass?';
  } else if (bac > 0.039) {
    g.setColor(0, 1, 0);
    msg = 'Count one more drink?';
  } else {
    msg = 'Count up a drink?';
    g.reset();
  }
  return msg;
}

function waitPrompt(text)
// Prompt to add a drink to the counter
{
  let prompt = false;
  Bangle.removeAllListeners('swipe'); // Remove old handlers to prevent accumulation
  Bangle.on('swipe', (directionLR, directionUD) => {
    if (
      directionUD === -1 &&
      !Bangle.isLocked() &&
      !prompt
    ) {
      // Clear intervals before showing prompt (they'll be recreated in drawUI)
      if (clockInterval) clearInterval(clockInterval);
      if (counterInterval) clearInterval(counterInterval);
      prompt = true;
      let scope = Object.assign({
        counter: 0,
        lastDrink: Date.now()
      }, S.readJSON('threshold.json', true) || {});
      let localCounter = scope.counter;
      E.showPrompt(text, {
        title: 'Threshold',
        buttons: {
          'Yes': 1,
          'No': 0,
          'More': -1
        }
      }).then((v) => {
        if (v > 0) {
          localCounter++;
          scope.counter = localCounter;
          scope.lastDrink = Date.now();
          S.writeJSON('threshold.json', scope);
          drawUI();
        } else if (v < 0) {
          moreMenu();
        } else {
          drawUI();
        }
      });
    }
  });
}

function moreMenu()
// Display menu with additional options
{
  let data = S.readJSON('threshold.json', true) || {};

  let menuItems = {
    '': { 'title': 'Options' },
    '< Back': () => drawUI()
  };

  // Only show Undo if there are drinks to undo
  if (data.counter > 0) {
    menuItems['- Undo last'] = () => {
      data.counter--;
      S.writeJSON('threshold.json', data);
      drawUI();
    };
  }

  menuItems['Beverage'] = () => bevMenu();

  menuItems['Reset counter'] = () => {
    E.showPrompt('Reset drink\ncounter to 0?').then((v) => {
      if (v) {
        data.counter = 0;
        S.writeJSON('threshold.json', data);
      }
      drawUI();
    });
  };

  E.showMenu(menuItems);
}

function bevMenu()
// Set and display menu to configure beverage attributes
{
  let beverage = Object.assign({
    volume: 150,
    ratio: 4.5
  }, S.readJSON('threshold.json', true) || {});

  let bevAttributes = {
    '': {
      'title': 'Beverage'
    },
    '< Back': () => {
      drawUI();
    },
    'Volume (ml)': {
      value: beverage.volume,
      min: 10,
      max: 1000,
      step: 1,
      onchange: v => save(beverage, 'volume', v, 'threshold.json')
    },
    'Alcohol (%)': {
      value: beverage.ratio,
      min: 0.5,
      max: 70.0,
      step: 0.5,
      onchange: r => save(beverage, 'ratio', r, 'threshold.json')
    },
  };
  E.showMenu(bevAttributes);
}

function showSetup()
// First-run setup menu for essential user settings
{
  let data = Object.assign({
    bio: 1,
    height: 1.70,
    weight: 70
  }, S.readJSON('threshold.json', true) || {});

  const BIO = ['Female', 'Male'];

  E.showMenu({
    '': { 'title': 'Setup' },
    'Biological sex': {
      value: data.bio,
      min: 0, max: 1,
      format: b => BIO[b],
      onchange: b => { data.bio = b; }
    },
    'Height (m)': {
      value: data.height,
      min: 0.55, max: 2.72, step: 0.01,
      onchange: h => { data.height = h; }
    },
    'Weight (kg)': {
      value: data.weight,
      min: 2, max: 635, step: 1,
      onchange: w => { data.weight = w; }
    },
    'Save': () => {
      S.writeJSON('threshold.json', data);
      drawUI();
    }
  });
}

function init()
// App entry point with first-run detection
{
  Bangle.loadWidgets(); // Load widgets once at startup

  let data = S.readJSON('threshold.json', true);

  // Check if essential user measurements exist
  if (!data || data.bio === undefined || data.height === undefined || data.weight === undefined) {
    E.showPrompt("Configure your\nmeasurements for\naccurate BAC?", {
      title: "Welcome!",
      buttons: { "Setup": true, "Exit": false }
    }).then((v) => {
      if (v) {
        showSetup();
      } else {
        load(); // Exit to launcher, will prompt again next time
      }
    });
  } else {
    drawUI();
  }
}

init();