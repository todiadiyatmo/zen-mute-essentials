// Klik tombol: kalau masih ada tab pinned (Essential) yang belum di-mute
// -> mute semua tab pinned, kalau semua sudah mute -> unmute semua.
browser.action.onClicked.addListener(async () => {
  const tabs = await browser.tabs.query({ pinned: true });
  const shouldMute = tabs.some((tab) => !tab.mutedInfo?.muted);

  await Promise.all(
    tabs.map((tab) => browser.tabs.update(tab.id, { muted: shouldMute }))
  );
});
