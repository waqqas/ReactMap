import React, {Component} from "react";
import {View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MapView from "react-native-maps";
import {connect} from "react-redux";
import _ from "lodash";
// Styles
import styles from "./Styles/ExploreScreenStyles";
import ExploreActions from "../Redux/ExploreRedux";
import AppConfig from "../Config/AppConfig";
import CustomMarker from "../Components/CustomMarker";

class ExploreScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Explore',
    tabBarLabel: 'Explore',
    tabBarIcon: ({focused, tintColor}) => (
      <Icon name="compass" style={focused ? styles.tabBarIcon : styles.tabBarIconInactive}/>)
  });

  constructor(props) {
    super(props)

    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this)
    this.onRegionChange = this.onRegionChange.bind(this)
    this.onMarkerPress = this.onMarkerPress.bind(this)

  }

  onRegionChange(region) {
    this.props.setRegion(region)
  }

  onRegionChangeComplete(region) {
    // console.log('region: ', region)
    this.props.getPoints(region)
  }

  onMarkerPress(point) {
    console.log('point: ', point)

    // zoom to cluster
    if (point.point_count > 1) {
      const latitudeDelta = (this.props.region.latitudeDelta * AppConfig.clusterZoomFactor)
      const longitudeDelta = (this.props.region.longitudeDelta * AppConfig.clusterZoomFactor)

      const region = _.mergeWith({latitude: point.centroid_lat, longitude: point.centroid_lon}, {
        latitudeDelta,
        longitudeDelta
      })

      this.props.setRegion(region)
    }
    else {
      // show callout
    }

  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <MapView style={styles.map}
                 ref='map'
                 region={this.props.region}
                 onRegionChange={this.onRegionChange}
                 onRegionChangeComplete={this.onRegionChangeComplete}>
          {this.props.points.map((point, i) => {
            let pinColor = AppConfig.defaultPinColor
            let showCallout = true
            if (point.point_count > 1) {
              pinColor = AppConfig.clusterPinColor
              showCallout = false
            }
            else if (point.types.indexOf(2) !== -1) {
              pinColor = AppConfig.ptTypeTwoColor
            }
            else if (point.types.indexOf(4) !== -1) {
              pinColor = AppConfig.ptTypeFourColor
            }

            console.log('pt: ', i, point)

            return (<MapView.Marker key={ 'pt-' + (i + 1)} coordinate={{latitude: point.centroid_lat, longitude: point.centroid_lon}}>
              <CustomMarker pinColor={pinColor} point={point} onPress={this.onMarkerPress}/>
            </MapView.Marker>)
          })}
        </MapView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    points: state.explore.points,
    region: state.explore.region
  }
}
// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  getPoints: (region) => dispatch(ExploreActions.getPoints(region)),
  setRegion: (region) => dispatch(ExploreActions.setRegion(region))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExploreScreen)

