import React, { Component } from 'react';

import Onboard from './pages/OnboardingScreen';
import PreRegister from './pages/PreRegister';
import Login from './pages/Login';
import Department from './pages/Department';
import Listing from './pages/Listing';
import OrgInfo from './pages/Organisation/OrganisationInfo';
import OrgDetail from './pages/Organisation/OrganisationDetail';
import OrgMap from './pages/Organisation/OrganisationMap';
import MyNumber from './pages/MyNumber';

import { createStackNavigator } from 'react-navigation'

import { Permissions, Notifications } from 'expo';

async function registerForPushNotificationsAsync() {
  console.log('eer')
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  console.log(finalStatus)
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  console.log(token);
}

const Router = createStackNavigator({
  onboard: {
    screen: Onboard,
    navigationOptions: {
      header: null
    },
  },
  login: { screen: Login },
  department: {
    screen: Department,
    navigationOptions: {
      title: 'TRANSACTION',
      headerStyle: {
        marginTop: 20,
        backgroundColor: '#005e2d',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color:'#fff'
      }
    }
  },
  listing: {
    screen: Listing,
    navigationOptions: {
      header: null,
      headerStyle: {
        marginTop:20,
        backgroundColor: '#005e2d',
      }
    }
  },
  orgInfo: {
    screen: OrgInfo,
    navigationOptions: {
      title: "INFORMATION",
      headerStyle: {
        marginTop: 20,
        backgroundColor: '#005e2d',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color:'#fff'
      }
    }
  },
  orgMap: {
    screen: OrgMap,
    navigationOptions: {
      headerStyle: {
        marginTop: 20,
        backgroundColor: '#005e2d',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color:'#fff'
      }
    },
  },
  orgDetail: {
    screen: OrgDetail,
      navigationOptions: {
        title: "ADDITIONAL INFO",
        headerStyle: {
          marginTop: 20,
          backgroundColor: '#005e2d',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color:'#fff'
        }
      },
      
  },
  myNumber: {
    screen: MyNumber,
    navigationOptions: {
      title: "MY NUMBER"
    }
  },
  preRegister: {
    screen: PreRegister,
    navigationOptions: {
      title: "PRE REGISTER"
    }
  }

}
);

export default class App extends Component {
  componentDidMount(){
    registerForPushNotificationsAsync()
  }
  
  render() {
    return (
        <Router />
    )
  }
}