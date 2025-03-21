!(function () {
  "use strict";

  var modules = {
    980: function (module, exports, require) {
      var pluginInfo = JSON.parse('{"id":"mt.theme"}');
      module = require.hmd(module);

      const settings = acode.require("settings");
      const { editor } = editorManager;
      const themeId = "mt";

      ace.define(
        "ace/theme/" + themeId + ".css",
        ["require", "exports", "module"],
        function (require, exports, module) {
          module.exports = `
          // style css disini contoh .ace-{themeId}
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
            caption: "MT Manager 👾",
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
