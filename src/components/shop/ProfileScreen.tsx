import { useState } from "react";
import Icon from "@/components/ui/icon";
import { ORDER_HISTORY, formatPrice } from "./data";

export default function ProfileScreen({ cart, liked }: { cart: number[]; liked: number[] }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const menuItems = [
    { icon: "MapPin", label: "Адреса доставки", sub: "2 адреса сохранено" },
    { icon: "CreditCard", label: "Способы оплаты", sub: "Карта •••• 4892" },
    { icon: "Headphones", label: "Поддержка", sub: "Обычно отвечаем за 1 час" },
    { icon: "Info", label: "О приложении", sub: "Версия 1.0.0" },
  ];

  return (
    <div className="flex-1 overflow-y-auto pb-28">
      {/* Profile hero */}
      <div className="relative px-5 pt-4 pb-6">
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(280,100%,65%) 0%, transparent 70%)" }}
        />
        <div className="relative flex flex-col items-center">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center mb-3 text-3xl font-black text-white animate-pulse-glow"
            style={{ background: "linear-gradient(135deg, hsl(280,100%,65%), hsl(315,100%,60%))" }}
          >
            А
          </div>
          <h2 className="text-xl font-black text-foreground">Алексей Петров</h2>
          <p className="text-sm text-muted-foreground mt-0.5">alexey@example.com</p>
          <div className="flex gap-6 mt-4">
            <div className="flex flex-col items-center">
              <span className="text-xl font-black gradient-text">{ORDER_HISTORY.length}</span>
              <span className="text-[11px] text-muted-foreground">Заказов</span>
            </div>
            <div className="w-px" style={{ background: "hsl(var(--border))" }} />
            <div className="flex flex-col items-center">
              <span className="text-xl font-black gradient-text">{liked.length}</span>
              <span className="text-[11px] text-muted-foreground">Избранных</span>
            </div>
            <div className="w-px" style={{ background: "hsl(var(--border))" }} />
            <div className="flex flex-col items-center">
              <span className="text-xl font-black gradient-text">{cart.length}</span>
              <span className="text-[11px] text-muted-foreground">В корзине</span>
            </div>
          </div>
        </div>
      </div>

      {/* Orders */}
      <div className="px-5 mb-5">
        <p className="text-sm font-bold text-foreground mb-3">История заказов</p>
        <div className="flex flex-col gap-2">
          {ORDER_HISTORY.map((order, i) => (
            <div
              key={order.id}
              className="p-3.5 rounded-2xl flex items-center gap-3 animate-fade-up cursor-pointer card-hover"
              style={{ animationDelay: `${0.08 * i}s`, opacity: 0, background: "hsl(var(--card))" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "hsl(var(--secondary))" }}
              >
                <Icon name="Package" size={18} className="text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-sm font-bold text-foreground">{order.id}</span>
                  <span className={`text-xs font-bold ${order.statusColor}`}>{order.status}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">{order.date} · {order.items} товара</span>
                  <span className="text-sm font-black gradient-text">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="px-5 mb-5">
        <p className="text-sm font-bold text-foreground mb-3">Настройки</p>
        <div className="rounded-2xl overflow-hidden" style={{ background: "hsl(var(--card))" }}>
          <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "hsla(280,100%,65%,0.15)" }}>
              <Icon name="Bell" size={16} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Уведомления</p>
              <p className="text-[11px] text-muted-foreground">Акции и новинки</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className="relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0"
              style={{ background: notifications ? "linear-gradient(135deg, hsl(280,100%,65%), hsl(315,100%,60%))" : "hsl(var(--secondary))" }}
            >
              <span
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300"
                style={{ left: notifications ? "calc(100% - 22px)" : "2px", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
              />
            </button>
          </div>
          <div className="flex items-center gap-3 px-4 py-3.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "hsla(220,100%,65%,0.15)" }}>
              <Icon name="Moon" size={16} className="text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Тёмная тема</p>
              <p className="text-[11px] text-muted-foreground">Активна сейчас</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0"
              style={{ background: darkMode ? "linear-gradient(135deg, hsl(280,100%,65%), hsl(315,100%,60%))" : "hsl(var(--secondary))" }}
            >
              <span
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300"
                style={{ left: darkMode ? "calc(100% - 22px)" : "2px", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Menu items */}
      <div className="px-5 mb-5">
        <div className="rounded-2xl overflow-hidden" style={{ background: "hsl(var(--card))" }}>
          {menuItems.map((item, i) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-4 py-3.5 transition-all active:scale-[0.98] text-left"
              style={{ borderBottom: i < menuItems.length - 1 ? "1px solid hsl(var(--border))" : "none" }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "hsl(var(--secondary))" }}>
                <Icon name={item.icon} size={16} className="text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                <p className="text-[11px] text-muted-foreground">{item.sub}</p>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="px-5">
        <button
          className="w-full py-3.5 rounded-2xl font-bold text-sm transition-transform active:scale-95 flex items-center justify-center gap-2"
          style={{ background: "hsla(0,80%,55%,0.12)", color: "hsl(0,80%,65%)" }}
        >
          <Icon name="LogOut" size={16} style={{ color: "hsl(0,80%,65%)" }} />
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}
