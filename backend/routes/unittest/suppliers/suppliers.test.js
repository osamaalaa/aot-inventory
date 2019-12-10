var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- suppliers Test ---------------------
describe("suppliers Routes .. ", function () {

it("getSuppliers | status code 200", function (done) {
    request
    .get(base_url + "/suppliers/getSuppliers", function (error, response) {
      if (error) throw new Error('unable to call getSuppliers');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getSupplierByID | status code 200", function (done) {
    request
    .get(base_url + "/suppliers/getSupplierByID/11", function (error, response) {
      if (error) throw new Error('unable to call getSupplierByID');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

//      it("insertSupplier| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({SUPPLIER_CODE:"4", AR_NAME:"11", EN_NAME:"1",
//     SUBSIDIARY_ID:2, INTERCOMPANY:1, INTERCOMPANY_ID:1, VAT_REGISTRATION_NO:"1", TAX_SCHEME_ID:1, LOCAL_SUPPLIER:1, STATUS:1, CREATED_BY:1});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/suppliers/insertSupplier", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call insertSupplier');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

//    it("updateSupplier| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({AR_NAME:"osama"});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/suppliers/updateSupplier/1", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call updateSupplier');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

});