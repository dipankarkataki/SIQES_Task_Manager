import React, { useEffect } from 'react';
import { styles } from './styles';
import { Image, SafeAreaView } from 'react-native';
import constants from '../../navigation/constants';
import { useSelector } from 'react-redux';

const logo = require('../../assets/images/logo.png');

const Splash = ({ navigation }) => {

  const userAuthToken = useSelector((state) => state.userAuth);

  useEffect(() => {
    setTimeout(() => {
      if (!!userAuthToken) {
        navigation.navigate(constants.DASHBOARD)
      } else {
        navigation.navigate(constants.LOGIN)
      }
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo} />
    </SafeAreaView>
  )
}

export default Splash;