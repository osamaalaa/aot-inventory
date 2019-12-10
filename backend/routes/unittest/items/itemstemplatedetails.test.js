var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- itemstemplatedetails Test ---------------------
describe("itemstemplatedetails Routes .. ", function () {
it("getAllitmTempDetails | status code 200", function (done) {
    request
    .get(base_url + "/itmTempDetails/getAllitmTempDetails", function (error, response) {
      if (error) throw new Error('unable to call getAllitmTempDetails');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getOneitmTempDetails | status code 200", function (done) {
    request
    .get(base_url + "/itmTempDetails/getOneitmTempDetails/1", function (error, response) {
      if (error) throw new Error('unable to call getOneitmTempDetails');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

//     it("insertitmTempDetails| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({ITEMS_TEMPLATE_ID: 2,SHIPPABLE_ENABLED_FLAG:1, 
//     PURCHASING_ENABLED_FLAG:1, CUSTOMER_ORDER_ENABLED_FLAG:1, INTERNAL_ORDER_ENABLED_FLAG:1, INVOICEABLE_ITEM_FLAG:1,
//     RETURNABLE_FLAG:1, INSPECTION_REQUIRED_FLAG:1, RECEIPT_REQUIRED_FLAG:1, RFQ_REQUIRED_FLAG:1, ALLOW_SUBSTITUTE_RECEIPTS_FLAG:1,
//     ALLOW_UNORDERED_RECEIPTS_FLAG:1, ALLOW_EXPRESS_DELIVERY_FLAG:1, INVOICE_ENABLED_FLAG:1, COSTING_ENABLED_FLAG:1,
//     ORDERABLE_ON_WEB_FLAG:1, COST_OF_SALES_ACCOUNT:1, SALES_ACCOUNT:1, EXPENSE_ACCOUNT:1, ENCUMBRANCE_ACCOUNT:1, 
//     ACCEPTABLE_RATE_INCREASE:1, ACCEPTABLE_RATE_DECREASE:1, ORDER_COST:1, MINIMUM_ORDER_QUANTITY:1, FIXED_ORDER_QUANTITY:1,
//     FIXED_DAYS_SUPPLY:1, MAXIMUM_ORDER_QUANTITY:1, VENDOR_WARRANTY_FLAG:1, PREVENTIVE_MAINTENANCE_FLAG:1, WARRANTY_VENDOR_ID:1,
//     MAX_WARRANTY_AMOUNT:1, OUTSIDE_OPERATION_FLAG:1, VEHICLE_ITEM_FLAG:1, ELECTRONIC_FLAG:1, ASSET_CATEGORY_ID:1, CREATED_BY:1});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/itmTempDetails/insertitmTempDetails", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call insertitmTempDetails');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

});