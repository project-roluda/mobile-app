import React, {Component} from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

class DisplayImage extends Component {

    constructor() {
        super();
        this.imageURI = 'test';
      }

    render() {

        const imgMap = {
            "standby" : "https://raw.githubusercontent.com/project-roluda/server-backend/master/static/img/logo.png",
            "arm" : "https://raw.githubusercontent.com/project-roluda/server-backend/master/static/img/ins-gears.png",
            "inhale": "https://raw.githubusercontent.com/project-roluda/server-backend/master/static/img/ins-inhale.png",
            "exhale": "https://raw.githubusercontent.com/project-roluda/server-backend/master/static/img/ins-exhale.png",
            "processing": "https://raw.githubusercontent.com/project-roluda/server-backend/master/static/img/ins-cloud.png"
        }

        let statusKeyword = this.props.statusKeyword
        let imageURI = imgMap[statusKeyword]

        return (
            <View>
                <Image
                    style={styles.mainImage}
                         source={{
          uri: imageURI,
        }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainImage: {
        height: 300,
        width: 300,
      }
})


export default DisplayImage;