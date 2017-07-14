// =========POPULAR ELEMENTS==============
var sideNav = document.querySelector('#sidebarNavigation');
var arrows = document.querySelector('#arrows');
var main = document.querySelector('main');
var navigation = document.querySelectorAll('nav li');
var arrows = document.querySelector('#arrows').children;

// =========EVENTS==============

var events = function (){
  // Site navigation
  for (var i = 0; i < navigation.length; i++) {
    navigation[i].addEventListener('click', navigate);
  }
  // Navigation arrows
  arrows[0].addEventListener('click', function(){
    navigate(-1)
  });
  arrows[1].addEventListener('click', function(){
    navigate(1)
  });
}();

// =============================
// currentIndex - index of curently displayed article
// newIndex = index of article to be displayed
var sTiD = 0; // setTimout ID
var try_sTiD = 0; // setTimout ID for secondary attempts
var currentIndex = 0;

function navigate(direction, target) {

  if (target === undefined) target = this

  if (sTiD !== 0) {
    window.clearTimeout(try_sTiD);
    return try_sTiD = setTimeout(function(){
      navigate(direction, target)
    }, 100,direction,target);
    return
  }

  direction = typeof(direction) === 'number' ? direction : 0;
  if (direction !== 0) var newIndex = currentIndex + direction;
  else {
    var newIndex = parseInt(target.dataset.articleIndex);
  }

  if (currentIndex === newIndex) return

  var selector = '.articleWrapper[data-article-index="'+ newIndex +'"]';
  var nA = document.querySelector(selector);
  if (nA === null) return

  selector = '.articleWrapper[data-article-index="'+ currentIndex +'"]';
  var cA = document.querySelector(selector);

  nA.classList.remove('hidden');

  var delay = 0.35;

  if (newIndex < currentIndex) {
    cA.style.transition = 'unset';
    nA.style.transition = 'unset';
    cA.style.transform = 'translate(-100%,0px)';
    nA.style.transform = 'translate(-100%,0px)';
    sTiD = setTimeout(function(){
      cA.style.transition = 'transform ' + delay +'s';
      nA.style.transition = 'transform ' + delay +'s';
      cA.style.transform = 'translate(0%,0px)';
      nA.style.transform = 'translate(0%,0px)';
      sTiD = setTimeout(function(){
        cA.style.transition = 'unset';
        nA.style.transition = 'unset';
        cA.classList.add('hidden');
        setTimeout(function(){sTiD = 0;},50);
      }, delay*1000);
    });
  }
  else {
    sTiD = setTimeout(function(){
      cA.style.transition = 'transform ' + delay +'s';
      nA.style.transition = 'transform ' + delay +'s';
      cA.style.transform = 'translate(-100%,0px)';
      nA.style.transform = 'translate(-100%,0px)';
    });
    sTiD = setTimeout(function(){
      cA.style.transition = 'unset';
      nA.style.transition = 'unset';
      cA.style.transform = 'translate(0%,0px)';
      nA.style.transform = 'translate(0%,0px)';
      cA.classList.add('hidden');
      setTimeout(function(){sTiD = 0;},50);
    },delay*1000);
  }

  currentIndex = newIndex;
}
// =============================
