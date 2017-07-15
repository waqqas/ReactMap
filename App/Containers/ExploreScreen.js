import React, {Component} from "react";
import {View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"
import MapView from "react-native-maps"
// Styles
import styles from "./Styles/ExploreScreenStyles";

export default class ExploreScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Explore',
    tabBarLabel: 'Explore',
    tabBarIcon: ({focused, tintColor}) => (
      <Icon name="compass" style={focused ? styles.tabBarIcon : styles.tabBarIconInactive}/>)
  });

  constructor(props){
    super(props)

    this.state = {
      region: {
        latitude: 29.00,
        longitude: -82.00,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      markers: []
    }

    this.onRegionChange = this.onRegionChange.bind(this)

  }

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <MapView style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        />
        {this.state.markers.map(marker => (
          <MapView.Marker
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </View>
    )
  }
}
