import serverlessMysql from "serverless-mysql";

const dbConn = serverlessMysql({
  config: {
    host: "localhost",
    database: "im2",
    user: "root",
    password: "123456",
    port: 3306,
  },
});

export default dbConn;
