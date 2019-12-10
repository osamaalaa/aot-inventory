var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- stores Test ---------------------
describe("stores Routes .. ", function () {

it("selectAllstores | status code 200", function (done) {
    request
    .get(base_url + "/stores/selectAllstores", function (error, response) {
      if (error) throw new Error('unable to call selectAllstores');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("selectOnestores | status code 200", function (done) {
    request
    .get(base_url + "/stores/selectOnestores/1", function (error, response) {
      if (error) throw new Error('unable to call selectOnestores');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

//   it("insertnewStores| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({STORES_CODE:2, AR_NAME:"'445'", EN_NAME:"fsfs", PARENT_STORES_ID:1, STORE_TYPE:1, ISSUE_POLICY:1, PROFIT_MARGIN:1,
//     SUBSIDIARY_ID:1, COST_METHOD:1, PICKING_RULE_ID:1, MATERIAL_ACCOUNT:1, MATERIAL_OVERHEAD_ACCOUNT:1, MATL_OVHD_ABSORPTION_ACCT:1,
//     RESOURCE_ACCOUNT:1, PURCHASE_PRICE_VAR_ACCOUNT:1, AP_ACCRUAL_ACCOUNT:1, OVERHEAD_ACCOUNT:1, OUTSIDE_PROCESSING_ACCOUNT:1,
//     INTRANSIT_INV_ACCOUNT:1, INTERORG_RECEIVABLES_ACCOUNT:1, INTERORG_PRICE_VAR_ACCOUNT:1, INTERORG_PAYABLES_ACCOUNT:1,
//     COST_OF_SALES_ACCOUNT:1, ENCUMBRANCE_ACCOUNT:1, PROJECT_COST_ACCOUNT:1, INTERORG_TRANSFER_CR_ACCOUNT:1,
//     INVOICE_PRICE_VAR_ACCOUNT:1, AVERAGE_COST_VAR_ACCOUNT:1, SALES_ACCOUNT:1, EXPENSE_ACCOUNT:1, BORRPAY_MATL_VAR_ACCOUNT:1,
//     BORRPAY_MOH_VAR_ACCOUNT:1, BORRPAY_RES_VAR_ACCOUNT:1, BORRPAY_OSP_VAR_ACCOUNT:1, BORRPAY_OVH_VAR_ACCOUNT:1, CREATED_BY:1});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/stores/insertnewStores", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call insertnewStores');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

// it("deleteStores| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({STORES_ID:123});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/stores/deleteStores", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call deleteStores');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

//    it("updateStoresById| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({AR_NAME:"osa"});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/stores/updateStoresById/1", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call updateStoresById');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

});