var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- taxscheme Test ---------------------
describe("taxscheme Routes .. ", function () {

it("getTaxSchemes | status code 200", function (done) {
    request
    .get(base_url + "/taxScheme/getTaxSchemes", function (error, response) {
      if (error) throw new Error('unable to call getTaxSchemes');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("gettaxSchemeByID | status code 200", function (done) {
    request
    .get(base_url + "/taxScheme/gettaxSchemeByID/1", function (error, response) {
      if (error) throw new Error('unable to call gettaxSchemeByID');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

//      it("inserttaxScheme| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({AR_DESCRIPTION:"اسامه", EN_DESCRIPTION:"osama", SUBSIDIARY_ID:1, CREATED_BY:1});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/taxScheme/inserttaxScheme", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call inserttaxScheme');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

//    it("deletetaxScheme| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({TAX_SCHEME_ID:2});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/taxScheme/deletetaxScheme", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call deletetaxScheme');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);



//    it("updateTaxScheme| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({AR_DESCRIPTION: "اسامهل"});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/taxScheme/updateTaxScheme/1", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call updateTaxScheme');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

});