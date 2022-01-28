import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';


class BigText extends Component {
    render() {
        return (
            <View style={{
                // backgroundColor: "#dbe5ff",
                width: 500,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
            }}>
                <Text style={styles.container}>{this.props.displayText}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        fontSize: 36,
    }
})

export default BigText;