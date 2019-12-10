var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- storesitemsno Test ---------------------
describe("storesitemsno Routes .. ", function () {

it("selectAllstoresLocation | status code 200", function (done) {
    request
    .get(base_url + "/stores/storesLocation/selectAllstoresLocation", function (error, response) {
      if (error) throw new Error('unable to call selectAllstoresLocation');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("selectOnestoresLocation | status code 200", function (done) {
    request
    .get(base_url + "/stores/storesLocation/selectOnestoresLocation/1", function (error, response) {
      if (error) throw new Error('unable to call selectOnestoresLocation');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

//   it("insertnewstoresLocation| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({STORES_LOCATIONS_CODE:"asdasd " ,
// 	STORES_ID:1, AR_NAME:"اسامه", EN_NAME:"osama", LOCATION_LAN:"df", LOCATION_ROW:"sdfs", LOCATION_COLUMN:"sdf", CREATED_BY:1});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/stores/storesLocation/insertnewstoresLocation", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call insertnewstoresLocation');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

  //  it("deletestoresLocation| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({STORES_LOCATIONS_ID:12});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/stores/storesLocation/deletestoresLocation", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call deletestoresLocation');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

});