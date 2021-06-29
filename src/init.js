import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

const PORT = process.env.PORT || 4000;

const handleListening = () => console.log(`✅ 서버가 localhost:${PORT}에서 실행중입니다 👌`);

app.listen(PORT, handleListening);
