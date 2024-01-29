const def = {
  "Elements": [
    "Earth", "Fire", "Water", "Air", "Metal",
    "Molten", "Quicksilver", "Crystalline", "Plasma", "Turbulence",
    "Meadow", "Blaze", "Torrent", "Breeze", "Alloy",
    "Petrified", "Inferno", "Cascade", "Zephyr", "Forged",
    "Granite", "Ignite", "Ripple", "Gale", "Silver"
  ],
  "Geography": [
    "Oasis", "Horizon", "Summit", "Tundra", "Archipelago",
    "Canyon", "Tropics", "Mesa", "Glacier", "Peninsula",
    "Savanna", "Plateau", "Fjord", "Steppe", "Atoll",
    "Badlands", "Cape", "Abyss", "Lagoon", "Highland",
    "Delta", "Dunes", "Crag", "Vale", "Isthmus"
  ],
  "Time": [
    "Epoch", "Era", "Moment", "Legacy", "Flashback",
    "Chronicle", "Centennial", "Synchrony", "Pulse", "Eon",
    "Yesterday", "Tomorrow", "Dawn", "Twilight", "Infinity",
    "Ageless", "Crescendo", "Decades", "Nostalgia", "Tempo",
    "Cycles", "Occasion", "Aeon", "Transcend", "Ancestry"
  ],
  "Emotions": [
    "Joy", "Tranquil", "Melancholy", "Zeal", "Serenity",
    "Radiance", "Tender", "Whimsy", "Zeppelin", "Euphoria",
    "Nectar", "Vivid", "Enigma", "Harmony", "Crimson",
    "Luminescent", "Soothing", "Ecstasy", "Ineffable", "Ambrosia",
    "Elation", "Utopia", "Ponder", "Resonance", "Lullaby"
  ],
  "Travel": [
    "Odyssey", "Expedition", "Safari", "Voyage", "Trek",
    "Pilgrimage", "Journey", "Quest", "Roaming", "Nomad",
    "Wanderlust", "Sojourn", "Escapade", "Venture", "Traverse",
    "Peregrination", "Excursion", "Discovery", "Promenade", "Peregrine",
    "Globetrot", "Ramble", "Jaunt", "Wayfarer", "Pioneer"
  ],
  "Style": [
    "Radiant", "Harmonious", "Vibrant", "Serene", "Chic",
    "Ethereal", "Dynamic", "Sleek", "Elemental", "Zen",
    "Whimsical", "Timeless", "Urban", "Organic", "Eclectic",
    "Minimalist", "Coastal", "Futuristic", "Retro", "Bohemian"
  ],
  "Nature": [
    "Petal", "Blossom", "Bloom", "Spring", "Summer",
    "Autumn", "Winter", "Rose", "Lily", "Citrus",
    "Mint", "Spice", "Lavender", "Pomegranate", "Vanilla",
    "Cocoa", "Peach", "Orchid", "Peony", "Cinnamon",
  ]
} as const


export const generateName = (words = 2): string => {
  let name = "";
  for (let i = 0; i < words; i++) {
    const keys: string[] = Object.keys(def);
    const key = keys[Math.floor(Math.random() * keys.length)] as keyof typeof def;
    const words = def[key];
    name += ' ' + words[Math.floor(Math.random() * words.length)];
  }
  return name.trim();
}
