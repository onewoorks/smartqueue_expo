import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
    Container,
    Content,
    Card,
    CardItem
} from 'native-base';
import SmartQTheme from '../Themes/default';

var style = require('../Themes/Style');

export default class Department extends Component {

    render() {
        const Passport = () => this.props.navigation.navigate('listing',{title:"Passport"})
        return (
            <Container theme={SmartQTheme}>
                <Content style={style.content}>
                    <Card>
                        <CardItem button onPress={Passport}>
                            <Text>Passport</Text>
                        </CardItem>
                    </Card>
                    
                    <Card>
                        <CardItem button onPress={() => this.props.navigation.navigate('listing',{ title: 'Visa' })}>
                            <Text>Visa</Text>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem button onPress={() => this.props.navigation.navigate('listing',{ title: 'PLS' })}>
                            <Text>PLS</Text>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem button onPress={() => this.props.navigation.navigate('listing',{ title: 'Esd' })}>
                            <Text>ESD</Text>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem button onPress={() => this.props.navigation.navigate('listing',{ title: 'PLKS' })}>
                            <Text>PLKS</Text>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem button onPress={() => this.props.navigation.navigate('listing',{ title: 'PRA' })}>
                            <Text>PRA</Text>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}