var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- imageupload Test ---------------------
describe("imageupload Routes .. ", function () {


//   it("insertnewImage| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({ });
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/itemImage/insertnewImage/5/1?myfile", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call insertnewImage');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

   it("getsingImage | status code 200", function (done) {
    request
    .get(base_url + "/itemImage/getsingImage/osama.png", function (error, response) {
      if (error) throw new Error('unable to call getsingImage');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  // it("updateImageByImageId| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({FILE_NAME: "osama.png"});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/itemImage/updateImageByImageId/21", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call updateImageByImageId');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

});