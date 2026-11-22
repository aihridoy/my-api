import { app } from "./app.js";
import { initDB } from "./db/index.js";

const port = Number(process.env.PORT || 8080);

const main = async () => {
    await initDB();
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
};

main();