var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- reqdocument Test ---------------------
describe("reqdocument Routes .. ", function () {

it("getReqDocument | status code 200", function (done) {
    request
    .get(base_url + "/reqdocument/getReqDocument", function (error, response) {
      if (error) throw new Error('unable to call getReqDocument');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getOneReqDocument | status code 200", function (done) {
    request
    .get(base_url + "/reqdocument/getOneReqDocument/5", function (error, response) {
      if (error) throw new Error('unable to call getOneReqDocument');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

//      it("insertReqDocument| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({DOCUMENT_TYPE_ID:2, DOCUMENT_DATE:"09/ SEP /2019", INVENTORY_PERIODS_ID:1, STORES_ID:1,
//    REQ_DATE:"09/ SEP /2019", DOCUMENT_NO:"osama", BASE_DOCUMENT_ID:7, BASE_DOCUMENT_TYPE_ID:6, SUBSIDIARY_ID:1, JOURNALS_ID:6,
//    SOURCE_TYPE:2, DEPARTMENT_ID:1, EMPLOYEE_ID:93, SUPPLIER_ID:6, DOCUMENT_STATUS:6, NOTES:"osama", CREATED_BY:1, WF_REQUEST_ID:2119});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/reqdocument/insertReqDocument", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call insertReqDocument');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

});