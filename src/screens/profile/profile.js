import { ImageBackground, Text, TouchableOpacity, Image, View, TextInput, ScrollView, Modal, Animated, Alert, ActivityIndicator, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import TokenManager from '../../services/TokenManager';
import LogoutApi from '../../api/Logout/LogoutApi';
import { removeUserAuthToken } from '../../redux/action/userAuthLogoutAction';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import constants from '../../navigation/constants';

const backgroundImage = require('../../assets/images/background.png');
const profile_image = require('../../assets/images/profile.jpg');
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)


const Profile = ({ navigation }) => {

    const dispatch = useDispatch();
    const avatarRef = React.createRef();
    const [loading, setLoading] = useState(true);
    const [logoutActivityLoader, setLogoutActivityLoader] = useState(false);

    const userProfileData = useSelector((state) => state.userProfileData);

    useEffect(() => {
        if (avatarRef.current) {
            const profileDetailsAnimated = Animated.stagger(400, [avatarRef.current.getAnimated()]);
            Animated.loop(profileDetailsAnimated).start();
        }

        setTimeout(() => {
            setLoading(false);
        }, 1000);

    }, [avatarRef.current])

    const revokeTokenAndNavigate = async () => {
        dispatch(removeUserAuthToken());
        await TokenManager.removeToken();

        navigation.reset({
            index: 0,
            routes: [{ name: constants.LOGIN }],
        });
    }

    const handleLogout = () => {
        const logout = async () => {
            try {
                setLogoutActivityLoader(true)
                const res = await LogoutApi();
                if (res.data?.success === true) {
                    Alert.alert('Success', res.data?.message, [
                        {
                            text: 'Close',
                            onPress: revokeTokenAndNavigate
                        }
                    ])
                } else {
                    Alert.alert('Error', res.data?.message);
                }
            } catch (err) {
                console.log('Logout Error : ', err)
                Alert.alert('Error', 'Something went wrong while loging out');
            } finally {
                setLogoutActivityLoader(false);
            }
        }
        logout();
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={backgroundImage} style={styles.image_background}>
                {loading ? (
                    <View style={styles.profile_header}>
                        <ShimmerPlaceholder ref={avatarRef} style={styles.profile_header_image} stopAutoRun />
                    </View>
                ) : (
                    <View style={styles.profile_header}>
                        <TouchableOpacity style={styles.profile_back_button} onPress={() => navigation.navigate(constants.DASHBOARD)}>
                            <Icon name="angle-left" style={styles.back_btn_icon} />
                        </TouchableOpacity>

                        <View style={styles.profile_image_container}>
                            <Image source={profile_image} style={styles.profile_header_image} />
                        </View>
                    </View>
                )}
                <ScrollView style={styles.profile_content_container}>
                    {loading ? (
                        <View>
                            <ShimmerPlaceholder style={styles.shimmerInputPlaceholder} />
                            <ShimmerPlaceholder style={styles.shimmerInputPlaceholder} />
                            <ShimmerPlaceholder style={styles.shimmerInputPlaceholder} />
                        </View>
                    ) : (

                        <>
                            <View style={styles.card}>
                                <View style={styles.text_input_container}>
                                    <Text style={styles.input_title}>Full Name</Text>
                                    <TextInput
                                        style={styles.text_input}
                                        placeholder='William.J'
                                        placeholderTextColor='#b9b9b9'
                                        value={userProfileData?.name}
                                        readOnly
                                    />
                                </View>
                                <View style={styles.text_input_container}>
                                    <Text style={styles.input_title}>Email</Text>
                                    <TextInput
                                        style={styles.text_input}
                                        placeholder='william@gmail.com'
                                        placeholderTextColor='#b9b9b9'
                                        value={userProfileData?.email}
                                        readOnly
                                    />
                                </View>
                            </View>
                            <View style={styles.card}>
                                <TouchableOpacity onPress={handleLogout} style={styles.logout_btn} disabled={logoutActivityLoader}>
                                    <View style={styles.logout_btn_inner}>
                                        <SimpleIcon name="logout" style={styles.logout_icon} />
                                        <Text style={styles.logout_btn_text}>{logoutActivityLoader ? 'Loging out...' : 'Log Out'}</Text>
                                        {
                                            logoutActivityLoader && (<ActivityIndicator size="small" color='#2E78FF' animating={logoutActivityLoader} />)
                                        }
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </>
                    )}

                </ScrollView>
            </ImageBackground>
        </SafeAreaView>

    );
}

export default Profile;
