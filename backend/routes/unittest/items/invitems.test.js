var request = require("request");
var base_url = "http://172.16.35.2:9004";
//var base_url = "http://localhost:9004";


//-------------- invitems Test ---------------------
describe("invitems Routes .. ", function () {
//-------------- invbalancerequest Test ---------------------
    // it("getAllInvBalanceRequest | returns status code 200", function (done) {
    //   request
    //   .get(base_url + "/invBalanceReq/getAllInvBalanceRequest", function (error, response) {
    //     if (error) throw new Error('unable to call getAllInvBalanceRequest ');
    //     expect(response.statusCode).toBe(200);
    //     expect(JSON.parse(response.body).status).toBe(200);
    //     done();
    //   });
    // }, 20000);

    // it("getOneInvBalanceRequest | returns status code 200", function (done) {
    //   request
    //   .get(base_url + "/invBalanceReq/getOneInvBalanceRequest/1", function (error, response) {
    //     if (error) throw new Error('unable to call getOneInvBalanceRequest ');
    //     expect(response.statusCode).toBe(200);
    //     expect(JSON.parse(response.body).status).toBe(200);
    //     done();
    //   });
    // }, 20000);

    //  it("insertInvBalanceRequest | returns status code 200", function (done) {
    //    var itemInfo = JSON.stringify({ DOCUMENT_TYPE_ID: 2, INVENTORY_PERIODS_ID: 1, STORES_ID: 1, DOCUMENT_NO: 1, BASE_DOCUMENT_ID: 1,
    //      BASE_DOCUMENT_TYPE_ID: 1,SUBSIDIARY_ID: 1,JOURNALS_ID: 11, SOURCE_TYPE: 1,DOCUMENT_STATUS: 1,NOTES: 1,CREATED_BY: 1});
    //    request
    //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/invBalanceReq/insertInvBalanceRequest", body: itemInfo }, function (error, response) {
    //      if (error) throw new Error('unable to call insertInvBalanceRequest');
    //      expect(response.statusCode).toBe(200);
    //      expect(JSON.parse(response.body).status).toBe(200);
    //      done();
    //    });
    //  }, 20000);

    //-------------- invbalancerequestitems Test ---------------------
    it("getAllInvBalanceReqItems | returns status code 200", function (done) {
      request
      .get(base_url + "/invBalanceReqItems/getAllInvBalanceReqItems", function (error, response) {
        if (error) throw new Error('unable to call getAllInvBalanceReqItems ');
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).status).toBe(200);
        done();
      });
    }, 20000);
  
    it("getOneInvBalanceReqItems | returns status code 200", function (done) {
      request
      .get(base_url + "/invBalanceReqItems/getOneInvBalanceReqItems/3", function (error, response) {
        if (error) throw new Error('unable to call getOneInvBalanceReqItems ');
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).status).toBe(200);
        done();
      });
    }, 20000);

    //  it("insertInvBalanceReqItems | returns status code 200", function (done) {
    //   var itemInfo = JSON.stringify({ INV_BALANCE_REQUEST_ID: 2, ARRANGEMENT_NO: 1,PRE_DEFINED_ITEM: 1,AR_NAME: "1",EN_NAME: "1",AR_DESCRIPTION: "1",
    //   EN_DESCRIPTION: "1",ITEMS_ID: 1,UNITS_ID: 1,UNIT_FACTOR: 1,UNIT_QUANTITY: 1,DEFAULT_UNIT_QUANTITY: 1,ITEM_COST: 1,TOTAL_COST: 1,CURRENT_BALANCE: 1,
    //   QTY_ON_HAND: 1,QTY_RESERVED: 1,QTY_TRANSFER_TO: 1,QTY_TRANSFER_FROM: 1,OTY_DISPOSED: 1,QTY_ON_POR: 1,QTY_ON_SOR: 1,QTY_ON_SO: 1,
    //   QTY_ON_PO: 1,QTY_REQUESTED: 1,QTY_SO_CONSIGMENT: 1,QTY_PO_CONSIGMENT: 1,REORDER_LIMIT: 1,MAX_LIMIT: 1,MIN_LIMIT: 1,NOTES: 1,CREATED_BY: 1});
    //    request
    //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/invBalanceReqItems/insertInvBalanceReqItems", body: itemInfo }, function (error, response) {
    //     if (error) throw new Error('unable to call insertInvBalanceReqItems');
    //     expect(response.statusCode).toBe(200);
    //     expect(JSON.parse(response.body).status).toBe(200);
    //      done();
    //    });
    //  }, 20000);

    //-------------- invstockcommite Test ---------------------
    it("getAllInvStockCommitte | returns status code 200", function (done) {
      request
      .get(base_url + "/invStockCommit/getAllInvStockCommitte", function (error, response) {
        if (error) throw new Error('unable to call getAllInvStockCommitte ');
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).status).toBe(200);
        done();
      });
    }, 20000);

    it("getOneInvStockCommitte | returns status code 200", function (done) {
      request
      .get(base_url + "/invStockCommit/getOneInvStockCommitte/9", function (error, response) {
        if (error) throw new Error('unable to call getOneInvStockCommitte ');
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).status).toBe(200);
        done();
      });
    }, 20000);

    // it("insertInvStockCommitte | returns status code 200", function (done) {
    //   var itemInfo = JSON.stringify({ INV_STOCKTAKING_ID: 1,ARRANGEMENT_NO: 1,EMPLOYEE_ID: 1,EMPLOYEE_POSITION: "1",NOTES: "1",CREATED_BY : 5});
    //   request
    //   .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/invStockCommit/insertInvStockCommitte", body: itemInfo }, function (error, response) {
    //     if (error) throw new Error('unable to call insertInvStockCommitte');
    //     expect(response.statusCode).toBe(200);
    //     expect(JSON.parse(response.body).status).toBe(200);
    //     done();
    //   });
    // }, 20000);

  
  //-------------- invstockitems Test ---------------------
  it("getAllInvStockItems | returns status code 200", function (done) {
    request
    .get(base_url + "/invStockItems/getAllInvStockItems", function (error, response) {
      if (error) throw new Error('unable to call getAllInvStockItems ');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  // it("getOneInvStockItems | returns status code 200", function (done) {
  //   request
  //   .get(base_url + "/invStockItems/getOneInvStockItems/1", function (error, response) {
  //     if (error) throw new Error('unable to call getOneInvStockItems ');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //   });
  // }, 20000);

  // it("insertInvStockItems | returns status code 200", function (done) {
  //      var itemInfo = JSON.stringify({ INV_STOCKTAKING_ID: 1,ARRANGEMENT_NO: 1,ITEMS_ID: 1,NOTES: "1",CREATED_BY: "1"});
  //      request
  //      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/invStockItems/insertInvStockItems", body: itemInfo }, function (error, response) {
  //        if (error) throw new Error('unable to call insertInvStockItems');
  //        expect(response.statusCode).toBe(200);
  //        expect(JSON.parse(response.body).status).toBe(200);
  //        done();
  //      });
  //    }, 20000);
  
  //-------------- invstockstores Test ---------------------
  it("getAllInvStockStores | returns status code 200", function (done) {
    request
    .get(base_url + "/invStockStores/getAllInvStockStores", function (error, response) {
      if (error) throw new Error('unable to call getAllInvStockStores ');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  // it("getOneInvStockStores | returns status code 200", function (done) {
  //   request
  //   .get(base_url + "/invStockStores/getOneInvStockStores/1", function (error, response) {
  //     if (error) throw new Error('unable to call getOneInvStockStores ');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //   });
  // }, 20000);
  
  //  it("insertInvStockStores | returns status code 200", function (done) {
  //       var itemInfo = JSON.stringify({ INV_STOCKTAKING_ID: 2,ARRANGEMENT_NO: 1,STORES_ID: 1,NOTES: "1",CREATED_BY: "5"});
  //       request
  //       .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/invStockStores/insertInvStockStores", body: itemInfo }, function (error, response) {
  //         if (error) throw new Error('unable to call insertInvStockStores');
  //         expect(response.statusCode).toBe(200);
  //         expect(JSON.parse(response.body).status).toBe(200);
  //         done();
  //       });
  //     }, 20000);


  //-------------- openbalance Test ---------------------

  // it("getOpenbalance | returns status code 200", function (done) {
  //   request
  //   .get(base_url + "/OpenBalance/getOpenbalance", function (error, response) {
  //     if (error) throw new Error('unable to call getOpenbalance ');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //   });
  // }, 20000);

  it("getOneOpenBalanceByID | returns status code 200", function (done) {
    request
    .get(base_url + "/OpenBalance/getOneOpenBalanceByID/21", function (error, response) {
      if (error) throw new Error('unable to call getOneOpenBalanceByID ');
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).status).toBe(200);
      done();
    });
  }, 20000);

  //  it("insertOpenBalance | returns status code 200", function (done) {
  //      var itemInfo = JSON.stringify({ DOCUMENT_TYPE_ID: 1, DOCUMENT_DATE: "24-MAR-2019", INVENTORY_PERIODS_ID: 1, STORES_ID: 1,
  //      DOCUMENT_NO: "osama", SUBSIDIARY_ID: 1, JOURNALS_ID: 1, SOURCE_TYPE: 1, DOCUMENT_STATUS: 1, NOTES: "invOpenBalance",
  //      CREATED_BY: 1, VALDIATED_BY: 1, VALDIATED_DATE: "24-MAR-2019", CONFIRMED_BY: 1, CONFIRMED_DATE: "24-MAR-2019"});
  //      request
  //      .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/OpenBalance/insertOpenBalance", body: itemInfo }, function (error, response) {
  //        if (error) throw new Error('unable to call insertOpenBalance');
  //        expect(response.statusCode).toBe(200);
  //        expect(JSON.parse(response.body).status).toBe(200);
  //        done();
  //      });
  //    }, 20000);

    //  it("updateOpenBalance | returns status code 200", function (done) {
    //   var itemInfo = JSON.stringify({ WF_REQUEST_ID: "1743"});
    //   request
    //   .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/OpenBalance/updateOpenBalance/110", body: itemInfo }, function (error, response) {
    //     if (error) throw new Error('unable to call updateOpenBalance');
    //     expect(response.statusCode).toBe(200);
    //     expect(JSON.parse(response.body).status).toBe(200);
    //     done();
    //   });
    // }, 20000);

    // it("deleteOpenBalance | returns status code 200", function (done) {
    //   request
    //   .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/OpenBalance/deleteOpenBalance/1" }, function (error, response) {
    //     if (error) throw new Error('unable to call deleteOpenBalance');
    //     expect(response.statusCode).toBe(200);
    //     expect(JSON.parse(response.body).status).toBe(200);
    //     done();
    //   });
    // }, 20000);

    //-------------- openbalanceitems Test ---------------------

    it("getOpenbalanceITems | returns status code 200", function (done) {
      request
      .get(base_url + "/OpenBalanceItems/getOpenbalanceITems", function (error, response) {
        if (error) throw new Error('unable to call getOpenbalanceITems ');
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).status).toBe(200);
        done();
      });
    }, 20000);

    // it("getOneOpenBalanceItemByID | returns status code 200", function (done) {
    //   request
    //   .get(base_url + "/OpenBalanceItems/getOneOpenBalanceItemByID/5", function (error, response) {
    //     if (error) throw new Error('unable to call getOneOpenBalanceItemByID ');
    //     expect(response.statusCode).toBe(200);
    //     expect(JSON.parse(response.body).status).toBe(200);
    //     done();
    //   });
    // }, 20000);
  
     it("getOneOpenBalanceItemByUnitsId | returns status code 200", function (done) {
       request
       .get(base_url + "/OpenBalanceItems/getOneOpenBalanceItemByUnitsId/11004", function (error, response) {
         if (error) throw new Error('unable to call getOneOpenBalanceItemByUnitsId ');
         expect(response.statusCode).toBe(200);
         expect(JSON.parse(response.body).status).toBe(200);
         done();
       });
     }, 20000);

    // it("insertOpenBalanceItem | returns status code 200", function (done) {
    //   var itemInfo = JSON.stringify({ INV_OPEN_BALANCE_ID: 110, ARRANGEMENT_NO: 1, ITEMS_ID: 26, UNITS_ID: 1,
    //   UNIT_FACTOR: 5, UNIT_QUANTITY : 5, ITEM_COST: 5 , TOTAL_COST: 5, NOTES: "osama newww ", CREATED_BY: 1});
    //   request
    //   .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/OpenBalanceItems/insertOpenBalanceItem", body: itemInfo }, function (error, response) {
    //     if (error) throw new Error('unable to call insertOpenBalanceItem');
    //     expect(response.statusCode).toBe(200);
    //     expect(JSON.parse(response.body).status).toBe(200);
    //     done();
    //   });
    // }, 20000);

    //  it("updateOpenBalanceItems | returns status code 200", function (done) {
    //    var itemInfo = JSON.stringify({ NOTES: "اسامه "});
    //    request
    //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/OpenBalanceItems/updateOpenBalanceItems/1", body: itemInfo }, function (error, response) {
    //      if (error) throw new Error('unable to call updateOpenBalanceItems');
    //      expect(response.statusCode).toBe(200);
    //      expect(JSON.parse(response.body).status).toBe(200);
    //      done();
    //    });
    //  }, 20000);

    //  it("deleteOpenBalanceItems | returns status code 200", function (done) {
    //   request
    //   .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/OpenBalanceItems/deleteOpenBalanceItems/1" }, function (error, response) {
    //     if (error) throw new Error('unable to call deleteOpenBalanceItems');
    //     expect(response.statusCode).toBe(200);
    //     expect(JSON.parse(response.body).status).toBe(200);
    //     done();
    //   });
    // }, 20000);

    //-------------- openbalanceitemsd Test ---------------------

    it("getAllOpenBalanceItemsD | returns status code 200", function (done) {
      request
      .get(base_url + "/openBalanceItemsD/getAllOpenBalanceItemsD", function (error, response) {
        if (error) throw new Error('unable to call getAllOpenBalanceItemsD ');
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).status).toBe(200);
        done();
      });
    }, 20000);

    it("getOneOpenBalanceItemsD | returns status code 200", function (done) {
      request
      .get(base_url + "/openBalanceItemsD/getOneOpenBalanceItemsD/3", function (error, response) {
        if (error) throw new Error('unable to call getOneOpenBalanceItemsD ');
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).status).toBe(200);
        done();
      });
    }, 20000);

    // it("insertOpenBalanceItemsD | returns status code 200", function (done) {
    //   var itemInfo = JSON.stringify({ INV_OPEN_BALANCE_ITEMS_ID: 1, INV_OPEN_BALANCE_ID: 110, 
    //   ARRANGEMENT_NO: 1, BATCH_NUMBER: "1", SERIAL_NUMBER: "1", UNIT_QUANTITY: 1, DEFAULT_UNIT_QUANTITY: 1,
    //   BASE_UNIT_QUANTITY: 1, ITEM_COST: 1, TOTAL_COST: 1, ITEM_PRICE: 1, TOTAL_PRICE: 1, NOTES: "1", CREATED_BY: "1"});
    //   request
    //   .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/OpenBalanceItems/insertOpenBalanceItemsD", body: itemInfo }, function (error, response) {
    //     if (error) throw new Error('unable to call insertOpenBalanceItemsD');
    //     expect(response.statusCode).toBe(200);
    //     expect(JSON.parse(response.body).status).toBe(200);
    //     done();
    //   });
    // }, 20000);

    //  it("deleteOpenBalanceItemsD | returns status code 200", function (done) {
    //    request
    //    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/openBalanceItemsD/deleteOpenBalanceItemsD/3"}, function (error, response) {
    //      if (error) throw new Error('unable to call deleteOpenBalanceItemsD');
    //      expect(response.statusCode).toBe(200);
    //      expect(JSON.parse(response.body).status).toBe(200);
    //      done();
    //    });
    //  }, 20000);

    //-------------- stocktaking Test ---------------------

    it("getStockTaking | returns status code 200", function (done) {
      request
      .get(base_url + "/stocktaking/getStockTaking", function (error, response) {
        if (error) throw new Error('unable to call getStockTaking ');
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).status).toBe(200);
        done();
      });
    }, 20000);

    it("getOneStockTakingByID | returns status code 200", function (done) {
      request
      .get(base_url + "/stocktaking/getOneStockTakingByID/1", function (error, response) {
        if (error) throw new Error('unable to call getOneStockTakingByID ');
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).status).toBe(200);
        done();
      });
    }, 20000);

    //  it("insertStockTaking | returns status code 200", function (done) {
    //       var itemInfo = JSON.stringify({ DOCUMENT_TYPE_ID: 1, STOCKTAKING_TYPE_ID: 1, DOCUMENT_DATE: "25-MAR-2019",
    //       INVENTORY_PERIODS_ID: 1, STORES_ID: 1, START_DATE: "25-MAR-2019", END_DATE: "25-MAR-2019", DOCUMENT_NO: "osama",
    //       BASE_DOCUMENT_ID: 1, BASE_DOCUMENT_TYPE_ID: 1, SUBSIDIARY_ID: 1, JOURNALS_ID: 1, DOCUMENT_STATUS: 1, NOTES: "osama",
    //       CREATED_BY: 1, VALDIATED_BY: 1, VALDIATED_DATE: "25-MAR-2019", CONFIRMED_BY: 1, CONFIRMED_DATE: "25-MAR-2019"});
    //       request
    //       .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/stocktaking/insertStockTaking", body: itemInfo }, function (error, response) {
    //         if (error) throw new Error('unable to call insertStockTaking');
    //         expect(response.statusCode).toBe(200);
    //         expect(JSON.parse(response.body).status).toBe(200);
    //         done();
    //       });
    //     }, 20000);
  
