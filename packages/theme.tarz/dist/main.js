!(function () {
  "use strict";

  var modules = {
    980: function (module, exports, require) {
      var pluginInfo = JSON.parse('{"id":"theme.tarz"}');
      module = require.hmd(module);

      const settings = acode.require("settings");
      const { editor } = editorManager;
      const themeId = "tarz-theme";

      ace.define(
        "ace/theme/" + themeId + ".css",
        ["require", "exports", "module"],
        function (require, exports, module) {
          module.exports = `
        .ace-tarz-theme {
          background-color: rgb(15, 15, 15);
          color: rgb(240, 240, 240);
          font-weight: bold;
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.3);
          transition: all 0.2s ease-in-out;
        }

        .ace-tarz-theme .ace_gutter {
          color: rgb(180, 180, 180);
          background: rgb(10, 10, 10);
        }

        .ace-tarz-theme .ace_print-margin {
          width: 1px;
          background: #444;
        }

        .ace-tarz-theme .ace_cursor {
          color: #ffcc00;
          border-left-width: 2px;
        }

        .ace-tarz-theme .ace_marker-layer .ace_selection {
          background: rgba(100, 100, 100, 0.5);
          border-radius: 0;
        }

        .ace-tarz-theme .ace_multiselect .ace_selection.ace_start {
          box-shadow: 0 0 5px #268bd2;
        }

        .ace-tarz-theme .ace_marker-layer .ace_step {
          background: #c6dbae;
        }

        .ace-tarz-theme .ace_marker-layer .ace_bracket {
          margin: -1px 0 0 -1px;
          border: 1px solid #f8f8f0;
        }

        .ace-tarz-theme .ace_marker-layer .ace_active-line {
          background-color: rgba(55, 64, 76, 0.5);
          border: 1px solid #3a424a;
          box-sizing: border-box;
        }

        .ace-tarz-theme .ace_marker-layer .ace_selected-word {
          background-color: rgba(125, 81, 64, 0.8);
        }

        .ace-tarz-theme .ace_invisible {
          color: #52524d;
        }

        /* Animasi Rainbow untuk keyword, operator & tag */
        @keyframes rainbow {
          0% { color: #ff0000; text-shadow: 0 0 5px #ff0000; }
          20% { color: #ff7f00; text-shadow: 0 0 5px #ff7f00; }
          40% { color: #ffff00; text-shadow: 0 0 5px #ffff00; }
          60% { color: #00ff00; text-shadow: 0 0 5px #00ff00; }
          80% { color: #0000ff; text-shadow: 0 0 5px #0000ff; }
          100% { color: #8b00ff; text-shadow: 0 0 5px #8b00ff; }
        }
        .ace-tarz-theme .ace_keyword,
        .ace-tarz-theme .ace_operator,
        .ace-tarz-theme .ace_meta.ace_tag,
        .ace-tarz-theme .hljs-keyword {
          animation: rainbow 3s infinite;
          font-weight: bold;
        }

        /* String dengan efek glow */
        .ace-tarz-theme .ace_string {
          color: #a6d6fe;
          text-shadow: 0 0 8px #a6d6fe;
        }

        /* Komentar dengan glow halus */
        .ace-tarz-theme .ace_comment {
          font-style: italic;
          color: #6a9955;
          text-shadow: 0 0 3px #6a9955;
        }

        /* Konstanta dan angka */
        .ace-tarz-theme .ace_constant,
        .ace-tarz-theme .ace_numeric {
          color: #ff79c5;
          text-shadow: 0 0 6px #ff79c5;
        }

        /* Variabel */
        .ace-tarz-theme .ace_variable {
          color: #79c1fe;
          text-shadow: 0 0 6px #79c1fe;
        }
        .ace-tarz-theme .ace_support.ace_function,
        .ace-tarz-theme .ace_entity.ace_name.ace_function {
          color: #fff8d3;
          text-shadow: 0 0 6px #fff8d3;
        }
        .ace-tarz-theme .ace_class {
          color: #ffa658;
          text-shadow: 0 0 6px #ffa658;
        }
        .ace-tarz-theme .ace_identifier {
          color: #aef1ff;
        }
        .ace-tarz-theme .ace_punctuation.ace_tag,
        .ace-tarz-theme .ace_tag-name.ace_tag {
          color: #7ef788;
          text-shadow: 0 0 5px #7ef788;
        }
        .ace-tarz-theme .ace_indent-guide {
          opacity: 0.3;
          display: inline-block;
          height: 100%;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWPQ09NrYAgMjP4PAAtGAwchHMyAAAAAAElFTkSuQmCC) right repeat-y;
        }
        .ace-tarz-theme .ace_indent-guide-active {
          opacity: 1;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjiDn/7D8ABq0DEfhX2qgAAAAASUVORK5CYII=) right repeat-y;
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
