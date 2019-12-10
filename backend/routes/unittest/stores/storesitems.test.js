var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- storesitems Test ---------------------
describe("storesitems Routes .. ", function () {

it("getStoresItems | status code 200", function (done) {
    request
    .get(base_url + "/stores/storesItems/getStoresItems", function (error, response) {
      if (error) throw new Error('unable to call getStoresItems');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getStoreItemByID | status code 200", function (done) {
    request
    .get(base_url + "/stores/storesItems/getStoreItemByID/1", function (error, response) {
      if (error) throw new Error('unable to call getStoreItemByID');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

// it("insertStoresItems| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({STORES_ID:1, ITEMS_ID:1, STATUS:1, CREATED_BY:1});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/stores/storesItems/insertStoresItems", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call insertStoresItems');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

  //  it("deleteStoreItem| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({STORES_ITEMS_ID:1});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/stores/storesItems/deleteStoreItem", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call deleteStoreItem');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

});