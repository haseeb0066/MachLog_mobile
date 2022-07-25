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
import DateIcon from "../../../Assets/Images/Svg/DateIcon.svg";
import fonts from "../../../Assets/Fonts/font";

function DetailCard({ icon, title, description }) {
  const [isLoading, setIsLoading] = useState(false);
  // ================= Validation funtion with formik ==========================
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.authReducer.isLogin);

  // const {incon, title, description} = props.param

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        {/* ==== inner 1st view */}
        <View style={styles.cardView1}>
          {/* ==== inner 1st view */}
          <View
            style={{
              // borderWidth: 2,
              flex: 0.4,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: hp(1),
            }}
          >
            {/* <DateIcon style={{ height: hp(2), width: wp(3) }} /> */}
            {icon}
          </View>
          {/* ==== inner 2nd view */}
          <View
            style={{
              // borderWidth: 2,
              flex: 0.6,
              justifyContent: "center",
              alignItems: "flex-start",
              borderRadius: hp(1),
            }}
          >
            <Text
              style={{
                fontSize: hp(1.5),
                fontWeight: "700",
                fontFamily: fonts.MontserLight,
                color: "black",
              }}
            >
              {title}
            </Text>
          </View>
        </View>

        {/* ==== inner 2nd view */}
        <View style={styles.cardView2}>
          <Text
            style={{
              fontSize: hp(1.65),
              fontWeight: "700",
              fontFamily: fonts.MontserLight,
              paddingLeft: hp(2),
              color: colors.descripe,
            }}
          >
            {description}
          </Text>
        </View>
      </View>
    </View>
  );
}
export default DetailCard;
