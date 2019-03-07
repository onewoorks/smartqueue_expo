import React, { Component } from 'react';
import { View, Text, Image, PickerIOS, StyleSheet, Animated, Dimensions, TouchableHighlight } from 'react-native';
import { 
    Container, 
    Button, 
    Title,
    Header,
    Content, 
    Card, 
    CardItem,
    Icon } from 'native-base';
import {Actions} from 'react-native-router-flux';
import SmartQTheme from '../Themes/default';

var PickerItemIOS = PickerIOS.Item;

var STATE_DISTRICT = {
  selangor: {
      name: 'Selangor',
      daerah: ['Ampang','Shah Alam']
  },
  johor: {
      name: 'Johor',
      daerah: ['']
  },
  kedah: {
      name: 'Kedah',
      daerah: ['']
  },
  kelantan: {
      name: 'Kelantan',
      daerah: ['']
  },
  kualalumpur: {
      name: 'Kuala Lumpur',
      daerah: ['']
  },
  melaka: {
      name: 'Melaka',
      daerah: ['']
  },
  negerisembilan: {
      name: 'Negeri Sembilan',
      daerah : ['']
  },
  pahang: {
      name: 'Pahang',
      daerah: ['']
  },
  penang: {
      name: 'Penang',
      daerah: ['']
  },
  perak: {
      name: 'Perak',
      daerah: [''] 
  },
  perlis: {
      name: 'Perlis',
      daerah: ['']
  },
  sabah: {
      name: 'Sabah',
      daerah: ['']
  },
  serawak: {
      name: 'Sarawak',
      daerah: ['']
  }

};

var deviceHeight = Dimensions.get('window').height;

export default class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            negeri: 'selangor',
            modelIndex: 0,
            modal: false,
            offSet: new Animated.Value(deviceHeight),
            };
        }

    render(){
        const organisationDetail = () => Actions.orgDetail();
        const getMyNumber = () => Actions.myNumber();
        const goToListing = () => Actions.listing()

        var stateDistrict = STATE_DISTRICT[this.state.negeri];
        var state = stateDistrict.name;
        var district = stateDistrict.daerah[this.state.modelIndex]
        var selectionString = stateDistrict.name + ' ' + stateDistrict.daerah[this.state.modelIndex];

        return(
            <Container theme={SmartQTheme}> 
                <Header>
                    <Button transparent disabled>
                        <Icon name='ios-list-outline' style={{color:'white'}} onPress={()=>Actions.listing()}
                        />
                    </Button>
                    <Title style={{color:'#fff'}}>Search</Title>
                </Header>

                <Content style={{padding:8}}>

                <Button block>{state}</Button>
                    <View style={styles.hideme}>
                        <PickerIOS
                            selectedValue={this.state.negeri}
                            onValueChange={(negeri) => this.setState({negeri, modelIndex: 0})}>
                            {Object.keys(STATE_DISTRICT).map((negeri) => (
                            <PickerItemIOS
                                key={negeri}
                                value={negeri}
                                label={STATE_DISTRICT[negeri].name}
                            />
                            ))}
                        </PickerIOS>
                    </View>

                    <Button block>{district}</Button>
                        <View style={styles.hideme}>
                            <PickerIOS
                                selectedValue={this.state.modelIndex}
                                key={this.state.negeri}
                                onValueChange={(modelIndex) => this.setState({modelIndex})}>
                                {STATE_DISTRICT[this.state.negeri].daerah.map((modelName, modelIndex) => (
                                <PickerItemIOS
                                    key={this.state.negeri + '_' + modelIndex}
                                    value={modelIndex}
                                    label={modelName}
                                />
                                ))}
                            </PickerIOS>
                        </View>

                        <Button block onPress={goToListing}>Search</Button>
                </Content>
            </Container>
        );
    }
}



const styles = StyleSheet.create({
    hideme: {
        // width:0,height:0
    },
});