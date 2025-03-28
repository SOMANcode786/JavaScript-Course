const video = document.getElementById("video");
const playPauseBtn = document.getElementById("playPause");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

playPauseBtn.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playPauseBtn.textContent = "⏸️";
  } else {
    video.pause();
    playPauseBtn.textContent = "▶️";
  }
});

video.addEventListener("timeupdate", () => {
  progress.value = (video.currentTime / video.duration) * 100;
});

progress.addEventListener("input", () => {
  video.currentTime = (progress.value / 100) * video.duration;
});

volume.addEventListener("input", () => {
  video.volume = volume.value;
});
