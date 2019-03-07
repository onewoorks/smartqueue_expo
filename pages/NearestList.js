import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
} from 'react-native';
import { Content, Button } from 'native-base';

var style = require('../Themes/Style');

var Config = require("../config");

var REQUEST_URL = Config.BASE_URL;

export default class NearestList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      organisation: false,
      coordinate: null
    }
    this.renderRow = this.renderRow.bind(this)
  }

  componentDidMount() {
    navigator
      .geolocation
      .getCurrentPosition((position) => {
        this.setState({ coordinate: position });
        this.fetchData();
      }, (error) => alert(JSON.stringify(error)), {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000
        }); 
  }

  fetchData() {
    let lat = this.state.coordinate.coords.latitude
    let long = this.state.coordinate.coords.longitude
    console.log(lat)
    console.log(long)
    let url = REQUEST_URL + "/organisation.json?distance&lat="+ lat + "&long="+ long
    console.log(url)
    fetch(url, { method: "GET" })
      .then((response) => response.json())
      .then((responseData) => {
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
    const organisationPage = () => this.props.navigation.navigate('orgInfo',{ orgid: rowData.id });
    var address_2;
    if (rowData.address_2=="") {
    } else {
      address_2 = <Text style={style.infoSubtext}>{rowData.address_2}</Text>;
    }
    return (
      <View style={style.listContainer}>
        <View style={style.infoArea}>
          <Text
            onPress={organisationPage}
            style={style.listTitle}>{rowData
              .name
              .toUpperCase()}</Text>
          <Text style={style.infoSubtext}>{rowData.address_1}</Text>
          {address_2}
          <Text style={style.infoSubtext}>{rowData.postcode}, {rowData.town}, {rowData.state}</Text>
        </View>
        <View style={{flex:0.3}}>
          <View style={[style.distanceArea]}>
            <Text style={style.listTitleCounter}>KM</Text>
            <Text style={style.listBigNoCounter}>{rowData.distance}</Text>
          </View>

          <View style={style.remainingArea}>
            <Text style={{ fontSize: 10, paddingTop: 3, color: '#fff' }}>Remaining</Text>
            <Text style={{ fontSize: 14, color: '#fff', fontWeight: 'bold' }}>{rowData.max_out}</Text>
          </View>
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