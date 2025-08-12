import { Coffee } from '../types/coffee';

export const coffees: Coffee[] = [
  {
    id: 1,
    name: "Арабіка (70% + 30%)",
    description: "Натуральна смажена арабіка преміум класу з Бразилії. Ідеально збалансований смак з нотками темного шоколаду та горіхів.",
    imageUrl: "/images/black.jpg",
    intensity: 7,
    origin: "Бразилія, Ефіопія",
    roastLevel: "Середнє обсмажування",
    composition: "Арабіка натуральна смажена 100%",
    details: {
      brewTime: "4-6 хвилин",
      temperature: "85-90°C",
      grindSize: "Зерновий",
      notes: ["Жду назву"],
      price250g: 180,
      price500g: 370,
      price1kg: 670
    }
  },
  {
    id: 2,
    name: "Арабіка 100%",
    description: "Натуральна смажена арабіка з найкращих плантацій Бразилії та Ефіопії. Багатогранний смак з фруктовими нотками.",
    imageUrl: "/images/brown.jpg",
    intensity: 6,
    origin: "Ефіопія",
    roastLevel: "Світле обсмажування",
    composition: "Арабіка натуральна смажена",
    details: {
      brewTime: "4-5 хвилин",
      temperature: "85-88°C",
      grindSize: "Зерновий",
      notes: ["Жду назву"],
      price250g: 180,
      price500g: 360,
      price1kg: 640
    }
  },
  {
    id: 3,
    name: "Арабіка 100%",
    description: "Збалансований бленд арабіки та робусти з трьох континентів. Насичений смак з приємною кремовою текстурою.",
    imageUrl: "/images/white.jpg",
    intensity: 8,
    origin: "Бразилія",
    roastLevel: "Середньо-темне обсмажування",
    composition: "Арабіка натуральна смажена, Робуста натуральна смажена",
    details: {
      brewTime: "3-5 хвилин",
      temperature: "88-92°C",
      grindSize: "Зерновий",
      notes: ["Жду назву"],
      price250g: 190,
      price500g: 380,
      price1kg: 700
    }
  },
  {
    id: 4,
    name: "Купаж (40% + 40% + 20%)",
    description: "Потужний бленд з африканськими нотками. Високий вміст кофеїну та насичений смак з відтінками какао.",
    imageUrl: "/images/gold.jpg",
    intensity: 9,
    origin: "Бразилія, Ефіопія, Індія",
    roastLevel: "Темне обсмажування",
    composition: "Арабіка натуральна смажена, Робуста натуральна смажена",
    details: {
      brewTime: "3-4 хвилини",
      temperature: "90-95°C",
      grindSize: "Зерновий",
      notes: ["Жду назву"],
      price250g: 180,
      price500g: 360,
      price1kg: 640
    }
  },
  {
    id: 5,
    name: "Купаж (50% + 50%)",
    description: "Екзотичний бленд з індійськими нотками. М'який смак з приємною гіркотою та довгим післясмаком.",
    imageUrl: "/images/silver.jpg",
    intensity: 7,
    origin: "Бразилія, Індія",
    roastLevel: "Середнє обсмажування",
    composition: "Арабіка натуральна смажена, Робуста натуральна смажена",
    details: {
      brewTime: "4-5 хвилин",
      temperature: "87-90°C",
      grindSize: "Зерновий",
      notes: ["Жду назву"],
      price250g: 170,
      price500g: 360,
      price1kg: 620
    }
  },
  {
    id: 6,
    name: "Купаж (10% + 10% + 80%)",
    description: "Преміальний бленд з найкращих плантацій світу. Складний багатогранний смак для справжніх гурманів.",
    imageUrl: "/images/red.jpg",
    intensity: 8,
    origin: "Бразилія, Ефіопія, Індія",
    roastLevel: "Середньо-темне обсмажування",
    composition: "Арабіка натуральна смажена, Робуста натуральна смажена",
    details: {
      brewTime: "4-6 хвилин",
      temperature: "88-92°C",
      grindSize: "Зерновий",
      notes: ["Жду назву"],
      price250g: 160,
      price500g: 330,
      price1kg: 600
    }
  },
  {
    id: 7,
    name: "Купаж (70% + 30%)",
    description: "Унікальний африканський бленд з яскравими фруктовими нотками. Середня міцність з приємною кислинкою.",
    imageUrl: "/images/craft.jpg",
    intensity: 6,
    origin: "Уганда, Ефіопія",
    roastLevel: "Світле обсмажування",
    composition: "Арабіка натуральна смажена, Робуста натуральна смажена",
    details: {
      brewTime: "4-5 хвилин",
      temperature: "85-88°C",
      grindSize: "Середній помел",
      notes: ["Жду назву"],
      price250g: 170,
      price500g: 330,
      price1kg: 600
    },
  }
];