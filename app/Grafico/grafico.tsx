import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";

const width = Dimensions.get("window").width - 30;

const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const reacoesInfo = {
  alegre: { label: "Alegre", cor: "#FFD700", imagem: require("../../assets/alegre.png") },
  feliz: { label: "Feliz", cor: "#90EE90", imagem: require("../../assets/feliz (1).png") },
  indiferente: { label: "Indiferente", cor: "#C0C0C0", imagem: require("../../assets/indiferente.png") },
  triste: { label: "Triste", cor: "#87CEEB", imagem: require("../../assets/triste (1).png") },
  raiva: { label: "Raiva", cor: "#FF6347", imagem: require("../../assets/magoado.png") },
};

export default function Grafico() {
  const router = useRouter();
  const today = new Date();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [dados, setDados] = useState({});
  const [dadosMes, setDadosMes] = useState<any>({});

  const tipos = Object.keys(reacoesInfo);

  const carregarReacoes = async () => {
    const armazenado = await AsyncStorage.getItem("reacoes");
    const json = armazenado ? JSON.parse(armazenado) : {};
    setDados(json);
  };

  useEffect(() => {
    carregarReacoes();
  }, []);

  useEffect(() => {
    const dadosFiltrados: any = {};
    Object.entries(dados).forEach(([data, valores]: any) => {
      const dataObj = new Date(data);
      if (
        dataObj.getMonth() === currentMonthIndex &&
        dataObj.getFullYear() === currentYear
      ) {
        dadosFiltrados[data] = valores;
      }
    });
    setDadosMes(dadosFiltrados);
  }, [dados, currentMonthIndex, currentYear]);

  const monthLabel = `${meses[currentMonthIndex]} ${currentYear}`;

  const handlePreviousMonth = () => {
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonthIndex((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonthIndex((prev) => prev + 1);
    }
  };

  const totalPorTipo = Object.fromEntries(tipos.map((t) => [t, 0]));
  Object.values(dadosMes).forEach((v: any) => {
    tipos.forEach((tipo) => {
      totalPorTipo[tipo] += v[tipo] || 0;
    });
  });

  const dadosPizza = tipos.map((tipo) => ({
    name: tipo,
    count: totalPorTipo[tipo],
    //color: reacoesInfo[tipo].cor,
    legendFontColor: "#000",
    legendFontSize: 12,
  }));

  const totalReacoes = Object.values(totalPorTipo).reduce((a, b) => a + b, 0);

  const datasOrdenadas = Object.keys(dadosMes).sort();
  const labels = datasOrdenadas.map((d) => d.slice(8));
  const valoresLinha = datasOrdenadas.map((d) =>
    tipos.reduce((soma, tipo) => soma + (dadosMes[d][tipo] || 0), 0)
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.leftButton}>
          <Image source={require("../../assets/voltar.png")} style={styles.icon} />
        </TouchableOpacity>

        <View style={styles.monthContainer}>
          <TouchableOpacity onPress={handlePreviousMonth}>
            <Image source={require("../../assets/seta-esquerda.png")} style={styles.arrowIcon} />
          </TouchableOpacity>

          <Text style={styles.monthText}>{monthLabel}</Text>

          <TouchableOpacity onPress={handleNextMonth}>
            <Image source={require("../../assets/seta-direita.png")} style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => console.log("Menu pressionado")} style={styles.rightButton}>
          <Image source={require("../../assets/menu.png")} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Retângulo maior com borda cinza e título alinhado à esquerda */}
      <View style={styles.graficoContainer}>
        <Text style={styles.graficoTitulo}>Gráfico de humor mensal</Text>
        <LineChart
          data={{
            labels,
            datasets: [{ data: valoresLinha }],
          }}
          width={width - 20} // um pouco menor para caber no padding do container
          height={220}
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            color: () => "#000",
            labelColor: () => "#000",
            propsForDots: { r: "4", strokeWidth: "2", stroke: "#ffa726" },
          }}
          bezier
          style={{ borderRadius: 12 }}
        />
      </View>

      <Text style={styles.graficoTitulo}>Distribuição de Reações</Text>
      <View style={{ alignItems: "center" }}>
        <PieChart
          data={dadosPizza}
          width={width}
          height={220}
          accessor={"count"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          chartConfig={{
            color: () => "#000",
          }}
          center={[0, 0]}
          hasLegend={false}
        />
        <Text style={{ position: "absolute", top: 100, fontWeight: "bold", fontSize: 16 }}>
          {totalReacoes}
        </Text>
        {/* <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginTop: 10 }}>
          {tipos.map((tipo) => (
            <View key={tipo} style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 8, marginVertical: 4 }}>
              <Image source={reacoesInfo[tipo].imagem} style={{ width: 20, height: 20, marginRight: 4 }} />
              <Text style={{ fontSize: 12 }}>{totalPorTipo[tipo]}</Text>
            </View>
          ))}
        </View> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 15,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    marginBottom: 20,
    position: "relative",
  },
  leftButton: {
    position: "absolute",
    top: -20,
    left: 0,
    padding: 8,
  },
  rightButton: {
    position: "absolute",
    top: -20,
    right: 0,
    padding: 8,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  monthContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C2BDBD",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  monthText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginHorizontal: 10,
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: "#000",
    resizeMode: "contain",
  },
  graficoTitulo: {
    fontSize: 16,
    marginBottom: 30,
    alignSelf: "flex-start",
    color: "#A1A1A1",
  },
  graficoContainer: {
    borderWidth: 1,
    borderColor: "#E6E6E6",
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
  },
});
