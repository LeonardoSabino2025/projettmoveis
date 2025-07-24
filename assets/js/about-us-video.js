document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('.about-us-video-section .about-video');
    let currentVideoIndex = 0;

    function playNextVideo() {
        // Remove 'active' class from current video
        videos[currentVideoIndex].classList.remove('active');

        // Increment index, loop back to 0 if at the end
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;

        // Add 'active' class to the next video
        videos[currentVideoIndex].classList.add('active');
        videos[currentVideoIndex].play();
    }

    // Set up event listener for when a video ends
    videos.forEach(video => {
        video.addEventListener('ended', playNextVideo);
    });

    // Ensure the first video plays on load and has the 'active' class
    if (videos.length > 0) {
        videos[currentVideoIndex].classList.add('active');
        videos[currentVideoIndex].play();
    }
});