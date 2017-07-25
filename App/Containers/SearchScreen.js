import React, {Component} from "react";
import {Image, ListView, ScrollView, Text, TouchableWithoutFeedback, View} from "react-native";
import {Colors, Fonts, Metrics} from "../Themes";
import Icon from "react-native-vector-icons/FontAwesome";
import EvilIcon from "react-native-vector-icons/EvilIcons"
import {connect} from "react-redux";
// Styles
import styles from "./Styles/SearchScreenStyles";
import SearchBar from "../Components/SearchBar";
import ExploreActions from '../Redux/ExploreRedux'
import SearchActions from '../Redux/SearchRedux'
import {getPoiInfo} from "../Lib/Poi";

class SearchScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Search',
    tabBarLabel: 'Search',
    tabBarIcon: ({focused, tintColor}) => (
      <Icon name="search" style={focused ? styles.tabBarIcon : styles.tabBarIconInactive}/>)
  });

  constructor(props) {
    super(props)

    this.searchPoints = this.searchPoints.bind(this)

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  showDetails(point) {
    this.props.selectPoi(point)
    this.props.navigation.navigate('detail')
  }

  renderRow(point) {

    const info = getPoiInfo(point)

    return (
      <TouchableWithoutFeedback onPress={this.showDetails.bind(this, point)}
                                style={{position: 'absolute', top: Metrics.navBarHeight, left: 0, right: 0, bottom: 0}}>
        <View style={{
          flexDirection: 'row',
          backgroundColor: Colors.silver,
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingTop: Metrics.marginVertical,
          paddingBottom: Metrics.marginVertical,
          paddingLeft: Metrics.marginHorizontal
        }}>
          <Image source={info.icon} style={{height: 40, width: 40}}/>
          <View
            style={{flex: 1, flexDirection: 'column', alignSelf: 'stretch', justifyContent: 'center', marginLeft: 10}}>
            <Text numberOfLines={2} style={{
              color: Colors.black,
              fontSize: Fonts.size.regular,
              backgroundColor: Colors.transparent
            }}>{point.name}</Text>
            <Text style={{
              color: Colors.black,
              fontSize: Fonts.size.medium,
              backgroundColor: Colors.transparent
            }}>{info.text}</Text>
          </View>
          <EvilIcon name='chevron-right' size={40} style={{marginRight: Metrics.marginHorizontal}}/>
        </View>
      </TouchableWithoutFeedback>
    )
  }


  searchPoints(searchTerm) {
    console.log('searching: ', searchTerm)
    this.props.searchPoints(searchTerm)
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <SearchBar onSearch={this.searchPoints} onCancel={() => {
        }}/>
        <ListView
          renderScrollComponent={(props) => (<ScrollView/>)}
          dataSource={this.ds.cloneWithRows(this.props.points)}
          renderRow={this.renderRow.bind(this)}
          enableEmptySections
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    points: state.search.points,
    point: state.explore.selectedPoint
  }
}

const mapDispatchToProps = (dispatch) => ({
  searchPoints: (searchTerm) => dispatch(SearchActions.searchPoints(searchTerm)),
  selectPoi: (point) => dispatch(ExploreActions.selectPoi(point))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)

