import React, {Component} from "react";
import {Image, Text, TouchableWithoutFeedback, View, Alert} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MapView from "react-native-maps";
import {connect} from "react-redux";
import _ from "lodash";
import EvilIcon from "react-native-vector-icons/EvilIcons";
// Styles
import styles from "./Styles/ExploreScreenStyles";
import ExploreActions from "../Redux/ExploreRedux";
import AppActions from "../Redux/AppRedux";
import AppConfig from "../Config/AppConfig";
import CustomMarker from "../Components/CustomMarker";
import {Colors, Fonts, Images, Metrics} from "../Themes";

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
    this.props.selectPoint(null)
    this.props.setRegion(region)
  }

  onRegionChangeComplete(region) {
    this.props.setRegion(region)
    this.props.getPoints(region)
  }

  componentDidMount() {
    this.props.getPoints(this.props.region)
  }

  onMarkerPress(point, marker) {
    // console.log('point: ', point)
    // console.log('marker: ', marker)

    // zoom to cluster
    if (point.point_count > 1) {
      const latitudeDelta = (this.props.region.latitudeDelta * AppConfig.clusterZoomFactor)
      const longitudeDelta = (this.props.region.longitudeDelta * AppConfig.clusterZoomFactor)

      const region = _.mergeWith({latitude: point.centroid_lat, longitude: point.centroid_lon}, {
        latitudeDelta,
        longitudeDelta
      })

      this.props.selectPoint(null)
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

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.point) {
  //     const {point} = nextProps
  //
  //     let message = ''
  //     let icon = null
  //     const types = _.intersection(point.types, [2, 4])
  //
  //     // if contains only type 2 in array then "Boat Ramp"
  //     // if contains only type 4 in array then "Marina"
  //     // if contains both type 2 and type 4 then "Boat Ramp / Marina"
  //
  //     if (types.length === 2) {
  //       message = 'Boat Ramp / Marina'
  //     }
  //     else if (_.indexOf(types, 2) !== -1) {
  //       message = 'Boat Ramp'
  //     }
  //     else if (_.indexOf(types, 4) !== -1) {
  //       message = 'Marina'
  //     }
  //
  //     // if it contains a 2 it would get the "Ramp" icon
  //     // if it contains a 4 and not a 2 it would get the "Anchor" icon
  //     if (_.indexOf(types, 2) !== -1) {
  //       icon = Images.boatRamp
  //     }
  //     else if (_.indexOf(types, 4) !== -1) {
  //       icon = Images.anchor
  //     }
  //
  //     MessageBarManager.showAlert({
  //       title: point.json.name,
  //       message: message,
  //       shouldHideAfterDelay: false,
  //       alertType: 'extra',
  //       duration: 3000,
  //       titleNumberOfLines: 2,
  //       viewTopOffset: Metrics.navBarHeight,
  //       stylesheetExtra: {backgroundColor: Colors.silver, strokeColor: Colors.black},
  //       titleStyle: {
  //         color: Colors.black,
  //         fontSize: Fonts.size.regular,
  //         backgroundColor: Colors.transparent,
  //         marginTop: 10
  //       },
  //       messageStyle: {color: Colors.black, fontSize: Fonts.size.medium, backgroundColor: Colors.transparent},
  //       avatarStyle: {height: 40, width: 40, borderRadius: 20, justifyContent: 'center'},
  //       avatar: icon,
  //       onTapped: this.onTapped,
  //       // animationType: 'none',
  //       position: 'right'
  //     })
  //   }
  //   else {
  //     MessageBarManager.hideAlert()
  //   }
  // }

  render() {

    const {point} = this.props
    let message = ''
    let icon = null

    if (point) {

      const types = _.intersection(point.types, [2, 4])

      // if contains only type 2 in array then "Boat Ramp"
      // if contains only type 4 in array then "Marina"
      // if contains both type 2 and type 4 then "Boat Ramp / Marina"

      if (types.length === 2) {
        message = 'Boat Ramp / Marina'
      }
      else if (_.indexOf(types, 2) !== -1) {
        message = 'Boat Ramp'
      }
      else if (_.indexOf(types, 4) !== -1) {
        message = 'Marina'
      }

      // if it contains a 2 it would get the "Ramp" icon
      // if it contains a 4 and not a 2 it would get the "Anchor" icon
      if (_.indexOf(types, 2) !== -1) {
        icon = Images.boatRamp
      }
      else if (_.indexOf(types, 4) !== -1) {
        icon = Images.anchor
      }
    }

    console.log('selected point:', point)

    return (
      <View style={styles.mainContainer}>
        <MapView style={styles.map}
                 ref='map'
                 region={this.props.region}
                 initialRegion={this.props.region}
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
        {point && <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('detail')} style={{position: 'absolute', top: Metrics.navBarHeight, left: 0, right: 0, bottom: 0}}>
          <View style={{flexDirection: 'row', backgroundColor: Colors.silver, justifyContent: 'space-around', alignItems: 'center', paddingTop: Metrics.marginVertical, paddingBottom: Metrics.marginVertical}}>
            <Image source={icon} style={{height: 40, width: 40}}/>
            <View style={{ flex: 1, flexDirection: 'column', alignSelf: 'stretch', justifyContent: 'center', marginLeft: 10 }}>
              <Text numberOfLines={2}  style={{
                color: Colors.black,
                fontSize: Fonts.size.regular,
                backgroundColor: Colors.transparent
              }}>{this.props.point.json.name}</Text>
              <Text style={{
                color: Colors.black,
                fontSize: Fonts.size.medium,
                backgroundColor: Colors.transparent
              }}>{message}</Text>
            </View>
            <EvilIcon name='chevron-right' size={40} style={{marginRight: Metrics.marginHorizontal}}/>
          </View>
        </TouchableWithoutFeedback>}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    points: state.explore.points,
    point: state.explore.selectedPoint,
    region: state.app.region
  }
}

const mapDispatchToProps = (dispatch) => ({
  getPoints: (region) => dispatch(ExploreActions.getPoints(region)),
  setRegion: (region) => dispatch(AppActions.setRegion(region)),
  selectPoint: (point) => dispatch(ExploreActions.selectPoint(point))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExploreScreen)

