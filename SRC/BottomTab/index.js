import {
  Fragment,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Ask from './Ask';
import Coins from './Coins';
import Colors from '../Colors';
import Home from './Home';
import Profile from './Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const BoyyomTab = () => {
  const designtab = (imag, focused, txt) => {
    return (
      <View
        style={{
          backgroundColor: Colors.black,
          width: wp(17),
          height: wp(16),
          justifyContent: 'space-around',
          alignItems: 'center',
          // top: wp(2),
        }}>
        <Image
          resizeMode="contain"
          source={imag}
          style={{
            width: focused ? wp(6) : wp(5),
            height: focused ? wp(6) : wp(5),
            tintColor: focused ? Colors.maincolor : Colors.gray,
          }}
        />
        <Text
          style={{
            color: focused ? Colors.white : Colors.gray,
            fontSize: 11,
            bottom: wp(1),
            fontWeight: focused ? 'bold' : 'normal',
          }}>
          {txt}
        </Text>
      </View>
    );
  };
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: Colors.black,
          position: 'absolute',
          //   borderTopLeftRadius: wp(40),
          //   borderTopRightRadius: wp(30),
          height: wp(16),
        },
      }}
      tabBarOptions={{showLabel: false}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) =>
            designtab(require('../Assests/Vector-3.png'), focused, 'HOME'),

          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Ask"
        component={Ask}
        options={{
          tabBarIcon: ({focused}) =>
            designtab(require('../Assests/Vector-2.png'), focused, 'ASK'),

          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) =>
            designtab(require('../Assests/Vector-1.png'), focused, 'Profile'),

          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Coins"
        component={Coins}
        options={{
          tabBarIcon: ({focused}) =>
            designtab(require('../Assests/Vector.png'), focused, 'COINS'),

          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
export default BoyyomTab;
