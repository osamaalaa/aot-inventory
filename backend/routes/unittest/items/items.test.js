var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- items Test ---------------------
describe("items Routes .. ", function () {
it("getallitems | status code 200", function (done) {
    request
    .get(base_url + "/items/getallitems", function (error, response) {
      if (error) throw new Error('unable to call getallitems');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);
  
  it("getoneitem | status code 200", function (done) {
    request
    .get(base_url + "/items/getoneitem/23", function (error, response) {
      if (error) throw new Error('unable to call getoneitem');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);
  
  // it("insertnewitem| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({AR_NAME: "أسامه", EN_NAME: "osama", AR_DESCRIPTION: "اسامه برضوا", EN_DESCRIPTION: "osama gdn",
  //    ITEMS_GROUP_ID: 1, ITEM_KIND: 1, ITEM_CLASS: 1, ITEM_NATURE: 1, BALANCE_NATURE: 1, NUMBER_OF_UNITS: 1,
  //    SUBSIDIARY_ID: 1, PROFIT_MARGIN: 1, QTY_ON_ORDER: 1, FOR_SALE: 1, STATUS: 1, IMAGES_ID: 1, TAX_SCHEME_ID: 1, 
  //    SHORTAGE_POLICY_ID: 1, SLOW_POLICY_ID: 1, CREATED_BY: 1, ALIASES_TYPE_ID: 1, ITEM_CODE: 1, ITEMS_TEMPLATE_ID: 1});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/items/insertnewitem", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call insertnewitem');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);
  
  it("getLookUps | status code 200", function (done) {
    request
    .get(base_url + "/items/getLookUps/191", function (error, response) {
      if (error) throw new Error('unable to call getLookUps');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

});