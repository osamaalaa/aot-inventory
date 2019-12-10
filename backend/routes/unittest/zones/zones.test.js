var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- zones Test ---------------------
describe("zones Routes .. ", function () {

it("getZones | status code 200", function (done) {
    request
    .get(base_url + "/zones/getZones", function (error, response) {
      if (error) throw new Error('unable to call getZones');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getZoneByID | status code 200", function (done) {
    request
    .get(base_url + "/zones/getZoneByID/4", function (error, response) {
      if (error) throw new Error('unable to call getZoneByID');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  //  it("insertZone| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({ZONE_ID:1210, ZONE_NAME_AR:"مكه المكرمه", ZONE_NAME_EN:"Makaa", ZONE_STATUS:1, CREATED_BY:1, SUBSIDIARY_ID:0});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/zones/insertZone", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call insertZone');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

  // it("deleteZone| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({ZONE_ID:18});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "zones/deleteZone", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call deleteZone');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

  // it("updateZonesById| returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({ZONE_NAME_AR:"مكه المكرمه"});
  //    request
  //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "zones/updateZonesById/1", body: itemInfo }, function (error, response) {
  //      if (error) throw new Error('unable to call updateZonesById');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //    });
  //  }, 20000);

});