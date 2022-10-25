import dayjs from "dayjs";

const mocks = {
  names: [
    "Filippo",
    "Simone",
    "Matteo",
    "Federica",
    "Nora",
    "Francesco",
    "Michele",
    "Mastro Don Gesualdo",
    "Giuseppe",
    "Francesca",
    "Jonny",
    "Gaetano",
    "Luca",
    "Federico",
    "Carlo",
  ],
  surnames: [
    "Partesano",
    "Spartà",
    "Vinci",
    "Annaro",
    "Rossi",
    "Verdi",
    "Spanò",
    "Tedesco",
    "Crisafulli",
    "Conigli",
    "Castelli",
    "Grasso",
    "Leonardi",
  ],
  emails: [
    "federico.partesano@paradimga.me",
    "simone.spartà@paradigma.me",
    "matteo.vinci@paradigma.me",
    "matteo.annaro@paradigma.me",
    "mario.rossi@paradigma.me",
    "filippo.verdi@paradigma.me",
    "carlo.leonardi@paradigma.me",
    "francesca.tedesco@paradigma.me",
    "gaetano.crisafulli@paradigma.me",
    "ettore.conigli@paradigma.me",
    "sebastiano.castelli@paradigma.me",
    "giuseppe.grasso@paradigma.me",
    "achille.peleo@paradigma.me",
  ],
  sector: ["frontend", "backend", "full-stack"],
  skills: ["Angular js", "React js", "Vue js"],
  namesTeam: [
    "Nutribees",
    "Kleos",
    "Conad",
    "Rai",
    "Manitese",
    "Poket",
    "Beintoo",
    "Tanaza",
    "Telepass",
    "Leonardo",
  ],
} as const;

export const getRandomArbitraryInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const getRandomData = (type: keyof typeof mocks) =>
  mocks[type][getRandomArbitraryInt(0, mocks[type].length - 1)];
export const getRandomDate = () =>
  dayjs()
    .add(-getRandomArbitraryInt(0, 40), "years")
    .add(-getRandomArbitraryInt(0, 12), "months")
    .add(-getRandomArbitraryInt(0, 28), "days")
    .toDate().getTime();
