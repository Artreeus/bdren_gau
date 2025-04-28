document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('sliderContainer');
    const slides = document.querySelectorAll('.slide-item');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    const slidesPerView = window.innerWidth < 768 ? 1 : 3; // Show 3 slides on desktop, 1 on mobile
    let currentIndex = 0;
    let autoScrollInterval; // Variable to store the interval ID
    const scrollInterval = 3000; // Time in milliseconds between auto-scrolls (3 seconds)
    
    // Calculate total pages needed (with 6 cards and 3 per view, we need 2 pages)
    const totalPages = Math.ceil(slides.length / slidesPerView);
    
    // Function to update the slider position
    function updateSlider() {
      const slideWidth = slides[0].offsetWidth;
      container.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
      
      // Update active dot
      const activeDotIndex = Math.floor(currentIndex / slidesPerView);
      document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === activeDotIndex);
      });
    }
    
    // Function to move to the next slide
    function nextSlide() {
      if (currentIndex < slides.length - slidesPerView) {
        currentIndex++;
      } else {
        // Loop back to start
        currentIndex = 0;
      }
      updateSlider();
    }
    
    // Function to move to the previous slide
    function prevSlide() {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        // Loop to end
        currentIndex = slides.length - slidesPerView;
      }
      updateSlider();
    }
    
    // Function to start auto-scrolling
    function startAutoScroll() {
      stopAutoScroll(); // Clear any existing interval first
      autoScrollInterval = setInterval(nextSlide, scrollInterval);
    }
    
    // Function to stop auto-scrolling
    function stopAutoScroll() {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
    }
    
    // Event listeners for navigation buttons
    nextBtn.addEventListener('click', () => {
      nextSlide();
      // Restart auto-scroll timer when manually navigating
      startAutoScroll();
    });
    
    prevBtn.addEventListener('click', () => {
      prevSlide();
      // Restart auto-scroll timer when manually navigating
      startAutoScroll();
    });
    
    // Clear existing pagination dots and recreate them
    const paginationContainer = document.querySelector('.slider-pagination');
    paginationContainer.innerHTML = ''; // Clear existing dots
    
    // Create the correct number of dots (one for each "page" of slides)
    for (let i = 0; i < totalPages; i++) {
      const newDot = document.createElement('span');
      newDot.className = 'dot';
      if (i === 0) newDot.classList.add('active'); // Make first dot active by default
      
      newDot.addEventListener('click', () => {
        // When clicking a dot, go to the first slide of that "page"
        currentIndex = i * slidesPerView;
        updateSlider();
        // Restart auto-scroll timer when manually navigating
        startAutoScroll();
      });
      
      paginationContainer.appendChild(newDot);
    }
    
    // Pause auto-scroll when hovering over the slider
    container.parentElement.addEventListener('mouseenter', stopAutoScroll);
    container.parentElement.addEventListener('mouseleave', startAutoScroll);
    
    // Initialize slider
    updateSlider();
    
    // Start auto-scrolling
    startAutoScroll();
  });