import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Product, formatPrice } from "./data";

export default function ProductDetail({
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
