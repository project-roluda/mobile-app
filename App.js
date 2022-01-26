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
        <Text style={styles.header}>{this.state.countDisplay}</Text>
      </View>
    )
  }

  showData() {
    let count = 0
    let interval = setInterval(() => {
      getGitHubAccountData()
      .then(data => {
        this.setState({accountData: JSON.stringify(data)})
        this.setState({countDisplay: count})
      })
      count += 1
    }, 500)

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
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  }
});
