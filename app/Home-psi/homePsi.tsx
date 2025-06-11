import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomePsi() {
  const nomePsi = "Julia";

  // Lista de pacientes (vazia por enquanto)
  const pacientes = [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log("Menu pressionado")}>
          <Image
            source={require("../../assets/menu.png")}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.greeting}>Olá, {nomePsi}</Text>

      <View style={styles.content}>
        <Text style={styles.textoBoasVindas}>Bem-vinda à sua área profissional!</Text>

        <View style={styles.imagensContainer}>
          <Image
            source={require("../../assets/home-image/chatAi (2).png")}
            style={styles.imagem}
          />
          <Image
            source={require("../../assets/home-image/espacoEducacional (1).png")}
            style={styles.imagem}
          />
        </View>

        <Text style={styles.secaoTitulo}>Seus pacientes</Text>

        {pacientes.length === 0 ? (
          <Text style={styles.semPacientes}>Não há pacientes para atender agora.</Text>
        ) : (
          pacientes.map((paciente, index) => (
            <View key={index} style={styles.cardPaciente}>
              <Text>{paciente.nome}</Text>
            
            </View>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
  header: {
    paddingLeft: 20,
    paddingBottom: 5,
  },
  menuIcon: {
    width: 28,
    height: 28,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 40,
    marginBottom: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  textoBoasVindas: {
    fontSize: 18,
    color: "#000",
    marginBottom: 20,
  },
  imagensContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  imagem: {
    width: "48%",
    height: 150,
    borderRadius: 10,
  },
  secaoTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  semPacientes: {
    fontSize: 16,
    color: "#888",
    fontStyle: "italic",
  },
  cardPaciente: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
});
