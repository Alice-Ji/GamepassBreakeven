// ======================
// Game Value Dashboard
// ======================

// Run once on page load
document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => input.addEventListener("input", updateCalc));
  updateCalc(); // initialize with defaults
});

function updateCalc() {
  const sub = parseFloat(document.getElementById("sub").value) || 0;
  const cost = parseFloat(document.getElementById("cost").value) || 0;
  const games = parseFloat(document.getElementById("games").value) || 1;
  const hours = parseFloat(document.getElementById("hours").value) || 1;
  const years = parseFloat(document.getElementById("years").value) || 1;

  // update slider labels live
  document.getElementById("gamesValue").textContent = games;
  document.getElementById("hoursValue").textContent = hours;

  const totalBuy = cost * games * years;
  const totalSub = sub * 12 * years;
  const buyPerHour = totalBuy / (hours * years);
  const subPerHour = totalSub / (hours * years);

  const betterEl = document.getElementById("better");
  let better, color;

  // handle equal case
  if (buyPerHour === subPerHour) {
  better = "Equal value";
  color = "#ffffff"; //
  } else if (buyPerHour < subPerHour) {
  better = "Buying games";
  color = "#00ffff";
  } else {
  better = "Subscription";
  color = "#ff00ff";
  }

  betterEl.textContent = better;
  betterEl.style.color = color;


  // ======================
  // Update Chart Data
  // ======================
  const labels = Array.from({ length: years }, (_, i) => i + 1);
  const buyData = labels.map((y) => cost * games * y);
  const subData = labels.map((y) => sub * 12 * y);

  amortChart.data.labels = labels;
  amortChart.data.datasets[0].data = buyData;
  amortChart.data.datasets[1].data = subData;
  amortChart.update();
}

// ======================
// Neon Chart Setup
// ======================
let amortChart;

document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("amortChart").getContext("2d");
  amortChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Buying",
          data: [],
          borderColor: "#00ffff",
          backgroundColor: "rgba(0,255,255,0.1)",
          borderWidth: 2,
          tension: 0.3,
          fill: true,
        },
        {
          label: "Subscription",
          data: [],
          borderColor: "#ff00ff",
          backgroundColor: "rgba(255,0,255,0.1)",
          borderWidth: 2,
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: "#fff",
            font: { family: "Orbitron", size: 12 },
          },
        },
      },
      scales: {
        x: {
          ticks: { color: "#aaa" },
          grid: { color: "rgba(255,255,255,0.05)" },
          title: { display: true, text: "Years", color: "#ccc" },
        },
        y: {
          ticks: { color: "#aaa" },
          grid: { color: "rgba(255,255,255,0.05)" },
          title: { display: true, text: "Total Cost ($)", color: "#ccc" },
        },
      },
    },
  });
});
