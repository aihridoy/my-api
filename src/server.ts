import { app } from "./app.js";
import { initDB } from "./db/index.js";

const port = process.env.PORT;

const main = async () => {
    await initDB();
    app.listen(() => {
        console.log(`Example app listening on port ${port}`)
    })
};

main();