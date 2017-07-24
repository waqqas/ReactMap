import React, {Component} from "react";
import {ListView, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {connect} from "react-redux";
import _ from 'lodash'
// Styles
import AppActions from '../Redux/AppRedux'
import styles from "./Styles/SettingsScreenStyles";

class SettingsScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Settings',
    tabBarLabel: 'Settings',
    tabBarIcon: ({focused, tintColor}) => (
      <Icon name="cogs" style={focused ? styles.tabBarIcon : styles.tabBarIconInactive}/>)
  });

  constructor(props) {
    super(props)

    this.state = {
      options: [
        {title: 'Map Type', key: 'map-type', icon: 'map-o', detailRouteName: 'mapTypeOption', optionValueProp: 'mapType', optionValue: (option) => { return _.startCase(this.props[option.optionValueProp])}},
        {title: 'Clear Favorites', key: 'clear-favorites', icon: 'heart-o', optionValueProp: 'favoritePointCount', optionValue: (option) => { return this.props[option.optionValueProp]}}
      ]
    }
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  selectOption(option) {
    switch (option.key) {
      case 'map-type':
        this.props.navigation.navigate(option.detailRouteName)
        break
      case 'clear-favorites':
        this.props.clearFavoritePoints()
        break
    }
  }

  renderRow(option) {
    return (
      <TouchableOpacity style={styles.optionRow} onPress={this.selectOption.bind(this, option)}>
        <Icon name={option.icon} style={styles.rowIcon}/>
        <View style={{width: 300, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text style={styles.optionTitle}>{option.title}</Text>
          <Text style={styles.optionValue}>{option.optionValue(option)}</Text>
        </View>
        {option.detailRouteName && <Icon name='chevron-right' style={styles.detailIcon}/>}
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ListView
          style={styles.listView}
          dataSource={this.ds.cloneWithRows(this.state.options)}
          renderRow={this.renderRow.bind(this)}
          enableEmptySections
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    favoritePointCount: state.app.favoritePoints.length,
    mapType: state.app.mapType,
  }
}

const mapDispatchToProps = (dispatch) => ({
  clearFavoritePoints: () => dispatch(AppActions.clearFavoritePoints()),
  setMapType: (mapType) => dispatch(AppActions.setMapType(mapType)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)


