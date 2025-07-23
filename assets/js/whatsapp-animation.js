import lottie from 'lottie-web';

document.addEventListener('DOMContentLoaded', () => {
const animationContainer = document.getElementById('whatsapp-animation-container');

if (animationContainer) {
lottie.loadAnimation({
container: animationContainer, // the dom element that will contain the animation
renderer: 'svg', // 'svg', 'canvas', 'html' - animation render type
loop: true, // boolean
autoplay: true, // boolean
path: 'assets/imgs/whatsapp-animation.json', // path to the JSON animation file
});
}
});