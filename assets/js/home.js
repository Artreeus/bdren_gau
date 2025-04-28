document.addEventListener("DOMContentLoaded", function () {
  // Get all carousel items
  const items = document.querySelectorAll(".carousel-item");
  const prevBtn = document.querySelector(".custom-prev");
  const nextBtn = document.querySelector(".custom-next");
  let current = 0;
  let timer = null;

  // Initial setup - hide all slides except the first one
  items.forEach((item, index) => {
    if (index === 0) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Function to change slide
  function changeSlide(index) {
    // Remove active class from all slides
    items.forEach((item) => item.classList.remove("active"));

    // Add active class to the new slide
    items[index].classList.add("active");

    // Update current index
    current = index;
  }

  // Function to move to next slide
  function nextSlide() {
    const next = (current + 1) % items.length;
    changeSlide(next);
  }

  // Function to move to previous slide
  function prevSlide() {
    const prev = (current - 1 + items.length) % items.length;
    changeSlide(prev);
  }

  // Auto-play function
  function startAutoPlay() {
    // Clear any existing timer
    if (timer) clearInterval(timer);

    // Set new timer
    timer = setInterval(nextSlide, 5000);
  }

  // Stop auto-play
  function stopAutoPlay() {
    if (timer) clearInterval(timer);
  }

  // Add event listeners to buttons
  if (prevBtn) {
    prevBtn.addEventListener("click", function (e) {
      e.preventDefault();
      prevSlide();
      stopAutoPlay();
      startAutoPlay(); // Restart timer
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function (e) {
      e.preventDefault();
      nextSlide();
      stopAutoPlay();
      startAutoPlay(); // Restart timer
    });
  }

  // Add touch swipe functionality
  let touchStartX = 0;
  let touchEndX = 0;

  const carousel = document.querySelector(".custom-carousel");

  if (carousel) {
    carousel.addEventListener(
      "touchstart",
      function (e) {
        touchStartX = e.changedTouches[0].screenX;
      },
      false
    );

    carousel.addEventListener(
      "touchend",
      function (e) {
        touchEndX = e.changedTouches[0].screenX;

        // Detect swipe direction
        if (touchEndX < touchStartX - 50) {
          // Swipe left - next slide
          nextSlide();
          stopAutoPlay();
          startAutoPlay();
        }

        if (touchEndX > touchStartX + 50) {
          // Swipe right - previous slide
          prevSlide();
          stopAutoPlay();
          startAutoPlay();
        }
      },
      false
    );

    // Pause on hover
    carousel.addEventListener("mouseenter", stopAutoPlay);
    carousel.addEventListener("mouseleave", startAutoPlay);
  }

  // Start the slideshow
  startAutoPlay();

  // Make sure the first slide is visible
  changeSlide(0);
});

//   research js

document.addEventListener('DOMContentLoaded', function() {
  const playButton = document.getElementById('gauPlayButton');
  const videoModal = document.getElementById('gauVideoModal');
  const closeModal = document.getElementById('gauCloseModal');
  const videoIframe = document.querySelector('#gauVideoModal iframe');
  
  // Video URL - replace with your actual video URL
  const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
  
  // Open the modal when play button is clicked
  playButton.addEventListener('click', function() {
      videoModal.style.display = 'flex';
      videoIframe.src = videoUrl;
  });
  
  // Close the modal when close button is clicked
  closeModal.addEventListener('click', function() {
      videoModal.style.display = 'none';
      videoIframe.src = 'about:blank'; // Reset iframe to stop video
  });
  
  // Close the modal when clicking outside of the content
  window.addEventListener('click', function(event) {
      if (event.target === videoModal) {
          videoModal.style.display = 'none';
          videoIframe.src = 'about:blank';
      }
  });
  
  // Close the modal when pressing ESC key
  document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && videoModal.style.display === 'flex') {
          videoModal.style.display = 'none';
          videoIframe.src = 'about:blank';
      }
  });
});