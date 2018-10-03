/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

const language = require('@google-cloud/language');

// Instantiates a client
const client = new language.LanguageServiceClient();

exports.analyze = (req, res) => {
  let message = req.query.message || req.body.message || '';
  let type = req.query.type || req.body.type || 'sentiment'; // Category/Sentiment/Keyword

  res.set('Access-Control-Allow-Origin', "*");
  res.set('Access-Control-Allow-Methods', 'GET, POST');

  const document = {
    content: message,
    type: 'PLAIN_TEXT',
  };

  if (type == "sentiment") {
    client
      .analyzeSentiment({document: document})
      .then(results => {
        const sentiment = results[0].documentSentiment;

        res.status(200).send(JSON.stringify(sentiment));
      })
      .catch(err => {
        console.error('ERROR:', err);
        res.status(500).send(err);
      });
  } else if (type == "category") {
    client
      .classifyText({document: document})
      .then(results => {
        const classification = results[0];

      	console.log("Categories");
        classification.categories.forEach(category => {
          console.log(
            `Name: ${category.name}, Confidence: ${category.confidence}`
          );
        });

      	res.status(200).send(JSON.stringify(classification.categories));
      })
      .catch(err => {
        console.error('ERROR:', err);
      	res.status(500).send(err);
      });
  } else if (type == "entities") {
    client
      .analyzeEntities({document: document})
      .then(results => {
        const entities = results[0].entities;

        console.log('Entities:');
        entities.forEach(entity => {
          console.log(entity.name);
          console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
          if (entity.metadata && entity.metadata.wikipedia_url) {
            console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}$`);
          }
        });

      	res.status(200).send(JSON.stringify(entities));
      })
      .catch(err => {
        console.error('ERROR:', err);
      	res.status(500).send(err);
      });
  }
};
