import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { hp, wp } from "../../Utills/CommonMethods/CommonMethods";
import Images from "../../Assets/Images";
import colors from "../../Assets/Colors/Colors";

const Subscriptioncard = ({
  packageheading,
  time,
  baserateprice,
  perdayrateprice,
  date,
}) => {
  return (
    <ImageBackground
      resizeMode={"stretch"}
      source={Images.Subscriptioncard}
      imageStyle={{
        height: hp(19),
        width: wp(95),
        borderRadius: hp(3),
      }}
    >
      <View style={styles.container}>
        <View style={styles.headingwrap}>
          <Text style={styles.headingstyle}>{packageheading}</Text>

          <Text style={{ alignSelf: "center", color: colors.white }}>
            {time}
          </Text>
        </View>
        <View style={styles.headingwrap}>
          <View style={{ width: wp(37.5), justifyContent: "center" }}>
            <Text style={{ fontWeight: "600", color: colors.white }}>
              {"Base Rate :"}
            </Text>
          </View>
          <View style={{ width: wp(50), justifyContent: "center" }}>
            <Text style={{ color: colors.white }}>{baserateprice}</Text>
          </View>
        </View>
        <View style={styles.headingwrap}>
          <Text
            style={{
              fontWeight: "600",
              alignSelf: "center",
              color: colors.white,
            }}
          >
            {"Per Day Rate :"}
          </Text>
          <Text style={{ alignSelf: "center", color: colors.white }}>
            {perdayrateprice}
          </Text>
          <Text style={{ alignSelf: "center", color: colors.white }}>
            {date}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};
export default Subscriptioncard;

const styles = StyleSheet.create({
  container: {
    height: hp(19),
    width: wp(95),
    justifyContent: "center",
    alignItems: "center",
  },
  headingwrap: {
    height: hp(4.5),
    width: wp(78),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headingstyle: {
    fontSize: hp(2),
    fontWeight: "600",
    alignSelf: "center",
    color: colors.white,
  },
});
