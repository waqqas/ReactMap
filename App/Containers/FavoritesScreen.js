import React, {Component} from "react";
import {ListView, ScrollView, View, TouchableWithoutFeedback, Image, Text} from "react-native"
import {connect} from "react-redux"
import Icon from "react-native-vector-icons/FontAwesome"
import EvilIcon from "react-native-vector-icons/EvilIcons"
import _ from 'lodash'
// Styles
import styles from "./Styles/FavoritesScreenStyles"
import ExploreActions from "../Redux/ExploreRedux"
import {Metrics, Colors, Fonts, Images} from '../Themes'

class FavoritesScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Favorite',
    tabBarLabel: 'Favorite',
    tabBarIcon: ({focused, tintColor}) => (
      <Icon name="heart" style={focused ? styles.tabBarIcon : styles.tabBarIconInactive}/>)
  });

  constructor(props) {
    super(props)

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  showDetails(point){
    this.props.selectPoint(point)
    this.props.navigation.navigate('detail')
  }

  renderRow(point) {

    let message = ''
    let icon = null

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

    return (
      <TouchableWithoutFeedback onPress={this.showDetails.bind(this, point)} style={{position: 'absolute', top: Metrics.navBarHeight, left: 0, right: 0, bottom: 0}}>
        <View style={{flexDirection: 'row', backgroundColor: Colors.silver, justifyContent: 'space-around', alignItems: 'center', paddingTop: Metrics.marginVertical, paddingBottom: Metrics.marginVertical, paddingLeft: Metrics.marginHorizontal }}>
          <Image source={icon} style={{height: 40, width: 40}}/>
          <View style={{ flex: 1, flexDirection: 'column', alignSelf: 'stretch', justifyContent: 'center', marginLeft: 10 }}>
            <Text numberOfLines={2}  style={{
              color: Colors.black,
              fontSize: Fonts.size.regular,
              backgroundColor: Colors.transparent
            }}>{point.json.name}</Text>
            <Text style={{
              color: Colors.black,
              fontSize: Fonts.size.medium,
              backgroundColor: Colors.transparent
            }}>{message}</Text>
          </View>
          <EvilIcon name='chevron-right' size={40} style={{marginRight: Metrics.marginHorizontal}}/>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ListView
          renderScrollComponent={(props) => (<ScrollView/>)}
          dataSource={this.ds.cloneWithRows(this.props.favoritePoints)}
          renderRow={this.renderRow.bind(this)}
          enableEmptySections
        />
      </View>
    )
  }

}


const mapStateToProps = (state) => {
  return {
    favoritePoints: state.app.favoritePoints,

  }
}

const mapDispatchToProps = (dispatch) => ({
  selectPoint: (point) => dispatch(ExploreActions.selectPoint(point))
})

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen)

