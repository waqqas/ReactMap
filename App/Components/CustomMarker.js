import React, {Component} from "react";
import {Text, TouchableOpacity, View} from "react-native";

import styles from "./Styles/CustomMarkerStyles";
import AppConfig from "../Config/AppConfig";

export default class CustomMarker extends Component {

  static defaultProps = {
    onPress: () => {
    },
    pinColor: AppConfig.defaultPinColor
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress.bind(this, this.props.point)}>
        <View style={[styles.circle, {backgroundColor: this.props.pinColor}]}>
          <Text style={styles.pinText}>{this.props.point.point_count}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
