<template lang="pug">
   b-jumbotron
    h1 Semantic Summary
    p Overall positivity: {{Math.round(analysis.sentiment.score * 10) / 10}} ({{sentimentText}})
    p Overall emotion: {{Math.round(analysis.sentiment.magnitude * 10) / 10}}
    p Overall categories:
    ul(v-if="analysis.category instanceof Array" v-for="(category, index) in analysis.category" :key="index")
      li {{category.name}}
    p Most meaningful word(s) overall: {{keyword}}
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Search extends Vue {
  @Prop({ default: {} }) analysis!: any
  @Prop({ default: ""}) sentimentText!: string
  @Prop({ default: ""}) keyword!: string
}
</script>
