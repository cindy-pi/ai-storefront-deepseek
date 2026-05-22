const wands = [
  // ── Good Alignment (13 wands) ──
  {
    id: 1, name: "Phoenix Feather Wand", alignment: "good",
    description: "Crafted from rare phoenix feather, this wand blazes with radiant light and chooses only the pure of heart.",
    price: 250, imageUrl: null,
    magicalProperties: ["Radiant Blaze", "Rebirth Flame", "Pure Heart Bond", "Featherlight Step"],
    rarity: "legendary"
  },
  {
    id: 2, name: "Unicorn Hair Wand", alignment: "good",
    description: "Woven with a single shimmering unicorn hair, it casts the most consistent and benevolent charms.",
    price: 220, imageUrl: null,
    magicalProperties: ["Benevolent Charm", "Purity Shield", "Gentle Glow"],
    rarity: "rare"
  },
  {
    id: 3, name: "Dawnbringer's Rod", alignment: "good",
    description: "Forged at the first light of morning, this wand banishes darkness and bolsters allies.",
    price: 300, imageUrl: null,
    magicalProperties: ["First Light", "Darkness Banishment", "Ally Bolster", "Morning Radiance"],
    rarity: "legendary"
  },
  {
    id: 4, name: "Celestial Spire", alignment: "good",
    description: "A crystalline wand attuned to the stars, guiding lost souls with celestial light.",
    price: 275, imageUrl: null,
    magicalProperties: ["Star Guide", "Celestial Light", "Soul Comfort"],
    rarity: "rare"
  },
  {
    id: 5, name: "Guardian's Promise", alignment: "good",
    description: "An unyielding wand of ancient oak and silver, sworn to protect the innocent.",
    price: 200, imageUrl: null,
    magicalProperties: ["Oaken Ward", "Silver Barrier", "Protector's Oath"],
    rarity: "uncommon"
  },
  {
    id: 6, name: "Healer's Touch", alignment: "good",
    description: "Infused with restorative essences, this wand mends wounds and lifts curses.",
    price: 180, imageUrl: null,
    magicalProperties: ["Wound Mending", "Curse Lift", "Restorative Essence"],
    rarity: "uncommon"
  },
  {
    id: 7, name: "Sunstone Scepter", alignment: "good",
    description: "A golden wand topped with a sunstone that radiates warmth, hope, and courage.",
    price: 310, imageUrl: null,
    magicalProperties: ["Sunstone Beam", "Warmth Aura", "Courage Gift", "Hope's Ray"],
    rarity: "legendary"
  },
  {
    id: 8, name: "Mercy's Whisper", alignment: "good",
    description: "A slender willow wand that speaks in soothing tones, calming even the fiercest tempers.",
    price: 190, imageUrl: null,
    magicalProperties: ["Soothing Tone", "Calm Mind", "Whisper of Peace"],
    rarity: "common"
  },
  {
    id: 9, name: "Virtue's Edge", alignment: "good",
    description: "A blade-like wand of polished white wood, honed for righteous combat magic.",
    price: 260, imageUrl: null,
    magicalProperties: ["Righteous Strike", "White Wood Blade", "Virtue's Shield"],
    rarity: "rare"
  },
  {
    id: 10, name: "Lightweaver", alignment: "good",
    description: "Spinning threads of pure radiance, this wand can weave illusions of breathtaking beauty.",
    price: 240, imageUrl: null,
    magicalProperties: ["Radiance Thread", "Illusion Weave", "Dazzling Display"],
    rarity: "uncommon"
  },
  {
    id: 11, name: "Aegis Rod", alignment: "good",
    description: "A defensive wand that erects shimmering barriers and reflects hostile enchantments.",
    price: 290, imageUrl: null,
    magicalProperties: ["Shimmering Barrier", "Spell Reflection", "Aegis Ward"],
    rarity: "rare"
  },
  {
    id: 12, name: "Tranquility Wand", alignment: "good",
    description: "Carved from calming lavender wood, it promotes peace and clears mental fog.",
    price: 170, imageUrl: null,
    magicalProperties: ["Lavender Calm", "Mind Clear", "Peaceful Aura"],
    rarity: "common"
  },
  {
    id: 13, name: "Haven's Beacon", alignment: "good",
    description: "A lighthouse-inspired wand that guides allies through the darkest magical storms.",
    price: 230, imageUrl: null,
    magicalProperties: ["Beacon Light", "Storm Guidance", "Safe Harbor"],
    rarity: "uncommon"
  },

  // ── Neutral Alignment (13 wands) ──
  {
    id: 14, name: "Obsidian Shard", alignment: "neutral",
    description: "A volcanic glass wand balanced between fire and earth, equally suited to creation and destruction.",
    price: 210, imageUrl: null,
    magicalProperties: ["Volcanic Edge", "Balance of Elements", "Glass Shard Strike"],
    rarity: "uncommon"
  },
  {
    id: 15, name: "Mercury Stream", alignment: "neutral",
    description: "A fluid, shape-shifting wand of liquid metal that adapts to its wielder's intent.",
    price: 265, imageUrl: null,
    magicalProperties: ["Shape Shift", "Liquid Metal Form", "Intent Adapt"],
    rarity: "rare"
  },
  {
    id: 16, name: "Equilibrium Staff", alignment: "neutral",
    description: "Perfectly balanced from materials of opposing natures — ice and flame, shadow and light.",
    price: 280, imageUrl: null,
    magicalProperties: ["Dual Nature", "Opposing Forces", "Perfect Balance"],
    rarity: "legendary"
  },
  {
    id: 17, name: "Willow-the-Wisp", alignment: "neutral",
    description: "A mischievous wand that flickers with faerie fire, leading the curious to hidden truths.",
    price: 195, imageUrl: null,
    magicalProperties: ["Faerie Fire", "Hidden Truth Reveal", "Mischievous Flicker"],
    rarity: "uncommon"
  },
  {
    id: 18, name: "Deepwood Beckoner", alignment: "neutral",
    description: "Rooted from the heart of an ancient forest, this wand speaks the language of beasts and trees.",
    price: 185, imageUrl: null,
    magicalProperties: ["Beast Tongue", "Tree Speak", "Ancient Root"],
    rarity: "common"
  },
  {
    id: 19, name: "Tidecaller", alignment: "neutral",
    description: "Fashioned from coral and sea-silk, it commands the ebb and flow of water and emotion.",
    price: 240, imageUrl: null,
    magicalProperties: ["Tide Command", "Emotion Flow", "Sea-Silk Weave"],
    rarity: "rare"
  },
  {
    id: 20, name: "Dusk & Dawn", alignment: "neutral",
    description: "A dual-tone wand pivoting between twilight and daybreak, never fully committed to either.",
    price: 300, imageUrl: null,
    magicalProperties: ["Twilight Pivot", "Daybreak Echo", "Liminal Power"],
    rarity: "legendary"
  },
  {
    id: 21, name: "Geode Wand", alignment: "neutral",
    description: "A rugged exterior of stone hides a crystalline core of raw, unaligned magical energy.",
    price: 220, imageUrl: null,
    magicalProperties: ["Crystalline Core", "Raw Energy", "Stone Hide"],
    rarity: "common"
  },
  {
    id: 22, name: "Sandglass Rod", alignment: "neutral",
    description: "Containing enchanted sand that flows against gravity, it nudges time in subtle ways.",
    price: 270, imageUrl: null,
    magicalProperties: ["Time Nudge", "Gravity Sand", "Temporal Flow"],
    rarity: "rare"
  },
  {
    id: 23, name: "Verdant Spiral", alignment: "neutral",
    description: "A living wand of twisting ivy and bark that grows and changes with each season.",
    price: 205, imageUrl: null,
    magicalProperties: ["Living Growth", "Seasonal Change", "Ivy Twist"],
    rarity: "uncommon"
  },
  {
    id: 24, name: "Emberwand", alignment: "neutral",
    description: "Smoldering with banked embers, this wand can kindle great fires or warm a cold hearth.",
    price: 215, imageUrl: null,
    magicalProperties: ["Banked Ember", "Great Fire Kindle", "Hearth Warmth"],
    rarity: "common"
  },
  {
    id: 25, name: "Mistweaver", alignment: "neutral",
    description: "Veiled in perpetual fog, it obscures, reveals, and blurs the line between truth and illusion.",
    price: 235, imageUrl: null,
    magicalProperties: ["Perpetual Fog", "Truth Blur", "Mist Shield"],
    rarity: "uncommon"
  },
  {
    id: 26, name: "Echo Stick", alignment: "neutral",
    description: "A plain wooden stick that echoes any spell cast through it — once, but twice as strong.",
    price: 175, imageUrl: null,
    magicalProperties: ["Spell Echo", "Double Cast", "Plain Wood Resilience"],
    rarity: "common"
  },

  // ── Evil Alignment (13 wands) ──
  {
    id: 27, name: "Shadowrend", alignment: "evil",
    description: "A jagged wand of obsidian that drinks light and whispers temptations of forbidden power.",
    price: 320, imageUrl: null,
    magicalProperties: ["Light Drink", "Forbidden Whispers", "Obsidian Jag"],
    rarity: "legendary"
  },
  {
    id: 28, name: "Blightwood Staff", alignment: "evil",
    description: "Harvested from a dying swamp, this wand spreads decay and saps the life from adversaries.",
    price: 280, imageUrl: null,
    magicalProperties: ["Decay Spread", "Life Sap", "Swamp Rot"],
    rarity: "rare"
  },
  {
    id: 29, name: "Soulfang", alignment: "evil",
    description: "Barbed and hungry, this wand leeches a fragment of every soul it touches.",
    price: 350, imageUrl: null,
    magicalProperties: ["Soul Leech", "Barbed Grasp", "Hungry Binding"],
    rarity: "legendary"
  },
  {
    id: 30, name: "Viper's Kiss", alignment: "evil",
    description: "Coiled like a serpent, this wand strikes with venomous magic and treacherous speed.",
    price: 260, imageUrl: null,
    magicalProperties: ["Venom Strike", "Serpent Coil", "Treacherous Speed"],
    rarity: "rare"
  },
  {
    id: 31, name: "Cursed Eye", alignment: "evil",
    description: "A beholder's eye suspended in dark crystal — it sees your enemies' weaknesses and exploits them.",
    price: 310, imageUrl: null,
    magicalProperties: ["Weakness Sight", "Dark Crystal Gaze", "Exploit Flaw"],
    rarity: "legendary"
  },
  {
    id: 32, name: "Nightmare Horn", alignment: "evil",
    description: "Carved from a slain nightmare's horn, it conjures fears and sows discord among foes.",
    price: 290, imageUrl: null,
    magicalProperties: ["Fear Conjure", "Discord Sow", "Nightmare Echo"],
    rarity: "rare"
  },
  {
    id: 33, name: "Bonechiller", alignment: "evil",
    description: "Made from the finger bone of a frost giant, it radiates necrotic cold.",
    price: 270, imageUrl: null,
    magicalProperties: ["Necrotic Cold", "Frost Giant Bone", "Chilling Touch"],
    rarity: "uncommon"
  },
  {
    id: 34, name: "Ravenscribe", alignment: "evil",
    description: "A black feather quill wand that writes curses into the very fabric of reality.",
    price: 240, imageUrl: null,
    magicalProperties: ["Curse Writing", "Reality Inscribe", "Feather Quill Strike"],
    rarity: "uncommon"
  },
  {
    id: 35, name: "Bloodthorn", alignment: "evil",
    description: "A twisted thorn wand that demands a blood price for every spell, growing sharper with each casting.",
    price: 330, imageUrl: null,
    magicalProperties: ["Blood Price", "Thorn Growth", "Sharpened Casting"],
    rarity: "rare"
  },
  {
    id: 36, name: "Abyssal Gaze", alignment: "evil",
    description: "Peer into the void and the void peers back — this wand channels raw, maddening power from the Abyss.",
    price: 360, imageUrl: null,
    magicalProperties: ["Void Channel", "Maddening Power", "Abyss Gaze"],
    rarity: "legendary"
  },
  {
    id: 37, name: "Despair's Edge", alignment: "evil",
    description: "A serrated wand that amplifies doubt and turns hope into hopelessness.",
    price: 295, imageUrl: null,
    magicalProperties: ["Doubt Amplify", "Hope Drain", "Serrated Edge"],
    rarity: "uncommon"
  },
  {
    id: 38, name: "Hollow Lament", alignment: "evil",
    description: "A hollow bone that wails when magic flows through it, unleashing sonic devastation.",
    price: 255, imageUrl: null,
    magicalProperties: ["Sonic Wail", "Bone Resonance", "Devastation Wave"],
    rarity: "uncommon"
  },
  {
    id: 39, name: "Wyrmfang Daggerwand", alignment: "evil",
    description: "A dragon's fang set on a darkwood handle — greedy, proud, and devastatingly powerful.",
    price: 340, imageUrl: null,
    magicalProperties: ["Dragon's Fang", "Darkwood Grip", "Prideful Strikes", "Greedy Binding"],
    rarity: "legendary"
  },
];

export const alignments = ["good", "neutral", "evil"];

export default wands;
