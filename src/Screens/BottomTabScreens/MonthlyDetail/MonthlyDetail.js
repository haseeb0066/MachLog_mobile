import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
  PermissionsAndroid,
  TextInput,
  SafeAreaView,
  Platform,
} from "react-native";
import styles from "./styles";
// import Images from "../../../Assets/Images";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
// import Loader from "../../../Components/Common/Loader/Loader";
import GetTokenApi from "../../../Config/GetTokenApi/GetTokenApi";
import EndPoints from "../../../Config/BaseUrl/BaseUrl";
import { useSelector } from "react-redux";
import Loader from "../../../Components/Common/Loader/Loader";
import Images from "../../../Assets/Images";
import * as yup from "yup";
import { Formik } from "formik";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
import colors from "../../../Assets/Colors/Colors";
import Button from "../../../Components/Common/Button/Button";
import PopUpModal from "../../../Components/Application/PopUpModal/PopUpModal";
import Toast from "react-native-toast-message";
import AppForm from "../../../Components/Common/FormComponents/AppFrom";
import AppFromField from "../../../Components/Common/FormComponents/AppFromField";
import SubmitButton from "../../../Components/Application/SubmitButton/SubmitButton";
import { create } from "apisauce";
import apiClient from "../../../Config/Client";
import Toast1 from "react-native-simple-toast";

