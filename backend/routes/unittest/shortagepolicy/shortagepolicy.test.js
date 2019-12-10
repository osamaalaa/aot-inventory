var request = require("request");
//var base_url = "http://172.16.35.2:9004";
var base_url = "http://localhost:9004";


//-------------- shortagepolicy Test ---------------------
describe("shortagepolicy Routes .. ", function () {

// it("getShortagePolicy | status code 200", function (done) {
//     request
//     .get(base_url + "/shortagePolicy/getShortagePolicy", function (error, response) {
//       if (error) throw new Error('unable to call getShortagePolicy');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//     });
//   }, 20000);

  // it("getShortagePolicyByID | status code 200", function (done) {
  //   request
  //   .get(base_url + "/shortagePolicy/getShortagePolicyByID/1", function (error, response) {
  //     if (error) throw new Error('unable to call getShortagePolicyByID');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //   });
  // }, 20000);


//   it("insertShortagePolicy| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({SHORTAGE_POLICY_TYPE:1, SHORTAGE_POLICY_VALUE_TYPE:1, SHORTAGE_POLICY_VALUE:1, CREATED_BY:1});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/shortagePolicy/insertShortagePolicy", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call insertShortagePolicy');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

  // it("deleteShortagePolicy| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({SHORTAGE_POLICY_ID: 4});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/shortagePolicy/deleteShortagePolicy", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call deleteShortagePolicy');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

  //  it("updateShortagePolicy| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({SHORTAGE_POLICY_VALUE_TYPE: 2});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/shortagePolicy/updateShortagePolicy/1", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call updateShortagePolicy');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

});