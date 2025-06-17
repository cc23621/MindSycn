// src/components/Botao.tsx
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface BotaoProps {
  titulo: string;
  onPress: () => void;
}

export default function BotaoPrincipal({ titulo, onPress }: BotaoProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#000A74",
    padding: 14,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#52FFB8",
    fontSize: 16,
    fontWeight: "bold",
  },
});
