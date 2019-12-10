var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- itemsbalancedetail Test ---------------------

describe("itemsbalancedetail Routes .. ", function () {
it("getAllItemsBalanceDetail | status code 200", function (done) {
    request
    .get(base_url + "/items/itemBalance/getAllItemsBalanceDetail", function (error, response) {
      if (error) throw new Error('unable to call getAllItemsBalanceDetail');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);
  
  it("getOneItemBalanceDetailByID | status code 200", function (done) {
    request
    .get(base_url + "/items/itemBalance/getOneItemBalanceDetailByID/5", function (error, response) {
      if (error) throw new Error('unable to call getOneItemBalanceDetailByID');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);
  
  // it("insertItemBalanceDetail| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({ITEMS_BALANCE_ID: 8, BATCH_NUMBER: 1,
  //   SERIAL_NUMBER: "osama", OPEN_BALANCE: 5, ITEM_COST: 5, AVERAGE_COST: 6, CURRENT_BALANCE: 5, QTY_ON_HAND: 5, QTY_RESERVED: 5,
  //   QTY_TRANSFER_TO: 5, QTY_TRANSFER_FROM: 5, OTY_DISPOSED: 5, QTY_ON_POR: 5, QTY_ON_SOR: 5, QTY_ON_SO: 5, QTY_ON_PO: 5,
  //   QTY_REQUESTED: 5, QTY_SO_CONSIGMENT: 5, QTY_PO_CONSIGMENT: 5, QTY_IN: 5, QTY_OUT: 5, CONFIRMED: 1, CREATED_BY: 1});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/items/itemBalance/insertItemBalanceDetail", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call insertItemBalanceDetail');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);
  
  //  it("deleteItemsBalanceDetail| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({ITEMS_BALANCE_DETAIL_ID: 2});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/items/itemBalance/deleteItemsBalanceDetail", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call deleteItemsBalanceDetail');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);
  
  //  it("updateItemBalanceDetail| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({ITEMS_BALANCE_DETAIL_ID: 2});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/items/itemBalance/updateItemBalanceDetail/5", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call updateItemBalanceDetail');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

});