import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomePsi() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const id = await AsyncStorage.getItem("userId");
        const name = await AsyncStorage.getItem("userName");
  
        console.log("ID recuperado:", id);    // Adicione este log
        console.log("Nome recuperado:", name);
  
        if (id && name) {
          setUserId(id);
          setUserName(name);
        } else {
          console.warn("ID ou nome do usuário não encontrados no AsyncStorage");
        }
      } catch (err) {
        console.error("Erro ao buscar dados do usuário:", err);
      }
    };
  
    fetchUserData();
  }, []);
  
  
  const handleDeleteAccount = () => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(`http://localhost:3000/psychologists/${userId}`, {
                method: "DELETE",
              });

              if (response.ok) {
                Alert.alert("Conta excluída", "Sua conta foi removida com sucesso.");
                await AsyncStorage.clear();
                router.replace("/Login/login");
              } else {
                Alert.alert("Erro", "Erro ao excluir conta.");
              }
            } catch (error) {
              console.error(error);
              Alert.alert("Erro", "Erro ao conectar com o servidor.");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header com o botão de menu */}
      <View style={styles.header}>
        <Text style={styles.welcome}>Bem-vindo(a), {userName}!</Text>

        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
          <Image
            source={require("../../assets/menu.png")}
            style={styles.menuIcon}
          />
        </TouchableOpacity>

        {menuVisible && (
          <View style={styles.menu}>
            <TouchableOpacity
              onPress={() => {
                setMenuVisible(false);
                router.push("/EditarConta/editarConta");
              }}
            >
              <Text style={styles.menuItem}>Alterar Conta</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleDeleteAccount}>
              <Text style={[styles.menuItem, { color: "red" }]}>Excluir Conta</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Conteúdo da página */}
      <View style={styles.content}>
        <Text style={styles.texto}>Conteúdo principal da Home do Psicólogo</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000A74",
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcome: {
    color: "#fff",
    fontSize: 18,
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  menu: {
    position: "absolute",
    top: 60,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    zIndex: 10,
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  texto: {
    color: "#fff",
    fontSize: 20,
  },
});
