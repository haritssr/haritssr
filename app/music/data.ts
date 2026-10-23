import type { MusicTrack } from "./utils/musicState";

interface IncludedTrack extends MusicTrack {
  src: string;
}

function track(
  slug: string,
  filename: string,
  title: string,
  artist: string,
  duration: number,
  size: number
): IncludedTrack {
  return {
    id: `included:${slug}`,
    signature: `included:${slug}`,
    src: `/music/${slug}.mp3`,
    filename,
    title,
    artist,
    album: "",
    duration,
    size,
    hasArtwork: false,
  };
}

// Keep the public files in public/music and their display metadata here.
export const includedMusic = [
  track(
    "all-for-you",
    "All For You.mp3",
    "All For You",
    "Unknown artist",
    249.96571428571428,
    5_999_941
  ),
  track(
    "all-for-you-live",
    "All For You - Live.mp3",
    "All For You (Live)",
    "Unknown artist",
    273.37142857142857,
    3_899_635
  ),
  track(
    "all-for-you-suhyun",
    "All For You - SuhYun.mp3",
    "All For You",
    "SuhYun",
    220.42122448979592,
    3_352_101
  ),
  track(
    "stand-by-me-onew",
    "Stand By Me - ONEW.mp3",
    "Stand By Me",
    "ONEW",
    247.19673469387754,
    4_099_604
  ),
  track(
    "yeowooya-joy",
    "Yeowooya - Joy.mp3",
    "Yeowooya",
    "Joy",
    236.32979591836735,
    5_672_679
  ),
  track(
    "off-the-record-ive",
    "IVE - Off The Record.mp3",
    "Off The Record",
    "IVE",
    191.24244897959184,
    4_590_582
  ),
  track(
    "i-want-ive",
    "IVE - I WANT.mp3",
    "I WANT",
    "IVE",
    188.29061224489797,
    4_519_738
  ),
];

export function includedTrack(id: string): IncludedTrack | undefined {
  return includedMusic.find((song) => song.id === id);
}
