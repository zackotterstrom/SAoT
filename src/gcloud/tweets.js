/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
var twit = require('twit')
var T = new twit({
    consumer_key: '',
    consumer_secret: '',
    access_token: '',
    access_token_secret: ''
});
exports.tweets = (req, res) => {
  let message = req.query.message || req.body.message || '';
  let from = req.query.from || req.body.from || null;
  let count = req.query.count || req.body.count || 1;
  let lang = req.query.lang || req.body.lang || "en";
  let result_type = req.query.result_type || req.body.result_type || "mixed";

  res.set('Access-Control-Allow-Origin', "*");
  res.set('Access-Control-Allow-Methods', 'GET, POST');

  let query = message;
  if (from !== null) {
  	query = `from:${from}`;
  }

  T.get('search/tweets', { lang: lang, q: query, tweet_mode: "extended", result_type: result_type, count: count }).catch(function (err) {
    res.status(500).send(err);
  }).then(function (result) {
    if (result == undefined) res.status(500).send("empty response");
    else res.status(200).send(result.data);
  })
};
