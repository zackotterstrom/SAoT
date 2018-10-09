<template lang="pug">
    b-jumbotron
        b-list-group
            b-list-group-item.pointer.flex-column.align.items.start(v-if="tweets.length > 0" v-for="(node, index) in tweets" :key="index" @click="show_tweet(node)")
                h5.mb-1 {{ node.user['name'] }}
                small mentions: {{ node.entities.mentions.length }}
                p.mb-1 {{ node['text'] }}
        p.text-xl-center(v-if="tweets.length == 0")
            font-awesome-icon(icon="exclamation-circle")
            |  No one seems to be tweeting about this subject!
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

