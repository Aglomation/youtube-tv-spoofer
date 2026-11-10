# YouTube TV Spoofer

Firefox extension that unlocks the YouTube TV (Leanback) interface at
[youtube.com/tv](https://www.youtube.com/tv) on desktop. YouTube blocks desktop browsers from that page,
so the extension pretends to be a Nintendo Switch, but only for youtube.com/tv.

**Get it:** https://addons.mozilla.org/en-US/firefox/addon/youtube-tv-spoofer/

## How it works

- `background.js` rewrites the `User-Agent` request header for `youtube.com/tv*` requests.
- Clicking the toolbar button jumps to your open youtube.com/tv tab, or opens one if there isn't any.
- The button shows "ON" on tabs where the spoof is active.

Nothing is collected, stored or sent anywhere. Other sites and tabs are untouched.

## Permissions

| Permission | Why |
| --- | --- |
| `*://www.youtube.com/tv*` | Only run on the YouTube TV page |
| `webRequest` + `webRequestBlocking` | Change the User-Agent header before it's sent |

## Development

Load it temporarily: `about:debugging` > This Firefox > Load Temporary Add-on > pick `manifest.json`.

```
npx web-ext lint
npx web-ext run
npx web-ext build
```

## License

AGPL-3.0-only
