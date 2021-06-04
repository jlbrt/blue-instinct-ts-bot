import knex from 'knex';

export const tsDBConnection = knex({
  client: 'mysql2',
  connection: {
    host: process.env.TEAMSPEAK_DB_HOST as string,
    port: parseInt(process.env.TEAMSPEAK_DB_PORT as string, 10),
    user: process.env.TEAMSPEAK_DB_USER as string,
    password: process.env.TEAMSPEAK_DB_PASSWORD as string,
    database: process.env.TEAMSPEAK_DB_DATABASE as string,
  },
});
