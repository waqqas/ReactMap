import React, {Component} from "react";
import {TouchableOpacity, View, WebView} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {connect} from "react-redux";
import _ from "lodash";
// Styles
import AppActions from "../Redux/AppRedux";
import styles from "./Styles/PoiDetailScreenStyles";


class PoiDetailScreen extends Component {

  static navigationOptions = ({navigation}) => {
    let headerRight = null

    if (navigation.state.params) {
      const iconName = navigation.state.params.isFavorite ? 'heart' : 'heart-o'

      headerRight = (
        <TouchableOpacity onPress={navigation.state.params.onPressed}>
          <Icon name={iconName} style={styles.navBarRightIcon}/>
        </TouchableOpacity>)
    }
    return ({
      title: 'Details',
      headerRight
    })
  }

  constructor(props) {
    super(props)

    this.onFavoritePressed = this.onFavoritePressed.bind(this)
    this.isPointFavorite = this.isPointFavorite.bind(this)
  }

  onFavoritePressed() {
    // console.log('current point: ', this.props.point)
    // console.log('fav points: ', this.props.favoritePoints)

    if (this.isPointFavorite(this.props.point) === false) {
      this.props.addPointToFavorite(this.props.point)
    }
    else {
      this.props.removePointFromFavorite(this.props.point)
    }
  }

  isPointFavorite(point) {
    const favoritePoint = _.find(this.props.favoritePoints, (pt) => {
      return (pt.json.id === point.json.id)
    })

    return (favoritePoint !== undefined)
  }

  componentDidMount() {
    const isFavorite = this.isPointFavorite(this.props.point)

    this.props.navigation.setParams({
      isFavorite,
      onPressed: this.onFavoritePressed
    });
  }

  componentWillReceiveProps(nextProps) {
    const isCurrentFavorite = this.isPointFavorite(this.props.point)
    const isNextFavorite = this.isPointFavorite(nextProps.point)

    console.log(isCurrentFavorite, isNextFavorite)
    if (isCurrentFavorite !== isNextFavorite) {
      this.props.navigation.setParams({isFavorite: isNextFavorite})
    }
  }

  render() {
    const {point} = this.props
    return (
      <View style={styles.mainContainer}>
        <WebView source={{uri: `https://fishory.com/services/poi-detail.php?id=${point.json.id}&v=2`}}/>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    point: state.explore.selectedPoint,
    favoritePoints: state.app.favoritePoints
  }
}

const mapDispatchToProps = (dispatch) => ({
  addPointToFavorite: (point) => dispatch(AppActions.addPointToFavorite(point)),
  removePointFromFavorite: (point) => dispatch(AppActions.removePointFromFavorite(point))
})

export default connect(mapStateToProps, mapDispatchToProps)(PoiDetailScreen)

