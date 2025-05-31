import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import api from "../../service/api";

export default function Cadastro() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleCadastro = async () => {
    try {
      const response = await api.post("/auth/register", {
        nome,          // <- usa 'name' para o backend
        email,
        password: senha,     // <- usa 'password' para o backend
      });
  
    
      Alert.prompt(
        "Verificação de E-mail",
        "Digite o código que você recebeu:",
        async (otp) => {
          try {
            const verifyResponse = await api.post("/auth/verify-otp", {
              nome,
              email,
              otp,  // <- usa 'otp' como no backend
            });
  
            Alert.alert("Sucesso", "Conta verificada com sucesso!");
            router.push("/Login/login");
          } catch (error) {
            Alert.alert("Erro", "Código inválido. Tente novamente.");
          }
        }
      );
    } catch (error) {
      Alert.alert("Erro", "Erro ao cadastrar. Tente novamente.");
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={require("../../assets/Arrow 1.png")} style={styles.back} />
        </TouchableOpacity>

        <View style={styles.titleRow}>
          <Text style={styles.textHeader}>Criar uma{"\n"}conta</Text>
          <Image source={require("../../assets/logo (3).png")} style={styles.logo} />
        </View>

        <Text style={styles.text}>
          Você já possui uma conta?{" "}
          <Text style={styles.loginText} onPress={() => router.push("/Login/login")}>
            Login
          </Text>
        </Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.innerForm}>
          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            placeholderTextColor="#ccc"
            value={nome}
            onChangeText={setNome}
          />
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
          <TouchableOpacity style={styles.button} onPress={handleCadastro}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
        <Image source={require("../../assets/imagem.png")} style={styles.imagem} />
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
    fontSize: 36,
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

  formContainer: {
    backgroundColor: "#41BECE",
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: "flex-start", 
  },
  innerForm: {
    padding: 20,
    marginTop: 30, // sobe os inputs
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
  imagem: {
    width: "100%",
    height: 200,
    marginTop: 20,
    alignSelf: "center",
    resizeMode: "contain",
  },
  
});
