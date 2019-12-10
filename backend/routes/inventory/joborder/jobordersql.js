
let statements = {
    getAllJobOrders: {
            statement :`
            SELECt  JOB_ORDER_ID,
                   CODE,
                   JOB_ORDER_DESC,
                   ASSET_ACTION_ID,
                   EMPLOYEE_ID,
                   STATUS,
                   CREATED_BY,
                   CREATION_DATE,
                   DELETED,
                   DELETED_BY,
                   DELETED_DATE,
                   REQUEST_ID,
                   DETAIL_PLAN_ID,
                  (select primary_name from hr.projects P where JO.PROJECT_ID = P.PROJECT_ID) primary_name,
                  (select secondary_name from hr.projects P where JO.PROJECT_ID = P.PROJECT_ID) secondary_name,
                  (select ASSET_NAME from hr.assets_definition AST where AST.ASSET_ID = JO.ASSET_ID) ASSET_NAME,
                   PROJECT_ID,
                   BOQ_ID,
                   MILESTONE_ID,
                   ASSET_ID,
                   OPERATION_TYPE,
                   JOB_ORDER_DATE
              FROM HR.JOB_ORDERS  JO `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },
  
    getOneJobOrdersByID:{
        statement:`SELECT 
                    JOB_ORDER_ID,
                    CODE, 
                    JOB_ORDER_DESC, 
                    ASSET_ACTION_ID,
                    EMPLOYEE_ID,
                    STATUS, 
                    CREATED_BY,
                    CREATION_DATE,
                    REQUEST_ID, 
                    DETAIL_PLAN_ID,
                    (select primary_name from hr.projects P where JO.PROJECT_ID = P.PROJECT_ID) primary_name,
                    (select secondary_name from hr.projects P where JO.PROJECT_ID = P.PROJECT_ID) secondary_name,
                    (select ASSET_NAME from hr.assets_definition AST where AST.ASSET_ID = JO.ASSET_ID) ASSET_NAME,
                    PROJECT_ID,
                    BOQ_ID, 
                    MILESTONE_ID,
                    ASSET_ID,
                    OPERATION_TYPE, 
                    JOB_ORDER_DATE,
                    JOB_ORDER_TYPE,
                    JOB_ORDER_SOURCE, 
                    ACTION_DEF_ID,
                    SERVICE_TARGET_VALUE
                            FROM HR.JOB_ORDERS JO WHERE JOB_ORDER_ID = :JOB_ORDER_ID AND DELETED = 0`,
        returns: [],
        bindings: [],
        qstring: "",
        requireCommit: false
    },

    getJobOrderByReqID: {
      statement :`SELECT 
                        JOB_ORDER_ID,
                        CODE, 
                        JOB_ORDER_DESC, 
                            ASSET_ACTION_ID,
                            EMPLOYEE_ID,
                            STATUS, 
                            CREATED_BY,
                            CREATION_DATE,
                            REQUEST_ID, 
                            DETAIL_PLAN_ID,
                            PROJECT_ID,
                            BOQ_ID, 
                            MILESTONE_ID,
                            ASSET_ID,
                            OPERATION_TYPE, 
                            JOB_ORDER_DATE,
                            JOB_ORDER_TYPE,
                            JOB_ORDER_SOURCE, 
                            ACTION_DEF_ID,
                            SERVICE_TARGET_VALUE
                        FROM HR.JOB_ORDERS WHERE REQUEST_ID = :REQUEST_ID AND DELETED = 0
                    `,
      returns: [],
      bindings: [],
      qstring: "",
      requireCommit: false
},

updateJobOrder: {
   statement: `
   UPDATE HR.JOB_ORDERS
   SET STATUS = :STATUS
   WHERE JOB_ORDER_ID = :JOB_ORDER_ID
   `,
   returns: [],
   bindings: [],
   qstring: "",
   requireCommit: true
},


createJobOrder: {
   statement: `
   INSERT INTO  HR.JOB_ORDERS (JOB_ORDER_ID,
      CODE,
      JOB_ORDER_DESC,
      ASSET_ACTION_ID,
      EMPLOYEE_ID,
      STATUS,
      CREATED_BY,
      CREATION_DATE,
      DELETED_DATE,
      REQUEST_ID,
      DETAIL_PLAN_ID,
      PROJECT_ID,
      BOQ_ID,
      MILESTONE_ID,
      ASSET_ID,
      OPERATION_TYPE,
      JOB_ORDER_DATE,
      JOB_ORDER_TYPE)
  VALUES (
    HR.JOB_ORDERS_SEQ.NEXTVAL,
   :CODE,
   :JOB_ORDER_DESC,
   :ASSET_ACTION_ID,
   :EMPLOYEE_ID,
   :STATUS,
   :CREATED_BY,
   sysdate,
   sysdate,
   :REQUEST_ID,
   :DETAIL_PLAN_ID,
   :PROJECT_ID,
   :BOQ_ID,
   :MILESTONE_ID,
   :ASSET_ID,
   :OPERATION_TYPE,
   sysdate,
      :JOB_ORDER_TYPE
  )
  RETURN   CODE, JOB_ORDER_DESC, ASSET_ACTION_ID, EMPLOYEE_ID , REQUEST_ID, PROJECT_ID
  INTO  :R_CODE, :R_JOB_ORDER_DESC, :R_ASSET_ACTION_ID , :R_EMPLOYEE_ID , :R_REQUEST_ID , :R_PROJECT_ID
  `,
  returns: ["R_CODE", "R_JOB_ORDER_DESC", "R_ASSET_ACTION_ID", "R_EMPLOYEE_ID", "R_REQUEST_ID", "R_PROJECT_ID"],
   bindings: [],
   qstring: "",
   requireCommit: true
}

}
  module.exports = statements ;
  