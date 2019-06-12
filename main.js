AOS.init();

function changeText(parentClass, text) {
  var display = document.getElementsByClassName(parentClass)[0];
  display = display.getElementsByClassName('inner-text')[0];
  display.textContent = text;
}
