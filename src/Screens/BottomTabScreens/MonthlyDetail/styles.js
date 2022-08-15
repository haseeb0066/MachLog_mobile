import { StyleSheet, Platform } from "react-native";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
import colors from "../../../Assets/Colors/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: colors.white,
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
    flex: 1,
    // justifyContent: "center",
  },
  modalView: {
    borderRadius: hp(4),
    height: hp(70),
    width: wp(100),
    // borderWidth: hp(0.05),
    // borderColor: "white",
  },
  modalView1: {
    borderRadius: hp(3),
    height: hp(15),
    width: wp(82),
  },

  chooseContainer: {
    flex: 1,
    backgroundColor: "transparent",
    // flexDirection: "row",
    borderRadius: hp(2),
    // borderWidth: 10,
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
    height: hp(12),
    borderRadius: 15,
  },
  modelText: {
    color: colors.white,
    fontWeight: "400",
    fontSize: hp(1.7),
    // marginLeft: hp(2),
  },
  modelText1: {
    color: colors.white,
    fontWeight: "600",
    // fontWeight: "400",
    marginLeft: wp(10),
  },
  ImageMainContainer: {
    flex: 0.4,
    // borderWidth: 1,
  },
});

export default styles;
