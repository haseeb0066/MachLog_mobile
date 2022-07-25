import {
  DrawerContentScrollView,
  DrawerItem,
  Drawer,
} from '@react-navigation/drawer';
import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  Platform,
  Text,
} from 'react-native';
import {hp, wp} from '../../utills/CommonMethods/CommonMethods';
// import {Drawer, Text} from 'react-native-paper';
import {useSelector} from 'react-redux';

// ==================== Local imports ===============
import Colors from '../../Assets/colors';
import Fonts from '../../Assets/Fonts/font';
// =================== END =======================

// ================== SVGS Import =================

import Setting from '../../Assets/images/Svg/drawer.svg';
import Heart from '../../Assets/images/Svg/alertIcon.svg';
import Earning from '../../Assets/images/Svg/searchIcon.svg';
import Logout from '../../Assets/images/Svg/forwardArrow.svg';
import Service from '../../Assets/images/Svg/forwardArrow.svg';
import AppLogo from '../../Assets/images/Svg/AppLogo.svg';

// =================== END =======================

const Data = [
  {
    id: 1,
    name: 'My Services',
    icon: <Service />,
  },
  {id: 2, name: 'My Earning', icon: <Earning />},
  {id: 3, name: 'My Favrouit', icon: <Heart />},
  {
    id: 4,
    name: 'Settings',
    icon: <Setting />,
  },
];
const height_screen = Dimensions.get('window').height;

const DrawerRender = (props, route) => {
  //   const token = useSelector(state => state.authReducer.token);

  return (
    <DrawerContentScrollView {...props}>
      {/* <Drawer.Section style={styles.drawerSection}> */}
      <DrawerItem
        icon={() => (
          <AppLogo
            style={{
              width: wp(50),
              height: hp(20),
              alignSelf: 'center',
              marginLeft: wp(3),
            }}
            resizeMode="contain"
          />
        )}
        label={'1'}
      />
      <DrawerItem label={Lable1} />
      {/* </Drawer.Section> */}
      <View style={{height: hp(30)}}>
        <FlatList
          nestedScrollEnabled={true}
          data={Data}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            return <DrawerItem label={() => Lable2(item, index)} />;
          }}
        />
      </View>
      <DrawerItem label={LogOut} />
    </DrawerContentScrollView>
  );
};

const Lable1 = () => {
  return (
    <View style={styles.boxStyle}>
      <AppLogo
        style={{
          width: wp(15),
          height: wp(15),
          borderRadius: wp(15),
          alignSelf: 'center',
        }}
        resizeMode="cover"
      />
      <Text
        style={{
          fontSize: wp(5),
          alignSelf: 'center',
          marginLeft: wp(5),
          color: Colors.gray,
          //   fontFamily: Fonts.regular,
        }}>
        Harp Miller
      </Text>
    </View>
  );
};

const Lable2 = (item, index) => {
  return (
    <>
      <View style={styles.viewStyle}>
        {item.icon}
        <Text
          style={{
            fontSize: wp(4.2),
            alignSelf: 'center',
            marginLeft: wp(5),
            color: Colors.text_Color,
            // fontFamily: Fonts.light,
          }}>
          {item.name}
        </Text>
      </View>
      {index == Data.length - 1 ? (
        <View
          style={{
            borderColor: '#656B78',
            opacity: 0.3,
            width: wp(100),
            borderWidth: 1,
            marginTop: hp(4),
          }}
        />
      ) : null}
    </>
  );
};

const LogOut = () => {
  return (
    <View
      style={{
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        backgroundColor: Colors.gray,
        marginTop:
          Platform.OS === 'ios'
            ? height_screen < 675
              ? hp(8)
              : height_screen == 736
              ? hp(0)
              : hp(16)
            : hp(16),
        width: wp(40),
        height: hp(5),
        marginLeft: wp(5),
        borderRadius: wp(6),
      }}>
      <Logout alignSelf="center" />
      <Text
        style={{
          alignSelf: 'center',
          color: Colors.text_Color,
          //   fontFamily: Fonts.bold,
          fontSize: wp(4),
        }}>
        Logout
      </Text>
    </View>
  );
};

export default DrawerRender;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  drawerSection: {
    marginTop: 2,
    justifyContent: 'center',
  },
  boxStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  viewStyle: {
    flexDirection: 'row',
    marginLeft: wp(5),
  },
});
