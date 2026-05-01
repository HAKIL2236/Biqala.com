import { useState, useEffect, useRef } from "react";

// ==================== DATA ====================
const PRODUCTS = [
  { id: 1, name: "طماطم", category: "خضروات", price: 3.5, unit: "كغ", emoji: "🍅" },
  { id: 2, name: "بطاطا", category: "خضروات", price: 4.0, unit: "كغ", emoji: "🥔" },
  { id: 3, name: "بصل", category: "خضروات", price: 2.5, unit: "كغ", emoji: "🧅" },
  { id: 4, name: "جزر", category: "خضروات", price: 3.0, unit: "كغ", emoji: "🥕" },
  { id: 5, name: "خس", category: "خضروات", price: 5.0, unit: "حبة", emoji: "🥬" },
  { id: 6, name: "فلفل أحمر", category: "خضروات", price: 6.0, unit: "كغ", emoji: "🫑" },
  { id: 7, name: "تفاح", category: "فواكه", price: 8.0, unit: "كغ", emoji: "🍎" },
  { id: 8, name: "موز", category: "فواكه", price: 6.0, unit: "كغ", emoji: "🍌" },
  { id: 9, name: "برتقال", category: "فواكه", price: 5.0, unit: "كغ", emoji: "🍊" },
  { id: 10, name: "عنب", category: "فواكه", price: 12.0, unit: "كغ", emoji: "🍇" },
  { id: 11, name: "حليب", category: "ألبان", price: 7.0, unit: "لتر", emoji: "🥛" },
  { id: 12, name: "جبن", category: "ألبان", price: 25.0, unit: "علبة", emoji: "🧀" },
  { id: 13, name: "زبدة", category: "ألبان", price: 12.0, unit: "علبة", emoji: "🧈" },
  { id: 14, name: "دانون", category: "ألبان", price: 4.0, unit: "حبة", emoji: "🍦" },
  { id: 15, name: "خبز", category: "مخبزة", price: 1.5, unit: "حبة", emoji: "🍞" },
  { id: 16, name: "باغيت", category: "مخبزة", price: 2.0, unit: "حبة", emoji: "🥖" },
  { id: 17, name: "زيت الزيتون", category: "بقالة", price: 45.0, unit: "لتر", emoji: "🫙" },
  { id: 18, name: "سكر", category: "بقالة", price: 8.0, unit: "كغ", emoji: "🍬" },
  { id: 19, name: "دقيق", category: "بقالة", price: 7.0, unit: "كغ", emoji: "🌾" },
  { id: 20, name: "معجون طماطم", category: "بقالة", price: 5.0, unit: "علبة", emoji: "🥫" },
  { id: 21, name: "شاي أحمر", category: "مشروبات", price: 15.0, unit: "علبة", emoji: "🍵" },
  { id: 22, name: "قهوة", category: "مشروبات", price: 20.0, unit: "علبة", emoji: "☕" },
  { id: 23, name: "عصير", category: "مشروبات", price: 10.0, unit: "لتر", emoji: "🧃" },
  { id: 24, name: "مياه معدنية", category: "مشروبات", price: 4.0, unit: "لتر", emoji: "💧" },
];

const CATEGORIES = ["الكل", "خضروات", "فواكه", "ألبان", "مخبزة", "بقالة", "مشروبات"];

const STATUS_LABELS = {
  pending: { label: "قيد الانتظار", color: "#f59e0b", bg: "#fef3c7" },
  confirmed: { label: "تم التأكيد", color: "#10b981", bg: "#d1fae5" },
  modified: { label: "تم التعديل", color: "#3b82f6", bg: "#dbeafe" },
  delivering: { label: "جاري التوصيل", color: "#8b5cf6", bg: "#ede9fe" },
  delivered: { label: "تم التسليم", color: "#6b7280", bg: "#f3f4f6" },
  cancelled: { label: "ملغي", color: "#ef4444", bg: "#fee2e2" },
};

