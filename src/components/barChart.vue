<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  mounted() {
    this.renderChart(
      {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "Open Claims",
            data: [2, 3, 3, 4, 2, 3, 3],
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: false,
          text: "My Data"
        }
      }
    );
  }
};
</script>