import fs from "fs";
const config = JSON.parse(fs.readFileSync("./src/config/allowEmailDomain.json", "utf8"));
const allowedDomain = config.allowedDomain;
export { allowedDomain };
