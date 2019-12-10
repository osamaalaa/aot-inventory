var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- slowmovingpolicy Test ---------------------
describe("slowmovingpolicy Routes .. ", function () {

it("getSmovingPolicy | status code 200", function (done) {
    request
    .get(base_url + "/shortagePolicy/slowMovingPolicy/getSmovingPolicy", function (error, response) {
      if (error) throw new Error('unable to call getSmovingPolicy');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getSmovingPolicyByID | status code 200", function (done) {
    request
    .get(base_url + "/shortagePolicy/slowMovingPolicy/getSmovingPolicyByID/1", function (error, response) {
      if (error) throw new Error('unable to call getSmovingPolicyByID');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);


  // it("insertSmovingPolicy| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({SLOW_MOVING_POLICY_TYPE: 1 ,
	// SLOW_MOVING_MINIMUM_VALUE:0, SLOW_MOVING_POLICY_DAYS:1, CREATED_BY:1, AR_DESCRIPTION:"FBFDBFSBs", EN_DESCRIPTION:"dDBSFBSFd"});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/shortagePolicy/slowMovingPolicy/insertSmovingPolicy", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call insertSmovingPolicy');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

  //  it("deleteSmovingPolicy| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({SLOW_POLICY_ID: 2});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/shortagePolicy/slowMovingPolicy/deleteSmovingPolicy", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call deleteSmovingPolicy');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

});