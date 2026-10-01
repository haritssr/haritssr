import SourceCodeLink from "@/components/SourceCodeLink";

import EmojiSelector from "./emoji-selector";

interface EmojiItem {
  emoji: string;
  name: string;
}

interface EmojiGroup {
  category: string;
  description: string;
  items: EmojiItem[];
  title: string;
  tone: string;
}

const groups: EmojiGroup[] = [
  {
    category: "Color · yellow",
    description: "Classic sunny faces and expressions, often drawn in yellow.",
    items: [
      { emoji: "😀", name: "Grinning" },
      { emoji: "😃", name: "Big smile" },
      { emoji: "😄", name: "Smiling eyes" },
      { emoji: "😁", name: "Beaming" },
      { emoji: "🙂", name: "Slight smile" },
      { emoji: "😎", name: "Cool" },
      { emoji: "🤔", name: "Thinking" },
      { emoji: "😅", name: "Relieved" },
    ],
    title: "Sunny faces",
    tone: "bg-amber-400",
  },
  {
    category: "Color · red & pink",
    description: "Small symbols and objects whose familiar artwork leans red.",
    items: [
      { emoji: "❤️", name: "Red heart" },
      { emoji: "🌹", name: "Rose" },
      { emoji: "🍓", name: "Strawberry" },
      { emoji: "🍒", name: "Cherries" },
      { emoji: "🧣", name: "Scarf" },
      { emoji: "🧧", name: "Red envelope" },
      { emoji: "💌", name: "Love letter" },
      { emoji: "🩷", name: "Pink heart" },
    ],
    title: "Red & pink",
    tone: "bg-rose-500",
  },
  {
    category: "Color · green",
    description:
      "Plants, produce, animals, and symbols with green as a key color.",
    items: [
      { emoji: "💚", name: "Green heart" },
      { emoji: "🐸", name: "Frog" },
      { emoji: "🥑", name: "Avocado" },
      { emoji: "🥦", name: "Broccoli" },
      { emoji: "🐢", name: "Turtle" },
      { emoji: "🍏", name: "Green apple" },
      { emoji: "🫛", name: "Pea pod" },
      { emoji: "🌵", name: "Cactus" },
    ],
    title: "Green things",
    tone: "bg-emerald-500",
  },
  {
    category: "Color · blue",
    description: "Cool-toned creatures, objects, and symbols.",
    items: [
      { emoji: "💙", name: "Blue heart" },
      { emoji: "🐳", name: "Whale" },
      { emoji: "🧊", name: "Ice cube" },
      { emoji: "🦋", name: "Butterfly" },
      { emoji: "🌀", name: "Cyclone" },
      { emoji: "🥶", name: "Cold face" },
      { emoji: "🔵", name: "Blue circle" },
      { emoji: "🩵", name: "Light blue heart" },
    ],
    title: "Blue things",
    tone: "bg-sky-500",
  },
  {
    category: "Color · orange",
    description: "Bright orange foods, animals, and warm motifs.",
    items: [
      { emoji: "🧡", name: "Orange heart" },
      { emoji: "🍊", name: "Mandarin" },
      { emoji: "🥕", name: "Carrot" },
      { emoji: "🦊", name: "Fox" },
      { emoji: "🎃", name: "Pumpkin" },
      { emoji: "🔥", name: "Fire" },
      { emoji: "🦁", name: "Lion" },
      { emoji: "🏀", name: "Basketball" },
    ],
    title: "Orange things",
    tone: "bg-orange-500",
  },
  {
    category: "Color · purple",
    description: "Violet produce, flowers, and magical-looking objects.",
    items: [
      { emoji: "💜", name: "Purple heart" },
      { emoji: "🍇", name: "Grapes" },
      { emoji: "🍆", name: "Eggplant" },
      { emoji: "🔮", name: "Crystal ball" },
      { emoji: "☂️", name: "Umbrella" },
      { emoji: "🪻", name: "Hyacinth" },
      { emoji: "🟣", name: "Purple circle" },
      { emoji: "🧞", name: "Genie" },
    ],
    title: "Purple things",
    tone: "bg-violet-500",
  },
  {
    category: "Shape · round",
    description: "Emoji with a circular or ball-like silhouette.",
    items: [
      { emoji: "⚽", name: "Soccer ball" },
      { emoji: "🏀", name: "Basketball" },
      { emoji: "🎾", name: "Tennis ball" },
      { emoji: "🎱", name: "Pool 8 ball" },
      { emoji: "🔴", name: "Red circle" },
      { emoji: "🌕", name: "Full moon" },
      { emoji: "🍪", name: "Cookie" },
      { emoji: "🪙", name: "Coin" },
    ],
    title: "Round & spherical",
    tone: "bg-foreground/70",
  },
  {
    category: "Shape · hearts",
    description:
      "A family of heart silhouettes in different colors and styles.",
    items: [
      { emoji: "❤️", name: "Red" },
      { emoji: "🧡", name: "Orange" },
      { emoji: "💛", name: "Yellow" },
      { emoji: "💚", name: "Green" },
      { emoji: "💙", name: "Blue" },
      { emoji: "💜", name: "Purple" },
      { emoji: "🖤", name: "Black" },
      { emoji: "🤍", name: "White" },
      { emoji: "🤎", name: "Brown" },
      { emoji: "🩷", name: "Pink" },
      { emoji: "🩵", name: "Light blue" },
      { emoji: "💝", name: "Gift heart" },
    ],
    title: "Hearts",
    tone: "bg-rose-500",
  },
  {
    category: "Shape · squares & diamonds",
    description: "Geometric tiles with crisp square or diamond outlines.",
    items: [
      { emoji: "🟥", name: "Red square" },
      { emoji: "🟧", name: "Orange square" },
      { emoji: "🟨", name: "Yellow square" },
      { emoji: "🟩", name: "Green square" },
      { emoji: "🟦", name: "Blue square" },
      { emoji: "🟪", name: "Purple square" },
      { emoji: "🔶", name: "Large orange diamond" },
      { emoji: "🔷", name: "Large blue diamond" },
      { emoji: "⬛", name: "Black large square" },
      { emoji: "⬜", name: "White large square" },
    ],
    title: "Squares & diamonds",
    tone: "bg-foreground/70",
  },
  {
    category: "Shape · stars & sparkle",
    description:
      "Pointed shapes and bright marks used to suggest light or magic.",
    items: [
      { emoji: "⭐", name: "Star" },
      { emoji: "🌟", name: "Glowing star" },
      { emoji: "✨", name: "Sparkles" },
      { emoji: "💫", name: "Dizzy" },
      { emoji: "🌠", name: "Shooting star" },
      { emoji: "✴️", name: "Eight-pointed star" },
      { emoji: "⚡", name: "Lightning" },
      { emoji: "🎇", name: "Sparkler" },
    ],
    title: "Stars & sparkle",
    tone: "bg-amber-400",
  },
  {
    category: "Shape · arrows & loops",
    description: "Directional arrows and repeating or rotating marks.",
    items: [
      { emoji: "⬆️", name: "Up" },
      { emoji: "⬇️", name: "Down" },
      { emoji: "⬅️", name: "Left" },
      { emoji: "➡️", name: "Right" },
      { emoji: "↗️", name: "Up-right" },
      { emoji: "↘️", name: "Down-right" },
      { emoji: "🔁", name: "Repeat" },
      { emoji: "🔄", name: "Refresh" },
    ],
    title: "Arrows & loops",
    tone: "bg-sky-500",
  },
  {
    category: "Theme · weather",
    description: "Sky and weather conditions shown as compact symbols.",
    items: [
      { emoji: "☀️", name: "Sun" },
      { emoji: "🌤️", name: "Sun behind cloud" },
      { emoji: "☁️", name: "Cloud" },
      { emoji: "🌧️", name: "Rain" },
      { emoji: "⛈️", name: "Thunderstorm" },
      { emoji: "❄️", name: "Snowflake" },
      { emoji: "🌈", name: "Rainbow" },
      { emoji: "🌪️", name: "Tornado" },
      { emoji: "🌫️", name: "Fog" },
    ],
    title: "Weather & sky",
    tone: "bg-sky-500",
  },
  {
    category: "Theme · faces",
    description: "Expressions grouped by the feeling or reaction they suggest.",
    items: [
      { emoji: "🥰", name: "Affection" },
      { emoji: "😂", name: "Laughter" },
      { emoji: "😢", name: "Sadness" },
      { emoji: "😡", name: "Anger" },
      { emoji: "😱", name: "Surprise" },
      { emoji: "😴", name: "Sleepiness" },
      { emoji: "🤔", name: "Thoughtfulness" },
      { emoji: "🥳", name: "Celebration" },
    ],
    title: "Faces by feeling",
    tone: "bg-violet-500",
  },
  {
    category: "Theme · gestures",
    description: "Hands and gestures used to greet, signal, or show support.",
    items: [
      { emoji: "👋", name: "Wave" },
      { emoji: "🤙", name: "Call me" },
      { emoji: "✌️", name: "Victory" },
      { emoji: "🤟", name: "Love-you gesture" },
      { emoji: "👌", name: "OK" },
      { emoji: "👏", name: "Clap" },
      { emoji: "🙌", name: "Raised hands" },
      { emoji: "🤝", name: "Handshake" },
      { emoji: "🫶", name: "Heart hands" },
    ],
    title: "Hands & gestures",
    tone: "bg-amber-400",
  },
];

