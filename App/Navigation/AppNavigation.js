import {StackNavigator, TabNavigator} from "react-navigation";
import SearchScreen from "../Containers/SearchScreen";
import ExploreScreen from "../Containers/ExploreScreen";
import FavoritesScreen from "../Containers/FavoritesScreen";
import SettingsScreen from "../Containers/SettingsScreen";
import PoiDetailScreen from "../Containers/PoiDetailScreen";
import {Colors} from "../Themes";

import styles from "./Styles/NavigationStyles";

// Manifest of possible screens

const MainNav = TabNavigator({
  search: {
    routeName: 'search',
    path: 'search',
    screen: SearchScreen
  },
  explore: {
    routeName: 'explore',
    path: 'explore',
    screen: ExploreScreen
  },
  favorites: {
    routeName: 'favorites',
    path: 'favorites',
    screen: FavoritesScreen
  },
  settings: {
    routeName: 'settings',
    path: 'settings',
    screen: SettingsScreen
  },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'explore',
  navigationOptions: {
    headerStyle: styles.header
  }
})

const PrimaryNav = StackNavigator({
    detail: {
      routeName: 'detail',
      path: 'detail',
      screen: PoiDetailScreen,
      navigationOptions: {
        headerStyle: styles.navBar,
        headerTitleStyle: styles.navBarTitle,
        headerBackTitleStyle: styles.backTitleStyle,
        headerTintColor: Colors.snow
      }
    },
    main: {
      routeName: 'main',
      path: 'main',
      screen: MainNav
    }
  }, {
    headerMode: 'none',
    initialRouteName: 'main',
  }
)


export default PrimaryNav
