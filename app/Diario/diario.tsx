import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import api from "../../service/api"; // ou o caminho certo

export default function Diario() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [content, setContent] = useState("");
  const [entryId, setEntryId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const userId = 45; // Substitua pelo ID do usuário logado

  useEffect(() => {
    if (params.entryId) {
      fetchEntry(Number(params.entryId));
    }
  }, [params]);

  const fetchEntry = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/diary/list/${userId}`);

      const entry = response.data.find((e: any) => e.id === id);
      if (entry) {
        setContent(entry.content);
        setEntryId(entry.id);
      }
    } catch (error) {
      console.error("Erro ao buscar entrada:", error);
      Alert.alert("Erro", "Não foi possível carregar a nota");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!content.trim()) {
      Alert.alert("Aviso", "Por favor, escreva algo antes de salvar");
      return;
    }

    setIsSaving(true);
    try {
      if (entryId) {
        // Atualizar entrada existente
        await api.put(`/diary/update/${entryId}`, { content });
      } else {
        // Criar nova entrada
        await api.post(`/diary/create`, { user_id: userId, content });
      }
      router.back();
    } catch (error) {
      console.error("Erro ao salvar:", error);
      Alert.alert("Erro", "Não foi possível salvar a nota");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000A74" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.textInput}
          multiline
          placeholder="Escreva sua nota aqui..."
          placeholderTextColor="#888"
          value={content}
          onChangeText={setContent}
          autoFocus={!entryId}
          textAlignVertical="top"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.back()}
            disabled={isSaving}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.saveButtonText}>
                {entryId ? "Atualizar" : "Salvar"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#555",
    fontWeight: "bold",
  },
  saveButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#000A74",
    alignItems: "center",
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
