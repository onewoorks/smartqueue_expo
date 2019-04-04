import React, { Component } from 'react';
import { Image } from 'react-native';
import Onboarding from 'react-native-simple-onboarding';

var Config = require("../config");

var ASSETS_URL = Config.ASSETS

export default class OnboardingScreen extends Component {
  static navigationOptions = {
    headerMode: 'none'
  }

  render() {
    const goToDepartment = () => this.props.navigation.navigate('department')
    const firstImage = ASSETS_URL + 'queue.png'
    const secondImage = ASSETS_URL + 'imi-logo.png'
    console.log(firstImage)
    return (
      <Onboarding
        pages={[
          {
            backgroundColor: '#005e2d',
            image: <Image
              source={{ uri: secondImage }}
              style={{ height: 261, width: 196 }} />,
            title: '',
            subtitle: 'Queue system make your waiting easy, Wait anywhere you like!'
          },
          {
            backgroundColor: "#005e2d",
            image: <Image
              source={{ uri: firstImage }}
              style={{ height: 280, width: 240 }} />,
            title: '',
            subtitle: 'Queue system make your waiting easy. Wait anywhere you like!'
          }
        ]}
        onEnd={goToDepartment}
      />

    );
  }
}
