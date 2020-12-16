import app from "./app";
import "dotenv/config";

app.listen(process.env.PORT, () =>
  console.warn(`SERVER LISTEN AT ${process.env.HOST}:${process.env.PORT}`)
);
