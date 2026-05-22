const wands = [
  // ── Good Alignment (13 wands) ──
  { id: 1, name: "Phoenix Feather Wand", price: 250, alignment: "Good", description: "Crafted from rare phoenix feather, this wand blazes with radiant light and chooses only the pure of heart." },
  { id: 2, name: "Unicorn Hair Wand", price: 220, alignment: "Good", description: "Woven with a single shimmering unicorn hair, it casts the most consistent and benevolent charms." },
  { id: 3, name: "Dawnbringer's Rod", price: 300, alignment: "Good", description: "Forged at the first light of morning, this wand banishes darkness and bolsters allies." },
  { id: 4, name: "Celestial Spire", price: 275, alignment: "Good", description: "A crystalline wand attuned to the stars, guiding lost souls with celestial light." },
  { id: 5, name: "Guardian's Promise", price: 200, alignment: "Good", description: "An unyielding wand of ancient oak and silver, sworn to protect the innocent." },
  { id: 6, name: "Healer's Touch", price: 180, alignment: "Good", description: "Infused with restorative essences, this wand mends wounds and lifts curses." },
  { id: 7, name: "Sunstone Scepter", price: 310, alignment: "Good", description: "A golden wand topped with a sunstone that radiates warmth, hope, and courage." },
  { id: 8, name: "Mercy's Whisper", price: 190, alignment: "Good", description: "A slender willow wand that speaks in soothing tones, calming even the fiercest tempers." },
  { id: 9, name: "Virtue's Edge", price: 260, alignment: "Good", description: "A blade-like wand of polished white wood, honed for righteous combat magic." },
  { id: 10, name: "Lightweaver", price: 240, alignment: "Good", description: "Spinning threads of pure radiance, this wand can weave illusions of breathtaking beauty." },
  { id: 11, name: "Aegis Rod", price: 290, alignment: "Good", description: "A defensive wand that erects shimmering barriers and reflects hostile enchantments." },
  { id: 12, name: "Tranquility Wand", price: 170, alignment: "Good", description: "Carved from calming lavender wood, it promotes peace and clears mental fog." },
  { id: 13, name: "Haven's Beacon", price: 230, alignment: "Good", description: "A lighthouse-inspired wand that guides allies through the darkest magical storms." },

  // ── Neutral Alignment (13 wands) ──
  { id: 14, name: "Obsidian Shard", price: 210, alignment: "Neutral", description: "A volcanic glass wand balanced between fire and earth, equally suited to creation and destruction." },
  { id: 15, name: "Mercury Stream", price: 265, alignment: "Neutral", description: "A fluid, shape-shifting wand of liquid metal that adapts to its wielder's intent." },
  { id: 16, name: "Equilibrium Staff", price: 280, alignment: "Neutral", description: "Perfectly balanced from materials of opposing natures — ice and flame, shadow and light." },
  { id: 17, name: "Willow-the-Wisp", price: 195, alignment: "Neutral", description: "A mischievous wand that flickers with faerie fire, leading the curious to hidden truths." },
  { id: 18, name: "Deepwood Beckoner", price: 185, alignment: "Neutral", description: "Rooted from the heart of an ancient forest, this wand speaks the language of beasts and trees." },
  { id: 19, name: "Tidecaller", price: 240, alignment: "Neutral", description: "Fashioned from coral and sea-silk, it commands the ebb and flow of water and emotion." },
  { id: 20, name: "Dusk & Dawn", price: 300, alignment: "Neutral", description: "A dual-tone wand pivoting between twilight and daybreak, never fully committed to either." },
  { id: 21, name: "Geode Wand", price: 220, alignment: "Neutral", description: "A rugged exterior of stone hides a crystalline core of raw, unaligned magical energy." },
  { id: 22, name: "Sandglass Rod", price: 270, alignment: "Neutral", description: "Containing enchanted sand that flows against gravity, it nudges time in subtle ways." },
  { id: 23, name: "Verdant Spiral", price: 205, alignment: "Neutral", description: "A living wand of twisting ivy and bark that grows and changes with each season." },
  { id: 24, name: "Emberwand", price: 215, alignment: "Neutral", description: "Smoldering with banked embers, this wand can kindle great fires or warm a cold hearth." },
  { id: 25, name: "Mistweaver", price: 235, alignment: "Neutral", description: "Veiled in perpetual fog, it obscures, reveals, and blurs the line between truth and illusion." },
  { id: 26, name: "Echo Stick", price: 175, alignment: "Neutral", description: "A plain wooden stick that echoes any spell cast through it — once, but twice as strong." },

  // ── Evil Alignment (13 wands) ──
  { id: 27, name: "Shadowrend", price: 320, alignment: "Evil", description: "A jagged wand of obsidian that drinks light and whispers temptations of forbidden power." },
  { id: 28, name: "Blightwood Staff", price: 280, alignment: "Evil", description: "Harvested from a dying swamp, this wand spreads decay and saps the life from adversaries." },
  { id: 29, name: "Soulfang", price: 350, alignment: "Evil", description: "Barbed and hungry, this wand leeches a fragment of every soul it touches." },
  { id: 30, name: "Viper's Kiss", price: 260, alignment: "Evil", description: "Coiled like a serpent, this wand strikes with venomous magic and treacherous speed." },
  { id: 31, name: "Cursed Eye", price: 310, alignment: "Evil", description: "A beholder's eye suspended in dark crystal — it sees your enemies' weaknesses and exploits them." },
  { id: 32, name: "Nightmare Horn", price: 290, alignment: "Evil", description: "Carved from a slain nightmare's horn, it conjures fears and sows discord among foes." },
  { id: 33, name: "Bonechiller", price: 270, alignment: "Evil", description: "Made from the finger bone of a frost giant, it radiates necrotic cold." },
  { id: 34, name: "Ravenscribe", price: 240, alignment: "Evil", description: "A black feather quill wand that writes curses into the very fabric of reality." },
  { id: 35, name: "Bloodthorn", price: 330, alignment: "Evil", description: "A twisted thorn wand that demands a blood price for every spell, growing sharper with each casting." },
  { id: 36, name: "Abyssal Gaze", price: 360, alignment: "Evil", description: "Peer into the void and the void peers back — this wand channels raw, maddening power from the Abyss." },
  { id: 37, name: "Despair's Edge", price: 295, alignment: "Evil", description: "A serrated wand that amplifies doubt and turns hope into hopelessness." },
  { id: 38, name: "Hollow Lament", price: 255, alignment: "Evil", description: "A hollow bone that wails when magic flows through it, unleashing sonic devastation." },
  { id: 39, name: "Wyrmfang Daggerwand", price: 340, alignment: "Evil", description: "A dragon's fang set on a darkwood handle — greedy, proud, and devastatingly powerful." },
];

export const alignments = ["Good", "Neutral", "Evil"];

export default wands;
