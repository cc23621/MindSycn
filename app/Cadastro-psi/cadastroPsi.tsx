import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CadastroPsi() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [crp, setCrp] = useState("");

  const handleCadastro = async () => {
    if (!nome || !email || !senha || !crp) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3000/psychologists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: nome,
          email: email,
          password: senha,
          crp
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem("userId", String(data.id));
        await AsyncStorage.setItem("userName", data.name);
        Alert.alert("Cadastro concluído", `Bem-vindo(a), ${data.name}!`);
        router.push("/Home-psi/homePsi");
      
      } else {
        const errorData = await response.json();
        Alert.alert("Erro ao cadastrar", errorData.message || "Erro desconhecido.");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
      console.error(error);
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
        <Image
          source={require("../../assets/cadastro-psi-image/personal growth-bro 1.png")}
          style={styles.imagem}
        />
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
          <TextInput
            style={styles.input}
            placeholder="CRP (registro profissional)"
            placeholderTextColor="#ccc"
            value={crp}
            onChangeText={setCrp}
          />
          <TouchableOpacity style={styles.button} onPress={handleCadastro}>
            <Text style={styles.buttonText}>Cadastrar</Text>
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
    position: "relative",
    overflow: "hidden",
  },
  innerForm: {
    padding: 20,
    marginTop: 30,
    zIndex: 2,
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
    height: 250,
    position: "absolute",
    bottom: -20,
    zIndex: 1,
    resizeMode: "contain",
  },
});
