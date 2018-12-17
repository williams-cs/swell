(function($) {
  // Add line number to code editor
  let fillOutLines = function(codeLines, h, lineNo) {
    while ((codeLines.height() - h) <= 0 ) {
      codeLines.append("<div>" + lineNo + "</div>");
      lineNo++;
    }
    return lineNo;
  };

  var lineNo = 1;
  let input = $("#input");
  let linesDiv = $("#code-editor-lines");
  linesDiv.height(input.height());
  linesDiv.prepend("<div id='codelines'></div>");
  let codeLinesDiv	= $("#codelines");
  lineNo = fillOutLines(codeLinesDiv, linesDiv.height(), 1);

  // React to the scroll event
  input.scroll(function(e) {
    let domTextArea		= $(this)[0];
    let scrollTop 		= domTextArea.scrollTop;
    let clientHeight 	= domTextArea.clientHeight;
    codeLinesDiv.css({"margin-top": (-1*scrollTop) + "px"});
    lineNo = fillOutLines(codeLinesDiv, scrollTop + clientHeight, lineNo);
  });

  // Add 'tab' for editor
  input.keydown(function(e) {
    if (e.keyCode == 9 || e.which == 9) {
      e.preventDefault();
      var s = this.selectionStart;
      this.value = this.value.substring(0, this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
      this.selectionEnd = s + 1;
    }
  });

  // Make code and canvas responsive
  resizeCodeCanvas = function() {
    let canvas = document.querySelector("canvas");
    canvas.height = parseInt(document.getElementById("input").clientHeight);
    canvas.width = parseInt(document.getElementById("code-editor").clientWidth - 20);
    linesDiv.height(input.height());
    lineNo = fillOutLines(codeLinesDiv, linesDiv.height(), lineNo);
  };
  document.getElementsByTagName("body")[0].onresize = resizeCodeCanvas;
  resizeCodeCanvas();
})(jQuery);
