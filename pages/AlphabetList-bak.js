import React, {Component} from 'react';
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
  PixelRatio
} from 'react-native';
import { Content } from 'native-base';
import Config from 'react-native-config';

var REQUEST_URL = Config.API_URL;
var style = require('../Themes/Style');

export default class NearestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL + "/organisation.json", {method: "GET"}).then((response) => response.json()).then((responseData) => {
      this.setState({
        dataSource: this
          .state
          .dataSource
          .cloneWithRows(responseData),
        loaded: false,
        noclinic: false
      })
    }).done();
  }

  render() {
    return this.renderOrganisation()
  }

  renderRow(rowData) {
    return (
        <View style={style.listContainer}>
            <View style={style.infoArea}>
                <Text style={style.listTitle}>{rowData
                .name
                .toUpperCase()}</Text>
                <Text style={style.infoSubtext}>
                    {rowData.alamat},{rowData.daerah},{rowData.negeri}
                </Text>
                </View>
            <View style={style.totalArea}>
                <Text style={style.listTitleCounter}>Total</Text>
                <Text style={style.listBigNoCounter}>9</Text>
            </View>
          
        </View>
    )
  }

  renderOrganisation() {
    return (
      <View style={style.container}>
      <Content>
      <ListView 
        renderRow={this.renderRow} 
        dataSource={this.state.dataSource} />
        </Content>
    </View>
    );
  }
}
