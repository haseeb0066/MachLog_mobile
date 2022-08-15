import { StyleSheet, Platform } from "react-native";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
import colors from "../../../Assets/Colors/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logoContainer: {
    flex: 0.85,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.3)",
  },

  headerContainer: {
    height: hp(10),
    zIndex: 1,
    // borderWidth: 2,
    borderColor: colors.white,
  },

  about: {
    // flex: 0.3,
    zIndex: 1,
    height: hp(20),
    alignItems: "center",
    // borderWidth: 2,
    justifyContent: "center",
  },
  imageContainer: {
    borderRadius: 75,
    height: "100%",
    width: "100%",
    // borderWidth: 2,
    borderColor: "white",
    // borderRadius: hp(15),
  },
  TextInputContainer: {
    // flex: 0.3,
    zIndex: 1,
    height: hp(20),
    alignItems: "center",
    borderWidth: 2,
    justifyContent: "center",
  },
  ButtonContainer: {
    // flex: 0.2,
    // height: hp(15),
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 2,
    borderColor: colors.white,
    marginTop: hp(0),
  },
  ButtonContainer1: {
    // flex: 0.2,
    height: hp(10),
    justifyContent: "flex-start",
    alignItems: "center",
    // borderWidth: 2,
    borderColor: colors.white,
    marginTop: hp(0),
  },
  containerModal: {
    flex: 1,
    backgroundColor: colors.blueColor,
  },

  centeredView: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: hp(20),
  },
  modalView: {
    borderRadius: hp(4),
    height: hp(25),
    width: wp(80),
    borderWidth: hp(0.05),
    // borderWidth: 1,
    // borderColor: "white",
    backgroundColor: "#2D333C",

    // "#575D65"
  },
  modalView1: {
    borderRadius: hp(3),
    height: hp(15),
    width: wp(82),
    // borderWidth: hp(0.05),
    // borderWidth: 1,
    // borderColor: "white",
    backgroundColor: colors.lightColor,

    // "#575D65"
  },

  chooseContainer: {
    flex: 1,
    backgroundColor: colors.white,
    flexDirection: "row",
    borderRadius: hp(2),
    // borderWidth: 10,
  },
  // buttonContainer:{
  //     flex:0.3,
  //     backgroundColor:'green'
  // },
  cameraStyle: {
    height: hp(6),
    width: hp(20),
    resizeMode: "contain",
  },
  galleryStyle: {
    height: hp(6),
    width: hp(20),
    resizeMode: "contain",
  },
  cameraContainer: {
    flex: 0.4,

    // borderWidth: 1,
    // borderColor: "white",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  galleryContainer: {
    flex: 0.4,
    // borderWidth: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    // borderColor: "white",
    // borderWidth:1,
  },
  option: {
    marginLeft: hp(3),
    alignItems: "center",
    justifyContent: "center",
    // zIndex: 1,
    // borderWidth: 2,
    borderBottomWidth: hp(0.1),
    borderBottomColor: colors.white,
    width: wp(67),
    height: hp(4),
    marginBottom: hp(0.5),
  },
  ListText: {
    marginTop: hp(1),
    // borderWidth: 2,
    fontSize: hp(2),
    color: colors.ButtonText,
    fontWeight: "400",
  },
  container1: {
    height: hp(10),
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  labelContainer: {
    position: "absolute",
    backgroundColor: colors.ButtonText,
    // backgroundColor: "transparent",
    top: Platform.OS == "android" ? hp(-0.5) : hp(0.5),
    left: wp(15),
    padding: hp(0.4),
    zIndex: 50,
    // borderWidth: 1,
    // justifyContent:"center"
  },
  labelContainer1: {
    position: "absolute",
    backgroundColor: colors.ButtonText,
    // backgroundColor: "transparent",
    top: Platform.OS == "android" ? hp(-0.5) : hp(0.5),
    left: wp(15),
    padding: hp(0.8),
    zIndex: 50,
    // borderWidth: 1,
    // justifyContent:"center"
  },
  inputBorder: {
    height: hp(6),
    width: wp(80),
    // borderWidth: 1,
    borderColor: colors.white,
    justifyContent: "center",
    marginTop: hp(1),
    borderRadius: hp(1),
  },
  uploadIconContainer: {
    // borderWidth: 1,
    // width: wp(90),
    marginTop: hp(2),
    borderRadius: 15,
    justifyContent: "space-evenly",
    alignItems: "center",
    minHeight: hp(20),
    flexDirection: "row",
    // backgroundColor:"green"
  },
  uploadSection: {
    width: "40%",
    height: hp(16),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "column",
    // borderWidth: 1,
    backgroundColor: colors.white,
  },
  uploadTextDoc: {
    color: colors.gray,
    fontSize: hp(1.3),
  },
  profileImage: {
    width: "100%",
    height: hp(17.8),
    borderRadius: 20,
  },
});

export default styles;
