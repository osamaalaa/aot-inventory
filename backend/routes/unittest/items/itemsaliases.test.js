var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- itemsaliases Test ---------------------
describe("itemsaliases Routes .. ", function () {
it("itemsaliases | status code 200", function (done) {
    request
    .get(base_url + "/items/itemsaliases/getallitemaliases", function (error, response) {
      if (error) throw new Error('unable to call itemsaliases');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);
  
  it("getoneitemaliase | status code 200", function (done) {
    request
    .get(base_url + "/items/itemsaliases/getoneitemaliase/1", function (error, response) {
      if (error) throw new Error('unable to call getoneitemaliase');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);
  
  // it("insertNewItemAliase| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({ITEMS_ID: 1, ALIASES_TYPE_ID: 2, SUBSIDIARY_ID: 1, ITEM_CODE: "1", DEFAULT_ALIASES: 1, CREATED_BY: 11});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/items/itemsaliases/insertNewItemAliase", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call insertNewItemAliase');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);
  
  // it("updateItemAliases| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({ITEM_CODE: "osama"});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/items/itemsaliases/updateItemAliases/51", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call updateItemAliases');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

});