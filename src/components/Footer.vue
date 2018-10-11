<template lang="pug">
    Footer(color="blue").font-small.pt-4.mt-4
        container.text-left
            row
                colum(sm="6")
                    h5 Footer Content
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
    goHome() {
      this.$router.push("/");
    };

    goAbout() {
      this.$router.push("/about");
    };
};
</script>

<style scoped lang="sass">

</style>
