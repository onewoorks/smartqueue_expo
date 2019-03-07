import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {
    Container,
    Button,
    Body,
    Content,
    Card,
    CardItem,
    Icon,
    Footer,
    FooterTab,
} from 'native-base';
import SmartQTheme from '../../Themes/default';

var Config = require("../../config");

var REQUEST_URL = Config.BASE_URL;
var IMAGE_URL = Config.IMAGE_URL

var style = require('../../Themes/Style');

export default class OrganisationDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            orgid: this.props.navigation.getParam('orgid')
        }
        
    }
    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        console.log(REQUEST_URL + '/organisation.json?imi-info=' + this.state.orgid)
        fetch(REQUEST_URL + '/organisation.json?imi-info=' + this.state.orgid, {method: "GET"}).then((response) => {
            return response.json()
        }).then((responseData) => {
            return responseData;
        }).then((data) => {
            this.setState({
                orgName: data
                    .name
                    .toUpperCase(),
                orgAddress: data.address_1 + ', ' + data.address_2,
                orgDaerah: data.town,
                orgNegeri: data.state,
                orgQueue: data.que_no,
                orgCurrent: data.current_no,
                orgWaitingTime: (data.que_no - data.current_no) * 10,
                orgEstimate: data.estimate,
                imageNo: data.ref_code
            })
        }).done();
    }

    render() {
        var imageUri = IMAGE_URL + this.state.imageNo + '1.jpg';
        return (
            <Container theme={SmartQTheme}>
                <Content style={{
                    padding: 8
                }}>
                    <Card >
                        <CardItem>
                            <Body>
                                <Text style={style.textTitle}>{this.state.orgName}</Text>
                                <Text style={style.textSubtitle}  note>{this.state.orgAddress}, {this.state.orgDaerah}, {this.state.orgNegeri}</Text>
                            </Body>
                            
                            
                        </CardItem>
                        
                        <CardItem cardBody>
                            <Image source={{ uri: imageUri }}
                                style={{ height: 200, width: null, flex: 1 }} />
                        </CardItem>

                        <CardItem>
                            <Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Text>
                        </CardItem>
                    </Card>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button onPress={this.handleCall}><Icon name='ios-call'/>Call</Button>
                        <Button><Icon name='ios-map'/>Direction</Button>
                        <Button><Icon name='ios-car' />Transport</Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}