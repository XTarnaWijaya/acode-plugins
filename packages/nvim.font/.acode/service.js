var Settings = acode.require("settings"),
  Fonts = acode.require("fonts"),
  load_tarna_css = function (o) {
    var n = o.concat("style.css"),
      c = new XMLHttpRequest();
    return (
      c.open("GET", n, !1),
      c.send(),
      c.responseText.replace("/@plugin-base-url/", o)
    );
  },
  load_tarna_hot = function (o) {
    return {
      family: "Neovim Font🌍",
      css: load_tarna_css(o).replace("FONT-FAMILY", "Neovim Font🌍"),
    };
  };

export var __main__ = async function (o) {
  var c = load_tarna_hot(o);
  Fonts.add(c.family, c.css);
  var e = Settings.value.editorFont,
    t = editorManager.editor;
  e === c.family && (t.container.style.fontWeight = "700"),
    Settings.on("update:editorFont", (o) => {
      var n = t.container;
      o === c.family && (n.style.fontWeight = "700");
    });
};
