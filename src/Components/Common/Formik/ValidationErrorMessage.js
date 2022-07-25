import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {hp} from '../../../utils/CommonMethods';

function ValidationErrorMessage({alignSelf = 'flex-start', error, visible}) {
  let errorStyle = {
    color: 'red',
    marginLeft: 10,
    textAlign: 'left',
    alignSelf: alignSelf,
    fontSize: hp(1.3),
    paddingBottom: 10,
    // fontFamily: fontFamily.DMSans_Regular,
  };
  if (!visible || !error) return null;
  return <Text style={errorStyle}>{error}</Text>;
}

const styles = StyleSheet.create({});

export default ValidationErrorMessage;
