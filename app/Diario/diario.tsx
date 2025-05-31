import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";

export default function Diario() {
  const router = useRouter();
  const userId = 1; // substitua pelo ID real

  const [content, setContent] = useState("");

  const handleSave = async () => {
    try {
      await axios.post("http://SEU_BACKEND/api/diary/create", { user_id: userId, content });
      Alert.alert("Sucesso", "Entrada criada!");
      router.push('/Menu-Diario/menu-diario'); // volta para menu-diario
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a entrada");
      console.error(error);
    }
  };

  const handleBack = () => {
    router.push('/Menu-Diario/menu-diario'); // voltar para menu-diario
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        multiline
        placeholder="Escreva sua nota aqui..."
        value={content}
        onChangeText={setContent}
      />
      <Button title="Salvar" onPress={handleSave} />
      <View style={{ marginTop: 10 }}>
        <Button title="Voltar" onPress={handleBack} color="#888" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  textInput: {
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: "top",
  },
});
