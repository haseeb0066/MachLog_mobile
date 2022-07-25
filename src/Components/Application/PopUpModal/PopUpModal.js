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

const PopUpModal = ({ modalVisiblePopUp, onPressCamera, onPressGallery }) => {
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
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.section2}>
            <Text style={styles.mesText}>{"Upload Image"}</Text>

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
