import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import styles from "./styles";
import Header from "../../../Components/Common/Header/Header";
import Images from "../../../Assets/Images";
import colors from "../../../Assets/Colors/Colors";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
import AppInput from "../../../Components/Common/AppInput/AppInput";
import CommonText from "../../../Utills/CommonText";
import fonts from "../../../Assets/Fonts/font";
import Carousel from "react-native-snap-carousel";
import CardImage from "../../../Assets/Images/Svg/CardImage.svg";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Components/Common/Loader/Loader";
import GetTokenApi from "../../../Config/GetTokenApi/GetTokenApi";
import EndPoints from "../../../Config/BaseUrl/BaseUrl";
import TokenApi from "../../../Config/TokenApis/TokenAPIs";
import Toast from "react-native-simple-toast";
import { useTranslation } from "react-i18next";
import { useIsFocused } from "@react-navigation/native";

function SubcriptionPackages({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [packageArray, setPackageArray] = useState([]);
  const token = useSelector((state) => state.authReducer.token);
  const isFocused = useIsFocused();
  const { t } = useTranslation();
  const getTranslatedText = (text) => {
    return t(text);
  };
  //========================== card detail ==================
  const [carouselItems, setCarouselItems] = useState([]);
  const [carouselItems2, setCarouselItems2] = useState([
    {
      title: "item 1",
      rate: "Base Rate",
      Price: "4.99 Euro",
      Package: "Monthly Package",
      Score: "30",
    },
    {
      title: "item 2",
      rate: "Base Rate",
      Price: "4.99 Euro",
      Package: "Per Day Package",
      Score: "30",
    },
    {
      title: "item 3",
      rate: "Base Rate",
      Package: "Yearly Package",
      Price: "4.99 Euro",
      Score: "30",
    },
    {
      title: "item 4",
      rate: "Base Rate",
      Price: "4.99 Euro",
      Package: "Free Trail",
      Score: "30",
    },
  ]);

  //============== Package Post API ============
  const UserSelectPackage = async (selectedId, typeId) => {
    // console.log("Selectpackage ==>  ", selectedId);
    let obj = {
      subscribed_id: selectedId,
      type: typeId,
    };

    setIsLoading(true);
    const res = await TokenApi(EndPoints.selectPackageAPI, "POST", obj, token);
    if (res.status === 200) {
      console.log("=== package post ====", res);
      // Toast.show("Package selected successfully", Toast.LONG);
      alert(getTranslatedText("PackageSubscribe"));
      setPackageArray(res);
      setIsLoading(false);
    } else {
      console.log("=== else package post  =>   ", res);
      setIsLoading(false);
      // Toast.show(res.data.message, Toast.LONG);
      alert(getTranslatedText("PackageSubscribe"));
    }
  };

  const renderItem = ({ item, index }) => {
    // console.log("item title ==>  ", item);
    return (
      <TouchableOpacity
        style={{
          height: hp(85),
          width: wp(100),
          borderColor: "white",
          justifyContent: "center",
        }}
        onPress={() => {
          Alert.alert(getTranslatedText("AreYouSubscribePackage"), "", [
            {
              text: getTranslatedText("No"),
              onPress: () => console.log("Cancel Pressed"),
              style: "No",
            },
            {
              text: getTranslatedText("Yes"),
              onPress: () => UserSelectPackage(item.id, item.type),
            },
          ]);
          // UserSelectPackage(item.id, item.type);
        }}
      >
        <View
          style={{
            // borderWidth: 3,
            zIndex: 1,
            position: "absolute",
          }}
        >
          <CardImage />
        </View>
        {/* ===============  circle card =============== */}
        <View
          style={{
            // borderWidth: 2,
            borderColor: "white",
            height: hp(70),
            width: Platform.OS == "ios" ? wp(80) : wp(83),
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <View
            style={{
              borderColor: "green",
              backgroundColor: colors.lightColor,
              height: 150,
              width: 150,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: hp(30),
              marginBottom: Platform.OS == "ios" ? hp(45) : hp(52),
            }}
          >
            <View
              style={{
                borderColor: "green",
                backgroundColor: colors.lightColor,
                height: 120,
                width: 120,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: hp(30),
                borderWidth: hp(0.3),
                borderColor: colors.white,
              }}
            >
              <Text style={styles.title}>{getTranslatedText("BaseRate")}</Text>
              <Text style={styles.priceText}>{item.price}</Text>
            </View>
          </View>
        </View>

        {/* ===============  circle card =============== */}
        <View
          style={{
            // borderWidth: 1,
            borderColor: "green",
            // backgroundColor: "blue",
            height: hp(40),
            width: Platform.OS == "ios" ? wp(80) : wp(85),
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            position: "absolute",
          }}
        >
          {/* ===============  Package name =============== */}

          <View
            style={{
              flex: 0.5,
              //   borderWidth: 1,
              borderColor: "green",
              //   alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: hp(3),
                color: colors.ButtonText,
                fontFamily: fonts.MontserBold,
              }}
            >
              {item.name}
            </Text>
          </View>
          {/* ===============  Pakcage Rate =============== */}

          <View
            style={{
              flex: 0.3,
              //   borderWidth: 1,
              borderColor: "red",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: hp(1.8),
                color: colors.ButtonText,
                fontFamily: fonts.MontserBold,
              }}
            >
              {getTranslatedText("PerRate")}
            </Text>
            <Text
              style={{
                fontSize: hp(1.8),
                color: colors.ButtonText,
                fontFamily: fonts.MontserBold,
              }}
            >
              {item.per_day_rate}
            </Text>
          </View>

          {/* ===============  Pakcage Score =============== */}

          <View
            style={{
              flex: 0.2,
              // borderWidth: 1,
              borderColor: "blue",
              justifyContent: "center",
              height: hp(6),
              width: wp(30),
            }}
          >
            {item.get_user_subscribed_package?.id != null ? (
              <View
                style={{
                  height: hp(5),
                  borderWidth: hp(0.2),
                  borderRadius: hp(2),
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: colors.white,
                  backgroundColor: "#A9C6E8",
                }}
              >
                <Text style={{ fontWeight: "700", color: colors.white }}>
                  {getTranslatedText("Purchased")}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  height: hp(5),
                  borderWidth: hp(0.2),
                  borderRadius: hp(2),
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: colors.white,
                  backgroundColor: colors.descripe,
                }}
              >
                <Text style={{ fontWeight: "700", color: colors.white }}>
                  {getTranslatedText("Buy")}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const GetAPI = async () => {
    setIsLoading(true);
    const res = await GetTokenApi(EndPoints.SubscribeGet, "GET", token);
    console.log("res ==>  ", res);
    if (res?.status === 200) {
      setIsLoading(false);
      console.log("res 200 ==>  ", res.data);
      setCarouselItems(res.data);
    } else {
      setIsLoading(false);
      console.log("res else ==>  ", res);
    }
  };

  useEffect(() => {
    GetAPI();
  }, [isFocused, packageArray]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // behavior="height"
      style={styles.container}
    >
      {isLoading && <Loader isloading={isLoading} />}
      <ImageBackground
        source={require("../../../Assets/Images/Png/BackImage.png")}
        style={{
          height: "100%",
          width: "105%",
          zIndex: 1,
          position: "absolute",
        }}
      />

      <View style={styles.headerContainer}>
        <Header
          title={getTranslatedText("SUBSCRIPTION")}
          leftIconPath={Images.backArrow}
          //   backSvg={<LeftArrow />}
          onLeftIconPress={() => {
            navigation.goBack();
          }}
          tintColor={colors.white}
          rightIconTwoPath={Images.HistoryButton}
          onRightIconTwoPress={() => {
            navigation.navigate("PackageHistory");
          }}
        />
      </View>

      {/* ================== slider cards ================== */}

      <View style={styles.cardContainer}>
        <View
          style={{
            // paddingTop: hp(20),
            flex: 0.8,
            // justifyContent: "center",
            // borderWidth: 2,
            // alignItems: "center",
            borderColor: "white",
            flex: 1,
            width: wp(100),
          }}
        >
          <Carousel
            ref={(c) => {
              c = c;
            }}
            data={carouselItems}
            renderItem={renderItem}
            sliderWidth={wp(100)}
            itemWidth={wp(78)}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
export default SubcriptionPackages;
