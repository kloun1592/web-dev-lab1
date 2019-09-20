const expect = require('chai').expect,
      app = require('../app'),
      request = require('supertest'),
      parser = require('../routes/parser/parser');

describe('vc.ru parser', () => {

    it('should return json with news', () => {
        parser.getNews('https://vc.ru')
            .then(news => {
                expect(news.length).to.be.at.least(1);
            })
    });

    it('should get error on invalid URI', () => {
        parser.getNews('//vc.ru')
            .catch(err => {
                expect(err.message).to.equal('RequestError: Error: Invalid URI "//vc.ru"');
            })

    });

    it('should return OK status on request', () => {
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
    });
});
