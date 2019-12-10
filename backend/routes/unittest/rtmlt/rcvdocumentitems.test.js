var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- rcvdocumentitems Test ---------------------
describe("rcvdocumentitems Routes .. ", function () {

it("getAllRcvDocumentITems | status code 200", function (done) {
    request
    .get(base_url + "/rcvDocItems/getAllRcvDocumentITems", function (error, response) {
      if (error) throw new Error('unable to call getAllRcvDocumentITems');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getOneRcvDocument | status code 200", function (done) {
    request
    .get(base_url + "/rcvDocument/getOneRcvDocument/1", function (error, response) {
      if (error) throw new Error('unable to call getOneRcvDocument');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  // it("insertNewRcvDocumentITems| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({DOCUMENT_ID:2, ITEMS_ID:1, UNITS_ID:1, UNIT_FACTOR:1, UNIT_QUANTITY:1,
  //   DEFAULT_UNIT_QUANTITY:1, BASE_UNIT_QUANTITY:1, ITEM_COST:1, TOTAL_COST:1, ITEM_PRICE:1, TOTAL_PRICE:1, NOTES:"1", CREATED_BY:"5"});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/rcvDocItems/insertNewRcvDocumentITems", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call insertNewRcvDocumentITems');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

});