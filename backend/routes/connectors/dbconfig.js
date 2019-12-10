module.exports = {
    user          : process.env.NODE_ORACLEDB_USER || "inventory",
    password      : process.env.NODE_ORACLEDB_PASSWORD || "inv",
    connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "Dev",
    externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
  };