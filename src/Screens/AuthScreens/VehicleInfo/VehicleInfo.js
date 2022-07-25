import React, { useState } from "react";
import {
  View,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import Images from "../../../Assets/Images";
import styles from "./styles";
import colors from "../../../Assets/Colors/Colors";
import CommonText from "../../../Utills/CommonText";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
import Button from "../../../Components/Common/Button/Button";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import PopUpModal from "../../../Components/Application/PopUpModal/PopUpModal";
import Header from "../../../Components/Common/Header/Header";
import AppInput from "../../../Components/Common/AppInput/AppInput";
import * as yup from "yup";
import AppFromField from "../../../Components/Common/FormComponents/AppFromField";
import AppForm from "../../../Components/Common/FormComponents/AppFrom";

const VehicleInfo = ({ navigation }) => {
  const [popUpModalVisible, setPopUpModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [FrontImage, setFrontImage] = useState("");
  const [backImage, setBackImage] = useState("");
  const [selected, setSelected] = useState("");
  const [showImage, setShowImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //  ===== Camers open function=======
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
          {
            selected ? setFrontImage(obj) : setBackImage(obj);
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

  //===== Gallery Open images =======
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
            selected ? setFrontImage(obj) : setBackImage(obj);
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

  // ===== Fromik Validation =======
  const userInfo = {
    vehicleName: "",
    vehicleManufacturer: "",
    vehicleRegistration: "",
    taxiDriverLicense: "",
    taxiPermitNumber: "",
  };
  const validationSchema = yup.object({
    vehicleName: yup.string().required("Vehicle Name is required"),
    vehicleManufacturer: yup
      .string()
      .required("Vehicle Manufacturer is required"),
    vehicleRegistration: yup
      .string()
      .required("Vehicle Registration Number is required"),
    taxiDriverLicense: yup.string().required("Taxi Driver License is required"),
    taxiPermitNumber: yup.string().required("Taxi Permit Number is required"),
  });

  //===== Toast Massage funcation =======//
  const errroemassage = () => {
    if (FrontImage.length < 1) {
      Toast.show({
        type: "error",
        text1: "Required",
        text2: "Kindly upload driving license front image",
        // topOffset: 100,
      });
    } else if (backImage.length < 1) {
      Toast.show({
        type: "error",
        text1: "Required",
        text2: "Kindly upload driving license back image",
        // topOffset: 100,
      });
    }
  };

  //========== API ==========
  const checkValidationApi = async () => {};

  return (
    <ImageBackground
      resizeMode={"cover"}
      source={Images.BackImage}
      style={styles.container}
    >
      {/* ============ PopUp Modal container ===============// */}

      <PopUpModal
        modalVisiblePopUp={popUpModalVisible}
        onPress={() => {
          setPopUpModalVisible(false);
        }}
        onPressCamera={LunchCamera}
        onPressGallery={LunchGallery}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        {/* //============ Herder container =============== */}
        <View style={styles.herdercomtainer}>
          <Header
            title={CommonText.VehicleInfo}
            leftIconPath={Images.backArrow}
            onLeftIconPress={() => {
              navigation.goBack();
            }}
            tintColor={colors.white}
            textColor={colors.white}
          />
        </View>
        {/* //============ Input container ==============// */}
        <ScrollView>
          <View style={styles.inputContainer}>
            <AppForm
              initialValues={userInfo}
              validationSchema={validationSchema}
              onSubmit={errroemassage}
            >
              <AppFromField
                //  label="First Name"
                width={wp(90)}
                placeholderTextColor={colors.placeHolderColor}
                placeholder="Vehicle Name"
                autoCapitalize="none"
                autoCorrect={false}
                name="vehicleName"
                borderWidth={1}
                borderColor={colors.white}
              />
              <AppFromField
                //  label="First Name"
                width={wp(90)}
                placeholderTextColor={colors.placeHolderColor}
                placeholder="Vehicle Manufacturer"
                autoCapitalize="none"
                autoCorrect={false}
                name="vehicleManufacturer"
                borderWidth={1}
                borderColor={colors.white}
              />
              <AppFromField
                //  label="First Name"
                width={wp(90)}
                placeholderTextColor={colors.placeHolderColor}
                placeholder="Vehicle Registration Number"
                autoCapitalize="none"
                autoCorrect={false}
                name="vehicleRegistration"
                borderWidth={1}
                borderColor={colors.white}
              />
              <AppFromField
                //  label="First Name"
                width={wp(90)}
                placeholderTextColor={colors.placeHolderColor}
                placeholder="Taxi Driver License"
                autoCapitalize="none"
                autoCorrect={false}
                name="taxiDriverLicense"
                borderWidth={1}
                borderColor={colors.white}
              />
              <AppFromField
                //  label="First Name"
                width={wp(90)}
                placeholderTextColor={colors.placeHolderColor}
                placeholder="Taxi Permit Number"
                autoCapitalize="none"
                autoCorrect={false}
                name="taxiPermitNumber"
                borderWidth={1}
                borderColor={colors.white}
              />
            </AppForm>

            <TouchableWithoutFeedback
              onPress={() => {
                // setPopUpModalVisible(false);
                alert("pressed");
              }}
            >
              {/* //==== Upload Driving License Front Image  */}
              <View style={styles.uploadIconContainer}>
                <TouchableOpacity
                  style={styles.uploadSection}
                  onPress={() => {
                    setPopUpModalVisible(true);
                    setModalVisible(false);
                    setSelected(true);
                  }}
                >
                  {FrontImage ? (
                    <Image source={FrontImage} style={styles.profileImage} />
                  ) : (
                    <>
                      <Image
                        style={{ marginBottom: hp(1) }}
                        source={Images.gg}
                      />
                      <Text style={styles.uploadTextDoc}>
                        {"Upload Driving "}
                      </Text>
                      <Text style={styles.uploadTextDoc}>
                        {"License Front Image"}
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
                {/* // ======= Camera  */}
                <TouchableOpacity
                  style={styles.uploadSection}
                  onPress={() => {
                    setPopUpModalVisible(true);
                    setModalVisible(false);
                    setSelected(false);
                  }}
                >
                  {backImage ? (
                    <Image source={backImage} style={styles.profileImage} />
                  ) : (
                    <>
                      <Image
                        style={{ marginBottom: hp(1) }}
                        source={Images.gg}
                      />
                      <Text style={styles.uploadTextDoc}>
                        {"Upload Driving "}
                      </Text>
                      <Text style={styles.uploadTextDoc}>
                        {"License Back Image"}
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>

            <View style={styles.buttonContainer}>
              <Button
                title={"Next"}
                bgColor={colors.white}
                color={colors.primaryColor}
                titleColor={colors.white}
                borderRadius={hp(2)}
                onPress={() => {
                  navigation.navigate("DayRate");
                }}
                // onPress={() => setModalVisible(true)}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
export default VehicleInfo;
