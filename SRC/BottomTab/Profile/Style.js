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
  namtxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
    marginTop: wp(3),
  },
  headerview: {
    width: wp(89),
    alignSelf: 'center',
    paddingHorizontal: wp(2),
    alignItems: 'center',
    marginBottom: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spaceview: {
    // width: wp(16),
    paddingHorizontal: wp(2),
    height: wp(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  maininner: {
    height: wp(20),
    width: wp(85),
    borderBottomWidth: 1,

    borderBottomColor: Colors.gray,
  },
  maininner1: {
    height: wp(20),
    width: wp(85),
    borderBottomWidth: 0,
    marginTop: wp(4),

    borderBottomColor: Colors.gray,
  },
  view: {
    paddingHorizontal: wp(4),
    borderRadius: wp(10),
    height: wp(7),
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt12: {
    fontSize: 14,
    color: Colors.gray,
    fontWeight: '400',
  },
  edittxt: {
    fontSize: 14,
    color: Colors.gray,
    fontWeight: '600',
  },
  textvi: {
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    color: Colors.black,
    marginTop: wp(2),
  },
  spaceimgview: {
    width: wp(87),
    height: wp(47),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: wp(4),
  },
  imgview: {
    width: wp(85),
    height: wp(45),
    alignSelf: 'center',
  },
  videthumb: {
    width: wp(83),
    height: wp(38),
    borderRadius: wp(4),
  },
  videimgth: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(20),
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: Colors.transperent,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    top: wp(18),
  },
  imgth: {
    width: wp(4),
    height: wp(4),
  },
  textvi1: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.gray,
    alignSelf: 'flex-start',
  },
  videview: {
    marginTop: wp(4),
    borderRadius: wp(4),
    width: wp(90),
    paddingHorizontal: wp(2),
    paddingVertical: wp(0),
    backgroundColor: Colors.white,
    elevation: 2,
  },
  txtexprt: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: '600',
  },
  mainexpertiestopic: {
    width: wp(90),
    paddingVertical: wp(3),
    paddingHorizontal: wp(2),
    marginTop: wp(5),
    alignSelf: 'center',
    backgroundColor: Colors.white,
    elevation: 2,
    borderRadius: wp(2),
  },
  rttxt: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray,
  },
  rat: {
    width: wp(4),
    height: wp(4),
  },
  ratview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    width: wp(17),
    marginTop: wp(2),
  },
  viwprimg: {
    width: wp(30),
    height: wp(30),
    borderRadius: wp(25),
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  primg: {
    width: wp(28),
    height: wp(28),
    borderRadius: wp(25),
  },
  innercontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: wp(20),
  },
});
