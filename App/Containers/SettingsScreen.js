import React, {Component} from "react";
import {Image, ScrollView, Text, View} from "react-native";
import {Images} from "../Themes";
import Icon from "react-native-vector-icons/FontAwesome";
// Styles
import styles from "./Styles/SettingsScreenStyles";

export default class SettingsScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Settings',
    tabBarLabel: 'Settings',
    tabBarIcon: ({focused, tintColor}) => (
      <Icon name="cogs" style={focused ? styles.tabBarIcon : styles.tabBarIconInactive}/>)
  });


  render() {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch'/>
        <ScrollView style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.sectionText}>
              Settings Screen
            </Text>
          </View>

        </ScrollView>
      </View>
    )
  }

}
