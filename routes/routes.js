'use strict';

let request = require('request');
let requestPromise = require('request-promise');

let xmlparser = require('xml2js-parser').parseString;
let router = require("express").Router();
let cheerio = require("cheerio");
let striptags = require('striptags');


router.route('/')
    .get(function (req, res) {

        let baseUrl = 'https://www.aftonbladet.se/rss.xml';
        let articles = [];

        xmlparser()

        requestPromise(baseUrl).then(function(body) {
            
            let promise = new Promise((resolve, reject) => {
                xmlparser(body, (err, result) => {
                    resolve(result);
                })
            })

            return Promise.all([promise]);
            // xmlparser(body);

        }).then(function(body) {
            console.log(body[0].rss);                  
            let articlesFromAftonbladet = body[0].rss.channel[0].item;

            for (let i = 0; i < articlesFromAftonbladet.length; i++) {
                
                let imgSrc = articlesFromAftonbladet[i].description[0].substring(10);
                imgSrc = imgSrc.substring(0, imgSrc.length-5);

                articles.push({
                    title: articlesFromAftonbladet[i].title,
                    imgSrc: imgSrc
                });
            }            

            let promises = [];

            for (let i = 0; i < articlesFromAftonbladet.length; i++) {
                promises.push(requestPromise(articlesFromAftonbladet[i].link[0]));
            }

            return Promise.all(promises);

        }).then(function(data) {
            //få ut ingressen
            for(let i = 0; i < data.length; i++) {
                // articles[i].ingress = data[i];

                articles[i].ingress = striptags(cheerio.load(data[i])('div[data-test-id="lead-text"]').text());                
                console.log(cheerio.load(data[i])('div[data-test-id="lead-text"]').text());
            }
            res.render('home', {articles: articles});
        });



});

module.exports = router;