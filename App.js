import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image } from 'react-native';
// import { Sound } from 'react-native-sound';
import React, { Component, useState } from 'react';
import getServerData from './src/testGet';
import Result from './src/result';
import BigText from './src/displayText'
import Treatment from './src/treatment';
import DisplayImage from './src/displayImage';
import { Audio } from 'expo-av';
// import { Location, Permissions } from 'expo';
import * as Location from 'expo-location';

export default class App extends Component {

  async getLocationAsync() {
    let {status} = await Location.requestForegroundPermissionsAsync();
    // let { status } = await Location.requestPermissionAsync();
    if (status != 'granted'){
      this.setState({
        locationResult: 'Permission to access location is denied',
      });
    } else {
      this.setState({hasLocationPermissions: true});
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({locationResult: JSON.stringify(location)});
    this.setState({mapRegion: {latitude: location.coords.latitude, longitude: location.coords.longitude}})
    console.log("got location!")
    console.log(this.state)
  }


  // const [sound, setSound] = useState();

  async playCustomSound(selectedStatus) {

    // const [soundState, setSoundState] = useState();

    const soundLinks = {
      "inhale": "./assets/sounds/inhale.wav",
      "exhale": "./assets/sounds/exhale.wav",
      "standby": null,
      "result": "./assets/sounds/results.wav",
      "arm": "./assets/sounds/arm.wav",
      "processing": "./assets/sounds/processing.wav"
    }

    console.log("try???")
    
    if ((typeof selectedStatus !== "undefined") || (selectedStatus != "standby")) {
  
      try {
        console.log("=== PLAY SOUND!!! ===")
        const _sound = new Audio.Sound();
        // let current_state = this.state.status
        // console.log(current_state)
        // console.log(this.state)
        console.log("---")
        // let current_filepath = sound_filepath[current_status];
        // console.log(current_filepath);
        // await _sound.loadAsync(require("./assets/sounds/theme_01.mp3"), {shouldPlay: true})

        // let current_filepath = this.state.sound_filepath
        // console.log(this.state)
        // console.log(current_filepath)
        let filepath = soundLinks[selectedStatus]
        console.log(selectedStatus)
        console.log(soundLinks[selectedStatus])
        console.log(filepath)
        console.log("---")

        // if (typeof filepath === "string"){
        //   // await _sound.loadAsync(filepath, {shouldPlay: true});
        //   await _sound.loadAsync(require("./assets/sounds/exhale.wav"), {shouldPlay: true})
        //   // await _sound.setPositionAsync(0);
        //   await _sound.playAsync();
        // }

        let playSound = true;

        if (selectedStatus == "exhale") {
          await _sound.loadAsync(require("./assets/sounds/exhale.wav"), {shouldPlay: true})
        }
        if (selectedStatus == "inhale") {
          await _sound.loadAsync(require("./assets/sounds/inhale.wav"), {shouldPlay: true})
        }
        if (selectedStatus == "arm") {
          await _sound.loadAsync(require("./assets/sounds/arm.wav"), {shouldPlay: true})
        }
        if (selectedStatus == "result") {
          await _sound.loadAsync(require("./assets/sounds/results.wav"), {shouldPlay: true})
        }
        if (selectedStatus == "processing") {
          await _sound.loadAsync(require("./assets/sounds/processing.wav"), {shouldPlay: true})
        }
        else {
          playSound = false;
        }

        if (playSound == true) {
          _sound.playAsync()
        }


      } catch(error) {
        console.log(error);
      }

    }


  }

  constructor() {
    super();
    this.state = {
      accountData: 'loading...',
      isPlaying: false,
      locationResult: null,
      mapRegion: null,
      hasLocationPermissions: null
    }
    // this.getLocationAsync();
    // const [sound, setSound] = React.useState();
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.getLocationAsync();
    this.showData()
    // this.playCustomSound();
    // this.playsoundV2()
  }

  // playsoundV2() {
  //   // var Sound = require("react-native-sound");
  //   Sound.setCategory("Playback");

  //   var sample = new Sound("http://codeskulptor-demos.commondatastorage.googleapis.com/pang/arrow.mp3", Sound.MAIN_BUNDLE, (error) =>
  //     { if (error) {
  //       console.log(error);
  //       return;
  //     }

  //     sample.play((success) => {
  //       if (success) {
  //         console.log("successfully played")
  //       }
  //     })

  //   });

  // }

  // playsound(soundURI) {
  //   console.log("===loading sound===");
  //   this.setState({isPlaying: true});
  //   const { sound } = Audio.Sound.createAsync("http://codeskulptor-demos.commondatastorage.googleapis.com/pang/arrow.mp3");
  // }



  render() {

    // async function playSound(soundURI) {
    //   const {sound} = await Audio.Sound.createAsync(
    //     require("./static/audio/ringtone.mp3")
    //   );
    //   setSound(sound);
    //   await sound.playAsync();
    // }

    // React.useEffect(() => {
    //   return sound
    //     ? () => {sound.unloadAsync();}
    //     : undefined;
    // }, [sound])

    // let diagnostic_items = []

    console.log('render');
    if (!(this.state.status === "result")){
      return (
        <View style={styles.container}>
          <DisplayImage statusKeyword={this.state.status}/>
          <BigText displayText={this.state.displayText}/>
          {/* <Button title="Play Sound" onPress={playSound} /> */}

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
            <View style={styles.container}>
            <Text style={styles.header}>Recommended Treatment</Text>
            <Treatment treatment={this.state.treatments}/>
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
        let prevStatus = this.state.status
        this.setState({status: data.status})

        if (prevStatus != this.state.status) {
          console.log("--- change playing state ---")
          console.log(data.status);
          console.log("--- just logged status ---")
          this.playCustomSound(data.status);
          this.setState({isPlaying: false})
        }


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

        this.setState({treatments: data["treatment"]})


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
    margin: 5,
  },

  header: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: "400",
    margin: 10,
  },

});
