var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- inventoryperiod Test ---------------------
describe("inventoryperiod Routes .. ", function () {

it("getAllInventoryPeriod | status code 200", function (done) {
    request
    .get(base_url + "/InvPeriod/getAllInventoryPeriod", function (error, response) {
      if (error) throw new Error('unable to call getAllInventoryPeriod');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getOneInventoryPeriod | status code 200", function (done) {
    request
    .get(base_url + "/InvPeriod/getOneInventoryPeriod/1", function (error, response) {
      if (error) throw new Error('unable to call getOneInventoryPeriod');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  //   it("insertInventoryPeriod| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({ INVENTORY_PERIODS_CODE:"2", AR_NAME:"حركه مخازن مفتوحه", EN_NAME:"inv_open_balance", AR_DESCRIPTION:"gd",
  //   EN_DESCRIPTION:"gd", SUBSIDIARY_ID:1, END_DATE:"30/JULY/2019", STATUS:8, FINANCIAL_PERIODS_ID:5, CREATED_BY:8});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/InvPeriod/insertInventoryPeriod", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call insertInventoryPeriod');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

});