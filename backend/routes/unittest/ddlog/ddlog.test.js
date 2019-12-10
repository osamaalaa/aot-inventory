var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- ddlog Test ---------------------
describe("ddlog Routes .. ", function () {
it("getddlLogs | status code 200", function (done) {
    request
    .get(base_url + "/DDLlog/getddlLogs", function (error, response) {
      if (error) throw new Error('unable to call getddlLogs');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getddlByID | status code 200", function (done) {
    request
    .get(base_url + "/DDLlog/getddlByID/1", function (error, response) {
      if (error) throw new Error('unable to call getddlByID');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

});
