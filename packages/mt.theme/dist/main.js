(function () {
    "use strict";
    const modules = {
        980(module, exports, require) {
            const pluginInfo = JSON.parse('{"id":"mt.theme"}');
            module = require.hmd(module);
            const settings = acode.require("settings");
            const { editor } = editorManager;
            const themeId = "mtmanager";
            ace.define(
                `ace/theme/${themeId}.css`,
                ["require", "exports", "module"],
                (require, exports, module) => {
                    module.exports = `
.ace-mtmanager { color: #abb2bf; background-color: #2b2b2b; }
.ace-mtmanager .ace_gutter { color: #636d83; background-color: #5555; }
.ace-mtmanager .ace_gutter-active-line { color: #9b9c9d; }
.ace-mtmanager .ace_print-margin { width: 1px; background: #3e4451; }
.ace-mtmanager .ace_cursor { color: #c77e40; }
.ace-mtmanager .ace_marker-layer .ace_selection { background: #3e4451; border-radius: 0; }
.ace-mtmanager .ace_multiselect .ace_selection.ace_start { box-shadow: 0 0 3px #000; }
.ace-mtmanager .ace_marker-layer .ace_step { background: #d19a66; }
.ace-mtmanager .ace_marker-layer .ace_bracket { margin: -1px 0 0 -1px; border: 1px solid #abb2bf; }
.ace-mtmanager .ace_marker-layer .ace_active-line { border: 1px solid #3a424a; box-sizing: border-box; }
.ace-mtmanager .ace_marker-layer .ace_selected-word { background-color: rgba(75, 110, 175, 0.3); }
.ace-mtmanager .ace_invisible { color: #3e4451; }
.ace-mtmanager .hljs-keyword, .ace-mtmanager .ace_keyword { color: #f79832; }
.ace-mtmanager .ace_operator { color: #ffff; }
.ace-mtmanager .ace_constant.ace_language,
.ace-mtmanager .ace_constant.ace_numeric,
.ace-mtmanager .ace_constant.ace_character { color: #d19a66; }
.ace-mtmanager .ace_constant.ace_character.ace_escape { color: #e5c07b; }
.ace-mtmanager .ace_identifier { color: #ffffff; }
.ace-mtmanager .ace_support.ace_function { color: #f79832; }
.ace-mtmanager .ace_support.ace_constant { color: #56b6c2; }
.ace-mtmanager .ace_class { color: #e5c07b; }
.ace-mtmanager .ace_variable.ace_language,
.ace-mtmanager .ace_variable { color: #61afef; }
.ace-mtmanager .ace_meta.ace_tag,
.ace-mtmanager .ace_support.ace_type,
.ace-mtmanager .ace_storage,
.ace-mtmanager .ace_storage.ace_type { color: #e06c75; }
.ace-mtmanager .ace_invalid { color: #ffffff; background-color: #e06c75; }
.ace-mtmanager .ace_invalid.ace_deprecated { color: #ffffff; background-color: #d19a66; }
.ace-mtmanager .ace_string { color: #98c379; }
.ace-mtmanager .ace_comment { color: #808080; font-style: italic; }
.ace-mtmanager .hljs-params, .ace-mtmanager .ace_variable.ace_parameter { color: #abb2bf; }
.ace-mtmanager .ace_entity.ace_other.ace_attribute-name,
.ace-mtmanager .ace_xml-pe.ace_xml,
.ace-mtmanager .ace_punctuation.ace_tag { color: #abb2bf; }
.ace-mtmanager .ace_tag-name.ace_tag,
.ace-mtmanager .ace_entity.ace_name.ace_tag { color: #C77E40; }
.ace-mtmanager .ace_paren { color: yellow; }
.ace-mtmanager .ace_support.ace_constant.ace_js { color: #a6ffbd; }
.ace-mtmanager .ace_support.ace_constant.ace_css-in-js { color: #2fc7b6; }
        `;
                }
            );
            ace.define(
                `ace/theme/${themeId}`,
                [
                    "require",
                    "exports",
                    "module",
                    `ace/theme/${themeId}.css`,
                    "ace/lib/dom"
                ],
                (require, exports, module) => {
                    exports.isDark = true;
                    exports.cssClass = `ace-${themeId}`;
                    exports.cssText = require(`./${themeId}.css`);
                    require("../lib/dom").importCssString(
                        exports.cssText,
                        exports.cssClass,
                        false
                    );
                }
            );
            window.require([`ace/theme/${themeId}`], themeModule => {
                if (typeof exports === "object" && themeModule) {
                    module.exports = themeModule;
                }
            });
            class MTManager {
                constructor() {
                    this.onThemeChange = this.onThemeChange.bind(this);
                }
                async init() {
                    ace.require("ace/ext/themelist").themes.push({
                        caption: "MT Manger Theme (👾)",
                        theme: `ace/theme/${themeId}`,
                        isDark: true
                    });
                    if (settings.get("editorTheme") === themeId) {
                        editor.setTheme(`ace/theme/${themeId}`);
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
                        settings.update({ editorTheme: themeName });
                    }
                }
            }
            const highlightErrors = () => {
                const session = editor.getSession();
                const annotations = [];
                session
                    .getDocument()
                    .getAllLines()
                    .forEach((line, i) => {
                        if (line.includes("error")) {
                            annotations.push({
                                row: i,
                                column: line.indexOf("error"),
                                text: "Syntax Error Detected",
                                type: "error"
                            });
                        }
                    });
                session.setAnnotations(annotations);
            };
            editor.on("change", highlightErrors);
            if (window.acode) {
                const pluginInstance = new MTManager();
                acode.setPluginInit(
                    pluginInfo.id,
                    (baseUrl, context, cache) => {
                        if (!baseUrl.endsWith("/")) baseUrl += "/";
                        pluginInstance.baseUrl = baseUrl;
                        pluginInstance.init(context, cache, baseUrl);
                    }
                );
                acode.setPluginUnmount(pluginInfo.id, () =>
                    pluginInstance.destroy()
                );
            }
        }
    };
    const cache = {};
    function require(moduleId) {
        if (cache[moduleId]) return cache[moduleId].exports;
        const module = (cache[moduleId] = {
            id: moduleId,
            loaded: false,
            exports: {}
        });
        modules[moduleId](module, module.exports, require);
        module.loaded = true;
        return module.exports;
    }
    require.hmd = module => {
        module.children = module.children || [];
        return module;
    };
    require(980);
})();
