export const PRODUCTS = [
  {
    id: 1,
    name: "Наушники Pro X1",
    category: "Электроника",
    price: 12990,
    oldPrice: 18990,
    rating: 4.9,
    reviews: 234,
    tag: "Хит",
    tagColor: "from-purple-500 to-pink-500",
    image: "https://cdn.poehali.dev/projects/6db349be-3d8c-46a1-9f42-c4c23b8d408f/files/8492eaa1-a2f0-428f-8ef6-06f66962f058.jpg",
    description: "Премиальные беспроводные наушники с активным шумоподавлением, 40 часов работы и Hi-Fi звуком. Складная конструкция из алюминия и мягкой кожи.",
    specs: ["Bluetooth 5.3", "ANC -35 дБ", "40 ч батарея", "Hi-Res Audio"],
    colors: ["#9333ea", "#ec4899", "#1d4ed8"],
  },
  {
    id: 2,
    name: "Кроссовки Neon Run",
    category: "Обувь",
    price: 8490,
    oldPrice: null,
    rating: 4.7,
    reviews: 182,
    tag: "Новинка",
    tagColor: "from-blue-500 to-cyan-500",
    image: "https://cdn.poehali.dev/projects/6db349be-3d8c-46a1-9f42-c4c23b8d408f/files/246ddefc-3ca6-4969-af0e-78bb7beed5e7.jpg",
    description: "Лёгкие беговые кроссовки с технологией Energy Return. Дышащий сетчатый верх и амортизирующая подошва для максимального комфорта.",
    specs: ["Вес 245 г", "Energy Return", "Сетчатый верх", "Размеры 36–47"],
    colors: ["#1d4ed8", "#0891b2", "#111827"],
  },
  {
    id: 3,
    name: "SmartWatch Ultra",
    category: "Электроника",
    price: 24990,
    oldPrice: 34990,
    rating: 4.8,
    reviews: 412,
    tag: "Скидка 28%",
    tagColor: "from-orange-500 to-pink-500",
    image: "https://cdn.poehali.dev/projects/6db349be-3d8c-46a1-9f42-c4c23b8d408f/files/d64dffd8-bc17-4099-84a8-0795a7a278df.jpg",
    description: "Умные часы с AMOLED-экраном 2.0\", GPS, мониторингом ЧСС и кислорода в крови. Защита IP68, до 7 дней без зарядки.",
    specs: ["AMOLED 2.0\"", "GPS + ГЛОНАСС", "IP68 защита", "7 дней батарея"],
    colors: ["#111827", "#9333ea", "#b45309"],
  },
  {
    id: 4,
    name: "Объектив 50mm f/1.4",
    category: "Фото",
    price: 31500,
    oldPrice: null,
    rating: 4.95,
    reviews: 89,
    tag: "Топ",
    tagColor: "from-emerald-500 to-cyan-500",
    image: "https://cdn.poehali.dev/projects/6db349be-3d8c-46a1-9f42-c4c23b8d408f/files/fe0ada5b-ae36-44bd-ba53-055b6569ee15.jpg",
    description: "Легендарный портретный объектив с диафрагмой f/1.4. Мягкое боке, резкий центр и быстрый автофокус. Для полнокадровых камер.",
    specs: ["ФР 50 мм", "f/1.4 диафрагма", "9 лепестков", "Вес 330 г"],
    colors: ["#111827", "#374151"],
  },
  {
    id: 5,
    name: "Наушники Lite Z",
    category: "Электроника",
    price: 4990,
    oldPrice: 6990,
    rating: 4.5,
    reviews: 310,
    tag: "Хит",
    tagColor: "from-purple-500 to-pink-500",
    image: "https://cdn.poehali.dev/projects/6db349be-3d8c-46a1-9f42-c4c23b8d408f/files/8492eaa1-a2f0-428f-8ef6-06f66962f058.jpg",
    description: "Доступные беспроводные наушники с отличным звуком. Лёгкая складная конструкция, 20 часов работы и встроенный микрофон для звонков.",
    specs: ["Bluetooth 5.0", "20 ч батарея", "Микрофон", "Складные"],
    colors: ["#111827", "#ec4899", "#9333ea"],
  },
  {
    id: 6,
    name: "Кроссовки Speed Pro",
    category: "Обувь",
    price: 11990,
    oldPrice: 15990,
    rating: 4.6,
    reviews: 95,
    tag: "Скидка 25%",
    tagColor: "from-orange-500 to-pink-500",
    image: "https://cdn.poehali.dev/projects/6db349be-3d8c-46a1-9f42-c4c23b8d408f/files/246ddefc-3ca6-4969-af0e-78bb7beed5e7.jpg",
    description: "Профессиональные кроссовки для скоростного бега. Карбоновая пластина и реактивная пена обеспечивают рекордный возврат энергии.",
    specs: ["Карбон", "Reactive Foam", "Перепад 8 мм", "Размеры 38–47"],
    colors: ["#ea580c", "#111827", "#1d4ed8"],
  },
];

export const CATEGORIES = ["Все", "Электроника", "Обувь", "Фото"];

export const NAV_ITEMS = [
  { icon: "Home", label: "Главная" },
  { icon: "Grid2X2", label: "Каталог" },
  { icon: "Heart", label: "Избранное" },
  { icon: "ShoppingCart", label: "Корзина" },
  { icon: "User", label: "Профиль" },
];

export const ORDER_HISTORY = [
  { id: "NE-4821", date: "12 апр 2026", total: 37980, status: "Доставлен", statusColor: "text-emerald-400", items: 3 },
  { id: "NE-4609", date: "28 мар 2026", total: 12990, status: "В пути", statusColor: "text-blue-400", items: 1 },
  { id: "NE-4201", date: "5 мар 2026", total: 8490, status: "Доставлен", statusColor: "text-emerald-400", items: 1 },
];

export type Product = (typeof PRODUCTS)[number];

export function formatPrice(p: number) {
  return p.toLocaleString("ru-RU") + " ₽";
}
