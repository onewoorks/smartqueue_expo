'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PickerIOS, 
  Animated,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import { Container, Content, Header, Button } from 'native-base';

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var showtimes = [{time: '12:30'},{time: '2:30'},{time: '4:30'}, {time:'5:30'}, {time:'6:30'}, {time:'7:00'}, {time:'8:30'}];
var PickerItemIOS = PickerIOS.Item;

export default class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            time: '7:00',
    	      modal: false,
            timeIndex:0,
    	      offSet: new Animated.Value(deviceHeight),
        }
         this.changeTime = this.changeTime.bind(this);
    }
  
  changeTime(time) {
		this.setState({
            time,
            timeIndex: time
		})
        console.log(this.state.time);
	}
  
  render() {
    return (
        <Container>
            <Header>
            </Header>
            <Content>
                <View style={styles.container}>
                    <Button
                        block 
                        onPress={ () => this.setState({modal: true}) }
                        >
                            <Text style={styles.buttonText}>{showtimes[this.state.timeIndex].time}</Text>
                    </Button>
                    <View style={styles.showtimeContainer}>
                    
                    </View>
                    { this.state.modal ? 
                        <PickerState closeModal={() => this.setState({ modal: false })} offSet={this.state.offSet} changeTime={this.changeTime} showtime={this.state.time} /> : null }  
                </View>
            </Content>
     </Container>
    );
  }
};

var PickerState = React.createClass({
  componentDidMount: function() {
     Animated.timing(this.props.offSet, {
        duration: 300,
        toValue: 100
      }).start()
  },
  closeModal() {
   Animated.timing(this.props.offSet, {
        duration: 300,
        toValue: deviceHeight
      }).start(this.props.closeModal);
  },
  render() {
    return (
      <Animated.View style={{ transform: [{translateY: this.props.offSet}] }}>
          <View style={styles.closeButtonContainer}>
            <Button 
                transparent
                onPress={ this.closeModal } 
                style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Choose</Text>
            </Button>
          </View>
          <PickerIOS
          selectedValue={this.props.showtime}
          onValueChange={(time) => this.props.changeTime(time)}>
          {Object.keys(showtimes).map((time) => (
            <PickerItemIOS
              key={time}
              value={time}
              label={showtimes[time].time}
            />
          ))}
        </PickerIOS>
      </Animated.View>
    )
  }
})

var styles = StyleSheet.create({
  container: {
    flex: 1,
   	marginTop: 60
  },
  showtimeContainer: {
  	borderTopColor: '#ededed', 
    borderTopWidth:1
  },
  showtime: {
  	padding:20, 
    textAlign: 'center'
  },
  button: {
  	marginTop:25, 
    marginBottom:25
  },
  closeButtonContainer: {
  	flexDirection: 'row', 
    justifyContent: 'flex-end', 
    borderTopColor: '#e2e2e2', 
    borderTopWidth: 1, 
    borderBottomColor: '#e2e2e2', 
    borderBottomWidth:1
  },
  closeButton: {
  	paddingRight:10, 
    paddingTop:10, 
    paddingBottom:10
  },
  buttonText: {
  	textAlign: 'center'
  },
  closeButtonText: {
  	color: '#027afe'
  },
  
});

// AppRegistry.registerComponent('Search', () => Search);