const typeGroups: EmojiGroup[] = [
  {
    category: "Type · animals",
    description: "Creatures from land, sea, and air.",
    items: [
      { emoji: "🐶", name: "Dog" },
      { emoji: "🐱", name: "Cat" },
      { emoji: "🦊", name: "Fox" },
      { emoji: "🐻", name: "Bear" },
      { emoji: "🦉", name: "Owl" },
      { emoji: "🐢", name: "Turtle" },
      { emoji: "🐬", name: "Dolphin" },
      { emoji: "🐙", name: "Octopus" },
      { emoji: "🦋", name: "Butterfly" },
      { emoji: "🐝", name: "Honeybee" },
    ],
    title: "Animals",
    tone: "bg-emerald-500",
  },
  {
    category: "Type · human body",
    description: "Faces, body parts, and hand gestures.",
    items: [
      { emoji: "👀", name: "Eyes" },
      { emoji: "👂", name: "Ear" },
      { emoji: "👃", name: "Nose" },
      { emoji: "👄", name: "Mouth" },
      { emoji: "🦷", name: "Tooth" },
      { emoji: "🦴", name: "Bone" },
      { emoji: "🧠", name: "Brain" },
      { emoji: "👋", name: "Waving hand" },
      { emoji: "🫶", name: "Heart hands" },
    ],
    title: "Human body",
    tone: "bg-rose-500",
  },
  {
    category: "Type · food & drink",
    description: "Ingredients, prepared dishes, snacks, and drinks.",
    items: [
      { emoji: "🍎", name: "Apple" },
      { emoji: "🍓", name: "Strawberry" },
      { emoji: "🥑", name: "Avocado" },
      { emoji: "🥕", name: "Carrot" },
      { emoji: "🍕", name: "Pizza" },
      { emoji: "🍣", name: "Sushi" },
      { emoji: "🥨", name: "Pretzel" },
      { emoji: "☕", name: "Hot drink" },
      { emoji: "🧋", name: "Bubble tea" },
      { emoji: "🍰", name: "Cake" },
    ],
    title: "Food & drink",
    tone: "bg-orange-500",
  },
  {
    category: "Type · plants & fungi",
    description: "Trees, flowers, leaves, and other growing things.",
    items: [
      { emoji: "🌵", name: "Cactus" },
      { emoji: "🌻", name: "Sunflower" },
      { emoji: "🌷", name: "Tulip" },
      { emoji: "🌳", name: "Deciduous tree" },
      { emoji: "🍄", name: "Mushroom" },
      { emoji: "🌿", name: "Herb" },
      { emoji: "🪴", name: "Potted plant" },
      { emoji: "🍁", name: "Maple leaf" },
    ],
    title: "Plants & fungi",
    tone: "bg-emerald-500",
  },
  {
    category: "Type · clothing",
    description: "Clothes, footwear, and wearable accessories.",
    items: [
      { emoji: "👕", name: "T-shirt" },
      { emoji: "👖", name: "Jeans" },
      { emoji: "👗", name: "Dress" },
      { emoji: "👟", name: "Sneaker" },
      { emoji: "🧢", name: "Cap" },
      { emoji: "👜", name: "Handbag" },
      { emoji: "👓", name: "Glasses" },
      { emoji: "💍", name: "Ring" },
    ],
    title: "Clothing & accessories",
    tone: "bg-violet-500",
  },
  {
    category: "Type · objects",
    description: "Useful tools and familiar things found around a home.",
    items: [
      { emoji: "🔑", name: "Key" },
      { emoji: "📱", name: "Phone" },
      { emoji: "💻", name: "Laptop" },
      { emoji: "💡", name: "Light bulb" },
      { emoji: "🧸", name: "Teddy bear" },
      { emoji: "📚", name: "Books" },
      { emoji: "✏️", name: "Pencil" },
      { emoji: "🪑", name: "Chair" },
    ],
    title: "Objects & tools",
    tone: "bg-sky-500",
  },
  {
    category: "Type · places & transport",
    description: "Buildings, vehicles, and ways to get around.",
    items: [
      { emoji: "🏠", name: "House" },
      { emoji: "🏫", name: "School" },
      { emoji: "🏥", name: "Hospital" },
      { emoji: "🚗", name: "Car" },
      { emoji: "🚲", name: "Bicycle" },
      { emoji: "✈️", name: "Airplane" },
      { emoji: "🚀", name: "Rocket" },
      { emoji: "🚉", name: "Railway station" },
    ],
    title: "Places & transport",
    tone: "bg-sky-500",
  },
  {
    category: "Type · activities",
    description: "Sports, hobbies, and ways to spend time.",
    items: [
      { emoji: "⚽", name: "Soccer" },
      { emoji: "🏀", name: "Basketball" },
      { emoji: "🎾", name: "Tennis" },
      { emoji: "🏊", name: "Swimming" },
      { emoji: "🎨", name: "Painting" },
      { emoji: "🎸", name: "Guitar" },
      { emoji: "🎮", name: "Video game" },
      { emoji: "🏕️", name: "Camping" },
    ],
    title: "Activities & hobbies",
    tone: "bg-amber-400",
  },
  {
    category: "Type · symbols",
    description: "Signs and marks that communicate an idea or instruction.",
    items: [
      { emoji: "✅", name: "Check mark" },
      { emoji: "❌", name: "Cross mark" },
      { emoji: "⚠️", name: "Warning" },
      { emoji: "🚫", name: "Prohibited" },
      { emoji: "♻️", name: "Recycling" },
      { emoji: "💯", name: "Hundred points" },
      { emoji: "🆗", name: "OK button" },
      { emoji: "🔣", name: "Input symbols" },
      { emoji: "🔁", name: "Repeat button" },
    ],
    title: "Symbols & signs",
    tone: "bg-foreground/70",
  },
];

