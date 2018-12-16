(function($) {
  let fillOutLines = function(codeLines, h, lineNo) {
    while ((codeLines.height() - h) <= 0 ) {
      codeLines.append("<div>" + lineNo + "</div>");
      lineNo++;
    }
    return lineNo;
  };

  var lineNo = 1;
  let linesDiv = $("#code-editor-lines");
  linesDiv.append("<div id='codelines'></div>");
  let codeLinesDiv	= $("#codelines");
  lineNo = fillOutLines(codeLinesDiv, linesDiv.height(), 1);

  /* React to the scroll event */
  $("#input").scroll(function(tn){
    let domTextArea		= $(this)[0];
    let scrollTop 		= domTextArea.scrollTop;
    let clientHeight 	= domTextArea.clientHeight;
    codeLinesDiv.css( {'margin-top': (-1*scrollTop) + "px"} );
    lineNo = fillOutLines(codeLinesDiv, scrollTop + clientHeight, lineNo);
  });
})(jQuery);
