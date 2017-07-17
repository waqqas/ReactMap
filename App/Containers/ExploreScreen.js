import React, {Component} from "react";
import {View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MapView from "react-native-maps";
import {connect} from "react-redux";
import _ from "lodash";
// Styles
import styles from "./Styles/ExploreScreenStyles";
import ExploreActions from "../Redux/ExploreRedux";
import {getCoordinatesFromRegion} from "../Lib/Map";
import AppConfig from "../Config/AppConfig";

class ExploreScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Explore',
    tabBarLabel: 'Explore',
    tabBarIcon: ({focused, tintColor}) => (
      <Icon name="compass" style={focused ? styles.tabBarIcon : styles.tabBarIconInactive}/>)
  });

  constructor(props) {
    super(props)


    this.state = {
      region: _.mergeWith(AppConfig.initialCoordinate, {
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      })
    }
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this)
    this.onRegionChange = this.onRegionChange.bind(this)
  }

  onRegionChange(region) {
    this.setState({region})
  }

  onRegionChangeComplete(region) {
    this.props.getPoints(getCoordinatesFromRegion(region))
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <MapView style={styles.map}
                 region={this.state.region}
                 onRegionChange={this.onRegionChange}
                 onRegionChangeComplete={this.onRegionChangeComplete}>
          {this.props.points.map((point, i) => {

            if (point.centroid_lat !== 0 && point.centroid_lon !== 0) {
              return (<MapView.Marker
                  key={i}
                  coordinate={{latitude: point.centroid_lat, longitude: point.centroid_lon}}
                >
                  <MapView.Callout>
                    <View></View>
                  </MapView.Callout>
                </MapView.Marker>
              )
            }
          })}
        </MapView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    points: state.explore.points
  }
}
// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  getPoints: ({x1, x2, y1, y2}) => dispatch(ExploreActions.getPoints(x1, x2, y1, y2))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExploreScreen)

