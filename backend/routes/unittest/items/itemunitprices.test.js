var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- itemunitprices Test ---------------------
describe("itemunitprices Routes .. ", function () {
it("getAllItemUnitPrices | status code 200", function (done) {
    request
    .get(base_url + "/items/itemPrice/getAllItemUnitPrices", function (error, response) {
      if (error) throw new Error('unable to call getAllItemUnitPrices');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getOneItemUnitPrices | status code 200", function (done) {
    request
    .get(base_url + "/items/itemPrice/getOneItemUnitPrices/3", function (error, response) {
      if (error) throw new Error('unable to call getOneItemUnitPrices');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

// it("insertItemUnitPrices| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({ITEMS_UNITS_ID:10, CURRENCY_ID:1, ITEM_PRICE:12, CREATED_BY: 93});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/items/itemPrice/insertItemUnitPrices", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call insertItemUnitPrices');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

  //  it("UPDATEITEMPRICES| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({CREATED_BY: "1"});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/items/itemPrice/UPDATEITEMPRICES/3", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call UPDATEITEMPRICES');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

});