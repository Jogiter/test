function removeTransition(e) {
	if (e.propertyName !== 'transform') return;
	e.target.classList.remove('playing');
}

function playSound(e) {
	const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
	const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
	if (!audio) return;

	key.classList.add('playing');
	audio.currentTime = 0;
	audio.play();

	rythm.setMusic('http://m10.music.126.net/20180122184736/8daf965222132307f3d744ec782feef8/ymusic/ef7a/b4ba/8d00/8561593800d5958a54746dce9e04a252.mp3');
  rythm.addRythm('rythm-bass', 'jump', 0, 10)
  rythm.start();
}

let rythm = new Rythm();
let source;
const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);
