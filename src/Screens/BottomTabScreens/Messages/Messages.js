import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  BackHandler,
  FlatList,
  SafeAreaView,
} from "react-native";
import styles from "./styles";
import colors from "../../../Assets/Colors/Colors";
import Images from "../../../Assets/Images";
import EndPoints from "../../../Config/BaseUrl/BaseUrl";
import Loader from "../../../Components/Common/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../Components/Common/Header/Header";
import MessageCard from "../../../Components/Application/MessageCard/MessageCard";
import GetTokenApi from "../../../Config/GetTokenApi/GetTokenApi";
import { useIsFocused } from "@react-navigation/native";
import TokenAPIs from "../../../Config/TokenApis/TokenAPIs";
import fonts from "../../../Assets/Fonts/font";
import { useTranslation } from "react-i18next";

function Messages({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const [selected, setSelected] = useState("");
  const isFocused = useIsFocused();

  const [data, setData] = useState([]);

  // const PostSelectedMsg = () => {};

  const renderCategorylist = (item) => {
    // console.log("items ==>  ", item);
    let startNow = item.created_at.slice(11, 16);
    return (
      <TouchableOpacity
        onPress={() => {
          postSelectedMsg(item.is_viewed, item.id);
          setSelected(item.is_viewed);
          navigation.navigate("ShowMessage", {
            title: item.subject,
            message: item.description,
          });
        }}
      >
        <MessageCard
          title={item.subject}
          textMsg={item.description}
          sendTime={startNow}
          fontStyle={item.is_viewed === 2 ? "300" : "bold"}
          backgroundColor={item.is_viewed === 2 ? null : colors.notSelectedMsg}
        />
      </TouchableOpacity>
    );
  };

  // ================= get API ==================

  const getMessagesAPI = async () => {
    setIsLoading(true);
    const res = await GetTokenApi(EndPoints.getMessagesList, "GET", token);
    if (res.status === 200) {
      setIsLoading(false);
      console.log("respncessss ===>  ", res.data.get_broadcast_messages);
      setData(res.data.get_broadcast_messages);
    } else {
      setIsLoading(false);
      console.log("res else  ==>  ", res.data);
    }
  };

  const { t } = useTranslation();
  const getTranslatedText = (text) => {
    return t(text);
  };
  // =================  Post API ==================

  const postSelectedMsg = async (is_viewed, id) => {
    console.log("is_viewed ==>   ", is_viewed, "id ==>  ", id);
    let body = { message_id: id, view_id: 2 };
    const res = await TokenAPIs(EndPoints.postSelectedMsg, "POST", body, token);
    if (res) {
      setIsLoading(false);
      console.log("if running response===>  ", res.status);
    } else {
      setIsLoading(false);
      console.log("else ===>  ", res.data);
    }
  };

  useEffect(() => {
    getMessagesAPI();
  }, [isFocused]);

  return (
    <ImageBackground
      source={require("../../../Assets/Images/Png/BackImage.png")}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {isLoading && <Loader isloading={isLoading} />}

        <View style={styles.headerContainer}>
          <Header
            title={getTranslatedText("Messsages")}
            leftIconPath={Images.backArrow}
            onLeftIconPress={() => {
              navigation.goBack();
            }}
            tintColor={colors.white}
          />
        </View>
        <View style={styles.MessageContainer}>
          <FlatList
            data={data}
            nestedScrollEnabled={true}
            renderItem={({ item }) => renderCategorylist(item)}
            keyExtractor={(item) => item.id}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default Messages;
