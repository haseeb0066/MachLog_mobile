import { StyleSheet, Platform } from "react-native";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
import colors from "../../../Assets/Colors/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  InputContainer: {
    // flex: 0.6,
    marginTop: hp(2.5),
    height: hp(50),
    zIndex: 1,
    // borderWidth: 2,
    borderColor: colors.white,
  },
  logoContainer: {
    flex: 0.7,
    // height: hp(15),
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 2,
    marginTop: hp(2),
    borderColor: colors.white,
  },

  ButtonContainer: {
    height: hp(10),
    justifyContent: "center",
    // borderWidth: 2,
    borderColor: colors.white,
    alignItems: "center",
    marginTop: hp(4),
  },
  headerContainer: {
    height: hp(5),
    zIndex: 1,
    // borderWidth: 2,
    borderColor: colors.white,
    // alignItems: "center",
    justifyContent: "flex-start",
  },

  //================ vehcile ===========

  container: {
    flex: 1,
  },
  herdercomtainer: {
    height: hp(15),
    justifyContent: "center",
    flex: 0.15,
    // borderWidth: 2,
    borderColor: colors.white,
    // alignItems: "flex-start",
  },
  inputContainer: {
    // height: hp(100),
    width: wp(90),
    alignSelf: "center",
    // borderWidth: 2,
    borderColor: colors.white,
  },
  buttonContainer: {
    height: hp(10),
    alignSelf: "center",
  },
  // upload cont
  uploadIconContainer: {
    // marginTop:hp(2),
    borderRadius: 15,
    justifyContent: "space-evenly",
    alignItems: "center",
    minHeight: hp(20),
    flexDirection: "row",
    // backgroundColor:"green"
  },
  uploadSection: {
    width: "48%",
    height: hp(18),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "column",
    borderWidth: 1,
    backgroundColor: colors.white,
  },

  profileContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      android: {
        paddingTop: hp(5),
      },
      ios: {
        paddingTop: hp(6),
      },
    }),
  },
  profileImage: {
    width: "100%",
    height: hp(17.8),
    borderRadius: 20,
  },
  uploadTextDoc: {
    color: colors.gray,
    fontSize: hp(1.5),
  },

  // ===========  Phone Number field  ===========
  phoneStyle: {
    height: hp(6),
    width: "100%",
    // alignSelf: "center",
    backgroundColor: "black",
    borderRadius: hp(1.2),
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.white,
  },

  textStyle: {
    // justifyContent: "center",
    alignContent: "center",
    borderWidth: 1,
    borderColor: "white",
    fontSize: 18,
    backgroundColor: "black",

    // backgroundColor: colors.input_text_backColor,
  },
  textStyle1: {
    // borderWidth: 1,
    // height: hp(10),
    // borderColor: "white",
    fontSize: 14,
    fontWeight: "bold",
    color: colors.input_text_color,
  },
});

export default styles;
