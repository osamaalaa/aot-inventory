var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- storesitemsgroupno Test ---------------------
describe("storesitemsgroupno Routes .. ", function () {

it("getAllstoresItemsGroupNO | status code 200", function (done) {
    request
    .get(base_url + "/storesItemsGroupNO/getAllstoresItemsGroupNO", function (error, response) {
      if (error) throw new Error('unable to call getAllstoresItemsGroupNO');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getOnestoresItemsGroupNO | status code 200", function (done) {
    request
    .get(base_url + "/storesItemsGroupNO/getOnestoresItemsGroupNO/1", function (error, response) {
      if (error) throw new Error('unable to call getOnestoresItemsGroupNO');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

//   it("insertstoresItemsGroupNO| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({STORES_ITEMS_GROUP_NO_ID:1, STORES_ID:1, ITEMS_GROUP_ID:1, STATUS:1, CREATED_BY:1});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/storesItemsGroupNO/insertstoresItemsGroupNO", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call insertstoresItemsGroupNO');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

  //  it("updateStoresItemsGroupNO| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({STATUS:1});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/storesItemsGroupNO/updateStoresItemsGroupNO/1", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call updateStoresItemsGroupNO');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

});