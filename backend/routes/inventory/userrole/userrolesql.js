let statements = {

  getAllUserRolesByUserId: {
    statement: `
  SELECT
  a.USER_ROLE_ID,
  a.ROLE_ID,
  a.USER_ID,
  b.ROLE_NAME_AR,
  b.ROLE_NAME_EN
  FROM
  aot_security.USER_ROLES a,
  aot_security.ROLES b
  WHERE
  a.USER_ID = :USER_ID
  AND
  a.ROLE_ID = b.ROLE_ID
  AND
  a.DELETED = 0
  AND b.ROLE_STATUS = 1

  `,

    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getallScreensUserId: {
    statement: `
  SELECT
  a.USER_ROLE_ID,
  a.ROLE_ID,
  a.USER_ID,
  c.APPLICATION_ID ,
  c.SCREEN_DESCRIPTION_EN ,
  c.SCREEN_DESCRIPTION_AR,
  c.SCREEN_TYPE,
  c.SCREEN_ID
  FROM
  aot_security.USER_ROLES a,
  aot_security.ROLES b,
  aot_security.APPLICATION_SCREENS c
  WHERE
  c.APPLICATION_ID = b.APPLICATION_ID
  AND
  a.USER_ID = :USER_ID
  AND
  a.ROLE_ID = b.ROLE_ID
  AND
  a.DELETED = 0
  AND b.ROLE_STATUS = 1
  `,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getUserRoleByUserRoleId: {
    statement: `
        SELECT

        a.USER_ROLE_ID,
        a.ROLE_ID,
        a.USER_ID,
        b.ROLE_NAME_AR,
        b.ROLE_NAME_EN
        FROM
        aot_security.USER_ROLES a,
        aot_security.ROLES b
        WHERE
        a.USER_ROLE_ID = :USER_ROLE_ID
        AND
        a.ROLE_ID = b.ROLE_ID
        AND
        a.DELETED = 0
        AND b.ROLE_STATUS = 1

        `,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: false
  },
  getAllScreensByUserName: {
    statement: `
        SELECT
        b.USER_ID,
        b.EMPLOYEE_ID,
        a.APPLICATION_ID ,
        a.PARENT_MENU_ID ,
        a.SCREEN_DESCRIPTION_EN ,
        a.SCREEN_ID,
        a.SCREEN_ORDER,
        a.SCREEN_DESCRIPTION_AR ,
        a.TASKFLOW_ID
        FROM
        aot_security.APPLICATION_SCREENS a,
        aot_security.USERS_ACCOUNTS b
        WHERE
        b.USER_NAME = :USER_NAME
        AND
        a.APPLICATION_ID = b.APPLICATION_ID
        AND
        b.DELETED = 0

        `,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: false
  },

  getUserProfile: {
    statement: ` select c.user_code,
    c.employee_id,
    c.department_id,
    (select cc.name_en from AOT_GEN.Departments cc where cc.department_id = c.department_id) department_en_name,
    (select cc.name_ar from AOT_GEN.Departments cc where cc.department_id = c.department_id) department_ar_name,
    c.position_id,
    (select nvl(xx.primary_name, xx.secondary_name) from hr.positions xx where xx.position_id = c.position_id) position_name,
    decode(c.sex_detail,'M', 'Male', 'Female') gender,
    c.religion_l_detail_id,
    (select nvl(primary_name, secondary_name) from lookup_details where lookup_detail_id = religion_l_detail_id) religion_name, 
    c.marital_l_detail_id,
    (select nvl(primary_name, secondary_name) from lookup_details where lookup_detail_id = marital_l_detail_id) material_name, 
    c.nationality_l_detail_id,
    (select nvl(primary_name, secondary_name) from lookup_details where lookup_detail_id = nationality_l_detail_id) nationality_name,
    c.manager_id,
    (select first_name || ' ' || last_name from AOT_GEN.Employees where employee_id = c.manager_id) manager_ar_name,
    (select first_name2 || ' ' || s_last_name from AOT_GEN.Employees where employee_id = c.manager_id) manager_en_name,
    (c.first_name ||' '|| c.last_name) arabic_name ,
    (c.first_name2 ||' '|| c.s_last_name) en_name,
    c.date_of_birth,
    c.date_of_birth_h,
    c.hire_date,
    c.termenation_date,
    c.employee_email, 
    c.mobile,
    c.work_hours
 from  AOT_GEN.employees c, AOT_SECURITY.USERS_ACCOUNTS t
 where c.employee_id = t.employee_id
 and c.deleted = 0 
 and t.USER_ID = :USER_ID`,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },

  getUserPic: {
    statement: ` select c.image
 from  AOT_GEN.employees c, AOT_SECURITY.USERS_ACCOUNTS t
 where c.employee_id = t.employee_id
 and c.deleted = 0 
 and t.USER_ID = :USER_ID`,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },  

};

module.exports = statements;
