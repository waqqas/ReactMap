import React, {Component} from "react";
import {Text, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MapView from "react-native-maps";
import {connect} from "react-redux";
import _ from "lodash";
// Styles
import styles from "./Styles/ExploreScreenStyles";
import ExploreActions from "../Redux/ExploreRedux";
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

  onMarkerPress(event) {
    // console.log('press: ', event)

    const {id, coordinate} = event.nativeEvent

    // zoom a little
    const latitudeDelta = (this.props.region.latitudeDelta * AppConfig.clusterZoomFactor)
    const longitudeDelta = (this.props.region.longitudeDelta * AppConfig.clusterZoomFactor)

    const region = _.mergeWith(coordinate, {latitudeDelta, longitudeDelta})

    // point.json.id is assigned to non-clusters
    if (id === 'unknown') {
      this.setState({region})
    }

  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.region !== this.props.region)
  //     this.refs.map.animateToCoordinate({
  //       latitude: nextProps.region.latitude,
  //       longitude: nextProps.region.longitude
  //     }, 1)
  // }

  render() {
    return (
      <View style={styles.mainContainer}>
        <MapView style={styles.map}
                 ref='map'
                 region={this.props.region}
                 onRegionChange={this.onRegionChange}
                 onRegionChangeComplete={this.onRegionChangeComplete}>
          {this.props.points.map((point, i) => {
            // console.log('pt: ', point)
            let pinColor = AppConfig.defaultPinColor
            let showCallout = true
            if (point.point_count > 1) {
              // cluster
              pinColor = AppConfig.clusterPinColor
              showCallout = false
            }
            else if (point.types.indexOf(2) !== -1) {
              pinColor = AppConfig.ptTypeTwoColor
            }
            else if (point.types.indexOf(4) !== -1) {
              pinColor = AppConfig.ptTypeFourColor
            }

            return (<MapView.Marker
              key={i}
              identifier={point.json && point.json.id ? point.json.id.toString() : 'unknown'}
              pinColor={pinColor}
              onPress={this.onMarkerPress}
              coordinate={{latitude: point.centroid_lat, longitude: point.centroid_lon}}
            >
              {showCallout && <MapView.Callout>
                <View><Text>{point.json.name}</Text></View>
              </MapView.Callout>}
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

