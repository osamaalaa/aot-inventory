var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- itemsunits Test ---------------------
describe("getallitemUnits Routes .. ", function () {
it("getAllitmTempDetails | status code 200", function (done) {
    request
    .get(base_url + "/items/itemsUnits/getallitemUnits", function (error, response) {
      if (error) throw new Error('unable to call getallitemUnits');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getoneitemUnits | status code 200", function (done) {
    request
    .get(base_url + "/items/itemsUnits/getoneitemUnits/1", function (error, response) {
      if (error) throw new Error('unable to call getoneitemUnits');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);


//     it("insertnewitemUnits| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({ITEMS_ID:1, UNITS_ID:2, UNIT_FACTOR:1, DEFAULT_UNIT:1, CREATED_BY:1});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/items/itemsUnits/insertnewitemUnits", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call insertnewitemUnits');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

  //   it("deleteItemUnits| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({ITEMS_ID:1, UNITS_ID:2, UNIT_FACTOR:1, DEFAULT_UNIT:1, CREATED_BY:1});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/items/itemsUnits/deleteItemUnits", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call deleteItemUnits');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

});