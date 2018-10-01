<template lang="pug">
    b-jumbotron

        b-list-group
            b-list-group-item.pointer(v-for="(node, index) in tweets" :key="index" @click="show_tweet(node)").flex-column.align.items.start
                .d-flex.w-100.justify-content-between
                h5.mb-1 {{node['user']}}
                small mentions: {{node.mentions.length}}
                p.mb-1 {{node['text']}}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class TweetList extends Vue {
    @Prop({ default: [] }) tweets!: Array<Object>

    show_tweet (tweet:any) {
        this.$emit('show-tweet', tweet)
    }
}
</script>

<style lang="sass" scoped>
  .pointer
    cursor: pointer
</style>

