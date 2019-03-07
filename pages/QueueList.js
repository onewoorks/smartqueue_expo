import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableOpacity,
} from 'react-native';

var Config = require("../config");

var REQUEST_URL = Config.BASE_URL;
var style = require('../Themes/Style');

export default class NearestList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      organisation: false,
    }
    this.renderRow = this.renderRow.bind(this)
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL + "/organisation.json?quesortImi", { method: "GET" }).then((response) => response.json()).then((responseData) => {
      this.setState({
        dataSource: this
          .state
          .dataSource
          .cloneWithRows(responseData),
        loaded: false,
        noclinic: false,
      })
    }).done();
  }

  render() {
    return this.renderOrganisation();
  }

  renderRow(rowData) {
    const organisationPage = () => this.props.navigation.navigate('orgInfo', { orgid: rowData.id });
    return (
      <View style={style.listContainer}>
        <View style={style.infoArea} >
          <TouchableOpacity onPress={organisationPage}>
            <Text
              style={style.listTitle} onPress={organisationPage}>{rowData
                .name
                .toUpperCase()}</Text>
            <Text style={style.infoSubtext}>
              {rowData.address_1},{rowData.address_2},{rowData.negeri}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex:0.3 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={style.totalArea}>
              <Text style={style.listTitleCounter}>Total</Text>
              <Text style={style.listBigNoCounter}>{rowData.que_no}</Text>
            </View>
            <View style={style.statusArea}>
              <Text style={style.listTitleCounter}>Current</Text>
              <Text style={style.listBigNoCounter}>{rowData.current_no}</Text>
            </View>
          </View>
          <View style={style.remainingArea}>
            <Text style={{ fontSize: 10, paddingTop: 3, color: '#fff' }}>Remaining</Text>
            <Text style={{ fontSize: 14, color: '#fff', fontWeight: 'bold' }}>{rowData.max_out - rowData.que_no}</Text>
          </View>
        </View>

      </View>
    )
  }

  renderOrganisation() {
    const { navigation } = this.props
    return (<ListView renderRow={this.renderRow} dataSource={this.state.dataSource} />);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})
