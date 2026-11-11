// SPDX-License-Identifier: AGPL-3.0-only
const SWITCH_UA = "Mozilla/5.0 (Nintendo Switch; WebApplet) AppleWebKit/613.0 (KHTML, like Gecko) NF/6.0.3.30.3 NintendoBrowser/5.1.0.54290";
const TV_URL = "https://www.youtube.com/tv";
const TV_PATTERN = "*://www.youtube.com/tv*";

// swap the User-Agent header, but only for youtube.com/tv requests
browser.webRequest.onBeforeSendHeaders.addListener(
    (details) => {
        const headers = details.requestHeaders;
        const ua = headers.find((h) => h.name.toLowerCase() === "user-agent");

        if (ua) {
            ua.value = SWITCH_UA;
        }

        return { requestHeaders: headers };
    },
    { urls: [TV_PATTERN] },
    ["blocking", "requestHeaders"]
);

// toolbar button: jump to an already open youtube.com/tv tab, or open a new one
browser.browserAction.onClicked.addListener(async () => {
    const [tvTab] = await browser.tabs.query({ url: TV_PATTERN });

    if (tvTab) {
        await browser.tabs.update(tvTab.id, { active: true });
        await browser.windows.update(tvTab.windowId, { focused: true });
        return;
    }

    browser.tabs.create({ url: TV_URL });
});

// show "ON" on the toolbar button while the spoof is active in a tab
browser.browserAction.setBadgeBackgroundColor({ color: "#2e7d32" });
browser.tabs.onUpdated.addListener(
    (tabId) => {
        browser.browserAction.setBadgeText({ tabId, text: "ON" });
    },
    { urls: [TV_PATTERN], properties: ["status"] }
);
