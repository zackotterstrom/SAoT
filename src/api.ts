import axios from 'axios'

const twitter_endpoint = `https://us-central1-saot-217513.cloudfunctions.net/tweets`;
const analysis_endpoint = `http://us-central1-saot-217513.cloudfunctions.net/sentiment-analysis`;

export function tsearch(query : string) : any {
  return axios.get(`${twitter_endpoint}${query}`);
}

export function analyse(Vue : any, tweet : string, type : string, analysis : any, doneStatus : any) {
  axios.post(analysis_endpoint, {message: tweet, type: type}).then((resp) => {
    analysis[type] = resp.data;
    Vue.set(doneStatus, type, true);
  }).catch((reason) => {
    analysis[type] = reason.response.data.details;
    Vue.set(doneStatus, type, true);
  });
}

export function sentimentToText(value : any) {
  if (value == undefined) return "";
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
