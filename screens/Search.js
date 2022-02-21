import React, { Fragment, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { searchMovieTv } from '../services/services';
import Card from '../components/Card';
import Error from '../components/Error';

const Search = ({ navigation }) => {
    const [text, onChangeText] = useState();
    const [searchResults, setSearchResults] = useState();

    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const onSubmit = (query) => {
        setError(false);
        setLoaded(false);
        Promise.all([
            searchMovieTv(query, 'movie'),
            searchMovieTv(query, 'tv'),
        ])
            .then(([movies, tvs]) => {
                const data = [...movies, ...tvs];
                setSearchResults(data);
            })
            .catch(err => {
                setError(true);
            })
            .finally(() => {
                setLoaded(true);
            });
    }

    return (
        <Fragment>
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeText}
                            value={text}
                            placeholder="Search Movie or TV Show"
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            onSubmit(text);
                        }}
                    >
                        <Icon name={'search-outline'} size={30} /> 
                    </TouchableOpacity>
                </View>
                
                <View style={styles.searchItems}>
                    {/* Searched items results */}
                    {searchResults && searchResults.length > 0 && (
                        <FlatList
                            numColumns={3}
                            data={searchResults}
                            renderItem={({ item }) => (
                                <Card navigation={navigation} item={item} />
                            )}
                            keyExtractor={item => item.id}
                        />
                    )}

                    {/* When searched but no results */}
                    {searchResults && searchResults.length == 0 && (
                        <View style={styles.noResults}>
                            <Text>No results matching your criteria.</Text>
                            <Text>Try different keywords.</Text>
                        </View>
                    )}

                    {/* When nothing is searched */}
                    {!searchResults && (
                        <View style={styles.empty}>
                            <Text>Type something to start searching.</Text>
                        </View>
                    )}
                    
                    {/* Error */}
                    {error && <Error />}
                </View>
            </SafeAreaView>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingTop: 52,
        flexDirection: 'row',
        alignItems: 'center',
    },
    form: {
        flexBasis: 'auto',
        flexGrow: 1,
        paddingRight: 8,
    },
    input: {
        borderRadius: 15,
        borderWidth: 1,
        height: 50,
        padding: 8,
    },
    searchItems: {
        padding: 5,
    },
    noResults: {
        paddingTop: 20,
    },
});


export default Search;