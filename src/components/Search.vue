<template lang="pug">
  b-jumbotron(bg-variant="info" text-variant="white" border-variant="dark")
    template(slot="header") Testing
    template(slot="lead")
      | This is a text thart is uasdijo asidhn asoj dabsjd and
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
