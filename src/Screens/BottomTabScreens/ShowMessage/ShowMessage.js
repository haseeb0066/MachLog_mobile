import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  ScrollView,
} from "react-native";
import styles from "./styles";
import Header from "../../../Components/Common/Header/Header";
import Images from "../../../Assets/Images";
import colors from "../../../Assets/Colors/Colors";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
import fonts from "../../../Assets/Fonts/font";
import * as yup from "yup";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";

function ShowMessage({ navigation, route }) {
  const { title, message } = route.params;

  // ================= Validation funtion with formik ==========================

  const { t } = useTranslation();
  const getTranslatedText = (text) => {
    return t(text);
  };

  const userInfo = {
    email: title,
    message: message,
  };
  const validationSchema = yup.object({
    email: yup.string().required("Email is required"),
    message: yup.string().required("Please describe your issue"),
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // behavior="height"
      style={styles.container}
    >
      <ImageBackground
        source={require("../../../Assets/Images/Png/BackImage.png")}
        style={{
          height: "100%",
          width: "105%",
          position: "absolute",
        }}
      />
      <ScrollView style={{ flex: 1 }}>
        <Formik
          initialValues={userInfo}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            SupportApi(values);
            console.log("Values ---->  ", values);
          }}
        >
          {({ values }) => (
            <>
              <View style={styles.headerContainer}>
                <Header
                  title={getTranslatedText("ShowMessage")}
                  leftIconPath={Images.backArrow}
                  //   backSvg={<LeftArrow />}
                  onLeftIconPress={() => {
                    navigation.goBack();
                  }}
                  tintColor={colors.white}
                />
              </View>
              {/* =================== Subject ===================== */}
              <View style={styles.subjectContainer}>
                <View style={styles.subTitle}>
                  <Text
                    style={{
                      fontSize: hp(1.5),
                      paddingLeft: Platform.OS === "ios" ? hp(6.5) : hp(7),
                      color: colors.white,
                      fontWeight: "700",
                      fontFamily: fonts.MontserLight,
                    }}
                  >
                    {getTranslatedText("Subject")}
                  </Text>
                </View>
                <View style={styles.subInput}>
                  {/* ==================== SUBJECT Text ==================== */}
                  <View
                    style={{
                      width: wp(80),
                      // borderWidth: 1,
                      borderColor: colors.Plus,
                      justifyContent: "center",
                      marginTop: hp(1),
                      alignItems: "center",
                    }}
                  >
                    <TextInput
                      style={{
                        width: wp(80),
                        borderWidth: hp(0.2),
                        borderColor: "white",
                        borderRadius: hp(2),
                        height: hp(6),
                        paddingLeft: hp(2),
                        paddingTop: hp(1.5),
                        // paddingRight: hp(2),
                        // padding: hp(2),
                        color: "white",
                        justifyContent: "center",
                      }}
                      placeholderTextColor={"white"}
                      required={true}
                      initialValue=""
                      multiline={true}
                      numberOfLines={6}
                      editable={false}
                      selectTextOnFocus={false}
                      value={values.email}
                    />
                  </View>
                </View>
              </View>

              {/* ==================== >MSG Text ==================== */}
              <View style={styles.msgContainer}>
                <View style={styles.msgTitle}>
                  <Text
                    style={{
                      fontSize: hp(1.5),
                      paddingLeft: Platform.OS === "ios" ? hp(6.5) : hp(7),
                      color: colors.white,
                      fontWeight: "700",
                      fontFamily: fonts.MontserLight,
                    }}
                  >
                    {getTranslatedText("Message")}
                  </Text>
                </View>
                <View style={styles.msgInput}>
                  <View
                    style={{
                      width: wp(80),
                      // borderWidth: 1,
                      borderColor: colors.Plus,
                      justifyContent: "center",
                      marginTop: hp(1),
                      alignItems: "center",
                      // borderRadius: hp(12),
                    }}
                  >
                    <TextInput
                      style={{
                        width: wp(80),
                        borderWidth: hp(0.2),
                        borderColor: "white",
                        borderRadius: hp(2),
                        height: hp(20),
                        paddingLeft: hp(2),
                        paddingRight: hp(2),
                        color: "white",
                      }}
                      placeholder={getTranslatedText("messageDetail")}
                      placeholderTextColor={"white"}
                      required={true}
                      initialValue=""
                      multiline={true}
                      numberOfLines={6}
                      editable={false}
                      selectTextOnFocus={false}
                      value={values.message}
                    />
                  </View>
                </View>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
export default ShowMessage;
