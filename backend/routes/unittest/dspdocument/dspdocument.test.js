var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- dspdocument Test ---------------------
describe("dspdocument Routes .. ", function () {

it("getDSPdocument | status code 200", function (done) {
    request
    .get(base_url + "/dspdocument/getDSPdocument", function (error, response) {
      if (error) throw new Error('unable to call getDSPdocument');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getOneDSPdocument | status code 200", function (done) {
    request
    .get(base_url + "/dspdocument/getOneDSPdocument/7", function (error, response) {
      if (error) throw new Error('unable to call getOneDSPdocument');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

//      it("insertDSPdocument| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({DOCUMENT_TYPE_ID:1, DOCUMENT_DATE:"28 / AUG / 2019", INVENTORY_PERIODS_ID:1, STORES_ID:1 , 
// 	DSP_DATE:"28 / AUG / 2019", DOCUMENT_NO:1, BASE_DOCUMENT_ID:1, BASE_DOCUMENT_TYPE_ID:1, SUBSIDIARY_ID:1, JOURNALS_ID:1,
// 	DELIVERED_BY:1, DELIVERED_TO:1, DELIVERY_DATE:"28 / AUG / 2019", DOCUMENT_STATUS:1, NOTES:"osama", CREATED_BY:1, WF_REQUEST_ID:2119});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/dspdocument/insertDSPdocument", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call insertDSPdocument');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

//    it("deleteDSPdocument| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({DELETED_BY:1, DOCUMENT_ID:1});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/dspdocument/deleteDSPdocument", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call deleteDSPdocument');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

//    it("updateDSPdocument| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({NOTES: "osama"});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/dspdocument/updateDSPdocument/1", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call updateDSPdocument');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

});