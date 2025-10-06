<canvas id="grafico"></canvas>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels"></script>
<script src="config.js"></script> <!-- usa seu API_BASE -->

<script>
  async function carregarGrafico() {
    const ctx = document.getElementById("grafico").getContext("2d");

    try {
      const res = await fetch(`${API_BASE}/relatorio-acidente/estatisticas`);
      const dados = await res.json();

      // Supondo que o backend retorne algo como [{ mes: "Janeiro", total: 5 }, ...]
      const labels = dados.map(d => d.mes);
      const valores = dados.map(d => d.total);

      new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [{
            label: "Acidentes",
            data: valores,
            backgroundColor: "#4A90E2",
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: true, text: "Relatório Estatístico Geral" },
            datalabels: {
              anchor: "end",
              align: "end",
              color: "#000",
              font: { weight: "bold" },
            }
          },
          scales: {
            y: { beginAtZero: true, ticks: { stepSize: 1 } }
          }
        },
        plugins: [ChartDataLabels],
      });

    } catch (err) {
      console.error("Erro ao carregar gráfico:", err);
    }
  }

  carregarGrafico();
</script>
