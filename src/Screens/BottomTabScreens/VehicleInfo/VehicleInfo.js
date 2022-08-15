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
  TextInput,
} from "react-native";
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
import Images from "../../../Assets/Images";
import EndPoints from "../../../Config/BaseUrl/BaseUrl";
import GetTokenApi from "../../../Config/GetTokenApi/GetTokenApi";
import { useSelector } from "react-redux";

const VehicleInfo = ({ navigation }) => {
  const [popUpModalVisible, setPopUpModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [FrontImage, setFrontImage] = useState("");
  const [backImage, setBackImage] = useState("");
  const [selected, setSelected] = useState("");
  const [showImage, setShowImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.authReducer.token);

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
  };
  const validationSchema = yup.object({
    vehicleName: yup.string().required("Vehicle Name is required"),
    vehicleManufacturer: yup
      .string()
      .required("Vehicle Manufacturer is required"),
    vehicleRegistration: yup
      .string()
      .required("Vehicle Registration Number is required"),
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

 

  

  return (
    <ImageBackground
      resizeMode={"cover"}
      source={Images.BackImage}
      style={styles.container}
    >
      {/* ============ PopUp Modal container ===============// */}

      <PopUpModal
        modalVisiblePopUp={popUpModalVisible}
        onPressCancel={() => {
          setPopUpModalVisible(!popUpModalVisible);
        }}
        onPressCamera={LunchCamera}
        onPressGallery={LunchGallery}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1, borderWidth: 1 }}
      >
        {/* //============ Herder container =============== */}
        <View style={styles.herdercomtainer}>
          <Header
            title={"Vehicle Info"}
            leftIconPath={Images.backArrow}
            onLeftIconPress={() => {
              navigation.goBack();
            }}
            tintColor={colors.white}
            textColor={colors.white}
          />
        </View>
        {/* //============ Input container ==============// */}
        {/* <ScrollView> */}
        <View style={styles.inputContainer}>
          <AppForm
            initialValues={userInfo}
            validationSchema={validationSchema}
            onSubmit={UpdateProfileApi}
          >
            <View style={styles.container1}>
              <View style={styles.labelContainer}>
                <Text style={{ color: colors.white }}>{"Vehicle Name"}</Text>
              </View>
              {/* <TextInput style={styles.textInput} 
                /> */}
              <AppFromField
                //  label="First Name"
                width={wp(90)}
                placeholderTextColor={"#A9C6E8"}
                placeholder="Enter Vehicle Name"
                autoCapitalize="none"
                autoCorrect={false}
                name="vehicleName"
                borderWidth={1}
                borderColor={colors.white}
              />
            </View>

            <View style={styles.container1}>
              <View style={styles.labelContainer}>
                <Text style={{ color: colors.white }}>{"Vehicle Name"}</Text>
              </View>

              <AppFromField
                //  label="First Name"
                width={wp(90)}
                placeholderTextColor={"#A9C6E8"}
                placeholder="Enter Vehicle Manufacturer"
                autoCapitalize="none"
                autoCorrect={false}
                name="vehicleManufacturer"
                borderWidth={1}
                borderColor={colors.white}
              />
            </View>

            <View style={styles.container1}>
              <View style={styles.labelContainer}>
                <Text style={{ color: colors.white }}>{"Vehicle Name"}</Text>
              </View>
              {/* <TextInput style={styles.textInput} 
                /> */}
              <AppFromField
                //  label="First Name"
                width={wp(90)}
                placeholderTextColor={"#A9C6E8"}
                placeholder="Enter Vehicle Registration Number"
                autoCapitalize="none"
                autoCorrect={false}
                name="vehicleRegistration"
                borderWidth={1}
                borderColor={colors.white}
              />
            </View>
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
                      style={{
                        marginBottom: hp(1),
                        height: hp(3),
                        width: wp(8),
                      }}
                      source={Images.imagePicker}
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
                      style={{
                        marginBottom: hp(1),
                        height: hp(3),
                        width: wp(8),
                      }}
                      source={Images.imagePicker}
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
              title={"Save"}
              bgColor={colors.bottomBgColor}
              titleColor={colors.white}
              borderRadius={hp(2)}
            />
          </View>
        </View>
        {/* </ScrollView> */}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
export default VehicleInfo;
