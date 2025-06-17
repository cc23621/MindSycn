import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Animated, Easing, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Onboarding() {
    const router = useRouter();
    const [showOptions, setShowOptions] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;

  const showFrame = () => {
    setShowOptions(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };
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
        source={require("../../assets/onboarding-image/Mental health-cuate (3).png")}
        style={styles.imagem}
        resizeMode="cover"
      />

      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>
          Vamos lá{"\n"}
          Começar!
        </Text>
        <TouchableOpacity onPress={showFrame}>
          <Image
            source={require("../../assets/onboarding-image/Seta.png")}
            style={styles.imagemIr}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      {showOptions && (
  <Animated.View
    style={[
      styles.optionFrame,
      { transform: [{ translateY: slideAnim }] },
    ]}
  >
    <Text style={styles.optionTitle}>Como você deseja se conectar?</Text>
    <TouchableOpacity
      style={styles.optionButton}
      onPress={() => router.push("/Cadastro/cadastro")}
    >
      <Text style={styles.optionButtonText}>Sou paciente</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.optionButton}
      onPress={() => router.push("/Cadastro-psi/cadastroPsi")}
    >
      <Text style={styles.optionButtonText}>Quero me voluntariar</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => router.push("/Cadastro-psi/cadastroPsi")}
    >
      <Text style={styles.linkVoluntario}>
        O que é ser um voluntário no MindSync?
      </Text>
    </TouchableOpacity>


  </Animated.View>
)}

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
  optionFrame: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#000A74",
  },
  optionButton: {
    backgroundColor: "#000A74",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  optionButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  linkVoluntario: {
    marginTop: 10,
    textAlign: "center",
    color: "#000A74",
    textDecorationLine: "underline",
    fontSize: 14,
  }
  
  
});
