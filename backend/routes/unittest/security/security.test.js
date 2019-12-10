var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- security Test ---------------------
describe("security Routes .. ", function () {

//     it("resetPassword| returns status code 200", function (done) {
//         var itemInfo = JSON.stringify({USER_NAME:"melaal", USER_PASSWORD:"123"});
//          request
//          .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/security/resetPassword", body: itemInfo }, function (error, response) {
//            if (error) throw new Error('unable to call resetPassword');
//           expect(response.statusCode).toBe(200);
//           expect(JSON.parse(response.body).status).toBe(200);
//           done();
//          });
//        }, 20000);

// it("LoginAuth| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({USER_NAME:"melaal", USER_PASSWORD:"123"});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/security/LoginAuth", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call LoginAuth');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

});