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
import CommonText from "../../../Utills/CommonText";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import Loader from "../../../Components/Common/Loader/Loader";
import apiClient from "../../../Config/Client";
import { useTranslation } from "react-i18next";

function Weekly({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  const getTranslatedText = (text) => {
    return t(text);
  };
  // =====================  API states =============
  const [rideType, setRideType] = useState("");
  const [todayScore, setTodayScore] = useState("");
  const [ridePersonal, setRidePersonal] = useState("");
  const [workTime, setWorkTime] = useState("");
  const [personalTime, setPersonalTime] = useState("");

  const setStartTrip = (t) => {
    let timeString = moment(t).format().toString();
    let startNow = timeString.slice(0, 10).toString();
    console.log("startNow ==> ", startNow);
    setTime(startNow);
    var newDate = moment(timeString.slice(0, 10).toString(), "DD-MM-YYYY").add(
      "days",
      7
    );
    var day = newDate.format("DD");
    var month = newDate.format("MM");
    var year = newDate.format("YYYY");
    console.log("day month year  ==> ", day + "." + month + "." + year);
  };

  // ==============================  ALL weeek API  =======================
  const WeekAPI = async () => {
    let dateString = moment(date).format().toString();
    let startNow = dateString.slice(0, 10).toString();
    console.log("startNow ==> ", startNow);

    var startdate = moment();
    startdate = startdate.subtract(7, "days");
    startdate = startdate.format("DD-MM-YYYY");
    console.log("day month year  ==> ", startdate);

    setIsLoading(true);
    const result = await apiClient.get(
      `/stats/stats?date_to=${startNow}?form_date=${startdate}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
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

  useEffect(() => {
    WeekAPI();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        // borderWidth: 1,
        borderColor: "white",
      }}
    >
      {isLoading && <Loader isloading={isLoading} />}
      {/* ===========  Date Picker ============= */}

      {/* ===========  cards ============= */}
      <View
        style={{
          // height: hp(75),
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
                  {/* {" "}
                  {workTime ? workTime?.slice(0, 2) : "0"}
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
              // opasity:.
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

export default Weekly;
