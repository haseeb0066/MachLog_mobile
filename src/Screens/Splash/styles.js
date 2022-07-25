import { StyleSheet, Platform } from "react-native";
import { hp, wp } from "../../Utills/CommonMethods/CommonMethods";
import colors from "../../Assets/Colors/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundVideo: {
    position: "absolute",
    alignItems: "stretch",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.8,
  },
  skipContainer: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "rgba(0,0,0,.3)",
  },
  logoContainer: {
    flex: 0.85,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.3)",
  },
  skipText: {
    color: colors.white,
    // borderWidth: 1,
    width: wp(20),
    textAlign: "center",
    fontWeight: "700",
    ...Platform.select({
      ios: {
        fontSize: hp(2),
      },
      android: {
        fontSize: hp(2),
        marginBottom: hp(8),
      },
    }),
  },
});

export default styles;
