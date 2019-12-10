
let statements = {
       getAllApprovals: {
              statement: `
              SELECT RQ.REQUEST_ID,
              RT.APPLICATION_ID,
              AP.EN_NAME APPLICATION_NAME,
              RT.TYPE_ID REQ_TYPE_ID,
              RQ.REQUEST_STATUS,
              RT.EN_NAME REQ_TYPE_NAME,
              RT.DEFINITION_TYPE REQ_TYPE_DEFINITION_TYPE,
              RQ.CREATED_BY EMPLOYEE_ID,

              TA.EN_NAME INCOME_ACTION,
              WT.TRANACTION_ID,
              WT.CLASSIFICATION TRANS_CLASSIFICATION,
              WT.TRANACTION_TYPE,
              WT.COMMENTS,
              WT.ANSWER_ON_QUES,
              WT.CREATED_DATE,
              WT.OUTCOME_ACTION_DATE,
              WT.STATUS TRANACTION_STATUS,
              WT.ASK_REPLY_STEP,
              WT.PARENT_TRANACTION_ID,
              WT.FROM_DESTINATION_ID,
              DFM.DESTINATION_NAME_AR FROM_DEST_AR,
              DFM.DESTINATION_NAME_EN FROM_DEST,
              WT.TO_DESTINATION_ID,
              DTO.DESTINATION_NAME_AR TO_DEST_AR,
              DTO.DESTINATION_NAME_EN TO_DEST,
              WT.STEP_ID,
              WT.OPENED,
              PJ.CLIENT_ID,
              PJ.PROJECT_ID,
              PJ.PROJECT_MANAGER_ID,
              WO.PRIORITY,
              WO.WORK_ORDER_CODE,
              WO.STATUS_ID WO_STATUS_ID,
              RQ.DESCRIPTION,
              RQ.CLASSIFICATION_ID REQ_CLASSIFICATION,
              CS.EN_NAME CLIENT_NAME,
              PJ.PRIMARY_NAME PROJECT_NAME,
              EM.EMPLOYEE_EMAIL,
              ST.STEP_COLOR,
              ST.DESCRIPTION_EN STEP_DESCRIPTION_EN,
              ST.DESCRIPTION_AR STEP_DESCRIPTION_AR,
              ST.CLASSIFICATION STEP_CLASSIFICATION,
              --the next flag is used to decide the email that will be sent to the people who should take action/ view the vacation request
              (SELECT step_need_action
                 FROM hr.request_type_steps
                WHERE     step_order =
                             (SELECT rq.step_order + 1
                                FROM hr.request_type_steps rq
                               WHERE rq.step_id = WT.STEP_ID AND deleted = 0)
                      AND type_id = RT.TYPE_ID
                      AND status = 1
                      AND deleted = 0)
                 step_need_action_flag,
              -- the next flag is used to know whether an approve email should be sent to the vacation requester or still the reques needs action from other emps
              DECODE (
                 (SELECT rq_type_steps.step_id
                    FROM hr.request_type_steps rq_type_steps
                   WHERE     rq_type_steps.step_order =
                                (SELECT MAX (rq_type_steps.step_order)
                                   FROM hr.request_type_steps rq_type_steps
                                  WHERE     rq_type_steps.type_id = RT.TYPE_ID
                                        AND rq_type_steps.step_need_Action = 'Y'
                                        AND deleted = 0)
                         AND rq_type_steps.type_id = RT.TYPE_ID
                         AND rq_type_steps.status = 1
                         AND deleted = 0),
                 NVL (WT.STEP_ID, 99999), 'Y',
                 'N')
                 last_step_need_action_flag,
                 (
                  SELECT
                     CASE
                        WHEN
                           RT.TYPE_ID = 72 
                        THEN
                         (
                           SELECT
                              IOB.INV_OPEN_BALANCE_ID 
                           FROM
                              INV_OPEN_BALANCE IOB 
                           WHERE
                              IOB.WF_REQUEST_ID = RQ.REQUEST_ID ) 
                           ELSE
                              NULL 
                     END
                           FROM
                              dual
               )
               INV_OPEN_BALANCE_ID,
               (
                  SELECT
                     CASE
                        WHEN
                           RT.TYPE_ID = 76 
                        THEN
                         (
                           SELECT
                              IOB.INV_TRANSFER_ID 
                           FROM
                              INV_TRANSFER IOB 
                           WHERE
                              IOB.WF_REQUEST_ID = RQ.REQUEST_ID ) 
                           ELSE
                              NULL 
                     END
                           FROM
                              dual
               )
               INV_TRANSFER_ID,
                (
                  SELECT
                     CASE
                        WHEN
                           RT.TYPE_ID = 73
                        THEN
                         (
                           SELECT
                              R.DOCUMENT_ID 
                           FROM
                              RCV_DOCUMENT R 
                           WHERE
                              R.WF_REQUEST_ID = RQ.REQUEST_ID ) 
                           ELSE
                              NULL 
                     END
                           FROM
                              dual
               )
               DOCUMENT_ID,
                    (
                  SELECT
                     CASE
                        WHEN
                           RT.TYPE_ID = 77
                        THEN
                         (
                           SELECT
                              R.DOCUMENT_ID 
                           FROM
                              REQ_DOCUMENT R 
                           WHERE
                              R.WF_REQUEST_ID = RQ.REQUEST_ID ) 
                           ELSE
                              NULL 
                     END
                           FROM
                              dual
               )
               JO_REQ_DOCUMENT_ID,
              (
                  SELECT
                     CASE
                        WHEN
                           RT.TYPE_ID = 78
                        THEN
                         (
                           SELECT
                              R.DOCUMENT_ID 
                           FROM
                              DSP_DOCUMENT R 
                           WHERE
                              R.WF_REQUEST_ID = RQ.REQUEST_ID ) 
                           ELSE
                              NULL 
                     END
                           FROM
                              dual
               )
               DSP_DOCUMENT_ID,
              (
                  SELECT
                     CASE
                        WHEN
                           RT.TYPE_ID = 93
                        THEN
                         (
                           SELECT
                              R.DOCUMENT_ID 
                           FROM
                              DSP_DOCUMENT R 
                           WHERE
                              R.WF_REQUEST_ID = RQ.REQUEST_ID ) 
                           ELSE
                              NULL 
                     END
                           FROM
                              dual
               )
               REQUEST_ITEM_RECEIVE_ID,
               (
                  SELECT
                     CASE
                        WHEN
                           RT.TYPE_ID = 80
                        THEN
                         (
                           SELECT 
                              R.DOCUMENT_ID 
                           FROM
                              RCV_INSPECTION R 
                           WHERE
                              R.WF_REQUEST_ID = RQ.REQUEST_ID ) 
                           ELSE
                              NULL 
                     END
                           FROM
                              dual
               )
               RCV_INSPECTION_ID,
                (
                  SELECT
                     CASE
                        WHEN
                           RT.TYPE_ID = 81
                        THEN
                         (
                           SELECT 
                              R.DOCUMENT_ID 
                           FROM
                              RCV_TEMPORARY R 
                           WHERE
                              R.WF_REQUEST_ID = RQ.REQUEST_ID ) 
                           ELSE
                              NULL 
                     END
                           FROM
                              dual
               )
               RCV_TEMPORARY_ID,
               (
                  SELECT
                     CASE
                        WHEN
                           RT.TYPE_ID = 84
                        THEN
                         (
                           SELECT 
                              R.INV_TRANSFER_R_ID 
                           FROM
                              INV_TRANSFER_R R 
                           WHERE
                              R.WF_REQUEST_ID = RQ.REQUEST_ID ) 
                           ELSE
                              NULL 
                     END
                           FROM
                              dual
               )
               INV_TRANSFER_R_ID,
                 (
                  SELECT
                     CASE
                        WHEN
                           RT.TYPE_ID = 85
                        THEN
                         (
                           SELECT 
                              R.INV_STOCKTAKING_ID 
                           FROM
                              INV_STOCKTAKING R 
                           WHERE
                              R.WF_REQUEST_ID = RQ.REQUEST_ID ) 
                           ELSE
                              NULL 
                     END
                           FROM
                              dual
               )
               INV_STOCKTAKING_ID ,
               (
                  SELECT
                     CASE
                        WHEN
                           RT.TYPE_ID = 86
                        THEN
                         (
                           SELECT 
                              R.DOCUMENT_ID 
                           FROM
                              REQ_DOCUMENT R 
                           WHERE
                              R.WF_REQUEST_ID = RQ.REQUEST_ID ) 
                           ELSE
                              NULL 
                     END
                           FROM
                              dual
               )
               REQUEST_DOCUMENT_ID,
                     (
                  SELECT
                     CASE
                        WHEN
                           RT.TYPE_ID = 87 
                        THEN
                         (
                           SELECT
                              IOB.INV_TRANSFER_ID 
                           FROM
                              INV_TRANSFER IOB 
                           WHERE
                              IOB.WF_REQUEST_ID = RQ.REQUEST_ID ) 
                           ELSE
                              NULL 
                     END
                           FROM
                              dual
               )
               CUSTODY_INV_TRANSFER_ID,
               (
                  SELECT
                     CASE
                        WHEN
                           RT.TYPE_ID = 88
                        THEN
                         (
                           SELECT 
                              R.INV_TRANSFER_R_ID 
                           FROM
                              INV_TRANSFER_R R 
                           WHERE
                              R.WF_REQUEST_ID = RQ.REQUEST_ID ) 
                           ELSE
                              NULL 
                     END
                           FROM
                              dual
               )
               CUSTODY_INV_TRANSFER_R_ID,
                   (
                  SELECT
                     CASE
                        WHEN
                           RT.TYPE_ID = 89
                        THEN
                         (
                           SELECT 
                              R.DOCUMENT_ID 
                           FROM
                              REQ_DOCUMENT R 
                           WHERE
                              R.WF_REQUEST_ID = RQ.REQUEST_ID ) 
                           ELSE
                              NULL 
                     END
                           FROM
                              dual
               )
               ITEM_RETURN_REQUEST_ID,     
               (
                  SELECT
                     CASE
                        WHEN
                           RT.TYPE_ID = 90
                        THEN
                         (
                           SELECT 
                              R.DOCUMENT_ID 
                           FROM
                              REQ_DOCUMENT R 
                           WHERE
                              R.WF_REQUEST_ID = RQ.REQUEST_ID ) 
                           ELSE
                              NULL 
                     END
                           FROM
                              dual
               )
               EMPLOYEE_CUSTODY_REQUEST_ID,  
               (
                  SELECT
                     CASE
                        WHEN
                           RT.TYPE_ID = 92
                        THEN
                         (
                           SELECT 
                              R.DOCUMENT_ID 
                           FROM
                              REQ_DOCUMENT R 
                           WHERE
                              R.WF_REQUEST_ID = RQ.REQUEST_ID ) 
                           ELSE
                              NULL 
                     END
                           FROM
                              dual
               )
               REQUEST_ITEM_DOCUMENT_ID,  
               (
                  SELECT
                     CASE
                        WHEN
                           RT.TYPE_ID = 91
                        THEN
                         (
                           SELECT 
                              R.DOCUMENT_ID 
                           FROM
                              REQ_DOCUMENT R 
                           WHERE
                              R.WF_REQUEST_ID = RQ.REQUEST_ID ) 
                           ELSE
                              NULL 
                     END
                           FROM
                              dual
               )
               ITEM_LOST_REQUEST_ID
         FROM HR.REQUESTS RQ,
         HR.REQUEST_TYPES RT,
         HR.REQUEST_TYPE_STEPS ST,
         HR.WF_TRANSACTIONS WT,
              AOT_GEN.EMPLOYEES EM,
              HR.TRANSACTIONS_ACTIONS TA,
              HR.TRANSACTION_DESTINATIONS DFM,
              HR.TRANSACTION_DESTINATIONS DTO,
              HR.WORK_ORDERS wo,
              HR.PROJECTS PJ,
              AOT_GEN.APPLICATIONS AP,
              HR.CLIENTS CS
        WHERE     AP.APPLICATION_ID = RT.APPLICATION_ID
              AND EM.EMPLOYEE_ID = RQ.CREATED_BY
              AND TA.ACTION_ID = WT.INCOME_ACTION_ID
              and to_destination_id = :DESTINATION_ID
              AND WT.REQUEST_ID = RQ.REQUEST_ID
              AND RQ.REQUEST_TYPE = RT.TYPE_ID
              AND ST.STEP_ID(+) = WT.STEP_ID
              AND DFM.DESTINATION_ID = WT.FROM_DESTINATION_ID
              AND DTO.DESTINATION_ID = WT.TO_DESTINATION_ID
              AND WT.REQUEST_ID = WO.WORK_ORDER_ID(+)
              AND WO.PROJECT_ID = PJ.PROJECT_ID(+)
              AND PJ.CLIENT_ID = CS.CLIENT_ID(+)
              AND WT.STATUS IN (1, 3, 4)
              AND RQ.DELETED = 0
     ORDER BY WT.CREATED_DATE DESC`,
              returns: [],
              bindings: [],
              qstring: "",
              requireCommit: false
       },
       getApprovalsAgainstRequestType: {
              statement: `SELECT request_id, 
            application_id, 
            application_name, 
            req_type_id, 
            request_status, 
            req_type_name, 
            employee_id, 
            emp_name, 
            emp_name_ar, 
            income_action, 
            tranaction_id, 
            trans_classification, 
            tranaction_type, 
            comments, 
            answer_on_ques, 
            created_date, 
            outcome_action_date, 
            tranaction_status, 
            ask_reply_step, 
            parent_tranaction_id, 
            from_destination_id, 
            from_dest, 
            from_dest_ar, 
            to_destination_id, 
            to_dest, 
            to_dest_ar, 
            step_id, 
            opened, 
            client_id, 
            project_id, 
            project_manager_id, 
            priority, 
            work_order_code, 
            wo_status_id, 
            description, 
            client_name, 
            project_name, 
            employee_email, 
            step_description_en, 
            step_description_ar, 
            step_classification, 
            step_need_action_flag, 
     FROM   HR.INBOX_VIEW 
     WHERE  to_destination_id = (SELECT destination_id 
                                 FROM   HR.transaction_destinations 
                                 WHERE  employee_id = :EMPLOYEE_ID 
                                        AND Nvl(deleted, 0) = 0) 
            AND application_id = 1
     ORDER  BY request_id DESC  
     
 `,
              returns: [],
              bindings: [],
              qstring: "",
              requireCommit: false
       },
       getOneRequest: {
              statement: `SELECT REQUEST_ID
                            FROM
                            HR.REQUESTS
                            WHERE DELETED = 0 
                            and REQUEST_ID = :REQUEST_ID
               `,
              returns: [],
              bindings: [],
              qstring: "",
              requireCommit: false
       },
       getOneRequestType: {
              statement: `SELECT REQUEST_TYPE
                            FROM
                            HR.REQUESTS 
                            WHERE DELETED = 0 
                            and REQUEST_ID = :REQUEST_ID
               `,
              returns: [],
              bindings: [],
              qstring: "",
              requireCommit: false
       },
       getFinalStepForRequestType: {
              statement: `SELECT DESTINATION_ID
                            FROM
                            HR.REQUEST_TYPE_STEPS 
                            WHERE DELETED = 0 
                            and TYPE_ID = :REQUEST_TYPE
                            and STEP_ORDER = (SELECT MAX(STEP_ORDER) FROM HR.REQUEST_TYPE_STEPS WHERE 
                            TYPE_ID=:REQUEST_TYPE)
              `,
              returns: [],
              bindings: [],
              qstring: "",
              requireCommit: false
       },
       getStoreId: {
              statement: `SELECT STORES_ID
                            FROM
                            INV_OPEN_BALANCE 
                            WHERE DELETED = 0 
                            and INV_OPEN_BALANCE_ID = :INV_OPEN_BALANCE_ID
              `,
              returns: [],
              bindings: [],
              qstring: "",
              requireCommit: false
       },
       updateAllItemBalance: {
              statement: `
              BEGIN
                     COMMIT;
                     FOR ITEM IN (select  ITEMS_ID,
                                          UNIT_QUANTITY,
                                          UNIT_FACTOR,
                                          TOTAL_COST,
                                          ITEM_COST
                                   from INV_OPEN_BALANCE_ITEMS 
                                   where INV_OPEN_BALANCE_ID = :INV_OPEN_BALANCE_ID)
                     LOOP
                     update ITEMS_BALANCE IB
                                   set IB.OPEN_BALANCE = ITEM.ITEM_COST
                                   where IB.ITEMS_ID=ITEM.ITEMS_ID AND IB.STORES_ID = :STORES_ID;
                     END LOOP;
                            
                     update INV_OPEN_BALANCE SET DOCUMENT_STATUS=11244 WHERE INV_OPEN_BALANCE_ID = :INV_OPEN_BALANCE_ID;
                     
                     COMMIT;  
              END;`,
              returns: [],
              bindings: [],
              qstring: "",
              requireCommit: true
       },
       getOpenBalanceId: {
              statement: `SELECT INV_OPEN_BALANCE_ID
                            FROM
                            INV_OPEN_BALANCE 
                            WHERE DELETED = 0 
                            and WF_REQUEST_ID = :REQUEST_ID
              `,
              returns: [],
              bindings: [],
              qstring: "",
              requireCommit: false
       },
       getOneDestination: {
              statement: `SELECT DESTINATION_ID
                            FROM
                            AOT_GEN.ADDRESS_BOXS 
                            WHERE DELETED = 0 
                            and DESTINATION_ID = :DESTINATION_ID
              `,
              returns: [],
              bindings: [],
              qstring: "",
              requireCommit: false
       },
}
module.exports = statements;
