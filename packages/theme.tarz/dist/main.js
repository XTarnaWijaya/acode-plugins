!(function () {
  "use strict";

  var modules = {
    980: function (module, exports, require) {
      var pluginInfo = JSON.parse('{"id":"theme.tarz"}');
      module = require.hmd(module);

      const settings = acode.require("settings");
      const { editor } = editorManager;
      const themeId = "tarz-theme";

      ace.define("ace/theme/" + themeId + ".css", ["require", "exports", "module"], function (require, exports, module) {
        module.exports = `
          @keyframes rainbowText {
            0%   { color: #ff0000; }
            14%  { color: #ff7f00; }
            28%  { color: #ffff00; }
            42%  { color: #00ff00; }
            57%  { color: #0000ff; }
            71%  { color: #4b0082; }
            85%  { color: #8a2be2; }
            100% { color: #ff0000; }
          }

          @keyframes neonGlow {
            0%, 100% { text-shadow: 0 0 5px rgba(255, 255, 255, 0.5); }
            50% { text-shadow: 0 0 15px rgba(255, 255, 255, 1); }
          }

          @keyframes blinkError {
            0%, 100% { color: #ff0000; text-shadow: 0 0 10px #ff0000; }
            50% { color: transparent; text-shadow: none; }
          }

          @keyframes borderPulse {
            0% { border-color: #ff0000; }
            25% { border-color: #ff7f00; }
            50% { border-color: #00ff00; }
            75% { border-color: #0000ff; }
            100% { border-color: #ff0000; }
          }

          .ace-tarz-theme {
            color: #abb2bf;
            background: linear-gradient(135deg, #1f1f1f, #2a2a2a);
            animation: neonGlow 2s infinite alternate;
          }

          .ace-tarz-theme .ace_gutter {
            background: #202020;
            color: #8a8a8a;
          }

          .ace-tarz-theme .ace_gutter-active-line {
            background-color: #2c2c3e;
            color: #ffeb3b;
          }

          .ace-tarz-theme .ace_cursor {
            color: #efae31;
            border-left-width: 2px;
            animation: neonGlow 1s infinite alternate;
          }

          .ace-tarz-theme .ace_selection {
            background: rgba(0, 150, 255, 0.3);
            animation: neonGlow 1s infinite alternate;
          }

          .ace-tarz-theme .ace_keyword {
            color: #ff0080;
            font-weight: bold;
            animation: rainbowText 3s infinite linear;
          }

          .ace-tarz-theme .ace_variable {
            color: #ffeb3b;
            font-style: italic;
            text-shadow: 0 0 5px rgba(255, 235, 59, 0.5);
          }

          .ace-tarz-theme .ace_string {
            color: #ff4d4d;
            font-weight: bold;
            animation: neonGlow 2s infinite alternate;
          }

          .ace-tarz-theme .ace_comment {
            color: #6a9955;
            font-style: italic;
            opacity: 0.8;
          }

          .ace-tarz-theme .ace_operator {
            color: #00ffff;
            font-weight: bold;
            text-shadow: 0 0 10px #00ffff;
          }

          .ace-tarz-theme .ace_bracket {
            font-weight: bold;
            color: #ff9800;
            animation: borderPulse 2s infinite;
          }

          .ace-tarz-theme .ace_constant.ace_numeric {
            color: #ff66cc;
          }

          .ace-tarz-theme .ace_support.ace_function {
            color: #33ffcc;
          }

          .ace-tarz-theme .ace_storage {
            color: #57afff;
            text-shadow: 0 0 5px #57afff;
          }

          .ace-tarz-theme .ace_entity.ace_name.ace_function {
            color: #fff8d3;
          }

          .ace-tarz-theme .ace_paren {
            color: gold;
          }

          .ace-tarz-theme .ace_indent-guide {
            display: inline-block;
            height: 100%;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWPQ09NrYAgMjP4PAAtGAwchHMyAAAAAAElFTkSuQmCC) right repeat-y;
          }

          .ace-tarz-theme .ace_indent-guide-active {
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQIW2PQ1dX9zzBz5sz/ABCcBFFentLlAAAAAElFTkSuQmCC) right repeat-y;
          }

          /* Efek untuk teks error */
          .ace-tarz-theme .ace_error {
            color: #ff0000;
            font-weight: bold;
            text-shadow: 0 0 10px #ff0000;
            animation: blinkError 1s infinite;
          }
        `;
      });

      ace.define("ace/theme/" + themeId, ["require", "exports", "module", "ace/theme/" + themeId + ".css", "ace/lib/dom"], function (require, exports, module) {
        exports.isDark = true;
        exports.cssClass = "ace-" + themeId;
        exports.cssText = require("./" + themeId + ".css");
        require("../lib/dom").importCssString(exports.cssText, exports.cssClass, false);
      });

      window.require(["ace/theme/" + themeId], function (themeModule) {
        if (typeof exports === "object" && themeModule) {
          module.exports = themeModule;
        }
      });

      class TarzRGBFusionPlugin {
        async init() {
          ace.require("ace/ext/themelist").themes.push({
            caption: "Tarz Hot❤️‍🔥🔥",
            theme: "ace/theme/" + themeId,
            isDark: true,
          });

          if (settings.get("editorTheme") === themeId) {
            editor.setTheme("ace/theme/" + themeId);
          }
          settings.on("update:editorTheme", this.onThemeChange);
        }

        async destroy() {
          settings.off("update", this.onThemeChange);
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
        let editor = ace.edit("editor");
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
        const pluginInstance = new TarzRGBFusionPlugin();
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