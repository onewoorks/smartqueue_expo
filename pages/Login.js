import React, {Component} from 'react';
import {View, Text, TextInput, Image} from 'react-native';
import { 
    Container, Content, Button,List,ListItem, InputGroup, Icon, Input, Thumbnail } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class Login extends Component{
    render(){
        const goToPreRegister = () => Actions.preRegister();
        return (
            <Container>
            <Content>
                <View style={{flex:1, alignItems:'center', marginTop:120}}>
                    <Thumbnail square size={200} source={require('../assets/logo-1stpage.png')} />
                </View>
                <View style={{margin:30, marginTop:60}}>
                    <InputGroup borderType='underline'>
                        <Icon name='ios-mail' />
                        <Input placeholder='email' />
                    </InputGroup>

                    <InputGroup borderType='underline'>
                        <Icon name='ios-unlock' />
                        <Input placeholder='password' />
                    </InputGroup>
                </View>

                <View style={{margin:10}}>
                    <Button 
                        block 
                        style={{backgroundColor:'#005e2d'}}
                        onPress={goToPreRegister}>Sign Up!</Button>
                </View>
            
            </Content>
            </Container>
        );
    }
}