import React, {Component} from 'react';
import {StyleSheet, Dimensions, Alert} from 'react-native';
import { MapView } from 'expo';

import {Container, Content, Button, Header, Title, Icon, Footer, FooterTab} from 'native-base';
import SmartQTheme from '../../Themes/default';

var Config = require("../../config");

var height = Dimensions.get('window').height;

export default class OrganisationMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgsid: this.props.orgsid,
      url : 'https://onewoorks-solutions.com',
      org_data: this.props.navigation.getParam('org_data')
    }
  }

  componentDidMount() { 
    navigator
      .geolocation
      .getCurrentPosition((position) => {
        var initialPosition = JSON.stringify(position);
        console.log(initialPosition)
        this.setState({ initialPosition});
      }, (error) => alert(JSON.stringify(error)), {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      });
  }

  handleClick() {
    Alert.alert('test');
    // Linking.canOpenURL(this.state.url).then(supported => {
    //   if (supported) {
    //     Linking.openURL(this.state.url);
    //   } else {
    //     console.log('Don\'t know how to open URI: ' + this.props.url);
    //   }
    // });
  };
  handleCall(){
    Alert.alert('call +60 12 3312 221?');
  }

  render() {
    const organisationPage = () => this.props.navibation.navigate('orgInfo',{ orgid: this.state.org_data.id });
    return (
      <Container theme={SmartQTheme}>
        <Content>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={this.handleCall}><Icon name='ios-call' />Call</Button>
            <Button><Icon name='ios-car' />Transport</Button>
          </FooterTab>
        </Footer>
      </Container>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  map: {
    height: height-118
  },
  titleLagend: {
    fontWeight: 'bold'
  },
  preRegisterButton: {
    marginTop: 10,
    backgroundColor: '#0090f7'
  }
});
