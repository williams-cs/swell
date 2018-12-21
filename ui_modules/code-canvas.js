(function($) {
  // Make canvas responsive
  let canvas = document.querySelector("canvas");
  let editor_container = document.getElementById("code-editor-container");
  let editor = editor_container.getElementsByClassName("CodeMirror")[0];
  resizeCanvas = function() {
    canvas.height = parseInt(editor.clientHeight);
    canvas.width = parseInt(editor_container.clientWidth);
  };
  document.getElementsByTagName("body")[0].onresize = resizeCanvas;
  resizeCanvas();
})(jQuery);
