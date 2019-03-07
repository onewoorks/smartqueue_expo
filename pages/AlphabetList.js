import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  List,
  ListView,
  ScrollView,
  Image,
  TabBarIOS,
  Card,
  TouchableOpacity,
  TouchableHighlight,
  PixelRatio
} from 'react-native';
import { Content, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';

var style = require('../Themes/Style');

var Config = require("../config");

var REQUEST_URL = Config.BASE_URL;

export default class AlphabetList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      organisation: false
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    console.log(REQUEST_URL + "/organisation.json?imi-alphabet");
    fetch(REQUEST_URL + "/organisation.json?imi-alphabet", { method: "GET" }).then((response) => response.json()).then((responseData) => {
      this.setState({
        dataSource: this
          .state
          .dataSource
          .cloneWithRows(responseData)
      })
    }).done();
  }

  render() {
    return this.renderOrganisation()
  }

  renderRow(rowData) {
    const organisationPage = () => Actions.orgInfo({ orgid: rowData.id });
    return (
      <View style={style.listContainer}>

        <View style={style.infoArea}>
          <Text
            onPress={organisationPage}
            style={style.listTitle}>{rowData
              .name
              .toUpperCase()}</Text>
          <Text style={style.infoSubtext}>
            {rowData.alamat},{rowData.daerah},{rowData.negeri}
          </Text>
        </View>
        <View style={style.greyArea}></View>
        <View style={style.alphabetArea}>
          <Text style={style.listBigNoCounter}>{rowData.alpha}</Text>
        </View>
      </View>
    )
  }

  renderOrganisation() {
    return (
      <Content style={style.container}>
        <ListView renderRow={this.renderRow} dataSource={this.state.dataSource} />
      </Content>
    );
  }
}