const fs = require("fs");
const path = require("path");
require("dotenv").config();

// manifest.json 파일 읽어오기
const manifestPath = path.join(__dirname, "public", "manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

// 환경변수 manifest.json 추가  (후에 추가 시 여기에)
const clientId = process.env.REACT_APP_OAUTH_CLIENT_ID;
manifest.oauth2.client_id = clientId;

// 변경된 manifest.json 쓰기
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
