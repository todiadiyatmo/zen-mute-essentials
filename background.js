const ICON_UNMUTED = "icon.svg";
const ICON_MUTED = "icon-muted.svg";

// All pinned (Essential) tabs are muted, and there is at least one.
async function allPinnedMuted() {
  const tabs = await browser.tabs.query({ pinned: true });
  return tabs.length > 0 && tabs.every((tab) => tab.mutedInfo?.muted);
}

// Sync the toolbar icon and tooltip with the current mute state.
async function updateIcon() {
  const muted = await allPinnedMuted();
  await browser.action.setIcon({ path: muted ? ICON_MUTED : ICON_UNMUTED });
  await browser.action.setTitle({
    title: muted ? "Unmute Essential tabs" : "Mute Essential tabs",
  });
}

// Click: if any pinned (Essential) tab is still unmuted -> mute all pinned
// tabs; if they are all muted -> unmute all.
browser.action.onClicked.addListener(async () => {
  const tabs = await browser.tabs.query({ pinned: true });
  const shouldMute = tabs.some((tab) => !tab.mutedInfo?.muted);

  await Promise.all(
    tabs.map((tab) => browser.tabs.update(tab.id, { muted: shouldMute }))
  );
  await updateIcon();
});

// Keep the icon in sync when tabs are muted/pinned elsewhere (e.g. from the
// tab's own speaker button) or pinned tabs are opened/closed.
browser.tabs.onUpdated.addListener(updateIcon, {
  properties: ["mutedInfo", "pinned"],
});
browser.tabs.onCreated.addListener(updateIcon);
browser.tabs.onRemoved.addListener(updateIcon);
browser.runtime.onStartup.addListener(updateIcon);
browser.runtime.onInstalled.addListener(updateIcon);
updateIcon();
