<template lang="pug">
    b-modal#tweetModal(title="Tweet details" ok-only)
        b-container
            b-row
                b-col#entities
                    strong Tweet:
                    LoadingIcon(v-if="!done.entities")
                    p(v-if="done.entities" v-html="textWithKeyword(selected.text)")
            b-row
                b-col#sentiment
                    strong Sentiment:
                    LoadingIcon(v-if="!done.sentiment")
                    p(v-if="done.sentiment") {{sentimentToText(analysis.sentiment)}} ({{ analysis.sentiment.score.toFixed(1) }})
                b-col#category
                    strong Categories:
                    LoadingIcon(v-if="!done.category")
                    p(v-if="done.category && !(analysis.category instanceof Array)") {{ analysis.category }}
                    ul(v-if="analysis.category instanceof Array" v-for="(category, index) in analysis.category" :key="index")
                        li(v-if="done.category") {{category.name}}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import LoadingIcon from '@/components/LoadingIcon.vue';
import {sentimentToText} from "@/api"

@Component({
  components: {
    LoadingIcon
  }
})

export default class Tweets extends Vue {
    @Prop({ default: {} }) analysis!: any
    @Prop({ default: {} }) selected!: any
    @Prop({ default: { sentiment : false, category : false, entities : false } }) done!: any


    textWithKeyword(text : any) {
      if (text == undefined) return "";
      let keyword = this.keyword(this.analysis.entities);
      if (keyword == "" || keyword == undefined) return text;

      return text.replace(new RegExp(keyword.name, "gi"), (match : string) => {
        return `<u v-b-tooltip.hover title="Importance: ${Math.round(keyword.salience * 10) / 10}" class="text-danger">${match}</u>`;
      });
    }

    keyword(value : any) {
      // We use json parse and stringify to duplicate the array so we can modify it without creating an infinite loop
      if (value instanceof Array) return JSON.parse(JSON.stringify(value)).sort((a : any, b : any) => b.salience - a.salience)[0];
      else return "";
    }
}
</script>
