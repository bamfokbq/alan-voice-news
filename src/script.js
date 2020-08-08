// intent('What does this app do?', "What can i do here?"),
//     reply("This is a news project."));
// intent("Start a command", (p) => {
//     p.play({command: 'testCommand'})
// })
// const API_KEY = '714460dd22bf4861b866e77b676547cc';
// let savedArticles = [];
// intent('Give me the news from $(source* (.*))', (p) => {
//     let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apikey=${API_KEY}`;

//     if (p.source.value) {
//         NEWS_API_URL = `${NEWS_API_URL}&sources=${p.source.value.toLowerCase().split(' ').join('-')}`
//     }

//     api.request(NEWS_API_URL, (error, response, body) =>{
//         const {articles} = JSON.parse(body)

//         if(!articles.length){
//             p.play('Sorry, please try searching for news from a different sources');
//             return;
//         }

//        savedArticles = articles;

//        p.play({command:'newHeadlines', articles});
//        p.play(`Here are the (latest|recent) ${p.source.value} news.`);
//     });

// });

// intent("What's up with $(term* (.*))", (p) => {
//   let NEWS_API_URL = `https://newsapi.org/v2/everything?apikey=${API_KEY}`;

//   if (p.term.value) {
//     NEWS_API_URL = `${NEWS_API_URL}&q=${p.term.value}`;
//   }

//   api.request(NEWS_API_URL, (error, response, body) => {
//     const { articles } = JSON.parse(body);

//     if (!articles.length) {
//       p.play('Sorry, please try searching for something else.');
//       return;
//     }

//     savedArticles = articles;

//     p.play({ command: 'newHeadlines', articles });
//     p.play(`Here are the (latest|recent) ${p.term.value}`);
//   });
// });
// News by Categories
const CATEGORIES = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
];
const CATEGORIES_INTENT = `${CATEGORIES.map(
  (category) => `${category}~${category}`
).join('|')}|`;

intent(
  `(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT})`,
  `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines)`,
  (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;

    if (p.C.value) {
      NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`;
    }

    api.request(NEWS_API_URL, (error, response, body) => {
      const { articles } = JSON.parse(body);

      if (!articles.length) {
        p.play('Sorry, please try searching for a different category.');
        return;
      }

      savedArticles = articles;

      p.play({ command: 'newHeadlines', articles });

      if (p.C.value) {
        p.play(`Here are the (latest|recent) articles on ${p.C.value}.`);
      } else {
        p.play(`Here are the (latest|recent) news`);
      }
    });
  }
);
