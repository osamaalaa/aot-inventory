let statements = {
    getAllRequests: {
        statement: ` SELECT
            REQUEST_ID,
             REQUEST_STATUS,
              REQUEST_TYPE,
               CREATED_BY,
                CREATION_DATE,
                 MODIFIED_BY,
               MODIFICATION_DATE,
                DESCRIPTION,
                 SUBSIDIARY_ID,
               CLASSIFICATION_ID
            FROM HR.REQUESTS
              WHERE DELETED = 0   `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },
    deleteOneRequest: {
        statement: `UPDATE HR.REQUESTS
                     SET DELETED = 1 , DELETED_BY = :DELETED_BY , DELETED_DATE = sysdate
                     WHERE
                         REQUEST_ID = :REQUEST_ID`,

        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: true
    },
    getOneRequestByType: {
        statement: ` SELECT
            REQUEST_ID,
             REQUEST_STATUS,
              REQUEST_TYPE,
               CREATED_BY,
                CREATION_DATE,
                 MODIFIED_BY,
               MODIFICATION_DATE,
                DESCRIPTION,
                 SUBSIDIARY_ID,
               CLASSIFICATION_ID
            FROM HR.REQUESTS
              WHERE DELETED = 0
              AND REQUEST_TYPE = :REQUEST_TYPE   `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },
    insertnewRequest: {
      statement: `INSERT INTO HR.REQUESTS (
                                         REQUEST_ID,
                                          REQUEST_STATUS,
                                          REQUEST_TYPE,
                                         CREATED_BY,
                                          CREATION_DATE,
                                          DESCRIPTION,
                                           DELETED,
                                           SUBSIDIARY_ID,
                                         CLASSIFICATION_ID)
                                      VALUES (
                                               REQUEST_ID_SEQ.NEXTVAL,
                                               :REQUEST_STATUS,
                                               :REQUEST_TYPE,
                                                NULL,
                                               sysdate,
                                               :DESCRIPTION,
                                                0,
                                               :SUBSIDIARY_ID,
                                               :CLASSIFICATION_ID
                                           )
              RETURN  REQUEST_ID, REQUEST_TYPE INTO :R_REQUEST_ID , :R_REQUEST_TYPE`,
      returns: ["R_REQUEST_ID", "R_REQUEST_TYPE"],
      bindings: [],
      qstring: "",
      requireCommit: true
    },
    getRequest: {
            statement: ` SELECT
            request_id,
            application_id,
            application_name,
            req_type_id,
            request_status,
            req_type_name,
            req_type_definition_type,
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
            req_classification,
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
           
            (
               SELECT
                  Count(*) 
               FROM
                  hr.daily_working_hours DW 
               WHERE
                  DW.work_order_id = request_id 
                  AND Nvl(DW.deleted, 0) = 0
            )
            DAILY_WORKING_COUNT,
            (
               SELECT
                  CASE
                     WHEN
                        req_type_id = 71 
                     THEN
         (
                        SELECT
                           WO.work_order_code 
                        FROM
                           hr.projects p, hr.work_orders wo, hr.objection_requests ob 
                        WHERE
                           OB.work_order_id = WO.work_order_id 
                           AND P.project_id = WO.project_id 
                           AND OB.objection_request_id = request_id) 
                        ELSE
                           NULL 
                  END
                        FROM
                           dual
            )
            work_order_code_obj,
            (
               SELECT
                  CASE
                     WHEN
                        req_type_id = 71 
                     THEN
         (
                        SELECT
                           WO.description 
                        FROM
                           hr.projects p, hr.work_orders wo, hr.objection_requests ob 
                        WHERE
                           OB.work_order_id = WO.work_order_id 
                           AND P.project_id = WO.project_id 
                           AND OB.objection_request_id = request_id) 
                        ELSE
                           NULL 
                  END
                        FROM
                           dual
            )
            work_order_desc_obj,
            (
               SELECT
                  CASE
                     WHEN
                        req_type_id = 71 
                     THEN
         (
                        SELECT
                           P.primary_name 
                        FROM
                           hr.projects p, hr.work_orders wo, hr.objection_requests ob 
                        WHERE
                           OB.work_order_id = WO.work_order_id 
                           AND P.project_id = WO.project_id 
                           AND OB.objection_request_id = request_id) 
                        ELSE
                           NULL 
                  END
                        FROM
                           dual
            )
            project_name_obj_ar,
            (
               SELECT
                  CASE
                     WHEN
                        req_type_id = 71 
                     THEN
         (
                        SELECT
                           P.secondary_name 
                        FROM
                           hr.projects p, hr.work_orders wo, hr.objection_requests ob 
                        WHERE
                           OB.work_order_id = WO.work_order_id 
                           AND P.project_id = WO.project_id 
                           AND OB.objection_request_id = request_id) 
                        ELSE
                           NULL 
                  END
                        FROM
                           dual
            )
            project_name_obj_en,
            (
               SELECT
                  CASE
                     WHEN
                        req_type_id = 71 
                     THEN
         (
                        SELECT
                           C.en_name 
                        FROM
                           hr.projects p, hr.clients c, hr.work_orders wo, hr.objection_requests ob 
                        WHERE
                           OB.work_order_id = WO.work_order_id 
                           AND P.project_id = WO.project_id 
                           AND OB.objection_request_id = request_id 
                           AND C.client_id = P.client_id) 
                        ELSE
                           NULL 
                  END
                        FROM
                           dual
            )
            client_name_en_obj,
            (
               SELECT
                  CASE
                     WHEN
                        req_type_id = 71 
                     THEN
         (
                        SELECT
                           C.ar_name 
                        FROM
                           hr.projects p, hr.clients c, hr.work_orders wo, hr.objection_requests ob 
                        WHERE
                           OB.work_order_id = WO.work_order_id 
                           AND P.project_id = WO.project_id 
                           AND OB.objection_request_id = request_id 
                           AND C.client_id = P.client_id) 
                        ELSE
                           NULL 
                  END
                        FROM
                           dual
            )
            client_name_ar_obj,
            (
               select
                  inv_open_balance_id 
               from
                  inv_open_balance i 
               where
                  i.wf_request_id = request_id
            )
            INV_OPEN_BALANCE_ID 
         FROM
            hr.inbox_view 
         WHERE
            to_destination_id = 
            (
               SELECT
                  destination_id 
               FROM
                  hr.transaction_destinations 
               WHERE
                  employee_id = :spEmployeeId 
                  AND Nvl(deleted, 0) = 0
            )
            AND request_id IS NOT NULL 
            AND application_id = 1 
            AND 
            (
               req_classification = :p_reqClassification 
               OR :p_reqClassification = 0 
            )
         ORDER BY
            request_id DESC`,
        bindings: [],
        qstring: "",
        requireCommit: false
    }


};


module.exports = statements;
