import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./styles";
import Header from "../../../Components/Common/Header/Header";
import Images from "../../../Assets/Images";
import colors from "../../../Assets/Colors/Colors";
import { wp, hp } from "../../../Utills/CommonMethods/CommonMethods";
import { useDispatch, useSelector } from "react-redux";
import { logout, UserCredentails } from "../../../Redux/Actions/Actions";
import fonts from "../../../Assets/Fonts/font";
import GetTokenApi from "../../../Config/GetTokenApi/GetTokenApi";

function MessageCard({ title, textMsg, sendTime, backgroundColor, fontStyle }) {
  const [selected1, setSelected1] = useState("");

  // const checkMsg = () => {
  //   data.filter((item, index) => {
  //     setSelected1(item.id);
  //     console.log("ID ==> ", item.id, "  ", id);
  //   });
  // };
  // useEffect(() => {
  //   checkMsg();
  // }, [selected]);

  return (
    <View
      style={{
        height: hp(8.5),
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 0.3,
        borderBottomColor: "#A9C6E8",
        backgroundColor: backgroundColor,
      }}
    >
      <View style={styles.MessageContainer}>
        {/* ==============  Image  =============== */}
        <View style={styles.ImageContain}>
          <View
            style={{
              height: hp(6),
              width: hp(6),
              borderRadius: hp(3),
              // borderWidth: 0.3,
              borderColor: colors.ButtonColor,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={Images.AdminIcon}
              style={{
                height: hp(4),
                width: wp(8),
                // borderWidth: 1,
              }}
              resizeMode="stretch"
            />
          </View>
        </View>
        {/* ==============  Messages  =============== */}
        <View
          style={{
            flex: 0.6,
            // borderWidth: 1,
            height: hp(10),
            // flexDirection: "row",
          }}
        >
          <View style={{ flex: 0.5, justifyContent: "flex-end" }}>
            <Text
              style={{
                fontSize: hp(1.5),
                paddingLeft: hp(2),
                color: colors.white,
                fontWeight: fontStyle,
              }}
            >
              {title}
            </Text>
          </View>
          <View
            style={{
              flex: 0.4,
              justifyContent: "flex-start",
            }}
          >
            <Text
              style={{
                fontSize: hp(1.5),
                paddingLeft: hp(2),
                color: colors.white,
                paddingTop: hp(0.5),
                fontWeight: fontStyle,
              }}
            >
              {textMsg}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 0.2,
            // borderWidth: 1,
            height: hp(10),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: hp(1.5), color: colors.white }}>
            {sendTime}
          </Text>
        </View>
      </View>
    </View>
  );
}
export default MessageCard;
