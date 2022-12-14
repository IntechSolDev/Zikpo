import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getCoinsAcrtiveinfo, postNewCoins} from '../../Api';
import {useDispatch, useSelector} from 'react-redux';

import Colors from '../../Colors';
import Header from '../../Components/Header';
import Input from '../../Components/Input';
import RButton from '../../Components/RButton';
import Styles from './Style';

const Coins = ({navigation}) => {
  const [purchasecoin, setpurchasecoin] = useState(false);
  const [historycoins, sethistorycoins] = useState([]);
  const [activitycoins, setactivitycoins] = useState([]);
  const [coin, setcoin] = useState(0);
  const color = [
    {bac: 'rgba(6, 146, 203, 0.3)', col: '#0691CB'},
    {bac: 'rgba(128, 81, 205 ,0.3)', col: '#8051CD'},
    {bac: 'rgba(76 ,175 ,80 ,0.3)', col: '#4CAF50'},
    {bac: 'rgba(245 ,0 ,0 ,0.3)', col: '#F50000'},
  ];
  const rate = [
    {id: 1, price: 5, coin: 10},
    {id: 2, price: 9, coin: 15},
    {id: 3, price: 15, coin: 20},
    {id: 4, price: 25, coin: 30},
    {id: 5, price: 35, coin: 45},
    {id: 6, price: 45, coin: 60},
  ];
  const {userData, isLoggedIn} = useSelector(({USER}) => USER);
  const [loding, setloding] = useState(false);
  const purcaecoin = itm => {
    const data = new FormData();
    data.append('coin', itm.coin);

    postNewCoins({Auth: userData.userdata.api_token}, data)
      .then(res => {
        console.log('Response of coinPost', res);
        if (res.status == 'success') {
          setpurchasecoin(false);
          getYourIngo();
          // navigation.navigate('SelectTopics');
        } else {
          setpurchasecoin(false);
          alert('Somt thing want Wrong');
        }
      })
      .catch(error => {
        setpurchasecoin(false);
        console.log('Error in post Coin', error);
      });
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setloding(true);
      getYourIngo();
    });
    return unsubscribe;
  }, [navigation]);
  const getYourIngo = () => {
    getCoinsAcrtiveinfo({Auth: userData.userdata.api_token})
      .then(res => {
        console.log('Response of Coin Info', res);
        if (res.status == 'success') {
          setloding(false);
          sethistorycoins(res.purchased);
          setactivitycoins(res.activity);
          setcoin(res.coin);
          // navigation.navigate('SelectTopics');
        } else {
          setloding(false);
          alert('Somt thing want Wrong');
        }
      })
      .catch(error => {
        setloding(false);
        console.log('Error in Get Coin info', error.response.data);
      });
  };

  const allactivity = ({item}) => (
    <View style={Styles.viewwithspace}>
      <View style={Styles.viewwith}>
        <View style={Styles.textview}>
          <Image
            source={require('../../Assests/dll.png')}
            resizeMode="cover"
            style={Styles.coverrstyl}
          />

          <Text
            style={[
              Styles.texiner,
              {color: color[Math.floor(Math.random() * (0 - 1 + 1)) + 1].col},
            ]}>
            {item.message.split('-')[0]}
          </Text>
          <Text style={Styles.texiner1}>{item.message.split('-')[1]}</Text>
        </View>
        <Text style={Styles.texiner2}>{item.date}</Text>
      </View>
    </View>
  );
  const allcoins = ({item}) => (
    <View style={Styles.spccoinview}>
      <TouchableOpacity
        onPress={() => purcaecoin(item)}
        style={Styles.coinview}>
        <Text style={Styles.txtcoin}>{item.coin} Coins</Text>
        <Text style={Styles.txtcoin}>{item.price} $</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <ImageBackground
      source={require('../../Assests/bac1.png')}
      resizeMode="stretch"
      style={Styles.image}>
      <Header navigation={navigation} title="Coins" />
      {!loding ? (
        <ScrollView style={{flex: 1}}>
          <View style={Styles.innercontainer}>
            <View style={Styles.firstcard}>
              <Text style={Styles.textrs}>{coin}</Text>
              <Text style={Styles.textrs1}>BLANCE</Text>
              <TouchableOpacity
                onPress={() => setpurchasecoin(true)}
                style={Styles.touchpurch}>
                <Text style={Styles.textrs2}>PURCHASE COINS</Text>
              </TouchableOpacity>
            </View>
            {activitycoins.length > 0 ? (
              <View style={Styles.cointextview}>
                <Text style={Styles.texthead}>COINS ACTIVITY</Text>
              </View>
            ) : null}
            {activitycoins.length > 0 ? (
              <View style={Styles.firstcard1}>
                <FlatList data={activitycoins} renderItem={allactivity} />
              </View>
            ) : null}
            {historycoins.length > 0 ? (
              <View style={Styles.cointextview}>
                <Text style={Styles.texthead}>PURCHASE HISTORY</Text>
              </View>
            ) : null}
            {historycoins.length > 0 ? (
              <View style={Styles.firstcard1}>
                <FlatList data={historycoins} renderItem={allactivity} />
              </View>
            ) : null}
          </View>
          <Modal animationType="fade" transparent={true} visible={purchasecoin}>
            <View style={Styles.mainmodal}>
              <View style={Styles.inner}>
                <FlatList data={rate} renderItem={allcoins} />
                <View style={Styles.mainview}>
                  <View style={Styles.touchcan1}>
                    <Text style={Styles.txtcan1}>Purchase</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setpurchasecoin(false)}
                    style={Styles.touchcan}>
                    <Text style={Styles.txtcan}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      ) : loding ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={Colors.maincolor} />
        </View>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>No Record Yet Found...</Text>
        </View>
      )}
    </ImageBackground>
  );
};

export default Coins;
