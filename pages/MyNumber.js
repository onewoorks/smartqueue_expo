import React, {Component} from 'react';
import { View, Text, Image, TouchableHighlight, ImageBackground} from 'react-native';
import {
    Container,
    Button,
    Title,
    Header,
    Content,
    Card,
    CardItem,
    Icon
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import SmartQTheme from '../Themes/default';

var Config = require('../config')
var REQUEST_URL = Config.BASE_URL;

const QRCode = require('react-native-qrcode');

export default class MyNumber extends Component {
    constructor(props){
        super(props);
        this.state = {
            org: this.props.navigation.getParam('orgid')
        }
    }
     componentDidMount() {
       this.fetchData();
    }

    fetchData() {
        console.log(REQUEST_URL + '/organisation.json?addid=' + this.state.org);
        fetch(REQUEST_URL + '/organisation.json?addid=' + this.state.org, {method: "POST"}).then((response) => {
            return response.json()
        }).then((responseData) => {
            return responseData;
        }).then((data) => {
            this.setState({
                orgName: data
                    .name
                    .toUpperCase(),
                orgQueue: data.que_no,
                orgCurrent: data.current_no,
                orgWaitingTime: (data.que_no - data.current_no) * 10,
                orgEstimate: data.estimate
            })
        }).done();
    }

    render() {
        return (
            <Container theme={SmartQTheme}>

                <Content style={{
                    padding: 8
                }}>

                    <View
                        style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10,
                        marginBottom: 10
                    }}>
                        <Text
                            style={{
                            fontSize: 20,
                            textAlign: 'center'
                        }}>Your Pre-Register : Success
                        </Text>
                    </View>
                    <View
                        style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                        <View
                            style={{
                            flex: 0.5,
                            flexDirection: 'column',
                            alignItems: 'center',
                            paddingTop:20, paddingLeft:0, paddingBottom:20
                        }}>
                            <QRCode value='RD0W0' size={128} bgColor='black' fgColor='white'/>
                            <Text>RD0W0</Text>
                        </View>
                        <View
                            style={{
                            flex: 0.5,
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <ImageBackground
                                source={require('../assets/ticket.png')}
                                style={{
                                marginTop: 20, width: 130, height:130
                            }}>
                                <View
                                    style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text
                                        style={{
                                        fontSize: 60,
                                        color: '#fff'
                                    }}>{this.state.orgQueue}</Text>
                                </View>
                            </ImageBackground>
                            <Text
                                style={{
                                marginTop: 16
                            }}>Your Q No.</Text>
                        </View>
                    </View>

                    <View style={{
                        marginTop: 10
                    }}>
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
                        marginTop: 10
                    }}></View>
                    <Image
                        style={{
                        resizeMode: 'cover',
                        width: null,
                        height: 130
                    }}
                        source={require('../assets/ads/colgate.jpg')}/>
                </Content>
            </Container>
        );
    }
}