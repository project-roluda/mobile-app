import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';
import getGitHubAccountData from './src/testGet';

export default class App extends Component {
  constructor() {
    super();
    this.state = {accountData: 'loading...'}
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.showData()
  }

  render() {
    console.log('render');
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{this.state.accountData}</Text>
      </View>
    )
  }

  showData() {
    getGitHubAccountData()
    .then(data => {
      this.setState({accountData: JSON.stringify(data)})
    })

  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    fontSize: 10,
    textAlign: 'center',
    margin: 10,
  }
});
