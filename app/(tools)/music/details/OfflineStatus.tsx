"use client";

import useMusicOffline from "../_components/useMusicOffline";

export default function OfflineStatus() {
  const status = useMusicOffline(0, false);
  return <output>{status}</output>;
}
