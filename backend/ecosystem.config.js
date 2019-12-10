module.exports = {
  apps: [{
    name: 'INV-TEST',
    script: 'inventory.js',
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      ORACLE_HOME: '/instantclient_12_2',
      LD_LIBRARY_PATH: '/instantclient_12_2',
      TNS_ADMIN: '/instantclient_12_2/network/admin',
      INVPORT: 9004
    }
  },
  {
    name: 'INV-PROD',
    script: 'inventory.js',
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      ORACLE_HOME: '/instantclient_12_2',
      LD_LIBRARY_PATH: '/instantclient_12_2',
      TNS_ADMIN: '/instantclient_12_2/network/admin',
      INVPORT: 9005
    }
  }]
};
