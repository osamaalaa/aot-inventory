var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- storesitemsno Test ---------------------
describe("storesitemsno Routes .. ", function () {

it("getAllStoresItemsNO | status code 200", function (done) {
    request
    .get(base_url + "/storesItemsNO/getAllStoresItemsNO", function (error, response) {
      if (error) throw new Error('unable to call getAllStoresItemsNO');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getOneStoresItemsNO | status code 200", function (done) {
    request
    .get(base_url + "/storesItemsNO/getOneStoresItemsNO/1", function (error, response) {
      if (error) throw new Error('unable to call getOneStoresItemsNO');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

//   it("insertStoresItemsNO| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({STORES_ITEMS_NO_ID:1, STORES_ID:1, ITEMS_ID:1, STATUS:1, CREATED_BY:1});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/storesItemsNO/insertStoresItemsNO", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call insertStoresItemsNO');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

  //  it("updateStoresItemsGroupNO| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({STATUS:0});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/storesItemsGroupNO/updateStoresItemsGroupNO/1", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call updateStoresItemsGroupNO');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

});