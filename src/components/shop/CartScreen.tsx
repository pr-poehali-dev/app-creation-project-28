import { useState } from "react";
import Icon from "@/components/ui/icon";
import { PRODUCTS, formatPrice } from "./data";

export default function CartScreen({
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
