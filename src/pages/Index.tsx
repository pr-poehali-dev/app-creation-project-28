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

export default function Index() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Все");
  const [activeNav, setActiveNav] = useState(1);
  const [liked, setLiked] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);
  const [searchFocused, setSearchFocused] = useState(false);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        activeCategory === "Все" || p.category === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [search, activeCategory]);

  const toggleLike = (id: number) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleCart = (id: number) => {
    setCart((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="mobile-frame bg-background flex flex-col overflow-hidden" style={{ height: "100dvh" }}>
      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div
          className="absolute top-[-80px] left-[-40px] w-72 h-72 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, hsl(280,100%,65%) 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-[40%] right-[-60px] w-56 h-56 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, hsl(315,100%,60%) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[15%] left-[-30px] w-48 h-48 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, hsl(220,100%,65%) 0%, transparent 70%)" }}
        />
      </div>

      {/* Header */}
      <header
        className="relative flex-shrink-0 px-5 pt-12 pb-4 glass"
        style={{ zIndex: 10, borderBottom: "1px solid hsl(var(--border))" }}
      >
        <div className="flex items-center justify-between mb-4 animate-fade-up">
          <div>
            <p className="text-xs text-muted-foreground font-medium tracking-widest uppercase">Добро пожаловать</p>
            <h1 className="text-2xl font-black gradient-text">NeonShop</h1>
          </div>
          <div className="relative">
            <button
              className="w-11 h-11 rounded-xl glass gradient-border flex items-center justify-center transition-transform active:scale-95"
              onClick={() => setActiveNav(3)}
            >
              <Icon name="ShoppingBag" size={20} className="text-foreground" />
            </button>
            {cart.length > 0 && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold text-white flex items-center justify-center animate-scale-in"
                style={{ background: "linear-gradient(135deg, hsl(280,100%,65%), hsl(315,100%,60%))" }}
              >
                {cart.length}
              </span>
            )}
          </div>
        </div>

        {/* Search bar */}
        <div
          className={`relative flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300 animate-fade-up delay-100 ${
            searchFocused ? "gradient-border" : ""
          }`}
          style={{ background: "hsl(var(--secondary))" }}
        >
          <Icon
            name="Search"
            size={18}
            className={`transition-colors duration-200 flex-shrink-0 ${searchFocused ? "text-primary" : "text-muted-foreground"}`}
          />
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
      </header>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto relative" style={{ zIndex: 1 }}>
        {/* Categories */}
        <div className="px-5 pt-4 pb-2 animate-fade-up delay-200">
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95 ${
                  activeCategory === cat ? "text-white neon-glow" : "text-muted-foreground"
                }`}
                style={
                  activeCategory === cat
                    ? { background: "linear-gradient(135deg, hsl(280,100%,65%), hsl(315,100%,60%))" }
                    : { background: "hsl(var(--secondary))" }
                }
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
              style={{
                background:
                  "linear-gradient(135deg, hsl(280,100%,55%) 0%, hsl(315,100%,50%) 60%, hsl(350,100%,60%) 100%)",
                minHeight: 130,
              }}
            >
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: "radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="relative">
                <span className="text-xs font-bold text-white/70 uppercase tracking-widest">Специальное предложение</span>
                <h2 className="text-xl font-black text-white mt-1 leading-tight">
                  До −30% на
                  <br />
                  электронику
                </h2>
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
            {filtered.length > 0 ? (
              <>
                <span className="text-foreground font-bold">{filtered.length}</span> товаров
              </>
            ) : (
              "Ничего не найдено"
            )}
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
              <div
                key={product.id}
                className="animate-fade-up"
                style={{ animationDelay: `${0.05 * i}s`, opacity: 0 }}
              >
                <div
                  className="rounded-2xl overflow-hidden card-hover gradient-border cursor-pointer"
                  style={{ background: "hsl(var(--card))" }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ height: 160 }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, hsl(var(--card)) 0%, transparent 50%)" }}
                    />
                    {/* Tag */}
                    <span
                      className={`absolute top-2 left-2 text-[10px] font-bold text-white px-2 py-0.5 rounded-lg bg-gradient-to-r ${product.tagColor}`}
                    >
                      {product.tag}
                    </span>
                    {/* Like button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(product.id);
                      }}
                      className="absolute top-2 right-2 w-8 h-8 rounded-xl glass flex items-center justify-center transition-transform active:scale-90"
                    >
                      <Icon
                        name="Heart"
                        size={15}
                        className={`transition-colors duration-200 ${
                          liked.includes(product.id) ? "text-pink-500 fill-pink-500" : "text-white/60"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <p className="text-[10px] text-muted-foreground font-medium mb-0.5">{product.category}</p>
                    <p className="text-sm font-bold text-foreground leading-tight mb-2 line-clamp-2">{product.name}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      <Icon name="Star" size={11} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-[11px] font-bold text-foreground">{product.rating}</span>
                      <span className="text-[10px] text-muted-foreground">({product.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-end justify-between gap-1">
                      <div>
                        <p className="text-base font-black gradient-text leading-none">{formatPrice(product.price)}</p>
                        {product.oldPrice && (
                          <p className="text-[10px] text-muted-foreground line-through mt-0.5">
                            {formatPrice(product.oldPrice)}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => toggleCart(product.id)}
                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-90 flex-shrink-0 ${
                          cart.includes(product.id) ? "neon-glow" : ""
                        }`}
                        style={{
                          background: cart.includes(product.id)
                            ? "linear-gradient(135deg, hsl(280,100%,65%), hsl(315,100%,60%))"
                            : "hsl(var(--secondary))",
                        }}
                      >
                        <Icon
                          name={cart.includes(product.id) ? "Check" : "Plus"}
                          size={15}
                          className="text-white"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-5 animate-fade-up">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center mb-4"
              style={{ background: "hsl(var(--secondary))" }}
            >
              <Icon name="SearchX" size={36} className="text-muted-foreground" />
            </div>
            <p className="text-lg font-bold text-foreground mb-1">Ничего не найдено</p>
            <p className="text-sm text-muted-foreground text-center">
              Попробуйте изменить запрос или выбрать другую категорию
            </p>
            <button
              className="mt-5 px-6 py-2.5 rounded-xl text-sm font-semibold text-white gradient-bg active:scale-95 transition-transform"
              onClick={() => {
                setSearch("");
                setActiveCategory("Все");
              }}
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav
        className="flex-shrink-0 glass animate-slide-up"
        style={{
          borderTop: "1px solid hsl(var(--border))",
          paddingBottom: "env(safe-area-inset-bottom, 8px)",
          zIndex: 10,
        }}
      >
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
                    style={{
                      background: "linear-gradient(135deg, hsl(280,100%,65%), hsl(315,100%,60%))",
                    }}
                  >
                    {cart.length}
                  </span>
                )}
                <div
                  className={`w-6 h-6 flex items-center justify-center transition-all duration-200 ${isActive ? "scale-110" : ""}`}
                >
                  <Icon
                    name={item.icon}
                    size={20}
                    className={`transition-colors duration-200 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                  />
                </div>
                <span
                  className={`text-[10px] font-semibold transition-colors duration-200 ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full animate-scale-in"
                    style={{ background: "hsl(var(--primary))" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
