const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let strem;
let recorder;
let videoFile;

const handleDownLoad = () => {
  const a = document.createElement("a");
  a.href = videoFile;
  a.download = "MyRecrding.webm";
  document.body.appendChild(a);
  a.click();
};

const handleStop = () => {
  startBtn.innerText = "Download Recoding";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownLoad);
  recorder.stop();
};

const handleStart = () => {
  startBtn.innerText = "Stop Recoding";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);

  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (e) => {
    videoFile = URL.createObjectURL(e.data);
    video.srcObject = null;
    video.loop = true;
    video.src = videoFile;
    video.play();
  };
  recorder.start();
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { width: 200, height: 200 },
  });
  video.srcObject = stream;
  video.play();
};

init();

startBtn.addEventListener("click", handleStart);
