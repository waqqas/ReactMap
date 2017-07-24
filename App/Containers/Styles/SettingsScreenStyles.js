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
    marginLeft: Metrics.marginHorizontal,
    marginRight: Metrics.marginHorizontal,
    paddingTop: Metrics.marginVertical,
    paddingBottom: Metrics.marginVertical
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    height: 30,
  },
  optionTitle: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.regular,
    color: Colors.charcoal,
  },
  optionValue: {
    color: Colors.steel,
    fontSize: Fonts.size.medium
  },
  rowIcon:{
    fontSize: 20,
    color: Colors.iosBlue
  },
  detailIcon:{
    fontSize: 20,
    color: Colors.steel
  }
})
