import React, {useState ,useEffect} from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import {requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location';

function Main({navigation}){
    const [currentRegion, setcurrentRegion] = useState(null);

    useEffect( () => {
        async function loadInitialPosition(){
        const {granted} =  await requestPermissionsAsync();
        if (granted){
            const {coords} = await getCurrentPositionAsync({
                enableHighAccuracy: true,
            });

            const {latitude, longitude} = coords;
            setcurrentRegion({
                latitude,
                longitude,
                latitudeDelta: 0.04,
                longitudeDelta: 0.04,
            })
        }

        }

        loadInitialPosition();

    }, [] );

    if(!currentRegion){
        return null;
    }
    return (
    <MapView initialRegion = {currentRegion} style={styles.map}>
    <Marker coordinate = {{ latitude : -6.9595139, longitude : -41.7187162}} >
        <Image style={styles.avatar} source = {{uri: 'https://avatars0.githubusercontent.com/u/59843461?s=460&v=4'}} />
        
        <Callout onPress={() => {
            navigation.navigate('Profile', {github_username: 'joaocarlos-losfe'});
        }}>
            <View style={styles.callout} >
                <Text style={styles.devName}>João Carlos</Text>
                <Text style={styles.devBio}>Adoro criar e improvisar...</Text>
                <Text style={styles.devTechs}>C/C++, JavaScript, Python</Text>
            </View>
        </Callout>
    </Marker>
    </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },

    avatar:{
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 0,
        borderColor: '#FFF'
    },

    callout:{
        width: 240,
        borderRadius:3,
    },

    devName:{
        fontWeight: 'bold',
        fontSize: 16,
    },

    devBio:{
        color: '#666',
        marginTop: 5,

    },

    devTechs: {
        marginTop: 5,
    },
})

export default Main;

