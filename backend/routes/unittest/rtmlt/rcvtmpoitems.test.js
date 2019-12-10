var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- rcvtmpoitems Test ---------------------
describe("rcvtmpoitems Routes .. ", function () {

it("getTmpItems | status code 200", function (done) {
    request
    .get(base_url + "/rcvTempo/rcvTmpoItems/getTmpItems", function (error, response) {
      if (error) throw new Error('unable to call getTmpItems');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getTmpItembyID | status code 200", function (done) {
    request
    .get(base_url + "/rcvTempo/rcvTmpoItems/getTmpItembyID/1", function (error, response) {
      if (error) throw new Error('unable to call getTmpItembyID');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  //   it("insertTmpItem| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({DOCUMENT_ID:1, ITEMS_ID:1, UNITS_ID:1, ARRANGEMENT_NO:1, UNIT_FACTOR:5,
  //   UNIT_QUANTITY:24, BASE_UNIT_QUANTITY:1, ITEM_COST:24, TOTAL_COST:24, ITEM_PRICE:123, TOTAL_PRICE:22, NOTES:"1", CREATED_BY:1});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/rcvTempo/rcvTmpoItems/insertTmpItem", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call insertTmpItem');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

  //  it("deleteTmpItem| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({NOTES: "Osa"});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/rcvTempo/rcvTmpoItems/deleteTmpItem", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call deleteTmpItem');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

});