function MonthlyDetail({ navigation }) {
  const token = useSelector((state) => state.authReducer.token);
  const [popUpModalVisible, setPopUpModalVisible] = useState(false);
  const [selected, setSelected] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [FrontImage, setFrontImage] = useState("");
  const [backImage, setBackImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showImage, setShowImage] = useState("");

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    if (Platform.OS === "ios") {
      null;
    } else {
      requestCameraPermission();
    }
  }, []);

  //  ===== Camers signup open function=======
  const LunchCamera = async () => {
    const Options = {
      title: "Choose an Image",
    };
    await launchCamera(Options, (response) => {
      const Options = {
        title: "Choose anndd Image",
      };
      console.log("launch camera function");
      setModalVisible(false);
      setIsLoading(true);
      try {
        if (response.didCancel) {
          alert("User cancelled image picker");
          setIsLoading(false);
        } else {
          setPopUpModalVisible(false);
          let obj = {
            name: response.assets[0].fileName,
            type: response.assets[0].type,
            uri: response.assets[0].uri,
          };
          console.log("photo response ==> ", response.assets[0].uri);
          setFrontImage(obj);
          setShowImage(response.assets[0].uri);
          setIsLoading(false);
        }
      } catch (e) {
        setIsLoading(false);
        console.log("error==> ", e);
      }
    });
  };

  //===== Gallery signup Open images =======
  const LunchGallery = async () => {
    const Options = {
      title: "Choose an Image",
      maxWidth: 1170,
      maxHeight: 2430,
    };
    setModalVisible(false);
    // setIsLoading(true);
    await launchImageLibrary(Options, async (response) => {
      try {
        if (response.didCancel) {
          alert("User cancelled image picker");
          setIsLoading(false);
        } else {
          setPopUpModalVisible(false);
          let obj = {
            name: response.assets[0].fileName,
            type: response.assets[0].type,
            uri: response.assets[0].uri,
          };
          // console.log("image is ", response.assets[0].uri);
          // setUserImage(response.assets[0].uri);
          // setUserImage(response.assets[0]);
          {
            setFrontImage(obj);
          }
          setShowImage(response.assets[0].uri);
          setIsLoading(false);
        }
      } catch (e) {
        setIsLoading(false);
        console.log("error==> ", e);
      }
    });
  };
  const Info = { kilometer: "" };
  const validationSchema = yup.object().shape({
    kilometer: yup.string().required("Please enter kilometers"),
  });
  // ===== Fromik Validation =======

  const SavePackageData = async (values) => {
    console.log("value ==>  ", values);
    if (FrontImage.length < 1) {
      console.log("FrontImage ==>   ", FrontImage.length);

      Toast.show({
        type: "error",
        text1: "Required",
        text2: "Kindly upload driving license front image",
        // topOffset: 100,
      });
    } else {
      //   var myHeaders = new Headers();
      //   myHeaders.append("Content-Type", "application/json");
      //   myHeaders.append("Accept", "application/json");

      var formdata = new FormData();
      formdata.append("reading", values.kilometer);
      formdata.append("reading_image", FrontImage);

      setIsLoading(true);
      const result = await apiClient.post(
        EndPoints.MonthlyPostPakecage,
        formdata,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (result?.ok) {
        setIsLoading(false);
        Toast1.show(result?.data);
        if (result?.data?.success) {
          navigation.goBack();
        }
      } else {
        setIsLoading(false);
        alert(result?.data?.message);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ImageBackground
        source={Images.BackImage}
        style={{
          height: "100%",
          width: "102%",
          position: "absolute",
        }}
      >
        <PopUpModal
          modalVisiblePopUp={popUpModalVisible}
          onPressCancel={() => {
            setPopUpModalVisible(!popUpModalVisible);
          }}
          onPressCamera={LunchCamera}
          onPressGallery={LunchGallery}
        />
        {isLoading && <Loader isloading={isLoading} />}

        <SafeAreaView style={{ flex: 1 }}>
          <AppForm
            initialValues={Info}
            validationSchema={validationSchema}
            onSubmit={SavePackageData}
            enableReinitialize={true}
          >
            {/* {isLoading && <Loader isloading={isLoading} />} */}
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.chooseContainer}>
                  {/* ===== 1st container ===== */}
                  <View
                    style={{
                      flex: 0.4,
                      //   borderWidth: 1,
                      borderColor: "white",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.modelText}>
                      Kindly enter your odoo meter
                    </Text>
                    <Text style={styles.modelText}>
                      reading and image for the monthly
                    </Text>
                    <Text style={styles.modelText}>
                      report generation for web
                    </Text>
                  </View>
                  {/* ===== 2nd container ===== */}
                  <View
                    style={{
                      flex: 0.25,
                      //   borderWidth: 1,
                    }}
                  >
                    <Text style={styles.modelText1}>Kilometer</Text>

                    {/* ==================== SUBJECT Text ==================== */}
                    <View
                      style={{
                        alignItems: "center",
                        //   borderWidth: 1,
                        marginTop: hp(1.5),
                      }}
                    >
                      <View
                        style={{
                          width: wp(90),
                          height: hp(6.5),
                          // borderWidth: 1,
                          justifyContent: "center",
                          // marginTop: hp(1),
                          alignItems: "center",
                          borderRadius: hp(2),
                        }}
                      >
                        <AppFromField
                          //  label="First Name"
                          height={hp(6)}
                          width={wp(90)}
                          placeholderTextColor={colors.white}
                          placeholder="Enter kilometers here..."
                          autoCapitalize="none"
                          autoCorrect={false}
                          name="kilometer"
                          borderWidth={1}
                          borderColor={colors.white}
                          keyboardType={"number-pad"}
                        />
                      </View>
                    </View>
                  </View>
                  {/* =========== 3rd image container */}
                  <View style={styles.ImageMainContainer}>
                    {/* ==== image text ==== */}
                    <View style={{ flex: 0.2 }}>
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          paddingLeft: wp(9),
                        }}
                      >
                        Attach Images
                      </Text>
                    </View>
                    {/* ==== image Image card ==== */}
                    <View
                      style={{
                        flex: 0.4,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: hp(1),
                        // borderWidth: 1,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          alignItems: "center",
                          backgroundColor: colors.white,
                          justifyContent: "center",
                          width: wp(40),
                          height: hp(10),
                          borderRadius: hp(1),
                        }}
                        onPress={() => {
                          setPopUpModalVisible(true);
                          setModalVisible(false);
                          setSelected(true);
                        }}
                      >
                        {FrontImage ? (
                          <Image
                            source={FrontImage}
                            style={styles.profileImage}
                          />
                        ) : (
                          <>
                            <Image
                              style={{
                                marginBottom: hp(1),
                                height: hp(3),
                                width: wp(8),
                              }}
                              source={Images.imagePicker}
                            />
                          </>
                        )}
                      </TouchableOpacity>
                    </View>

                    {/* ==== image button ==== */}
                    <View
                      style={{
                        flex: 0.3,
                        alignItems: "center",
                        // width: wp(30),
                        marginTop: hp(1.5),
                        justifyContent: "center",
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          width: wp(30),
                          // height: hp(3),
                          // borderWidth: 1,
                          marginTop: hp(6),
                        }}
                      >
                        <View>
                          <SubmitButton
                            title="Save"
                            backgroundColor={colors.white}
                            height={hp(4)}
                            width={wp(25)}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </AppForm>
        </SafeAreaView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
export default MonthlyDetail;