//-------------- stocktakingbalance Test ---------------------

it("getStockTakingBalance | returns status code 200", function (done) {
  request
  .get(base_url + "/stocktakingBalance/getStockTakingBalance", function (error, response) {
    if (error) throw new Error('unable to call getStockTakingBalance ');
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).status).toBe(200);
    done();
  });
}, 20000);

   it("getOneStockTakingBalanceByID | returns status code 200", function (done) {
     request
     .get(base_url + "/stocktakingBalance/getOneStockTakingBalanceByID/1", function (error, response) {
       if (error) throw new Error('unable to call getOneStockTakingBalanceByID ');
       expect(response.statusCode).toBe(200);
       expect(JSON.parse(response.body).status).toBe(200);
       done();
     });
   }, 20000);

  // it("insertStockTakingBalance | returns status code 200", function (done) {
  //         var itemInfo = JSON.stringify({INV_STOCKTAKING_ID: 2, STORES_ID:1,
  //         ARRANGEMENT_NO:1, PRE_BALANCE:1, ITEMS_ID:1, ITEM_COST: 5 , AVERAGE_COST: 5, CURRENT_BALANCE: 5, QTY_ON_HAND: 5,
  //         QTY_RESERVED: 5, QTY_TRANSFER_TO: 5, QTY_TRANSFER_FROM: 5, OTY_DISPOSED: 5, QTY_ON_POR: 5, QTY_ON_SOR: 5 ,
  //         QTY_ON_SO: 5, QTY_ON_PO: 5, QTY_REQUESTED: 5, QTY_SO_CONSIGMENT: 5, QTY_PO_CONSIGMENT: 5, QTY_IN:5, QTY_OUT:5,
  //         STOCKTAKING_CURRENT_BALANCE:5, STOCKTAKING_QTY_ON_HAND:5, DIFF_CURRENT_BALANCE:5, DIFF_QTY_ON_HAND:5, NOTES: "osama", CREATED_BY:1});
  //         request
  //         .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/stocktakingBalance/insertStockTakingBalance", body: itemInfo }, function (error, response) {
  //           if (error) throw new Error('unable to call insertStockTakingBalance');
  //           expect(response.statusCode).toBe(200);
  //           expect(JSON.parse(response.body).status).toBe(200);
  //           done();
  //         });
  //       }, 20000);

