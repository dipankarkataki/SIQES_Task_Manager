import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopTabsNavigator from '../../components/TopTabsNavigator';

const Dashboard = () => {
  const profile_image = require('../../assets/images/profile.jpg');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header_container}>
        <Text style={styles.header_text}>Dashboard</Text>
        <TouchableOpacity activeOpacity={0.8} style={styles.profile_image_container}>
          <Image source={profile_image} style={styles.profile_image} />
        </TouchableOpacity>
      </View>
      <TopTabsNavigator />
    </SafeAreaView>
  )
}

export default Dashboard;