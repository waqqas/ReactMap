// Simple React Native specific changes

export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  initialCoordinate: {
    latitude: 29.00,
    longitude: -82.00
  },
  apiBaseUrl: 'https://api.fishory.com/fishory/',
  defaultRadius: 0.0005,
  defaultTypes: [2,4],
  defaultPinColor: 'blue',
  clusterPinColor: 'yellow',
  ptTypeTwoColor: 'red',
  ptTypeFourColor: 'green',
  clusterZoomFactor: 0.9,
  throttleDelay:1000,
  mapTileSize: 256,
  zoomLevelToRadius:[0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1, //10
    0.0005,
    0.0005,
    0.0005,
    0.0005,
    0.0005,
    0.0005,
    0.0005,
    0.0005,
    0.0005 ] // and so on up to 20
}
