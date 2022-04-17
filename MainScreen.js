import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useState } from 'react';

export default function MainScreen() {
    const [led, setLed] = useState({led1: 0, led2: 0});

    const ledPress = (led_num) => {
        if(led_num == 1){
            setLed({
                led1: !led.led1,
                led2: led.led2,
            });
        }
        else if(led_num == 2){
            setLed({
                led1: led.led1,
                led2: !led.led2,
            });
        }

        // fetch("http://192.168.117.1:8081/", {
        //     method: 'GET',
        //     headers: {
        //       accept: 'application/json',
        //       'Access-Control-Allow-Origin': '*',
        //     },
        //   })
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err));
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={led.led1? [styles.button, styles.ledOn]: [styles.button, styles.ledOff]} 
                onPress={() => ledPress(1)}
            >
                <Text style={styles.heading}>LED 1</Text>
                <Text style={styles.subheading}>{led.led1 ? "ON" : "OFF"}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={led.led2? [styles.button, styles.ledOn]: [styles.button, styles.ledOff]} 
                onPress={() => ledPress(2)}
            >
                <Text style={styles.heading}>LED 2</Text>
                <Text style={styles.subheading}>{led.led2 ? "ON" : "OFF"}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    button: {
        width: '75%',
        height: '30%',
        borderColor: "black",
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
    },
    ledOn: {
        backgroundColor: "#EB581E",
    },
    ledOff: {
        backgroundColor: "#009C72",
    },
    heading: {
        fontSize: 60,
    },
    subheading: {
        fontSize: 30,
    },
})