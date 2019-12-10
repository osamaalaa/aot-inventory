var request = require("request");
//var base_url = "http://172.16.35.2:9004";
var base_url = "http://localhost:9004";


//-------------- storesitemsgroup Test ---------------------
describe("storesitemsgroup Routes .. ", function () {

// it("getStoresItemsGroup | status code 200", function (done) {
//     request
//     .get(base_url + "/stores/storesItemsGroup/getStoresItemsGroup", function (error, response) {
//       if (error) throw new Error('unable to call getStoresItemsGroup');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//     });
//   }, 20000);

  // it("getStoreItemGroupByID | status code 200", function (done) {
  //   request
  //   .get(base_url + "/stores/storesItemsGroup/getStoreItemGroupByID/1", function (error, response) {
  //     if (error) throw new Error('unable to call getStoreItemGroupByID');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //   });
  // }, 20000);

// it("insertStoresItemsGroups| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({STORES_ID:1, ITEMS_GROUP_ID:1, STATUS:1, CREATED_BY:1});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/stores/storesItemsGroup/insertStoresItemsGroups", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call insertStoresItemsGroups');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

});