//-------------- stocktakingbalanced Test ---------------------

it("getStockTakingBalanceD | returns status code 200", function (done) {
  request
  .get(base_url + "/stocktakingBalanceD/getStockTakingBalanceD", function (error, response) {
    if (error) throw new Error('unable to call getStockTakingBalanceD ');
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).status).toBe(200);
    done();
  });
}, 20000);

it("getOneStockTakingBalanceDByID | returns status code 200", function (done) {
  request
  .get(base_url + "/stocktakingBalanceD/getOneStockTakingBalanceDByID/1", function (error, response) {
    if (error) throw new Error('unable to call getOneStockTakingBalanceDByID ');
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).status).toBe(200);
    done();
  });
}, 20000);

// it("insertStockTakingDBalance | returns status code 200", function (done) {
//   var itemInfo = JSON.stringify({INV_STOCKTAKING_ID: 2, INV_STOCKTAKING_BALANCE_ID: 1, STORES_ID:1, ARRANGEMENT_NO:1, PRE_BALANCE:1, ITEMS_ID:1, 
//                    BATCH_NUMBER:"osama", EXPIRY_DATE: "1-MAR-2019", SERIAL_NUMBER: "osama", ITEM_COST: 5 , AVERAGE_COST: 5, 
//                    CURRENT_BALANCE: 5, QTY_ON_HAND: 5, QTY_RESERVED: 5, QTY_TRANSFER_TO: 5, QTY_TRANSFER_FROM: 5,
//                    OTY_DISPOSED: 5, QTY_ON_POR: 5, QTY_ON_SOR: 5 , QTY_ON_SO: 5, QTY_ON_PO: 5, QTY_REQUESTED: 5,
//                    QTY_SO_CONSIGMENT: 5, QTY_PO_CONSIGMENT: 5, QTY_IN:5, QTY_OUT:5, STOCKTAKING_CURRENT_BALANCE:5,
//                    STOCKTAKING_QTY_ON_HAND:5, DIFF_CURRENT_BALANCE:5, DIFF_QTY_ON_HAND:5, NOTES: "osama", CREATED_BY:1});
//   request
//   .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/stocktakingBalanceD/insertStockTakingDBalance", body: itemInfo }, function (error, response) {
//     if (error) throw new Error('unable to call insertStockTakingDBalance');
//     expect(response.statusCode).toBe(200);
//     expect(JSON.parse(response.body).status).toBe(200);
//     done();
//   });
// }, 20000);

