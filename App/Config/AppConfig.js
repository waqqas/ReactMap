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
}
