var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- itemmodule Test ---------------------
describe("itemmodule Routes .. ", function () {
it("getallitemTemplate | status code 200", function (done) {
    request
    .get(base_url + "/items/itemModule/getallitemTemplate", function (error, response) {
      if (error) throw new Error('unable to call getallitemTemplate');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);
  
  it("getOneItemModule | status code 200", function (done) {
    request
    .get(base_url + "/items/itemModule/getOneItemModule/3", function (error, response) {
      if (error) throw new Error('unable to call getOneItemModule');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);
  
  // it("insertnewitemModule| returns status code 200", function (done) {
  //  var itemInfo = JSON.stringify({AR_NAME: "أسامه" , EN_NAME: "osama", AR_DESCRIPTION: "sdf" , EN_DESCRIPTION: "sdsf", ITEMS_GROUP_ID: 12,
  //  ITEM_KIND: 1, ITEM_CLASS:1, ITEM_NATURE: 1, BALANCE_NATURE: 1, NUMBER_OF_UNITS: 1, SUBSIDIARY_ID: 1, PROFIT_MARGIN: 1,
  //   QTY_ON_ORDER: 1, FOR_SALE: 1, STATUS: 1, IMAGES_ID: 1, TAX_SCHEME_ID: 1, SHORTAGE_POLICY_ID: 1, SLOW_POLICY_ID: 1});
  //   request
  //   .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/items/itemModule/insertnewitemModule", body: itemInfo }, function (error, response) {
  //     if (error) throw new Error('unable to call insertnewitemModule');
  //    expect(response.statusCode).toBe(200);
  //    expect(JSON.parse(response.body).status).toBe(200);
  //    done();
  //   });
  // }, 20000);
  
  // it("updateItemModule| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({STATUS: 0});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/items/itemModule/updateItemModule/1", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call updateItemModule');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);
  
});