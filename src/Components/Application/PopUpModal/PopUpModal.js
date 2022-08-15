import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
import styles from "./styles";
import { Cameraicon, Galleryicon } from "../../../Assets/Images/SvgImages";
import SvgComponent from "../../Common/SvgCustomComponents/SvgCustomComponents";
import colors from "../../../Assets/Colors/Colors";

const PopUpModal = ({
  modalVisiblePopUp,
  onPressCamera,
  onPressGallery,
  onPressCancel,
}) => {
  const [modalVisible, setModalVisible] = useState([]);
  setModalVisible;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisiblePopUp}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <TouchableWithoutFeedback onPress={onPressCancel}>
        <View style={styles.modalContainer}>
          <View style={styles.section2}>
            <Text style={styles.mesText}>{"Upload Image"}</Text>
            {/* <View style={{ flexDirection: "row" }}>
              <View
                style={{ width: wp(80), borderWidth: 1, borderColor: "white" }}
              >
                <Text style={styles.mesText}>{"Upload Image"}</Text>
              </View>
              <View
                style={{
                  width: wp(10),
                  borderWidth: 1,
                  borderColor: "white",
                  bottom: hp(2),
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    width: wp(6),
                    borderWidth: 1,
                    // borderColor: "white",
                    // bottom: hp(2),
                    borderRadius: hp(5),
                    height: hp(2.7),
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: colors.ButtonText,
                  }}
                  onPress={() => {
                    modalVisiblePopUp = false;
                  }}
                >
                  <Text style={{ color: "white" }}>{"X"}</Text>
                </TouchableOpacity>
              </View>
            </View> */}

            <View
              style={{
                height: hp(15),
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-end",
                  flex: 0.4,
                }}
              >
                <TouchableOpacity onPress={onPressCamera}>
                  <SvgComponent svgMarkup={Cameraicon} />
                </TouchableOpacity>
                <Text
                  style={{
                    alignItems: "flex-start",
                    right: wp(6),
                    marginTop: hp(1),
                    color: colors.ButtonText,
                  }}
                >
                  Camera
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flex: 0.4,
                }}
              >
                <TouchableOpacity onPress={onPressGallery}>
                  <SvgComponent svgMarkup={Galleryicon} />
                </TouchableOpacity>
                <Text
                  style={{
                    alignItems: "flex-start",
                    left: wp(7),
                    marginTop: hp(1),
                    color: colors.ButtonText,
                  }}
                >
                  Gallery
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PopUpModal;
