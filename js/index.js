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
  // Language selection
  var pl = document.querySelector('#languageList .polish')
  var en = document.querySelector('#languageList .english')
  pl.addEventListener('click', function(){setLanguage('pl')});
  en.addEventListener('click', function(){setLanguage('en')});
  //
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
// =====================================
// Show text elements according to language chosen

function setLanguage(language) {
  if (styleSheet.cssRules.length > 1) {
    styleSheet.deleteRule(1);
  }
  // var selector = '.text:not(.' + language + ')';
  // var style = '{display: none}';
  var selector = '.' + language;
  var style = '{display: inline}';
  var rule = selector + style;
  styleSheet.insertRule(rule, 1);
}
setLanguage('pl');

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

  if (sTiD !== 0) return

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

  var left = 'translate(-100%,0px)';
  var center = 'translate(0%,0px)';

  if (direction === -1) {
    // main.style.visibility = 'hidden';
    main.style.transitionDuration = '0s';
    main.style.transform = left;
    // main.style.visibility = 'visible';
    sTiD = setTimeout(function(){
      main.style.transitionDuration = delay + 's';
      main.style.transform = center;
      sTiD = setTimeout(function(){
        cA.classList.add('hidden');
        setTimeout(function(){sTiD = 0;},50);
      }, delay*1000);
    },20);
  }
  else {
    sTiD = setTimeout(function(){
      main.style.transitionDuration = delay + 's';
      main.style.transform = left;
      sTiD = setTimeout(function(){
        main.style.transitionDuration = '0s';
        main.style.transform = center;
        cA.classList.add('hidden');
        setTimeout(function(){sTiD = 0;},50);
      },delay*1000);
    },20);
  }

  currentIndex = newIndex;
  document.querySelector('main').dataset.currentIndex = currentIndex;
}
// =============================
// Inform the user of the e-mail status.
function emailAlert() {

}
