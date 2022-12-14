import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import AgoraUIKit from 'agora-rn-uikit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../Colors';
import Header from '../../Components/Header';
import Input from '../../Components/Input';
import RButton from '../../Components/RButton';
import Styles from './Style';

const AskLive = ({navigation, route}) => {
  const [videoCall, setVideoCall] = useState(true);
  // let callType = 'video';
  const {callType, guestData, channel, Name, Number} = route.params;
  const [callConnected, setCallConnected] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const {userData, isLoggedIn} = useSelector(({USER}) => USER);

  // const {userdata, token} = useSelector(({USER}) => USER.userData);
  const rtcProps = {
    appId: '009784133fa7421b8877ef50ccb552e4',
    channel: `${channel}`,
    // appCertificate: '93eb8c694ab74924a3589cfe551ef7e9',
    // secured: false,

    //
    // '006610e09a264ba41158f7fdeaf67f0f033IAAUVzCYq4wG13qquy+uA2CqtaTfzI9KVwx+zXMVZ4V9kvU+y2EAAAAAEABznkU8C0InYgEAAQALQidi',
    // '006610e09a264ba41158f7fdeaf67f0f033IADX8BPL6+lhot1stBECLBzOFs+I97t0loNYSDxOcgB8WaQWgFsAAAAAEABznkU8QPAmYgEAAQBA8CZi',

    token:
      '007eJxTYOAOFWx9e0cjdUHFrhvxKbc2Z2fXCYd0yFqXesx+WJjYe1mBwcDA0tzCxNDYOC3R3MTIMMnCwtw8Nc3UIDk5ydTUKNXEM2NmckMgI8Nxs0OsjAwQCOIzM+Tn5zMwAADnbh4r',
  };

  const EndCall = () => {
    Alert.alert('Call was ended', '', [
      {text: 'Ok', onPress: navigation.goBack()},
    ]);
  };

  useEffect(() => {
    if (callConnected) {
      AsyncStorage.removeItem('callData').then(() =>
        console.log('call cache cleared'),
      );
    }

    // setTimeout(() => {
    //   setTimedOut(true);
    // }, 35000);
  }, [callConnected]);

  useEffect(() => {
    if (timedOut && !callConnected) {
      Alert.alert('Call Failed', 'User did not pick up the call', [
        {text: 'Ok', onPress: navigation.goBack()},
      ]);
    }
  }, [timedOut]);

  const callbacks = {
    EndCall: () => navigation.goBack(),
    ConnectionStateChanged: state => console.log('state changed to ' + state),
    UserOffline: uid => EndCall(),
    UserJoined: uid => setCallConnected(true),
  };

  return callType == 'video' ? (
    <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
  ) : (
    <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    // <>
    //   {/* <ImageBackground
    //     source={require('../../Assests/calbk.png')}
    //     resizeMode="cover"
    //     style={Styles.image}></ImageBackground> */}
    //   <View style={Styles.hidenview}>
    //     <View style={Styles.mainreciverview}>
    //       <TouchableOpacity
    //         style={Styles.press}
    //         onPress={() => navigation.goBack()}>
    //         <Image
    //           source={require('../../Assests/leftr.png')}
    //           resizeMode="contain"
    //           style={Styles.arroeback}
    //         />
    //       </TouchableOpacity>
    //       <View>
    //         <View style={Styles.reciverview}>
    //           <Image
    //             source={require('../../Assests/vi.png')}
    //             resizeMode="cover"
    //             style={Styles.uuu}
    //           />
    //         </View>
    //         <TouchableOpacity style={Styles.refreshview}>
    //           <Image
    //             source={require('../../Assests/ref.png')}
    //             resizeMode="contain"
    //             style={Styles.refimg}
    //           />
    //         </TouchableOpacity>
    //       </View>
    //     </View>
    //     <View style={Styles.menuview1}>
    //       <Text style={Styles.reptxt}>Wattinf for Responder...</Text>
    //     </View>
    //     <>
    //       <View style={Styles.menuview}>
    //         <TouchableOpacity style={[Styles.icmenuview, {top: wp(12)}]}>
    //           <Image
    //             source={require('../../Assests/voll.png')}
    //             resizeMode="contain"
    //             style={Styles.iconimag}
    //           />
    //         </TouchableOpacity>
    //         <TouchableOpacity style={[Styles.icmenuview, {top: wp(6)}]}>
    //           <Image
    //             source={require('../../Assests/vid.png')}
    //             resizeMode="contain"
    //             style={Styles.iconimag}
    //           />
    //         </TouchableOpacity>
    //         <TouchableOpacity
    //           style={[
    //             Styles.icmenuview,
    //             {width: wp(15), height: wp(15), backgroundColor: Colors.red},
    //           ]}>
    //           <Image
    //             source={require('../../Assests/Call.png')}
    //             resizeMode="contain"
    //             style={[Styles.iconimag, {width: wp(9), height: wp(9)}]}
    //           />
    //         </TouchableOpacity>
    //         <TouchableOpacity style={[Styles.icmenuview, {top: wp(6)}]}>
    //           <Image
    //             source={require('../../Assests/voll.png')}
    //             resizeMode="contain"
    //             style={Styles.iconimag}
    //           />
    //         </TouchableOpacity>
    //         <TouchableOpacity style={[Styles.icmenuview, {top: wp(12)}]}>
    //           <Image
    //             source={require('../../Assests/Chat.png')}
    //             resizeMode="contain"
    //             style={Styles.iconimag}
    //           />
    //         </TouchableOpacity>
    //         <Text style={Styles.text11}>Rate=10Coin/min</Text>
    //       </View>
    //     </>
    //   </View>
    // </>
  );
};

export default AskLive;
