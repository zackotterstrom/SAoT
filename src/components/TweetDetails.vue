<template lang="pug">
    b-modal(id="tweetModal" title="Tweet details" ok-only)
      p(v-html="textWithKeyword(selected.text)")
      br
      strong {{sentimentToText(analysis.sentiment)}} ({{Math.round(analysis.sentiment.score * 10) / 10}})
      br
      br
      strong Categories:
      ul(v-if="analysis.category instanceof Array" v-for="(category, index) in analysis.category" :key="index")
        li {{category.name}}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Tweets extends Vue {
    @Prop({ default: {} }) analysis!: any
    @Prop({ default: {} }) selected!: any


    textWithKeyword(text : any) {
        if (text == undefined) return "";
        let keyword = this.keyword(this.analysis.entities);
        if (keyword == "") return "";

        return text.replace(new RegExp(keyword.name, "gi"), (match : string) => {
        return `<u v-b-tooltip.hover title="Importance: ${Math.round(keyword.salience * 10) / 10}" class="text-danger">${match}</u>`;
        });
    }

    keyword(value : any) {
        if (value instanceof Array) {
        return JSON.parse(JSON.stringify(value)).sort((a : any, b : any) => b.salience - a.salience)[0];
        }
        return "";
    }  

    sentimentToText(value : any) {
        let txt = "";
        value = value.score;

        if (value <= 1 && value > 0.7) {
            txt = "This is something VERY positive!";
        } else if (value <= 0.7 && value > 0.3) {
            txt = "This is positive!";
        } else if (value <= 0.3 && value > 0) {
            txt = "This is kinda positive.";
        } else if (value == 0) {
            txt = "This is neutral.";
        } else if (value <= 0 && value > -0.3) {
            txt = "This is kinda negative.";
        } else if (value <= -0.3 && value > -0.7) {
            txt = "This is negative.";
        } else if (value <= -0.7 && value > -1) {
            txt = "This is something VERY negative!";
        } else {
            txt = value
        }
        return txt;
    }
}
</script>
