var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- itemsDetails Test ---------------------
describe("itemsDetails Routes .. ", function () {
it("getallitemsDetails | status code 200", function (done) {
    request
    .get(base_url + "/items/itemsDetails/getallitemsDetails", function (error, response) {
      if (error) throw new Error('unable to call getallitemsDetails');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getoneitemDetails | status code 200", function (done) {
    request
    .get(base_url + "/items/itemsDetails/getoneitemDetails/1", function (error, response) {
      if (error) throw new Error('unable to call getoneitemDetails');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

//   it("insertnewitemDetails| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({items_id : 1, shippable_enabled_flag: 1, purchasing_enabled_flag: 1,
//     customer_order_enabled_flag: 1, internal_order_enabled_flag: 1, invoiceable_item_flag: 1, returnable_flag: 1, inspection_required_flag: 1, 
//     receipt_required_flag: 1, rfq_required_flag: 1, allow_substitute_receipts_flag: 1, allow_unordered_receipts_flag: 1, 
//     allow_express_delivery_flag: 1, invoice_enabled_flag: 1, costing_enabled_flag: 1, orderable_on_web_flag: 1, cost_of_sales_account: 1, sales_account: 1, expense_account: 1,
//     encumbrance_account: 1, acceptable_rate_increase: 1, acceptable_rate_decrease: 1, order_cost: 1, minimum_order_quantity: 1,
//     fixed_order_quantity: 1, fixed_days_supply: 1, maximum_order_quantity: 1, vendor_warranty_flag: 1, preventive_maintenance_flag: 1, 
//     warranty_vendor_id: 1, max_warranty_amount: 1, outside_operation_flag: 1, vehicle_item_flag: 1, electronic_flag:1, asset_category_id : 1});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/items/itemsDetails/insertnewitemDetails", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call insertnewitemDetails');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

  // it("deleteItemsDetails| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({ITEMS_ID : 2});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/items/itemsDetails/deleteItemsDetails", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call deleteItemsDetails');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

});