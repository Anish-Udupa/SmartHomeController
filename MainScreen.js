import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import TcpSocket from 'react-native-tcp-socket';

export default function MainScreen() {
    const [led, setLed] = useState(0);

    const [client, setClient] = useState(TcpSocket.createConnection(
        {host: '192.168.4.1', port: 80}, 
        () => {
            client.write('Hello World\r\n');
        }
    ));

    const ledPress = () => {
        if (client.readyState == 'open') {
            client.write(led == 0 ? 'LED:ON\r\n' : led == 1 ? 'LED:AUTO\r\n' : 'LED:OFF\r\n');
            setLed((led + 1) % 3);
        } else {
            client.destroy();
            setClient(TcpSocket.createConnection(
                {host: '192.168.4.1', port: 80}, 
                () => {
                    client.write('Hello World\r\n');
                }
            ));
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
                    led == 0
                        ? [styles.button, styles.ledOff]
                        : led == 1 ? [styles.button, styles.ledOn] : [styles.button, styles.ledauto]
                }
                onPress={() => ledPress()}
            >
                <Text style={styles.heading}>LED</Text>
                <Text style={styles.subheading}>{led == 0 ? 'OFF' : led == 1 ? 'ON' : 'AUTO'}</Text>
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
