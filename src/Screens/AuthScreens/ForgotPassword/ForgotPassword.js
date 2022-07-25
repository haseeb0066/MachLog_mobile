import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import Logo from "../../../Assets/Images/Svg/AppLogo.svg";
import LeftArrow from "../../../Assets/Images/Svg/leftArrow.svg";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
import colors from "../../../Assets/Colors/Colors";
import AppInput from "../../../Components/Common/AppInput/AppInput";
import Button from "../../../Components/Common/Button/Button";
import Header from "../../../Components/Common/Header/Header";
import Images from "../../../Assets/Images";
import * as yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import EndPoints from "../../../Config/BaseUrl/BaseUrl";
import HitApi from "../../../Config/HitApis/HitApis";
import Loader from "../../../Components/Common/Loader/Loader";
import Toast from "react-native-simple-toast";
import { useTranslation } from "react-i18next";

function ForgotPassword({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const userInfo = {
    // email: "haseebsheikh0066@gmail.com",
    email: "",
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .label("email")
      .email("Email must be a valid email address")
      .required("Email is required"),
  });

  const getTranslatedText = (text) => {
    return t(text);
  };

  const forgotPass = async (values) => {
    // navigation.navigate("VerifyPassword");
    // let formdata = new FormData();
    // formdata.append("email", v.email);
    console.log("FORGOT forgotPass==> ");

    let params = {
      email: values.email,
    };
    setIsLoading(true);
    try {
      const res = await HitApi(EndPoints.ForgotRequest, "POST", params);
      console.log("FORGOT RES==> ", res);
      // console.log("FORGOT RES token==> ", res.data.Token);
      if (res.status === 200) {
        setIsLoading(false);
        // console.log("FORGOT RES token==> ", res.data.message);
        // alert(res.data.message);
        // Toast.show(res.data.message, Toast.LONG);
        alert(res.data.message);
        navigation.navigate("ForgotPassOtp", { email: values.email });
      } else {
        alert(res.data.message);
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log("error==> ", e);
      alert("Email does not exist");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../Assets/Images/Png/BackImage.png")}
        style={{
          height: "100%",
          width: "105%",
          zIndex: 1,
          position: "absolute",
        }}
      />
      {isLoading && <Loader isloading={isLoading} />}

      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          forgotPass(values);
          // console.log("Values ---->  ", values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
          touched,
        }) => (
          <>
            <View style={styles.headerContainer}>
              <Header
                //   lefticonSize={hp(4)}
                leftIconPath={Images.backArrow}
                //   backSvg={<LeftArrow />}
                onLeftIconPress={() => {
                  navigation.goBack();
                }}
                tintColor={colors.white}
              />
            </View>

            <View style={styles.logoContainer}>
              {/* <Logo /> */}
              <Image
                source={Images.Logo}
                style={{
                  // borderWidth: 1,
                  borderColor: "white",
                  width: wp(55),
                  height: hp(15),
                }}
                resizeMode="contain"
              />
            </View>
            <View style={styles.InputContainer}>
              <View
                style={{
                  flex: 0.5,
                  // borderWidth: 2,
                  borderColor: colors.white,
                  justifyContent: "center",
                }}
              >
                {/*  Forgot----------- CONTAINER  */}
                <View
                  style={{
                    alignItems: "center",
                    flex: 0.2,
                    justifyContent: "flex-end",
                    //   borderWidth: 1,
                    borderColor: colors.white,
                  }}
                >
                  <View
                    style={{
                      width: wp(80),
                      // borderWidth: 2,
                      borderColor: colors.white,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: hp(2.4),
                        color: colors.white,
                        fontWeight: "bold",
                      }}
                    >
                      {getTranslatedText("ForgotPassword")}
                    </Text>
                  </View>
                </View>
                {/*  TEXTinput ----------- CONTAINER  */}
                <View
                  style={{
                    flex: 0.2,
                    width: wp(100),
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: hp(0.5),
                  }}
                >
                  <View
                    style={{
                      width: wp(90),
                      // borderWidth: 1,
                      borderColor: colors.Plus,
                      justifyContent: "center",
                      marginTop: hp(1),
                    }}
                  >
                    <AppInput
                      tintColor={colors.GrayColor}
                      // placeholder={CommonText.EmailAddress}
                      placeholder={getTranslatedText("Email")}
                      placeholderTextColor={colors.lightColor}
                      height={hp(6)}
                      colortextInput={"white"}
                      borderColor={colors.white}
                      borderWidth={hp(0.15)}
                      borderRadius={hp(2)}
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                    />
                    {errors.email && touched.email && (
                      <Text
                        style={{
                          fontSize: 10,
                          color: "red",
                          marginLeft: hp(2.5),
                        }}
                      >
                        {errors.email}
                      </Text>
                    )}
                  </View>
                </View>

                {/* =============== BUTTON ================ */}
                <View
                  style={{
                    marginTop: hp(2),
                    flex: 0.3,
                    alignItems: "center",
                    //   borderWidth: 2,
                    borderColor: colors.white,
                  }}
                >
                  {/*================ BUTTON CONTAINER ========== */}

                  <View style={styles.ButtonContainer}>
                    <Button
                      title={getTranslatedText("SendEmail")}
                      bgColor={colors.ButtonColor}
                      color={colors.ButtonText}
                      borderRadius={hp(2)}
                      onPress={handleSubmit}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  flex: 0.5,
                  //  borderWidth: 2,
                  borderColor: colors.white,
                }}
              ></View>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}
export default ForgotPassword;
