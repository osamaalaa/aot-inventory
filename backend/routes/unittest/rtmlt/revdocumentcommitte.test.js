var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- revdocumentcommitte Test ---------------------
describe("revdocumentcommitte Routes .. ", function () {

it("getAllRevDocumentCommitte | status code 200", function (done) {
    request
    .get(base_url + "/rcvDocCommitte/getAllRevDocumentCommitte", function (error, response) {
      if (error) throw new Error('unable to call getAllRevDocumentCommitte');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getOneRevDocumentCommitte | status code 200", function (done) {
    request
    .get(base_url + "/rcvDocCommitte/getOneRevDocumentCommitte/1", function (error, response) {
      if (error) throw new Error('unable to call getOneRevDocumentCommitte');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

// it("insertNewRevDocumentCommitte| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({DOCUMENT_ID:3, ARRANGEMENT_NO:11, EMPLOYEE_ID:1, EMPLOYEE_POSITION:"1", NOTES:"1", CREATED_BY:1});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/rcvDocCommitte/insertNewRevDocumentCommitte", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call insertNewRevDocumentCommitte');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);



});