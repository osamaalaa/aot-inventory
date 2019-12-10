var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- storehouse Test ---------------------
describe("storehouse Routes .. ", function () {

it("selectAllstoreHouses | status code 200", function (done) {
    request
    .get(base_url + "/stores/storeHouses/selectAllstoreHouses", function (error, response) {
      if (error) throw new Error('unable to call selectAllstoreHouses');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("selectOnestoreHouses | status code 200", function (done) {
    request
    .get(base_url + "/stores/storeHouses/selectOnestoreHouses/3", function (error, response) {
      if (error) throw new Error('unable to call selectOnestoreHouses');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  // it("insertnewStoreHouses| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({STORE_NO:12, NAME_AR:"اسامه علاء", NAME_EN:"osama ALaa", STORE_TYPE:1, CREATED_BY:1});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/stores/storeHouses/insertnewStoreHouses?", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call insertnewStoreHouses');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

  //  it("deleteStoreHouses| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({STORE_ID:1});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/stores/storeHouses/deleteStoreHouses", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call deleteStoreHouses');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

  //  it("updatestoreHouses| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({NAME_AR:"اسامه علاء"});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/stores/storeHouses/updatestoreHouses/2", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call updatestoreHouses');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

});