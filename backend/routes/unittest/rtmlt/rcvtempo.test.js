var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- rcvtempo Test ---------------------
describe("rcvtempo Routes .. ", function () {

it("getRcvTempo | status code 200", function (done) {
    request
    .get(base_url + "/rcvTempo/getRcvTempo", function (error, response) {
      if (error) throw new Error('unable to call getRcvTempo');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getRcvTempobyID | status code 200", function (done) {
    request
    .get(base_url + "/rcvTempo/getRcvTempobyID/9", function (error, response) {
      if (error) throw new Error('unable to call getRcvTempobyID');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  // it("insertRcvTempo| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({DOCUMENT_TYPE_ID:1, INVENTORY_PERIODS_ID:1, STORES_ID:4, DOCUMENT_NO:"5", BASE_DOCUMENT_ID:4,
  //   BASE_DOCUMENT_TYPE_ID:1, SUBSIDIARY_ID:1, JOURNALS_ID:4, SOURCE_TYPE:2, SUPPLIER_ID:5, PO_NUMBER:"4", PI_NUMBER:"5", DELIVERED_BY:"4",
  //   SHIPMENT_NUMBER:"4", SHIPMENT_POLICY_NO:"5", DOCUMENT_STATUS:1, NOTES:"5", CREATED_BY:4, VALDIATED_BY:5, CONFIRMED_BY:1, MODIFIED_BY:1});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/rcvTempo/insertRcvTempo", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call insertRcvTempo');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

  //  it("deleteRcvTempo| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({DOCUMENT_ID:5});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/rcvTempo/deleteRcvTempo", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call deleteRcvTempo');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

  //  it("updateRcvTempoById| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({NOTES: "Osa"});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/rcvTempo/updateRcvTempoById/9", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call updateRcvTempoById');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

});