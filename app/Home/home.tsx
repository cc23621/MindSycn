import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
    const router = useRouter();
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

    
      <Text style={styles.greeting}>Olá, Nicole!</Text>

      <Text style={styles.question}>Como você está se sentindo hoje?</Text>

     
      <View style={styles.emojiContainer}>
        <Image source={require("../../assets/alegre.png")} style={styles.emoji} />
        <Image source={require("../../assets/feliz (1).png")} style={styles.emoji} />
        <Image source={require("../../assets/indiferente.png")} style={styles.emoji} />
        <Image source={require("../../assets/triste (1).png")} style={styles.emoji} />
        <Image source={require("../../assets/magoado.png")} style={styles.emoji} />
      </View>

     
      <Text style={styles.exploreText}>O que você deseja explorar hoje?</Text>

     
      <View style={styles.exploreContainer}>
        
        <View style={styles.row}>
          <Image source={require("../../assets/educativos.png")} style={styles.exploreImage1} />
          <TouchableOpacity onPress={() => router.push("/Menu-Diario/menu-diario")}>
  <Image
    source={require("../../assets/diario.png")}
    style={styles.exploreImage2}
  />
</TouchableOpacity>
        </View>

   
        <View style={styles.row}>
          <Image source={require("../../assets/chatAI.png")} style={styles.exploreImage3} />
          <Image source={require("../../assets/grafico (1).png")} style={styles.exploreImage4} />
        </View>
      </View>

      <View style={styles.bottomRectangle}>
        <Image
          source={require("../../assets/menu-home.png")}
          style={styles.rectangleImage}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  header: {
    paddingLeft: 20,
    paddingBottom: 10,
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
  },
  question: {
    fontSize: 18,
    paddingLeft: 20,
    paddingTop: 40,
    color: "#333",
  },
  emojiContainer: {
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "rgba(82, 255, 184, 0.31)",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  emoji: {
    width: 40,
    height: 40,
  },
  exploreText: {
    fontSize: 18,
    paddingLeft: 20,
    paddingTop: 40,
    marginBottom: 15,
    color: "#333",
  },
  exploreContainer: {
    marginLeft: 20,
    marginRight: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  exploreImage1: {
    resizeMode: "contain",
  },
  exploreImage2: {
    resizeMode: "contain",
  },
  exploreImage3: {
    resizeMode: "contain",
    marginTop: -8,
  },
  exploreImage4: {
    resizeMode: "contain",
    marginTop: -45,
  },
  bottomRectangle: {
    position: "absolute",
    bottom: 20,         
    height: 50,
    width: 200,         
    backgroundColor: "#000A74",
    borderRadius:50,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",  
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  
  rectangleImage: {
    width: 80, 
    height: 80, 
    resizeMode: "contain",
    left:10
 
  },
});