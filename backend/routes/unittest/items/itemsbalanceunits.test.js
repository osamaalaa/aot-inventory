var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- itembalance Test ---------------------
describe("itembalanceunits Routes .. ", function () {
it("getAllItemsBalanceUnits | status code 200", function (done) {
    request
    .get(base_url + "/items/itemBalance/getAllItemsBalanceUnits", function (error, response) {
      if (error) throw new Error('unable to call getAllItemsBalanceUnits');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getOneItemBalanceUnitsByID | status code 200", function (done) {
    request
    .get(base_url + "/items/itemBalance/getOneItemBalanceUnitsByID/1", function (error, response) {
      if (error) throw new Error('unable to call getOneItemBalanceUnitsByID');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

//   it("insertItemBalanceUnits| returns status code 200", function (done) {
//    var itemInfo = JSON.stringify({ITEMS_BALANCE_ID: 8, ITEMS_ID: 1, STORES_ID: 1, UNITS_ID: 1, OPEN_BALANCE: 5, ITEM_COST: 5, AVERAGE_COST: 5, CURRENT_BALANCE: 5,
//    QTY_ON_HAND: 5, QTY_RESERVED: 5, QTY_TRANSFER_TO: 5, QTY_TRANSFER_FROM: 5, OTY_DISPOSED: 5, QTY_ON_POR: 5,
//    QTY_ON_SOR: 5, QTY_ON_SO: 5, QTY_ON_PO: 5, QTY_REQUESTED: 5, QTY_SO_CONSIGMENT: 5, QTY_PO_CONSIGMENT: 5, QTY_ADDED: 5,
//    LAST_SOLD: "25-MAR-2019", LAST_RECIEVED: "25-MAR-2019", CONFIRMED: 1, CREATED_BY: 1, INV_OPEN_BALANCE_ITEMS_ID: 1});
//     request
//     .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/items/itemBalance/insertItemBalanceUnits", body: itemInfo }, function (error, response) {
//       if (error) throw new Error('unable to call insertItemBalanceUnits');
//      expect(response.statusCode).toBe(200);
//      expect(JSON.parse(response.body).status).toBe(200);
//      done();
//     });
//   }, 20000);

});