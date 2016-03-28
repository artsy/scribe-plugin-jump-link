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

      // Show the tooltip when adding a link to unlinked text.
      jumpLinkCommand.execute = function () {
        var selection = new scribe.api.Selection(),
            that = this;
        console.log(selection);
      };

      // Set this as the jump link plugin
      scribe.commands.jumpLink = jumpLinkCommand;
    };
  };

  // Export for CommonJS & window global. TODO: AMD
  if (typeof module != 'undefined') {
    module.exports = scribePluginJumpLink;
  } else {
    window.scribePluginJumpLink = scribePluginJumpLink;
  }
})();