//-------------- stocktakingbalanceu Test ---------------------

// it("getAllstocktakingBalanceU | returns status code 200", function (done) {
//   request
//   .get(base_url + "/stockBalanceU/getAllstocktakingBalanceU", function (error, response) {
//     if (error) throw new Error('unable to call getAllstocktakingBalanceU ');
//     expect(response.statusCode).toBe(200);
//     expect(JSON.parse(response.body).status).toBe(200);
//     done();
//   });
// }, 20000);

// it("getOnestocktakingBalanceU | returns status code 200", function (done) {
//   request
//   .get(base_url + "/stockBalanceU/getOnestocktakingBalanceU/2", function (error, response) {
//     if (error) throw new Error('unable to call getOnestocktakingBalanceU ');
//     expect(response.statusCode).toBe(200);
//     expect(JSON.parse(response.body).status).toBe(200);
//     done();
//   });
// }, 20000);

//  it("insertstocktakingBalanceU | returns status code 200", function (done) {
//    var itemInfo = JSON.stringify({INV_STOCKTAKING_ID: 1, INV_STOCKTAKING_BALANCE_ID: 1, STORES_ID: 1,
//    ARRANGEMENT_NO: 1, PRE_BALANCE: 1, ITEMS_ID: 1, UNITS_ID: 1, ITEM_COST: 1, AVERAGE_COST: 1, CURRENT_BALANCE: 1,
//    QTY_ON_HAND: 1, QTY_RESERVED: 1, QTY_TRANSFER_TO: 1, QTY_TRANSFER_FROM: 1, OTY_DISPOSED: 1, QTY_ON_POR: 1, QTY_ON_SOR: 1,
//    QTY_ON_SO: 1, QTY_ON_PO: 1, QTY_REQUESTED: 1, QTY_SO_CONSIGMENT: 1, QTY_PO_CONSIGMENT: 1, QTY_IN: 1, QTY_OUT: 1,
//    STOCKTAKING_CURRENT_BALANCE: 1, STOCKTAKING_QTY_ON_HAND: 1, DIFF_CURRENT_BALANCE: 1, DIFF_QTY_ON_HAND: 1, NOTES: "1", CREATED_BY: "1"});
//    request
//    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/stockBalanceU/insertstocktakingBalanceU", body: itemInfo }, function (error, response) {
//      if (error) throw new Error('unable to call insertstocktakingBalanceU');
//      expect(response.statusCode).toBe(200);
//      expect(JSON.parse(response.body).status).toBe(200);
//      done();
//    });
//  }, 20000);

