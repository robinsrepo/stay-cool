var osmb = new OSMBuildings({
    container: 'map',
    position: { latitude: 43.6532, longitude: -79.3832 },
    zoom: 16,
    minZoom: 30,
    maxZoom: 19
  });

  
  osmb.addMapTiles(
    "index.html",
    {
      attribution: '© Data <a href="https://openstreetmap.org/copyright/">OpenStreetMap</a> · © Map <a href="https://mapbox.com/">Mapbox</a>'
    }
  );

  osmb.addGeoJSONTiles('https://{s}.data.osmbuildings.org/0.2/anonymous/tile/{z}/{x}/{y}.json');

  //osmb.addOBJ(`${location.protocol}//${location.hostname}/${location.pathname}../data/Fernsehturm.obj`, { latitude:52.52000, longitude:13.41000 }, { id:'Fernsehturm', scale:2, color:'#ff0000', altitude:0, rotation:51 });

  //***************************************************************************

  // on pointer up
  osmb.on('pointerup', e => {
    // if none, remove any previous selection and return
    if (!e.features) {
      osmb.highlight(feature => {});
      return;
    }

    // store id's from seleted items...
    const featureIDList = e.features.map(feature => feature.id);

    // ...then is is faster: set highlight color for matching features
    osmb.highlight(feature => {
      if (featureIDList.indexOf(feature.id) > -1) {
        return '#ffffff';
      }
    });
  });

  //***************************************************************************

  const controlButtons = document.querySelectorAll('.control button');

  controlButtons.forEach(button => {
    button.addEventListener('click', e => {
      const parentClassList = button.parentNode.classList;
      const direction = button.classList.contains('inc') ? 1 : -1;
      let increment, property;

      if (parentClassList.contains('tilt')) {
        property = 'Tilt';
        increment = direction*10;
      }
      if (parentClassList.contains('rotation')) {
        property = 'Rotation';
        increment = direction*10;
      }
      if (parentClassList.contains('zoom')) {
        property = 'Zoom';
        increment = direction*1;
      }
      if (property) {
        osmb['set'+ property](osmb['get'+ property]()+increment);
      }
    });
  });