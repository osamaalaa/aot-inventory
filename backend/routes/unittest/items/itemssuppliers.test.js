var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- itemssuppliers Test ---------------------
describe("itemssuppliers Routes .. ", function () {
it("getAllitemSuppls | status code 200", function (done) {
    request
    .get(base_url + "/items/itemSuppliers/getAllitemSuppls", function (error, response) {
      if (error) throw new Error('unable to call getAllitemSuppls');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);


// it("insertnewSupplier| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({ITEMS_ID:1, SUPPLIER_ID:11, SUPPLIER_ITEM_CODE:"ماششي", ITEM_COST:6, UNITS_ID:6, CREATED_BY:1});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/items/itemSuppliers/insertnewSupplier", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call insertnewSupplier');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

// it("deleteitemSupplier| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({ITEMS_SUPPLIERS_ID: 1});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/items/itemSuppliers/deleteitemSupplier", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call deleteitemSupplier');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

//    it("selectOneitemsupplier | status code 200", function (done) {
//     request
//     .get(base_url + "/items/itemSuppliers/selectOneitemsupplier/17", function (error, response) {
//       if (error) throw new Error('unable to call selectOneitemsupplier');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//     });
//   }, 20000);

});