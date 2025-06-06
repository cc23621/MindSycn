import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MenuDiario() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [entries, setEntries] = useState<any[]>([]);
  const userId = 45; // Substitua pelo ID do usuário logado

  const fetchEntries = async () => {
    try {
      // Substitua pela URL do seu backend
      const response = await axios.get(`http://localhost:3000/diary/list/${userId}`);

      setEntries(response.data);
    } catch (error) {
      console.error("Erro ao buscar entradas:", error);
      Alert.alert("Erro", "Não foi possível carregar as notas");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchEntries();
  };

  const handleEntryPress = (entryId: number) => {
    router.push({ pathname: "/Diario/diario", params: { entryId } });
  };

  const handleAddNew = () => {
    router.push("/Diario/diario");
  };

  const renderEntry = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.entryContainer} 
      onPress={() => handleEntryPress(item.id)}
    >
      <Text style={styles.entryText} numberOfLines={2}>
        {item.content}
      </Text>
      <Text style={styles.dateText}>
        {new Date(item.created_at).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.leftButton}>
          <Image source={require("../../assets/voltar.png")} style={styles.icon} />
        </TouchableOpacity>

        <Text style={styles.title}>Meu Diário</Text>

        <TouchableOpacity
          onPress={() => console.log("Menu pressionado")}
          style={styles.rightButton}
        >
          <Image source={require("../../assets/menu.png")} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Lista de entradas */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000A74" />
        </View>
      ) : (
        <FlatList
          data={entries}
          renderItem={renderEntry}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhuma nota encontrada</Text>
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#000A74"]}
            />
          }
        />
      )}

      {/* Botão flutuante */}
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={handleAddNew}
        activeOpacity={0.8}
      >
        <Image
          source={require("../../assets/mais (3).png")}
          style={styles.plusIcon}
        />
      </TouchableOpacity>
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
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000A74",
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    paddingBottom: 30,
  },
  entryContainer: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#000A74",
  },
  entryText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  dateText: {
    fontSize: 12,
    color: "#777",
    alignSelf: "flex-end",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#888",
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#000A74",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  plusIcon: {
    width: 24,
    height: 24,
    tintColor: "#fff",
  },
});