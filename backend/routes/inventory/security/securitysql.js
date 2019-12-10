let statements = {
  getUserPass: {
    statement: `select t.user_name, t.user_password from AOT_SECURITY.USERS_ACCOUNTS t where t.deleted = 0 and t.user_name = :USER_NAME`,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getUserData: {
    statement: ` select t.USER_NAME, t.USER_ID, c.position_id, (select nvl(xx.primary_name, xx.secondary_name) from hr.positions xx where xx.position_id = c.position_id) position_name, t.EMPLOYEE_ID , t.LAST_LOGIN_DATE , t.SUBSIDIARY_ID , t.POSITION ,t.USER_EMAIL ,t.USER_MOBILE ,t.APP_EMAIL, t.ADDRESS_BOX_ID 
    from AOT_SECURITY.USERS_ACCOUNTS t, hr.employees c
    where t.employee_id = c.employee_id (+)
    and t.deleted = 0 
    and t.user_name = :USER_NAME`,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },

  updateUserPass: {
    statement: `update AOT_SECURITY.USERS_ACCOUNTS t set user_password = :USER_PASSWORD where user_name = :USER_NAME `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: true
  },
  getPriv: {
    statement: `
  SELECT
  
  a.employee_id,
  a.user_name,
  a.login_ip,
  a.user_email,
  a.user_mobile,
  a.app_email
  FROM
  aot_security.users_accounts a
  WHERE
  a.user_name = :USER_NAME
  `,

    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  }


};

module.exports = statements;