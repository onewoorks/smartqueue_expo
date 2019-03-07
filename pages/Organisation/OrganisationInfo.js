import React, { Component } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import {
    Container,
    Button,
    Content,
    Card,
    CardItem,
    Icon,
    Right,
    Left,
    Body
} from 'native-base';

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

import SmartQTheme from '../../Themes/default';

var Config = require("../../config");

var REQUEST_URL = Config.BASE_URL;
var IMAGE_URL = Config.IMAGE_URL

var style = require('../../Themes/Style');
var height = Dimensions
    .get('window')
    .height;

export default class OrganisationInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageHeight: (height / 2),
            orgid: this.props.navigation.getParam('orgid')
        }
    }

    componentDidMount() {
        this.fetchData();
        navigator
            .geolocation
            .getCurrentPosition((position) => {
                this.setState({ my_location: position.coords });
            }, (error) => alert(JSON.stringify(error)), {
                    enableHighAccuracy: true,
                    timeout: 20000,
                    maximumAge: 1000
                });
    }

    fetchData() {
        fetch(REQUEST_URL + '/organisation.json?imi-info=' + this.state.orgid, { method: "GET" }).then((response) => {
            return response.json()
        }).then((responseData) => {
            return responseData;
        }).then((data) => {
            this.setState({
                fullData: data,
                orgName: data
                    .name
                    .toUpperCase(),
                orgAddress: data.address_1 + ', ' + data.address_2,
                orgDaerah: data.daerah,
                orgNegeri: data.negeri,
                orgQueue: data.que_no,
                orgCurrent: data.current_no,
                orgWaitingTime: (data.que_no - data.current_no) * 10,
                orgEstimate: data.estimate,
                orgImage: data.ref_code,
                latitude: data.latitude,
                longitude: data.longitude,
                ramaining: data.max_out - data.que_no
            })
        }).done();
    }

    render() {
        const goToPreRegister = () => this.props.navigation.navigate('preRegister', { org_data: this.state.fullData });
        var imageUri = IMAGE_URL + this.state.orgImage + '1.jpg';
        return (
            <Container theme={SmartQTheme}>


                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Content style={{ padding: 8 }}>
                        <Card >
                            <CardItem>
                                <Body>
                                    <Text style={style.textTitle}>{this.state.orgName}</Text>
                                    <Text style={style.textSubtitle} note>{this.state.orgAddress}</Text>
                                </Body>

                            </CardItem>

                            <CardItem cardBody>
                                <Image source={{ uri: imageUri }}
                                    style={{ height: 200, width: null, flex: 1 }} />
                            </CardItem>

                            <CardItem cardBody>
                                <Left>
                                    <Button transparent onPress={() => this.props.navigation.navigate('orgMap', { org_data: this.state.fullData, my_location: this.state.my_location })}>
                                        <Icon
                                            name='ios-pin'
                                            style={{
                                                color: '#005e2d',
                                                fontSize: 30
                                            }} />
                                    </Button>
                                </Left>
                                <Right>
                                    <Button transparent onPress={() => this.props.navigation.navigate('orgDetail', { orgid: this.state.orgid })}>
                                        <Icon
                                            name='ios-information-circle'
                                            style={{
                                                color: '#005e2d',
                                                fontSize: 30
                                            }} />
                                    </Button>
                                </Right>
                            </CardItem>
                        </Card>

                        <View style={style.informationRemaining}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 20, color: '#fff' }}>Remaining</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Text style={style.informationRemainingText}>{this.state.ramaining}</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: '#005e2d',
                                    padding: 10
                                }}>
                                <View
                                    style={{
                                        flex: 0.3,
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            color: '#fff'
                                        }}>Total</Text>
                                </View>
                                <View
                                    style={{
                                        flex: 0.3,
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            color: '#fff'
                                        }}>Status</Text>
                                </View>
                                <View
                                    style={{
                                        flex: 0.4,
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            color: '#fff'
                                        }}>Estimate</Text>
                                </View>
                            </View>

                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    padding: 10,
                                    borderWidth: 1,
                                    borderColor: '#005e2d'
                                }}>
                                <View
                                    style={{
                                        flex: 0.3,
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 24
                                        }}>{this.state.orgQueue}</Text>
                                </View>
                                <View
                                    style={{
                                        flex: 0.3,
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 24
                                        }}>{this.state.orgCurrent}</Text>
                                </View>
                                <View
                                    style={{
                                        flex: 0.4,
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 24
                                        }}>{this.state.orgEstimate}</Text>
                                </View>
                            </View>
                        </View>

                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 30
                            }}>



                            <View style={{
                                alignItems: 'center', height: 55,
                                width: deviceWidth, justifyContent: 'center', marginLeft: -8
                            }} >
                                <TouchableOpacity
                                    onPress={goToPreRegister}
                                    style={{ backgroundColor: '#005e2d', width: deviceWidth, flex: 1, alignItems: 'center' }}>}}>
                                        <Text style={{
                                        fontSize: 18,
                                        paddingTop: 14,
                                        paddingBottom: 14, color: '#fff',
                                        fontWeight: 'bold'
                                    }}>GET MY NUMBER</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Content>
                </View>

            </Container>
        );
    }
}