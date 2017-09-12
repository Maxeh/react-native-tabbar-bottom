/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Tabbar from 'react-native-tabbar-bottom'

export default class exampleTabs extends Component {

  constructor() {
    super()
    this.state = {
      page: "HomeScreen",
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {
          // if you are using react-navigation just pass the navigation object in your components like this:
          // {this.state.page === "HomeScreen" && <MyComp navigation={this.props.navigation}>Screen1</MyComp>}
        }
        {this.state.page === "HomeScreen" && <View style={styles.wrapper}><Text>Screen1</Text></View>}
        {this.state.page === "NotificationScreen" && <View style={styles.wrapper}><Text>Screen2</Text></View>}
        {this.state.page === "ProfileScreen" && <View style={styles.wrapper}><Text>Screen3</Text></View>}
        {this.state.page === "ChatScreen" && <View style={styles.wrapper}><Text>Screen4</Text></View>}
        {this.state.page === "SearchScreen" && <View style={styles.wrapper}><Text>Screen5</Text></View>}

        <Tabbar
          //type="ripple"
          //rippleColor="#462E74"
          //tabbarBgColor="#EEE"
          //iconColor="#444"
          //selectedIconColor="#462E74"
          //labelColor="#444"
          //selectedLabelColor="#462E74"
          stateFunc={(tab) => {
            this.setState({page: tab.page})
            //this.props.navigation.setParams({tabTitle: tab.title})
          }}
          activePage={this.state.page}
          tabs={[
            {
              page: "HomeScreen",
              title: "HomeScreen",
              icon: "home",
            },
            {
              page: "NotificationScreen",
              icon: "notifications",
              badgeNumber: 11,
            },
            {
              page: "ProfileScreen",
              icon: "person",
            },
            {
              page: "ChatScreen",
              icon: "chatbubbles",
              badgeNumber: 7,
            },
            {
              page: "SearchScreen",
              icon: "search",
            },
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }
});

AppRegistry.registerComponent('exampleTabs', () => exampleTabs);
