import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, FlatList } from "react-native";
import styles from "./styles";
import Header from "../../../Components/Common/Header/Header";
import colors from "../../../Assets/Colors/Colors";
import { useIsFocused } from "@react-navigation/core";
import apiClient from "../../../Config/Client";
import moment from "moment";
import Images from "../../../Assets/Images";
import Subscriptioncard from "../../../Components/Application/Subscriptioncard";

const PackageHistory = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [packageDetails, setPackageDetails] = useState();
  console.log("===packageDetails===packageDetails=>>>", packageDetails);

  const getPackageDetail = async () => {
    const result = await apiClient.get(
      "https://machlog.viltco.com/api/subscription/list"
    );
    if (result.ok) {
      console.table("====Result==packageDetails=View===>>>>", result.data);
      setPackageDetails(result.data);
    } else console.log("error");
  };
  useEffect(() => {
    getPackageDetail();
  }, [isFocused]);
  return (
    <ImageBackground
      resizeMode={"cover"}
      source={Images.BackImage}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <Header
          // title={CommonText.CompanyInfo}
          title={"HISTORY"}
          tintColor={colors.white}
          leftIconPath={Images.backArrow}
          onLeftIconPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <View style={styles.headingwrap}>
        <Text style={styles.headingstyle}>Subscription</Text>
      </View>
      <View style={styles.packagewrap}>
        <FlatList
          data={packageDetails}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          // horizontal={true}
          renderItem={({ item }) => {
            return (
              <Subscriptioncard
                packageheading={item.name}
                time={moment(item.created_at).format("HH:mm")}
                baserate={item.baserate}
                baserateprice={item.price}
                perdayrate={item.perdayrate}
                perdayrateprice={item.per_day_rate}
                date={moment(item.created_at).format("DD/MM/YYYY")}
              />
            );
          }}
        />
      </View>
    </ImageBackground>
  );
};
export default PackageHistory;
