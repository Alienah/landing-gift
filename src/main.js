

(function() {
  'use strict';
    var smoothScroll = function (anchor, duration) {
      // Calculate how far and how fast to scroll
      var startLocation = window.pageYOffset;
      var endLocation = anchor.offsetTop;
      var distance = endLocation - startLocation;
      var increments = distance/(duration/12);
      var stopAnimation;
      // Scroll the page by an increment, and check if it's time to stop
      var animateScroll = function () {
          window.scrollBy(0, increments);
          stopAnimation();
      };
      // If scrolling down
      if ( increments >= 0 ) {
          // Stop animation when you reach the anchor OR the bottom of the page
          stopAnimation = function () {
              var travelled = window.pageYOffset;
              if ( (travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight) ) {
                  clearInterval(runAnimation);
              }
          };
      }
      // Loop the animation function
      var runAnimation = setInterval(animateScroll, 16);
    };
    
    var scrollToggle = document.querySelectorAll('.icon-down');
    [].forEach.call(scrollToggle, function (toggle) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        var dataID = toggle.getAttribute('href');
        var dataTarget = document.querySelector(dataID);
        var dataSpeed = toggle.getAttribute('data-speed');
        if (dataTarget) {
            smoothScroll(dataTarget, dataSpeed || 500);
        }
      }, false);
    });
})();