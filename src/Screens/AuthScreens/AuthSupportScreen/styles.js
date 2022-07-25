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

  subjectContainer: {
    height: hp(12),
    zIndex: 1,
    // borderWidth: 2,
    borderColor: colors.white,
  },
  subTitle: {
    flex: 0.35,
    // borderWidth: 2,
    borderColor: colors.Minus,
    justifyContent: "flex-end",
  },
  subInput: {
    flex: 0.65,
    // borderWidth: 2,
    borderColor: colors.Plus,
    alignItems: "center",
  },
  msgContainer: {
    height: hp(20),
    zIndex: 1,
    // borderWidth: 2,
    borderColor: colors.white,
    marginTop: hp(2),
  },
  msgTitle: {
    flex: 0.1,
    // borderWidth: 2,
    borderColor: colors.Minus,
    justifyContent: "flex-end",
  },
  msgInput: {
    flex: 0.9,
    // borderWidth: 2,
    borderColor: colors.Plus,
    alignItems: "center",
  },
  AttachmentContainer: {
    height: hp(20),
    zIndex: 1,
    // borderWidth: 2,
    borderColor: colors.white,
    marginTop: hp(2),
  },
  attachText: {
    flex: 0.2,
    // borderWidth: 2,
    borderColor: colors.white,
    justifyContent: "flex-end",
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
  imageContainer: {
    borderRadius: hp(2),
    height: "100%",
    width: "100%",
    borderColor: "white",
  },
});

export default styles;
