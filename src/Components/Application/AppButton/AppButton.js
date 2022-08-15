import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Platform,
  ActivityIndicator,
} from "react-native";
import colors from "../../../Assets/Colors/Colors";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
import SvgComponent from "../../Common/SvgCustomComponents/SvgCustomComponents";

function AppButton({
  marginTop,
  title,
  backgroundColor = colors.primary,
  onPress,
  navigation,
  titleColor = colors.ButtonText,
  loading = false,
  disabled = false,
  borderColor,
  IconName,
  width = wp(90),
  svgIcon,
  fontWeight = "bold",
  borderWidth,
  borderRadius = hp(1.5),
  height,
  padding = Platform.OS === "android" ? hp(0) : hp(0),
  buttonContainerProps,
  textStyleProps,
}) {
  let text = {
    fontSize: hp(1.6),
    //textTransform: "capitalize",
    fontWeight: "bold",
    color: titleColor,
    marginLeft: svgIcon ? "2%" : 0,
  };
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.button,
        {
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: backgroundColor,
          marginTop: marginTop,
          borderColor: borderColor,
          width: width,
          borderWidth: borderWidth,
          borderColor: borderColor,
          borderRadius: borderRadius,
          height: height,
          padding: padding,
        },
        { ...buttonContainerProps },
      ]}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator
          size={"small"}
          animating={loading}
          color={colors.WHITE}
        />
      ) : (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {svgIcon && <SvgComponent svgMarkup={svgIcon} />}
          <Text style={[text, { ...textStyleProps }]}>{title}</Text>
          {/* {IconName && <Icon name={IconName} size={25} />} */}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: Platform.OS === "android" ? hp(1.7) : hp(10),
    marginVertical: hp(1.2),
    alignSelf: "center",
  },
});

export default AppButton;
