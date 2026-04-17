import Icon from "@/components/ui/icon";
import { PRODUCTS, Product, formatPrice } from "./data";

export default function FavoritesScreen({
  liked,
  onToggleLike,
  cart,
  onToggleCart,
  onOpen,
}: {
  liked: number[];
  onToggleLike: (id: number) => void;
  cart: number[];
  onToggleCart: (id: number) => void;
  onOpen: (p: Product) => void;
}) {
  const likedProducts = PRODUCTS.filter((p) => liked.includes(p.id));

  if (likedProducts.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-8 animate-fade-up">
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6"
          style={{ background: "hsl(var(--secondary))" }}
        >
          <Icon name="Heart" size={40} className="text-muted-foreground" />
        </div>
        <h2 className="text-xl font-black text-foreground mb-2">Избранное пусто</h2>
        <p className="text-sm text-muted-foreground text-center leading-relaxed">
          Нажмите на сердечко на карточке товара, чтобы добавить его сюда
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-5 pt-4 pb-28">
      <p className="text-sm text-muted-foreground mb-4 animate-fade-up">
        <span className="text-foreground font-bold">{likedProducts.length}</span> товаров в избранном
      </p>
      <div className="flex flex-col gap-3">
        {likedProducts.map((product, i) => {
          const inCart = cart.includes(product.id);
          return (
            <div
              key={product.id}
              className="animate-fade-up"
              style={{ animationDelay: `${0.07 * i}s`, opacity: 0 }}
            >
              <div
                className="flex gap-3 p-3 rounded-2xl cursor-pointer card-hover gradient-border"
                style={{ background: "hsl(var(--card))" }}
                onClick={() => onOpen(product)}
              >
                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  <span
                    className={`absolute top-1 left-1 text-[9px] font-bold text-white px-1.5 py-0.5 rounded-lg bg-gradient-to-r ${product.tagColor}`}
                  >
                    {product.tag}
                  </span>
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                  <div>
                    <p className="text-[10px] text-muted-foreground font-medium mb-0.5">{product.category}</p>
                    <p className="text-sm font-bold text-foreground leading-tight line-clamp-2 mb-1">{product.name}</p>
                    <div className="flex items-center gap-1 mb-2">
                      <Icon name="Star" size={11} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-[11px] font-bold text-foreground">{product.rating}</span>
                      <span className="text-[10px] text-muted-foreground">({product.reviews})</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-base font-black gradient-text leading-none">{formatPrice(product.price)}</p>
                      {product.oldPrice && (
                        <p className="text-[10px] text-muted-foreground line-through">{formatPrice(product.oldPrice)}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); onToggleLike(product.id); }}
                        className="w-8 h-8 rounded-xl flex items-center justify-center transition-transform active:scale-90"
                        style={{ background: "hsla(340,80%,55%,0.15)" }}
                      >
                        <Icon name="Heart" size={15} className="text-pink-500 fill-pink-500" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); onToggleCart(product.id); }}
                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all active:scale-90 ${inCart ? "neon-glow" : ""}`}
                        style={{
                          background: inCart
                            ? "linear-gradient(135deg, hsl(280,100%,65%), hsl(315,100%,60%))"
                            : "hsl(var(--secondary))",
                        }}
                      >
                        <Icon name={inCart ? "Check" : "ShoppingCart"} size={14} className="text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {likedProducts.some((p) => !cart.includes(p.id)) && (
        <button
          onClick={() => likedProducts.forEach((p) => { if (!cart.includes(p.id)) onToggleCart(p.id); })}
          className="mt-5 w-full py-3.5 rounded-2xl font-bold text-sm text-white gradient-bg active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <Icon name="ShoppingCart" size={16} className="text-white" />
          Добавить всё в корзину
        </button>
      )}
    </div>
  );
}
