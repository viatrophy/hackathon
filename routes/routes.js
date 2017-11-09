let request = require('request');
let xmlparser = require('xml2js-parser').parseString;
let router = require("express").Router();


router.route('/')
    .get(function (req, res) {

        let baseUrl = 'https://www.aftonbladet.se/rss.xml';

        request(baseUrl, function (err, resp, body) { 

            xmlparser(body, (err, result) => {
                let articles = [];

                let articlesFromAftonbladet = result.rss.channel[0].item;

                for (let i = 0; i < articlesFromAftonbladet.length; i++) {
                    let imgSrc = articlesFromAftonbladet[i].description[0].substring(10);
                    imgSrc = imgSrc.substring(0, imgSrc.length-5);

                    articles.push({
                        title: articlesFromAftonbladet[i].title,
                        imgSrc: imgSrc
                    });
                }
                // let articles = result.rss.channel[0].item;
                // let title = articles[0].title;
                // let img = articles[5].description;

                // let src = img[0].substring(10);
                // src = src.substring(0, src.length-5);

                res.render('home', {articles: articles});
            });            
        });



});

module.exports = router;