//-------------- transactions Test ---------------------

it("getTransactions | returns status code 200", function (done) {
  request
  .get(base_url + "/transactions/getTransactions", function (error, response) {
    if (error) throw new Error('unable to call getTransactions ');
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).status).toBe(200);
    done();
  });
}, 20000);

it("getTransactionByID | returns status code 200", function (done) {
  request
  .get(base_url + "/transactions/getTransactionByID/11", function (error, response) {
    if (error) throw new Error('unable to call getTransactionByID ');
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).status).toBe(200);
    done();
  });
}, 20000);

  // it("insertTransactions | returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({R_INV_TRANSACTIONS_ID:"88", R_INVENTORY_PERIODS_ID:"125", R_STORES_ID:"1", 
  //   R_DOCUMENT_ID:"1", R_DOCUMENT_TYPE_ID:"5", R_REAL_TRANSACTION:"1", R_TRANSACTION_DATE:"25-AUG-19", R_SUBSIDIARY_ID:"1"});
  //   request
  //   .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/transactions/insertTransactions", body: itemInfo }, function (error, response) {
  //     if (error) throw new Error('unable to call insertTransactions');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //   });
  // }, 20000);

  // it("updateTransactions | returns status code 200", function (done) {
  //   var itemInfo = JSON.stringify({CREATED_BY: 93});
  //   request
  //   .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/transactions/updateTransactions/4", body: itemInfo }, function (error, response) {
  //     if (error) throw new Error('unable to call updateTransactions');
  //     expect(response.statusCode).toBe(200);
  //     expect(JSON.parse(response.body).status).toBe(200);
  //     done();
  //   });
  // }, 20000);

  //-------------- transactionitems Test ---------------------

it("getTransactionItems | returns status code 200", function (done) {
  request
  .get(base_url + "/transactionsItems/getTransactionItems", function (error, response) {
    if (error) throw new Error('unable to call getTransactionItems ');
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).status).toBe(200);
    done();
  });
}, 20000);

