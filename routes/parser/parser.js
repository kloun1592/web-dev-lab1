const request = require("request-promise"),
      cheerio = require("cheerio");

module.exports = {
    getNews: function (newsResource)
    {
        return request(newsResource)
            .then((html) => {
                const $ = cheerio.load(html);
                let titles = [];
                $(".content-header__title.layout--a").each(function(){
                    titles.push({
                        title: $(this).text()
                    });
                });
                return titles
            })
            .catch(error => {
                throw new Error(error)
            });
    }
};

