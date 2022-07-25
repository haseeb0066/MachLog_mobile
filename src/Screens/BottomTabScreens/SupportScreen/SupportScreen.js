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
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import styles from "./styles";
import Header from "../../../Components/Common/Header/Header";
import Images from "../../../Assets/Images";
import colors from "../../../Assets/Colors/Colors";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
import AppInput from "../../../Components/Common/AppInput/AppInput";
import fonts from "../../../Assets/Fonts/font";
import ImageUpload from "../../../Assets/Images/Svg/imageUpload.svg";
import Button from "../../../Components/Common/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import CemaraIcon from "../../../Assets/Images/Svg/cameraIcon.svg";
import GalleryIcon from "../../../Assets/Images/Svg/galleryIcon.svg";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import apiClient from "../../../Config/Client";
import * as yup from "yup";
import { Formik } from "formik";
import Loader from "../../../Components/Common/Loader/Loader";
import Toast from "react-native-simple-toast";
import { useTranslation } from "react-i18next";

function SupportScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const getTranslatedText = (text) => {
    return t(text);
  };

  // ================= Validation funtion with formik ==========================
  const [modalVisible, setModalVisible] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [showImage, setShowImage] = useState("");
  const emailAddress = useSelector((state) => state.authReducer.email);

  // ================= Picture   ================
  const LunchCamera = async () => {
    const Options = {
      title: "Choose an Image",
    };
    await launchCamera(Options, (response) => {
      const Options = {
        title: "Choose an Image",
      };
      console.log("launch camera function");
      setModalVisible(false);
      setIsLoading(true);
      try {
        if (response.didCancel) {
          alert("User cancelled image picker");
          setIsLoading(false);
        } else {
          let obj = {
            name: response.assets[0].fileName,
            type: response.assets[0].type,
            uri: response.assets[0].uri,
          };
          setUserImage(obj);
          // console.log("photo response ==> ", response.assets[0].uri);
          // await dispatch(profileImage(response.assets[0].uri))
          setShowImage(response.assets[0].uri);
          setIsLoading(false);
        }
      } catch (e) {
        setIsLoading(false);
        console.log("error==> ", e);
      }
    });
  };

  const LunchGallery = async () => {
    const Options = {
      title: "Choose an Image",
    };
    setModalVisible(false);
    // setIsLoading(true);
    await launchImageLibrary(Options, async (response) => {
      try {
        if (response.didCancel) {
          alert("User cancelled image picker");
          setIsLoading(false);
        } else {
          let obj = {
            name: response.assets[0].fileName,
            type: response.assets[0].type,
            uri: response.assets[0].uri,
          };
          setUserImage(obj);
          setShowImage(response.assets[0].uri);
          setIsLoading(false);
        }
      } catch (e) {
        setIsLoading(false);
        console.log("error==> ", e);
      }
    });
  };

  // ================= Validation funtion with formik ==========================
  const userInfo = {
    email: emailAddress,
    message: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .label("email")
      .email("Email must be a valid email address")
      .required("Email is required"),
    message: yup.string().required("Please describe your issue"),
  });

  const SupportApi = async (values) => {
    // console.log("image ==> ", userImage);
    var formdata = new FormData();
    formdata.append("email", values.email);
    formdata.append("message", values.message);
    formdata.append("attachment", userImage);

    console.log("formdata ===> ", formdata);
    setIsLoading(true);
    const result = await apiClient.post("/support/send-to-support", formdata, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (result.ok) {
      setIsLoading(false);
      console.log("res=====>   ", result.data.data);
      // Toast.show(result.data.data, Toast.LONG);
      alert(result.data.data);
      setTimeout(() => {
        navigation.navigate(getTranslatedText("Home"));
      }, 2000);
    } else {
      setIsLoading(false);
      console.log("else =====>   ", result?.data);
      alert(result?.data.message);
      // Toast.show(result?.data.message, Toast.LONG);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {isLoading && <Loader isloading={isLoading} />}

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
                  title={getTranslatedText("SUPPORT")}
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
                    {getTranslatedText("EmailAddress")}
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
                    <AppInput
                      tintColor={colors.GrayColor}
                      placeholder={getTranslatedText("EmailAddress")}
                      placeholderTextColor={colors.lightColor}
                      height={hp(5.5)}
                      colortextInput={"white"}
                      borderColor={colors.white}
                      borderWidth={hp(0.15)}
                      borderRadius={hp(2)}
                      onChangeText={handleChange("email")}
                      value={values.email}
                      onBlur={handleBlur("email")}
                    />
                    {touched.name && errors.name && (
                      <Text
                        style={{
                          fontSize: 11,
                          color: "red",
                          marginLeft: hp(2),
                          width: wp(70),
                        }}
                      >
                        {errors.name}
                      </Text>
                    )}
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
                    {getTranslatedText("Messsages")}
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
                        height: hp(15),
                        paddingLeft: hp(2),
                        paddingRight: hp(2),
                        // marginBottom: hp(2),
                        // paddingBottom: Platform.OS === "ios" ? hp(9) : hp(11),
                        color: "white",
                      }}
                      placeholder={getTranslatedText("messageDetail")}
                      // autoCapitalize="words"
                      placeholderTextColor={"white"}
                      // value={msg}
                      required={true}
                      // onChangeText={(value) => setMsg(value)}
                      initialValue=""
                      multiline={true}
                      numberOfLines={6}
                      onChangeText={handleChange("message")}
                      value={values.message}
                      onBlur={handleBlur("message")}
                    />
                    {touched.message && errors.message && (
                      <Text
                        style={{
                          fontSize: 11,
                          color: "red",
                          marginLeft: hp(2),
                          width: wp(70),
                        }}
                      >
                        {errors.message}
                      </Text>
                    )}
                  </View>
                </View>
              </View>

              {/* ==================== >Attachments Images ==================== */}
              <View style={styles.AttachmentContainer}>
                <View style={styles.attachText}>
                  <Text
                    style={{
                      fontSize: hp(1.5),
                      paddingLeft: Platform.OS === "ios" ? hp(6.5) : hp(7),
                      color: colors.white,
                      fontWeight: "700",
                      fontFamily: fonts.MontserLight,
                    }}
                  >
                    {getTranslatedText("AttachImages")}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    // borderWidth: 1,
                    borderColor: colors.white,
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      flex: 0.7,
                      // borderWidth: 1,
                      borderColor: colors.white,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {showImage == "" ? (
                      <TouchableOpacity
                        style={{
                          height: hp(12),
                          width: wp(30),
                          // borderWidth: 1,
                          borderColor: colors.white,
                          justifyContent: "flex-end",
                          borderRadius: hp(2),
                          backgroundColor: "#A9C6E890",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onPress={() => {
                          setModalVisible(true);
                        }}
                      >
                        <ImageUpload />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={{
                          height: hp(12),
                          width: wp(30),
                          // borderWidth: 1,
                          borderColor: colors.white,
                          justifyContent: "flex-end",
                          borderRadius: hp(2),
                          backgroundColor: "#A9C6E890",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onPress={() => {
                          setModalVisible(true);
                        }}
                      >
                        <Image
                          source={{ uri: showImage }}
                          style={styles.imageContainer}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
              {/* ==================== >Button ==================== */}
              <View
                style={{
                  height: hp(10),
                  zIndex: 1,
                  // borderWidth: 2,
                  borderColor: colors.white,
                  marginTop: hp(2),
                  alignItems: "center",
                }}
              >
                <Button
                  title={getTranslatedText("Send")}
                  bgColor={colors.ButtonColor}
                  color={colors.ButtonText}
                  borderRadius={hp(2)}
                  onPress={handleSubmit}
                />
              </View>
              {/* ===================  MODAL ===================== */}

              <View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  // blur={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    // alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                  }}
                >
                  <TouchableWithoutFeedback
                    onPress={() => setModalVisible(false)}
                  >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <View style={styles.chooseContainer}>
                          <View style={styles.cameraContainer}>
                            <TouchableOpacity
                              style={{
                                height: hp(12),
                                width: wp(25),
                                borderWidth: hp(0.1),
                                borderColor: "#F2F7FA40",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 10,
                                backgroundColor: "#2D333C",
                              }}
                              onPress={() => {
                                LunchCamera();
                              }}
                            >
                              <CemaraIcon style={styles.cameraStyle} />
                            </TouchableOpacity>
                            <View
                              style={{
                                alignItems: "center",
                                width: "80%",
                              }}
                            >
                              <Text
                                style={{
                                  color: "#F2F7FA",
                                }}
                              >
                                {getTranslatedText("Camera")}
                              </Text>
                            </View>
                          </View>

                          <View style={{ flex: 0.2 }}>
                            <Text>{null} </Text>
                          </View>

                          <View style={styles.galleryContainer}>
                            <TouchableOpacity
                              style={{
                                height: hp(12),
                                width: wp(25),
                                borderWidth: hp(0.1),
                                borderColor: "#F2F7FA40",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 10,
                                backgroundColor: "#2D333C",
                              }}
                              onPress={() => {
                                LunchGallery();
                              }}
                            >
                              <GalleryIcon style={styles.galleryStyle} />
                            </TouchableOpacity>
                            <View
                              style={{
                                alignItems: "center",
                                width: "80%",
                              }}
                            >
                              <Text
                                style={{
                                  // fontFamily: fonts.regular,
                                  // color: colors.input_text_color,
                                  color: "#F2F7FA",
                                }}
                              >
                                {getTranslatedText("Gallery")}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </Modal>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
export default SupportScreen;
