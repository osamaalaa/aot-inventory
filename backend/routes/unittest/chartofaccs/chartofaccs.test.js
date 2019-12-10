var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- chartofaccs Test ---------------------
describe("chartofaccs Routes .. ", function () {
it("getChartOfAccounts | status code 200", function (done) {
    request
    .get(base_url + "/chartOfAccs/getChartOfAccounts", function (error, response) {
      if (error) throw new Error('unable to call getChartOfAccounts');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  // it("deleteChartOfAcc| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({CHART_OF_ACCOUNTS_ID : 5});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/chartOfAccs/deleteChartOfAcc", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call deleteChartOfAcc');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

  //  it("insertChartOfAcc| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({SUBSIDIARY_ID:2, ACCOUNT_CODE:"asbvhhfhfjvhjkbjlkjd", AR_NAME:"سيبسىنمىكنمي",
  //   EN_NAME:"sdasjj;d", AR_DESCRIPTION:"sdfsd", EN_DESCRIPTION:"dfsdf", SUB_JOURNALS_COMPULSION:1, SUB_JOURNALS_ID:0,
  //   COST_CENTER_COMPULSION:1, COST_CENTER_PATTERNS_ID:1, ACCOUNT_TYPE:1, ACCOUNT_NATURE:1, GENERAL_CHART_OF_ACCOUNT_ID:1,
  //   PARENT_ACCOUNTS_ID:1, TREE_LEVEL:1, TREE_PARENT_CODE:"dfhffbkjbkjsdf", FULL_ACCOUNT_CODE:"sdfsdf", STATUS:1, CREATED_BY: 8});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/chartOfAccs/insertChartOfAcc", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call insertChartOfAcc');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

  // it("updateChartOfAccById| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({AR_NAME: "osama"});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/chartOfAccs/updateChartOfAccById/1", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call updateChartOfAccById');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

});