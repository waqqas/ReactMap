import React, {Component} from "react";
import {Image, ScrollView, Text, View} from "react-native";
import {Images} from "../Themes";
import Icon from "react-native-vector-icons/FontAwesome";
// Styles
import styles from "./Styles/FavoritesScreenStyles";

export default class FavoritesScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Favorite',
    tabBarLabel: 'Favorite',
    tabBarIcon: ({focused, tintColor}) => (
      <Icon name="heart" style={focused ? styles.tabBarIcon : styles.tabBarIconInactive}/>)
  });


  render() {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch'/>
        <ScrollView style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.sectionText}>
              Favorites Screen
            </Text>
          </View>

        </ScrollView>
      </View>
    )
  }

}
