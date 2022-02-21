import React, { useState, useEffect, Fragment } from 'react';
import { ScrollView, StyleSheet, Image, ActivityIndicator, Dimensions, Text, View, Modal, Pressable } from 'react-native';
import { getMovie } from '../services/services';
import StarRating from 'react-native-star-rating';
import dateFormat from 'dateformat';
import PlayButton from '../components/PlayButton';
import Video from '../components/Video';

const placeholderImage = require('../assets/images/placeholder.jpg');
const dimensions = Dimensions.get('screen');
const height = dimensions.height;

const Detail = ({ route, navigation }) => {
    const movieId = route.params.movieId;

    const [movieDetail, setMovieDetail] = useState();
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    
    useEffect(() => {
        setError(false);
        setLoaded(false);
        getMovie(movieId)
            .then(movie => {
                setMovieDetail(movie);
                setLoaded(true);
            })
            .catch(err => {
                setError(true);
            });
    }, [movieId]);

    const videoShown = () => {
        setModalVisible(!modalVisible);
    }

    return (
        <Fragment>
            {loaded && !error && (
                <View>
                    <ScrollView>
                        <Image
                            resizeMode="cover"
                            style={styles.image}
                            source={
                                movieDetail.poster_path
                                    ? { uri: 'https://image.tmdb.org/t/p/w500' + movieDetail.poster_path }
                                    : placeholderImage
                            }
                        />
                        <View style={styles.container}>
                            <View style={styles.playBtn}>
                                <PlayButton handlePress={videoShown} />
                            </View>
                            <Text style={styles.title}>{movieDetail.title}</Text>
                            {movieDetail.genres && (
                                <View style={styles.genresContainer}>
                                    {movieDetail.genres.map(genre => (
                                        <Text style={styles.genre} key={genre.id}>{genre.name}</Text>
                                    ))}
                                </View>
                            )}
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={movieDetail.vote_average / 2}
                                fullStarColor={'gold'}
                                starSize={30}
                            />
                            <Text style={styles.overview}>{movieDetail.overview}</Text>
                            <Text style={styles.release}>{'Release  date: ' + dateFormat(movieDetail.release_date, 'mmmm dS, yyyy')}</Text>
                        </View>
                    </ScrollView>
                    <Modal
                        supportedOrientations={['portrait', 'landscape']}
                        animationType="slide"
                        visible={modalVisible}
                    >
                        <View style={styles.videoModal}>
                            <Video onClose={videoShown} />
                        </View>
                    </Modal>
                </View>
            )}
            {!loaded && <ActivityIndicator size="large" />}
            {error && <Error />}
        </Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: { 
        height: height / 2.5,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    genresContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        marginBottom: 10,
    },
    genre: {
        marginRight: 5,
        marginLeft: 5,
        fontWeight: 'bold',
    },
    overview: {
        padding: 15,
    },
    release: {
        fontWeight: 'bold',
        marginBottom: 20,
    },
    playBtn: {
        position: 'absolute',
        top: -40,
        right: 20,
    },
    videoModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Detail;