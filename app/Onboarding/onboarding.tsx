import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Onboarding() {
    const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/logo (3).png")}
          style={styles.logo}
          resizeMode="cover"
        />
        <View style={styles.logoTextContainer}>
          <Text style={styles.mind}>Mind</Text>
          <Text style={styles.sync}>Sync</Text>
        </View>
      </View>

      <Text style={styles.text}>
        Conectando você ao{"\n"}
        seu bem-estar{"\n"}
        mental
      </Text>

      <Image
        source={require("../../assets/Mental health-cuate (3).png")}
        style={styles.imagem}
        resizeMode="cover"
      />

      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>
          Vamos lá{"\n"}
          Começar!
        </Text>
        <TouchableOpacity onPress={() => router.push("/Cadastro/cadastro")}>
          <Image
            source={require("../../assets/Seta.png")}
            style={styles.imagemIr}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "#000A74",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 30,
  },
  logo: {
    width: 50,
    height: 50,
    marginLeft: -10,
  },
  logoTextContainer: {
    marginLeft: 8,
    justifyContent:"center",
  },
  mind: {
    fontSize: 16,
    fontWeight:"bold",
    color:"#41BECE",
    lineHeight: 22,
  },
  sync: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#529DFF",
    lineHeight: 22,
  },
  text: {
    fontSize: 36,
    fontWeight: "400",
    color: "#fff",
    marginBottom: 0,
  },
  imagem: {
    width: "100%",
    height: 260,
    marginTop: 30, 
    marginBottom: 90, 
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 34,
    right:20
  },
  imagemIr: {
    width:90,
    height: 50,
    marginLeft: 90,
  },
});
