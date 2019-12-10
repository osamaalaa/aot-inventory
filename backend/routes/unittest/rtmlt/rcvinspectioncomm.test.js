var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- rcvinspectioncomm Test ---------------------
describe("rcvinspectioncomm Routes .. ", function () {

it("getAllrcvInspectionComm | status code 200", function (done) {
    request
    .get(base_url + "/rcvInspectionComm/getAllrcvInspectionComm", function (error, response) {
      if (error) throw new Error('unable to call getAllrcvInspectionComm');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getOnercvInspectionComm | status code 200", function (done) {
    request
    .get(base_url + "/rcvInspectionComm/getOnercvInspectionComm/3", function (error, response) {
      if (error) throw new Error('unable to call getOnercvInspectionComm');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

//   it("insertrcvInspectionComm| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({DOCUMENT_ID:2, ARRANGEMENT_NO:1, EMPLOYEE_ID:1, EMPLOYEE_POSITION:"1", NOTES:"1", CREATED_BY:1});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/rcvInspectionComm/insertrcvInspectionComm", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call insertrcvInspectionComm');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

});