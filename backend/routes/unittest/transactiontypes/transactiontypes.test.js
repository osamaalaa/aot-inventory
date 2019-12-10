var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- transactiontypes Test ---------------------
describe("transactiontypes Routes .. ", function () {

it("getTransactions | status code 200", function (done) {
    request
    .get(base_url + "/transactionTypes/getTransactions", function (error, response) {
      if (error) throw new Error('unable to call getTransactions');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getTransactionsByID | status code 200", function (done) {
    request
    .get(base_url + "/transactionTypes/getTransactionsByID/1", function (error, response) {
      if (error) throw new Error('unable to call getTransactionsByID');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

//      it("insertTransaction| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({TRANSACTION_TYPE_CODE:"2", AR_NAME:"إضافة", EN_NAME:"Addition", 
//     AR_DESCRIPTION:"Dbsb", EN_DESCRIPTION:"mlmlml", USER_DEFINED_FLAG:1, STATUS:1, TRANSACTION_NATURE:11240, CREATED_BY:1});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/transactionTypes/insertTransaction", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call insertTransaction');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

//    it("deleteTransactions| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({TRANSACTION_TYPE_ID:5});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/transactionTypes/deleteTransactions", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call deleteTransactions');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

//    it("updateTransactions| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({TRANSACTION_TYPE_ID:5});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/transactionTypes/updateTransactions/2", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call updateTransactions');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

});