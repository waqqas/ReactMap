import { TabNavigator } from 'react-navigation'
import SearchScreen from '../Containers/SearchScreen'
import ExploreScreen from '../Containers/ExploreScreen'
import FavoritesScreen from '../Containers/FavoritesScreen'
import SettingsScreen from '../Containers/SettingsScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = TabNavigator({
  search: { screen: SearchScreen },
  explore: { screen: ExploreScreen },
  favorites: { screen: FavoritesScreen },
  settings: { screen: SettingsScreen }

}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'explore',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
