var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- dspdocumentitems Test ---------------------
describe("dspdocumentitems Routes .. ", function () {

it("getDSPdocumentItems | status code 200", function (done) {
    request
    .get(base_url + "/dspdocumentitems/getDSPdocumentItems", function (error, response) {
      if (error) throw new Error('unable to call getDSPdocumentItems');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getOneDSPdocumentItems | status code 200", function (done) {
    request
    .get(base_url + "/dspdocumentitems/getOneDSPdocumentItems/1", function (error, response) {
      if (error) throw new Error('unable to call getOneDSPdocumentItems');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

//      it("insertDSPdocumentItems| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({DOCUMENT_ID:7, ARRANGEMENT_NO:1, ITEMS_ID:1, UNITS_ID:1, UNIT_FACTOR:6, 
//   UNIT_QUANTITY:6, BASE_UNIT_QUANTITY:6, ITEM_COST:6, TOTAL_COST:6, ITEM_PRICE:6, TOTAL_PRICE:7, NOTES:"osama", CREATED_BY:1});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/dspdocumentitems/insertDSPdocumentItems", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call insertDSPdocumentItems');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

//    it("updateDSPdocumentItems| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({NOTES: "osama AA"});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/dspdocumentitems/updateDSPdocumentItems/1", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call updateDSPdocumentItems');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

//    it("deleteDSPdocumentItems| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({DSP_DOCUMENT_ITEMS_ID:1, DELETED_BY:1});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/dspdocumentitems/deleteDSPdocumentItems", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call deleteDSPdocumentItems');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

});