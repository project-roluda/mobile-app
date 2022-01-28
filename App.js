import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import React, { Component } from 'react';
import getServerData from './src/testGet';
import Result from './src/result';
import BigText from './src/displayText'

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

    let diagnostic_items = []

    console.log('render');
    if (!(this.state.status === "result")){
      return (
        <View style={styles.container}>
          <BigText displayText={this.state.displayText}/>

        </View>
      )
    }

    else {

      console.log(this.state.diagnostics)
      // keys = Object.keys(this.state.diagnostics)
      // for (const key_ of keys) {
      //   diagnostic_items.push(<Result diagnostic={key_} value={this.state.diagnostics.key_} />)
      // }

      diagnostic_items = [
        <Result diagnostic="Asthma" value={this.state.asthma}/>,
        <Result diagnostic="Bronchiectasis" value={this.state.bronchiectasis}/>,
        <Result diagnostic="Bronchiolitis" value={this.state.bronchiolitis}/>,
        <Result diagnostic="COPD" value={this.state.copd}/>,
        <Result diagnostic="Healthy" value={this.state.healthy}/>,
        <Result diagnostic="LRTI" value={this.state.lrti}/>,
        <Result diagnostic="Pneumonia" value={this.state.pneumonia}/>,
        <Result diagnostic="URTI" value={this.state.urti}/>,

      ]

      return(
        <SafeAreaView>
          <ScrollView>
            <View style={styles.container}>
              <Text style={styles.header}>Results</Text>
              {diagnostic_items}
            </View>
          </ScrollView>
        </SafeAreaView>

      )
    }

  }

  showData() {
    let count = 0
    let interval = setInterval(() => {
      getServerData()
      .then(data => {
        console.log(data)
        this.setState({status: data.status})
        this.setState({displayText: data.displayText})
        this.setState({accountData: JSON.stringify(data)})
        this.setState({countDisplay: count})
        this.setState({diagnostics: data.diagnostics})

        this.setState({asthma: data["diagnostics"]["Asthma"]})
        this.setState({bronchiectasis: data["diagnostics"]["Bronchiectasis"]})
        this.setState({bronchiolitis: data["diagnostics"]["Bronchiolitis"]})
        this.setState({copd: data["diagnostics"]["COPD"]})
        this.setState({healthy: data["diagnostics"]["Healthy"]})
        this.setState({lrti: data["diagnostics"]["LRTI"]})
        this.setState({pneumonia: data["diagnostics"]["Pneumonia"]})
        this.setState({urti: data["diagnostics"]["URTI"]})

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
    fontSize: 36,
    textAlign: 'center',
    fontWeight: "400",
    margin: 10,
  }
});
