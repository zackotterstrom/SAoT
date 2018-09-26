<template lang="pug">
  b-jumbotron(bg-variant="info" text-variant="white" border-variant="dark")
    template(slot="header") Testing
    template(slot="lead")
      | This is a text that is used to test something. Very interesting! 
      font-awesome-icon(icon="coffee")
    hr.my-4
    p It is very nice
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Search extends Vue {
  @Prop() private msg!: string;
}
</script>

<style scoped lang="scss">
</style>
