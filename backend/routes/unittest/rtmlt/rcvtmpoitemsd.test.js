var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- rcvtmpoitemsd Test ---------------------
describe("rcvtmpoitemsd Routes .. ", function () {

it("getAllrcvTmpoItemsD | status code 200", function (done) {
    request
    .get(base_url + "/rcvTempoItemsD/getAllrcvTmpoItemsD", function (error, response) {
      if (error) throw new Error('unable to call getAllrcvTmpoItemsD');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getOnercvTmpoItemsD | status code 200", function (done) {
    request
    .get(base_url + "/rcvTempoItemsD/getOnercvTmpoItemsD/1", function (error, response) {
      if (error) throw new Error('unable to call getOnercvTmpoItemsD');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

// it("insertrcvTmpoItemsD| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({RCV_TEMP_ITEMS_ID:1, DOCUMENT_ID:1, ARRANGEMENT_NO:1, BATCH_NUMBER:"1",SERIAL_NUMBER:"1", UNIT_QUANTITY:1,
//     DEFAULT_UNIT_QUANTITY:1, BASE_UNIT_QUANTITY:1, ITEM_COST:1, TOTAL_COST:1, ITEM_PRICE:1, TOTAL_PRICE:1, NOTES:"1", CREATED_BY:1});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/rcvTempoItemsD/insertrcvTmpoItemsD", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call insertrcvTmpoItemsD');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

});