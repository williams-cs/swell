(function() {
  resizeCanvas = function() {
    let canvas = document.querySelector("canvas");
    canvas.height = parseInt(document.getElementById("input").clientHeight);
    canvas.width = parseInt(document.getElementById("input").clientWidth);
  };
  document.getElementsByTagName("body")[0].onresize = resizeCanvas;
  resizeCanvas();
})();
