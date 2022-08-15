import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Modal,
} from "react-native";
import styles from "./styles";
import Logo from "../../../Assets/Images/Svg/AppLogo.svg";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
import colors from "../../../Assets/Colors/Colors";
import AppInput from "../../../Components/Common/AppInput/AppInput";
import Button from "../../../Components/Common/Button/Button";
import CommonText from "../../../Utills/CommonText";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import LottieView from "lottie-react-native";
import { useSelector } from "react-redux";
import PreferenceKeys from "../../../Utills/PreferenceKeys/PreferenceKeys";
import LocalStorage from "../../../Utills/LocalStorage/LocalStorage";
import TokenApis from "../../../Config/TokenApis/TokenAPIs";
import EndPoints from "../../../Config/BaseUrl/BaseUrl";
import GetTokenApi from "../../../Config/GetTokenApi/GetTokenApi";
import Loader from "../../../Components/Common/Loader/Loader";
import Toast from "react-native-simple-toast";
import Images from "../../../Assets/Images";
import { useTranslation } from "react-i18next";
import { create } from "apisauce";
import TokenAPIs from "../../../Config/TokenApis/TokenAPIs";

function SignupOtp({ navigation, route }) {
  // function SignupOtp({ navigation }) {
  const [verCode, setVerCode] = useState("");
  const [time, setTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  // ==========

  const [verCode1, setVerCode1] = useState("");

  const { token } = route.params;
  const { t } = useTranslation();
  const getTranslatedText = (text) => {
    return t(text);
  };

  const CountDown = () => {
    let seconds = 60,
      stop = 0,
      counterStarted = false,
      counter;
    if (counterStarted === false) {
      counterStarted = true;
      counter = setInterval(function () {
        if (seconds > stop) {
          seconds--;
          // seconds = seconds < 10 ? "0" + seconds : seconds;
          setTime(seconds);
          // console.log("seconds",seconds);
        } else {
          clearInterval(counter);
          counterStarted = false;
          seconds = 0;
        }
        if (seconds == 0) {
          // setDisabled(false);
        }
      }, 1000);
    }
  };

  useEffect(() => {
    CountDown();
  }, []);

  const checkOTP = async () => {
    let body = { otp: verCode, otp_sms: verCode1 };
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    const api = create({
      baseURL: EndPoints.VerifyOTPs,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    setIsLoading(true);
    const res = await TokenAPIs(EndPoints.VerifyOTPs, "POST", body, token);
    if (res.status === 200) {
      setIsLoading(false);
      // console.log("if running response===>  ", res.data.message);
      // Toast.show(res.data.message, Toast.LONG);
      alert(res.data.message);
      // navigation.navigate("Login");
      navigation.navigate("Subcription");
    } else {
      setIsLoading(false);
      // console.log("else ===>  ", res.data.message);
      // Toast.show(res.data.message, Toast.LONG);
      alert(res.data.message);
    }
  };

  const ResendOTP = async () => {
    setIsLoading(true);
    const res = await GetTokenApi(EndPoints.resendOtp, "GET", token);
    if (res.status === 200) {
      setIsLoading(false);
      setTimeout(() => {
        // console.log("res.data ===>   ", res.data);
        Toast.show(res.data.message, Toast.LONG);
        CountDown();
        // alert(res.data.message);
      }, 2000);
    } else {
      setIsLoading(false);
      // console.log("res else ==>  ", res.data);
      Toast.show(res.data.message, Toast.LONG);
      // alert("running bad");
      // alert(res.data.message);
    }
    CountDown();
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

      <View style={styles.logoContainer}>
        <Image
          source={Images.Logo}
          style={{
            // borderWidth: 1,
            borderColor: "white",
            width: wp(55),
          }}
          resizeMode="contain"
        />
      </View>
      {/* ==================== Text statement ================ */}
      <View
        style={{
          // borderWidth: 1,
          borderColor: "white",
          flex: 0.2,
          zIndex: 1,
          justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <Text style={styles.statementText}>
          we have sent you the OTP on your
        </Text>
        <Text style={styles.statementText}>
          desired email & phone number individually.
        </Text>
        <Text style={styles.statementText}>
          kindly enter here to for the verification purpose
        </Text>
      </View>

      <View style={styles.InputContainer}>
        {/*  Sign ----------- CONTAINER  */}

        <View
          style={{
            alignItems: "center",
            flex: 0.12,
            // justifyContent: "flex-end",
            // borderWidth: 2,
            borderColor: colors.white,
            // height: hp(20),
          }}
        >
          <View
            style={{
              width: wp(80),
              //   borderWidth: 2,
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
              {getTranslatedText("EmailVerification")}
            </Text>
          </View>
          {/* ===================== Enter otp ================ */}

          <View
            style={{
              width: wp(80),
              height: hp(6),
              // borderWidth: 2,
              borderColor: colors.white,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: hp(1.4),
                color: colors.lightColor,
                // fontWeight: "bold",
              }}
            >
              {getTranslatedText("EnterOTP")}
            </Text>
          </View>
        </View>

        {/*  OTP ----------- CONTAINER  */}

        <View
          style={{
            alignItems: "center",
            // flex: 0.12,
            height: hp(9),
            // borderWidth: 2,
            borderColor: colors.white,
            marginTop: hp(5),
          }}
        >
          <View style={styles.inputView1}>
            <OTPInputView
              style={{
                width: Platform.OS === "ios" ? hp(37) : hp(40),
                height: hp(2),
              }}
              pinCount={4}
              autoFocusOnLoad={false}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              editable={true}
              placeholderTextColor={colors.WhiteColor}
              onCodeFilled={(text) => {
                setVerCode(text);
              }}
            />
          </View>
        </View>

        {/* ============ OTP for PHone number ============ */}
        <View
          style={{
            alignItems: "center",
            flex: 0.12,
            marginTop: hp(5),
            // justifyContent: "flex-end",
            // borderWidth: 2,
            borderColor: colors.white,
            // height: hp(20),
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
              {getTranslatedText("phoneNumberOTP")}
            </Text>
          </View>
          {/* ===================== Enter otp ================ */}

          <View
            style={{
              // marginTop: hp(5),
              width: wp(80),
              height: hp(6),
              // borderWidth: 2,
              borderColor: colors.white,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: hp(1.4),
                color: colors.lightColor,
                // fontWeight: "bold",
              }}
            >
              {getTranslatedText("EnterOTP")}
            </Text>
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            // flex: 0.12,
            height: hp(9),
            // borderWidth: 2,
            borderColor: colors.white,
            marginTop: hp(5),
          }}
        >
          <View style={styles.inputView1}>
            <OTPInputView
              style={{
                width: Platform.OS === "ios" ? hp(37) : hp(40),
                height: hp(2),
              }}
              pinCount={4}
              autoFocusOnLoad={false}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              editable={true}
              placeholderTextColor={colors.WhiteColor}
              onCodeFilled={(text) => {
                setVerCode1(text);
              }}
            />
          </View>
        </View>

        {/*  Resend ----------- CONTAINER  */}

        <View
          style={{
            alignItems: "center",
            height: hp(4),
            // borderWidth: 1,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: wp(80),
              // borderWidth: 1,
              height: hp(3),
              flexDirection: "row",
            }}
          >
            <View
              style={{
                // borderWidth: 1,
                width: wp(40),
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                disabled={time == 0 ? false : true}
                onPress={() => ResendOTP()}
              >
                <Text style={{ color: colors.lightColor, fontSize: hp(1.2) }}>
                  {getTranslatedText("ResendOTP")}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                // borderWidth: 1,
                width: wp(40),
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <Text style={{ color: colors.lightColor, fontSize: hp(1.2) }}>
                {/* {"01:22"} */}
                {"00: " + time}
              </Text>
            </View>
          </View>
        </View>

        {/* ============= OTP verification ================ */}
        <View
          style={{
            alignItems: "center",
            flex: 0.2,
            // borderWidth: 1,
          }}
        >
          <Button
            title={getTranslatedText("OTPVerfication")}
            bgColor={colors.ButtonColor}
            color={colors.ButtonText}
            borderRadius={hp(2)}
            height={hp(6)}
            onPress={() => {
              checkOTP();
            }}
          />
        </View>
      </View>
      {/* ============== Modal ================== */}
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            alert(getTranslatedText("Modalclosed"));
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.LottieView}>
                {/* <Text style={styles.modalText}>{"Lottie "} </Text> */}
                <LottieView
                  source={require("../../../Assets/Video/congrats.json")}
                  style={{
                    height: hp(12),
                    width: wp(20),
                    //  borderWidth: 1
                  }}
                  autoPlay
                  // loop
                />
              </View>
              <View style={styles.modelTextView}>
                <Text style={styles.modalText}>
                  {getTranslatedText("Accountsuccessfully")}
                </Text>
              </View>

              <View style={styles.buttonContainer}>
                <View style={styles.touchbale}>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      width: wp(25),
                      height: hp(4),
                      borderRadius: hp(2),
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: colors.popUpButton,
                    }}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      navigation.navigate("Login");
                    }}
                  >
                    <Text style={styles.buttonText}>{"OK"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
export default SignupOtp;
