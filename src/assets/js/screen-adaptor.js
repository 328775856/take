/**
 * Author: LyonWong
 * Date: 2018-03-27
 */
module.exports = function (designWidth, fit) {
  function f(w, f) {
    let d = document;
    let b = d.body;
    let s = b.style;
    s.maxWidth = fit ? fit(window.screen) +'px' : w + 'px';
    s.fontSize = getComputedStyle(b)['font-size'];
    d.documentElement.style.fontSize = (b.scrollWidth * 100 / w) + 'px';
  }
  f(designWidth, fit);
  window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', f, false);
}
