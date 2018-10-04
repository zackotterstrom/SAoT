<template lang="pug">
    b-modal#tweetModal(title="Tweet details" ok-only)
        b-container
            b-row
                b-col#user(v-if="selected.user")
                    b-link(target="_blank" :href="selected.user.profile")
                        b-img.m-1(rounded="circle" width="50" height="50" alt="user" :src="selected.user.pic")
                    b-link(target="_blank" :href="selected.user.profile")
                        Strong  {{ selected.user.name }}
            b-row
                b-col#entities
                    LoadingIcon(v-if="!done.entities")
                    p(v-if="done.entities" v-html="textWithKeyword(selected.text)")
            b-row(v-if="selected.entities")
                b-col#photo(v-if="selected.entities.media" cols="12")
                    b-img.w-100(v-if="selected.entities.media.photo != ''" :src="selected.entities.media.photo")
                b-col#hashtags(v-if="selected.entities.hashtags.length > 0" cols="12")
                    Strong Hashtags:
                    ul(v-if="selected.entities.hashtags instanceof Array" v-for="(hashtag, index) in selected.entities.hashtags" :key="index")
                        li {{ hashtag }}
                b-col#mentions(v-if="selected.entities.mentions.length > 0" cols="12")
                    Strong Mentions:
                    ul(v-if="selected.entities.mentions instanceof Array" v-for="(mention, index) in selected.entities.mentions" :key="index")
                        li
                            b-link(target="_blank" :href="mention.account") {{ mention.name }}
                b-col#urls(v-if="selected.entities.urls.length > 0" cols="12")
                    Strong Links:
                    ul(v-if="selected.entities.urls instanceof Array" v-for="(url, index) in selected.entities.urls" :key="index")
                        li
                            b-link(target="_blank" :href="url") {{ url }}
            b-row
                b-col#sentiment
                    strong Sentiment:
                    LoadingIcon(v-if="!done.sentiment")
                    p(v-if="done.sentiment") {{ sentimentToText(analysis.sentiment )}} ({{ analysis.sentiment.score.toFixed(1) }})
                b-col#category
                    strong Categories:
                    LoadingIcon(v-if="!done.category")
                    p(v-if="done.category && !(analysis.category instanceof Array)") {{ analysis.category }}
                    ul(v-if="analysis.category instanceof Array" v-for="(category, index) in analysis.category" :key="index")
                        li(v-if="done.category") {{ category.name }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import LoadingIcon from '@/components/LoadingIcon.vue';

@Component({
  components: {
    LoadingIcon
  }
})

export default class Tweets extends Vue {
    @Prop({ default: {} }) analysis!: any
    @Prop({ default: {} }) selected!: any
    @Prop({ default: { sentiment : false, category : false, entities : false } }) done!: any


    textWithKeyword(text : any) {
        if (text == undefined) return "";
        let keyword = this.keyword(this.analysis.entities);
        if (keyword == "" || keyword == undefined) return text;

        return text.replace(new RegExp(keyword.name, "gi"), (match : string) => {
        return `<u v-b-tooltip.hover title="Importance: ${Math.round(keyword.salience * 10) / 10}" class="text-danger">${match}</u>`;
        });

    }

    keyword(value : any) {
        if (value instanceof Array) {
            return JSON.parse(JSON.stringify(value)).sort((a : any, b : any) => b.salience - a.salience)[0];
        };
            return "";
    }

    sentimentToText(value : any) {
        let txt = "";
        value = value.score;

        if (value <= 1 && value > 0.7) {
            txt = "This is something VERY positive!";
        } else if (value <= 0.7 && value > 0.3) {
            txt = "This is positive!";
        } else if (value <= 0.3 && value > 0) {
            txt = "This is kinda positive.";
        } else if (value == 0) {
            txt = "This is neutral.";
        } else if (value <= 0 && value > -0.3) {
            txt = "This is kinda negative.";
        } else if (value <= -0.3 && value > -0.7) {
            txt = "This is negative.";
        } else if (value <= -0.7 && value > -1) {
            txt = "This is something VERY negative!";
        } else {
            txt = value
        }
        return txt;
    }
}
</script>

<style lang="sass">
    .text-danger
        cursor: default
</style>
