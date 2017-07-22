import React, {Component} from "react";
import {StatusBar, View} from "react-native";
import ReduxNavigation from "../Navigation/ReduxNavigation";
import {connect} from "react-redux";
import {MessageBar, MessageBarManager} from "react-native-message-bar";


import StartupActions from "../Redux/StartupRedux";
import ReduxPersist from "../Config/ReduxPersist";

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
