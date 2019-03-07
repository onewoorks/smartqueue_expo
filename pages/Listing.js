import React, { Component } from 'react';
import {  Text, Image, StyleSheet, Dimensions, View } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body
} from 'native-base';

import SmartQTheme from '../Themes/default';

import NearestList from './NearestList'
import AlphabetList from './AlphabetList'
import QueueList from './QueueList';

var deviceHeight = Dimensions
  .get('window')
  .height;
var ScrollableTabView = require('react-native-scrollable-tab-view');
import { Actions } from 'react-native-router-flux';

export default class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: deviceHeight - 64,
      title: this.props.navigation.state.params.title,
      navigation: this.props.navigation
    }
  }

  render() {
    const { navigation } = this.props
    return (
      <Container theme={SmartQTheme}>
        <Header style={{ backgroundColor: "#005e2d", borderWidth: 0 }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('department')}>
              <Image source={require('../assets/logo-top.png')} />
            </Button>
          </Left>

          <Body>
            <Title style={{ color: 'white' }}>{this.state.title.toUpperCase()}</Title>
          </Body>

          <Right>
            <Button transparent>
              <Icon
                name='ios-search'
                style={{
                  color: '#fff'
                }}
                onPress={Actions.search} />
            </Button>
          </Right>
        </Header>
        <Content>
          <ScrollableTabView
            style={{ height: this.state.height }}
            initialPage={0}
            tabBarTextStyle={{
              color: '#fff',
              fontSize: 15
            }}
            tabBarBackgroundColor={'#005e2d'}>
            <QueueList tabLabel="No. Q" navigation={navigation}/>
            <NearestList tabLabel="Distance (km)" navigation={navigation}/>
          </ScrollableTabView>
        </Content>
      </Container>
    );
  }
}
