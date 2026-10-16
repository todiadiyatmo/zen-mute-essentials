# Zen Mute Toggle

An extension for [Zen Browser](https://zen-browser.app) (Firefox) that mutes / unmutes all pinned (Essential) tabs with a single button.

- Click once: all Essential tabs are muted.
- Click again (when all are already muted): all are unmuted.
- The toolbar icon reflects the current state — a speaker with sound waves when unmuted, a speaker with a red ✕ when all Essential tabs are muted. It also stays in sync if you mute/unmute tabs manually.

## Install (temporary)

1. Open `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on…** → select `manifest.json`.
3. Open the Extensions panel, right-click the speaker icon → **Pin to Toolbar**, then adjust its position via **Customize Toolbar…**.

## Build

```sh
npm install -g web-ext
web-ext lint
web-ext build   # outputs a .zip in web-ext-artifacts/
```

## License

[MIT](LICENSE)
