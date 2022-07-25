import React from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import colors from "../../../Assets/Colors/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

class AppInput extends React.Component {
  render() {
    let style = this.props.style;
    let shadow = this.props.shadow;

    let height = this.props.height || 53;
    let width = this.props.width || "100%";

    let marginTop = this.props.marginTop || hp(1);
    let marginBottom = this.props.marginBottom;
    let marginLeft = this.props.marginLeft;
    let marginRight = this.props.marginRight;

    let paddingLeft = this.props.paddingLeft || "5%";
    let paddingRight = this.props.paddingRight;
    let paddingTop = this.props.paddingTop;
    let paddingBottom = this.props.paddingBottom;

    let borderColor = this.props.borderColor || colors.DEEP_PURPLE;
    let borderWidth = this.props.borderWidth || null;
    let borderRadius = this.props.borderRadius || wp(10);
    let borderTopLeftRadius = this.props.borderTopLeftRadius;
    let borderTopRightRadius = this.props.borderTopRightRadius;

    let backgroundColor = this.props.backgroundColor || colors.WHITE;

    let rightIconSize = this.props.rightIconSize || 22;
    let leftImageHeight = this.props.leftImageHeight || 22;
    let leftImageWidth = this.props.leftImageWidth || 25;

    return (
      <View
        style={[
          styles.inputFieldTextView,
          shadow,
          style,
          {
            height: height,
            width: width,
            marginTop: marginTop,
            paddingBottom: paddingBottom,
            marginBottom: marginBottom,
            paddingRight: paddingRight,
            paddingTop: paddingTop,
            backgroundColor: backgroundColor,
            paddingLeft: paddingLeft,
            borderWidth: borderWidth,
            borderColor: borderColor,
            borderRadius: borderRadius,
            borderTopLeftRadius: borderTopLeftRadius,
            borderTopRightRadius: borderTopRightRadius,
          },
        ]}
      >
        {this.props.leftIconPath !== undefined && (
          <View style={styles.leftImageViewStyle}>
            <Image
              style={
                this.props.imageStyle !== undefined
                  ? this.props.imageStyle
                  : {
                      height: leftImageHeight,
                      width: leftImageWidth,
                      resizeMode: "contain",
                      marginLeft: "3%",
                      tintColor: this.props.tintColor,
                    }
              }
              source={this.props.leftIconPath}
            />
          </View>
        )}
        <TextInput
          value={this.props.value}
          secureTextEntry={this.props.secureEntry}
          style={[
            styles.inputFieldText,
            this.props.textInputStyle,
            {
              width: this.props.widthTextInput || "88%",
              color: this.props.colortextInput || colors.DEEP_PURPLE,
              paddingLeft: this.props.paddingLeftText || "0%",
            },
          ]}
          onChangeText={this.props.onChangeText}
          autoCapitalize="none"
          justifyContent={this.props.justifyContent}
          placeholder={this.props.placeholder}
          placeholderTextColor={this.props.placeholderTextColor}
          onSubmitEditing={this.props.onSubmitEditing}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          ref={this.props.ref}
          multiline={this.props.multiline}
          maxHeight={this.props.maxHeight}
          autoGrow={this.props.autoGrow}
          maxLength={this.props.maxLength}
          onContentSizeChange={this.props.onContentSizeChange}
          onEndEditing={this.props.onEndEditing}
          keyboardType={this.props.keyboardType}
          secureTextEntry={this.props?.secureTextEntry}
        />
        {this.props.rightIconPath !== undefined && (
          <TouchableWithoutFeedback onPress={this.props.onRightIconPress}>
            <Image
              source={this.props.rightIconPath}
              style={{
                height: rightIconSize,
                width: rightIconSize,
                resizeMode: "contain",
                tintColor: this.props.tintColor,
              }}
            />
          </TouchableWithoutFeedback>
        )}

        <TouchableOpacity onPress={this.props?.togglePassword}>
          {this.props?.passwordSvg}
        </TouchableOpacity>

        {this.props.rightTextButton !== undefined && (
          <TouchableOpacity
            style={styles.textButton}
            onPress={this.props.onButtonText}
          >
            <Text style={styles.textAvailability}>{this.props.buttonText}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputFieldTextView: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    // height:wp(7),
    alignSelf: "center",
  },
  inputFieldText: {
    paddingLeft: "3%",
    height: "100%",
    width: "88%",
    fontSize: hp(1.5),
    // textAlignVertical:'center',
    // marginVertical:'5%',
    // borderLeftColor:colors.deep_grey,
    // borderLeftWidth:wp(0.1),
    color: colors.BLACK,
  },
  leftImageViewStyle: {
    height: "100%",
    // backgroundColor:'red',
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(2),
    // borderRightColor:colors.grey,
    // borderRightWidth:wp(0.1),
  },
  textButton: {
    height: hp(4),
    width: wp(40),
    backgroundColor: colors.WHITE,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp(2),
    borderWidth: wp(0.1),
    borderColor: colors.placeholder_text_color,
  },
  textAvailability: {
    color: colors.blue_color,
    fontSize: wp(3),
    fontWeight: "600",
  },
});
export default AppInput;
