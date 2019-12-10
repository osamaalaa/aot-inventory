var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- rcvinspectionitemsd Test ---------------------
describe("rcvinspectionitemsd Routes .. ", function () {

it("getAllrcvInspectionItemsD | status code 200", function (done) {
    request
    .get(base_url + "/rcvInspectionItemsD/getAllrcvInspectionItemsD", function (error, response) {
      if (error) throw new Error('unable to call getAllrcvInspectionItemsD');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  // it("getOnercvInspectionItemsD | status code 200", function (done) {
  //   request
  //   .get(base_url + "/rcvInspectionItemsD/getOnercvInspectionItemsD/1", function (error, response) {
  //     if (error) throw new Error('unable to call getOnercvInspectionItemsD');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //   });
  // }, 20000);

  // it("insertrcvInspectionItemsD| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({RCV_INSPECTION_ITEMS_ID:1, DOCUMENT_ID:1, ARRANGEMENT_NO:1, BATCH_NUMBER:"1", SERIAL_NUMBER:"1", UNIT_QUANTITY:1,
  //   DEFAULT_UNIT_QUANTITY:1, BASE_UNIT_QUANTITY:1, ITEM_COST:1, TOTAL_COST:1, ITEM_PRICE:1, TOTAL_PRICE:1, NOTES:"1", CREATED_BY:1});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/rcvInspectionItemsD/insertrcvInspectionItemsD", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call insertrcvInspectionItemsD');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

});