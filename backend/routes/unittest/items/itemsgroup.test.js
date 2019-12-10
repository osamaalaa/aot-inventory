var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- itemsgroup Test ---------------------
describe("itemsgroup Routes .. ", function () {
// it("getallgroups | status code 200", function (done) {
//     request
//     .get(base_url + "/items/itemsgroups/getallgroups", function (error, response) {
//       if (error) throw new Error('unable to call getallgroups');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//     });
//   }, 20000);

it("getoneitemsgroup | status code 200", function (done) {
    request
    .get(base_url + "/items/itemsgroups/getoneitemsgroup/1", function (error, response) {
      if (error) throw new Error('unable to call getoneitemsgroup');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

//   it("insertNewGroup| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({ITEMS_GROUP_CODE: "osd5ama" ,
// 	AR_NAME:"جروب 3", EN_NAME:"group 3", PARENT_ITEMS_GROUP_ID:1, SUBSIDIARY_ID:1, ITEM_CLASS:1, COST_METHOD: 1, 
// 	PROFIT_MARGIN:5, TREE_LEVEL:3, BRAND_ID:4, STATUS:1, TAX_SCHEME_ID:2, SHORTAGE_POLICY_ID:2, SLOW_POLICY_ID:2,  CREATED_BY:  1});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/items/itemsgroups/insertNewGroup", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call insertNewGroup');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

  // it("updateItemGroup| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({ar_name: "اسا"});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/items/itemsgroups/updateItemGroup/1", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call updateItemGroup');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

});