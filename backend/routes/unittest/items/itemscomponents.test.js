var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- itemscomponents Test ---------------------
describe("itemscomponents Routes .. ", function () {
it("itemscomponents | status code 200", function (done) {
    request
    .get(base_url + "/items/itemscomponents/getallitemacomponents", function (error, response) {
      if (error) throw new Error('unable to call itemscomponents');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getoneitemcomponents | status code 200", function (done) {
    request
    .get(base_url + "/items/itemscomponents/getoneitemcomponents/1", function (error, response) {
      if (error) throw new Error('unable to call getoneitemcomponents');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

//     it("insertnewitemcomponents| returns status code 200", function (done) {
//    var itemInfo = JSON.stringify({ITEMS_ID:1, COMPONENTS_ITEMS_ID: 1, UNITS_ID: 1, QUANTITY: 1, ITEM_PRICE: 1, COST_PERCENTAGE: 1, CREATED_BY: 1});
//     request
//     .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/items/itemscomponents/insertnewitemcomponents", body: itemInfo }, function (error, response) {
//       if (error) throw new Error('unable to call insertnewitemcomponents');
//      expect(response.statusCode).toBe(200);
//      expect(JSON.parse(response.body).status).toBe(200);
//      done();
//     });
//   }, 20000);

  //   it("updateItemComponents| returns status code 200", function (done) {
  //  var itemInfo = JSON.stringify({UNITS_ID: 1});
  //   request
  //   .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/items/itemscomponents/updateItemComponents/1", body: itemInfo }, function (error, response) {
  //     if (error) throw new Error('unable to call updateItemComponents');
  //    expect(response.statusCode).toBe(200);
  //    expect(JSON.parse(response.body).status).toBe(200);
  //    done();
  //   });
  // }, 20000);

});