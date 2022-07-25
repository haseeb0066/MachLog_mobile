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
    marginTop: hp(1),
    height: hp(6),
    width: "100%",
    // alignSelf: "center",
    backgroundColor: colors.input_text_backColor,
    borderRadius: hp(1.2),
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.white,
  },

  textStyle: {
    // justifyContent: "center",
    alignContent: "center",
    // borderWidth: 1,
    // borderColor: "white",
    fontSize: 18,
    backgroundColor: "transparent",
  },
  textStyle1: {
    // borderWidth: 1,
    // height: hp(10),
    // borderColor: "white",
    fontSize: 14,
    fontWeight: "bold",
    // color: colors.white,
    backgroundColor: colors.input_text_backColor,
  },
  codeTextStyle: {
    // color: "white",
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
    backgroundColor: "transparent",
    flexDirection: "row",
    borderRadius: hp(2),
    // borderWidth: 1,
    borderColor: colors.white,
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
});

export default styles;
