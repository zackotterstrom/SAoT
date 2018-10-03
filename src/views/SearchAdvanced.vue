<template lang="pug">
  b-jumbotron(bg-variant="light" text-variant="dark")
    template(slot="header") Advanced search for tweets
    template(slot="lead")
      form.t1-form.twitter-form
        fieldset
          legend
            span Words
          .txt
            label
              span.td All of these words
              input(name='ands' type='text' v-model="all_words")
          .txt
            label
              span.td This exact phrase
              input(name='phrase' type='text' v-model="exact_words")
          .txt
            label
              span.td Any of these words
              input(name='ors' type='text' v-model="any_words")
          .txt
            label
              span.td None of these words
              input(name='nots' type='text' v-model="none_words")
          .txt
            label
              span.td These hashtags
              input(name='tag' type='text' v-model="hashtags")
          .txt
            label
              span.td Written in
              select(name='lang' v-model="lang")
                option(value='all') All languages
                option(disabled='disabled') ---
                option(value='en') English (English)
                option(value='sv') Swedish (svenska)
                option(value='ja') Japanese (&#x65E5;&#x672C;&#x8A9E;)
                option(value='ar') Arabic (&#x627;&#x644;&#x639;&#x631;&#x628;&#x64A;&#x629;)
                option(value='es') Spanish (espa&ntilde;ol)
                option(disabled='disabled') ---
                option(value='am') Amharic (&#x12A0;&#x121B;&#x122D;&#x129B;)
                option(value='hy') Armenian (&#x570;&#x561;&#x575;&#x565;&#x580;&#x565;&#x576;)
                option(value='bn') Bangla (&#x9AC;&#x9BE;&#x982;&#x9B2;&#x9BE;)
                option(value='bg') Bulgarian (&bcy;&hardcy;&lcy;&gcy;&acy;&rcy;&scy;&kcy;&icy;)
                option(value='my') Burmese (&#x1019;&#x103C;&#x1014;&#x103A;&#x1019;&#x102C;)
                option(value='ckb') Central Kurdish (&#x6A9;&#x648;&#x631;&#x62F;&#x6CC;&#x6CC; &#x646;&#x627;&#x648;&#x6D5;&#x646;&#x62F;&#x6CC;)
                option(value='zh') Chinese (&#x4E2D;&#x6587;)
                option(value='da') Danish (dansk)
                option(value='dv') Divehi (Divehi)
                option(value='nl') Dutch (Nederlands)
                option(value='et') Estonian (eesti)
                option(value='fi') Finnish (suomi)
                option(value='fr') French (fran&ccedil;ais)
                option(value='ka') Georgian (&#x10E5;&#x10D0;&#x10E0;&#x10D7;&#x10E3;&#x10DA;&#x10D8;)
                option(value='de') German (Deutsch)
                option(value='el') Greek (&Epsilon;&lambda;&lambda;&eta;&nu;&iota;&kappa;&#x3AC;)
                option(value='gu') Gujarati (&#xA97;&#xAC1;&#xA9C;&#xAB0;&#xABE;&#xAA4;&#xAC0;)
                option(value='ht') Haitian Creole (Haitian Creole)
                option(value='he') Hebrew (&#x5E2;&#x5D1;&#x5E8;&#x5D9;&#x5EA;)
                option(value='hi') Hindi (&#x939;&#x93F;&#x928;&#x94D;&#x926;&#x940;)
                option(value='hu') Hungarian (magyar)
                option(value='is') Icelandic (&iacute;slenska)
                option(value='id') Indonesian (Indonesia)
                option(value='it') Italian (italiano)
                option(value='kn') Kannada (&#xC95;&#xCA8;&#xCCD;&#xCA8;&#xCA1;)
                option(value='km') Khmer (&#x1781;&#x17D2;&#x1798;&#x17C2;&#x179A;)
                option(value='ko') Korean (&#xD55C;&#xAD6D;&#xC5B4;)
                option(value='lo') Lao (&#xEA5;&#xEB2;&#xEA7;)
                option(value='lv') Latvian (latvie&scaron;u)
                option(value='lt') Lithuanian (lietuvi&uogon;)
                option(value='ml') Malayalam (&#xD2E;&#xD32;&#xD2F;&#xD3E;&#xD33;&#xD02;)
                option(value='mr') Marathi (&#x92E;&#x930;&#x93E;&#x920;&#x940;)
                option(value='ne') Nepali (&#x928;&#x947;&#x92A;&#x93E;&#x932;&#x940;)
                option(value='no') Norwegian (norsk)
                option(value='or') Odia (&#xB13;&#xB21;&#xB3C;&#xB3F;&#xB06;)
                option(value='ps') Pashto (&#x67E;&#x69A;&#x62A;&#x648;)
                option(value='fa') Persian (&#x641;&#x627;&#x631;&#x633;&#x6CC;)
                option(value='pl') Polish (polski)
                option(value='pt') Portuguese (portugu&ecirc;s)
                option(value='pa') Punjabi (&#xA2A;&#xA70;&#xA1C;&#xA3E;&#xA2C;&#xA40;)
                option(value='ro') Romanian (rom&acirc;n&abreve;)
                option(value='ru') Russian (&rcy;&ucy;&scy;&scy;&kcy;&icy;&jcy;)
                option(value='sr') Serbian (&scy;&rcy;&pcy;&scy;&kcy;&icy;)
                option(value='sd') Sindhi (&#x633;&#x646;&#x68C;&#x64A;)
                option(value='si') Sinhala (&#xDC3;&#xDD2;&#xD82;&#xDC4;&#xDBD;)
                option(value='sl') Slovenian (sloven&scaron;&ccaron;ina)
                option(value='tl') Tagalog (Tagalog)
                option(value='ta') Tamil (&#xBA4;&#xBAE;&#xBBF;&#xBB4;&#xBCD;)
                option(value='te') Telugu (&#xC24;&#xC46;&#xC32;&#xC41;&#xC17;&#xC41;)
                option(value='th') Thai (&#xE44;&#xE17;&#xE22;)
                option(value='bo') Tibetan (&#xF56;&#xF7C;&#xF51;&#xF0B;&#xF66;&#xF90;&#xF51;&#xF0B;)
                option(value='tr') Turkish (T&uuml;rk&ccedil;e)
                option(value='ur') Urdu (&#x627;&#x631;&#x62F;&#x648;)
                option(value='ug') Uyghur (&#x626;&#x6C7;&#x64A;&#x63A;&#x6C7;&#x631;&#x686;&#x6D5;)
                option(value='vi') Vietnamese (Ti&#x1EBF;ng Vi&#x1EC7;t)
        fieldset
          legend
            span People
          .txt
            label.t1-label
              span.td From these accounts
              input(name='from' type='text' v-model="from")
          .txt
            label.t1-label
              span.td To these accounts
              input(name='to' type='text' v-model="to")
          .txt
            label.t1-label
              span.td Mentioning these accounts
              input(name='ref' type='text' v-model="mention")
        fieldset
          legend
            span Other
          .txt
            label.t1-label
              span.td Tweet count
              input(type="number" min="1" max="100" v-model="count")
          .txt
            label.t1-label
              span.td Result type
              select(name='result_type' v-model="result_type")
                option(value='mixed') Include popular and recent.
                option(value='recent') Only recent.
                option(value='popular') Only popular.
        b-btn(size="sm" variant="success" @click="search") Search
          font-awesome-icon.ml-1(icon="search")
        p {{query}}
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SearchAdvanced extends Vue {
  all_words = "";
  exact_words = "";
  lang = "all";
  any_words = "";
  none_words = "";
  hashtags = "";
  from = "";
  to = "";
  mention = "";
  count = "100";
  result_type = "mixed";

  get query() {
    let query = this.all_words;
    if (this.exact_words) {
      query += ` "${this.exact_words.trim()}"`;
    }

    if (this.any_words) {
      query += ` ${this.any_words.trim().split(" ")
                        .join(" OR ")}`;
    }

    if (this.none_words) {
      query += ` ${this.none_words.trim().split(" ")
                        .map((m : any) => m[0] == '-' ? m : '-' + m)
                        .join(" ")}`;
    }

    if (this.hashtags) {
      query += ` ${this.hashtags.trim().split(" ")
                        .map((m : any) => m[0] == '#' ? m : '#' + m)
                        .join(" OR ")}`;
    }

    if (this.from) {
      query += ` ${this.from.trim().split(" ")
                        .map((m : any) => 'from:' + m)
                        .join(" OR ")}`;
    }

    if (this.to) {
      query += ` ${this.to.trim().split(" ")
                        .map((m : any) => 'to:' + m)
                        .join(" OR ")}`;
    }

    if (this.mention) {
      query += ` ${this.mention.trim().split(" ")
                        .map((m : any) => m[0] == '@' ? m : '@' + m)
                        .join(" OR ")}`;
    }

    return query;
  }

  search() {
    this.$router.push({ name: 'tweets', params: { query: `?message=${this.query}&count=${this.count}&lang=${this.lang}&result_type=${this.result_type}`}});
  }
}
</script>
