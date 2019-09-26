const request = require("request-promise"),
      cheerio = require("cheerio"),
      fs = require('fs');

module.exports = {
    getPageHTML: function (pageURL)
    {
        return request(pageURL)
            .then((html) => {
                return html
            })
            .catch(error => {
                throw new Error(error)
            });
    },

    getNews: function (newsResource)
    {
        return this.getPageHTML(newsResource)
            .then((html) => {
                const $ = cheerio.load(html);
                let json = {
                    articles: []
                };
                $(".content-header__title.layout--a").each(function(){
                    json["articles"].push({
                        title: $(this).text()
                    });
                });
                this.saveJsonAsFile(json, newsResource);
                return json
            })
            .catch(error => {
                throw new Error(error)
            });
    },

    saveJsonAsFile: function (json, url, filePath = __dirname + "/../../json/news.json") {
         let jsonObj = {
            url: url,
            creationDate: new Date(Date.now()),
            articles: json
        };

        jsonObj = JSON.stringify(jsonObj,null, 4);

        fs.writeFile(filePath, jsonObj, 'utf8', function (err) {
            if (err) {
                throw new Error(err.message)
            }
            return true
        });

        return jsonObj
    }
};
