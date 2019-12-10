var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- taxschemedetail Test ---------------------
describe("taxschemedetail Routes .. ", function () {

//   it("getTaxSchemesDetails | status code 200", function (done) {
//     request
//     .get(base_url + "/taxScheme/TaxSchemeDetail/getTaxSchemesDetails", function (error, response) {
//       if (error) throw new Error('unable to call getTaxSchemesDetails');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//     });
//   }, 20000);

it("gettaxSchemeDetailByID | status code 200", function (done) {
    request
    .get(base_url + "/taxScheme/TaxSchemeDetail/gettaxSchemeDetailByID/1", function (error, response) {
      if (error) throw new Error('unable to call gettaxSchemeDetailByID');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  //    it("inserttaxSchemeDetail| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({TAX_SCHEME_ID:1, AR_DESCRIPTION:"اسامه", EN_DESCRIPTION:"osama", TAX_TYPE_ID:1, TAX_TAXABLE:1, AUTO_CALC:1,
//     MANDATORY_TAX:1, USER_CHANGEABLE:1, TAX_VALUE_TYPE:1, TAX_VALUE_TYPE_VALUE:5, CHART_OF_ACCOUNTS_ID:1, CREATED_BY:1});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/taxScheme/TaxSchemeDetail/inserttaxSchemeDetail", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call inserttaxSchemeDetail');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

//    it("deletetaxSchemeDetail| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({TAX_SCHEME_DETAIL_ID:1});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/taxScheme/TaxSchemeDetail/deletetaxSchemeDetail", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call deletetaxSchemeDetail');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

//    it("updateTaxSchemeDetail| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({TAX_TYPE_ID: 1});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/taxScheme/TaxSchemeDetail/updateTaxSchemeDetail/1", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call updateTaxSchemeDetail');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

});