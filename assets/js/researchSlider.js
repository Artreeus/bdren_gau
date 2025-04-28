document.addEventListener('DOMContentLoaded', function() {
  // Get slider elements
  const sliderContainer = document.getElementById('sliderContainer');
  const slides = document.querySelectorAll('.slide-item');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dots = document.querySelectorAll('.dot');
  
  // Set initial state
  let currentSlide = 0;
  let slideWidth = 0;
  let slidesToShow = 4; // Default to show 4 slides
  let totalSlides = slides.length;
  let touchStartX = 0;
  let touchEndX = 0;
  
  // Function to update slidesToShow based on window width
  function updateSlidesToShow() {
      if (window.innerWidth >= 1200) {
          slidesToShow = 4; // Show 4 cards on large screens
      } else if (window.innerWidth >= 992) {
          slidesToShow = 3; // Show 3 cards on medium screens
      } else if (window.innerWidth >= 768) {
          slidesToShow = 2; // Show 2 cards on small screens
      } else {
          slidesToShow = 1; // Show 1 card on extra small screens
      }
      
      // Update slide width based on new slidesToShow value
      updateSlideWidth();
  }
  
  // Calculate slide width and update slide styles
  function updateSlideWidth() {
      // Get width of slider container
      const sliderWidth = document.querySelector('.research-slider').offsetWidth;
      
      // Calculate individual slide width (accounting for padding)
      slideWidth = sliderWidth / slidesToShow;
      
      // Update slide widths
      slides.forEach(slide => {
          slide.style.minWidth = `${slideWidth}px`;
      });
      
      // Reset position to keep current slide in view
      moveToSlide(Math.min(currentSlide, totalSlides - slidesToShow));
  }
  
  // Function to move to a specific slide
  function moveToSlide(index) {
      // Calculate maximum index (total slides minus slides to show)
      const maxIndex = Math.max(0, totalSlides - slidesToShow);
      
      // Ensure index is within bounds
      if (index < 0) {
          index = 0;
      } else if (index > maxIndex) {
          index = maxIndex;
      }
      
      // Update current slide index
      currentSlide = index;
      
      // Calculate offset for sliding
      const offset = -currentSlide * slideWidth;
      
      // Apply transformation
      sliderContainer.style.transform = `translateX(${offset}px)`;
      
      // Update active dot
      updateActiveDot();
      
      // Show/hide navigation buttons based on position
      updateNavigationButtons();
  }
  
  // Update active pagination dot
  function updateActiveDot() {
      // Calculate which dot should be active (based on current view)
      const activeDotIndex = Math.min(
          Math.floor(currentSlide / (totalSlides / dots.length)),
          dots.length - 1
      );
      
      // Remove active class from all dots
      dots.forEach(dot => {
          dot.classList.remove('active');
      });
      
      // Add active class to current dot
      dots[activeDotIndex].classList.add('active');
  }
  
  // Update visibility of navigation buttons
  function updateNavigationButtons() {
      // Always show both buttons since we have 6 cards and show 4 at most
      prevBtn.style.opacity = currentSlide === 0 ? "0.5" : "1";
      nextBtn.style.opacity = currentSlide >= totalSlides - slidesToShow ? "0.5" : "1";
  }
  
  // Event handler for previous button
  prevBtn.addEventListener('click', function() {
      moveToSlide(currentSlide - 1);
      stopAutoPlay();
      startAutoPlay();
  });
  
  // Event handler for next button
  nextBtn.addEventListener('click', function() {
      moveToSlide(currentSlide + 1);
      stopAutoPlay();
      startAutoPlay();
  });
  
  // Event handlers for pagination dots
  dots.forEach(dot => {
      dot.addEventListener('click', function() {
          const index = parseInt(this.getAttribute('data-index'));
          // Calculate position based on dot index
          const slidePosition = Math.floor(index * (totalSlides / dots.length));
          moveToSlide(slidePosition);
          stopAutoPlay();
          startAutoPlay();
      });
  });
  
  // Touch event handlers for mobile swipe functionality
  sliderContainer.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
  }, false);
  
  sliderContainer.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
  }, false);
  
  // Handle swipe direction
  function handleSwipe() {
      const swipeThreshold = 50;
      
      if (touchEndX < touchStartX - swipeThreshold) {
          // Swipe left - go to next slide
          moveToSlide(currentSlide + 1);
          stopAutoPlay();
          startAutoPlay();
      }
      
      if (touchEndX > touchStartX + swipeThreshold) {
          // Swipe right - go to previous slide
          moveToSlide(currentSlide - 1);
          stopAutoPlay();
          startAutoPlay();
      }
  }
  
  // Auto play functionality
  let autoPlayInterval;
  const autoPlayDelay = 5000; // 5 seconds between slides
  
  function startAutoPlay() {
      clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(function() {
          // Auto advance to next slide, loop to beginning if at end
          if (currentSlide >= totalSlides - slidesToShow) {
              moveToSlide(0);
          } else {
              moveToSlide(currentSlide + 1);
          }
      }, autoPlayDelay);
  }
  
  function stopAutoPlay() {
      clearInterval(autoPlayInterval);
  }
  
  // Pause auto play on hover
  const researchSlider = document.querySelector('.research-slider');
  researchSlider.addEventListener('mouseenter', stopAutoPlay);
  researchSlider.addEventListener('mouseleave', startAutoPlay);
  
  // Handle window resize
  window.addEventListener('resize', function() {
      // Use debounce technique to prevent excessive function calls
      clearTimeout(window.resizeTimer);
      window.resizeTimer = setTimeout(function() {
          updateSlidesToShow();
      }, 250);
  });
  
  // Initialize slider
  console.log("Initializing slider with " + totalSlides + " slides");
  updateSlidesToShow();
  startAutoPlay();
});