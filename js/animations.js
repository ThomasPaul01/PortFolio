/* animations.js
   Simple IntersectionObserver to reveal elements with animation classes.
*/
(function(){
  'use strict';

  function onIntersect(entries){
    entries.forEach(function(entry){
      var el = entry.target;
      if(entry.isIntersecting){
        // read optional delay from data-delay (ms)
        var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
        if(delay){
          el.style.transitionDelay = delay + 'ms';
        }
        el.classList.add('anim-in-view');
        el.classList.remove('anim-hidden');
        // optionally unobserve once visible
        observer.unobserve(el);
      }
    });
  }

  var observer = new IntersectionObserver(onIntersect, {
    root: null,
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.12
  });

  function init(){
    var targets = document.querySelectorAll('.anim-hidden');
    Array.prototype.forEach.call(targets, function(t){
      observer.observe(t);
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
