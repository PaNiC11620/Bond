import { Coffee } from '../types/coffee';

export const coffees: Coffee[] = [
  {
    id: 1,
    name: "Арабіка 100% Бразилія",
    description: "Натуральна смажена арабіка преміум класу з Бразилії. Ідеально збалансований смак з нотками темного шоколаду та горіхів.",
    imageUrl: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=800",
    intensity: 7,
    origin: "Бразилія",
    roastLevel: "Середнє обсмажування",
    composition: "Арабіка натуральна смажена 100%",
    details: {
      brewTime: "4-6 хвилин",
      temperature: "85-90°C",
      grindSize: "Зерновий",
      notes: ["Жду назву"],
      price250g: 180,
      price500g: 320,
      price1kg: 580
    }
  },
  {
    id: 2,
    name: "Арабіка 100% Мікс",
    description: "Натуральна смажена арабіка з найкращих плантацій Бразилії та Ефіопії. Багатогранний смак з фруктовими нотками.",
    imageUrl: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=800",
    intensity: 6,
    origin: "Бразилія, Ефіопія",
    roastLevel: "Світле обсмажування",
    composition: "Арабіка натуральна смажена",
    details: {
      brewTime: "4-5 хвилин",
      temperature: "85-88°C",
      grindSize: "Зерновий",
      notes: ["Жду назву"],
      price250g: 190,
      price500g: 340,
      price1kg: 620
    }
  },
  {
    id: 3,
    name: "Арабіка + Робуста Класик",
    description: "Збалансований бленд арабіки та робусти з трьох континентів. Насичений смак з приємною кремовою текстурою.",
    imageUrl: "https://images.pexels.com/photos/1833769/pexels-photo-1833769.jpeg?auto=compress&cs=tinysrgb&w=800",
    intensity: 8,
    origin: "Бразилія, Ефіопія, Індія",
    roastLevel: "Середньо-темне обсмажування",
    composition: "Арабіка натуральна смажена, Робуста натуральна смажена",
    details: {
      brewTime: "3-5 хвилин",
      temperature: "88-92°C",
      grindSize: "Зерновий",
      notes: ["Жду назву"],
      price250g: 160,
      price500g: 280,
      price1kg: 520
    }
  },
  {
    id: 4,
    name: "Арабіка + Робуста Африка",
    description: "Потужний бленд з африканськими нотками. Високий вміст кофеїну та насичений смак з відтінками какао.",
    imageUrl: "https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=800",
    intensity: 9,
    origin: "Бразилія, Ефіопія, Уганда",
    roastLevel: "Темне обсмажування",
    composition: "Арабіка натуральна смажена, Робуста натуральна смажена",
    details: {
      brewTime: "3-4 хвилини",
      temperature: "90-95°C",
      grindSize: "Зерновий",
      notes: ["Жду назву"],
      price250g: 170,
      price500g: 300,
      price1kg: 550
    }
  },
  {
    id: 5,
    name: "Арабіка + Робуста Індія",
    description: "Екзотичний бленд з індійськими нотками. М'який смак з приємною гіркотою та довгим післясмаком.",
    imageUrl: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=800",
    intensity: 7,
    origin: "Бразилія, Індія",
    roastLevel: "Середнє обсмажування",
    composition: "Арабіка натуральна смажена, Робуста натуральна смажена",
    details: {
      brewTime: "4-5 хвилин",
      temperature: "87-90°C",
      grindSize: "Зерновий",
      notes: ["Жду назву"],
      price250g: 165,
      price500g: 290,
      price1kg: 530
    }
  },
  {
    id: 6,
    name: "Арабіка + Робуста Преміум",
    description: "Преміальний бленд з найкращих плантацій світу. Складний багатогранний смак для справжніх гурманів.",
    imageUrl: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=800",
    intensity: 8,
    origin: "Ефіопія, Бразилія, Індія",
    roastLevel: "Середньо-темне обсмажування",
    composition: "Арабіка натуральна смажена, Робуста натуральна смажена",
    details: {
      brewTime: "4-6 хвилин",
      temperature: "88-92°C",
      grindSize: "Зерновий",
      notes: ["Жду назву"],
      price250g: 200,
      price500g: 360,
      price1kg: 680
    }
  },
  {
    id: 7,
    name: "Арабіка + Робуста Уганда",
    description: "Унікальний африканський бленд з яскравими фруктовими нотками. Середня міцність з приємною кислинкою.",
    imageUrl: "https://images.pexels.com/photos/1833769/pexels-photo-1833769.jpeg?auto=compress&cs=tinysrgb&w=800",
    intensity: 6,
    origin: "Уганда, Ефіопія",
    roastLevel: "Світле обсмажування",
    composition: "Арабіка натуральна смажена, Робуста натуральна смажена",
    details: {
      brewTime: "4-5 хвилин",
      temperature: "85-88°C",
      grindSize: "Середній помел",
      notes: ["Червоні ягоди", "Цитрус", "Квіткові"],
      price250g: 175,
      price500g: 310,
      price1kg: 570
    }
  },
  {
    id: 8,
    name: "Арабіка 100% Ефіопія",
    description: "Натуральна смажена арабіка з батьківщини кави - Ефіопії. Яскравий фруктовий смак з винними нотками.",
    imageUrl: "https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=800",
    intensity: 5,
    origin: "Ефіопія",
    roastLevel: "Світле обсмажування",
    composition: "Арабіка натуральна смажена 100%",
    details: {
      brewTime: "4-6 хвилин",
      temperature: "85-90°C",
      grindSize: "Середній помел",
      notes: ["Червоне вино", "Ягоди", "Цитрус"],
      price250g: 210,
      price500g: 380,
      price1kg: 720
    }
  }
];