it("getOneTransactionItems | returns status code 200", function (done) {
  request
  .get(base_url + "/transactionsItems/getOneTransactionItems/1", function (error, response) {
    if (error) throw new Error('unable to call getOneTransactionItems ');
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).status).toBe(200);
    done();
  });
}, 20000);

// it("insertTransactionItems | returns status code 200", function (done) {
//   var itemInfo = JSON.stringify({INV_TRANSACTIONS_ID: 1, ITEMS_ID: 1, UNITS_ID: 1, UNIT_FACTOR: 1, UNIT_QUANTITY: 1, DEFAULT_UNIT_QUANTITY: 1, ITEM_COST:1, TOTAL_COST: 1,
//   CURRENT_BALANCE: 1, QTY_ON_HAND: 1, QTY_RESERVED: 1, QTY_TRANSFER_TO: 1, QTY_TRANSFER_FROM: 1, OTY_DISPOSED: 1, QTY_ON_POR: 1,
//   QTY_ON_SOR: 1, QTY_ON_SO: 1, QTY_ON_PO: 1, QTY_REQUESTED: 1, QTY_SO_CONSIGMENT: 1 , QTY_PO_CONSIGMENT:1 , CREATED_BY: 1});
//   request
//   .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/transactionsItems/insertTransactionItems", body: itemInfo }, function (error, response) {
//     if (error) throw new Error('unable to call insertTransactionItems');
//     expect(response.statusCode).toBe(200);
//     expect(JSON.parse(response.body).status).toBe(200);
//     done();
//   });
// }, 20000);

//-------------- transactionsitemsd Test ---------------------

it("getAlltransactionsItemsD | returns status code 200", function (done) {
  request
  .get(base_url + "/transItemsD/getAlltransactionsItemsD", function (error, response) {
    if (error) throw new Error('unable to call getAlltransactionsItemsD ');
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).status).toBe(200);
    done();
  });
}, 20000);

it("getOnetransactionsItemsD | returns status code 200", function (done) {
  request
  .get(base_url + "/transItemsD/getOnetransactionsItemsD/1", function (error, response) {
    if (error) throw new Error('unable to call getOnetransactionsItemsD ');
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).status).toBe(200);
    done();
  });
}, 20000);

//  it("inserttransactionsItemsD | returns status code 200", function (done) {
//    var itemInfo = JSON.stringify({INV_TRANSACTIONS_ITEMS_ID: 1, INV_TRANSACTIONS_ID: 1, ARRANGEMENT_NO: 1, BATCH_NUMBER: "1", SERIAL_NUMBER: "1", UNIT_QUANTITY: 1,
//    DEFAULT_UNIT_QUANTITY: 1, BASE_UNIT_QUANTITY: 1, CALC_TYPE: 1, ITEM_COST: 1, TOTAL_COST: 1, CURRENT_BALANCE: 1, 
//    QTY_ON_HAND: 1, QTY_RESERVED: 1, QTY_TRANSFER_TO: 1, QTY_TRANSFER_FROM: 1, OTY_DISPOSED: 1, QTY_ON_POR: 1,
//    QTY_ON_SOR: 1, QTY_ON_SO: 1, QTY_ON_PO: 1, QTY_REQUESTED: 1, QTY_SO_CONSIGMENT: 1, QTY_PO_CONSIGMENT: 1, CREATED_BY: 1});
//    request
//    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/transItemsD/inserttransactionsItemsD", body: itemInfo }, function (error, response) {
//      if (error) throw new Error('unable to call inserttransactionsItemsD');
//      expect(response.statusCode).toBe(200);
//      expect(JSON.parse(response.body).status).toBe(200);
//      done();
//    });
//  }, 20000);

//  it("updatetransactionsItemsD | returns status code 200", function (done) {
//   var itemInfo = JSON.stringify({QTY_REQUESTED: 12});
//   request
//   .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/transItemsD/updatetransactionsItemsD/1", body: itemInfo }, function (error, response) {
//     if (error) throw new Error('unable to call updatetransactionsItemsD');
//     expect(response.statusCode).toBe(200);
//     expect(JSON.parse(response.body).status).toBe(200);
//     done();
//   });
// }, 20000);

//-------------- transfer Test ---------------------

it("getTransfer | returns status code 200", function (done) {
  request
  .get(base_url + "/transfer/getTransfer", function (error, response) {
    if (error) throw new Error('unable to call getTransfer ');
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).status).toBe(200);
    done();
  });
}, 20000);

it("getOneTransfer | returns status code 200", function (done) {
  request
  .get(base_url + "/transfer/getOneTransfer/2", function (error, response) {
    if (error) throw new Error('unable to call getOneTransfer ');
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).status).toBe(200);
    done();
  });
}, 20000);

// it("insertTransfer | returns status code 200", function (done) {
//   var itemInfo = JSON.stringify({DOCUMENT_TYPE_ID: 1,
//   DOCUMENT_DATE: "24-MAR-2019", INVENTORY_PERIODS_ID: 1, STORES_ID: 1, TRANSFER_DATE: "24-MAR-2019", DOCUMENT_NO: 1, 
//   BASE_DOCUMENT_ID: 1, BASE_DOCUMENT_TYPE_ID: 1, SUBSIDIARY_ID: 1, JOURNALS_ID: 1, SOURCE_TYPE: 1, DOCUMENT_STATUS: 1,
//   NOTES: "osama", CREATED_BY: 1, VALDIATED_BY: 1, VALDIATED_DATE: "24-MAR-2019", CONFIRMED_BY: 1, CONFIRMED_DATE: "24-MAR-2019"});
//   request
//   .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/transfer/insertTransfer", body: itemInfo }, function (error, response) {
//     if (error) throw new Error('unable to call insertTransfer');
//     expect(response.statusCode).toBe(200);
//     expect(JSON.parse(response.body).status).toBe(200);
//     done();
//   });
// }, 20000);

