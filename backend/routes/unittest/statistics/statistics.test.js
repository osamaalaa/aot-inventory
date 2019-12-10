var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- statistics Test ---------------------
describe("statistics Routes .. ", function () {

it("getTopFiveStoreHouses | status code 200", function (done) {
    request
    .get(base_url + "/statistics/getTopFiveStoreHouses", function (error, response) {
      if (error) throw new Error('unable to call getTopFiveStoreHouses');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getItemLastTranactionDate | status code 200", function (done) {
    request
    .get(base_url + "/statistics/getItemLastTranactionDate/1", function (error, response) {
      if (error) throw new Error('unable to call getItemLastTranactionDate');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getTotalBalance | status code 200", function (done) {
    request
    .get(base_url + "/statistics/getTotalBalance/1", function (error, response) {
      if (error) throw new Error('unable to call getTotalBalance');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getTopFiveUsersTransLastWeek | status code 200", function (done) {
    request
    .get(base_url + "/statistics/getTopFiveUsersTransLastWeek", function (error, response) {
      if (error) throw new Error('unable to call getTopFiveUsersTransLastWeek');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getlastFiveTransactions | status code 200", function (done) {
    request
    .get(base_url + "/statistics/getlastFiveTransactions", function (error, response) {
      if (error) throw new Error('unable to call getlastFiveTransactions');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getitemSuppliers | status code 200", function (done) {
    request
    .get(base_url + "/statistics/getitemSuppliers", function (error, response) {
      if (error) throw new Error('unable to call getitemSuppliers');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getinvperiodsSById | status code 200", function (done) {
    request
    .get(base_url + "/statistics/getinvperiodsSById/59", function (error, response) {
      if (error) throw new Error('unable to call getinvperiodsSById');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getinvperiodsS | status code 200", function (done) {
    request
    .get(base_url + "/statistics/getinvperiodsS", function (error, response) {
      if (error) throw new Error('unable to call getinvperiodsS');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getLastTransactionWarehouse | status code 200", function (done) {
    request
    .get(base_url + "/statistics/getLastTransactionWarehouse/1", function (error, response) {
      if (error) throw new Error('unable to call getLastTransactionWarehouse');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getTopFiveSuppliers | status code 200", function (done) {
    request
    .get(base_url + "/statistics/getTopFiveSuppliers/1", function (error, response) {
      if (error) throw new Error('unable to call getTopFiveSuppliers');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getTotalNoOfTransactionInLastWeek | status code 200", function (done) {
    request
    .get(base_url + "/statistics/getTotalNoOfTransactionInLastWeek/1", function (error, response) {
      if (error) throw new Error('unable to call getTotalNoOfTransactionInLastWeek');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getTotalNoOfTransactionInLastMonth | status code 200", function (done) {
    request
    .get(base_url + "/statistics/getTotalNoOfTransactionInLastMonth/1", function (error, response) {
      if (error) throw new Error('unable to call getTotalNoOfTransactionInLastMonth');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getTotalNoOfTransactionInLastYear | status code 200", function (done) {
    request
    .get(base_url + "/statistics/getTotalNoOfTransactionInLastYear/1", function (error, response) {
      if (error) throw new Error('unable to call getTotalNoOfTransactionInLastYear');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getMonthlyTransactionsOfCurrentYear | status code 200", function (done) {
    request
    .get(base_url + "/statistics/getMonthlyTransactionsOfCurrentYear/1", function (error, response) {
      if (error) throw new Error('unable to call getMonthlyTransactionsOfCurrentYear');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getTransactionsNoInLastDay | status code 200", function (done) {
    request
    .get(base_url + "/statistics/getTransactionsNoInLastDay/1", function (error, response) {
      if (error) throw new Error('unable to call getTransactionsNoInLastDay');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getTransactionsNoInLastWeek | status code 200", function (done) {
    request
    .get(base_url + "/statistics/getTransactionsNoInLastWeek/1", function (error, response) {
      if (error) throw new Error('unable to call getTransactionsNoInLastWeek');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getTransactionsNoInLastMonth | status code 200", function (done) {
    request
    .get(base_url + "/statistics/getTransactionsNoInLastMonth/1", function (error, response) {
      if (error) throw new Error('unable to call getTransactionsNoInLastMonth');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getTopFiveItemsTransLastDay | status code 200", function (done) {
    request
    .get(base_url + "/statistics/getTopFiveItemsTransLastDay", function (error, response) {
      if (error) throw new Error('unable to call getTopFiveItemsTransLastDay');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getTopFiveItemsTransLastWeek | status code 200", function (done) {
    request
    .get(base_url + "/statistics/getTopFiveItemsTransLastWeek", function (error, response) {
      if (error) throw new Error('unable to call getTopFiveItemsTransLastWeek');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getTopFiveItemsTransLastMonth | status code 200", function (done) {
    request
    .get(base_url + "/statistics/getTopFiveItemsTransLastMonth", function (error, response) {
      if (error) throw new Error('unable to call getTopFiveItemsTransLastMonth');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getLastTransactionDateByUser | status code 200", function (done) {
    request
    .get(base_url + "/statistics/getLastTransactionDateByUser/1", function (error, response) {
      if (error) throw new Error('unable to call getLastTransactionDateByUser');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getTopFiveUsersTransLastDay | status code 200", function (done) {
    request
    .get(base_url + "/statistics/getTopFiveUsersTransLastDay", function (error, response) {
      if (error) throw new Error('unable to call getTopFiveUsersTransLastDay');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  it("getTopFiveUsersTransLastMonth | status code 200", function (done) {
    request
    .get(base_url + "/statistics/getTopFiveUsersTransLastMonth", function (error, response) {
      if (error) throw new Error('unable to call getTopFiveUsersTransLastMonth');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

});