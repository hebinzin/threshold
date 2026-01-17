(function(back) {
    const S = require('Storage');
    let settings = Object.assign({
      bio: 1,
      height: 1.70,
      weight: 70,
      counter: 0
    }, S.readJSON('threshold.json', true) || {});

    function save(key, value) {
      settings[key] = value;
      S.writeJSON('threshold.json', settings);
    }

    const BIO = ['Female', 'Male'];

    let confMenu = {
      '': {
        'title': 'Threshold'
      },

      '< Back': back,

      'Biological sex': {
        value: settings.bio,
        min: 0,
        max: 1,
        format: b => BIO[b],
        onchange: b => save('bio', b)
      },

      'Height (metric)': {
        value: settings.height,
        min: 0.55, // Chandra Bahadur Dangi
        max: 2.72, // Robert Wadlow
        step: 0.01,
        onchange: h => save('height', h)
      },

      'Weight (kg)': {
        value: settings.weight,
        min: 2, // Lucía Zárate
        max: 635, // Jon Brower Minnoch
        step: 1,
        onchange: w => save('weight', w)
      },

      'Reset Counter': () => {
        //save('counter', 0);
        E.showPrompt('Confirm erase counter?', {
          title: 'Threshold',
          buttons: {
            'Yes': true,
            'No': false
          },
          remove: () => {
            load(__FILE__);
          }
        }).then((v) => {
          if (v) save('counter', 0);
          load(__FILE__);
        });
      }
    };
    E.showMenu(confMenu);
  })