const themeGroups: EmojiGroup[] = [
  ...groups.filter((group) => group.category.startsWith("Theme")),
  {
    category: "Theme · affection",
    description: "Symbols often used to express care, love, or closeness.",
    items: [
      { emoji: "🥰", name: "Smiling with hearts" },
      { emoji: "😍", name: "Heart eyes" },
      { emoji: "❤️", name: "Red heart" },
      { emoji: "💌", name: "Love letter" },
      { emoji: "💐", name: "Bouquet" },
      { emoji: "💝", name: "Heart with ribbon" },
      { emoji: "🤗", name: "Hugging face" },
      { emoji: "🫶", name: "Heart hands" },
    ],
    title: "Affection & care",
    tone: "bg-rose-500",
  },
  {
    category: "Theme · celebration",
    description: "Party details and symbols for a special occasion.",
    items: [
      { emoji: "🎂", name: "Birthday cake" },
      { emoji: "🎉", name: "Party popper" },
      { emoji: "🎊", name: "Confetti ball" },
      { emoji: "🎁", name: "Gift" },
      { emoji: "🎇", name: "Fireworks" },
      { emoji: "🥳", name: "Partying face" },
      { emoji: "🏆", name: "Trophy" },
      { emoji: "🥂", name: "Cheers" },
    ],
    title: "Celebration",
    tone: "bg-amber-400",
  },
  {
    category: "Theme · communication",
    description: "Ways to speak, message, call, or get someone's attention.",
    items: [
      { emoji: "💬", name: "Speech balloon" },
      { emoji: "🗨️", name: "Left speech bubble" },
      { emoji: "🗣️", name: "Speaking head" },
      { emoji: "☎️", name: "Telephone" },
      { emoji: "📞", name: "Phone receiver" },
      { emoji: "📧", name: "Email" },
      { emoji: "📣", name: "Megaphone" },
      { emoji: "👋", name: "Wave hello" },
    ],
    title: "Communication",
    tone: "bg-sky-500",
  },
];

