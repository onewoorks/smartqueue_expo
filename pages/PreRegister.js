import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import {
    Container,
    Header,
    Content,
    Input,
    Title, Card, CardItem,
    Icon, InputGroup, Body, Left, Right,
    Button} from 'native-base';
import SmartQTheme from '../Themes/default';
import { Actions } from 'react-native-router-flux'

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

var style = require('../Themes/Style');

export default class PreRegister extends Component {
    constructor(props){
        super(props);
        this.state = {
            detailInfo: false,
            submitText: 'Submit',
            processing: false,
            org: this.props.navigation.getParam('org_data')
        },
        console.log(this.props)
        this.openDetail = this.openDetail.bind(this);
    }

    openDetail(){
        this.setState({
            detailInfo: true,
            submitText: 'Clear'
        })
    }

    render(){
        const getMyNumber = () => this.props.navigation.navigate('myNumber',{ orgid: this.state.org.id });
        return(
             <Container theme={SmartQTheme}>
                <Content>
                    <View style={{ margin:15}}>
                        <View >
                            <Text style={{ marginBottom: 15 }}>ID No</Text>
                            <InputGroup borderType='regular'>
                                <Input placeholder='Identification Number'
                                />
                            </InputGroup>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems:'center'}}>
                            <View style={{ marginTop: 10 }}>
                            <View style={{flex:1, justifyContent:'center'}}>
                                <TouchableOpacity 
                                    style={[style.buttonColor,{width:130 , alignContent:'center'}]} onPress={this.openDetail}>
                                    <Text style={{color:'#fff', padding:8}}>{this.state.submitText.toUpperCase()}</Text>
                            </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        {this.state.detailInfo ?
                            <Card style={{ flex: 0, marginTop:10 }}>
                                <CardItem>
                                    <Left>
                                        <Text style={styles.labelFirst}>Name</Text>
                                    </Left>
                                    <Right>
                                        <Text>Aminah Bte Ali</Text>
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                        <Text style={styles.label}>Date Of Birth</Text>
                                    </Left>
                                    <Right>  
                                        <Text>02 April 1978</Text>
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Left><Text style={styles.label}>Address</Text></Left>
                                    <Right>
                                        <Text>No 8 Jalan 7/5, Taman Bahagia</Text>
                                        <Text>Subang Jaya, Selangor</Text>
                                    </Right>
                                </CardItem>
                            </Card>
                            :null}
                    </View>


                    <View style={ [{top:deviceHeight-113, 
                        position:'absolute', 
                        width:deviceWidth}, style.buttonColor]}>
                        <View style={{alignItems:'center'}}>
                            {this.state.detailInfo ?
                                
                                    <TouchableOpacity onPress={getMyNumber}>
                                    <Text style={{ 
                                        fontSize: 18, 
                                        paddingTop: 14, 
                                        paddingBottom: 14, color:'#fff',
                                        fontWeight:'bold' }}>GET MY NUMBER</Text>
                                    </TouchableOpacity>
                                : null}
                        </View>
                    </View> 
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    labelFirst: {
        fontWeight:'600'
    },
    label: {
        marginTop:15,
        fontWeight: '600'
    },
    buttonColor: {
        backgroundColor : '#005e2d',
        width: 90
    }
});