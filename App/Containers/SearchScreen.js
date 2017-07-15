import React, {Component} from "react";
import {Image, ScrollView, Text, View} from "react-native";
import {Images} from "../Themes";
import Icon from "react-native-vector-icons/FontAwesome";
// Styles
import styles from "./Styles/SearchScreenStyles";

export default class SearchScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Search',
    tabBarLabel: 'Search',
    tabBarIcon: ({focused, tintColor}) => (
      <Icon name="search" style={focused ? styles.tabBarIcon : styles.tabBarIconInactive}/>)
  });


  render() {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch'/>
        <ScrollView style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.sectionText}>
              Search Screen
            </Text>
          </View>

        </ScrollView>
      </View>
    )
  }
}
