import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Colors from '../../Colors';
import {EditProfile} from '../../Api';
import Header from '../../Components/Header';
import ImagePicker from 'react-native-image-crop-picker';
import Input from '../../Components/Input';
import RButton from '../../Components/RButton';
import Sound from 'react-native-sound';
import Styles from './Style';
import Video from 'react-native-video';
import {detailUSer} from '../../Api';

const Profile = ({navigation}) => {
  const videoPlayer = useRef(null);
  const [cu, setcu] = useState(0);
  const color = [
    {bac: 'rgba(6, 146, 203, 0.3)', col: '#0691CB'},
    {bac: 'rgba(128, 81, 205 ,0.3)', col: '#8051CD'},
    {bac: 'rgba(76 ,175 ,80 ,0.3)', col: '#4CAF50'},
    {bac: 'rgba(245 ,0 ,0 ,0.3)', col: '#F50000'},
  ];
  const [playpasuse, setplaypasuse] = useState({id: ''});
  const [currentply, setcurrentply] = useState(0);
  const {userData, isLoggedIn} = useSelector(({USER}) => USER);
  const [Questionlist, setQuestionlist] = useState([]);
  const [experties, setExperties] = useState([]);
  const [imageparh, setimageparh] = useState('');
  const [interest, setinterest] = useState([]);
  const [pro, setpro] = useState({});
  const [loding, setloding] = useState(true);
  const list = ({item}) => (
    <View style={[Styles.spaceview]}>
      <View style={[Styles.view, {backgroundColor: item.color.bac}]}>
        <Text style={[Styles.txt12, {color: item.color.col}]}>{item.name}</Text>
      </View>
    </View>
  );
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      detailPersonal();
    });
    return unsubscribe;
  }, [navigation]);
  let cui = 0;
  const getcurrenttime = (tim, item) => {
    setcurrentply(tim);
    console.log('---', tim);
    let it = parseInt(item.description) / 1000;
    let u = (parseInt(tim) / it) * 95;
    console.log('--', parseInt(u));
    cui = tim;
    setcu(parseInt(u));
    if (tim >= it - 1) {
      setplaypasuse(true);
    }
  };
  const editprofileimage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setimageparh(image.path);
      UpdateExperties(image.path);
    });
  };

  const UpdateExperties = path => {
    const data = new FormData();
    // console.log('=======HHHHHHHH===÷===', electeditmetopic);
    if (path) {
      path &&
        data.append('image', {
          uri: path,
          type: 'image/jpeg',
          name: 'image' + new Date() + '.jpg',
        });
      console.log('data,,,,,', data);
    }
    console.log('--ddd-', data);
    EditProfile({Auth: userData.userdata.api_token, data: data})
      .then(res => {
        console.log('Response of Edit', res);
        if (res.status == 'success') {
          console.log('Edit');
        }
      })
      .catch(error => {
        console.log('Error MEssage of Signup', error.response.data);
        if (error?.response?.data?.status == 'error') {
          if (error?.response?.data?.message?.email) {
            alert(`${error?.response?.data?.message?.email}`);
          } else if (error?.response?.data?.message?.username) {
            alert(`${error?.response?.data?.message?.username}`);
          }
        } else {
          alert('Some thing wrong');
        }
      });
  };
  const detailPersonal = () => {
    setloding(true);
    detailUSer({Auth: userData.userdata.api_token})
      .then(res => {
        console.log('Response of PRofile', res);
        if (res.status == 'success') {
          console.log('--', res.userdata.expertes);
          setQuestionlist(res.userdata.questions);
          setpro(res.userdata);
          // setinterest(res.userdata.topics);
          // setExperties(res.userdata.expertes);
          let arr = [];
          res.userdata.expertes.forEach(element => {
            arr.push({
              id: arr.length + 1,
              name: element,
              color: color[Math.floor(Math.random() * (0 - 1 + 1)) + 1],
            });
          });
          let arr1 = [];
          res.userdata.topics.forEach(element => {
            arr1.push({
              id: arr1.length + 1,
              name: element,
              color: color[Math.floor(Math.random() * (0 - 3 + 1)) + 3],
            });
          });
          setinterest(arr);
          setExperties(arr1);
          setloding(false);
        } else {
          setloding(false);
          console.log('Some thing wamt wrong');
        }
      })
      .catch(err => {
        setloding(false);
        console.log('Error Message of PRofile', err);
      });
  };

  const whoosh1 = useRef(null);
  const [playing, setPlaying] = useState(false);

  const [duration1, setDuration1] = useState(0);

  useEffect(() => {
    return () => {
      if (whoosh1.current) {
        whoosh1.current.stop();
      }
    };
  }, []);
  const start = async link => {
    // await AddTrackplayer();
    if (playpasuse.id != '') {
      console.log('111111');
      // whoosh1.current.pause();

      SoundPlayer1(link);

      // await TrackPlayer.play();
    } else {
      setplaypasuse({id: ''});
      console.log('1111111333333');
      whoosh1.current.pause();
      // await TrackPlayer.stop();
    }
  };

  const SoundPlayer1 = link => {
    whoosh1.current = new Sound(link, null, error => {
      if (error) {
        return;
      }
      setDuration1(whoosh1.current.getDuration());
      setPlaying(true);

      whoosh1.current.play(success => {
        if (success) {
          // if (soundIndex < soundUrls.length) {
          //   setSoundIndex(soundIndex + 1);
          // } else {
          //   setPlaying(false);
          // }
        } else {
        }
      });
    });
  };

  const ListQuestion = ({item}) => (
    <View style={Styles.spaceimgview}>
      <Text style={Styles.textvi}>{item.duration_information}</Text>
      <Text style={Styles.textvi1}>You've asked a question</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Response', {quesid: item})}
        style={Styles.imgview}>
        {item.id != playpasuse.id ? (
          <Image
            resizeMode={'cover'}
            style={Styles.videthumb}
            source={
              item.file_type == 'mp3'
                ? require('../../Assests/man.png')
                : {uri: item.thumbnail}
            }
          />
        ) : item.file_type == 'mp4' ? (
          <Video
            ref={videoPlayer}
            resizeMode="cover"
            source={{uri: item.file}}
            style={[Styles.videthumb, {backgroundColor: Colors.black}]}
            paused={playpasuse.id == item.id ? false : true}
            onComplete={() => setplaypasuse({id: ''})}
            onProgress={data => getcurrenttime(data.currentTime, item)}
            // currentPlaybackTime={tim => getcurrenttime(tim)}
          />
        ) : (
          <Image
            resizeMode={item.file_type == 'mp3' ? 'contain' : 'cover'}
            style={Styles.videthumb}
            source={
              item.file_type == 'mp3'
                ? require('../../Assests/man.png')
                : {uri: item.thumbnail}
            }
          />
        )}
        <View
          // onPress={() => {
          //   if (playpasuse.id == item.id) {
          //     setplaypasuse({id: ''});
          //   } else {
          //     if (item.file_type == 'mp3') {
          //       start(item.file);
          //       setplaypasuse({id: item.id});
          //     } else {
          //       setplaypasuse({id: item.id});
          //     }
          //   }
          // }}
          style={Styles.videimgth}>
          <Image
            resizeMode="cover"
            style={Styles.imgth}
            source={
              item.id == playpasuse.id
                ? require('../../Assests/pas.png')
                : require('../../Assests/ply.png')
            }
          />
        </View>
      </TouchableOpacity>
    </View>
  );
  return (
    <ImageBackground
      source={require('../../Assests/bac1.png')}
      resizeMode="stretch"
      style={Styles.image}>
      <Header right="true" navigation={navigation} title="Profile" />
      {!loding ? (
        <ScrollView style={{flex: 1}}>
          <View style={Styles.innercontainer}>
            <TouchableOpacity
              onPress={() => editprofileimage()}
              style={Styles.viwprimg}>
              <Image
                resizeMode={pro.image ? 'cover' : 'stretch'}
                style={Styles.primg}
                source={
                  imageparh
                    ? {uri: imageparh}
                    : pro.image
                    ? {uri: pro.image}
                    : require('../../Assests/men1.png')
                }
              />
            </TouchableOpacity>
            <Text style={Styles.namtxt}>{pro.name}</Text>
            <View style={Styles.ratview}>
              <Image
                resizeMode="cover"
                style={Styles.rat}
                source={require('../../Assests/st.png')}
              />
              <Text style={Styles.rttxt}>4.9(2k)</Text>
            </View>
            {experties.length > 0 || interest.length > 0 ? (
              <View style={Styles.mainexpertiestopic}>
                {interest.length > 0 ? (
                  <View style={Styles.maininner1}>
                    <View style={Styles.headerview}>
                      <Text style={Styles.txtexprt}>EXPERTIES</Text>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('EditInterest', {interest})
                        }>
                        <Text style={Styles.edittxt}>EDIT</Text>
                      </TouchableOpacity>
                    </View>
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      data={interest}
                      renderItem={list}
                    />
                  </View>
                ) : null}
                {experties.length > 0 ? (
                  <View style={Styles.maininner}>
                    <View style={Styles.headerview}>
                      <Text style={Styles.txtexprt}>INTEREST</Text>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('SelectTopics', {experties})
                        }>
                        <Text style={Styles.edittxt}>EDIT</Text>
                      </TouchableOpacity>
                    </View>
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      data={experties}
                      renderItem={list}
                    />
                  </View>
                ) : null}
              </View>
            ) : null}
            {Questionlist.length > 0 ? (
              <View style={Styles.videview}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={Questionlist}
                  renderItem={ListQuestion}
                />
              </View>
            ) : null}
          </View>
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

export default Profile;
