<template lang="pug">
    b-jumbotron
        b-list-group
            b-list-group-item(v-for="(node, index) in tweets" :key="index").flex-column.align.items.start
                .d-flex.w-100.justify-content-between
                h5.mb-1 {{node['user']}}
                small 3 days ago
                p.mb-1 {{node['text']}}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class TweetList extends Vue {
    @Prop({ default: [] }) tweets!: Array<Object>
}
</script>
