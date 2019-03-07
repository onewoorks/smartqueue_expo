import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Header, Title} from 'native-base';
import { TabViewAnimated, TabBarTop} from 'react-native-tab-view';

import NearestList from './NearestList'
import AlphabetList from './AlphabetList'
import QueueList from './QueueList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class Listing extends Component {
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Distance' },
      { key: '2', title: 'A-Z' },
      { key: '3', title: 'No. Q'}
    ],
  };

  _handleChangeTab = (index) => {
    this.setState({ index });
  };

  _renderHeader = (props) => {
    return <TabBarTop {...props} />;
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return <NearestList />;
    case '2':
      return <AlphabetList  />;
    case '3':
        return <QueueList />;
    default:
      return null;
    }
  };

  render() {
    return (

      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
      />
    );
  }
}
