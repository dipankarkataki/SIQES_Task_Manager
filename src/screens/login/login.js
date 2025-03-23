import { Text, View, Image, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, SafeAreaView, Alert } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LoginApi from '../../api/Login/LoginApi';
import MessageModalComponent from '../../components/MessageModalComponent';
import TokenManager from '../../services/TokenManager';
import { useDispatch } from 'react-redux';
import { setUserAuthToken } from '../../redux/action/userAuthLoginAction';
import { setUserProfileData } from '../../redux/action/userProfileDataAction';
import styles from './styles';
import constants from '../../navigation/constants';

const background = require('../../assets/images/background.png');
const logo_large = require('../../assets/images/logo.png');

const Login = ({ navigation }) => {

  const dispatch = useDispatch();

  const [passwordVisibilty, setPasswordVisibility] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(true);
  const [modalMessage, setModalMessage] = useState('');
  const [modalIcon, setModalIcon] = useState(null);
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Valid email is required';
      isValid = false;
    } else {
      newErrors.email = '';
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else {
      newErrors.password = '';
    }

    setErrors(newErrors);
    return isValid;
  };

  const submitForm = async () => {
    if (validateForm()) {
      setLoader(true);
      
      try{
        const res = await LoginApi({
          'email': email.toLocaleLowerCase(),
          'password': password
        });
        console.log('Login Response', res.data);
        if(res.data?.success === true){
          await TokenManager.setToken(res.data.token);
  
          dispatch(setUserAuthToken(res.data.token));
          dispatch(setUserProfileData(res.data.data));
  
          navigation.replace(constants.DASHBOARD);
        }else{
          setModalVisible(true);
          setModalIcon('error');
          setModalMessage(res.data ? res.data.message : 'Something went wrong!');
          setShouldNavigate(false)
        }
      }catch(err){
        console.log('Login Api Error: ',err)
      }finally{
        setLoader(false);
      }
    }
  };

  const handleOnClose = () => {
    setModalVisible(false)
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={background} style={styles.image_background}>
        <View style={styles.header_container}>
          {/* <Text style={styles.header_text}>Login</Text> */}
        </View>
        <ScrollView alwaysBounceVertical style={styles.scrollView_container}>
          <View style={styles.logo_area}>
            <Image source={logo_large} style={styles.logo_large} />
          </View>
          <KeyboardAvoidingView behaviour={Platform.OS === 'ios' ? 'padding' : null} style={styles.form}>
            <View style={styles.text_input_area}>
              <Text style={styles.text_title}>Email</Text>
              <View style={[styles.input_container, { borderColor: errors.email ? 'red' : '#E1F3FB' }]}>
                <TextInput
                  style={styles.text_input}
                  placeholder="e.g jhondoe@xyz.com"
                  placeholderTextColor="#b9b9b9"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
                <Icon name="envelope" size={20} color="#888" style={styles.icon} />
              </View>
              {errors.email ? <Text style={styles.error_text}>{errors.email}</Text> : null}
            </View>
            <View style={styles.text_input_area}>
              <Text style={styles.text_title}>Password</Text>
              <View style={[styles.input_container, { borderColor: errors.password ? 'red' : '#E1F3FB' }]}>
                <TextInput
                  style={styles.text_input}
                  placeholder='* * * * * * * * * * *'
                  placeholderTextColor='#b9b9b9'
                  secureTextEntry={passwordVisibilty}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
                {
                  passwordVisibilty ?
                    <TouchableOpacity onPress={() => setPasswordVisibility(false)}>
                      <Icon name="eye-slash" size={20} color="#888" style={styles.icon} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => setPasswordVisibility(true)}>
                      <Icon name="eye" size={20} color="#888" style={styles.icon} />
                    </TouchableOpacity>
                }
              </View>
              {errors.password ? <Text style={styles.error_text}>{errors.password}</Text> : null}
            </View>
          </KeyboardAvoidingView>
          <View style={styles.form_btn_container}>
            <TouchableOpacity style={styles.login_btn} onPress={submitForm} disabled={loader}>
              <Text style={styles.login_btn_text}>{loader ? 'Loging in...' : 'Login'}</Text>
              {
                loader && (
                  <ActivityIndicator size="large" color='#2E78FF' style={styles.activity_indicator} animating={loader} />
                )
              }
            </TouchableOpacity>
          </View>
        </ScrollView>
        <MessageModalComponent
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          message={modalMessage}
          onClose={handleOnClose}
          icon={modalIcon}
        />
      </ImageBackground>
    </SafeAreaView>

  );
};

export default Login;
