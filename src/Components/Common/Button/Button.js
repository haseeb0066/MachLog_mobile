import React from "react";
import {
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../Assets/Colors/Colors";
// import fonts from '../../../Assets/Fonts/font';

const defaultButtonTitle = "";

class Button extends React.Component {
  onPressDefault = () => {
    // console.log('Button is pressed');
  };

  renderIcon() {
    const { icon, iconStyle, titleColor, borderColor } = this.props;
    let styleIcon = iconStyle !== undefined ? iconStyle : styles.icon;
    return (
      <Image
        source={icon}
        style={[
          styleIcon,
          {
            tintColor: this.props.iconTintColor,
            marginRight: this.props.marginRightIcon,
          },
        ]}
        resizeMode={"contain"}
      />
    );
  }

  renderTitleText() {
    let { titleStyle, title, icon, iconPlace, titleColor } = this.props;

    let btnTitleStyle =
      titleStyle !== undefined ? titleStyle : styles.textStyle;
    let btnTitle = title !== undefined ? title : defaultButtonTitle;
    let isIcon = icon !== undefined;

    let width = "100%";
    if (isIcon && (iconPlace === "left" || iconPlace === "right")) {
      width = "80%";
    }

    return (
      <View
        style={[
          styles.textContainer,
          {
            borderWidth: 0,
            borderColor: "#97A9F680",
            width: width,
            borderLeftWidth: this.props.borderLeftWidth,
          },
        ]}
      >
        {isIcon && iconPlace === "leftCenter" ? this.renderIcon() : null}
        <Text style={btnTitleStyle}>{btnTitle}</Text>
        {isIcon && iconPlace === "rightCenter" ? this.renderIcon() : null}
      </View>
    );
  }

  render() {
    const {
      style,
      BackgroundImage,
      title,
      icon,
      iconPlace = "left",
      onPress,
      borderRadius,
      titleColor,
    } = this.props;

    // Setting Button Style
    let touchableStyle = style !== undefined ? style : styles.container;
    let isIcon = icon !== undefined;
    let bgColor = this.props.bgColor || colors.DEEP_PURPLE;
    let height = this.props.height || (Platform.OS === "ios" ? hp(6) : hp(7));
    let width = this.props.width || "90%";
    let marginTop = this.props.marginTop || hp(2);
    // let titleColor = this.props.titleColor || "black";

    return (
      <TouchableOpacity
        onPress={onPress !== undefined ? onPress : this.onPressDefault}
        style={[
          touchableStyle,
          {
            backgroundColor: bgColor,
            height: height,
            width: width,
            borderRadius: borderRadius || wp(10),
            marginTop: marginTop,
          },
        ]}
      >
        <ImageBackground
          source={BackgroundImage}
          resizeMode={"stretch"}
          style={styles.imgBackground}
        >
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            {isIcon && iconPlace === "left" ? this.renderIcon() : null}

            {(title === undefined || title.length > 0) &&
              this.renderTitleText()}

            {isIcon && iconPlace === "right" ? this.renderIcon() : null}
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

export default Button;

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === "ios" ? hp(5) : hp(8),
    width: "90%",
    paddingLeft: 5,
    paddingRight: 5,
    // borderWidth: hp(0.2),
    borderRadius: wp(10),
    // top:0,
    // bottom:5,
    borderColor: "rgba(255, 255, 255, 0.3)",
    // borderColor: '97A9F680',
    // marginBottom: 7,
  },
  imgBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },

  icon: {
    width: 17,
    height: 17,
    borderWidth: 0,
    marginLeft: wp(3),
    tintColor: colors.white,
    resizeMode: "contain",
    // borderColor:'red',
  },

  textContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // paddingLeft:'7%'
  },

  textStyle: {
    color: colors.ButtonText,
    fontSize: hp(1.7),
    fontWeight: "700",
    // fontFamily: fonts.nunitoMedium,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
