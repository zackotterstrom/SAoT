<template lang="pug">
   b-jumbotron
    b-container
      b-row
        b-col#positivity
          Strong Overall positivity: 
          LoadingIcon(v-if="!done.sentiment")
          p(v-if="done.sentiment") {{sentimentText}} ({{Math.round(analysis.sentiment.score * 10) / 10}})
        b-col#emotion
          Strong Overall emotion:
          LoadingIcon(v-if="!done.sentiment")
          p(v-if="done.sentiment") {{Math.round(analysis.sentiment.magnitude * 10) / 10}}
      b-row
        b-col#category
          Strong Overall categories:
          LoadingIcon(v-if="!done.category")
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

@Component({
  components: {
    LoadingIcon
  }
})

export default class Search extends Vue {
  @Prop({ default: {} }) analysis!: any
  @Prop({ default: "" }) sentimentText!: string
  @Prop({ default: "" }) keyword!: string
  @Prop({ default: {} }) done!: any

  created() {
    console.log(this.done);
  }
}
</script>
