var request = require("request");
//var base_url = "http://172.16.35.2:9004";
var base_url = "http://localhost:9004";


//-------------- subsDiary Test ---------------------
describe("subsDiary Routes .. ", function () {

// it("getsubsDiary | status code 200", function (done) {
//     request
//     .get(base_url + "/subsDiary/getsubsDiary", function (error, response) {
//       if (error) throw new Error('unable to call getsubsDiary');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//     });
//   }, 20000);

  // it("getSubsDiaryByID | status code 200", function (done) {
  //   request
  //   .get(base_url + "/subsDiary/getSubsDiaryByID/1", function (error, response) {
  //     if (error) throw new Error('unable to call getSubsDiaryByID');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //   });
  // }, 20000);

//   it("insertSubidiary| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({SUBSIDIARY_ID:2, COST_METHOD:1, PICKING_RULE_ID:1, MATERIAL_ACCOUNT:1,
//     MATERIAL_OVERHEAD_ACCOUNT:1, MATL_OVHD_ABSORPTION_ACCT:1, RESOURCE_ACCOUNT:1, PURCHASE_PRICE_VAR_ACCOUNT:1,
//     AP_ACCRUAL_ACCOUNT:1, OVERHEAD_ACCOUNT:1, OUTSIDE_PROCESSING_ACCOUNT:3, INTRANSIT_INV_ACCOUNT:1, INTERORG_RECEIVABLES_ACCOUNT:1,
//     INTERORG_PRICE_VAR_ACCOUNT:1, INTERORG_PAYABLES_ACCOUNT:1, COST_OF_SALES_ACCOUNT:1, ENCUMBRANCE_ACCOUNT:1,
//     PROJECT_COST_ACCOUNT:1, INTERORG_TRANSFER_CR_ACCOUNT:1, INVOICE_PRICE_VAR_ACCOUNT:1, AVERAGE_COST_VAR_ACCOUNT:1,
//     SALES_ACCOUNT:1, EXPENSE_ACCOUNT:1, BORRPAY_MATL_VAR_ACCOUNT:1, BORRPAY_MOH_VAR_ACCOUNT:1, BORRPAY_RES_VAR_ACCOUNT:1,
//     BORRPAY_OSP_VAR_ACCOUNT:1, BORRPAY_OVH_VAR_ACCOUNT:1, DEFERRED_COGS_ACCOUNT:1, COSTING_CURRENCY_ID:1, CREATED_BY:1});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/subsDiary/insertSubidiary", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call insertSubidiary');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

//    it("deletesubsDiary| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({SUBSIDIARY_ID:2});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/subsDiary/deletesubsDiary", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call deletesubsDiary');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

//    it("updateSubsDiary| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({INVOICE_PRICE_VAR_ACCOUNT:1});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/ssubsDiary/updateSubsDiary/1", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call updateSubsDiary');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

});