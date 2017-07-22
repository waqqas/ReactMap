import React, {Component} from "react";
import {View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MapView from "react-native-maps";
import {connect} from "react-redux";
import _ from "lodash";
import {MessageBarManager} from "react-native-message-bar";
// Styles
import styles from "./Styles/ExploreScreenStyles";
import ExploreActions from "../Redux/ExploreRedux";
import AppConfig from "../Config/AppConfig";
import CustomMarker from "../Components/CustomMarker";
import {Colors, Fonts, Images} from "../Themes";

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
    this.onTapped = this.onTapped.bind(this)
  }

  onRegionChange(region) {
    this.props.selectPoint(null)
    this.props.setRegion(region)
  }

  onRegionChangeComplete(region) {
    // console.log('region: ', region)
    this.props.getPoints(region)
  }

  onMarkerPress(point, marker) {
    // console.log('point: ', point)
    // console.log('marker: ', marker)

    MessageBarManager.hideAlert()

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
      // marker.showCallout()

      // Alert.alert(
      //   'Name',
      //   point.json.name,
      // )

      this.props.selectPoint(point)

    }
  }

  onTapped() {
    const { navigate } = this.props.navigation
    navigate('detail')
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.point !== this.props.point) {
      if (nextProps.point) {
        const {point} = nextProps

        let message = ''
        let icon = null
        const types = _.intersection(point.types, [2, 4])
        if (types.length === 2) {
          message = 'Boat Ramp / Marina'
          icon = Images.boatRamp
        }
        else if (_.indexOf(types, 2) !== -1) {
          message = 'Boat Ramp'
          icon = Images.boatRamp

        }
        else if (_.indexOf(types, 4) !== -1) {
          message = 'Marina'
          icon = Images.anchor
        }

        MessageBarManager.showAlert({
          title: point.json.name,
          message: message,
          shouldHideAfterDelay: false,
          alertType: 'extra',
          duration: 3000,
          titleNumberOfLines: 2,
          stylesheetExtra: {backgroundColor: Colors.silver, strokeColor: Colors.black},
          titleStyle: {
            color: Colors.black,
            fontSize: Fonts.size.regular,
            backgroundColor: Colors.transparent,
            marginTop: 10
          },
          messageStyle: {color: Colors.black, fontSize: Fonts.size.medium, backgroundColor: Colors.transparent},
          avatarStyle: {height: 40, width: 40, borderRadius: 20, justifyContent: 'center'},
          avatar: icon,
          onTapped: this.onTapped
        })
      }
      else {
        MessageBarManager.hideAlert()
      }
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
            if (point.point_count > 1) {
              pinColor = AppConfig.clusterPinColor
            }
            else if (point.types.indexOf(2) !== -1) {
              pinColor = AppConfig.ptTypeTwoColor
            }
            else if (point.types.indexOf(4) !== -1) {
              pinColor = AppConfig.ptTypeFourColor
            }
            // console.log('pt: ', i, point)

            return (
              <CustomMarker key={'pt-' + i} pinColor={pinColor} point={point} onPress={this.onMarkerPress}/>
            )
          })}
        </MapView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    points: state.explore.points,
    region: state.explore.region,
    point: state.explore.selectedPoint
  }
}

const mapDispatchToProps = (dispatch) => ({
  getPoints: (region) => dispatch(ExploreActions.getPoints(region)),
  setRegion: (region) => dispatch(ExploreActions.setRegion(region)),
  selectPoint: (point) => dispatch(ExploreActions.selectPoint(point))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExploreScreen)

