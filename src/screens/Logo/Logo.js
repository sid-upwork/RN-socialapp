import React from 'react';
import { Image, StyleSheet } from 'react-native';
import images from '../../utils/ImagesUtil';

export default Logo = () => {
    return (
        <Image style={styles.imageContainer} source={images.appLogo} />
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center'
    }
})