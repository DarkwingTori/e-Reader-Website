export type CardRarity = 'common' | 'uncommon' | 'rare' | 'ultra-rare';
export type Region = 'US' | 'JP' | 'AU';
export type CardStatus = 'owned' | 'wanted' | 'trade' | null;

export interface EReaderCard {
  id: string;
  name: string;
  series: string;
  seriesId: string;
  cardNumber: string;
  region: Region;
  rarity: CardRarity;
  cardType: string;
  game: string;
  unlocks: string;
  regionLocked: boolean;
  status: CardStatus;
  color: string;
  image?: string;
  imageBack?: string;
}

export interface Series {
  id: string;
  name: string;
  game: string;
  region: Region;
  releaseDate: string;
  totalCards: number;
  accentColor: string;
  accentBg: string;
}

export const SERIES: Series[] = [
  { id: 'ac-e-s1', name: 'Animal Crossing-e Series 1', game: 'Animal Crossing', region: 'US', releaseDate: '2002-10-21', totalCards: 66, accentColor: '#4A7C59', accentBg: '#D5E8D4' },
];

const BASE = '/images/animal-crossing/series-1';

export const CARDS: EReaderCard[] = [
  // ── NPC / Staff cards (001–010) ──────────────────────────────────────────
  { id: 'ac-e-s1-001', cardNumber: '001', name: 'K.K. Slider',  cardType: 'Character', rarity: 'uncommon', unlocks: 'Unlocks K.K. Slider, the traveling musician, in Animal Crossing.' },
  { id: 'ac-e-s1-002', cardNumber: '002', name: 'Rover',        cardType: 'Character', rarity: 'uncommon', unlocks: 'Unlocks Rover, the friendly cat who rides the train, in Animal Crossing.' },
  { id: 'ac-e-s1-003', cardNumber: '003', name: 'Porter',       cardType: 'Character', rarity: 'uncommon', unlocks: 'Unlocks Porter, the train station attendant, in Animal Crossing.' },
  { id: 'ac-e-s1-004', cardNumber: '004', name: 'Tom Nook',     cardType: 'Character', rarity: 'uncommon', unlocks: 'Unlocks Tom Nook, the raccoon shopkeeper, in Animal Crossing.' },
  { id: 'ac-e-s1-005', cardNumber: '005', name: 'Tortimer',     cardType: 'Character', rarity: 'uncommon', unlocks: 'Unlocks Tortimer, the town mayor, in Animal Crossing.' },
  { id: 'ac-e-s1-006', cardNumber: '006', name: 'Mr. Resetti',  cardType: 'Character', rarity: 'uncommon', unlocks: 'Unlocks Mr. Resetti, the mole who scolds you for resetting, in Animal Crossing.' },
  { id: 'ac-e-s1-007', cardNumber: '007', name: 'Blathers',     cardType: 'Character', rarity: 'uncommon', unlocks: 'Unlocks Blathers, the museum owl curator, in Animal Crossing.' },
  { id: 'ac-e-s1-008', cardNumber: '008', name: 'Sable Able',   cardType: 'Character', rarity: 'uncommon', unlocks: 'Unlocks Sable Able, the quiet tailor sister, in Animal Crossing.' },
  { id: 'ac-e-s1-009', cardNumber: '009', name: 'Mabel Able',   cardType: 'Character', rarity: 'uncommon', unlocks: 'Unlocks Mabel Able, the cheerful tailor sister, in Animal Crossing.' },
  { id: 'ac-e-s1-010', cardNumber: '010', name: "Kapp'n",       cardType: 'Character', rarity: 'uncommon', unlocks: "Unlocks Kapp'n, the sailor who rows you to the island, in Animal Crossing." },

  // ── Villager cards (011–060) ─────────────────────────────────────────────
  { id: 'ac-e-s1-011', cardNumber: '011', name: 'Bob',      cardType: 'Character', rarity: 'common', unlocks: 'Invites Bob, a lazy cat villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-012', cardNumber: '012', name: 'Mitzi',    cardType: 'Character', rarity: 'common', unlocks: 'Invites Mitzi, a normal cat villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-013', cardNumber: '013', name: 'Punchy',   cardType: 'Character', rarity: 'common', unlocks: 'Invites Punchy, a lazy cat villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-014', cardNumber: '014', name: 'Ankha',    cardType: 'Character', rarity: 'common', unlocks: 'Invites Ankha, a snooty cat villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-015', cardNumber: '015', name: 'Paolo',    cardType: 'Character', rarity: 'common', unlocks: 'Invites Paolo, a lazy elephant villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-016', cardNumber: '016', name: 'Teddy',    cardType: 'Character', rarity: 'common', unlocks: 'Invites Teddy, a jock bear villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-017', cardNumber: '017', name: 'Portia',   cardType: 'Character', rarity: 'common', unlocks: 'Invites Portia, a snooty dog villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-018', cardNumber: '018', name: 'Peanut',   cardType: 'Character', rarity: 'common', unlocks: 'Invites Peanut, a peppy squirrel villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-019', cardNumber: '019', name: 'Bliss',    cardType: 'Character', rarity: 'common', unlocks: 'Invites Bliss, a normal cub villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-020', cardNumber: '020', name: 'Bunnie',   cardType: 'Character', rarity: 'common', unlocks: 'Invites Bunnie, a peppy rabbit villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-021', cardNumber: '021', name: "O'Hare",   cardType: 'Character', rarity: 'common', unlocks: "Invites O'Hare, a smug rabbit villager, to your Animal Crossing town." },
  { id: 'ac-e-s1-022', cardNumber: '022', name: 'Bill',     cardType: 'Character', rarity: 'common', unlocks: 'Invites Bill, a jock duck villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-023', cardNumber: '023', name: 'Joey',     cardType: 'Character', rarity: 'common', unlocks: 'Invites Joey, a lazy duck villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-024', cardNumber: '024', name: 'Maelle',   cardType: 'Character', rarity: 'common', unlocks: 'Invites Maelle, a snooty duck villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-025', cardNumber: '025', name: 'Biff',     cardType: 'Character', rarity: 'common', unlocks: 'Invites Biff, a jock hippo villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-026', cardNumber: '026', name: 'Lobo',     cardType: 'Character', rarity: 'common', unlocks: 'Invites Lobo, a cranky wolf villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-027', cardNumber: '027', name: 'Rasher',   cardType: 'Character', rarity: 'common', unlocks: 'Invites Rasher, a cranky pig villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-028', cardNumber: '028', name: 'Pigleg',   cardType: 'Character', rarity: 'common', unlocks: 'Invites Pigleg, a cranky pig villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-029', cardNumber: '029', name: 'Rhoda',    cardType: 'Character', rarity: 'common', unlocks: 'Invites Rhoda, a peppy chicken villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-030', cardNumber: '030', name: 'Plucky',   cardType: 'Character', rarity: 'common', unlocks: 'Invites Plucky, a jock chicken villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-031', cardNumber: '031', name: 'Tad',      cardType: 'Character', rarity: 'common', unlocks: 'Invites Tad, a jock frog villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-032', cardNumber: '032', name: 'Drift',    cardType: 'Character', rarity: 'common', unlocks: 'Invites Drift, a jock frog villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-033', cardNumber: '033', name: 'Chevre',   cardType: 'Character', rarity: 'common', unlocks: 'Invites Chevre, a normal goat villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-034', cardNumber: '034', name: 'Bangle',   cardType: 'Character', rarity: 'common', unlocks: 'Invites Bangle, a peppy tiger villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-035', cardNumber: '035', name: 'Rowan',    cardType: 'Character', rarity: 'common', unlocks: 'Invites Rowan, a jock tiger villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-036', cardNumber: '036', name: 'Buck',     cardType: 'Character', rarity: 'common', unlocks: 'Invites Buck, a jock horse villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-037', cardNumber: '037', name: 'Bluebear', cardType: 'Character', rarity: 'common', unlocks: 'Invites Bluebear, a peppy cub villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-038', cardNumber: '038', name: 'June',     cardType: 'Character', rarity: 'common', unlocks: 'Invites June, a normal cub villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-039', cardNumber: '039', name: 'Cheri',    cardType: 'Character', rarity: 'common', unlocks: 'Invites Cheri, a peppy cub villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-040', cardNumber: '040', name: 'Apollo',   cardType: 'Character', rarity: 'common', unlocks: 'Invites Apollo, a cranky eagle villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-041', cardNumber: '041', name: 'Cube',     cardType: 'Character', rarity: 'common', unlocks: 'Invites Cube, a lazy penguin villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-042', cardNumber: '042', name: 'Flash',    cardType: 'Character', rarity: 'common', unlocks: 'Invites Flash, a jock bird villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-043', cardNumber: '043', name: 'Yodel',    cardType: 'Character', rarity: 'common', unlocks: 'Invites Yodel, a lazy horse villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-044', cardNumber: '044', name: 'Faith',    cardType: 'Character', rarity: 'common', unlocks: 'Invites Faith, a normal koala villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-045', cardNumber: '045', name: 'Bud',      cardType: 'Character', rarity: 'common', unlocks: 'Invites Bud, a jock lion villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-046', cardNumber: '046', name: 'Flossie',  cardType: 'Character', rarity: 'common', unlocks: 'Invites Flossie, a normal mouse villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-047', cardNumber: '047', name: 'Pinky',    cardType: 'Character', rarity: 'common', unlocks: 'Invites Pinky, a peppy bear villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-048', cardNumber: '048', name: 'Nibbles',  cardType: 'Character', rarity: 'common', unlocks: 'Invites Nibbles, a peppy squirrel villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-049', cardNumber: '049', name: 'Dotty',    cardType: 'Character', rarity: 'common', unlocks: 'Invites Dotty, a peppy rabbit villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-050', cardNumber: '050', name: 'Scoot',    cardType: 'Character', rarity: 'common', unlocks: 'Invites Scoot, a jock duck villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-051', cardNumber: '051', name: 'Boris',    cardType: 'Character', rarity: 'common', unlocks: 'Invites Boris, a cranky pig villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-052', cardNumber: '052', name: 'Goose',    cardType: 'Character', rarity: 'common', unlocks: 'Invites Goose, a jock chicken villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-053', cardNumber: '053', name: 'Admiral',  cardType: 'Character', rarity: 'common', unlocks: 'Invites Admiral, a cranky bird villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-054', cardNumber: '054', name: 'Kody',     cardType: 'Character', rarity: 'common', unlocks: 'Invites Kody, a jock cub villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-055', cardNumber: '055', name: 'Pierce',   cardType: 'Character', rarity: 'common', unlocks: 'Invites Pierce, a jock eagle villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-056', cardNumber: '056', name: 'Puck',     cardType: 'Character', rarity: 'common', unlocks: 'Invites Puck, a lazy penguin villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-057', cardNumber: '057', name: 'Bones',    cardType: 'Character', rarity: 'common', unlocks: 'Invites Bones, a lazy dog villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-058', cardNumber: '058', name: 'Dora',     cardType: 'Character', rarity: 'common', unlocks: 'Invites Dora, a normal mouse villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-059', cardNumber: '059', name: 'Spike',    cardType: 'Character', rarity: 'common', unlocks: 'Invites Spike, a cranky rhino villager, to your Animal Crossing town.' },
  { id: 'ac-e-s1-060', cardNumber: '060', name: 'Jane',     cardType: 'Character', rarity: 'common', unlocks: 'Invites Jane, a normal gorilla villager, to your Animal Crossing town.' },

  // ── NES Music cards (M01–M04) ────────────────────────────────────────────
  { id: 'ac-e-s1-M01', cardNumber: 'M01', name: 'Only Me',    cardType: 'NES Music', rarity: 'uncommon', unlocks: 'Adds the K.K. Slider song "Only Me" to your music collection in Animal Crossing.' },
  { id: 'ac-e-s1-M02', cardNumber: 'M02', name: 'K.K. Faire', cardType: 'NES Music', rarity: 'uncommon', unlocks: 'Adds the K.K. Slider song "K.K. Faire" to your music collection in Animal Crossing.' },
  { id: 'ac-e-s1-M03', cardNumber: 'M03', name: 'DJ K.K.',    cardType: 'NES Music', rarity: 'uncommon', unlocks: 'Adds the K.K. Slider song "DJ K.K." to your music collection in Animal Crossing.' },
  { id: 'ac-e-s1-M04', cardNumber: 'M04', name: 'Mr. K.K.',   cardType: 'NES Music', rarity: 'uncommon', unlocks: 'Adds the K.K. Slider song "Mr. K.K." to your music collection in Animal Crossing.' },

  // ── NES Classic Game cards (D01–D02) ────────────────────────────────────
  { id: 'ac-e-s1-D01', cardNumber: 'D01', name: 'Shine Sprite',    cardType: 'NES Classic', rarity: 'uncommon', unlocks: 'Unlocks Donkey Kong Jr. as a playable NES game in Animal Crossing.' },
  { id: 'ac-e-s1-D02', cardNumber: 'D02', name: 'Jumpman Mario',   cardType: 'NES Classic', rarity: 'uncommon', unlocks: 'Unlocks Donkey Kong as a playable NES game in Animal Crossing.' },
].map(card => ({
  ...card,
  series: 'Animal Crossing-e Series 1',
  seriesId: 'ac-e-s1',
  region: 'US' as Region,
  regionLocked: false,
  status: null as CardStatus,
  color: '#4A7C59',
  game: 'Animal Crossing',
  image: `${BASE}/150px-Animal_Crossing-e_1-${card.cardNumber}_(${card.name.replace(/ /g, '_')}).jpg`,
  imageBack: `${BASE}/150px-Animal_Crossing-e_1-${card.cardNumber}_(${card.name.replace(/ /g, '_')}_-_Back).jpg`,
}));
