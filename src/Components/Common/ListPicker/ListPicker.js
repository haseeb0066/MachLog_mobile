import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
  PermissionsAndroid,
  TouchableWithoutFeedback,
} from "react-native";
import { retrySymbolicateLogNow } from "react-native/Libraries/LogBox/Data/LogBoxData";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
import styles from "./styles";

const OPTIONS = ["per day", "per month", "per year"];
const ListPicker = (props) => {
  console.log("props ===>  ", props);
  return (
    <TouchableOpacity
      onPress={() => props.changeModalVisiblility(false)}
      style={styles.container}
    >
      <View style={[styles.model, { height: hp(30), width: wp(90) }]}></View>
    </TouchableOpacity>
  );
};

export default ListPicker;
