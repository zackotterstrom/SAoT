<template lang="pug">
    b-jumbotron(bg-variant="light" text-variant="dark" header="Tweetable?")
        b-input-group
            b-form-textarea(size="lg" rows="5" placeholder="paste your tweet in here..." v-model="tweet")
            b-input-group
             b-btn(@click="tweetquery()") check
             
            
</template>

<script lang="ts">

import {Component, Vue} from 'vue-property-decorator'
import LoadingIcon from '@/components/LoadingIcon.vue'
import Search from '@/components/Search.vue'
import Tweets from '@/views/Tweets.vue'
import {analyse, sentimentToText} from '@/api'

@Component({
    components: {
        LoadingIcon,
        Tweets
    }
})


export default class Tweetable extends Vue{
    tweet : string = ""
    analysis : any = { sentiment : {}, category : {}, entities : {} };
    detailDone : any = { sentiment : false, category : false, entities : false };
    store : string = "10000"
    SA : string = ""
    SAcat : string = ""
        
        tweetquery(){
            analyse(Vue, this.tweet, "sentiment", this.analysis, this.detailDone);
            analyse(Vue, this.tweet, "category", this.analysis, this.detailDone);
            analyse(Vue, this.tweet, "entities", this.analysis, this.detailDone);

            
        }
    
    }
</script>

<style lang="sass">
</style>

