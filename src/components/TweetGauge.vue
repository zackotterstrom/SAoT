<template lang="pug">
   div(id='chartdiv')
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
const AmCharts = require('amcharts3/amcharts/amcharts');

@Component
export default class TweetGauge extends Vue {
  @Prop() id: any

  chart : any = undefined;

  created() {
    this.chart = AmCharts.makeChart("chartdiv", {
        "theme": "light",
        "type": "gauge",
        "axes": [{
          "topTextFontSize": 20,
          "topTextYOffset": 70,
          "axisColor": "#31d6ea",
          "axisThickness": 1,
          "endValue": 100,
          "gridInside": true,
          "inside": true,
          "radius": "50%",
          "valueInterval": 10,
          "tickColor": "#67b7dc",
          "startAngle": -90,
          "endAngle": 90,
          "unit": "%",
          "bandOutlineAlpha": 0,
          "bands": [{
            "color": "#0080ff",
            "endValue": 100,
            "innerRadius": "105%",
            "radius": "170%",
            "gradientRatio": [0.5, 0, -0.5],
            "startValue": 0
          }, {
            "color": "#3cd3a3",
            "endValue": 0,
            "innerRadius": "105%",
            "radius": "170%",
            "gradientRatio": [0.5, 0, -0.5],
            "startValue": 0
          }]
        }],
        "arrows": [{
          "alpha": 1,
          "innerRadius": "35%",
          "nailRadius": 0,
          "radius": "170%"
        }]
      });

      setInterval(this.randomValue, 2000);

      // set random value
  }

  randomValue() {
    if (this.chart == undefined) return;

    var value = Math.round(Math.random() * 100);
    this.chart.arrows[0].setValue(value);
    this.chart.axes[0].setTopText(value + " %");
    // adjust darker band to new value
    this.chart.axes[0].bands[1].setEndValue(value);
    }
}
</script>

<style lang="sass" scoped>
  #chartdiv
    width: 100%
    height: 500px
</style>

