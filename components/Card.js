import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

const placeholderImage = require('../assets/images/placeholder.jpg');

const Card = ({ navigation, item = {} }) => {
    const handlePress = () => navigation.navigate('Detail', {
        movieId: item.id,
    });

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handlePress}
        >
            <Image
                resizeMode="cover"
                style={styles.image}
                source={
                    item.poster_path
                        ? { uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path }
                        : placeholderImage
                }
            />
            {!item.poster_path && <Text style={styles.name}>{item.title}</Text>}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        position: 'relative',
        alignItems: 'center',
        height: 200,
        marginBottom: 5,
    },
    image: {
        width: 120, 
        height: 200,
        borderRadius: 20,
    },
    name: {
        position: 'absolute',
        width: 100,
        top: 10,
        textAlign: 'center',
    },
});

export default Card;