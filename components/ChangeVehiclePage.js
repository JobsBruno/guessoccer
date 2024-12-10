import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { firestore } from '../firebase';
import { collection, doc, updateDoc } from "firebase/firestore";

export default function ChangeVehicle({ navigation, route }) {
    const id = route.params.id;

    const [nomeJogador, setNomeJogador] = useState(route.params.nomeJogador);
    const [timeJogador, setTimeJogador] = useState(route.params.timeJogador);
    const [idadeJogador, setIdadeJogador] = useState(route.params.idadeJogador);
    const [nacionalidade, setNacionalidade] = useState(route.params.nacionalidade);

    async function changeVehicle() {
        try {
            await updateDoc(doc(firestore, "tblJogador", id), {
                nomeJogador,
                timeJogador,
                idadeJogador,
                nacionalidade
            });
            Alert.alert("Aviso", "Jogador alterado com sucesso.");
            navigation.navigate("Home");
        } catch (error) {
            console.error("Erro ao alterar: ", error);
            Alert.alert("Erro", "Erro ao alterar. Por favor, tente novamente.");
        }
    }

    return (
        <ImageBackground style={styles.fundo2} resizeMode="cover" source={require('../assets/fundo4.jpg')}>
            <View style={styles.container}>
                <Text style={styles.titulo}>Alterar dados do Jogador</Text>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.input}
                        value={nomeJogador}
                        placeholder="Jogador"
                        onChangeText={setNomeJogador}
                    />
                    <TextInput
                        style={styles.input}
                        value={timeJogador}
                        placeholder="Time"
                        onChangeText={setTimeJogador}
                    />
                    <TextInput
                        style={styles.input}
                        value={idadeJogador}
                        placeholder="Idade"
                        onChangeText={setIdadeJogador}
                    />
                    <TextInput
                        style={styles.input}
                        value={nacionalidade}
                        placeholder="Nacionalidade"
                        onChangeText={setNacionalidade}
                    />
                    <TouchableOpacity style={styles.btnenviar} onPress={changeVehicle}>
                        <Text style={styles.btntxtenviar}>Alterar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btnenviar, styles.btnVoltar]}
                        onPress={() => navigation.navigate("Home")}
                    >
                        <Text style={styles.btntxtenviar}>Voltar</Text>
                    </TouchableOpacity>

                </View>


            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fundo2: {
        flex: 1,
    },
    input: {
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: 'white',
        fontWeight: '700',
        padding: 8,
        width: 260,
        fontSize: 18,
        borderRadius: 10,
    },
    inputView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnenviar: {
        marginTop: 38,
        backgroundColor: '#686868',
        borderColor: '#ffffff',
        borderWidth: 0.6,
        borderRadius: 10,
        padding: 10,
        width: 110,
    },
    btntxtenviar: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18,
        textAlign: 'center',
    },
    titulo: {
        color: 'black',
        marginVertical: 40,
        fontSize: 25,
        textAlign: 'center',
    },
});