//  it("UPDATETRANSFER | returns status code 200", function (done) {
//   var itemInfo = JSON.stringify({NOTES: "AOTِ"});
//    request
//    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/transfer/UPDATETRANSFER/2", body: itemInfo}, function (error, response) {
//      if (error) throw new Error('unable to call UPDATETRANSFER');
//      expect(response.statusCode).toBe(200);
//      expect(JSON.parse(response.body).status).toBe(200);
//      done();
//    });
//  }, 20000);

//  it("deleteTRANSFER | returns status code 200", function (done) {
//   var itemInfo = JSON.stringify({NOTES: "AOTِ"});
//    request
//    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/transfer/deleteTRANSFER/2", body: itemInfo}, function (error, response) {
//      if (error) throw new Error('unable to call deleteTRANSFER');
//      expect(response.statusCode).toBe(200);
//      expect(JSON.parse(response.body).status).toBe(200);
//      done();
//    });
//  }, 20000);

//-------------- transferitems Test ---------------------

it("getAllTransferRItems | returns status code 200", function (done) {
  request
  .get(base_url + "/TransferRItems/getAllTransferRItems", function (error, response) {
    if (error) throw new Error('unable to call getAllTransferRItems ');
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).status).toBe(200);
    done();
  });
}, 20000);

it("getOneTransferRItems | returns status code 200", function (done) {
  request
  .get(base_url + "/TransferRItems/getOneTransferRItems/1", function (error, response) {
    if (error) throw new Error('unable to call getOneTransferRItems ');
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).status).toBe(200);
    done();
  });
}, 20000);

//  it("insertTransferRItems | returns status code 200", function (done) {
//    var itemInfo = JSON.stringify({INV_TRANSFER_R_ID: 1, INV_TRANSFER_ITEMS_ID: 1,
//    INV_TRANSFER_ID: 1, INV_TRANSFER_STORES_ID: 1, STORES_ID: 1, ARRANGEMENT_NO: 1, ITEMS_ID: 1, UNITS_ID: 1, UNIT_FACTOR: 1,
//    UNIT_QUANTITY: 11, DEFAULT_UNIT_QUANTITY: 1, BASE_UNIT_QUANTITY: 1, ITEM_COST: 1, TOTAL_COST: 1, NOTES: "11", CREATED_BY: 1});
//    request
//    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/TransferRItems/insertTransferRItems", body: itemInfo }, function (error, response) {
//      if (error) throw new Error('unable to call insertTransferRItems');
//      expect(response.statusCode).toBe(200);
//      expect(JSON.parse(response.body).status).toBe(200);
//      done();
//    });
//  }, 20000);

 //-------------- transferitemsd Test ---------------------

it("getAlltransferItemsD | returns status code 200", function (done) {
  request
  .get(base_url + "/transferItemsD/getAlltransferItemsD", function (error, response) {
    if (error) throw new Error('unable to call getAlltransferItemsD ');
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).status).toBe(200);
    done();
  });
}, 20000);

it("getOnetransferItemsD | returns status code 200", function (done) {
  request
  .get(base_url + "/transferItemsD/getOnetransferItemsD/2", function (error, response) {
    if (error) throw new Error('unable to call getOnetransferItemsD ');
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).status).toBe(200);
    done();
  });
}, 20000);

// it("inserttransferItemsD | returns status code 200", function (done) {
//   var itemInfo = JSON.stringify({INV_TRANSFER_ITEMS_ID: 1, INV_TRANSFER_STORES_ID: 1,
//   INV_TRANSFER_ID: 1, ARRANGEMENT_NO: 1, BATCH_NUMBER: "1", SERIAL_NUMBER: "1", UNIT_QUANTITY: 1, DEFAULT_UNIT_QUANTITY: 1,
//   BASE_UNIT_QUANTITY: 1, ITEM_COST: 11, TOTAL_COST: 1, ITEM_PRICE: 1, TOTAL_PRICE: 1, NOTES: "1", CREATED_BY: "1"});
//   request
//   .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/transferItemsD/inserttransferItemsD", body: itemInfo }, function (error, response) {
//     if (error) throw new Error('unable to call inserttransferItemsD');
//     expect(response.statusCode).toBe(200);
//     expect(JSON.parse(response.body).status).toBe(200);
//     done();
//   });
// }, 20000);

// it("updatetransferItemsDById | returns status code 200", function (done) {
//   var itemInfo = JSON.stringify({NOTES: "osa"});
//   request
//   .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/transferItemsD/updatetransferItemsDById/1", body: itemInfo }, function (error, response) {
//     if (error) throw new Error('unable to call updatetransferItemsDById');
//     expect(response.statusCode).toBe(200);
//     expect(JSON.parse(response.body).status).toBe(200);
//     done();
//   });
// }, 20000);

//-------------- transferr Test ---------------------

