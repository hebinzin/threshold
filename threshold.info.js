/*
 * Run this code in the Espruino Web IDE console to generate the `threshold.info`
 * file in the Bangle.js storage. This registers the app with the launcher.
 */
require("Storage").write("threshold.info",{
  "id":"threshold",
  "name":"Threshold",
  "type":"app",
  "src":"threshold.app.js",
  "icon":"threshold.img",
  "version":"0.11.1",
  "tags":"tool,health",
  "files":"threshold.info,threshold.app.js,threshold.settings.js,threshold.img",
  "data":"threshold.json"
});
