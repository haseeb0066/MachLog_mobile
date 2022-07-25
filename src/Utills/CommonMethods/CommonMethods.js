import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {PermissionsAndroid, Platform} from 'react-native';

// TODO WP / HP
export function wp(value) {
  return widthPercentageToDP(value);
}

export function hp(value) {
  return heightPercentageToDP(value);
}
