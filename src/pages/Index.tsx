import { useState, useMemo } from "react";
import Icon from "@/components/ui/icon";

const PRODUCTS = [
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

const CATEGORIES = ["Все", "Электроника", "Обувь", "Фото"];

const NAV_ITEMS = [
  { icon: "Home", label: "Главная" },
  { icon: "Grid2X2", label: "Каталог" },
  { icon: "Heart", label: "Избранное" },
  { icon: "ShoppingCart", label: "Корзина" },
  { icon: "User", label: "Профиль" },
];

function formatPrice(p: number) {
  return p.toLocaleString("ru-RU") + " ₽";
}

type Product = (typeof PRODUCTS)[number];

function ProductDetail({
  product,
  onBack,
  liked,
  onToggleLike,
  cart,
  onToggleCart,
}: {
  product: Product;
  onBack: () => void;
  liked: number[];
  onToggleLike: (id: number) => void;
  cart: number[];
  onToggleCart: (id: number) => void;
}) {
  const [selectedColor, setSelectedColor] = useState(0);
  const inCart = cart.includes(product.id);
  const isLiked = liked.includes(product.id);
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  return (
    <div
      className="fixed inset-0 bg-background flex flex-col animate-slide-up"
      style={{ zIndex: 50, maxWidth: 430, margin: "0 auto" }}
    >
      {/* Image area */}
      <div className="relative flex-shrink-0" style={{ height: 360 }}>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 40%, hsl(var(--background)) 100%)",
          }}
        />
        {/* Top controls */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-12">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl glass flex items-center justify-center transition-transform active:scale-90"
          >
            <Icon name="ArrowLeft" size={20} className="text-white" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => onToggleLike(product.id)}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center transition-transform active:scale-90"
            >
              <Icon
                name="Heart"
                size={18}
                className={isLiked ? "text-pink-500 fill-pink-500" : "text-white"}
              />
            </button>
            <button className="w-10 h-10 rounded-xl glass flex items-center justify-center transition-transform active:scale-90">
              <Icon name="Share2" size={18} className="text-white" />
            </button>
          </div>
        </div>
        {/* Tag */}
        <span
          className={`absolute top-14 left-5 mt-2 text-[11px] font-bold text-white px-3 py-1 rounded-xl bg-gradient-to-r ${product.tagColor}`}
        >
          {product.tag}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-2 pb-32" style={{ marginTop: -24 }}>
        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-1">{product.category}</p>
        <h2 className="text-2xl font-black text-foreground leading-tight mb-3">{product.name}</h2>

        {/* Rating row */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl" style={{ background: "hsl(var(--secondary))" }}>
            <Icon name="Star" size={13} className="text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-bold text-foreground">{product.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">{product.reviews} отзывов</span>
          <span className="ml-auto text-xs font-semibold text-emerald-400 flex items-center gap-1">
            <Icon name="Check" size={12} />
            В наличии
          </span>
        </div>

        {/* Color selector */}
        {product.colors.length > 1 && (
          <div className="mb-5">
            <p className="text-sm font-semibold text-foreground mb-2">Цвет</p>
            <div className="flex gap-2.5">
              {product.colors.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(idx)}
                  className="w-8 h-8 rounded-full transition-transform active:scale-90 flex-shrink-0"
                  style={{
                    background: color,
                    outline: selectedColor === idx ? "2px solid hsl(var(--primary))" : "2px solid transparent",
                    outlineOffset: 2,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="mb-5">
          <p className="text-sm font-semibold text-foreground mb-2">О товаре</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
        </div>

        {/* Specs */}
        <div className="mb-5">
          <p className="text-sm font-semibold text-foreground mb-2">Характеристики</p>
          <div className="grid grid-cols-2 gap-2">
            {product.specs.map((spec) => (
              <div
                key={spec}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                style={{ background: "hsl(var(--secondary))" }}
              >
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "hsl(var(--primary))" }} />
                <span className="text-xs font-medium text-foreground">{spec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews preview */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-foreground">Отзывы</p>
            <button className="text-xs font-semibold gradient-text">Все отзывы →</button>
          </div>
          <div className="p-3 rounded-2xl" style={{ background: "hsl(var(--secondary))" }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-full gradient-bg flex items-center justify-center text-[11px] font-bold text-white">А</div>
              <span className="text-sm font-semibold text-foreground">Алексей</span>
              <div className="ml-auto flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Icon key={s} name="Star" size={10} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Отличный товар, превзошёл все ожидания. Качество на высоте, доставка быстрая. Рекомендую!
            </p>
          </div>
        </div>
      </div>

      {/* Bottom buy bar */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full glass px-5 py-4"
        style={{
          maxWidth: 430,
          borderTop: "1px solid hsl(var(--border))",
          paddingBottom: "env(safe-area-inset-bottom, 16px)",
          zIndex: 60,
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xl font-black gradient-text leading-none">{formatPrice(product.price)}</p>
            {product.oldPrice && (
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-xs text-muted-foreground line-through">{formatPrice(product.oldPrice)}</p>
                <span className="text-[10px] font-bold text-emerald-400">−{discount}%</span>
              </div>
            )}
          </div>
          <button
            onClick={() => onToggleCart(product.id)}
            className="flex-1 py-3 rounded-2xl font-bold text-sm text-white transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
            style={{
              background: inCart
                ? "hsl(var(--secondary))"
                : "linear-gradient(135deg, hsl(280,100%,65%), hsl(315,100%,60%))",
            }}
          >
            <Icon name={inCart ? "Check" : "ShoppingCart"} size={16} className="text-white" />
            {inCart ? "В корзине" : "В корзину"}
          </button>
        </div>
      </div>
    </div>
  );
}

function CartScreen({
  cart,
  onToggleCart,
  quantities,
  onChangeQty,
}: {
  cart: number[];
  onToggleCart: (id: number) => void;
  quantities: Record<number, number>;
  onChangeQty: (id: number, delta: number) => void;
}) {
  const cartProducts = PRODUCTS.filter((p) => cart.includes(p.id));
  const total = cartProducts.reduce((sum, p) => sum + p.price * (quantities[p.id] ?? 1), 0);
  const [ordered, setOrdered] = useState(false);

  if (ordered) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-8 animate-fade-up">
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6 animate-pulse-glow"
          style={{ background: "linear-gradient(135deg, hsl(280,100%,65%), hsl(315,100%,60%))" }}
        >
          <Icon name="CheckCheck" size={44} className="text-white" />
        </div>
        <h2 className="text-2xl font-black text-foreground mb-2 text-center">Заказ оформлен!</h2>
        <p className="text-sm text-muted-foreground text-center leading-relaxed mb-8">
          Ваш заказ принят и передан в обработку. Мы свяжемся с вами в ближайшее время.
        </p>
        <button
          onClick={() => setOrdered(false)}
          className="px-8 py-3 rounded-2xl font-bold text-sm text-white gradient-bg active:scale-95 transition-transform"
        >
          Вернуться в каталог
        </button>
      </div>
    );
  }

  if (cartProducts.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-8 animate-fade-up">
        <div className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6" style={{ background: "hsl(var(--secondary))" }}>
          <Icon name="ShoppingCart" size={40} className="text-muted-foreground" />
        </div>
        <h2 className="text-xl font-black text-foreground mb-2">Корзина пуста</h2>
        <p className="text-sm text-muted-foreground text-center">Добавьте товары из каталога, чтобы оформить заказ</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-40">
        <div className="flex flex-col gap-3">
          {cartProducts.map((product, i) => {
            const qty = quantities[product.id] ?? 1;
            return (
              <div
                key={product.id}
                className="flex gap-3 p-3 rounded-2xl animate-fade-up"
                style={{ animationDelay: `${0.06 * i}s`, opacity: 0, background: "hsl(var(--card))" }}
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-muted-foreground font-medium mb-0.5">{product.category}</p>
                  <p className="text-sm font-bold text-foreground leading-tight mb-1 truncate">{product.name}</p>
                  <p className="text-base font-black gradient-text mb-2">{formatPrice(product.price * qty)}</p>
                  <div className="flex items-center justify-between">
                    {/* Qty control */}
                    <div className="flex items-center gap-2 rounded-xl px-2 py-1" style={{ background: "hsl(var(--secondary))" }}>
                      <button
                        onClick={() => qty > 1 ? onChangeQty(product.id, -1) : onToggleCart(product.id)}
                        className="w-6 h-6 rounded-lg flex items-center justify-center transition-transform active:scale-90"
                        style={{ background: qty === 1 ? "hsla(0,80%,55%,0.15)" : "hsl(var(--muted))" }}
                      >
                        <Icon name={qty === 1 ? "Trash2" : "Minus"} size={12} className={qty === 1 ? "text-red-400" : "text-foreground"} />
                      </button>
                      <span className="text-sm font-bold text-foreground w-4 text-center">{qty}</span>
                      <button
                        onClick={() => onChangeQty(product.id, 1)}
                        className="w-6 h-6 rounded-lg flex items-center justify-center transition-transform active:scale-90"
                        style={{ background: "linear-gradient(135deg, hsl(280,100%,65%), hsl(315,100%,60%))" }}
                      >
                        <Icon name="Plus" size={12} className="text-white" />
                      </button>
                    </div>
                    {product.oldPrice && (
                      <span className="text-[10px] text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Promo */}
        <div className="mt-4 flex gap-2">
          <div
            className="flex-1 flex items-center gap-2 px-4 py-3 rounded-2xl"
            style={{ background: "hsl(var(--secondary))" }}
          >
            <Icon name="Tag" size={15} className="text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              placeholder="Промокод"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>
          <button
            className="px-5 py-3 rounded-2xl font-bold text-sm text-white transition-transform active:scale-95"
            style={{ background: "linear-gradient(135deg, hsl(280,100%,65%), hsl(315,100%,60%))" }}
          >
            OK
          </button>
        </div>

        {/* Summary */}
        <div className="mt-4 p-4 rounded-2xl" style={{ background: "hsl(var(--card))" }}>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">Товары ({cartProducts.length})</span>
            <span className="text-sm font-semibold text-foreground">{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">Доставка</span>
            <span className="text-sm font-semibold text-emerald-400">Бесплатно</span>
          </div>
          <div className="h-px my-3" style={{ background: "hsl(var(--border))" }} />
          <div className="flex justify-between">
            <span className="text-base font-bold text-foreground">Итого</span>
            <span className="text-base font-black gradient-text">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {/* Checkout button */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full glass px-5 py-4"
        style={{
          maxWidth: 430,
          borderTop: "1px solid hsl(var(--border))",
          paddingBottom: "env(safe-area-inset-bottom, 16px)",
          zIndex: 20,
        }}
      >
        <button
          onClick={() => setOrdered(true)}
          className="w-full py-4 rounded-2xl font-black text-base text-white neon-glow transition-all active:scale-95 flex items-center justify-center gap-2"
          style={{ background: "linear-gradient(135deg, hsl(280,100%,65%), hsl(315,100%,60%))" }}
        >
          <Icon name="CreditCard" size={18} className="text-white" />
          Оформить заказ — {formatPrice(total)}
        </button>
      </div>
    </>
  );
}

export default function Index() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Все");
  const [activeNav, setActiveNav] = useState(1);
  const [liked, setLiked] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const changeQty = (id: number, delta: number) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, (prev[id] ?? 1) + delta) }));
  };
  const [searchFocused, setSearchFocused] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      const matchCategory = activeCategory === "Все" || p.category === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [search, activeCategory]);

  const toggleLike = (id: number) => {
    setLiked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toggleCart = (id: number) => {
    setCart((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div className="mobile-frame bg-background flex flex-col overflow-hidden" style={{ height: "100dvh" }}>
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          liked={liked}
          onToggleLike={toggleLike}
          cart={cart}
          onToggleCart={toggleCart}
        />
      )}

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute top-[-80px] left-[-40px] w-72 h-72 rounded-full opacity-20" style={{ background: "radial-gradient(circle, hsl(280,100%,65%) 0%, transparent 70%)" }} />
        <div className="absolute top-[40%] right-[-60px] w-56 h-56 rounded-full opacity-15" style={{ background: "radial-gradient(circle, hsl(315,100%,60%) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[15%] left-[-30px] w-48 h-48 rounded-full opacity-10" style={{ background: "radial-gradient(circle, hsl(220,100%,65%) 0%, transparent 70%)" }} />
      </div>

      {/* Header */}
      <header className="relative flex-shrink-0 px-5 pt-12 pb-4 glass" style={{ zIndex: 10, borderBottom: "1px solid hsl(var(--border))" }}>
        <div className="flex items-center justify-between mb-4 animate-fade-up">
          <div>
            <p className="text-xs text-muted-foreground font-medium tracking-widest uppercase">
              {activeNav === 3 ? "Мои покупки" : "Добро пожаловать"}
            </p>
            <h1 className="text-2xl font-black gradient-text">
              {activeNav === 3 ? "Корзина" : "NeonShop"}
            </h1>
          </div>
          <div className="relative">
            <button
              className="w-11 h-11 rounded-xl glass gradient-border flex items-center justify-center transition-transform active:scale-95"
              onClick={() => setActiveNav(activeNav === 3 ? 1 : 3)}
            >
              <Icon name={activeNav === 3 ? "Grid2X2" : "ShoppingBag"} size={20} className="text-foreground" />
            </button>
            {cart.length > 0 && activeNav !== 3 && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold text-white flex items-center justify-center animate-scale-in"
                style={{ background: "linear-gradient(135deg, hsl(280,100%,65%), hsl(315,100%,60%))" }}
              >
                {cart.length}
              </span>
            )}
          </div>
        </div>
        {activeNav !== 3 && (
          <div
            className={`relative flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300 animate-fade-up delay-100 ${searchFocused ? "gradient-border" : ""}`}
            style={{ background: "hsl(var(--secondary))" }}
          >
            <Icon name="Search" size={18} className={`transition-colors duration-200 flex-shrink-0 ${searchFocused ? "text-primary" : "text-muted-foreground"}`} />
            <input
              type="text"
              placeholder="Найти товары, бренды..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            {search && (
              <button onClick={() => setSearch("")} className="flex-shrink-0 animate-scale-in">
                <Icon name="X" size={16} className="text-muted-foreground" />
              </button>
            )}
          </div>
        )}
      </header>

      {/* Cart screen */}
      {activeNav === 3 && (
        <div className="flex-1 flex flex-col overflow-hidden relative" style={{ zIndex: 1 }}>
          <CartScreen
            cart={cart}
            onToggleCart={toggleCart}
            quantities={quantities}
            onChangeQty={changeQty}
          />
        </div>
      )}

      {/* Scrollable content */}
      <div className={`flex-1 overflow-y-auto relative ${activeNav === 3 ? "hidden" : ""}`} style={{ zIndex: 1 }}>
        {/* Categories */}
        <div className="px-5 pt-4 pb-2 animate-fade-up delay-200">
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95 ${activeCategory === cat ? "text-white neon-glow" : "text-muted-foreground"}`}
                style={activeCategory === cat ? { background: "linear-gradient(135deg, hsl(280,100%,65%), hsl(315,100%,60%))" } : { background: "hsl(var(--secondary))" }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured banner */}
        {!search && activeCategory === "Все" && (
          <div className="px-5 pt-2 pb-4 animate-fade-up delay-300">
            <div
              className="relative rounded-3xl overflow-hidden p-5"
              style={{ background: "linear-gradient(135deg, hsl(280,100%,55%) 0%, hsl(315,100%,50%) 60%, hsl(350,100%,60%) 100%)", minHeight: 130 }}
            >
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 50%, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
              <div className="relative">
                <span className="text-xs font-bold text-white/70 uppercase tracking-widest">Специальное предложение</span>
                <h2 className="text-xl font-black text-white mt-1 leading-tight">До −30% на<br />электронику</h2>
                <button className="mt-3 bg-white text-purple-700 text-xs font-bold px-4 py-2 rounded-xl transition-transform active:scale-95">
                  Смотреть →
                </button>
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 animate-float">
                <Icon name="Zap" size={72} className="text-white" />
              </div>
            </div>
          </div>
        )}

        {/* Results count */}
        <div className="px-5 pb-3 flex items-center justify-between animate-fade-up delay-300">
          <p className="text-sm font-semibold text-muted-foreground">
            {filtered.length > 0 ? (<><span className="text-foreground font-bold">{filtered.length}</span> товаров</>) : "Ничего не найдено"}
          </p>
          <button className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground glass px-3 py-1.5 rounded-lg transition-all active:scale-95">
            <Icon name="SlidersHorizontal" size={13} />
            Фильтры
          </button>
        </div>

        {/* Product grid */}
        {filtered.length > 0 ? (
          <div className="px-5 grid grid-cols-2 gap-3 pb-28">
            {filtered.map((product, i) => (
              <div key={product.id} className="animate-fade-up" style={{ animationDelay: `${0.05 * i}s`, opacity: 0 }}>
                <div
                  className="rounded-2xl overflow-hidden card-hover gradient-border cursor-pointer"
                  style={{ background: "hsl(var(--card))" }}
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="relative overflow-hidden" style={{ height: 160 }}>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(var(--card)) 0%, transparent 50%)" }} />
                    <span className={`absolute top-2 left-2 text-[10px] font-bold text-white px-2 py-0.5 rounded-lg bg-gradient-to-r ${product.tagColor}`}>
                      {product.tag}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleLike(product.id); }}
                      className="absolute top-2 right-2 w-8 h-8 rounded-xl glass flex items-center justify-center transition-transform active:scale-90"
                    >
                      <Icon name="Heart" size={15} className={`transition-colors duration-200 ${liked.includes(product.id) ? "text-pink-500 fill-pink-500" : "text-white/60"}`} />
                    </button>
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] text-muted-foreground font-medium mb-0.5">{product.category}</p>
                    <p className="text-sm font-bold text-foreground leading-tight mb-2 line-clamp-2">{product.name}</p>
                    <div className="flex items-center gap-1 mb-3">
                      <Icon name="Star" size={11} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-[11px] font-bold text-foreground">{product.rating}</span>
                      <span className="text-[10px] text-muted-foreground">({product.reviews})</span>
                    </div>
                    <div className="flex items-end justify-between gap-1">
                      <div>
                        <p className="text-base font-black gradient-text leading-none">{formatPrice(product.price)}</p>
                        {product.oldPrice && (
                          <p className="text-[10px] text-muted-foreground line-through mt-0.5">{formatPrice(product.oldPrice)}</p>
                        )}
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleCart(product.id); }}
                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-90 flex-shrink-0 ${cart.includes(product.id) ? "neon-glow" : ""}`}
                        style={{ background: cart.includes(product.id) ? "linear-gradient(135deg, hsl(280,100%,65%), hsl(315,100%,60%))" : "hsl(var(--secondary))" }}
                      >
                        <Icon name={cart.includes(product.id) ? "Check" : "Plus"} size={15} className="text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-5 animate-fade-up">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-4" style={{ background: "hsl(var(--secondary))" }}>
              <Icon name="SearchX" size={36} className="text-muted-foreground" />
            </div>
            <p className="text-lg font-bold text-foreground mb-1">Ничего не найдено</p>
            <p className="text-sm text-muted-foreground text-center">Попробуйте изменить запрос или выбрать другую категорию</p>
            <button
              className="mt-5 px-6 py-2.5 rounded-xl text-sm font-semibold text-white gradient-bg active:scale-95 transition-transform"
              onClick={() => { setSearch(""); setActiveCategory("Все"); }}
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="flex-shrink-0 glass animate-slide-up" style={{ borderTop: "1px solid hsl(var(--border))", paddingBottom: "env(safe-area-inset-bottom, 8px)", zIndex: 10 }}>
        <div className="flex items-center justify-around px-2 pt-2 pb-1">
          {NAV_ITEMS.map((item, idx) => {
            const isActive = activeNav === idx;
            return (
              <button
                key={item.label}
                onClick={() => setActiveNav(idx)}
                className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 active:scale-90 relative"
              >
                {item.icon === "ShoppingCart" && cart.length > 0 && (
                  <span
                    className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full text-[9px] font-bold text-white flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, hsl(280,100%,65%), hsl(315,100%,60%))" }}
                  >
                    {cart.length}
                  </span>
                )}
                <div className={`w-6 h-6 flex items-center justify-center transition-all duration-200 ${isActive ? "scale-110" : ""}`}>
                  <Icon name={item.icon} size={20} className={`transition-colors duration-200 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <span className={`text-[10px] font-semibold transition-colors duration-200 ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                  {item.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full animate-scale-in" style={{ background: "hsl(var(--primary))" }} />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}