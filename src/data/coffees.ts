import { Coffee } from '../types/coffee';

export const coffees: Coffee[] = [
  {
    id: 1,
    name: "Арабіка",
    description: "Натуральна смажена арабіка преміум класу з Бразилії та Ефіопії. Ідеально збалансований м'який смак.",
    imageUrl: "/images/black.jpg",
    intensity: 7,
    origin: "Бразилія, Ефіопія",
    roastLevel: "Середнє обсмажування",
    composition: "70% Бразилія та 30% Ефіопія",
    details: {
      brewTime: "4-6 хвилин",
      temperature: "85-90°C",
      grindSize: "Зерновий",
      notes: ["Теплі"],
      price250g: 180,
      price500g: 420,
      price1kg: 740
    }
  },
  {
    id: 2,
    name: "Арабіка",
    description: "Натуральна смажена арабіка з найкращих плантацій Ефіопії.",
    imageUrl: "/images/brown.jpg",
    intensity: 9,
    origin: "Ефіопія",
    roastLevel: "Темне обсмажування",
    composition: "100% Ефіопія",
    details: {
      brewTime: "4-6 хвилин",
      temperature: "85-90°C",
      grindSize: "Зерновий",
      notes: ["Ідеальна для еспресо"],
      price250g: 180,
      price500g: 410,
      price1kg: 710
    }
  },
  {
    id: 3,
    name: "Арабіка 100%",
    description: "Натуральна смажена арабіка з найкращих плантацій Бразилії.",
    imageUrl: "/images/white.jpg",
    intensity: 10,
    origin: "Бразилія",
    roastLevel: "Темне обсмажування",
    composition: "100% Бразилія",
    details: {
      brewTime: "4-6 хвилин",
      temperature: "85-90°C",
      grindSize: "Зерновий",
      notes: ["Ідеальна для еспресо з кислникою"],
      price250g: 190,
      price500g: 430,
      price1kg: 750
    }
  },
  {
    id: 4,
    name: "Купаж (40% + 40% + 20%)",
    description: "Потужний бленд з африканськими, бразильськми та індійськими нотками.",
    imageUrl: "/images/gold.jpg",
    intensity: 7,
    origin: "Бразилія, Ефіопія, Індія",
    roastLevel: "Середнє обсмажування",
    composition: "40% Бразилія, 40% Ефіопія та 20% Індія",
    details: {
      brewTime: "5-7 хвилини",
      temperature: "90-95°C",
      grindSize: "Зерновий",
      notes: ["Легкий та м'який смак"],
      price250g: 180,
      price500g: 410,
      price1kg: 710
    }
  },
  {
    id: 5,
    name: "Купаж",
    description: "Екзотичний бленд з поєднанням індійських та бразильських культур.",
    imageUrl: "/images/silver.jpg",
    intensity: 7,
    origin: "Бразилія, Індія",
    roastLevel: "Середнє обсмажування",
    composition: "50% Бразилія та 50% Ефіопія",
    details: {
      brewTime: "4-5 хвилин",
      temperature: "87-90°C",
      grindSize: "Зерновий",
      notes: ["Поєднання індійської теплоти та бразильської гірчинки"],
      price250g: 170,
      price500g: 390,
      price1kg: 690
    }
  },
  {
    id: 6,
    name: "Купаж",
    description: "Преміальний бленд з найкращих плантацій світу.",
    imageUrl: "/images/red.jpg",
    intensity: 8,
    origin: "Бразилія, Ефіопія, Індія",
    roastLevel: "Середньо обсмажування",
    composition: "10% Бразилія, 10% Ефіопія та 80% Індія",
    details: {
      brewTime: "4-6 хвилин",
      temperature: "80-90°C",
      grindSize: "Зерновий",
      notes: ["Складний багатогранний смак для справжніх гурманів"],
      price250g: 160,
      price500g: 380,
      price1kg: 670
    }
  },
  {
    id: 7,
    name: "Купаж",
    description: "Унікальний африканський бленд. Середня міцність.",
    imageUrl: "/images/craft.jpg",
    intensity: 6,
    origin: "Уганда, Ефіопія",
    roastLevel: "Середнє обсмажування",
    composition: "70% Уганда та 30% Ефіопія",
    details: {
      brewTime: "4-5 хвилин",
      temperature: "85-88°C",
      grindSize: "Зерновий",
      notes: ["Яскравий м'який смак"],
      price250g: 170,
      price500g: 380,
      price1kg: 670
    },
  },
  {
    id: 8,
    name: "Купаж",
    description: "Поєднання теплих смаків Африки та Бразилії.",
    imageUrl: "/images/Aqua.png",
    intensity: 6,
    origin: "Бразилія, Ефіопія, Уганда",
    roastLevel: "Середнє обсмажування",
    composition: "30% Бразилія, 30% Ефіопія та 40% Уганда",
    details: {
      brewTime: "4-5 хвилин",
      temperature: "85-88°C",
      grindSize: "Зерновий",
      notes: ["М'який та приємний смак кави"],
      price250g: 170,
      price500g: 400,
      price1kg: 690
    },
  },
  {
    id: 9,
    name: "Арабіка",
    description: "Натуральна смажена арабіка преміум клас. Походження Гондурасу.",
    imageUrl: "/images/black.jpg",
    intensity: 10,
    origin: "Гондурас",
    roastLevel: "Темне обсмажування",
    composition: "100% Гондурас",
    details: {
      brewTime: "5-7 хвилин",
      temperature: "85-90°C",
      grindSize: "Зерновий",
      notes: ["Міцна кава"],
      price250g: 180,
      price500g: 430,
      price1kg: 750
    }
  },
  {
    id: 10,
    name: "Купаж",
    description: "Поєднанням африканських та бразильських культур.",
    imageUrl: "/images/silver.jpg",
    intensity: 8,
    origin: "Гондурас, Ефіопія",
    roastLevel: "Середнє обсмажування",
    composition: "50% Гондурас та 50% Ефіопія",
    details: {
      brewTime: "4-5 хвилин",
      temperature: "87-90°C",
      grindSize: "Зерновий",
      notes: ["Поєднання класичної арабіки та м'якої нотки Ефіопії"],
      price250g: 170,
      price500g: 420,
      price1kg: 740
    }
  },
];