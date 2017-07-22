import React, {Component} from "react";
import {View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {connect} from "react-redux";
// Styles
import styles from "./Styles/PoiDetailScreenStyles";


class ExploreScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Details',
    tabBarIcon: ({focused, tintColor}) => (
      <Icon name="compass" style={focused ? styles.tabBarIcon : styles.tabBarIconInactive}/>)
  });

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.mainContainer}>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    point: state.explore.selectedPoint
  }
}

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ExploreScreen)

