import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import React from 'react';
import { styles } from './styles';
import TopTabsNavigator from '../../components/TopTabsNavigator';

const Dashboard = ({ navigation }) => {
  const profile_image = require('../../assets/images/profile.jpg');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header_container}>
        <Text style={styles.header_text}>Dashboard</Text>
        <TouchableOpacity activeOpacity={0.8} style={styles.profile_image_container} onPress={() => navigation.navigate('Profile')}>
          <Image source={profile_image} style={styles.profile_image} />
        </TouchableOpacity>
      </View>
      <TopTabsNavigator />
    </SafeAreaView>
  )
}

export default Dashboard;