// ==================== STYLES ====================
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap');
  
  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  body { 
    font-family: 'Cairo', sans-serif; 
    direction: rtl; 
    background: #f8f5f0;
    color: #1a1a1a;
  }

  :root {
    --green: #2a7d4f;
    --green-dark: #1e5c3a;
    --green-light: #e8f5ed;
    --orange: #e8762a;
    --orange-light: #fdf0e6;
    --cream: #f8f5f0;
    --white: #ffffff;
    --gray: #6b7280;
    --border: #e5e0d8;
    --shadow: 0 2px 12px rgba(0,0,0,0.08);
    --shadow-lg: 0 8px 32px rgba(0,0,0,0.12);
  }

  .btn-primary {
    background: var(--green);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    font-family: 'Cairo', sans-serif;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .btn-primary:hover { background: var(--green-dark); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(42,125,79,0.3); }

  .btn-secondary {
    background: white;
    color: var(--green);
    border: 2px solid var(--green);
    padding: 8px 18px;
    border-radius: 10px;
    cursor: pointer;
    font-family: 'Cairo', sans-serif;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.2s;
  }
  .btn-secondary:hover { background: var(--green-light); }

  .btn-danger {
    background: #fee2e2;
    color: #ef4444;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Cairo', sans-serif;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.2s;
  }
  .btn-danger:hover { background: #fecaca; }

  .btn-orange {
    background: var(--orange);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    font-family: 'Cairo', sans-serif;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.2s;
  }
  .btn-orange:hover { background: #d4681e; transform: translateY(-1px); }

  .card {
    background: white;
    border-radius: 16px;
    box-shadow: var(--shadow);
    overflow: hidden;
  }

  .input-field {
    width: 100%;
    border: 2px solid var(--border);
    border-radius: 10px;
    padding: 10px 14px;
    font-family: 'Cairo', sans-serif;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
    background: white;
    direction: rtl;
  }
  .input-field:focus { border-color: var(--green); }

  .badge {
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    gap: 4px;
  }

  .product-card {
    background: white;
    border-radius: 16px;
    padding: 16px;
    border: 2px solid transparent;
    transition: all 0.2s;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .product-card:hover { border-color: var(--green); transform: translateY(-2px); box-shadow: var(--shadow-lg); }

  .qty-btn {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 700;
    transition: all 0.15s;
    font-family: 'Cairo', sans-serif;
  }
  .qty-btn.plus { background: var(--green); color: white; }
  .qty-btn.minus { background: #f3f4f6; color: #374151; }
  .qty-btn:hover { transform: scale(1.1); }

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(4px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .modal-box {
    background: white;
    border-radius: 20px;
    padding: 28px;
    width: 100%;
    max-width: 480px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: var(--shadow-lg);
    animation: slideUp 0.25s ease;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .toast {
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    background: #1a1a1a;
    color: white;
    padding: 12px 24px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 500;
    z-index: 9999;
    animation: fadeInUp 0.3s ease;
    white-space: nowrap;
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translate(-50%, 10px); }
    to { opacity: 1; transform: translate(-50%, 0); }
  }

  .cart-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 360px;
    height: 100vh;
    background: white;
    box-shadow: 4px 0 24px rgba(0,0,0,0.15);
    z-index: 900;
    display: flex;
    flex-direction: column;
    animation: slideFromLeft 0.25s ease;
  }
  @keyframes slideFromLeft {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }

  @media (max-width: 640px) {
    .cart-sidebar { width: 100%; }
  }

  .nav-tab {
    padding: 8px 18px;
    border-radius: 50px;
    border: none;
    cursor: pointer;
    font-family: 'Cairo', sans-serif;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.2s;
    background: transparent;
    color: #6b7280;
  }
  .nav-tab.active { background: white; color: var(--green); box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  .nav-tab:hover:not(.active) { background: rgba(255,255,255,0.5); color: #374151; }

  .order-card {
    background: white;
    border-radius: 16px;
    padding: 20px;
    border: 2px solid var(--border);
    transition: all 0.2s;
  }
  .order-card:hover { border-color: #d1d5db; box-shadow: var(--shadow); }

  .chat-bubble {
    max-width: 80%;
    padding: 10px 14px;
    border-radius: 16px;
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 8px;
  }
  .chat-bubble.admin { background: var(--green-light); border-bottom-right-radius: 4px; align-self: flex-start; }
  .chat-bubble.customer { background: #f3f4f6; border-bottom-left-radius: 4px; align-self: flex-end; }

  .stat-card {
    background: white;
    border-radius: 16px;
    padding: 20px;
    text-align: center;
    border-bottom: 4px solid;
    transition: transform 0.2s;
  }
  .stat-card:hover { transform: translateY(-3px); }

  .search-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    background: white;
    border: 2px solid var(--border);
    border-radius: 12px;
    padding: 8px 14px;
    transition: border-color 0.2s;
  }
  .search-bar:focus-within { border-color: var(--green); }
  .search-bar input {
    border: none;
    outline: none;
    font-family: 'Cairo', sans-serif;
    font-size: 14px;
    flex: 1;
    background: transparent;
    direction: rtl;
  }

  .scrollbar-hide::-webkit-scrollbar { display: none; }
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
`;

// ==================== HELPERS ====================
const generateOrderId = () => "BQ-" + Math.random().toString(36).substr(2, 6).toUpperCase();

const formatTime = (date) => {
  const d = new Date(date);
  return d.toLocaleString("ar-MA", { dateStyle: "short", timeStyle: "short" });
};

// ==================== COMPONENTS ====================

function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, []);
  return <div className="toast">✅ {message}</div>;
}

function StatusBadge({ status }) {
  const s = STATUS_LABELS[status] || STATUS_LABELS.pending;
  return (
    <span className="badge" style={{ background: s.bg, color: s.color }}>
      {s.label}
    </span>
  );
}

// ==================== CART SIDEBAR ====================
function CartSidebar({ cart, products, onClose, onUpdateQty, onRemove, onCheckout }) {
  const total = cart.reduce((sum, item) => {
    const p = products.find((x) => x.id === item.productId);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);

  return (
    <>
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 899 }} onClick={onClose} />
      <div className="cart-sidebar" style={{ right: 0, left: "auto" }}>
        <div style={{ padding: "20px 20px 12px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>🛒 سلة التسوق</h2>
          <button onClick={onClose} style={{ background: "#f3f4f6", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "12px 20px" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--gray)" }}>
              <div style={{ fontSize: 60 }}>🛒</div>
              <p style={{ marginTop: 12, fontWeight: 500 }}>السلة فارغة</p>
              <p style={{ fontSize: 13, marginTop: 4 }}>أضف منتجات للبدء</p>
            </div>
          ) : (
            cart.map((item) => {
              const p = products.find((x) => x.id === item.productId);
              if (!p) return null;
              return (
                <div key={item.productId} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ fontSize: 32, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f5f0", borderRadius: 10 }}>{p.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                    <div style={{ color: "var(--orange)", fontWeight: 700, fontSize: 14 }}>{(p.price * item.qty).toFixed(2)} د.م</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button className="qty-btn minus" onClick={() => onUpdateQty(item.productId, item.qty - 1)}>−</button>
                    <span style={{ fontWeight: 700, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                    <button className="qty-btn plus" onClick={() => onUpdateQty(item.productId, item.qty + 1)}>+</button>
                  </div>
                  <button onClick={() => onRemove(item.productId)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", fontSize: 16, padding: 4 }}>🗑</button>
                </div>
              );
            })
          )}
        </div>

        {cart.length > 0 && (
          <div style={{ padding: "16px 20px", borderTop: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontWeight: 600, color: "var(--gray)" }}>المجموع:</span>
              <span style={{ fontWeight: 800, fontSize: 20, color: "var(--green)" }}>{total.toFixed(2)} د.م</span>
            </div>
            <button className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: 16 }} onClick={onCheckout}>
              تأكيد الطلب 🚀
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ==================== CHECKOUT MODAL ====================
function CheckoutModal({ cart, products, onClose, onSubmit }) {
  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "" });
  const [errors, setErrors] = useState({});

  const total = cart.reduce((sum, item) => {
    const p = products.find((x) => x.id === item.productId);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "الاسم مطلوب";
    if (!form.phone.trim() || !/^0\d{9}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "رقم الهاتف غير صحيح";
    if (!form.address.trim()) e.address = "العنوان مطلوب";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
          📋 إتمام الطلب
        </h2>

        <div style={{ background: "var(--green-light)", borderRadius: 12, padding: 14, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: "var(--green)", marginBottom: 8, fontSize: 15 }}>ملخص الطلب</div>
          {cart.map((item) => {
            const p = products.find((x) => x.id === item.productId);
            return (
              <div key={item.productId} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                <span>{p?.emoji} {p?.name} × {item.qty} {p?.unit}</span>
                <span style={{ fontWeight: 600 }}>{(p?.price * item.qty).toFixed(2)} د.م</span>
              </div>
            );
          })}
          <div style={{ borderTop: "1px dashed var(--green)", marginTop: 10, paddingTop: 10, display: "flex", justifyContent: "space-between", fontWeight: 800, color: "var(--green)", fontSize: 16 }}>
            <span>المجموع</span>
            <span>{total.toFixed(2)} د.م</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--gray)", marginBottom: 6 }}>الاسم الكامل *</label>
            <input className="input-field" placeholder="مثال: محمد العلوي" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            {errors.name && <span style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errors.name}</span>}
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--gray)", marginBottom: 6 }}>رقم الهاتف *</label>
            <input className="input-field" placeholder="0612345678" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} type="tel" />
            {errors.phone && <span style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errors.phone}</span>}
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--gray)", marginBottom: 6 }}>عنوان التوصيل *</label>
            <input className="input-field" placeholder="الحي، الزنقة، رقم البناية..." value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            {errors.address && <span style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errors.address}</span>}
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--gray)", marginBottom: 6 }}>ملاحظات (اختياري)</label>
            <textarea className="input-field" placeholder="أي ملاحظات إضافية..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} style={{ resize: "vertical" }} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          <button className="btn-secondary" onClick={onClose} style={{ flex: 1 }}>إلغاء</button>
          <button className="btn-primary" onClick={handleSubmit} style={{ flex: 2, justifyContent: "center" }}>إرسال الطلب ✅</button>
        </div>
      </div>
    </div>
  );
}

// ==================== ORDER CONFIRMATION ====================
function OrderConfirmed({ orderId, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box" style={{ textAlign: "center" }}>
        <div style={{ fontSize: 70, marginBottom: 16 }}>🎉</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--green)", marginBottom: 10 }}>تم إرسال طلبك!</h2>
        <p style={{ color: "var(--gray)", marginBottom: 16 }}>سيتم مراجعة طلبك وتأكيده في أقرب وقت</p>
        <div style={{ background: "var(--green-light)", borderRadius: 12, padding: "14px 24px", display: "inline-block", marginBottom: 24 }}>
          <p style={{ fontSize: 13, color: "var(--gray)", marginBottom: 4 }}>رقم طلبك</p>
          <p style={{ fontSize: 22, fontWeight: 900, color: "var(--green)", letterSpacing: 2 }}>{orderId}</p>
          <p style={{ fontSize: 11, color: "var(--gray)", marginTop: 4 }}>احتفظ بهذا الرقم لمتابعة طلبك</p>
        </div>
        <div>
          <button className="btn-primary" onClick={onClose} style={{ width: "100%", justifyContent: "center" }}>العودة للمتجر</button>
        </div>
      </div>
    </div>
  );
}

// ==================== TRACK ORDER (Customer) ====================
function TrackOrder({ orders }) {
  const [query, setQuery] = useState("");
  const [found, setFound] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    const o = orders.find((x) => x.id === query.toUpperCase() || x.customer.phone === query);
    setFound(o || null);
    setSearched(true);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 16px" }}>
      <div className="card" style={{ padding: 28, marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>📦 تتبع طلبك</h2>
        <p style={{ color: "var(--gray)", fontSize: 14, marginBottom: 20 }}>أدخل رقم طلبك أو رقم هاتفك للاطلاع على حالة طلبك</p>
        <div style={{ display: "flex", gap: 10 }}>
          <input className="input-field" placeholder="BQ-XXXXXX أو رقم الهاتف..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} style={{ flex: 1 }} />
          <button className="btn-primary" onClick={handleSearch}>بحث</button>
        </div>
      </div>

      {searched && !found && (
        <div className="card" style={{ padding: 40, textAlign: "center" }}>
          <div style={{ fontSize: 48 }}>🔍</div>
          <p style={{ marginTop: 12, fontWeight: 600 }}>لم يتم العثور على الطلب</p>
          <p style={{ color: "var(--gray)", fontSize: 13, marginTop: 4 }}>تحقق من رقم الطلب أو رقم الهاتف</p>
        </div>
      )}

      {found && (
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div>
              <p style={{ fontSize: 13, color: "var(--gray)" }}>رقم الطلب</p>
              <p style={{ fontSize: 20, fontWeight: 900, color: "var(--green)" }}>{found.id}</p>
            </div>
            <StatusBadge status={found.status} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            <div style={{ background: "#f8f5f0", borderRadius: 10, padding: 12 }}>
              <p style={{ fontSize: 11, color: "var(--gray)" }}>👤 الاسم</p>
              <p style={{ fontWeight: 600, fontSize: 14 }}>{found.customer.name}</p>
            </div>
            <div style={{ background: "#f8f5f0", borderRadius: 10, padding: 12 }}>
              <p style={{ fontSize: 11, color: "var(--gray)" }}>📍 العنوان</p>
              <p style={{ fontWeight: 600, fontSize: 14 }}>{found.customer.address}</p>
            </div>
          </div>

          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16, marginBottom: 16 }}>
            <p style={{ fontWeight: 700, marginBottom: 12, fontSize: 15 }}>🛒 المنتجات</p>
            {found.items.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px dashed var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 22 }}>{item.emoji}</span>
                  <span style={{ fontWeight: 500 }}>{item.name}</span>
                  {!item.available && <span style={{ background: "#fee2e2", color: "#ef4444", fontSize: 11, padding: "2px 8px", borderRadius: 20 }}>غير متوفر</span>}
                </div>
                <span style={{ color: "var(--gray)", fontSize: 13 }}>× {item.qty} {item.unit}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
            <span>المجموع</span>
            <span style={{ color: "var(--green)", fontSize: 18 }}>{found.total.toFixed(2)} د.م</span>
          </div>

          {found.messages.length > 0 && (
            <div style={{ borderTop: "1px solid var(--border)", marginTop: 16, paddingTop: 16 }}>
              <p style={{ fontWeight: 700, marginBottom: 12, fontSize: 15 }}>💬 رسائل البقال</p>
              {found.messages.filter(m => m.from === "admin").map((msg, i) => (
                <div key={i} className="chat-bubble admin" style={{ display: "block" }}>
                  <p>{msg.text}</p>
                  <p style={{ fontSize: 11, color: "var(--gray)", marginTop: 4 }}>{formatTime(msg.time)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ==================== ADMIN PANEL ====================
function AdminPanel({ orders, products, onUpdateOrder, onSendMessage }) {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);
  const [filter, setFilter] = useState("all");
  const [msgText, setMsgText] = useState("");
  const [adminView, setAdminView] = useState("orders"); // orders | dashboard

  const handleLogin = () => {
    if (password === "admin123") setLoggedIn(true);
    else alert("كلمة المرور غير صحيحة!");
  };

  if (!loggedIn) {
    return (
      <div style={{ maxWidth: 400, margin: "80px auto", padding: "0 16px" }}>
        <div className="card" style={{ padding: 36, textAlign: "center" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🔐</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>لوحة التحكم</h2>
          <p style={{ color: "var(--gray)", marginBottom: 24, fontSize: 14 }}>أدخل كلمة المرور للوصول</p>
          <input className="input-field" type="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} style={{ marginBottom: 14, textAlign: "center" }} />
          <button className="btn-primary" onClick={handleLogin} style={{ width: "100%", justifyContent: "center" }}>دخول</button>
          <p style={{ color: "var(--gray)", fontSize: 12, marginTop: 12 }}>* للتجربة: admin123</p>
        </div>
      </div>
    );
  }

  const pending = orders.filter((o) => o.status === "pending");
  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const handleStatusChange = (orderId, status) => {
    onUpdateOrder(orderId, { status });
    if (activeOrder?.id === orderId) setActiveOrder((prev) => ({ ...prev, status }));
  };

  const handleToggleItem = (orderId, itemIdx) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;
    const newItems = order.items.map((it, i) =>
      i === itemIdx ? { ...it, available: !it.available } : it
    );
    const newTotal = newItems.filter(it => it.available).reduce((s, it) => s + it.price * it.qty, 0);
    onUpdateOrder(orderId, { items: newItems, total: newTotal });
    setActiveOrder((prev) => prev ? { ...prev, items: newItems, total: newTotal } : prev);
  };

  const handleSendMsg = (orderId) => {
    if (!msgText.trim()) return;
    onSendMessage(orderId, msgText, "admin");
    setMsgText("");
    const updated = orders.find((o) => o.id === orderId);
    if (updated) setActiveOrder({ ...updated, messages: [...updated.messages, { from: "admin", text: msgText, time: new Date() }] });
  };

  return (
    <div style={{ display: "flex", height: "calc(100vh - 70px)" }}>
      {/* Sidebar */}
      <div style={{ width: 280, background: "var(--green-dark)", color: "white", display: "flex", flexDirection: "column", overflowY: "auto" }} className="scrollbar-hide">
        <div style={{ padding: "20px 16px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ fontWeight: 800, fontSize: 17 }}>🏪 لوحة التحكم</div>
          <div style={{ fontSize: 13, opacity: 0.7, marginTop: 2 }}>مرحباً أيها البقال!</div>
        </div>

        <div style={{ padding: 12 }}>
          {[
            { key: "orders", icon: "📦", label: "الطلبات", count: pending.length },
            { key: "dashboard", icon: "📊", label: "الإحصائيات", count: null },
          ].map((tab) => (
            <button key={tab.key} onClick={() => setAdminView(tab.key)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 10,
              background: adminView === tab.key ? "rgba(255,255,255,0.15)" : "transparent",
              border: "none", color: "white", cursor: "pointer", fontFamily: "'Cairo',sans-serif",
              fontSize: 14, fontWeight: 600, marginBottom: 4, textAlign: "right", direction: "rtl"
            }}>
              <span>{tab.icon}</span>
              <span style={{ flex: 1 }}>{tab.label}</span>
              {tab.count > 0 && <span style={{ background: "#e8762a", borderRadius: "50%", minWidth: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>{tab.count}</span>}
            </button>
          ))}
        </div>

        <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: "auto" }}>
          <div style={{ fontSize: 13, opacity: 0.6 }}>إجمالي الطلبات: {orders.length}</div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflowY: "auto", background: "#f0ede8" }}>
        {adminView === "dashboard" && (
          <div style={{ padding: 24 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20 }}>📊 الإحصائيات</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 24 }}>
              {[
                { label: "إجمالي الطلبات", value: orders.length, icon: "📦", border: "#2a7d4f" },
                { label: "قيد الانتظار", value: orders.filter(o => o.status === "pending").length, icon: "⏳", border: "#f59e0b" },
                { label: "تم التأكيد", value: orders.filter(o => o.status === "confirmed").length, icon: "✅", border: "#10b981" },
                { label: "تم التسليم", value: orders.filter(o => o.status === "delivered").length, icon: "🎉", border: "#6b7280" },
              ].map((s, i) => (
                <div key={i} className="stat-card" style={{ borderBottomColor: s.border }}>
                  <div style={{ fontSize: 36 }}>{s.icon}</div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: s.border, margin: "6px 0" }}>{s.value}</div>
                  <div style={{ fontSize: 13, color: "var(--gray)", fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding: 20 }}>
              <h3 style={{ fontWeight: 700, marginBottom: 14 }}>الإيرادات الإجمالية</h3>
              <div style={{ fontSize: 36, fontWeight: 900, color: "var(--green)" }}>
                {orders.filter(o => o.status !== "cancelled").reduce((s, o) => s + o.total, 0).toFixed(2)} <span style={{ fontSize: 18, fontWeight: 500 }}>د.م</span>
              </div>
            </div>
          </div>
        )}

        {adminView === "orders" && !activeOrder && (
          <div style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800 }}>📦 إدارة الطلبات</h2>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[["all", "الكل"], ["pending", "انتظار"], ["confirmed", "مؤكد"], ["delivering", "توصيل"], ["delivered", "مسلّم"]].map(([k, l]) => (
                  <button key={k} onClick={() => setFilter(k)} style={{
                    padding: "6px 14px", borderRadius: 20, border: "2px solid",
                    borderColor: filter === k ? "var(--green)" : "var(--border)",
                    background: filter === k ? "var(--green)" : "white",
                    color: filter === k ? "white" : "var(--gray)",
                    cursor: "pointer", fontSize: 13, fontFamily: "'Cairo',sans-serif", fontWeight: 600
                  }}>{l}</button>
                ))}
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="card" style={{ padding: 60, textAlign: "center" }}>
                <div style={{ fontSize: 48 }}>📭</div>
                <p style={{ marginTop: 12, fontWeight: 600, color: "var(--gray)" }}>لا توجد طلبات</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((order) => (
                  <div key={order.id} className="order-card" style={{ cursor: "pointer" }} onClick={() => setActiveOrder(order)}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                      <div>
                        <span style={{ fontWeight: 900, fontSize: 16, color: "var(--green)" }}>{order.id}</span>
                        <div style={{ fontSize: 12, color: "var(--gray)", marginTop: 2 }}>{formatTime(order.createdAt)}</div>
                      </div>
                      <StatusBadge status={order.status} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>👤 {order.customer.name}</div>
                        <div style={{ fontSize: 13, color: "var(--gray)" }}>📞 {order.customer.phone}</div>
                        <div style={{ fontSize: 13, color: "var(--gray)", marginTop: 2 }}>{order.items.length} منتجات</div>
                      </div>
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontWeight: 800, fontSize: 18, color: "var(--orange)" }}>{order.total.toFixed(2)} د.م</div>
                        <div style={{ fontSize: 12, color: "var(--green)", marginTop: 4 }}>اضغط للتفاصيل →</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {adminView === "orders" && activeOrder && (() => {
          const order = orders.find(o => o.id === activeOrder.id) || activeOrder;
          return (
            <div style={{ padding: 24 }}>
              <button onClick={() => setActiveOrder(null)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: "var(--green)", fontWeight: 700, fontSize: 14, marginBottom: 16, fontFamily: "'Cairo',sans-serif" }}>
                ← العودة للطلبات
              </button>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {/* Left: Order details */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div className="card" style={{ padding: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                      <h3 style={{ fontWeight: 800, fontSize: 17 }}>{order.id}</h3>
                      <StatusBadge status={order.status} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {[
                        ["👤", "الاسم", order.customer.name],
                        ["📞", "الهاتف", order.customer.phone],
                        ["📍", "العنوان", order.customer.address],
                        ["🕐", "تاريخ الطلب", formatTime(order.createdAt)],
                      ].map(([icon, label, val]) => (
                        <div key={label} style={{ display: "flex", gap: 8, fontSize: 14 }}>
                          <span>{icon}</span>
                          <span style={{ color: "var(--gray)" }}>{label}:</span>
                          <span style={{ fontWeight: 600 }}>{val}</span>
                        </div>
                      ))}
                      {order.customer.notes && (
                        <div style={{ background: "#fef3c7", borderRadius: 8, padding: "8px 12px", fontSize: 13 }}>
                          💬 {order.customer.notes}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status actions */}
                  <div className="card" style={{ padding: 20 }}>
                    <h3 style={{ fontWeight: 700, marginBottom: 14, fontSize: 15 }}>⚙️ تغيير الحالة</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {[
                        ["confirmed", "✅ تأكيد الطلب", "var(--green)"],
                        ["modified", "✏️ تم التعديل", "#3b82f6"],
                        ["delivering", "🚗 جاري التوصيل", "#8b5cf6"],
                        ["delivered", "🎉 تم التسليم", "#6b7280"],
                        ["cancelled", "❌ إلغاء", "#ef4444"],
                      ].map(([s, l, c]) => (
                        <button key={s} onClick={() => handleStatusChange(order.id, s)} style={{
                          padding: "8px 14px", borderRadius: 8, border: `2px solid ${c}`,
                          background: order.status === s ? c : "white",
                          color: order.status === s ? "white" : c,
                          cursor: "pointer", fontSize: 13, fontFamily: "'Cairo',sans-serif", fontWeight: 600
                        }}>{l}</button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Items + Chat */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div className="card" style={{ padding: 20 }}>
                    <h3 style={{ fontWeight: 700, marginBottom: 14, fontSize: 15 }}>🛒 المنتجات — اضغط لتعديل التوفر</h3>
                    {order.items.map((item, idx) => (
                      <div key={idx} style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "10px 12px", borderRadius: 10, marginBottom: 8,
                        background: item.available ? "var(--green-light)" : "#fee2e2",
                        cursor: "pointer", transition: "all 0.2s",
                        border: `2px solid ${item.available ? "transparent" : "#fecaca"}`
                      }} onClick={() => handleToggleItem(order.id, idx)}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: 24 }}>{item.emoji}</span>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</div>
                            <div style={{ fontSize: 12, color: "var(--gray)" }}>× {item.qty} {item.unit}</div>
                          </div>
                        </div>
                        <div style={{ textAlign: "left" }}>
                          <div style={{ fontWeight: 700, color: item.available ? "var(--green)" : "#ef4444" }}>
                            {item.available ? "✅ متوفر" : "❌ غير متوفر"}
                          </div>
                          <div style={{ fontSize: 13, fontWeight: 600 }}>{(item.price * item.qty).toFixed(2)} د.م</div>
                        </div>
                      </div>
                    ))}
                    <div style={{ borderTop: "2px dashed var(--border)", paddingTop: 12, display: "flex", justifyContent: "space-between", fontWeight: 800 }}>
                      <span>المجموع</span>
                      <span style={{ color: "var(--green)", fontSize: 18 }}>{order.total.toFixed(2)} د.م</span>
                    </div>
                  </div>

                  {/* Chat */}
                  <div className="card" style={{ padding: 20 }}>
                    <h3 style={{ fontWeight: 700, marginBottom: 14, fontSize: 15 }}>💬 التواصل مع الزبون</h3>
                    <div style={{ minHeight: 120, maxHeight: 200, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }} className="scrollbar-hide">
                      {order.messages.length === 0 && (
                        <p style={{ color: "var(--gray)", fontSize: 13, textAlign: "center", paddingTop: 20 }}>لا توجد رسائل بعد</p>
                      )}
                      {order.messages.map((msg, i) => (
                        <div key={i} className={`chat-bubble ${msg.from}`} style={{ display: "block", alignSelf: msg.from === "admin" ? "flex-start" : "flex-end" }}>
                          <p style={{ fontSize: 14 }}>{msg.text}</p>
                          <p style={{ fontSize: 11, color: "var(--gray)", marginTop: 3 }}>{msg.from === "admin" ? "البقال" : "الزبون"} · {formatTime(msg.time)}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <input className="input-field" placeholder="رسالة للزبون..." value={msgText} onChange={(e) => setMsgText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSendMsg(order.id)} style={{ flex: 1 }} />
                      <button className="btn-primary" onClick={() => handleSendMsg(order.id)}>إرسال</button>
                    </div>
                    <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {["المنتج غير متوفر حالياً", "طلبك تم تأكيده ✅", "سيتم التوصيل خلال 30 دقيقة 🚗", "يرجى التواصل للتأكيد"].map((t) => (
                        <button key={t} onClick={() => setMsgText(t)} style={{
                          background: "#f3f4f6", border: "none", borderRadius: 20, padding: "4px 10px",
                          fontSize: 12, cursor: "pointer", fontFamily: "'Cairo',sans-serif", color: "#374151"
                        }}>{t}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

// ==================== MAIN APP ====================
export default function App() {
  const [page, setPage] = useState("shop"); // shop | track | admin
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("الكل");
  const [search, setSearch] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderDone, setOrderDone] = useState(null);
  const [orders, setOrders] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchCat = category === "الكل" || p.category === category;
    const matchSearch = p.name.includes(search) || p.category.includes(search);
    return matchCat && matchSearch;
  });

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, item) => {
    const p = PRODUCTS.find((x) => x.id === item.productId);
    return s + (p ? p.price * item.qty : 0);
  }, 0);

  const addToCart = (productId) => {
    setCart((prev) => {
      const existing = prev.find((x) => x.productId === productId);
      if (existing) return prev.map((x) => x.productId === productId ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { productId, qty: 1 }];
    });
    const p = PRODUCTS.find((x) => x.id === productId);
    showToast(`تمت إضافة ${p?.name} إلى السلة`);
  };

  const updateQty = (productId, qty) => {
    if (qty <= 0) setCart((prev) => prev.filter((x) => x.productId !== productId));
    else setCart((prev) => prev.map((x) => x.productId === productId ? { ...x, qty } : x));
  };

  const removeFromCart = (productId) => setCart((prev) => prev.filter((x) => x.productId !== productId));

  const handleCheckout = (form) => {
    const orderId = generateOrderId();
    const newOrder = {
      id: orderId,
      customer: form,
      items: cart.map((item) => {
        const p = PRODUCTS.find((x) => x.id === item.productId);
        return { ...p, qty: item.qty, available: true };
      }),
      total: cartTotal,
      status: "pending",
      messages: [],
      createdAt: new Date(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setShowCheckout(false);
    setShowCart(false);
    setOrderDone(orderId);
  };

  const updateOrder = (orderId, updates) => {
    setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, ...updates } : o));
  };

  const sendMessage = (orderId, text, from) => {
    setOrders((prev) => prev.map((o) =>
      o.id === orderId ? { ...o, messages: [...o.messages, { from, text, time: new Date() }] } : o
    ));
  };

  return (
    <>
      <style>{styles}</style>

      {/* HEADER */}
      <header style={{ background: "var(--green)", color: "white", position: "sticky", top: 0, zIndex: 800, boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 28 }}>🏪</span>
            <div>
              <div style={{ fontWeight: 900, fontSize: 18, lineHeight: 1 }}>البقالة</div>
              <div style={{ fontSize: 11, opacity: 0.8 }}>توصيل سريع</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.15)", borderRadius: 50, padding: 4 }}>
            {[["shop", "🛍 المتجر"], ["track", "📦 طلباتي"], ["admin", "⚙️ الإدارة"]].map(([k, l]) => (
              <button key={k} className={`nav-tab ${page === k ? "active" : ""}`} onClick={() => setPage(k)}>{l}</button>
            ))}
          </div>

          {page === "shop" && (
            <button onClick={() => setShowCart(true)} style={{
              background: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.4)",
              borderRadius: 12, padding: "8px 16px", color: "white", cursor: "pointer",
              fontFamily: "'Cairo',sans-serif", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", gap: 8,
              position: "relative"
            }}>
              🛒 <span>{cartCount > 0 ? `${cartCount} منتج · ${cartTotal.toFixed(0)} د.م` : "السلة"}</span>
              {cartCount > 0 && (
                <span style={{
                  position: "absolute", top: -8, left: -8, background: "var(--orange)",
                  color: "white", borderRadius: "50%", width: 20, height: 20,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900
                }}>{cartCount}</span>
              )}
            </button>
          )}
        </div>
      </header>

      {/* CONTENT */}
      <div style={{ minHeight: "calc(100vh - 64px)" }}>
        {page === "shop" && (
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px" }}>
            {/* Hero */}
            <div style={{ background: "linear-gradient(135deg, var(--green) 0%, #3a9d63 100%)", borderRadius: 20, padding: "28px 32px", color: "white", marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
              <div>
                <h1 style={{ fontSize: 26, fontWeight: 900, marginBottom: 6 }}>أهلاً بك في بقالتنا! 🌿</h1>
                <p style={{ opacity: 0.85, fontSize: 15 }}>اطلب من المنزل وسنوصل إليك بسرعة</p>
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {[["🚀", "توصيل سريع"], ["✅", "منتجات طازجة"], ["💰", "أسعار مناسبة"]].map(([icon, text]) => (
                  <div key={text} style={{ background: "rgba(255,255,255,0.2)", borderRadius: 10, padding: "8px 14px", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                    {icon} {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="search-bar" style={{ marginBottom: 20, maxWidth: 400 }}>
              <span>🔍</span>
              <input placeholder="ابحث عن منتج..." value={search} onChange={(e) => setSearch(e.target.value)} />
              {search && <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--gray)", fontSize: 16 }}>×</button>}
            </div>

            {/* Categories */}
            <div style={{ display: "flex", gap: 8, marginBottom: 24, overflowX: "auto", paddingBottom: 4 }} className="scrollbar-hide">
              {CATEGORIES.map((cat) => {
                const icons = { "الكل": "🛒", "خضروات": "🥦", "فواكه": "🍎", "ألبان": "🥛", "مخبزة": "🍞", "بقالة": "🫙", "مشروبات": "☕" };
                return (
                  <button key={cat} onClick={() => setCategory(cat)} style={{
                    padding: "8px 18px", borderRadius: 50, border: "2px solid",
                    borderColor: category === cat ? "var(--green)" : "var(--border)",
                    background: category === cat ? "var(--green)" : "white",
                    color: category === cat ? "white" : "#374151",
                    cursor: "pointer", fontFamily: "'Cairo',sans-serif", fontSize: 14, fontWeight: 600,
                    whiteSpace: "nowrap", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 6
                  }}>
                    {icons[cat]} {cat}
                  </button>
                );
              })}
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "var(--gray)" }}>
                <div style={{ fontSize: 56 }}>🔍</div>
                <p style={{ marginTop: 12, fontWeight: 600, fontSize: 16 }}>لا توجد منتجات</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 14 }}>
                {filteredProducts.map((product) => {
                  const inCart = cart.find((x) => x.productId === product.id);
                  return (
                    <div key={product.id} className="product-card">
                      <div style={{ fontSize: 48, textAlign: "center", marginBottom: 10, background: "var(--green-light)", borderRadius: 12, padding: "12px 0" }}>{product.emoji}</div>
                      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{product.name}</div>
                      <div style={{ fontSize: 12, color: "var(--gray)", marginBottom: 10 }}>لكل {product.unit}</div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontWeight: 800, color: "var(--green)", fontSize: 16 }}>{product.price.toFixed(2)} <span style={{ fontSize: 11, fontWeight: 500 }}>د.م</span></span>
                        {inCart ? (
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <button className="qty-btn minus" onClick={() => updateQty(product.id, inCart.qty - 1)}>−</button>
                            <span style={{ fontWeight: 700, minWidth: 18, textAlign: "center", fontSize: 14 }}>{inCart.qty}</span>
                            <button className="qty-btn plus" onClick={() => updateQty(product.id, inCart.qty + 1)}>+</button>
                          </div>
                        ) : (
                          <button onClick={() => addToCart(product.id)} style={{
                            background: "var(--green)", color: "white", border: "none",
                            borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 18,
                            display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s"
                          }}>+</button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {page === "track" && (
          <div style={{ padding: "24px 0" }}>
            <TrackOrder orders={orders} />
          </div>
        )}

        {page === "admin" && (
          <AdminPanel orders={orders} products={PRODUCTS} onUpdateOrder={updateOrder} onSendMessage={sendMessage} />
        )}
      </div>

      {/* CART SIDEBAR */}
      {showCart && (
        <CartSidebar
          cart={cart} products={PRODUCTS}
          onClose={() => setShowCart(false)}
          onUpdateQty={updateQty} onRemove={removeFromCart}
          onCheckout={() => { setShowCart(false); setShowCheckout(true); }}
        />
      )}

      {/* CHECKOUT MODAL */}
      {showCheckout && (
        <CheckoutModal
          cart={cart} products={PRODUCTS}
          onClose={() => setShowCheckout(false)}
          onSubmit={handleCheckout}
        />
      )}

      {/* ORDER CONFIRMED */}
      {orderDone && (
        <OrderConfirmed orderId={orderDone} onClose={() => setOrderDone(null)} />
      )}

      {/* TOAST */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </>
  );
}
