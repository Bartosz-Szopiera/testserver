// =========POPULAR ELEMENTS==============
var sideNav = document.querySelector('#sidebarNavigation');
var arrows = document.querySelector('#arrows');
var main = document.querySelector('main');
var navigation = document.querySelectorAll('nav li p');
var arrows = document.querySelector('#arrows').children;
var artWrappers = document.querySelectorAll('.articleWrapper');
var styleSheet = document.querySelector('style').sheet;

// =========EVENTS==============

(function events(){
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
})();

// =============================
// Observe current article and update lists
// and subheadings accordingly
(function articleObserver() {
  var observer = new MutationObserver(handler);
  function handler(){
    var main = document.querySelector('main');
    var artIndex = main.dataset.currentIndex;
    var selector = 'li p[data-article-index="' + artIndex + '"]';
    if (styleSheet.cssRules.length !== 0) styleSheet.deleteRule(0);
    var style = '{font-size: 1.2em; color: black;text-decoration:underline;display:block !important;}'
    var rule = selector + style;
    styleSheet.insertRule(rule, 0);
  };
  handler();
  var target = document.querySelector('main');
  var config = {attributes: true,};
  observer.observe(target, config);
})();

// =============================
// When changing to the no-sidebar mode function
// is reading calculated widths of <li> elements
// and sets them as fixed.
function noSidebarMode() {
  // Turn off sidebar
  document.body.classList.add('noSidebar');
  // For each <li> set it width
  // Each p element in sidebar navigation
  var allP = sideNav.querySelectorAll('li p');
  for (var i = 0; i < allP.length; i++) {
    var width = parseFloat(getComputedStyle(allP[i]).width);
    if (allP[i].dataset.articleIndex === currentIndex) {
      allP[i].style.width = width + 'px';
    }
    else {
      allP[i].style.width = width*1.25 + 'px';
    }
  }
}

// =============================
// currentIndex - index of curently displayed article
// newIndex = index of article to be displayed
// cA - current article (it has currentIndex)
// nA - new article (it has newIndex)
var sTiD = 0; // setTimout ID
var try_sTiD = 0; // setTimout ID for secondary attempts
var currentIndex = 0;
var artList = function(){
  var ar = [];
  for (var i = 0; i < artWrappers.length; i++) {
    ar.push(parseInt(artWrappers[i].dataset.articleIndex));
  }
  return ar
}();

function navigate(direction, target) {
  if (target === undefined) target = this

  if (sTiD !== 0) {
    // window.clearTimeout(try_sTiD);
    // return try_sTiD = setTimeout(function(){
    //   navigate(direction, target)
    // }, 200,direction,target);
    return
  }

  direction = typeof(direction) === 'number' ? direction : 0;
  if (direction !== 0)  {
    if (artList.slice(-1)[0] === currentIndex && direction===1) {
      var newIndex = artList[0];
    }
    else if (artList[0] === currentIndex && direction===-1) {
      var newIndex = artList[artList.length-1];
    }
    else {
      var newIndex = artList[artList.indexOf(currentIndex) + direction];
    }
  }
  else {
    var newIndex = parseInt(target.dataset.articleIndex);
    if (currentIndex === newIndex) return
    if (artList.indexOf(newIndex) < artList.indexOf(currentIndex)) {
      direction = -1;
    }
    else direction = 1
  }

  var selector = '.articleWrapper[data-article-index="'+ newIndex +'"]';
  var nA = document.querySelector(selector);
  if (nA === null) return // When newIndex excides existing articles

  selector = '.articleWrapper[data-article-index="'+ currentIndex +'"]';
  var cA = document.querySelector(selector);

  var order = direction === 1 ? 1000 : 0;
  nA.style.order = order;
  cA.style.order = 1000 - order;

  nA.classList.remove('hidden');

  var delay = 0.3;

  cA.style.transition = 'transform';
  nA.style.transition = 'transform';

  if (direction === -1) {
    cA.style.transitionDuration = '0s';
    nA.style.transitionDuration = '0s';
    cA.style.transform = 'translate(-100%,0px)';
    nA.style.transform = 'translate(-100%,0px)';
    sTiD = setTimeout(function(){
      cA.style.transitionDuration = delay + 's';
      nA.style.transitionDuration = delay + 's';
      cA.style.transform = 'translate(0%,0px)';
      nA.style.transform = 'translate(0%,0px)';
      sTiD = setTimeout(function(){
        cA.style.transitionDuration = '0s';
        nA.style.transitionDuration = '0s';
        cA.classList.add('hidden');
        setTimeout(function(){sTiD = 0;},50);
      }, delay*1000);
    });
  }
  else {
    sTiD = setTimeout(function(){
      cA.style.transitionDuration = delay + 's';
      nA.style.transitionDuration = delay + 's';
      cA.style.transform = 'translate(-100%,0px)';
      nA.style.transform = 'translate(-100%,0px)';
      sTiD = setTimeout(function(){
        cA.style.transitionDuration = '0s';
        nA.style.transitionDuration = '0s';
        cA.style.transform = 'translate(0%,0px)';
        nA.style.transform = 'translate(0%,0px)';
        cA.classList.add('hidden');
        setTimeout(function(){sTiD = 0;},50);
      },delay*1000);
    });
  }

  currentIndex = newIndex;
  document.querySelector('main').dataset.currentIndex = currentIndex;
}
// =============================
// Inform the user of the e-mail status.
function emailAlert() {

}
