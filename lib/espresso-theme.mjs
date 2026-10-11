// The code theme. One theme for both light and dark pages, because the site
// paints every code block in espresso (see the API cards on day3.app). Token
// colours are pulled from the brand palette and lightened until each clears
// 4.5:1 on #241c17.
const theme = {
  name: "day3-espresso",
  type: "dark",
  colors: {
    "editor.background": "#241c17",
    "editor.foreground": "#ede3d3",
  },
  tokenColors: [
    { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: "#968876", fontStyle: "italic" } },
    { scope: ["string", "string.quoted", "punctuation.definition.string"], settings: { foreground: "#e3b273" } },
    {
      scope: ["support.type.property-name", "meta.object-literal.key", "variable.other.property", "entity.other.attribute-name"],
      settings: { foreground: "#c9d1a6" },
    },
    { scope: ["constant.numeric", "constant.language", "constant.other"], settings: { foreground: "#eb9a80" } },
    { scope: ["keyword", "storage", "storage.type", "storage.modifier"], settings: { foreground: "#eb9a80" } },
    {
      scope: ["entity.name.function", "support.function", "entity.name.command", "support.function.builtin"],
      settings: { foreground: "#f5dcae" },
    },
    { scope: ["constant.other.option", "variable.parameter"], settings: { foreground: "#c9d1a6" } },
    {
      scope: ["variable.other.normal", "variable.other.constant", "punctuation.definition.variable", "support.variable"],
      settings: { foreground: "#a8cfc8" },
    },
    { scope: ["entity.name.type", "support.class", "support.type"], settings: { foreground: "#a8cfc8" } },
    { scope: ["punctuation", "meta.brace", "constant.character.escape"], settings: { foreground: "#ab9c8b" } },
  ],
};

export default theme;
