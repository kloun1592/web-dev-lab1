const expect = require('chai').expect,
      app = require('../app'),
      request = require('supertest'),
      parser = require('../routes/parser/parser');

describe('vc.ru parser', () => {

    it('should get html of page vc.ru with length greater then zero', () => {
        parser.getPageHTML('https://vc.ru')
            .then(html => {
                expect(html.length).to.be.at.least(1);
            })
    });

    it('should get html of page vc.ru with error on invalid URI', () => {
        parser.getPageHTML('//vc.ru')
            .catch(err => {
                expect(err.message).to.equal('RequestError: Error: Invalid URI "//vc.ru"');
            })
    });

    it('should return json with news', () => {
        parser.getNews('https://vc.ru/')
            .then(news => {
                expect(news.articles.length).to.be.at.least(1);
            })
    });

   it('should get news with error on invalid URI', () => {
        parser.getNews('//vc.ru')
            .catch(err => {
                expect(err.message).to.equal('Error: RequestError: Error: Invalid URI "//vc.ru"');
            })
    });

    it('should return json with fields: "articles", "creationDate", "url" ', () => {
        const json = JSON.parse(parser.saveJsonAsFile(parser.getNews('https://vc.ru/'), 'https://vc.ru'));

        expect(json.hasOwnProperty('creationDate')).to.equal(true);
        expect(json.hasOwnProperty('url')).to.equal(true);
        expect(json.hasOwnProperty('articles')).to.equal(true);
    });

    it('should return json with fields: "articles", "creationDate", "url" with length greater than zero for each one ', () => {
        const json = JSON.parse(parser.saveJsonAsFile(parser.getNews('https://vc.ru/'), 'https://vc.ru'));

        expect(Object.keys(json['articles']).length).to.be.at.least(1);
        expect(Date.parse(json['creationDate'])).to.be.at.least(1);
        expect(json['url'].length).to.be.at.least(1);
    });

    /*it('should return OK status on request', () => {
        return request(app)
            .get('/')
            .then(function(response){
                expect(response.status).to.equal(200);
            })
    });

    it('should return json with length greater than zero', () => {
        return request(app)
            .get('/')
            .then(function(response){
                expect(response.text.length).to.be.at.least(1);
            })
    });*/
});
