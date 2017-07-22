import React, {Component} from "react";
import {StatusBar, View} from "react-native";
import ReduxNavigation from "../Navigation/ReduxNavigation";
import {connect} from "react-redux";
import {MessageBar, MessageBarManager} from "react-native-message-bar";
import _ from 'lodash'

import StartupActions from "../Redux/StartupRedux";
import ReduxPersist from "../Config/ReduxPersist";
import {Colors, Images, Fonts} from "../Themes";
import styles from "./Styles/RootContainerStyles";

class RootContainer extends Component {
  componentDidMount() {
    MessageBarManager.registerMessageBar(this.refs.alert)

    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  componentWillUnmount() {
    MessageBarManager.unregisterMessageBar()
  }

  componentWillReceiveProps(nextProps) {
    this.refs.statusBar.networkActivityIndicatorVisible = nextProps.fetching

    if (nextProps.point !== this.props.point) {
      if (nextProps.point) {
        const {point} = nextProps

        let message = ''
        let icon = null
        const types = _.intersection(point.types, [2,4])
        if(types.length === 2){
          message = 'Boat Ramp / Marina'
          icon = Images.boatRamp
        }
        else if( _.indexOf(types, 2) !== -1){
          message = 'Boat Ramp'
          icon = Images.boatRamp

        }
        else if( _.indexOf(types, 4) !== -1){
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
          titleStyle: {color: Colors.black, fontSize: Fonts.size.regular, backgroundColor: Colors.transparent, marginTop: 10},
          messageStyle: {color: Colors.black, fontSize: Fonts.size.medium, backgroundColor: Colors.transparent},
          avatarStyle: {height: 40, width: 40, borderRadius: 20},
          avatar: icon
        })
      }
      else {
        MessageBarManager.hideAlert()
      }
    }

  }

  render() {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='default' ref='statusBar'/>
        <ReduxNavigation />
        <MessageBar ref='alert'/>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.explore.fetching,
    point: state.explore.selectedPoint
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
