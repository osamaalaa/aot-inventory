var request = require("request");
//var base_url = "http://172.16.35.2:9004";
var base_url = "http://localhost:9004";


//-------------- rcvinspectionitems Test ---------------------
describe("rcvinspectionitems Routes .. ", function () {

// it("getAllrcvInspectionItems | status code 200", function (done) {
//     request
//     .get(base_url + "/rcvInspectionItems/getAllrcvInspectionItems", function (error, response) {
//       if (error) throw new Error('unable to call getAllrcvInspectionItems');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//     });
//   }, 20000);

  // it("getOnercvInspectionItems | status code 200", function (done) {
  //   request
  //   .get(base_url + "/rcvInspectionItems/getOnercvInspectionItems/1", function (error, response) {
  //     if (error) throw new Error('unable to call getOnercvInspectionItems');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //   });
  // }, 20000);

  //   it("insertrcvInspectionItems| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({DOCUMENT_ID:1, ARRANGEMENT_NO:1, ITEMS_ID:1, UNITS_ID:1, UNIT_FACTOR:1, UNIT_QUANTITY:1,
  //   DEFAULT_UNIT_QUANTITY:1, BASE_UNIT_QUANTITY:1, ITEM_COST:1, TOTAL_COST:1, ITEM_PRICE:1, TOTAL_PRICE:1, NOTES:"1", CREATED_BY:1});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/rcvInspectionItems/insertrcvInspectionItems", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call insertrcvInspectionItems');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

  //  it("updatercvInspectionItems| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({TOTAL_PRICE:5});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/rcvInspectionItems/updatercvInspectionItems/5", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call updatercvInspectionItems');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

});