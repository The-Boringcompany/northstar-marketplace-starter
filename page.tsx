 "use client";

import { useMemo, useState } from "react";
import { Search, ShoppingBag, MapPin, UserRound, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { categories, products } from "@/lib/products";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [showCart, setShowCart] = useState(false);

  const filtered = useMemo(() => products.filter(p =>
    (category === "All" || p.category === category) &&
    `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(query.toLowerCase())
  ), [query, category]);

  const count = Object.values(cart).reduce((a,b) => a+b, 0);
  const total = products.reduce((sum,p) => sum + p.price * (cart[p.id] || 0), 0);
  const add = (id: string) => setCart(old => ({...old, [id]: (old[id] || 0) + 1}));

  return (
    <>
      <div className="topline"><div className="wrap" style={{display:"flex",justifyContent:"space-between",gap:12}}>
        <span>Thoughtful finds for everyday life</span><span>Free delivery on orders over €50*</span>
      </div></div>
      <header className="header">
        <div className="wrap">
          <div className="header-main">
            <a href="#" className="brand" aria-label="Northstar Market home">northstar<span>✦</span></a>
            <div className="header-link optional"><span style={{display:"flex",gap:5,alignItems:"center"}}><MapPin size={17}/><span>Deliver to<strong>Italy</strong></span></span></div>
            <form className="search" onSubmit={e => {e.preventDefault(); document.getElementById("products")?.scrollIntoView({behavior:"smooth"});}}>
              <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products, categories and more…" aria-label="Search products" />
              <button aria-label="Search"><Search size={19}/></button>
            </form>
            <a className="header-link optional" href="#account"><span>Hello, welcome</span><strong><UserRound size={14} style={{display:"inline",verticalAlign:"middle"}}/> Your account</strong></a>
            <button onClick={()=>setShowCart(!showCart)} className="header-link" style={{border:0,background:"transparent",color:"white",display:"flex",alignItems:"center",gap:7}}>
              <span style={{position:"relative"}}><ShoppingBag size={25}/>{count>0&&<span style={{position:"absolute",top:-8,right:-7,background:"#f6c453",color:"#17212b",borderRadius:99,fontSize:10,fontWeight:900,padding:"2px 5px"}}>{count}</span>}</span><strong>Cart</strong>
            </button>
          </div>
          <nav className="nav"><a href="#products">Shop all</a><a href="#products" onClick={()=>setCategory("Electronics")}>Electronics</a><a href="#products" onClick={()=>setCategory("Home")}>Home & living</a><a href="#products" onClick={()=>setCategory("Fashion")}>Fashion</a><a href="#products" onClick={()=>setCategory("Sports")}>Sports & outdoors</a><a href="#benefits">Why Northstar?</a></nav>
        </div>
      </header>

      <main className="wrap">
        <section className="hero">
          <div>
            <div className="hero-kicker">The everyday edit · No. 01</div>
            <h1>Good finds.<br/>Better everyday.</h1>
            <p>Discover clever essentials for your home, your routine and wherever life takes you.</p>
            <a className="primary" href="#products">Explore the collection&nbsp; →</a>
          </div>
          <div className="hero-art" aria-hidden="true">🛍️</div>
        </section>

        <div className="value-strip" id="benefits">
          <div className="value"><span className="value-icon"><Truck size={25}/></span><div><strong>Delivery made simple</strong><small>Clear shipping at checkout</small></div></div>
          <div className="value"><span className="value-icon"><ShieldCheck size={25}/></span><div><strong>Checkout with confidence</strong><small>Designed with security in mind</small></div></div>
          <div className="value"><span className="value-icon"><PackageCheck size={25}/></span><div><strong>Everyday essentials</strong><small>Useful picks, thoughtfully chosen</small></div></div>
        </div>

        <section id="products">
          <div className="section-head"><div><div className="muted">A little something for everyone</div><h2>Explore our picks</h2></div><div className="muted">{filtered.length} products</div></div>
          <div className="categories" role="group" aria-label="Filter by category">
            {categories.map(c=><button key={c} className={`chip ${category===c?"active":""}`} onClick={()=>setCategory(c)}>{c}</button>)}
          </div>
          <div className="grid" style={{marginTop:16}}>
            {filtered.map(p=><article className="card" key={p.id}>
              <div className="product-art" style={{background:p.color}}>
                {p.badge&&<span className="badge">{p.badge}</span>}
                <span className="product-emoji" aria-hidden="true">{p.emoji}</span>
              </div>
              <div className="card-body">
                <div className="category-label">{p.category}</div>
                <h3>{p.name}</h3>
                <div className="rating" aria-label={`${p.rating} out of 5 stars`}>★★★★★ <span>{p.rating} ({p.reviews.toLocaleString()})</span></div>
                <div className="price-row"><span className="price">€{p.price.toFixed(2)}</span>{p.oldPrice&&<span className="old-price">€{p.oldPrice.toFixed(2)}</span>}</div>
                <button className="add-btn" onClick={()=>add(p.id)}>Add to cart</button>
              </div>
            </article>)}
          </div>
          {filtered.length===0&&<div className="notice" style={{marginTop:16}}>No products found. Try another search or category.</div>}
        </section>

        <section id="account" style={{marginTop:32}} className="notice">
          <strong>Store preview:</strong> This starter includes a working client-side product search, category filters and cart. Customer accounts, persistent orders, live inventory and payment processing must be connected and configured before launch.
        </section>
      </main>

      <footer className="footer"><div className="wrap footer-inner">
        <div><div className="brand">northstar<span>✦</span></div><p style={{color:"#c1d0d8"}}>Everyday finds, made simple.</p></div>
        <div>Help & support&nbsp;&nbsp; · &nbsp;&nbsp;Delivery&nbsp;&nbsp; · &nbsp;&nbsp;Returns&nbsp;&nbsp; · &nbsp;&nbsp;Privacy</div>
        <div style={{color:"#c1d0d8"}}>© {new Date().getFullYear()} Northstar Market · Demo storefront</div>
      </div></footer>

      {count>0&&<div className="cart-panel"><div><strong><ShoppingBag size={16} style={{display:"inline",verticalAlign:"middle"}}/> {count} item{count!==1?"s":""}</strong><div style={{fontSize:12,opacity:.85}}>€{total.toFixed(2)}</div></div><button onClick={()=>setShowCart(!showCart)}>{showCart?"Close cart":"View cart"}</button></div>}
      {showCart&&<div style={{position:"fixed",right:18,bottom:showCart&&count?95:18,zIndex:19,width:"min(360px,calc(100vw - 36px))",background:"white",padding:20,borderRadius:12,boxShadow:"0 10px 45px #17212b30"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><h3 style={{marginTop:0}}>Your cart</h3><button onClick={()=>setShowCart(false)} style={{border:0,background:"transparent",fontSize:20}}>×</button></div>
        {count===0?<p className="muted">Your cart is empty. Add something you like.</p>:<>
          {products.filter(p=>cart[p.id]).map(p=><div key={p.id} style={{display:"flex",justifyContent:"space-between",gap:10,padding:"10px 0",borderBottom:"1px solid #edf0f2",fontSize:13}}><span>{p.emoji} {p.name} × {cart[p.id]}</span><strong>€{(p.price*cart[p.id]).toFixed(2)}</strong></div>)}
          <div style={{display:"flex",justifyContent:"space-between",margin:"16px 0"}}><strong>Subtotal</strong><strong>€{total.toFixed(2)}</strong></div>
          <button className="primary" style={{width:"100%"}} onClick={()=>alert("Checkout is not activated yet. Connect Supabase and Stripe using the README setup guide before accepting payments.")}>Continue to checkout</button>
        </>}
      </div>}
    </>
  );
}