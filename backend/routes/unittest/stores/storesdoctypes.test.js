var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- storesdoctypes Test ---------------------
describe("storesdoctypes Routes .. ", function () {

it("getAllstoresDocTypes | status code 200", function (done) {
    request
    .get(base_url + "/stores/storesDocTypes/getAllstoresDocTypes", function (error, response) {
      if (error) throw new Error('unable to call getAllstoresDocTypes');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getOnestoresDocTypes | status code 200", function (done) {
    request
    .get(base_url + "/stores/storesDocTypes/getOnestoresDocTypes/1", function (error, response) {
      if (error) throw new Error('unable to call getOnestoresDocTypes');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

//   it("insertstoresDocTypes| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({STORES_ID:1, DOCUMENT_TYPE_ID:23, STATUS:1, CREATED_BY:1});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/stores/storesDocTypes/insertstoresDocTypes", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call insertstoresDocTypes');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

  //  it("updateStoresDocById| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({STATUS:0});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/stores/storesDocTypes/updateStoresDocById/1", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call updateStoresDocById');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

});