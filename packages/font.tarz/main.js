window.acode?.setPluginInit("font.tarz", async function (base_url) {
  base_url.endsWith("/") ?? (base_url += "/");

  var core_url = ".acode/service.js";

  try {
    var core = await import(core_url);
    await core.__main__(base_url);
  } catch (e) {
    console.error(e.message);
  }

  return;
});
