import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';


class Result extends Component {
    render() {
        return (
            <View style={{
                backgroundColor: "#f2f4ff",
                width: 300,
                padding: 10,
                margin: 5,
                justifyContent: 'center',
                alignItems: 'left',
                borderRadius: 10,
            }}>
                <Text style={styles.container}>{this.props.diagnostic}: {this.props.value}%</Text>
            </View>
        )
    }
}
 
const styles = StyleSheet.create({
    container: {
        fontSize: 18,
    }
})

export default Result;
