import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Colors from '../../Colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // paddingVertical: wp(24),
  },
  touchrec1: {
    width: wp(100),
    height: hp(100),
    alignSelf: 'center',
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: Colors.transperentheader,

    alignItems: 'center',
  },
  profilview: {
    backgroundColor: Colors.transperentheader,
    height: hp(100),
    width: hp(20),
    justifyContent: 'center',
  },
  touchrec: {
    width: wp(80),
    height: hp(100),
    justifyContent: 'center',
    backgroundColor: Colors.transperentheader,

    alignItems: 'center',
  },
  imaginner1: {
    width: wp(12),
    height: wp(12),
    left: wp(8),
    tintColor: Colors.white,
  },
  profileview: {
    width: wp(18),
    height: wp(18),
    borderRadius: wp(10),
    marginTop: wp(1),
    marginBottom: wp(1),
    borderWidth: 0,
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counttxt: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  letarrow: {
    width: wp(6),
    height: wp(6),
    tintColor: Colors.white,
  },
  proimag1: {
    width: wp(8),
    height: wp(8),
    tintColor: Colors.white,
  },
  touchleft: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(10),
    backgroundColor: Colors.transperentheader,
    position: 'absolute',
    zIndex: 10,

    alignItems: 'center',
    justifyContent: 'center',
  },
});
