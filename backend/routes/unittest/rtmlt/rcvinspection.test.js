var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- rcvdocumentitems Test ---------------------
describe("rcvdocumentitems Routes .. ", function () {

it("getAllRcvInspection | status code 200", function (done) {
    request
    .get(base_url + "/rcvInspection/getAllRcvInspection", function (error, response) {
      if (error) throw new Error('unable to call getAllRcvInspection');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getOneRcvInspection | status code 200", function (done) {
    request
    .get(base_url + "/rcvInspection/getOneRcvInspection/1", function (error, response) {
      if (error) throw new Error('unable to call getOneRcvInspection');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  // it("insertNewRcvInspection| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({DOCUMENT_TYPE_ID:1, INVENTORY_PERIODS_ID:1, STORES_ID:1, DOCUMENT_NO:"1",
  //   BASE_DOCUMENT_ID:1, BASE_DOCUMENT_TYPE_ID:1, SUBSIDIARY_ID:1, JOURNALS_ID:1, SOURCE_TYPE:1, SUPPLIER_ID:1, PO_NUMBER:"1",
  //   PI_NUMBER:"1", DELIVERED_BY:null, SHIPMENT_NUMBER:"1", SHIPMENT_POLICY_NO:"1", DOCUMENT_STATUS:1, NOTES:"1", CREATED_BY:"5"});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/rcvInspection/insertNewRcvInspection", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call insertNewRcvInspection');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

  //  it("updateRcvInspectionById| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({NOTES:"1"});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/rcvInspection/updateRcvInspectionById/1", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call updateRcvInspectionById');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

});