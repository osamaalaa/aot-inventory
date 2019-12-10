var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- itemssubs Test ---------------------
describe("itemssubs Routes .. ", function () {
it("getItemsSubs | status code 200", function (done) {
    request
    .get(base_url + "/items/itemsSubs/getItemsSubs", function (error, response) {
      if (error) throw new Error('unable to call getItemsSubs');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getItemsSubsByID | status code 200", function (done) {
    request
    .get(base_url + "/items/itemsSubs/getItemsSubsByID/1", function (error, response) {
      if (error) throw new Error('unable to call getItemsSubsByID');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

//   it("insertItemSubs| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({ITEMS_ID:1, SUBSTITUTIONS_ITEMS_ID:1, UNITS_ID:1, QUANTITY:1, CREATED_BY: 1});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/items/itemsSubs/insertItemSubs", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call insertItemSubs');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

});