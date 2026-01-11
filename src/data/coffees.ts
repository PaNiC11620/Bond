import { Coffee } from '../types/coffee';

export const coffees: Coffee[] = [
  {
    id: 1,
    name: "Арабіка",
    description: "Збалансований кавовий купаж, у якому м’яка солодкість Бразилії домінує та створює основу, а яскрава Ефіопія додає складності й ароматичної виразності.",
    imageUrl: "/images/black.jpg",
    intensity: 7,
    origin: "Бразилія, Ефіопія",
    roastLevel: "Середнє обсмажування",
    composition: "Зерна кави смажені натуральні, без домішок, 100% арабіка",
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
    description: "Кава з помірною кислинкою та натуральними нотками какао.",
    imageUrl: "/images/brown.jpg",
    intensity: 9,
    origin: "Ефіопія (регіон Джима)",
    roastLevel: "Темне обсмажування",
    composition: "Кава натуральна смажена в зернах, 100% арабіка",
    details: {
      brewTime: "4-6 хвилин",
      temperature: "85-90°C",
      grindSize: "Зерновий",
      notes: ["М'який чистий смак"],
      price250g: 180,
      price500g: 410,
      price1kg: 710
    }
  },
  {
    id: 3,
    name: "Арабіка",
    description: "Кава з ніжною солодкістю та шоколадно-горіховими нотами.",
    imageUrl: "/images/white.jpg",
    intensity: 10,
    origin: "Бразилія",
    roastLevel: "Темне обсмажування",
    composition: "Кава натуральна смажена в зернах, 100% арабіка",
    details: {
      brewTime: "4-6 хвилин",
      temperature: "85-90°C",
      grindSize: "Зерновий",
      notes: ["З помірною кислникою"],
      price250g: 190,
      price500g: 430,
      price1kg: 750
    }
  },
  {
    id: 4,
    name: "Арабіка/Робуста",
    description: "Купаж арабіки та робусти: шоколад, горіхи, фруктові відтінки, щільна крема.",
    imageUrl: "/images/gold.jpg",
    intensity: 7,
    origin: "Бразилія, Ефіопія, Індія",
    roastLevel: "Середнє обсмажування",
    composition: "Кава натуральна смажена в зернах, купаж арабіки та робусти",
    details: {
      brewTime: "5-7 хвилини",
      temperature: "90-95°C",
      grindSize: "Зерновий",
      notes: ["Шоколадно-горіховий з фруктовою ноткою"],
      price250g: 180,
      price500g: 410,
      price1kg: 710
    }
  },
  {
    id: 5,
    name: "Бленд",
    description: "Екзотичний бленд арабіки з Гондурасу та Ефіопії.",
    imageUrl: "/images/silver.jpg",
    intensity: 7,
    origin: "Гондурас, Ефіопія",
    roastLevel: "Середнє обсмажування",
    composition: "Бленд: Гондурас та Ефіопія",
    details: {
      brewTime: "4-5 хвилин",
      temperature: "87-90°C",
      grindSize: "Зерновий",
      notes: ["М'який шоколад, солодкі горіхи та яскраві фруктові нотки"],
      price250g: 170,
      price500g: 390,
      price1kg: 690
    }
  },
  {
    id: 6,
    name: "Купаж",
    description: "Насичений яскравий із щільною кремою.",
    imageUrl: "/images/red.jpg",
    intensity: 8,
    origin: "Бразилія, Ефіопія, Індія",
    roastLevel: "Середнє обсмажування",
    composition: "Індія (робуста), Бразилія та Ефіопія (арабіка)",
    details: {
      brewTime: "4-6 хвилин",
      temperature: "80-90°C",
      grindSize: "Зерновий",
      notes: ["Шоколад, горіхи, легка фруктова кислинка"],
      price250g: 160,
      price500g: 380,
      price1kg: 670
    }
  },
  {
    id: 7,
    name: "Купаж",
    description: "Щільний та насичений купаж з м'якою гірчинкою шоколаду та легкими фруктово-квітковими нотками.",
    imageUrl: "/images/craft.jpg",
    intensity: 6,
    origin: "Уганда, Ефіопія",
    roastLevel: "Середнє обсмажування",
    composition: "Уганда (робуста) та Ефіопія (арабіка)",
    details: {
      brewTime: "4-5 хвилин",
      temperature: "85-88°C",
      grindSize: "Зерновий",
      notes: ["Шоколадна гірчинка від робусти"],
      price250g: 170,
      price500g: 380,
      price1kg: 670
    },
  },
  {
    id: 9,
    name: "Арабіка",
    description: "Ідеальна кава для ранкового бадьорого старту або спокійного вечора.",
    imageUrl: "/images/black.jpg",
    intensity: 10,
    origin: "Гондурас",
    roastLevel: "Темне обсмажування",
    composition: "Арібка 100% з Гондурасу ",
    details: {
      brewTime: "5-7 хвилин",
      temperature: "85-90°C",
      grindSize: "Зерновий",
      notes: ["Шоколад, горіхи, легка солодкість та м'яка кислинка"],
      price250g: 180,
      price500g: 430,
      price1kg: 750
    }
  },
  {
    id: 10,
    name: "Бленд арабіки та робусти",
    description: "Насичений збалансований бленд: м'яка шоколадно-горіхова солодкість Бразилії, поєднується з легкою гірчинкою Індії",
    imageUrl: "/images/silver.jpg",
    intensity: 8,
    origin: "Бразилія, Індія",
    roastLevel: "Середнє обсмажування",
    composition: "Бразилія (арабіка) та Індія (робуста)",
    details: {
      brewTime: "4-5 хвилин",
      temperature: "87-90°C",
      grindSize: "Зерновий",
      notes: ["Шоколад, горіхи, легка гірчинка та стійка крема"],
      price250g: 170,
      price500g: 420,
      price1kg: 740
    }
  },
];