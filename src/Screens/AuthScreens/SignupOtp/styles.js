import React, { useState, useEffect } from "react";
import { StyleSheet, Platform } from "react-native";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
import colors from "../../../Assets/Colors/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  InputContainer: {
    flex: 0.7,
    zIndex: 1,
    justifyContent: "flex-start",
    // borderWidth: 2,
    borderColor: colors.white,
  },
  logoContainer: {
    flex: 0.2,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 2,
    borderColor: colors.white,
  },

  ButtonContainer: {
    // flex: 0.2,
    // height: hp(15),
    justifyContent: "center",
    // borderWidth: 2,
    borderColor: colors.white,
  },
  inputView: {
    flex: 0.35,
    // backgroundColor: "green",
    alignItems: "center",
  },
  inputView1: {
    // borderWidth: 2,
    borderColor: colors.white,
    width: hp(42),
    height: hp(7),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // borderRadius: hp(3),
  },
  underlineStyleBase: {
    width: hp(5.2),
    height: wp(13),
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  underlineStyleHighLighted: {
    borderBottomColor: colors.Minus,
  },
  // =============== Modal ===============
  container1: {
    flex: 1,
    backgroundColor: colors.blueColor,
  },
  centeredView: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    paddingTop: hp(20),
  },
  modalView: {
    borderRadius: hp(3),
    height: hp(22),
    width: hp(40),
    // borderWidth: 1,
    backgroundColor: colors.white,
  },
  button: {
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    height: hp(4),
    width: hp(30),
    elevation: 2,
    backgroundColor: "#2196F3",
    justifyContent: "center",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
    fontSize: hp(1.5),
    fontWeight: "500",
    color: "black",
  },
  LottieView: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 2,
    borderColor: "green",
  },
  modelTextView: {
    flex: 0.2,
    justifyContent: "center",
    // borderWidth: 1,
  },
  buttonContainer: {
    flex: 0.3,
    // backgroundColor: "#dbdbdb",
    borderBottomLeftRadius: hp(3),
    borderBottomRightRadius: hp(3),
    // borderWidth: 1,
  },
  touchbale: {
    height: "100%",
    // width: "100%",

    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    alignSelf: "center",
    textAlign: "center",
    color: colors.white,
    fontWeight: "bold",
    // borderWidth: 1,
    // fontSize: fonts.H3,
  },
  statementText: {
    color: colors.white,
    textAlign: "left",
    marginLeft: hp(5),
  },
});

export default styles;
