var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- documenttypes Test ---------------------
describe("documenttypes Routes .. ", function () {
it("getDocsTypes | status code 200", function (done) {
    request
    .get(base_url + "/DocTypes/getDocsTypes", function (error, response) {
      if (error) throw new Error('unable to call getDocsTypes');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getDocsByID | status code 200", function (done) {
    request
    .get(base_url + "/DocTypes/getDocsByID/3", function (error, response) {
      if (error) throw new Error('unable to call getDocsByID');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  // it("updateDocumentTypesById| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({ar_description: "osama"});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/DocTypes/updateDocumentTypesById/3", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call updateDocumentTypesById');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

});