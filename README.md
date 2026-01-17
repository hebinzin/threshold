# Threshold

## Description

**Threshold** is an alcohol consumption tracker and blood alcohol content estimator for the [Bangle.js 2](https://www.espruino.com/Bangle.js2) smartwatch.


## Disclaimer

The purpose of this application is not to support any kind of alcohol intake, or to provide qualified advice on this subject, but to be helpful to people who would like to get rough information from their own consumption.

While its calculation methods may be inspired by science, they might result in rather superficial data, providing only overall estimates so users might reflect on their alcohol intake and hopefully improve their habits to healthier ones.

**It should never replace proper therapy**.

Any health issues related to alcoholic habits must be treated by specialized professionals.


## How to Install

### Option 1: Via App Loader (Recommended)

Threshold is being integrated into the [Bangle.js App Loader](https://banglejs.com/apps/). In the meantime, it can be installed via the developer's fork:

1. Visit the [developer's App Loader](https://hebinzin.github.io/BangleApps/)
2. Connect your Bangle.js 2 via Web Bluetooth
3. Search for "Threshold" and click Upload

### Option 2: Manual Installation (Espruino Web IDE)

For development or if the App Loader isn't available:

1. Open the [Espruino Web IDE](https://www.espruino.com/ide/) and [connect via Bluetooth](https://www.espruino.com/Bangle.js+Development#bangle-js-2).
2. Click the Storage icon (folder with chip) in the center divider.
3. Upload `threshold.app.js`, `threshold.settings.js`, and `threshold.img`.
4. In the left console, run:
```javascript
require("Storage").write("threshold.info",{"id":"threshold","name":"Threshold","type":"app","src":"threshold.app.js","icon":"threshold.img","version":"0.10","tags":"tool,health","files":"threshold.info,threshold.app.js,threshold.settings.js","data":"threshold.json"});
```
5. Long-press the Bangle.js 2 button to reset the device.

The application will now appear in the launcher.


## How to Use

### 1. Setting Up

Threshold is meant to be used during a drinking "session" (e.g., a party or meeting) so users can keep track of how many glasses they drank and estimate their blood alcohol level. The application should first be configured with the user's attributes for more accurate evaluations:

1. While at the clock screen, press the device button to unlock, then press again to open the launcher.
2. Go to the `Settings` app, then to the `Apps` submenu.
3. Select `Threshold` to configure its settings:
   - `Biological sex` as either `Male` or `Female`
   - `Height (metric)` as your height in meters
   - `Weight (kg)` as your weight in kilograms
   - The `Reset counter` option can be ignored for now
4. Press the device's button three times to return to the clock screen.

The application is now configured and can therefore be run by following these steps:

1. At the clock, unlock the screen and go to the launcher.
2. Launch `Threshold` by selecting it from the list (it may vary according to the [launcher](https://banglejs.com/apps/?c=launch) used).


### 2. Interacting with the Main Screen

At Threshold's main screen, you will see the widgets on top and a few numerals on the main portion of the screen:

- A clock on the upper half, showing the current time.
- A number on the bottom left, showing the drink count.
- A percentage on the bottom right, depicting the user's Blood Alcohol Content.

With the device unlocked, the user can swipe up from the bottom of the screen to launch a prompt with three options:

1. `Yes` — add a "glass" to the drink counter.
2. `No` — go back to the previous screen.
3. `..` — open the "beverage menu" to configure drink attributes.


### 3. Use Case

Say a user is drinking wine at dinner — 120 ml per glass, 12.5% alcohol by volume. They can enter the beverage menu (by selecting `..` at the prompt) and set `Volume (ml)` and `Alcohol (%)` accordingly. Then, they add a drink to the counter by selecting `Yes`. It's best to do this just after finishing each glass.

After that, a smaller clock will appear at the center of the screen, showing an estimate of when the alcohol will be fully metabolized. If another drink is added before that time, the estimate will extend. When the time is finally reached, the counter resets to zero.


### 4. BAC Information

An important part of the application is the percentage displayed at the bottom right, representing the **mass of alcohol per 100 mL of blood** — the [Blood Alcohol Content](https://en.wikipedia.org/wiki/Blood_alcohol_content). It uses both Widmark and Nadler's formulae to estimate BAC based on the user's Total Blood Volume and the amount of alcohol consumed.

As the user adds more drinks or consumes stronger beverages, this number grows and changes color to signal intoxication level (based on [this reference](https://en.wikipedia.org/wiki/Short-term_effects_of_alcohol_consumption#Effects_by_dosage)). When displayed in red, the user should stop drinking — they are approaching dangerous intoxication levels.


## How It Works

To provide its functionality, Threshold needs five files:

1. `threshold.info`, which essentially has cues so that the device can "understand" how to display the application and which files it accesses.
2. `threshold.img`, the icon that represents Threshold in the launcher.
3. `threshold.json`, which stores all persistent attributes (variables) that provide the application functionality.
4. `threshold.settings.js`, which adds a global settings screen and enables the user to change its attributes.
5. `threshold.app.js`, which reads all the attributes, performs calculations from them, and displays the interface with those calculations' results.

Here's a closer look at the last three files:

### `threshold.json`

A [JavaScript Object Notation](https://en.wikipedia.org/wiki/JSON) file, storing the following variables:

- `cooldown`, for the time by when the user's blood alcohol content will be metabolized.
- `lastDrink`, for the time when the user last registered a glass.
- `bio`, for the user's biological sex, which modifies some formulae constants (changeable through the global app settings).
- `height`, for the user's height in meters (changeable through the global app settings).
- `weight`, for the user's weight in kilograms (changeable through the global app settings).
- `counter`, for the drink glass counter (changeable via prompt and through the settings screen).
- `volume`, for the volume (in mL) of each drink (changeable through the beverage menu).
- `ratio`, for the beverage's alcohol percentage (changeable through the beverage menu).


### `threshold.settings.js`

A JavaScript file (created with the help of [this guide](http://www.espruino.com/Bangle.js+App+Settings#the-settings-page)) that allows users to change `bio`, `height`, and `weight` values. It also provides the option to reset the drink `counter`.


### `threshold.app.js`

It has JavaScript code that presents users with an interface that allows them to count and keep track of the number of glasses they drank in a "session", show their estimated BAC, and when — approximately — it will be metabolized, aside from the current time and their widgets of choice.


## Motivation

Despite the many known harms that alcohol abuse can cause to people's health and society, its consumption remains a deeply rooted practice in many cultures, where building social bonds around drinking habits is common. As a consequence, many people develop health issues related to alcohol intake, making it important to bring out information and tools that help them rethink their habits and pursue a more balanced lifestyle. In that context, Threshold aims to help alcohol consumers be more conscious about how much they drink and how it may affect them.

**Further Reading:**
- [Alcohol — Is It Good or Bad for You?](https://www.healthline.com/nutrition/alcohol-good-or-bad)
- [Sorting Out the Health Effects of Alcohol](https://www.health.harvard.edu/blog/sorting-out-the-health-effects-of-alcohol-2018080614427)
- [Alcohol Toxicity (Wikipedia)](https://en.wikipedia.org/wiki/Alcohol_(drug)#Toxicity)
- [Social and Cultural Aspects of Drinking](http://www.sirc.org/publik/drinking6.html)
- [Is It Time to Rethink How Much You Drink?](https://www.health.harvard.edu/newsletter_article/is-it-time-to-rethink-how-much-you-drink)


## Design Choices

Threshold uses a minimalist user interface, relying on the device's [built-in fonts](https://www.espruino.com/Fonts) and simple visual cues: a glass icon for the drink counter, a percent sign for BAC, and color-coded warnings (green → yellow → red) to signal intoxication levels. Apart from the launcher icon, everything is drawn by the application itself.

The codebase follows [Espruino's performance guidelines](https://www.espruino.com/Performance) and [code style recommendations](https://www.espruino.com/Code+Style) to ensure efficient use of the Bangle.js 2's limited resources.


## Roadmap

For planned features, bug fixes, and version milestones, see [ROADMAP.md](ROADMAP.md).


## Origin & Inspiration

Threshold is based on Nestor, my final project for [CS50's Introduction to Computer Science](https://cs50.harvard.edu/x/).

The following projects served as inspiration during Nestor's original development:

- [CanIDrive](https://github.com/VincentAudibert/CanIDrive) — Android app
- [Drink Counter](https://github.com/espruino/BangleApps/tree/master/apps/drinkcounter) — Bangle.js app
- [Drunk Calc](https://drunkcalc.com/) — Web app
- [Blood Volume Calculator](https://www.omnicalculator.com/health/blood-volume) — Web app


## License

This application is [MIT-licensed](https://opensource.org/licenses/MIT).