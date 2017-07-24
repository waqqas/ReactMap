import { StyleSheet } from 'react-native'

import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  ...ApplicationStyles.tabBar,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  listView: {
    // marginLeft: Metrics.marginHorizontal,
    // marginRight: Metrics.marginHorizontal,
    marginTop: Metrics.marginVertical,
    marginBottom: Metrics.marginVertical,
    paddingRight: Metrics.marginHorizontal
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    height: 40,
    backgroundColor: Colors.silver
  },
  optionTitle: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.regular,
    color: Colors.charcoal,
  },
  optionValue: {
    color: Colors.charcoal,
    fontSize: Fonts.size.medium
  },
  rowIcon:{
    marginLeft: Metrics.marginHorizontal,
    fontSize: 20,
    color: Colors.iosBlue
  },
  detailIcon:{
    fontSize: 15,
    color: Colors.steel
  }
})
