<template lang="pug">
  div.chart-gauge(:id="id")
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from 'vue-property-decorator';
const d3 = require("d3");

@Component
export default class TweetGauge extends Vue {
  @Prop() percent : any;
  @Prop() id : any;
  @Prop({default: 400}) w : any
  @Prop({default: [{label: "Gauge", fill: "#DEA82C"}]}) sections : any;

  sectionPerc = 1 / this.sections.length / 2;
  padRad = 0.025;
  chartInset = 10;

  margin = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

  width = 0;
  height = 0;
  radius = 0;
  barWidth = 0;

  needle_len = 0;
  needle_radius = 0;

  // Orientation of gauge:
  totalPercent = .75;

  el : any = undefined;
  svg : any = undefined;
  chart : any = undefined;

  old_perc = 0;

  //Utility methods
  percToDeg(perc : number) {
    return perc * 360;
  }

  percToRad(perc : number) {
    return this.degToRad(this.percToDeg(perc));
  };

  degToRad(deg : number) {
    return deg * Math.PI / 180;
  }

  drawGauge() {
    this.sections.forEach((section : any, sectionIndx : number) => {
      let arcStartRad = this.percToRad(this.totalPercent);
      let arcEndRad = arcStartRad + this.percToRad(this.sectionPerc);
      this.totalPercent += this.sectionPerc;

      let startPadRad = sectionIndx == 0 ? 0 : this.padRad / 2;
      let endPadRad = sectionIndx == this.sections.length ? 0 : this.padRad / 2

      let arc = d3.arc()
                  .outerRadius(this.radius - this.chartInset)
                  .innerRadius(this.radius - this.chartInset - this.barWidth)
                  .startAngle(arcStartRad + startPadRad)
                  .endAngle(arcEndRad - endPadRad);

      this.chart.append('path')
                .attr('id', `arc-${sectionIndx}`)
                .attr('class', `arc`)
                .attr('fill', section.fill)
                .attr('d', arc);

      this.chart.append("text")
        .attr("x", -10)   //Move the text from the start angle of the arc
        .attr("dy", this.barWidth / 2) //Move the text down
        .append("textPath") //append a textPath to the text element
        .attr("xlink:href", `#arc-${sectionIndx}`) //place the ID of the path here
        .style("text-anchor","middle") //place the text halfway on the arc
        .attr("fill", this.getLabelColour(section.fill))
        .attr("startOffset", "25%")
        .text(section.label);
    });
  }

  getLabelColour(bgColour : string) {
    bgColour = bgColour.slice(1);
    return (parseInt(bgColour, 16) > (0xffffff/2) ? '#333' : '#fff');
  }

  mounted() {
    this.el = d3.select(`#${this.id}`);

    this.el.style("width", `${this.w}px`);
    this.el.style("height", `${this.w / 2}px`);
    this.width = this.w - this.margin.left - this.margin.right;
    this.height = this.width;
    this.radius = Math.min(this.width, this.height) / 2;
    this.barWidth = 40 * this.width / 300;

    // Create SVG element
    this.svg = this.el.append('svg')
                      .attr('width', this.width + this.margin.left + this.margin.right)
                      .attr('height', this.height + this.margin.top + this.margin.bottom);

    // Add layer for the panel
    this.chart = this.svg.append('g')
                  .attr('transform', "translate(" + ((this.width) / 2 + this.margin.left) + ", "
                          + ((this.height + this.margin.top) / 2) + ")");

    this.needle_len = this.width / 2.5;
    this.needle_radius = this.needle_len / 8;

    this.drawGauge();

    this.drawOn(0);
    this.animateOn(this.percent / 100.0, 500);
  }

  mkCmd(perc : number) {
    let thetaRad = this.percToRad(perc / 2);
    let centerX = 0;
    let centerY = 0;
    let topX = centerX - this.needle_len * Math.cos(thetaRad);
    let topY = centerY - this.needle_len * Math.sin(thetaRad);
    let leftX = centerX - this.needle_radius * Math.cos(thetaRad - Math.PI / 2);
    let leftY = centerY - this.needle_radius * Math.sin(thetaRad - Math.PI / 2);
    let rightX = centerX - this.needle_radius * Math.cos(thetaRad + Math.PI / 2);
    let rightY = centerY - this.needle_radius * Math.sin(thetaRad + Math.PI / 2);

    return `M ${leftX} ${leftY} L ${topX} ${topY} L ${rightX} ${rightY}`
  }

  drawOn(perc : number) {
    this.chart.append('circle')
            .attr('class', 'needle-center')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', this.needle_radius);

    this.chart.append('path')
            .attr('class', 'needle')
            .attr('d', this.mkCmd(perc))
  }

  animateOn(perc : number, delay : number) {
    let that = this;
    let old = this.old_perc;
    this.chart
        .transition()
        .delay(delay)
        .ease(d3.easeElastic)
        .duration(3000)
        .selectAll('.needle')
        .tween('progress', function(this: any) {
          let node = this;
          return function(percentOfPercent : number) {
            let progress = that.lerp(old, perc, percentOfPercent);
            node.setAttribute('d', that.mkCmd(progress));
          }
        });
    this.old_perc = perc;
  }

  lerp(value1 : number, value2 : number, amount : number) {
    return value1 + (value2 - value1) * amount;
  }

  @Watch('percent')
  onPercentChanged(val : number, old : number) {
    this.animateOn(val / 100.0, 0);
  }
}
</script>

<style lang="sass">
.chart-gauge
  margin: 20px 0px;

.needle,
.needle-center
  fill: #464A4F

</style>

