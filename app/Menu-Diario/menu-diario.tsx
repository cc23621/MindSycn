import axios from "axios";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MenuDiario() {
  const router = useRouter();
  const userId = 1; // substitua pelo ID real do usuário

  const [entries, setEntries] = useState([]);

  // Função para buscar entradas do diário via API
  const fetchEntries = async () => {
    try {
      const response = await axios.get(`http://SEU_BACKEND/api/diary/list/${userId}`);
      console.log(response.data); // para ver os dados
      setEntries(response.data);
    } catch (error) {
      console.error("Erro ao carregar entradas", error);
    }
  };
  

  // Recarregar toda vez que a tela ficar em foco
  useFocusEffect(
    useCallback(() => {
      fetchEntries();
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* Header com botão voltar e menu */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.leftButton}>
          <Image
            source={require("../../assets/voltar.png")}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("Menu pressionado")} style={styles.rightButton}>
          <Image
            source={require("../../assets/menu.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Lista das entradas do diário */}
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.entryContainer}>
            <Text style={styles.entryText}>{item.content}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Retângulo azul com botão de adicionar nova nota */}
      <View style={styles.bottomRectangle}>
        <TouchableOpacity onPress={() => router.push("/Diario/diario")} >
          <Image
            source={require("../../assets/mais (3).png")}
            style={styles.plusIcon}
          />
        </TouchableOpacity>

        <View style={styles.flexSpacer} />

        <Image
          source={require("../../assets/menu-diario.png")}
          style={styles.rectangleImage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  leftButton: {
    marginLeft: 5,
  },
  rightButton: {
    marginRight: 5,
  },
  entryContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  entryText: {
    fontSize: 16,
  },
  bottomRectangle: {
    position: "absolute",
    bottom: 20,
    height: 50,
    width: 200,
    backgroundColor: "#000A74",
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  plusIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  flexSpacer: {
    flex: 1,
  },
  rectangleImage: {
    width: 80,
    height: 40,
    resizeMode: "contain",
  },
});
