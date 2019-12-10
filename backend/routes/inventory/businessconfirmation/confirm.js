require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let businessSQL = require('./confirmsql');
let periodStatus = require('./periodstatus');
let requeststatus = require('./requeststatus');
let docTypes = require('./documenttypes');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let validatestructure = require('@lib/validatestructure');
let businessPool = require('@lib/businessPool');
let validatecharOfAcc = require('@lib/validatestructure');

router.post('/confirmBusinessRequest', checkData,
  validatestructure.validateConfirmationStructure,
  validatestructure.validateOpenBalanceRequest,
  validatestructure.validateEmployee,
  // to implement non-duplicated open balance requests ... 
  async (req, res) => {

    // Classify Request Type
    if (req.body.DOC_TYPE_ID === docTypes.openBalance) {

      // collect request info ..
      let openBalance = await businessPool(req, res, businessSQL.getOpenBalance.statement, { OPEN_BALANCE_ID: req.body.ID });
      let openBalanceItems = await businessPool(req, res, businessSQL.getOpenBalanceItems.statement, { OPEN_BALANCE_ID: req.body.ID })

      let vac = await businessPool(req, res, businessSQL.checkOpenPeriod.statement, { INVENTORY_PERIOD_ID: openBalance.rows[0].INVENTORY_PERIODS_ID });

      if (vac.rows[0].STATUS === periodStatus.opened) {

        // checking related WFLO request status ..
        if (openBalance.rows[0].WF_REQUEST_ID) {

          let requestStatus = await businessPool(req, res, businessSQL.getRequestInfo.statement, { REQUEST_ID: openBalance.rows[0].WF_REQUEST_ID });

          if (requestStatus.rows[0].REQUEST_STATUS === requeststatus.approved
            || requestStatus.rows[0].REQUEST_STATUS === requeststatus.finished
            || requestStatus.rows[0].REQUEST_STATUS === requeststatus.closed) {

            let exists; let insertedReq
            openBalanceItems.rows.forEach(async (element) => {

              exists = await businessPool(req, res, businessSQL.getItemBalanceSI.statement, { STORE_ID: openBalance.rows[0].STORES_ID, ITEM_ID: element.ITEMS_ID });

              if (exists.rows.length <= 0) { // does not existing ..

                insertedReq = {
                  subsidiary_id: openBalance.rows[0].SUBSIDIARY_ID,
                  items_id: element.ITEMS_ID,
                  stores_id: openBalance.rows[0].STORES_ID,
                  open_balance: element.UNIT_QUANTITY,
                  item_cost: element.ITEM_COST,
                  average_cost: element.ITEM_COST, //Q
                  current_balance: element.UNIT_QUANTITY,
                  qty_on_hand: element.UNIT_QUANTITY,
                  qty_reserved: 0,
                  qty_transfer_to: 0,
                  qty_transfer_from: 0,
                  oty_disposed: 0,
                  qty_on_por: 0,
                  qty_on_sor: 0,
                  qty_on_so: 0,
                  qty_on_po: 0,
                  qty_requested: 0,
                  qty_so_consigment: 0,
                  qty_in: 0,
                  qty_out: 0,
                  reorder_limit: 0,
                  max_limit: 0,
                  min_limit: 0,
                  last_sold: null,
                  last_recieved: null,
                  confirmed: 1,
                  stores_locations_id: null, //Q
                  created_by: req.body.EMPLOYEE_ID,
                  deleted: 0
                }
                try {
                  convOP = await bodyconverter.bodyconverter(req, res, insertedReq, businessSQL.insertItemBalance.returns);
                  doneOP = await businessPool(req, res, businessSQL.insertItemBalance.statement, convOP);

                  insertedReqUnit = {
                    items_balance_id: Number(doneOP.rows.r_items_balance_id),
                    items_id: element.ITEMS_ID,
                    stores_id: openBalance.rows[0].STORES_ID,
                    units_id: element.UNITS_ID,
                    open_balance: element.UNIT_QUANTITY,
                    item_cost: element.ITEM_COST,
                    average_cost: element.ITEM_COST, //Q
                    current_balance: element.UNIT_QUANTITY,
                    qty_on_hand: element.UNIT_QUANTITY,
                    qty_reserved: 0,
                    qty_transfer_to: 0,
                    qty_transfer_from: 0,
                    oty_disposed: 0,
                    qty_on_por: 0,
                    qty_on_sor: 0,
                    qty_on_so: 0,
                    qty_on_po: 0,
                    qty_requested: 0,
                    qty_so_consigment: 0,
                    qty_added: 0,
                    created_by: req.body.EMPLOYEE_ID,
                    inv_open_balance_items_id: element.INV_OPEN_BALANCE_ITEMS_ID,
                    deleted: 0
                  }

                  doneUN = await businessPool(req, res, businessSQL.insertItemBalanceUnits.statement, insertedReqUnit);

                  openBalanceItemsD = await businessPool(req, res, businessSQL.getOpenBalanceItemsD.statement, { OPEN_BALANCE_ID: req.body.ID, INV_OPEN_BALANCE_ITEMS_ID: element.INV_OPEN_BALANCE_ITEMS_ID })
                  openBalanceItemsD.rows.forEach(async (Delement) => {

                    insertedReqDetail = {
                      items_balance_id: Number(doneOP.rows.r_items_balance_id),
                      batch_number: Delement.BATCH_NUMBER,
                      expiry_date: Delement.EXPIRY_DATE,
                      serial_number: Delement.SERIAL_NUMBER,
                      open_balance: Delement.UNIT_QUANTITY,
                      open_balance_date: Delement.CREATION_DATE,
                      item_cost: Delement.ITEM_COST,
                      average_cost: Delement.ITEM_COST,
                      current_balance: Delement.ITEM_COST,
                      qty_on_hand: Delement.ITEM_COST,
                      qty_reserved: 0,
                      qty_transfer_to: 0,
                      qty_transfer_from: 0,
                      oty_disposed: 0,
                      qty_on_por: 0,
                      qty_on_sor: 0,
                      qty_on_so: 0,
                      qty_on_po: 0,
                      qty_requested: 0,
                      qty_so_consigment: 0,
                      qty_po_consigment: 0,
                      qty_in: 0,
                      qty_out: 0,
                      last_sold: null,
                      last_recieved: null,
                      confirmed: 1,
                      created_by: req.body.EMPLOYEE_ID,
                      inv_open_balance_items_d_id: Delement.INV_OPEN_BALANCE_ITEMS_D_ID,
                      deleted: 0
                    }
                    doneDT = await businessPool(req, res, businessSQL.insertItemBalanceDetail.statement, insertedReqDetail);
                  });

                } catch (error) {
                  // unexpected failure .. 
                }
              } else { // existing ..
                newBalance = {
                  STORE_ID: Number(openBalance.rows[0].STORES_ID),
                  ITEM_ID: Number(element.ITEMS_ID),
                  OPEN_BALANCE: Number(element.UNIT_QUANTITY),
                  CURRENT_BALANCE: Number(element.UNIT_QUANTITY),
                  QTY_ON_HAND: Number(element.UNIT_QUANTITY),
                  QTY_TRANSFER_TO: 0,
                  QTY_TRANSFER_FROM: 0,
                  MODIFIED_BY: req.body.EMPLOYEE_ID
                }
                try {
                  updatebalance = await businessPool(req, res, businessSQL.updateBalance.statement, newBalance);
                  checkUnitExists = await businessPool(req, res, businessSQL.checkUnitExists.statement, { STORE_ID: Number(openBalance.rows[0].STORES_ID), ITEM_ID: Number(element.ITEMS_ID), UNITS_ID: Number(element.UNITS_ID) });
                  if (checkUnitExists.rows[0].length > 0) {
                    updatebalanceUnits = await businessPool(req, res, businessSQL.updateBalanceItems.statement, newBalance);
                  } else {
                    insertedReqUnitU = {
                      items_balance_id: Number(exists.rows[0].ITEMS_BALANCE_ID),
                      items_id: element.ITEMS_ID,
                      stores_id: openBalance.rows[0].STORES_ID,
                      units_id: element.UNITS_ID,
                      open_balance: element.UNIT_QUANTITY,
                      item_cost: element.ITEM_COST,
                      average_cost: element.ITEM_COST, //Q
                      current_balance: element.UNIT_QUANTITY,
                      qty_on_hand: element.UNIT_QUANTITY,
                      qty_reserved: 0,
                      qty_transfer_to: 0,
                      qty_transfer_from: 0,
                      oty_disposed: 0,
                      qty_on_por: 0,
                      qty_on_sor: 0,
                      qty_on_so: 0,
                      qty_on_po: 0,
                      qty_requested: 0,
                      qty_so_consigment: 0,
                      qty_added: 0,
                      created_by: req.body.EMPLOYEE_ID,
                      inv_open_balance_items_id: element.INV_OPEN_BALANCE_ITEMS_ID,
                      deleted: 0
                    }
                    doneUN = await businessPool(req, res, businessSQL.insertItemBalanceUnits.statement, insertedReqUnitU);
                  }
                  openBalanceItemsDD = await businessPool(req, res, businessSQL.getOpenBalanceItemsD.statement, { OPEN_BALANCE_ID: req.body.ID, INV_OPEN_BALANCE_ITEMS_ID: element.INV_OPEN_BALANCE_ITEMS_ID })
                  openBalanceItemsDD.rows.forEach(async (DDelement) => {

                    insertedReqDetailL = {
                      items_balance_id: Number(exists.rows[0].ITEMS_BALANCE_ID),
                      batch_number: DDelement.BATCH_NUMBER,
                      expiry_date: DDelement.EXPIRY_DATE,
                      serial_number: DDelement.SERIAL_NUMBER,
                      open_balance: DDelement.UNIT_QUANTITY,
                      open_balance_date: DDelement.CREATION_DATE,
                      item_cost: DDelement.ITEM_COST,
                      average_cost: DDelement.ITEM_COST,
                      current_balance: DDelement.ITEM_COST,
                      qty_on_hand: DDelement.ITEM_COST,
                      qty_reserved: 0,
                      qty_transfer_to: 0,
                      qty_transfer_from: 0,
                      oty_disposed: 0,
                      qty_on_por: 0,
                      qty_on_sor: 0,
                      qty_on_so: 0,
                      qty_on_po: 0,
                      qty_requested: 0,
                      qty_so_consigment: 0,
                      qty_po_consigment: 0,
                      qty_in: 0,
                      qty_out: 0,
                      last_sold: null,
                      last_recieved: null,
                      confirmed: 1,
                      created_by: req.body.EMPLOYEE_ID,
                      inv_open_balance_items_d_id: DDelement.INV_OPEN_BALANCE_ITEMS_D_ID,
                      deleted: 0
                    }
                    doneDT = await businessPool(req, res, businessSQL.insertItemBalanceDetail.statement, insertedReqDetailL);
                  });
                } catch (error) {
                  console.log(error)
                }
              }
            });
            res.status(200).json({ status: 200, result: 'process has been successfully finished ..' })
          } else {
            res.status(200).json({ status: 200, message: 'Provided Request still in Approval Process ..' })
          }
        } else {
          res.status(200).json({ status: 400, message: 'Request does not have Approved WorkFlow item, please contact system Administrator ..' })
        }
      } else {
        res.status(200).json({ status: 400, message: 'Inventory Period is not an open Period !' })
      }
    } else if (req.body.DOC_TYPE_ID === docTypes.finalReceiving) {

      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      // collect request info ..
      let rcvDoc = await businessPool(req, res, businessSQL.getrcvDoc.statement, { DOCUMENT_ID: req.body.ID });
      let rscDocItems = await businessPool(req, res, businessSQL.getrcvDocItems.statement, { DOCUMENT_ID: req.body.ID })

      let vac = await businessPool(req, res, businessSQL.checkOpenPeriod.statement, { INVENTORY_PERIOD_ID: rcvDoc.rows[0].INVENTORY_PERIODS_ID });

      if (vac.rows[0].STATUS === periodStatus.opened) {

        // checking related WFLO request status ..
        if (rcvDoc.rows[0].WF_REQUEST_ID) {

          let requestStatus = await businessPool(req, res, businessSQL.getRequestInfo.statement, { REQUEST_ID: rcvDoc.rows[0].WF_REQUEST_ID });

          if (requestStatus.rows[0].REQUEST_STATUS === requeststatus.approved
            || requestStatus.rows[0].REQUEST_STATUS === requeststatus.finished
            || requestStatus.rows[0].REQUEST_STATUS === requeststatus.closed) {

            let exists; let insertedReq
            rscDocItems.rows.forEach(async (element) => {

              exists = await businessPool(req, res, businessSQL.getItemBalanceSI.statement, { STORE_ID: rcvDoc.rows[0].STORES_ID, ITEM_ID: element.ITEMS_ID });

              if (exists.rows.length <= 0) { // does not existing ..

                insertedReq = {
                  subsidiary_id: rcvDoc.rows[0].SUBSIDIARY_ID,
                  items_id: element.ITEMS_ID,
                  stores_id: rcvDoc.rows[0].STORES_ID,
                  open_balance: 0,
                  item_cost: element.ITEM_COST,
                  average_cost: element.ITEM_COST, //Q
                  current_balance: element.UNIT_QUANTITY,
                  qty_on_hand: element.UNIT_QUANTITY,
                  qty_reserved: 0,
                  qty_transfer_to: 0,
                  qty_transfer_from: 0,
                  oty_disposed: 0,
                  qty_on_por: 0,
                  qty_on_sor: 0,
                  qty_on_so: 0,
                  qty_on_po: 0,
                  qty_requested: 0,
                  qty_so_consigment: 0,
                  qty_in: 0,
                  qty_out: 0,
                  reorder_limit: 0,
                  max_limit: 0,
                  min_limit: 0,
                  last_sold: null,
                  last_recieved: null,
                  confirmed: 1,
                  stores_locations_id: null, //Q
                  created_by: req.body.EMPLOYEE_ID,
                  deleted: 0
                }
                try {
                  convrc = await bodyconverter.bodyconverter(req, res, insertedReq, businessSQL.insertItemBalance.returns);
                  donerc = await businessPool(req, res, businessSQL.insertItemBalance.statement, convOP);

                  insertedReqUnit = {
                    items_balance_id: Number(donerc.rows.r_items_balance_id),
                    items_id: element.ITEMS_ID,
                    stores_id: rcvDoc.rows[0].STORES_ID,
                    units_id: element.UNITS_ID,
                    open_balance: 0,
                    item_cost: element.ITEM_COST,
                    average_cost: element.ITEM_COST, //Q
                    current_balance: element.UNIT_QUANTITY,
                    qty_on_hand: element.UNIT_QUANTITY,
                    qty_reserved: 0,
                    qty_transfer_to: 0,
                    qty_transfer_from: 0,
                    oty_disposed: 0,
                    qty_on_por: 0,
                    qty_on_sor: 0,
                    qty_on_so: 0,
                    qty_on_po: 0,
                    qty_requested: 0,
                    qty_so_consigment: 0,
                    qty_added: 0,
                    created_by: req.body.EMPLOYEE_ID,
                    inv_open_balance_items_id: null,
                    deleted: 0
                  }

                  doneRUN = await businessPool(req, res, businessSQL.insertItemBalanceUnits.statement, insertedReqUnit);

                  rcvDocItemsD = await businessPool(req, res, businessSQL.getrcvDocItemsDetails.statement, { DOCUMENT_ID: req.body.ID, DOCUMENT_ITEM_ID: element.rcv_document_items_id })
                  rcvDocItemsD.rows.forEach(async (Relement) => {

                    insertedReqDetail = {
                      items_balance_id: Number(donerc.rows.r_items_balance_id),
                      batch_number: Relement.BATCH_NUMBER,
                      expiry_date: Relement.EXPIRY_DATE,
                      serial_number: Relement.SERIAL_NUMBER,
                      open_balance: 0,
                      open_balance_date: Relement.CREATION_DATE,
                      item_cost: Relement.ITEM_COST,
                      average_cost: Relement.ITEM_COST,
                      current_balance: Relement.ITEM_COST,
                      qty_on_hand: Relement.ITEM_COST,
                      qty_reserved: 0,
                      qty_transfer_to: 0,
                      qty_transfer_from: 0,
                      oty_disposed: 0,
                      qty_on_por: 0,
                      qty_on_sor: 0,
                      qty_on_so: 0,
                      qty_on_po: 0,
                      qty_requested: 0,
                      qty_so_consigment: 0,
                      qty_po_consigment: 0,
                      qty_in: 0,
                      qty_out: 0,
                      last_sold: null,
                      last_recieved: null,
                      confirmed: 1,
                      created_by: req.body.EMPLOYEE_ID,
                      inv_open_balance_items_d_id: null,
                      deleted: 0
                    }
                    doneDT = await businessPool(req, res, businessSQL.insertItemBalanceDetail.statement, insertedReqDetail);
                  });

                } catch (error) {
                  // unexpected failure .. 
                }
              } else { // existing ..
                newRcv = {
                  STORE_ID: Number(rcvDoc.rows[0].STORES_ID),
                  ITEM_ID: Number(element.ITEMS_ID),
                  OPEN_BALANCE: 0,
                  CURRENT_BALANCE: Number(element.UNIT_QUANTITY),
                  QTY_ON_HAND: Number(element.UNIT_QUANTITY),
                  QTY_TRANSFER_TO: 0,
                  QTY_TRANSFER_FROM: 0,
                  MODIFIED_BY: req.body.EMPLOYEE_ID
                }
                try {
                  updatebalance = await businessPool(req, res, businessSQL.updateBalance.statement, newRcv);
                  checkUnitExists = await businessPool(req, res, businessSQL.checkUnitExists.statement, { STORE_ID: Number(rcvDoc.rows[0].STORES_ID), ITEM_ID: Number(element.ITEMS_ID), UNITS_ID: Number(element.UNITS_ID) });
                  if (checkUnitExists.rows[0].length > 0) {
                    updatebalanceUnits = await businessPool(req, res, businessSQL.updateBalanceItems.statement, newRcv);
                  } else {
                    insertedReqUnitU = {
                      items_balance_id: Number(donerc.rows.r_items_balance_id),
                      items_id: element.ITEMS_ID,
                      stores_id: rcvDoc.rows[0].STORES_ID,
                      units_id: element.UNITS_ID,
                      open_balance: 0,
                      item_cost: element.ITEM_COST,
                      average_cost: element.ITEM_COST, //Q
                      current_balance: element.UNIT_QUANTITY,
                      qty_on_hand: element.UNIT_QUANTITY,
                      qty_reserved: 0,
                      qty_transfer_to: 0,
                      qty_transfer_from: 0,
                      oty_disposed: 0,
                      qty_on_por: 0,
                      qty_on_sor: 0,
                      qty_on_so: 0,
                      qty_on_po: 0,
                      qty_requested: 0,
                      qty_so_consigment: 0,
                      qty_added: 0,
                      created_by: req.body.EMPLOYEE_ID,
                      inv_open_balance_items_id: null,
                      deleted: 0
                    }
                    doneUN = await businessPool(req, res, businessSQL.insertItemBalanceUnits.statement, insertedReqUnitU);
                  }
                  openBalanceItemsDD = await businessPool(req, res, businessSQL.getrcvDocItemsDetails.statement, { DOCUMENT_ID: req.body.ID, DOCUMENT_ITEM_ID: element.rcv_document_items_id })
                  openBalanceItemsDD.rows.forEach(async (DDelement) => {

                    insertedReqDetailLL = {
                      items_balance_id: Number(exists.rows[0].ITEMS_BALANCE_ID),
                      batch_number: DDelement.BATCH_NUMBER,
                      expiry_date: DDelement.EXPIRY_DATE,
                      serial_number: DDelement.SERIAL_NUMBER,
                      open_balance: 0,
                      open_balance_date: DDelement.CREATION_DATE,
                      item_cost: DDelement.ITEM_COST,
                      average_cost: DDelement.ITEM_COST,
                      current_balance: DDelement.ITEM_COST,
                      qty_on_hand: DDelement.ITEM_COST,
                      qty_reserved: 0,
                      qty_transfer_to: 0,
                      qty_transfer_from: 0,
                      oty_disposed: 0,
                      qty_on_por: 0,
                      qty_on_sor: 0,
                      qty_on_so: 0,
                      qty_on_po: 0,
                      qty_requested: 0,
                      qty_so_consigment: 0,
                      qty_po_consigment: 0,
                      qty_in: 0,
                      qty_out: 0,
                      last_sold: null,
                      last_recieved: null,
                      confirmed: 1,
                      created_by: req.body.EMPLOYEE_ID,
                      inv_open_balance_items_d_id: null,
                      deleted: 0
                    }
                    donercDT = await businessPool(req, res, businessSQL.insertItemBalanceDetail.statement, insertedReqDetailLL);
                  });
                } catch (error) {
                  console.log(error)
                }
              }
            });
            res.status(200).json({ status: 200, result: 'process has been successfully finished ..' })
          } else {
            res.status(200).json({ status: 200, message: 'Provided Request still in Approval Process ..' })
          }
        } else {
          res.status(200).json({ status: 400, message: 'Request does not have Approved WorkFlow item, please contact system Administrator ..' })
        }
      } else {
        res.status(200).json({ status: 400, message: 'Inventory Period is not an open Period !' })
      }

      
    } else if (req.body.DOC_TYPE_ID === docTypes.issueOrder) {
      // -
      res.status(200).json({ status: 400, message: 'this type of Requests is not implemented yet, Wael Abdeen ..' });
    } else if (req.body.DOC_TYPE_ID === docTypes.transferRequest) {
      // -
     
      // collect request info ..
      let invTransfer = await businessPool(req, res, businessSQL.getInvTransfer.statement, { INV_TRANSFER_ID: req.body.ID });
      let invTransferItems = await businessPool(req, res, businessSQL.getInvTransferItems.statement, { INV_TRANSFER_ITEMS_ID: req.body.ID })

      let vac = await businessPool(req, res, businessSQL.checkOpenPeriod.statement, { INVENTORY_PERIOD_ID: invTransfer.rows[0].INVENTORY_PERIODS_ID });

      if (vac.rows[0].STATUS === periodStatus.opened) {

        // checking related WFLO request status ..
        if (invTransfer.rows[0].WF_REQUEST_ID) {

          let requestStatus = await businessPool(req, res, businessSQL.getRequestInfo.statement, { REQUEST_ID: invTransfer.rows[0].WF_REQUEST_ID });

          if (requestStatus.rows[0].REQUEST_STATUS === requeststatus.approved
            || requestStatus.rows[0].REQUEST_STATUS === requeststatus.finished
            || requestStatus.rows[0].REQUEST_STATUS === requeststatus.closed) {

            let exists; let insertedReq
            invTransferItems.rows.forEach(async (element) => {

              exists = await businessPool(req, res, businessSQL.getItemBalanceSI.statement, { STORE_ID: invTransfer.rows[0].STORES_ID, ITEM_ID: element.ITEMS_ID });

              if (exists.rows.length <= 0) { // does not existing ..

                // item doesn't exists, to be logged and it should be validated from front end.

              } else { // existing ..
                newTrans = {
                  STORE_ID: Number(rcvDoc.rows[0].STORES_ID),
                  ITEM_ID: Number(element.ITEMS_ID),
                  OPEN_BALANCE: 0,
                  CURRENT_BALANCE: Number(0 - element.UNIT_QUANTITY),
                  QTY_ON_HAND: Number(0 - element.UNIT_QUANTITY),
                  QTY_TRANSFER_TO: element.UNIT_QUANTITY,
                  QTY_TRANSFER_FROM: 0,
                  MODIFIED_BY: req.body.EMPLOYEE_ID
                }
                try {
                  updatebalance = await businessPool(req, res, businessSQL.updateBalance.statement, newTrans);
                  checkUnitExists = await businessPool(req, res, businessSQL.checkUnitExists.statement, { STORE_ID: Number(rcvDoc.rows[0].STORES_ID), ITEM_ID: Number(element.ITEMS_ID), UNITS_ID: Number(element.UNITS_ID) });
                  if (checkUnitExists.rows[0].length > 0) {
                    updatebalanceUnits = await businessPool(req, res, businessSQL.updateBalanceItems.statement, newTrans);
                    openBalanceItemsDD = await businessPool(req, res, businessSQL.getInvTransferItemsD.statement, { INV_TRANSFER_ID: req.body.ID, INV_TRANSFER_ITEMS_ID: element.inv_transfer_items_id })
                    openBalanceItemsDD.rows.forEach(async (DDelement) => {
                    // to be implemented ..
                    // no unique key exists .. Q
                    });
                  } else {
                   // unit is not exists, should be validated and verified by front end..
                  }
                } catch (error) {
                  console.log(error)
                }
              }
            });
            res.status(200).json({ status: 200, result: 'process has been successfully finished ..' })
          } else {
            res.status(200).json({ status: 200, message: 'Provided Request still in Approval Process ..' })
          }
        } else {
          res.status(200).json({ status: 400, message: 'Request does not have Approved WorkFlow item, please contact system Administrator ..' })
        }
      } else {
        res.status(200).json({ status: 400, message: 'Inventory Period is not an open Period !' })
      }


    } else if (req.body.DOC_TYPE_ID === docTypes.transferReceive) {
      // +
      // will automatically generate 
      res.status(200).json({ status: 400, message: 'this type of Requests is not implemented yet, Wael Abdeen ..' });
    } else {
      // Generic
      res.status(200).json({ status: 400, message: 'this type of Requests is not implemented yet, Wael Abdeen ..' });
    }

  });

module.exports = router;
