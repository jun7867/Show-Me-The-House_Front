<script>
import { Line } from "vue-chartjs";
export default {
  extends: Line,
   data() {
     return {
        countList: [0,0,0,0,0,0,0,0,0,0,0,0],
        newList: [0,0,0,0,0,0,0,0,0,0,0,0],
     }
   },
  props: {
    aptlist: Array,
  },
  watch: {
    aptlist: function(newList) {
      this.countList= [0,0,0,0,0,0,0,0,0,0,0,0],
      newList.forEach((data) => {
        this.countList[data.dealMonth-1]++;
      });
      this.paint();
    }
  },
  created() {
    this.paint();
  },
  mounted() {
    this.paint();
  },
  methods: {
    paint() {
      this.renderChart(
      {
        labels: [
          "1월",
          "2월",
          "3월",
          "4월",
          "5월",
          "6월",
          "7월",
          "8월",
          "9월",
          "10월",
          "11월",
          "12월",
        ],
        datasets: [
          {
            label: `${this.aptlist[0].dong} 월별 매매량`,
            data: this.countList,
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "동네별 아파트 집값 동향"
        }
      }
    );
    }
  },
};
</script>