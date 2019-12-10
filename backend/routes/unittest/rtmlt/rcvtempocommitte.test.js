var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- rcvtempocommitte Test ---------------------
describe("rcvtempocommitte Routes .. ", function () {

it("getAllrcvTempoCommitte | status code 200", function (done) {
    request
    .get(base_url + "/rcvTempoCommitte/getAllrcvTempoCommitte", function (error, response) {
      if (error) throw new Error('unable to call getAllrcvTempoCommitte');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getOnercvTempoCommitte | status code 200", function (done) {
    request
    .get(base_url + "/rcvTempoCommitte/getOnercvTempoCommitte/1", function (error, response) {
      if (error) throw new Error('unable to call getOnercvTempoCommitte');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

//   it("insertrcvTempoCommitte| returns status code 200", function (done) {
//     var itemInfo = JSON.stringify({NOTES: "Osa"});
//      request
//      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/rcvTempoCommitte/insertrcvTempoCommitte", body: itemInfo }, function (error, response) {
//        if (error) throw new Error('unable to call insertrcvTempoCommitte');
//       expect(response.statusCode).toBe(200);
//       expect(JSON.parse(response.body).status).toBe(200);
//       done();
//      });
//    }, 20000);

});