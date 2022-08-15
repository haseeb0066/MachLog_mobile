import { StyleSheet, Platform } from "react-native";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
import colors from "../../../Assets/Colors/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerContainer: {
    height: Platform.OS === "ios" ? hp(10) : hp(10),
    // zIndex: 1,
    // borderWidth: 2,
    borderColor: colors.white,
    // justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  watchContainer: {
    height: hp(20),
    // borderWidth: 2,
    borderColor: colors.white,
  },

  DetailContainer: {
    height: hp(50),
    // borderWidth: 2,
    borderColor: colors.white,
  },
  centeredView: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: hp(20),
    // backgroundColor: colors.bottomBgColor,
  },
  modalView: {
    borderRadius: hp(4),
    height: hp(50),
    width: wp(90),
    // borderWidth: hp(0.4),
    // borderWidth: 1,
    // borderColor: "white",
    // backgroundColor: colors.ButtonColor,
    // "#575D65"
  },
  modalView1: {
    borderRadius: hp(3),
    height: hp(15),
    width: wp(82),
    // borderWidth: hp(0.05),
    // borderWidth: 10,
    // borderColor: "white",
    backgroundColor: colors.lightColor,
  },

  chooseContainer: {
    flex: 1,
    backgroundColor: colors.ButtonColor,
    // flexDirection: "row",
    borderRadius: hp(2),
    // borderWidth: 1,
    // flexDirection: "row",
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
  modelText: {
    color: "black",
    fontWeight: "400",
    // marginLeft: hp(2),
  },
  modelText1: {
    color: colors.ButtonText,
    fontWeight: "400",
    marginLeft: wp(10),
  },
  ImageMainContainer: {
    flex: 0.5,
    // borderWidth: 1,
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
  profileImage: {
    width: "100%",
    height: hp(20),
    borderRadius: 20,
  },
  containerMap: {
    ...StyleSheet.absoluteFillObject,
    height: hp(35),
    width: wp(100),
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default styles;
