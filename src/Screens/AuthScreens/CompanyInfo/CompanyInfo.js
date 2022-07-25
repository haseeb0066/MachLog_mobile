import React from "react";
import { View, ImageBackground } from "react-native";
import styles from "./styles";
import colors from "../../../Assets/Colors/Colors";
import CommonText from "../../../Utills/CommonText";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
import Button from "../../../Components/Common/Button/Button";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";
import Images from "../../../Assets/Images";
import Header from "../../../Components/Common/Header/Header";

import * as yup from "yup";
import AppFromField from "../../../Components/Common/FormComponents/AppFromField";
import AppForm from "../../../Components/Common/FormComponents/AppFrom";

const CompanyInfo = ({ navigation }) => {
  // const [isLoading, setIsLoading] = useState(false);

  const userInfo = {
    companyID: "",
    companyName: "",
    companyAddress: "",
    dateOfBirth: "",
  };
  const validationSchema = yup.object({
    companyID: yup.string().required("Company ID is required"),
    companyName: yup.string().required("Company Name is required"),
    companyAddress: yup.string().required("Company Address is required"),
    dateOfBirth: yup.string().required("Date Of Birth is required"),
  });

  const checkValidationApi = async () => {};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : 0}
      style={{ flex: 1 }}
    >
      <ImageBackground
        resizeMode={"cover"}
        source={Images.BackImage}
        style={styles.container}
      >
        {/* //============>>> Herder container<<<===============// */}
        <View style={styles.headerContainer}>
          <Header
            title={CommonText.CompanyInfo}
            leftIconPath={Images.backArrow}
            onLeftIconPress={() => {
              navigation.goBack();
            }}
            tintColor={colors.white}
          />
        </View>
        {/* //============>>> Input container<<<===============// */}
        <View style={styles.inputContainer}>
          <AppForm initialValues={userInfo} validationSchema={validationSchema}>
            <AppFromField
              //  label="First Name"
              width={wp(90)}
              placeholderTextColor={colors.placeHolderColor}
              placeholder="Company ID"
              autoCapitalize="none"
              autoCorrect={false}
              name="companyID"
              borderWidth={1}
              borderColor={colors.white}
            />
            <AppFromField
              //  label="First Name"
              width={wp(90)}
              placeholderTextColor={colors.placeHolderColor}
              placeholder="Company Name"
              autoCapitalize="none"
              autoCorrect={false}
              name="companyName"
              borderWidth={1}
              borderColor={colors.white}
            />
            <AppFromField
              //  label="First Name"
              width={wp(90)}
              placeholderTextColor={colors.placeHolderColor}
              placeholder="Company Address"
              autoCapitalize="none"
              autoCorrect={false}
              name="companyAddress"
              borderWidth={1}
              borderColor={colors.white}
            />
            <AppFromField
              //  label="First Name"
              width={wp(90)}
              placeholderTextColor={colors.placeHolderColor}
              placeholder="Date Of Birth"
              autoCapitalize="none"
              autoCorrect={false}
              name="dateOfBirth"
              borderWidth={1}
              borderColor={colors.white}
            />
          </AppForm>

          {/* //============>>> Button container<<<===============// */}

          <Button
            title={"Next"}
            bgColor={colors.white}
            color={colors.primaryColor}
            borderRadius={hp(2)}
            onPress={() => {
              navigation.navigate("VehicleInfo");
            }}
          />
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};
export default CompanyInfo;
