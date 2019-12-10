var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- itembalance Test ---------------------
describe("itembalance Routes .. ", function () {
it("getAllItemBalance | status code 200", function (done) {
    request
    .get(base_url + "/items/itemBalance/getAllItemBalance", function (error, response) {
      if (error) throw new Error('unable to call getAllItemBalance');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);
  
  it("getOneItemBalance | status code 200", function (done) {
    request
    .get(base_url + "/items/itemBalance/getOneItemBalance/8", function (error, response) {
      if (error) throw new Error('unable to call getOneItemBalance');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);
  
  //it("insertNewItemBalance| returns status code 200", function (done) {
   // var itemInfo = JSON.stringify({SUBSIDIARY_ID:1,
            //  ITEMS_ID: 1, STORES_ID: 1, OPEN_BALANCE: 1, ITEM_COST: 1, AVERAGE_COST: 1, CURRENT_BALANCE: 1,
             // QTY_ON_HAND: 1, QTY_RESERVED: 1, QTY_TRANSFER_TO: 1, QTY_TRANSFER_FROM: 1, OTY_DISPOSED: 1, QTY_ON_POR: 1, 
            //  QTY_ON_SOR: 1, QTY_ON_SO: 1, QTY_ON_PO: 1, QTY_REQUESTED: 1, QTY_SO_CONSIGMENT: 1, QTY_PO_CONSIGMENT: 1,
             // QTY_IN: 1, QTY_OUT: 1, REORDER_LIMIT: 1, MAX_LIMIT: 1, MIN_LIMIT: 1, CONFIRMED: 1, STORES_LOCATIONS_ID: 1});
    //request
    //.post({ headers: { 'content-type': 'application/json' }, url: base_url + "/items/itemBalance/insertNewItemBalance", body: itemInfo }, function (error, response) {
      //if (error) throw new Error('unable to call insertNewItemBalance');
     // expect(response.statusCode).toBe(200);
     // expect(JSON.parse(response.body).status).toBe(200);
     // done();
    //});
  //}, 20000);

});