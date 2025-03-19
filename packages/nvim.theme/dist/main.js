!(function () {
  "use strict";

  var modules = {
    980: function (module, exports, require) {
      var pluginInfo = JSON.parse('{"id":"nvim.theme"}');
      module = require.hmd(module);

      const settings = acode.require("settings");
      const { editor } = editorManager;
      const themeId = "neovim";

      ace.define(
        "ace/theme/" + themeId + ".css",
        ["require", "exports", "module"],
        function (require, exports, module) {
          module.exports = `
          .ace-neovim {
    color: #abb2bf;
    background-color: #282c34;
    font-weight: bold;
}

.ace-neovim .ace_gutter {
    color: #636d83;
    background-color: #282c34;
}

.ace-neovim .ace_gutter-active-line {
    color: #abb2bf;
}

.ace-neovim .ace_print-margin {
    width: 1px;
    background: #3e4451;
}

.ace-neovim .ace_cursor {
    color: #528bff;
}

.ace-neovim .ace_marker-layer .ace_selection {
    background: #3e4451;
    border-radius: 0;
}

.ace-neovim .ace_multiselect .ace_selection.ace_start {
    box-shadow: 0 0 3px #000;
}

.ace-neovim .ace_marker-layer .ace_step {
    background: #d19a66;
}

.ace-neovim .ace_marker-layer .ace_bracket {
    margin: -1px 0 0 -1px;
    border: 1px solid #abb2bf;
}

.ace-neovim .ace_marker-layer .ace_active-line {
    border: 1px solid #3a424a;
    box-sizing: border-box;
}

.ace-neovim .ace_marker-layer .ace_selected-word {
    background-color: rgba(75, 110, 175, 0.3);
}

.ace-neovim .ace_invisible {
    color: #3e4451;
}

.ace-neovim .hljs-keyword,
.ace-neovim .ace_keyword {
    color: #c678dd;
    font-weight: bold;
}

.ace-neovim .ace_keyword.ace_operator {
    color: #abb2bf;
}

.ace-neovim .ace_constant.ace_language,
.ace-neovim .ace_constant.ace_numeric,
.ace-neovim .ace_constant.ace_character {
    color: #d19a66;
    font-weight: bold;
}

.ace-neovim .ace_constant.ace_character.ace_escape {
    color: #e5c07b;
}

.ace-neovim .ace_constant.ace_other {
    color: #d19a66;
}

.ace-neovim .hljs-title,
.ace-neovim .ace_identifier {
    color: #61afef;
    font-weight: bold;
}

.ace-neovim .ace_support.ace_function,
.ace-neovim .ace_entity.ace_name.ace_function {
    color: #61afef;
    font-weight: bold;
}

.ace-neovim .ace_support.ace_constant {
    color: #56b6c2;
}

.ace-neovim .ace_class {
    color: #e5c07b;
    font-weight: bold;
}

.ace-neovim .ace_variable.ace_language,
.ace-neovim .ace_variable {
    color: #e06c75;
    font-weight: bold;
}

.ace-neovim .ace_support.ace_type,
.ace-neovim .ace_meta.ace_tag,
.ace-neovim .ace_storage,
.ace-neovim .ace_storage.ace_type {
    color: #e06c75;
    font-weight: bold;
}

.ace-neovim .ace_invalid {
    color: #ffffff;
    background-color: #e06c75;
}

.ace-neovim .ace_invalid.ace_deprecated {
    color: #ffffff;
    background-color: #d19a66;
}

.ace-neovim .ace_string {
    color: #98c379;
    font-weight: bold;
}

.ace-neovim .ace_comment {
    color: #5c6370;
    font-style: italic;
}

.ace-neovim .hljs-params,
.ace-neovim .ace_variable.ace_parameter {
    color: #abb2bf;
}

.ace-neovim .ace_entity.ace_other.ace_attribute-name {
    color: #abb2bf;
    font-weight: bold;
}

.ace-neovim .ace_xml-pe.ace_xml,
.ace-neovim .ace_punctuation.ace_tag {
    color: #abb2bf;
}

.ace-neovim .ace_tag-name.ace_tag,
.ace-neovim .ace_entity.ace_name.ace_tag {
    color: #61afef;
    font-weight: bold;
}

.ace-neovim .ace_paren {
    color: gold;
}

.ace-neovim .ace_indent-guide {
    display: inline-block;
    height: 100%;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWPQ09NrYAgMjP4PAAtGAwchHMyAAAAAAElFTkSuQmCC) right repeat-y;
}

.ace-neovim .ace_indent-guide-active {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQIW2PQ1dX9zzBz5sz/ABCcBFFentLlAAAAAElFTkSuQmCC) right repeat-y;
}

.ace-neovim .ace_support.ace_constant.ace_js {
    color: #a6ffbd;
    font-weight: bold;
}

.ace-neovim .ace_support.ace_constant.ace_css-in-js {
    color: #2fc7b6;
    font-weight: bold;
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
            caption: "Neovim Theme🌍",
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
