import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import { useFormikContext } from "formik";
// import ValidationErrorMessage from "./ValidationErrorMessage";
import PhoneInput from "react-native-phone-number-input";
import colors from "../../../Assets/Colors/Colors";
import ValidationErrorMessage from "../../Common/FormComponents/ValidationErrorMessage";
import styles from "./styles";
// import styles from "./styles";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";

function AppMobileNoInputField({
  name,
  editable,
  width,
  label,
  labelFontFamily = "Poppins_Medium",
  onRightIconPress,
  borderWidth,
  borderColor,
  borderRadius,
  maskInput,
  valid,
  setIsValid,
  placeholder,
  //   formattedValue,
  //   setFormattedValue,
  formatedMobileNO,
  setFormatedMobileNO,
  // numberOfLines,
  ...otherProps
}) {
  const {
    handleChange,
    setFieldValue,
    setFieldTouched,
    touched,
    errors,
    values,
  } = useFormikContext();
  const phoneInput = useRef(null);
  const [formattedValue, setFormattedValue] = useState("");
  const [value, setValue] = useState("");
  //console.log('asdsda', phoneInput.current?.isValidNumber(value));
  // console.log('lalsdlasd', a, formattedValue);
  useEffect(() => {
    setFormatedMobileNO(
      phoneInput.current?.getNumberAfterPossiblyEliminatingZero(
        value,
        formattedValue
      ).formattedNumber
    );
  }, [value]);
  // console.log(errors[name], touched[name], name);
  return (
    <View style={{}}>
      <PhoneInput
        ref={phoneInput}
        // defaultValue={values[name]}
        disableArrowIcon={true}
        countryPickerProps={false}
        maxLength={8}
        placeholder={placeholder}
        value={values[name]}
        defaultCode="FI"
        layout="first"
        onChangeText={(text) => {
          setFieldValue(name, text);
          setValue(text);
          setIsValid(phoneInput.current?.isValidNumber(text));
        }}
        //  onChangeText={text => setValue(text)}
        onChangeFormattedText={(text) => {
          setFormattedValue(text);
        }}
        {...otherProps}
      />

      <ValidationErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
}

export default AppMobileNoInputField;
