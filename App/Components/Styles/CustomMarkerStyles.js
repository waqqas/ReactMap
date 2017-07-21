import {StyleSheet} from "react-native";
import {Colors} from "../../Themes/";
import AppConfig from '../../Config/AppConfig'

export default StyleSheet.create({
  circle: {
    borderRadius: 5,
    backgroundColor: AppConfig.defaultPinColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.snow
  },
  pinText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: Colors.transparent
  }
})



