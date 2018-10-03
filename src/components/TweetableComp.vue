<template lang="pug">
    b-jumbotron(bg-variant="light" text-variant="dark" header="Tweetable?")
        b-input-group
            b-form-textarea(size="lg" rows="5" placeholder="paste your tweet in here..." v-model="tweet")
            b-input-group
             b-btn(@click="tweetquery()") check
             p {{store}}
            
</template>

<script lang="ts">

import {Component, Vue} from 'vue-property-decorator'
import LoadingIcon from '@/components/LoadingIcon.vue'
import Search from '@/components/Search.vue'
import Tweets from '@/views/Tweets.vue'

@Component({
    components: {
        LoadingIcon,
        Tweets
    }
})


export default class Tweetable extends Vue{
    tweet : string = ""
    analysis_endpoint : string = `http://us-central1-saot-217513.cloudfunctions.net/sentiment-analysis`;
    detailDone : any = { sentiment : false, category : false, entities : false };
    store : string = "10000"
    
    tweetquery(){
        this.analyse(this.tweet, "sentiment", this.store)
    }
    analyse(tweet : string, type : string, analysis : any) {

    this.axios.get(`${this.analysis_endpoint}?message=${tweet}&type=${type}`).then((resp) => {
        analysis[type] = resp.data;
        Vue.set(this.detailDone, type, true);
        }).catch((reason) => {
        analysis[type] = reason.response.data.details;
        Vue.set(this.detailDone, type, true);
            });
        }
    }
</script>

<style lang="sass">
</style>

