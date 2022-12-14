import {
  CommentQuestion,
  CommentResponse,
  LikeQuestion,
  LikeResponse,
  ShareQuestion,
  ShareResponse,
  ViewDetail,
  coinTransper,
} from '../../Api';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {UseEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Colors from '../../Colors';
import {Header} from '../../Components/Header';
import Loder from '../../Components/Loder';
import Styles from './Style';
import Video from 'react-native-video';

const PlayVideoScreen = ({navigation, route}) => {
  const {ply} = route.params;
  // console.log('-----------', ply);
  const videoPlayer = useRef(null);
  // console.log('---Play video---', ply);
  const [playpasuse, setplaypasuse] = useState(false);
  const [iconshow, seticonshow] = useState(false);
  const [loderfalse, setloderfalse] = useState(false);
  const [likedislike, setlikedislike] = useState(false);
  const [currentply, setcurrentply] = useState(0);
  const [cu, setcu] = useState(0);
  const {userData, isLoggedIn} = useSelector(({USER}) => USER);
  const [coment, setcoment] = useState('');
  const [coment1, setcoment1] = useState('');
  const [commentarr, setcommentarr] = useState([]);
  const [likecount, setlikecount] = useState(0);
  const [commentcount, setcommentcount] = useState(0);

  const [commentarr1, setcommentarr1] = useState([]);
  const [likecount1, setlikecount1] = useState(0);
  const [commentcount1, setcommentcount1] = useState(0);
  const [likes, setlikes] = useState(false);
  const [likes1, setlikes1] = useState(false);
  let cui = 0;

  setTimeout(() => {
    if (!playpasuse) {
      seticonshow(false);
    } else {
      seticonshow(true);
    }
  }, 1000);
  const getcurrenttime = tim => {
    setcurrentply(tim);
    console.log('---', tim);
    let it = parseInt(ply.description) / 1000;
    let u = (parseInt(tim) / it) * 95;
    console.log('--', parseInt(u));
    cui = tim;
    setcu(parseInt(u));
    if (tim >= it - 1) {
      //   setplaypasuse(true);
    }
  };

  const sharePosted = () => {
    const data = new FormData();
    // data.append('response_id', route.params.res.id);

    data.append('question_id', route.params.qu.id);
    // data.append('response_id', route.params.qu.id);

    console.log('Post Data', data);
    ShareQuestion({Auth: userData.userdata.api_token}, data)
      .then(res => {
        console.log('Response Of Response Question', res);
      })
      .catch(err => {
        console.log('Error of Response Question', err);
      });
  };
  const sharePostedResponse = () => {
    const data = new FormData();
    // data.append('response_id', route.params.res.id);

    data.append('question_id', route.params.qu.id);
    data.append('response_id', route.params.res.id);

    console.log('Post Data', data);
    ShareResponse({Auth: userData.userdata.api_token}, data)
      .then(res => {
        console.log('Response Of Response Question', res);
      })
      .catch(err => {
        console.log('Error of Response Question', err);
      });
  };

  const _CommentResponse1 = () => {
    setcommentcount1(commentcount1 + 1);
    let r = {
      id:
        commentarr1.length > 0 ? commentarr1[commentarr1.length - 1].id + 1 : 1,
      comment: coment1,
      image: userData.userdata.image,
      username: userData.userdata.username,
    };
    setcommentarr1([...commentarr1, r]);
    const data = new FormData();

    data.append('question_id', route.params.qu.id);
    data.append('comment', coment);

    data.append('user_id', route.params.res.user_id);

    console.log('Post Data', data);
    CommentQuestion({Auth: userData.userdata.api_token}, data)
      .then(res => {
        console.log('Response Of Response Question', res);
      })
      .catch(err => {
        console.log('Error of Response Question', err);
      });
  };

  const _CommentResponse = () => {
    setcommentcount(commentcount + 1);
    let r = {
      id: commentarr.length > 0 ? commentarr[commentarr.length - 1].id + 1 : 1,
      comment: coment,
      image: userData.userdata.image,
      username: userData.userdata.username,
    };
    setcommentarr([...commentarr, r]);
    const data = new FormData();
    data.append('response_id', route.params.res.id);

    data.append('question_id', route.params.qu.id);
    data.append('comment', coment);

    data.append('user_id', route.params.res.user_id);

    console.log('Post Data', data);
    CommentResponse({Auth: userData.userdata.api_token}, data)
      .then(res => {
        console.log('Response Of Response Question', res);
      })
      .catch(err => {
        console.log('Error of Response Question', err);
      });
  };

  const _LikeResponse1 = () => {
    if (!likes1) {
      setlikecount1(likecount1 + 1);
      setlikes1(true);
    } else {
      setlikecount1(likecount1 - 1);
      setlikes1(false);
    }
    const data = new FormData();
    // data.append('response_id', route.params.res.id);

    data.append('question_id', route.params.qu.id);

    console.log('Post Data', data);
    LikeQuestion({Auth: userData.userdata.api_token}, data)
      .then(res => {
        console.log('Response Of Response Question', res);
      })
      .catch(err => {
        console.log('Error of Response Question', err);
      });
  };
  const _LikeResponse = () => {
    if (!likes) {
      setlikecount(likecount + 1);
      setlikes(true);
    } else {
      setlikecount(likecount - 1);
      setlikes(false);
    }
    const data = new FormData();
    data.append('response_id', route.params.res.id);

    data.append('question_id', route.params.qu.id);

    console.log('Post Data', data);
    LikeResponse({Auth: userData.userdata.api_token}, data)
      .then(res => {
        console.log('Response Of Response Question', res);
      })
      .catch(err => {
        console.log('Error of Response Question', err);
      });
  };

  return (
    <View style={{flex: 1}}>
      {/* <Header
        left="true"
        navigation={navigation}
        title="Question and Responses"
      /> */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={Styles.touchleft}>
        <Image
          source={require('../../Assests/arrow.png')}
          resizeMode="contain"
          style={Styles.letarrow}
        />
      </TouchableOpacity>
      <Video
        ref={videoPlayer}
        resizeMode="contain"
        source={{uri: ply.file}}
        style={{flex: 1, backgroundColor: Colors.black}}
        paused={playpasuse}
        repeat={true}
        onEnd={() => setplaypasuse(false)}
        onBuffer={isBuffering => {
          if (isBuffering.isBuffering) {
            setloderfalse(true);
            // console.log('hassan', isBuffering.isBuffering);
          } else {
            setloderfalse(false);
            // console.log('iiiiiii', isBuffering.isBuffering);
          }
        }}
        onLoad={() => {
          console.log('iiiiiii');
        }}
        // onComplete={() => setplaypasuse(true)}
        onProgress={data => getcurrenttime(data.currentTime)}
        currentPlaybackTime={tim => getcurrenttime(tim)}
      />
      <View style={Styles.touchrec1}>
        <TouchableOpacity
          onPress={() => setplaypasuse(!playpasuse)}
          style={Styles.touchrec}>
          {iconshow ? (
            <Image
              source={
                playpasuse
                  ? require('../../Assests/ply.png')
                  : require('../../Assests/pas.png')
              }
              resizeMode="contain"
              style={Styles.imaginner1}
            />
          ) : null}
        </TouchableOpacity>
        <View style={Styles.profilview}>
          {/* <View style={[Styles.profileview, {borderWidth: 1}]}>
            <Image
              source={require('../../Assests/Heart.png')}
              resizeMode="contain"
              style={Styles.proimag1}
            />
          </View>
          <TouchableOpacity
            onPress={() => setlikedislike(!likedislike)}
            style={Styles.profileview}>
            <Image
              source={require('../../Assests/Heart.png')}
              resizeMode="contain"
              style={[
                Styles.proimag1,
                {tintColor: likedislike ? Colors.red : Colors.white},
              ]}
            />
            <Text style={Styles.counttxt}>10.9k</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.profileview}>
            <Image
              source={require('../../Assests/Chat.png')}
              resizeMode="contain"
              style={Styles.proimag1}
            />
            <Text style={Styles.counttxt}>10.9k</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.profileview}>
            <Image
              source={require('../../Assests/sh.png')}
              resizeMode="contain"
              style={Styles.proimag1}
            />
            <Text style={Styles.counttxt}>10.9k</Text>
          </TouchableOpacity> */}
        </View>
      </View>
      {/* <Loder lodertyp={loderfalse} /> */}
    </View>
  );
};

export default PlayVideoScreen;
