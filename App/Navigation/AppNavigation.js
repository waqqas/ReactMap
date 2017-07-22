import {StackNavigator, TabNavigator} from "react-navigation";
import SearchScreen from "../Containers/SearchScreen";
import ExploreScreen from "../Containers/ExploreScreen";
import FavoritesScreen from "../Containers/FavoritesScreen";
import SettingsScreen from "../Containers/SettingsScreen";
import PoiDetailScreen from "../Containers/PoiDetailScreen";

import styles from "./Styles/NavigationStyles";

// Manifest of possible screens

const MainNav = TabNavigator({
  search: {
    screen: SearchScreen
  },
  explore: {
    screen: ExploreScreen
  },
  favorites: {
    screen: FavoritesScreen
  },
  settings: {
    screen: SettingsScreen
  },
}, {
  headerMode: 'none',
  initialRouteName: 'explore',
  navigationOptions: {
    headerStyle: styles.navBar
  }
})

const PrimaryNav = StackNavigator({
    detail: {
      screen: PoiDetailScreen,
      navigationOptions: {
        headerStyle: styles.navBar,
      }
    },
    main: {
      screen: MainNav
    }
  }, {
    headerMode: 'float',
    initialRouteName: 'main',
  }
)


export default PrimaryNav
