import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ImageBackground } from "react-native";
import { firestore, auth } from '../firebase'; 
import { collection, addDoc } from "firebase/firestore";

export default function RegisterVehicle({ navigation }) {
  const [nomeJogador, setNomeJogador] = useState("");
  const [timeJogador, setTimeJogador] = useState("");
  const [idadeJogador, setIdadeJogador] = useState("");
  const [nacionalidade, setNacionalidade] = useState("");

  const handleAddVehicle = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("Usuário não autenticado!");
        Alert.alert("Erro", "Você precisa estar logado para cadastrar um Jogador.");
        return;
      }

      // Adicionando o veículo à coleção 'tblJogador' com o usuário autenticado
      await addDoc(collection(firestore, 'tblJogador'), {
        nomeJogador,
        timeJogador,
        idadeJogador,
        nacionalidade,
        userId: user.uid, // Armazenando o ID do usuário para referenciar o veículo
      });

      Alert.alert("Sucesso", "Jogador cadastrado com sucesso!");
      navigation.goBack();  
    } catch (error) {
      console.error("Erro ao cadastrar Jogador: ", error);
      Alert.alert("Erro", "Ocorreu um erro ao cadastrar o Jogador. Tente novamente.");
    }
  };

  return (
    <ImageBackground style={styles.fundo} resizeMode="cover" source={require('../assets/fundo4.jpg')}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Cadastrar Jogador</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Nome do Jogador"
            value={nomeJogador}
            onChangeText={setNomeJogador}
          />
          <TextInput
            style={styles.input}
            placeholder="Time do Jogador"
            value={timeJogador}
            onChangeText={setTimeJogador}
          />
          <TextInput
            style={styles.input}
            placeholder="Tdade do Jogador"
            value={idadeJogador}
            onChangeText={setIdadeJogador}
          />
          <TextInput
            style={styles.input}
            placeholder="Nacionalidade"
            value={nacionalidade}
            onChangeText={setNacionalidade}
          />

          <TouchableOpacity style={styles.btnenviar} onPress={handleAddVehicle}>
            <Text style={styles.btntxtenviar}>Cadastrar</Text>
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
  fundo: {
    flex: 1,
  },
  titulo: {
    color: 'black',
    marginVertical: 40,
    fontSize: 25,
    textAlign: 'center',
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
    width: 120,
  },
  btntxtenviar: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
  },
});
