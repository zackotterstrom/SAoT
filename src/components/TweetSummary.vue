<template lang="pug">
   b-jumbotron
    b-container
      b-row
        b-col#positivity
          Strong Overall positivity:
          LoadingIcon(v-if="!done.sentiment")
          p(v-if="done.sentiment") {{sentimentText}} ({{ analysis.sentiment.score.toFixed(1) }})
          TweetGauge(v-if="done.sentiment" :percent="(analysis.sentiment.score + 1) * 50" id="summary_sentiment_guage" :sections="sentiment_sections")
        b-col#emotion
          Strong Overall emotion:
          LoadingIcon(v-if="!done.sentiment")
          p(v-if="done.sentiment") {{analysis.sentiment.magnitude.toFixed(1)}}
          TweetGauge(v-if="done.sentiment" :percent="(analysis.sentiment.magnitude) * 20" id="summary_emotion_guage" :sections="emotion_sections")
      b-row
        b-col#category
          Strong Overall categories:
          LoadingIcon(v-if="!done.category")
          p(v-if="done.category && !(analysis.category instanceof Array)") {{ analysis.category }}
          div(v-if="analysis.category instanceof Array" v-for="(category, index) in analysis.category" :key="index")
            p {{category.name}}
        b-col#keyword
          Strong Most meaningful word(s) overall:
          LoadingIcon(v-if="!done.entities")
          p(v-if="done.entities") {{keyword}}
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import LoadingIcon from '@/components/LoadingIcon.vue';
import TweetGauge from '@/components/TweetGauge.vue';

@Component({
  components: {
    LoadingIcon,
    TweetGauge
  }
})

export default class Search extends Vue {
  @Prop({ default: {} }) analysis!: any
  @Prop({ default: "" }) sentimentText!: string
  @Prop({ default: "" }) keyword!: string
  @Prop({ default: {} }) done!: any
}
</script>