it("getAlltInvTransferR | returns status code 200", function (done) {
  request
  .get(base_url + "/TransferR/getAlltInvTransferR", function (error, response) {
    if (error) throw new Error('unable to call getAlltInvTransferR ');
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).status).toBe(200);
    done();
  });
}, 20000);

it("getOneInvTransferR | returns status code 200", function (done) {
  request
  .get(base_url + "/TransferR/getOneInvTransferR/1", function (error, response) {
    if (error) throw new Error('unable to call getOneInvTransferR ');
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).status).toBe(200);
    done();
  });
}, 20000);

// it("insertInvTransferR | returns status code 200", function (done) {
//   var itemInfo = JSON.stringify({INV_TRANSFER_STORES_ID: 1,
//   INV_TRANSFER_ID: 1, DOCUMENT_TYPE_ID: 1, INVENTORY_PERIODS_ID: 1, STORES_ID: 1, DOCUMENT_NO: "1", BASE_DOCUMENT_ID: 1,
//   BASE_DOCUMENT_TYPE_ID: 1, SUBSIDIARY_ID: 1, JOURNALS_ID: 1, SOURCE_TYPE: 1, DOCUMENT_STATUS: 1, NOTES: "1", CREATED_BY: "1"});
//   request
//   .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/TransferR/insertInvTransferR", body: itemInfo }, function (error, response) {
//     if (error) throw new Error('unable to call insertInvTransferR');
//     expect(response.statusCode).toBe(200);
//     expect(JSON.parse(response.body).status).toBe(200);
//     done();
//   });
// }, 20000);

//  it("deleteTRANSFER | returns status code 200", function (done) {
//    request
//    .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/TransferR/deleteTRANSFER/1"}, function (error, response) {
//      if (error) throw new Error('unable to call deleteTRANSFER');
//      expect(response.statusCode).toBe(200);
//      expect(JSON.parse(response.body).status).toBe(200);
//      done();
//    });
//  }, 20000);

// it("updateInvTransferR | returns status code 200", function (done) {
//   var itemInfo = JSON.stringify({ 	"CREATED_BY": 1});
//   request
//   .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/TransferR/updateInvTransferR/1", body: itemInfo }, function (error, response) {
//     if (error) throw new Error('unable to call updateInvTransferR');
//     expect(response.statusCode).toBe(200);
//     expect(JSON.parse(response.body).status).toBe(200);
//     done();
//    });
//  }, 20000);

 //-------------- transferritems Test ---------------------

it("getAllTransferRItems| returns status code 200", function (done) {
  request
  .get(base_url + "/TransferRItems/getAllTransferRItems", function (error, response) {
    if (error) throw new Error('unable to call getAllTransferRItems');
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).status).toBe(200);
    done();
  });
}, 20000);

it("getOneTransferRItems| returns status code 200", function (done) {
  request
  .get(base_url + "/TransferRItems/getOneTransferRItems/1", function (error, response) {
    if (error) throw new Error('unable to call getOneTransferRItems');
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).status).toBe(200);
    done();
  });
}, 20000);

// it("insertTransferRItems| returns status code 200", function (done) {
//   var itemInfo = JSON.stringify({INV_TRANSFER_R_ID: 1,
//            INV_TRANSFER_ITEMS_ID: 1, INV_TRANSFER_ID: 1, INV_TRANSFER_STORES_ID: 1, STORES_ID: 1, ARRANGEMENT_NO: 1, ITEMS_ID: 1, UNITS_ID: 1, 
//            UNIT_FACTOR: 1, UNIT_QUANTITY: 11, DEFAULT_UNIT_QUANTITY: 1, BASE_UNIT_QUANTITY: 1, ITEM_COST: 1, TOTAL_COST: 1, NOTES: "11", CREATED_BY: 1});
//   request
//   .post({ headers: { 'content-type': 'application/json' }, url: base_url + "/TransferRItems/insertTransferRItems", body: itemInfo }, function (error, response) {
//     if (error) throw new Error('unable to call insertTransferRItems');
//     expect(response.statusCode).toBe(200);
//     expect(JSON.parse(response.body).status).toBe(200);
//     done();
//   });
// }, 20000);


//-------------- transferstores Test ---------------------

// it("getAllTransferStoresreturns | status code 200", function (done) {
//   request
//   .get(base_url + "/TransferStores/getAllTransferStores", function (error, response) {
//     if (error) throw new Error('unable to call getAllTransferStores');
//     expect(response.statusCode).toBe(200);
//     expect(JSON.parse(response.body).status).toBe(200);
//     done();
//   });
// }, 20000);

// it("getOneTransferStores | status code 200", function (done) {
//   request
//   .get(base_url + "/TransferStores/getOneTransferStores/1", function (error, response) {
//     if (error) throw new Error('unable to call getOneTransferStores');
//     expect(response.statusCode).toBe(200);
//     expect(JSON.parse(response.body).status).toBe(200);
//     done();
//   });
// }, 20000);

//it("insertTransferStores| returns status code 200", function (done) {
  //var itemInfo = JSON.stringify({INV_TRANSFER_ID: 1, STORES_ID: 4, NOTES: "1", CREATED_BY: 1});
  //request
  //.post({ headers: { 'content-type': 'application/json' }, url: base_url + "/TransferStores/insertTransferStores", body: itemInfo }, function (error, response) {
    //if (error) throw new Error('unable to call insertTransferStores');
    //expect(response.statusCode).toBe(200);
    //expect(JSON.parse(response.body).status).toBe(200);
    //done();
  //});
//}, 20000);


    });