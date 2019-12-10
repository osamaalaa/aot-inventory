var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- rcvdocument Test ---------------------
describe("rcvdocument Routes .. ", function () {

// it("getAllRcvDocument | status code 200", function (done) {
//     request
//     .get(base_url + "/rcvDocument/getAllRcvDocument", function (error, response) {
//       if (error) throw new Error('unable to call getAllRcvDocument');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//     });
//   }, 20000);

  it("getOneRcvDocument | status code 200", function (done) {
    request
    .get(base_url + "/rcvDocument/getOneRcvDocument/1", function (error, response) {
      if (error) throw new Error('unable to call getOneRcvDocument');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  // it("insertRcvDocument| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({DOCUMENT_TYPE_ID:5, INVENTORY_PERIODS_ID:1, STORES_ID:1, DOCUMENT_NO:"1",
  //   BASE_DOCUMENT_ID:1, BASE_DOCUMENT_TYPE_ID:1, SUBSIDIARY_ID:1, JOURNALS_ID:1, SOURCE_TYPE:1, SUPPLIER_ID:1, PO_NUMBER:"11",
  //   PI_NUMBER:"1", DELIVERED_BY:"1", SHIPMENT_NUMBER:"1", SHIPMENT_POLICY_NO:"1", DOCUMENT_STATUS:1, NOTES:"1", CREATED_BY:"5"});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/rcvDocument/insertRcvDocument", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call insertRcvDocument');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

});