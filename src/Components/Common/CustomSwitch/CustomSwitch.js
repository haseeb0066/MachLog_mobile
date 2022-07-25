import React, { useState } from "react";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import colors from "../../../Assets/Colors/Colors";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";

const CustomSwitch = ({
  navigation,
  selectionMode,
  roundCorner,
  option1,
  option2,
  onSelectSwitch,
  selectionColor,
}) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  const [getRoundCorner, setRoundCorner] = useState(roundCorner);

  const updatedSwitchData = (val) => {
    setSelectionMode(val);
    onSelectSwitch(val);
    console.log("selected ==> ", val);
  };

  return (
    <View>
      <View
        style={{
          height: hp(5.5),
          width: wp(80),
          //   backgroundColor: "white",
          borderRadius: hp(2),
          borderWidth: 1,
          borderColor: colors.white,
          flexDirection: "row",
          justifyContent: "center",
          padding: 2,
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(1)}
          style={{
            flex: 1,

            backgroundColor: getSelectionMode == 1 ? "white" : null,
            borderRadius: hp(1.5),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: getSelectionMode == 1 ? "black" : "white",
              fontWeight: "700",
              fontSize: hp(1.3),
            }}
          >
            {option1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(2)}
          style={{
            flex: 1,

            backgroundColor: getSelectionMode == 2 ? "white" : null,
            borderRadius: hp(1.5),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: getSelectionMode == 2 ? "black" : "white",
              fontSize: hp(1.3),
              fontWeight: "700",
            }}
          >
            {option2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CustomSwitch;
