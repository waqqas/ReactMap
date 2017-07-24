import React, {Component} from "react";
import {TouchableOpacity, View, WebView} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {connect} from "react-redux";
// Styles
import AppActions from "../Redux/AppRedux";
import styles from "./Styles/PoiDetailScreenStyles";


class PoiDetailScreen extends Component {

  static navigationOptions = ({navigation}) => {
    let headerRight = null

    if (navigation.state.params) {
      const iconName = navigation.state.params.isFavorite ? 'heart' : 'heart-o'

      headerRight = (
        <TouchableOpacity onPress={navigation.state.params.toggleFavorite}>
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

    this.toggleFavorite = this.toggleFavorite.bind(this)
  }

  toggleFavorite() {
    this.props.toggleFavorite(this.props.point)
  }

  componentDidMount() {
    const isFavorite = false
    this.props.navigation.setParams({
      isFavorite,
      toggleFavorite: this.toggleFavorite
    });
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
    point: state.explore.selectedPoint
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggleFavorite: (point) => dispatch(AppActions.toggleFavorite(point))
})

export default connect(mapStateToProps, mapDispatchToProps)(PoiDetailScreen)

