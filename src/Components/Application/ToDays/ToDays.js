import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  useWindowDimensions,
  SafeAreaView,
} from "react-native";
import colors from "../../../Assets/Colors/Colors";
import Images from "../../../Assets/Images";
import LinearGradient from "react-native-linear-gradient";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
import styles from "./styles";
import Loader from "../../Common/Loader/Loader";
import moment from "moment";
import apiClient from "../../../Config/Client";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

function ToDays({ navigation }) {
  // =======================  Today date API  ================
  const [todayDate, setTodayDate] = useState(new Date());
  const [rideType, setRideType] = useState("");
  const [todayScore, setTodayScore] = useState("");
  const [ridePersonal, setRidePersonal] = useState("");
  const [workTime, setWorkTime] = useState("");
  const [personalTime, setPersonalTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

  const todayHistory = async () => {
    // console.log("todayDate ===>  ", todayDate);
    let timeString = moment(todayDate).format();
    timeString = timeString.slice(0, 10);
    console.log("todayDate new  ===>  ", timeString);

    setIsLoading(true);
    const result = await apiClient.get(`/stats/stats?date_to=${timeString}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (result.ok) {
      setIsLoading(false);
      console.log("res=====>   ", result?.data);
      setRideType(result?.data?.total_distance[0]?.total);
      setRidePersonal(result.data?.total_distance[1]?.total);
      setTodayScore(result?.data?.total_point?.total);
      setWorkTime(result?.data?.total_trip_time[0]?.total);
      setPersonalTime(result?.data?.total_trip_time[1]?.total);
    } else {
      setIsLoading(false);
      console.log("else =====>   ", result.data);
      // console.log("id =====>   ", result.data.data.id);
    }
  };

  const { t } = useTranslation();
  const getTranslatedText = (text) => {
    return t(text);
  };

  useEffect(() => {
    todayHistory();
  }, [isFocused]);

  return (
    <View style={{ flex: 1, borderColor: "white" }}>
      {isLoading && <Loader isloading={isLoading} />}
      <View
        style={{
          height: hp(75),
          // borderWidth: 1,
          borderColor: "white",
          zIndex: 1,
          // justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* ========== first Card ============== */}
        <View
          style={{
            height: hp(25),
            // borderWidth: 1,
            borderColor: "white",
            justifyContent: "center",
          }}
        >
          <LinearGradient
            colors={["#A9C6E880", "#17E53A"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 1.5, y: 1 }}
            style={{
              height: hp(20),
              width: wp(90),
              // borderWidth: 1,
              // borderColor: "white",
              borderRadius: hp(2),
            }}
          >
            {/* ============= KIOMETERS ================ */}
            <View
              style={{
                flex: 0.3,
                // borderWidth: 1,
                borderColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: hp(2),
                  fontWeight: "700",
                  color: colors.white,
                }}
              >
                {getTranslatedText("Kilometers")}
              </Text>
            </View>
            {/* ============= Male record ================ */}
            <View
              style={{
                flex: 0.3,
                // borderWidth: 1,
                borderColor: "white",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flex: 0.15,
                  // borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ height: hp(3), width: wp(6) }}
                  // resizeMethod="center"
                  source={Images.DriverFemale}
                />
              </View>
              <View
                style={{
                  flex: 0.55,
                  // borderWidth: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: hp(1.5),
                    fontWeight: "500",
                    color: colors.white,
                    // paddingLeft: hp(2),
                  }}
                >
                  {getTranslatedText("Work")}
                </Text>
              </View>
              <View
                style={{
                  flex: 0.3,
                  // borderWidth: 1,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: hp(1.5),
                    fontWeight: "700",
                    color: colors.white,
                    paddingLeft: hp(2),
                  }}
                >
                  {ridePersonal ? ridePersonal : "0"}
                  {" km"}
                </Text>
              </View>
            </View>
            {/* ============= Female record ================ */}
            <View
              style={{
                flex: 0.3,
                // borderWidth: 1,
                borderColor: "white",
                alignItems: "center",
                // justifyContent: "flex-start",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flex: 0.15,
                  // borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ height: hp(3), width: wp(6) }}
                  source={Images.DriverMale}
                />
              </View>
              <View
                style={{
                  flex: 0.55,
                  // borderWidth: 1
                }}
              >
                <Text
                  style={{
                    fontSize: hp(1.5),
                    fontWeight: "500",
                    color: colors.white,
                    // paddingLeft: hp(2),
                  }}
                >
                  {getTranslatedText("Personal")}
                </Text>
              </View>
              <View
                style={{
                  flex: 0.3,
                  // borderWidth: 1,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: hp(1.5),
                    fontWeight: "700",
                    color: colors.white,
                    paddingLeft: hp(2),
                  }}
                >
                  {rideType ? rideType : "0"}
                  {" km"}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>
        {/* ======================= 2nd Card =========================== */}
        <View
          style={{
            height: hp(22),
            // borderWidth: 1,
            borderColor: "white",
            // justifyContent: "center",
          }}
        >
          <LinearGradient
            colors={["#A9C6E880", "#C98537"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 1.5, y: 1 }}
            style={{
              height: hp(20),
              width: wp(90),
              // borderWidth: 1,
              // borderColor: "white",
              borderRadius: hp(2),
              // opasity:.
            }}
          >
            {/* ============= Time Duration ================ */}
            <View
              style={{
                flex: 0.3,
                // borderWidth: 1,
                borderColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: hp(2),
                  fontWeight: "700",
                  color: colors.white,
                }}
              >
                {getTranslatedText("TimeDuration")}
              </Text>
            </View>
            {/* ============= Male record ================ */}
            <View
              style={{
                flex: 0.3,
                // borderWidth: 1,
                borderColor: "white",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flex: 0.15,
                  // borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ height: hp(3), width: wp(6) }}
                  // resizeMethod="center"
                  source={Images.DriverFemale}
                />
              </View>
              <View
                style={{
                  flex: 0.55,
                  // borderWidth: 1,
                }}
              >
                <Text style={styles.textStyle}>
                  {getTranslatedText("Work")}
                </Text>
              </View>
              <View
                style={{
                  flex: 0.3,
                  // borderWidth: 1,
                  alignItems: "center",
                }}
              >
                <Text style={styles.textStyle}>
                  {/* {personalTime ? personalTime.slice(0, 2) : "0"}
                  {"h "}
                  {personalTime ? personalTime.slice(2, 4) : "0"}
                  {"m "}
                  {personalTime ? personalTime.slice(4, 6) : "0"}
                  {"s "} */}

                  {personalTime ? personalTime : "00:00:00"}
                </Text>
              </View>
            </View>
            {/* ============= Female record ================ */}
            <View
              style={{
                flex: 0.3,
                // borderWidth: 1,
                borderColor: "white",
                alignItems: "center",
                // justifyContent: "flex-start",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flex: 0.15,
                  // borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ height: hp(3), width: wp(6) }}
                  source={Images.DriverMale}
                />
              </View>
              <View
                style={{
                  flex: 0.55,
                  // borderWidth: 1
                }}
              >
                <Text style={styles.textStyle}>
                  {getTranslatedText("Personal")}
                </Text>
              </View>
              <View
                style={{
                  flex: 0.3,
                  // borderWidth: 1,
                  alignItems: "center",
                }}
              >
                <Text style={styles.textStyle}>
                  {/* {workTime ? workTime?.slice(0, 2) : "0"}
                  {"h "}
                  {workTime ? workTime?.slice(2, 4) : "0"}
                  {"m "}
                  {workTime ? workTime?.slice(4, 6) : "0"}
                  {"s "} */}
                  {workTime ? workTime : "00:00:00"}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>
        {/* ================ score ================ */}
        <View
          style={{
            height: hp(10),
            // borderWidth: 1,
            borderColor: "white",
            // justifyContent: "center",
            // marginBottom: hp(15),
          }}
        >
          <View
            style={{
              height: hp(8),
              width: wp(90),
              // borderWidth: 1,
              // borderColor: "white",
              borderRadius: hp(2),
              backgroundColor: "#A9C6E870",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 0.15,
                // borderWidth: 1,
                borderColor: "white",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{ height: hp(3), width: wp(6) }}
                // resizeMethod="center"
                source={Images.speedoMeter}
              />
            </View>
            <View
              style={{
                flex: 0.5,
                // borderWidth: 1,
                borderColor: "white",
                justifyContent: "center",
              }}
            >
              <Text style={styles.textStyle}>{getTranslatedText("Score")}</Text>
            </View>
            <View
              style={{
                flex: 0.35,
                // borderWidth: 1,
                borderColor: "white",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.textStyle}>
                {todayScore ? todayScore : "0"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default ToDays;
