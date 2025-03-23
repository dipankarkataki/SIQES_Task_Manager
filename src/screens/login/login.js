import { View, Text, Image } from 'react-native';
import React from 'react';
import {styles} from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';

const Login = ({navigation}) => {
  const logo = require('../../assets/images/logo.png');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.login_form_wrapper}>
        <View style={styles.login_form}>
          <View style={styles.login_form_header}>
            <Image source={logo} style={styles.logo} />
          </View>
          <View style={styles.text_input_wrapper}>
            <Text style={styles.text_input_label}>Email</Text>
            <TextInput style={styles.text_input} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Login;