!(function () {
  "use strict";

  var modules = {
    980: function (module, exports, require) {
      var pluginInfo = JSON.parse('{"id":"mt.theme"}');
      module = require.hmd(module);

      const settings = acode.require("settings");
      const { editor } = editorManager;
      const themeId = "mtmanager";

      ace.define(
        "ace/theme/" + themeId + ".css",
        ["require", "exports", "module"],
        function (require, exports, module) {
          module.exports = `
          .ace-mtmanager {  
    color: #dcdcdc;  
    background-color: #1e1e1e;  
    font-weight: bold;  
}  

.ace-mtmanager .ace_gutter {  
    color: #858585;  
    background-color: #1e1e1e;  
}  
.ace-mtmanager .ace_gutter-active-line {  
    color: #dcdcdc;  
}  

.ace-mtmanager .ace_print-margin {  
    width: 1px;  
    background: #444444;  
}  

.ace-mtmanager .ace_cursor {  
    color: #528bff;  
}  

.ace-mtmanager .ace_marker-layer .ace_selection {  
    background: #264f78;  
    border-radius: 0;  
}  
.ace-mtmanager .ace_multiselect .ace_selection.ace_start {  
    box-shadow: 0 0 3px #000;  
}  

.ace-mtmanager .ace_marker-layer .ace_step {  
    background: #c586c0;  
}  

.ace-mtmanager .ace_marker-layer .ace_bracket {  
    margin: -1px 0 0 -1px;  
    border: 1px solid #dcdcdc;  
}  

.ace-mtmanager .ace_marker-layer .ace_active-line {  
    border: 1px solid #333;  
    box-sizing: border-box;  
}  

.ace-mtmanager .ace_marker-layer .ace_selected-word {  
    background-color: rgba(38, 79, 120, 0.3);  
}  

.ace-mtmanager .ace_invisible {  
    color: #444444;  
}  

.ace-mtmanager .ace_keyword,  
.ace-mtmanager .hljs-keyword {  
    color: #569cd6;  
    font-weight: bold;  
}  

.ace-mtmanager .ace_constant,  
.ace-mtmanager .ace_constant.ace_numeric,  
.ace-mtmanager .ace_constant.ace_character,  
.ace-mtmanager .ace_constant.ace_other {  
    color: #b5cea8;  
    font-weight: bold;  
}  
.ace-mtmanager .ace_constant.ace_character.ace_escape {  
    color: #d7ba7d;  
}  

.ace-mtmanager .ace_string {  
    color: #ce9178;  
    font-weight: bold;  
}  

.ace-mtmanager .ace_comment {  
    color: #6a9955;  
    font-style: italic;  
}  

.ace-mtmanager .ace_identifier,  
.ace-mtmanager .hljs-title {  
    color: #9cdcfe;  
    font-weight: bold;  
}  
.ace-mtmanager .hljs-params,  
.ace-mtmanager .ace_variable.ace_parameter {  
    color: #dcdcdc;  
}  

.ace-mtmanager .ace_support.ace_function,  
.ace-mtmanager .ace_entity.ace_name.ace_function {  
    color: #dcdcaa;  
    font-weight: bold;  
}  

.ace-mtmanager .ace_class {  
    color: #4ec9b0;  
    font-weight: bold;  
}  
.ace-mtmanager .ace_support.ace_type,  
.ace-mtmanager .ace_meta.ace_tag,  
.ace-mtmanager .ace_storage,  
.ace-mtmanager .ace_storage.ace_type {  
    color: #4ec9b0;  
    font-weight: bold;  
}  

.ace-mtmanager .ace_keyword.ace_operator,  
.ace-mtmanager .ace_operator {  
    color: #d4d4d4;  
    font-weight: bold;  
}  
.ace-mtmanager .ace_punctuation {  
    color: #dcdcdc;  
}  

.ace-mtmanager .ace_meta.ace_tag,  
.ace-mtmanager .ace_entity.ace_name.ace_tag,  
.ace-mtmanager .ace_xml-pe.ace_xml,  
.ace-mtmanager .ace_punctuation.ace_tag {  
    color: #569cd6;  
    font-weight: bold;  
}  

.ace-mtmanager .ace_indent-guide {  
    display: inline-block;  
    height: 100%;  
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWPQ09NrYAgMjP4PAAtGAwchHMyAAAAAAElFTkSuQmCC) right repeat-y;  
}  
.ace-mtmanager .ace_indent-guide-active {  
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQIW2PQ1dX9zzBz5sz/ABCcBFFentLlAAAAAElFTkSuQmCC) right repeat-y;  
}
        `;
        },
      );

      ace.define(
        "ace/theme/" + themeId,
        [
          "require",
          "exports",
          "module",
          "ace/theme/" + themeId + ".css",
          "ace/lib/dom",
        ],
        function (require, exports, module) {
          exports.isDark = true;
          exports.cssClass = "ace-" + themeId;
          exports.cssText = require("./" + themeId + ".css");
          require("../lib/dom").importCssString(
            exports.cssText,
            exports.cssClass,
            false,
          );
        },
      );

      window.require(["ace/theme/" + themeId], function (themeModule) {
        if (typeof exports === "object" && themeModule) {
          module.exports = themeModule;
        }
      });

      class TarzRGBGlowPlugin {
        constructor() {
          this.onThemeChange = this.onThemeChange.bind(this);
        }

        async init() {
          ace.require("ace/ext/themelist").themes.push({
            caption: "MT Manager👾",
            theme: "ace/theme/" + themeId,
            isDark: true,
          });

          if (settings.get("editorTheme") === themeId) {
            editor.setTheme("ace/theme/" + themeId);
          }
          settings.on("update:editorTheme", this.onThemeChange);
        }

        async destroy() {
          settings.off("update:editorTheme", this.onThemeChange);
        }

        onThemeChange(newTheme) {
          const currentTheme = settings.get("editorTheme");
          const themeName = newTheme.split("/").pop();
          if (currentTheme !== themeName && themeName === themeId) {
            settings.update({
              editorTheme: themeName,
            });
          }
        }
      }

      function highlightErrors() {
        let session = editor.getSession();
        let annotations = [];
        let lines = session.getDocument().getAllLines();

        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes("error")) {
            annotations.push({
              row: i,
              column: lines[i].indexOf("error"),
              text: "Syntax Error Detected",
              type: "error",
            });
          }
        }
        session.setAnnotations(annotations);
      }

      editor.on("change", function () {
        highlightErrors();
      });

      if (window.acode) {
        const pluginInstance = new TarzRGBGlowPlugin();
        acode.setPluginInit(pluginInfo.id, (baseUrl, context, cache) => {
          if (!baseUrl.endsWith("/")) {
            baseUrl += "/";
          }
          pluginInstance.baseUrl = baseUrl;
          pluginInstance.init(context, cache, baseUrl);
        });
        acode.setPluginUnmount(pluginInfo.id, () => {
          pluginInstance.destroy();
        });
      }
    },
  };

  var cache = {};

  function require(moduleId) {
    var cached = cache[moduleId];
    if (cached !== undefined) return cached.exports;
    var module = (cache[moduleId] = {
      id: moduleId,
      loaded: false,
      exports: {},
    });
    modules[moduleId](module, module.exports, require);
    module.loaded = true;
    return module.exports;
  }

  require.hmd = function (module) {
    module.children = module.children || [];
    return module;
  };

  require(980);
})();