const colorGroups = groups.filter((group) =>
  group.category.startsWith("Color")
);
const shapeGroups = groups.filter(
  (group) =>
    group.category.startsWith("Shape") || group.title === "Arrows & loops"
);

const groupings = [
  {
    description:
      "Sort by a commonly perceived dominant color. Emoji artwork varies by platform, so these groups are approximate.",
    groups: colorGroups,
    id: "color",
    label: "Color",
  },
  {
    description:
      "Compare visual silhouettes and motifs, such as circles, hearts, geometric tiles, and arrows.",
    groups: shapeGroups,
    id: "shape",
    label: "Shape similarity",
  },
  {
    description:
      "Browse what each emoji depicts: animals, body parts, food, objects, activities, and more.",
    groups: typeGroups,
    id: "type",
    label: "Type",
  },
  {
    description:
      "Explore shared ideas or uses, including emotions, weather, celebration, affection, and communication.",
    groups: themeGroups,
    id: "theme",
    label: "Theme or meaning",
  },
] as const;

export default function EmojiAtlas() {
  return (
    <>
      <SourceCodeLink />

      <div className="space-y-8 pb-12">
        <header className="max-w-3xl space-y-3">
          <p className="text-foreground/60 text-sm font-medium tracking-wide uppercase">
            A visual field guide
          </p>
          <p className="text-foreground/80 text-lg leading-relaxed">
            Explore the same emoji through different lenses. Choose to group
            them by color, shape similarity, type, or theme.
          </p>
        </header>

        <EmojiSelector groupings={groupings} initialGrouping="color" />

        <p className="text-foreground/55 max-w-3xl text-sm leading-relaxed">
          These are visual groupings rather than strict rules: the same emoji
          can fit several collections, and its colors or details may look
          different on another device.
        </p>
      </div>
    </>
  );
}
