//
// A [Scribe](https://github.com/guardian/scribe) plugin for jump links.
// Some code copied from The Guardian's link prompt pugin:
// https://github.com/guardian/scribe-plugin-link-prompt-command
//
(function() {
  // The main plugin function
  var scribePluginJumpLink = function () {
    return function (scribe) {
      var jumpLinkCommand = new scribe.api.Command('createLink');
      jumpLinkCommand.nodeName = 'A';

      jumpLinkCommand.execute = function () {
        var selection = new scribe.api.Selection(),
            that = this;
        var fullString = selection.selection.baseNode.textContent
        if($(selection.selection.baseNode.parentNode).hasClass('is-jump-link')){
          // Remove the jump link
          $(selection.selection.baseNode).unwrap()
        }else{
          // Create the jump link
          var startOffset = selection.range.startOffset
          var numOfChar = selection.range.endOffset - startOffset
          var replace = fullString.substr(startOffset, numOfChar)
          if (selection.selection.baseNode.parentNode.nodeName === 'A'){
            var parent = selection.selection.baseNode.parentElement
            parent.classList.add('is-jump-link')
            parent.setAttribute('name', replace)
          }else{
            replace = "<a class='is-jump-link' name=" + replace + ">" + replace + '</a>'
            var newHtml = splice(fullString, startOffset, numOfChar, replace)
            $(selection.selection.baseNode).replaceWith(newHtml)
          }
        }
      };

      // Set this as the jump linking plugin
      scribe.commands.jumpLink = jumpLinkCommand;
    };
  };

  var splice = function(str, start,length,replacement) {
    return str.substr(0,start)+replacement+str.substr(start+length);
  }

  // Export for CommonJS & window global. TODO: AMD
  if (typeof module != 'undefined') {
    module.exports = scribePluginJumpLink;
  } else {
    window.scribePluginJumpLink = scribePluginJumpLink;
  }
})();
