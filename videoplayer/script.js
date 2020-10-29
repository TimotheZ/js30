/* Récupérer nos élements */
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progess_bar = document.querySelector('.progress_filled');
const player_button = document.querySelector('.player_button');
const ranges = document.querySelectorAll('.range');
const skipButtons = document.querySelectorAll('[data-skip]');

/* Construire nos fonctions */
function togglePlay() {
  if(video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButon() {
  const icon = this.paused ? '►' : '||';
  player_button.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progess_bar.style.width = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration; // permet de cliquer sur la barre de progression pour avancer la vidéo ou revenir en arriere 
  video.currentTime = scrubTime;
}

/* Connecter nos event listeners*/
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButon);
video.addEventListener('pause', updateButon);
video.addEventListener('timeupdate', handleProgress);

player_button.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
progress.addEventListener('click', scrub);



