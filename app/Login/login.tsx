import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import api from "../../service/api";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", { email, senha });
      Alert.alert("Sucesso", "Login realizado com sucesso!");
      // Redireciona para a tela principal
      router.push("/Home/home");
    } catch (error) {
      Alert.alert("Erro", "Email ou senha inválidos.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={require("../../assets/Arrow 1.png")} style={styles.back} />
        </TouchableOpacity>

        <View style={styles.titleRow}>
          <Text style={styles.textHeader}>
            Olá, Bem-Vindo(a) de{"\n"}Volta!
          </Text>
          <Image source={require("../../assets/logo (3).png")} style={styles.logo} />
        </View>

        <Text style={styles.text}>
          Não tem uma conta?{" "}
          <Text style={styles.loginText} onPress={() => router.push("/Cadastro/cadastro")}>
            Cadastre-se
          </Text>
        </Text>
      </View>

      <Image source={require("../../assets/imagem (2).png")} style={styles.imagem} />

      <View style={styles.formContainer}>
        <View style={styles.innerForm}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#ccc"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000A74",
    flex: 1,
    paddingTop: 40,
  },
  header: {
    paddingHorizontal: 20,
  },
  back: {
    width: 20,
    height: 10,
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  textHeader: {
    fontSize: 32,
    fontWeight: "400",
    color: "#fff",
  },
  logo: {
    width: 70,
    height: 80,
  },
  text: {
    fontSize: 14,
    color: "#fff",
    marginTop: 15,
    marginBottom: 30,
  },
  loginText: {
    color: "#52FFB8",
    fontWeight: "bold",
  },
  imagem: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: -40, 
    zIndex: 2,
  },
  
  formContainer: {
    backgroundColor: "#41BECE",
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: "flex-start",
    zIndex: 1,
    paddingTop: 40,
  },
  
  innerForm: {
    padding: 20,
    marginTop: 30,
  },
  input: {
    backgroundColor: "#fff",
    color: "#000",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
    padding: 14,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#000A74",
    padding: 14,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#52FFB8",
    fontSize: 16,
    fontWeight: "bold",
  },
});
