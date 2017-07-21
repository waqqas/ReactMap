import React, {Component} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import MapView from "react-native-maps";

import styles from "./Styles/CustomMarkerStyles";
import AppConfig from "../Config/AppConfig";

export default class CustomMarker extends Component {

  static defaultProps = {
    onPress: () => {
    },
    pinColor: AppConfig.defaultPinColor
  }

  constructor(props) {
    super(props)

    this.state = {
      layout: {}
    }

    this.onLayout = this.onLayout.bind(this)
  }

  onLayout(event) {
    const {layout} = event.nativeEvent
    this.setState({layout})
    this.refs.marker.hideCallout()
  }

  render() {
    const {point} = this.props

    const title = (point.json && point.json.name) ? point.json.name : null
    let pinText = '   '

    if (point.point_count > 1000000) {
      pinText = '1M+'
    } else if (point.point_count > 1000) {
      pinText = '1K+'
    } else if (point.point_count > 1) {
      pinText = point.point_count
    }

    return (
      <MapView.Marker title={title} ref='marker' coordinate={{latitude: point.centroid_lat, longitude: point.centroid_lon}}>
        <TouchableOpacity onLayout={this.onLayout} onPress={this.props.onPress.bind(this, point, this)}>
          <View style={[styles.circle, {backgroundColor: this.props.pinColor}]}>
            <Text style={styles.pinText}>{pinText}</Text>
          </View>
        </TouchableOpacity>
      </MapView.Marker>
    )
  }
}
