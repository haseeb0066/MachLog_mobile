import { StyleSheet, Platform } from "react-native";
import colors from "../../../Assets/Colors/Colors";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  inputContainer: {
    height: hp(35),
    width: wp(100),
    // alignSelf: "center",
    alignItems:"center"
    //backgroundColor:"red",
   // justifyContent: 'center',
  },
  buttonContainer: {
    height: hp(10),
    alignSelf: "center",
  },
  headerContainer: {
    height: hp(12),
    //  borderWidth: 2,
    alignItems: "center",
  },
});
export default styles;
