var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- requests Test ---------------------
describe("requests Routes .. ", function () {

it("getAllRequests | status code 200", function (done) {
    request
    .get(base_url + "/requests/getAllRequests", function (error, response) {
      if (error) throw new Error('unable to call getAllRequests');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  // it("deleteOneRequest| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({REQUEST_ID: 353});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/requests/deleteOneRequest", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call deleteOneRequest');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

//    it("insertnewRequest | status code 200", function (done) {
//     request
//     .get(base_url + "/requests/insertnewRequest", function (error, response) {
//       if (error) throw new Error('unable to call insertnewRequest');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//     });
//   }, 20000);

it("getRequest | status code 200", function (done) {
    request
    .get(base_url + "/requests/getRequest/55/16", function (error, response) {
      if (error) throw new Error('unable to call getRequest');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

});