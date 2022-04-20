import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import TcpSocket from 'react-native-tcp-socket';

export default function MainScreen() {
    const [led_1, setLed_1] = useState(0);
    const [led_2, setLed_2] = useState(0);

    const [client, setClient] = useState(
        TcpSocket.createConnection({ host: '192.168.4.1', port: 80 },       () => {
            client.write('Hello World\r\n');
        })
    );

    const ledPress = (n) => {
        const led = n == 1 ? led_1 : led_2;
        const setLed = n == 1 ? setLed_1 : setLed_2;

        if (client.readyState == 'open') {
            client.write(
                led == 0
                    ? `LED_${n}:ON\r\n`
                    : led == 1
                    ? `LED_${n}:AUTO\r\n`
                    : `LED_${n}:OFF\r\n`
            );
            setLed((led + 1) % 3);
        } else {
            if (!client.destroyed) {
                client.destroy();
            }
            setClient(
                TcpSocket.createConnection(
                    { host: '192.168.4.1', port: 80 },
                    () => {
                        client.write('Hello World\r\n');
                    }
                )
            );
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
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={
                    led_1 == 0
                        ? [styles.button, styles.ledOff]
                        : led_1 == 1
                        ? [styles.button, styles.ledOn]
                        : [styles.button, styles.ledauto]
                }
                onPress={() => ledPress(1)}
            >
                <Text style={styles.heading}>LED_1</Text>
                <Text style={styles.subheading}>
                    {led_1 == 0 ? 'OFF' : led_1 == 1 ? 'ON' : 'AUTO'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={
                    led_2 == 0
                        ? [styles.button, styles.ledOff]
                        : led_2 == 1
                        ? [styles.button, styles.ledOn]
                        : [styles.button, styles.ledauto]
                }
                onPress={() => ledPress(2)}
            >
                <Text style={styles.heading}>LED_2</Text>
                <Text style={styles.subheading}>
                    {led_2 == 0 ? 'OFF' : led_2 == 1 ? 'ON' : 'AUTO'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    button: {
        width: '75%',
        height: '30%',
        borderColor: 'black',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    ledOn: {
        backgroundColor: '#EB581E',
    },
    ledOff: {
        backgroundColor: '#009C72',
    },
    ledauto: {
        backgroundColor: '#AA9C72',
    },
    heading: {
        fontSize: 60,
    },
    subheading: {
        fontSize: 30,
    },
});
