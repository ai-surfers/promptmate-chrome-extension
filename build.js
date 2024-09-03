const fs = require("fs");
const path = require("path");
require("dotenv").config();

console.log("ENV >>> ", process.env.REACT_APP_MODE);
console.log("BASE_URL", process.env.REACT_APP_BASE_URL);

// manifest.json 파일 읽어오기
const manifestPath = path.join(__dirname, "public", "manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

// GitHub Actions에서 설정한 버전 추가
const version = process.env.VERSION;
if (version) {
    manifest.version = version;
}

// 변경된 manifest.json 쓰기
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
