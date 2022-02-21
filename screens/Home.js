import React, { useState, useEffect, Fragment } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { getPopularMovies, getUpcomingMovies, getPopularTv, getFamilyMovies, getFantasyMovies } from '../services/services';
import { SliderBox } from "react-native-image-slider-box";
import List from '../components/List';
import Error from '../components/Error';

const dimensions = Dimensions.get('screen');

const Home = ({ navigation }) => {
    const [movieImages, setMovieImages] = useState();
    const [popularMovies, setPopularMovies] = useState();
    const [popularTv, setPopularTv] = useState();
    const [familyMovies, setFamilyMovies] = useState();
    const [fantasyMovies, setFantasyMovies] = useState();

    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const getData = () => Promise.all([
            getUpcomingMovies(),
            getPopularMovies(),
            getPopularTv(),
            getFamilyMovies(),
            getFantasyMovies(),
        ]);

    useEffect(() => {
        setError(false);
        setLoaded(false);
        getData()
            .then(([
                upcomingMoviesData,
                popularMoviesData,
                popularTvData,
                familyMoviesData,
                fantasyMoviesData,
            ]) => {
                const moviesImagesArray = [];
                upcomingMoviesData.forEach(movie => {
                    moviesImagesArray.push('https://image.tmdb.org/t/p/w500' + movie.poster_path);
                });
                setMovieImages(moviesImagesArray);
                setPopularMovies(popularMoviesData);
                setPopularTv(popularTvData);
                setFamilyMovies(familyMoviesData);
                setFantasyMovies(fantasyMoviesData);
            })
            .catch(err => {
                setError(true);
            })
            .finally(() => {
                setLoaded(true);
            });
    }, []);
    
    return (
        <Fragment>
            {loaded && !error && (
                <ScrollView>
                    {/* Upcoming Movies - Slider */}
                    {movieImages && (
                        <View style={styles.sliderContainer}>
                            <SliderBox
                                images={movieImages}
                                sliderBoxHeight={dimensions.height / 1.5}
                                dotStyle={styles.sliderStyle}
                                autoplay={true}
                                circleLoop={true}
                            />
                        </View>
                    )}
                    {/* Popular Movies */}
                    {popularMovies && (
                        <View style={styles.carousel}>
                            <List navigation={navigation} title="Popular Movies" content={popularMovies} />
                        </View>
                    )}
                    {/* Popular TV Shows */}
                    {popularTv && (
                        <View style={styles.carousel}>
                            <List navigation={navigation} title="Popular TV Shows" content={popularTv} />
                        </View>
                    )}
                    {/* Family Movies */}
                    {familyMovies && (
                        <View style={styles.carousel}>
                            <List navigation={navigation} title="Family Movies" content={familyMovies} />
                        </View>
                    )}
                    {/* Fantasy Movies */}
                    {fantasyMovies && (
                        <View style={styles.carousel}>
                            <List navigation={navigation} title="Fantasy Movies" content={fantasyMovies} />
                        </View>
                    )}
                </ScrollView>
            )}
            {!loaded && <ActivityIndicator size="large" />}
            {error && <Error />}
        </Fragment>
    );
}

const styles = StyleSheet.create({
    sliderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 20,
    },
    sliderStyle: {
        height: 0,
    },
    carousel: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default Home;