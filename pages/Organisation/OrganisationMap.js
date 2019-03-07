import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Alert, Platform } from 'react-native';
import { Container, Content, Button, Icon, Footer, FooterTab } from 'native-base';
import { Constants, MapView } from 'expo';

import SmartQTheme from '../../Themes/default';

// Using a local version here because we need it to import MapView from 'expo'
import MapViewDirections from '../src/MapViewDirections';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyCYvMpmVhFc0ydILEuXGJNYNGFnBoKPCL8';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      org_data: this.props.navigation.getParam('org_data'),
      my_location: this.props.navigation.getParam('my_location'),
      coordinates: [
        {
          latitude: 37.3317876,
          longitude: -122.0054812,
        },
        {
          latitude: 3.13273,
          longitude: 101.55263,
        },
      ],
    };

    this.mapView = null;
  }

  componentDidMount() {
    navigator
      .geolocation
      .getCurrentPosition((position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({ origin: position.coords });
      }, (error) => alert(JSON.stringify(error)), {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000
        });
  }

  onReady = (result) => {
    this.mapView.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: (width / 20),
        bottom: (height / 20),
        left: (width / 20),
        top: (height / 20),
      }
    });
  }

  onError = (errorMessage) => {
    Alert.alert(errorMessage);
  }

  render() {
    const destination = {
      latitude: parseFloat(this.state.org_data.latitude),
      longitude: parseFloat(this.state.org_data.longitude)
    }
    const origin = {
      latitude: parseFloat(this.state.my_location.latitude),
      longitude: parseFloat(this.state.my_location.longitude)
    }
    if (Platform.OS === 'android') {
      return (
        <View style={styles.container}>
          <Text>
            {"For some reason Android crashes here on Expo, so you'll have to test this with iOS … Sorry"}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <MapView
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          style={StyleSheet.absoluteFill}
          ref={c => this.mapView = c} // eslint-disable-line react/jsx-no-bind
          onPress={this.onMapPress}
          loadingEnabled={true}
        >
          <MapView.Marker coordinate={origin} />
          <MapView.Marker coordinate={destination} />

          {(this.state.coordinates.length === 2) && (
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="hotpink"
              onReady={this.onReady}
              onError={this.onError}
            />
          )}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});