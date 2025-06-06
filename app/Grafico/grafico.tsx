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

const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const width = Dimensions.get("window").width - 30;

export default function Grafico() {
  const router = useRouter();
  const today = new Date();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [dados, setDados] = useState({});
  const [dadosMes, setDadosMes] = useState<any>({});

  const tipos = ["feliz", "triste", "ansioso"];

  const salvarReacao = async (tipo: string) => {
    const hoje = new Date().toISOString().split("T")[0];
    const armazenado = await AsyncStorage.getItem("reacoes");
    const json = armazenado ? JSON.parse(armazenado) : {};

    if (!json[hoje]) {
      json[hoje] = { feliz: 0, triste: 0, ansioso: 0 };
    }

    json[hoje][tipo] += 1;

    await AsyncStorage.setItem("reacoes", JSON.stringify(json));
    setDados(json); // atualiza para refletir no gráfico
  };

  const carregarReacoes = async () => {
    const armazenado = await AsyncStorage.getItem("reacoes");
    const json = armazenado ? JSON.parse(armazenado) : {};
    setDados(json);
  };

  useEffect(() => {
    carregarReacoes();
  }, []);

  useEffect(() => {
    // Filtra dados do mês atual
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

  // Gráfico de Pizza - soma total de reações
  const totalPorTipo = { feliz: 0, triste: 0, ansioso: 0 };
  Object.values(dadosMes).forEach((v: any) => {
    totalPorTipo.feliz += v.feliz;
    totalPorTipo.triste += v.triste;
    totalPorTipo.ansioso += v.ansioso;
  });

  const dadosPizza = [
    {
      name: "Feliz",
      count: totalPorTipo.feliz,
      color: "#FFD700",
      legendFontColor: "#000",
      legendFontSize: 12,
    },
    {
      name: "Triste",
      count: totalPorTipo.triste,
      color: "#00BFFF",
      legendFontColor: "#000",
      legendFontSize: 12,
    },
    {
      name: "Ansioso",
      count: totalPorTipo.ansioso,
      color: "#FF6347",
      legendFontColor: "#000",
      legendFontSize: 12,
    },
  ];

  // Gráfico de Linha - total diário
  const datasOrdenadas = Object.keys(dadosMes).sort();
  const labels = datasOrdenadas.map((d) => d.slice(8)); // dia
  const valoresLinha = datasOrdenadas.map(
    (d) =>
      dadosMes[d].feliz + dadosMes[d].triste + dadosMes[d].ansioso
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

      <View style={styles.reacoes}>
        {tipos.map((tipo) => (
          <TouchableOpacity key={tipo} onPress={() => salvarReacao(tipo)} style={styles.reacaoBotao}>
            <Text style={styles.reacaoTexto}>{tipo.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.graficoTitulo}>Distribuição de Reações</Text>
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
      />

      <Text style={styles.graficoTitulo}>Evolução Diária</Text>
      <LineChart
        data={{
          labels: labels,
          datasets: [{ data: valoresLinha }],
        }}
        width={width}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          color: () => "#000",
          labelColor: () => "#000",
          propsForDots: { r: "4", strokeWidth: "2", stroke: "#ffa726" },
        }}
        bezier
        style={{ marginVertical: 8, borderRadius: 12 }}
      />
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
  reacoes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  reacaoBotao: {
    backgroundColor: "#ececec",
    padding: 10,
    borderRadius: 10,
  },
  reacaoTexto: {
    fontWeight: "bold",
    color: "#333",
  },
  graficoTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "center",
  },
});
