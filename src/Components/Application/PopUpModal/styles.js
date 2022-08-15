import { Platform, StyleSheet } from "react-native";
import colors from "../../../Assets/Colors/Colors";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  section2: {
    marginHorizontal: wp(5),
    backgroundColor: "white",
    borderRadius: 20,
    height: hp(26),
    // borderWidth: 10,
  },
  icon: {
    width: wp(10),
    height: hp(10),
  },
  mesText: {
    textAlign: "center",
    fontSize: hp(2),
    marginVertical: hp(3),
    fontWeight: "600",
    color: colors.ButtonText,
  },
});

export default styles;
