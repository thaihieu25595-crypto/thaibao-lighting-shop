import { useState, useRef, useEffect } from "react";

const CATALOGUES_TRANG_TRI = [
  { name: "ĐÈN TRANG TRÍ ANDORA LIGHT", img: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=300&q=80" },
  { name: "ĐÈN TRANG TRÍ VERONIA LIGHTING", img: "https://images.unsplash.com/photo-1513506003901-1e6a35f09b15?w=300&q=80" },
  { name: "ĐÈN TRANG TRÍ 355 LIGHTING", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80" },
  { name: "ĐÈN TRANG TRÍ HUFA LIGHTING", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80" },
  { name: "ĐÈN TRANG TRÍ SLISTER A", img: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=300&q=80" },
  { name: "ĐÈN TRANG TRÍ 79 LIGHTING", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80" },
  { name: "QUẠT ĐÈN QVIFA FAN", img: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee?w=300&q=80" },
  { name: "ĐÈN TRANG TRÍ SANO LIGHTING", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&q=80" },
];
const CATALOGUES_CHIEU_SANG = [
  { name: "PANASONIC", img: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=300&q=80" },
  { name: "GS LIGHTING", img: "https://images.unsplash.com/photo-1513506003901-1e6a35f09b15?w=300&q=80" },
  { name: "VINALED LIGHTING", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80" },
  { name: "PHILIPS", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80" },
  { name: "RẠNG ĐÔNG", img: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=300&q=80" },
  { name: "DUHAL LIGHTING", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80" },
];
const PRODUCTS = [
  { id:1, category:"den-trang-tri", name:"Đèn Chùm Pha Lê Crystal", price:4850000, originalPrice:6200000, tag:"Bán chạy", img:"https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&q=80", desc:"Đèn chùm pha lê cao cấp phong cách cổ điển, toả sáng 360° với 48 bóng LED." },
  { id:2, category:"den-trang-tri", name:"Đèn Chùm Cổ Điển Luxury", price:1250000, originalPrice:null, tag:"Mới", img:"https://images.unsplash.com/photo-1513506003901-1e6a35f09b15?w=400&q=80", desc:"Đèn thả trần phong cách Bắc Âu tối giản, khung kim loại mạ vàng." },
  { id:3, category:"den-trang-tri", name:"Đèn Chùm Thông Tầng", price:12500000, originalPrice:15000000, tag:"Premium", img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", desc:"Đèn thông tầng đặc biệt cho không gian cao tầng. Chuỗi pha lê dài 3–6m." },
  { id:4, category:"den-trang-tri", name:"Đèn Chùm Hoa Lily 8 Tay", price:2099000, originalPrice:2500000, tag:"Hot", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", desc:"Đèn chùm hoa lily 8 tay sang trọng, phù hợp phòng khách, sảnh khách sạn." },
  { id:5, category:"den-tha", name:"Đèn Thả Nordic Tối Giản", price:860000, originalPrice:null, tag:null, img:"https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee?w=400&q=80", desc:"Đèn thả Nordic tối giản, chất liệu kim loại sơn tĩnh điện bền đẹp." },
  { id:6, category:"den-tha", name:"Đèn Thả Giếng Trời", price:4500000, originalPrice:5200000, tag:null, img:"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80", desc:"Đèn thả giếng trời kích thước lớn, phù hợp biệt thự, nhà phố cao cấp." },
  { id:7, category:"den-tha", name:"Đèn Thả Decor Gold", price:2625000, originalPrice:3000000, tag:null, img:"https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=400&q=80", desc:"Đèn thả decor mạ vàng cao cấp, điểm nhấn cho phòng ăn sang trọng." },
  { id:8, category:"mam-op-tran", name:"Đèn Mâm Hiện Đại MHĐ17", price:803000, originalPrice:null, tag:null, img:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80", desc:"Đèn mâm ốp trần hiện đại, tiết kiệm điện, ánh sáng dịu nhẹ." },
  { id:9, category:"mam-op-tran", name:"Đèn Ốp Trần Tròn OT19", price:419000, originalPrice:null, tag:null, img:"https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&q=80", desc:"Đèn ốp trần tròn thiết kế gọn, phù hợp phòng ngủ, hành lang." },
  { id:10, category:"quat-tran", name:"Quạt Trần Kết Hợp Đèn Aurora", price:3200000, originalPrice:3800000, tag:"Hot", img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", desc:"Quạt trần 5 cánh gỗ walnut, tích hợp đèn LED 3 chế độ màu. Điều khiển từ xa." },
  { id:11, category:"quat-tran", name:"Quạt Thông Tầng Cao Cấp", price:5500000, originalPrice:6200000, tag:"Premium", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", desc:"Quạt thông tầng cao cấp, cánh dài 132cm, mô-tơ DC tiết kiệm điện." },
  { id:12, category:"thiet-bi-dien", name:"Công Tắc Cảm Ứng Thông Minh", price:680000, originalPrice:null, tag:"Smart", img:"https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee?w=400&q=80", desc:"Công tắc cảm ứng WiFi, điều khiển qua app, tương thích mọi thiết bị chiếu sáng." },
];
const NAV_ITEMS = [
  { label: "TRANG CHỦ", key: "home" },
  { label: "GIỚI THIỆU", key: "about" },
  { label: "ĐÈN TRANG TRÍ", key: "den-trang-tri" },
  { label: "ĐÈN THẢ", key: "den-tha" },
  { label: "MÂM – ỐP TRẦN", key: "mam-op-tran" },
  { label: "QUẠT TRẦN ĐÈN", key: "quat-tran" },
  { label: "THIẾT BỊ ĐIỆN", key: "thiet-bi-dien" },
  { label: "CATALOGUE", key: "catalogue" },
  { label: "LIÊN HỆ", key: "contact" },
];
const BANNERS = [
  { img:"https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80", tag:"ĐÈN TRANG TRÍ CAO CẤP", title:"Chiếu Sáng\nChuyên Nghiệp", sub:"Hơn 500 mẫu đèn trang trí và chiếu sáng, phục vụ mọi không gian", badge:"GIẢM ĐẾN 30%" },
  { img:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80", tag:"QUẠT TRẦN CAO CẤP", title:"Thiết Kế\nĐẳng Cấp", sub:"Quạt trần kết hợp đèn – sang trọng, tiết kiệm điện, điều khiển thông minh", badge:"MẪU MỚI 2025" },
];
const fmt = n => n.toLocaleString("vi-VN") + "₫";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Montserrat:wght@600;700;800&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
:root{--blue:#0D5EAF;--blue-dark:#0A4A8F;--blue-light:#2196F3;--cyan:#00B4D8;--red:#E53935;--text:#1a1a2a;--muted:#666;--border:#e0e0e0;--bg:#f5f5f5;--white:#fff;}
body{font-family:'Roboto',sans-serif;background:var(--bg);color:var(--text);}
.topbar{background:var(--blue-dark);color:#fff;padding:6px 20px;display:flex;align-items:center;justify-content:space-between;font-size:12px;}
.topbar a{color:#fff;text-decoration:none;margin-left:12px;opacity:.85;}
.topbar a:hover{opacity:1;}
.header{background:#fff;padding:12px 20px;display:flex;align-items:center;gap:16px;box-shadow:0 2px 8px rgba(0,0,0,.08);position:sticky;top:0;z-index:200;}
.logo{display:flex;align-items:center;gap:10px;cursor:pointer;flex-shrink:0;}
.logo-img{width:52px;height:52px;background:var(--blue);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:700;font-family:'Montserrat',sans-serif;text-align:center;line-height:1.2;}
.logo-name{font-family:'Montserrat',sans-serif;font-size:18px;font-weight:800;color:var(--blue);line-height:1;}
.logo-name span{color:var(--red);}
.logo-slogan{font-size:10px;color:var(--muted);margin-top:2px;}
.search-wrap{flex:1;display:flex;max-width:600px;}
.search-wrap input{flex:1;border:2px solid var(--blue);border-right:none;padding:10px 16px;font-size:14px;outline:none;border-radius:4px 0 0 4px;font-family:inherit;}
.search-btn{background:var(--blue);color:#fff;border:none;padding:10px 20px;cursor:pointer;font-size:16px;border-radius:0 4px 4px 0;}
.hotline-btn{background:var(--cyan);color:#fff;border:none;padding:10px 20px;border-radius:30px;cursor:pointer;font-weight:700;font-size:13px;white-space:nowrap;display:flex;align-items:center;gap:8px;text-decoration:none;}
.cart-btn{position:relative;background:transparent;border:2px solid var(--blue);color:var(--blue);padding:9px 18px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:500;display:flex;align-items:center;gap:7px;font-family:inherit;transition:all .2s;}
.cart-btn:hover{background:var(--blue);color:#fff;}
.cart-badge{position:absolute;top:-8px;right:-8px;background:var(--red);color:#fff;border-radius:50%;width:19px;height:19px;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;}
.navbar{background:var(--blue);position:sticky;top:76px;z-index:199;}
.nav-inner{display:flex;align-items:center;overflow-x:auto;scrollbar-width:none;}
.nav-inner::-webkit-scrollbar{display:none;}
.nav-item{color:#fff;padding:13px 16px;font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap;transition:background .2s;border:none;background:none;font-family:inherit;}
.nav-item:hover,.nav-item.active{background:var(--blue-dark);}
.banner-wrap{position:relative;overflow:hidden;height:340px;}
.banner-slide{position:absolute;inset:0;display:flex;align-items:center;opacity:0;transition:opacity .6s;pointer-events:none;}
.banner-slide.active{opacity:1;pointer-events:auto;}
.banner-bg{position:absolute;inset:0;background-size:cover;background-position:center;filter:brightness(.45);}
.banner-content{position:relative;z-index:2;padding:0 60px;max-width:600px;}
.banner-badge{display:inline-block;background:var(--red);color:#fff;font-size:11px;font-weight:700;padding:5px 14px;border-radius:3px;letter-spacing:.08em;margin-bottom:12px;}
.banner-tag{font-size:12px;letter-spacing:.2em;color:#90E0EF;text-transform:uppercase;margin-bottom:8px;}
.banner-title{font-family:'Montserrat',sans-serif;font-size:clamp(28px,4vw,52px);font-weight:800;color:#fff;line-height:1.1;white-space:pre-line;margin-bottom:12px;}
.banner-sub{font-size:14px;color:rgba(255,255,255,.8);line-height:1.6;margin-bottom:22px;}
.banner-btns{display:flex;gap:12px;}
.bbtn-p{background:var(--red);color:#fff;border:none;padding:12px 28px;font-family:'Montserrat',sans-serif;font-size:13px;font-weight:700;border-radius:4px;cursor:pointer;}
.bbtn-s{background:transparent;border:2px solid #fff;color:#fff;padding:12px 24px;font-family:inherit;font-size:13px;border-radius:4px;cursor:pointer;}
.banner-dots{position:absolute;bottom:14px;left:50%;transform:translateX(-50%);display:flex;gap:7px;z-index:5;}
.bdot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.4);cursor:pointer;border:none;transition:all .2s;}
.bdot.on{background:#fff;width:22px;border-radius:4px;}
.benefits{background:#fff;padding:18px 20px;display:flex;gap:14px;flex-wrap:wrap;}
.benefit-item{flex:1;min-width:200px;background:var(--blue);color:#fff;border-radius:40px;padding:14px 24px;display:flex;align-items:center;gap:14px;cursor:pointer;transition:all .2s;}
.benefit-item:hover{background:var(--blue-dark);}
.benefit-text strong{font-family:'Montserrat',sans-serif;font-size:13px;font-weight:700;display:block;text-transform:uppercase;}
.benefit-text span{font-size:11px;opacity:.85;margin-top:2px;display:block;}
.section{padding:24px 20px;}
.section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;}
.section-title{font-family:'Montserrat',sans-serif;font-size:20px;font-weight:800;color:var(--blue);text-transform:uppercase;position:relative;padding-left:14px;}
.section-title::before{content:'';position:absolute;left:0;top:50%;transform:translateY(-50%);width:4px;height:80%;background:var(--red);border-radius:2px;}
.see-all{color:var(--blue);font-size:13px;border:1px solid var(--blue);padding:5px 14px;border-radius:3px;cursor:pointer;background:none;font-family:inherit;transition:all .2s;}
.see-all:hover{background:var(--blue);color:#fff;}
.cat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px;}
.cat-card{background:#fff;border:1px solid var(--border);border-radius:8px;overflow:hidden;cursor:pointer;transition:all .25s;display:flex;flex-direction:column;}
.cat-card:hover{border-color:var(--blue);box-shadow:0 4px 16px rgba(13,94,175,.15);transform:translateY(-3px);}
.cat-card-img{height:130px;overflow:hidden;background:#f9f9f9;}
.cat-card-img img{width:100%;height:100%;object-fit:cover;transition:transform .4s;}
.cat-card:hover .cat-card-img img{transform:scale(1.06);}
.cat-card-body{padding:10px 12px;flex:1;display:flex;flex-direction:column;justify-content:space-between;}
.cat-card-name{font-size:12px;font-weight:600;color:var(--text);line-height:1.4;margin-bottom:6px;}
.cat-card-btn{background:var(--blue);color:#fff;border:none;padding:7px;border-radius:4px;font-size:11px;font-weight:600;cursor:pointer;font-family:inherit;width:100%;letter-spacing:.04em;}
.prod-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px;}
.prod-card{background:#fff;border:1px solid var(--border);border-radius:8px;overflow:hidden;cursor:pointer;transition:all .25s;position:relative;}
.prod-card:hover{border-color:var(--blue);box-shadow:0 6px 20px rgba(0,0,0,.12);transform:translateY(-3px);}
.prod-img{height:200px;overflow:hidden;background:#f9f9f9;}
.prod-img img{width:100%;height:100%;object-fit:cover;transition:transform .4s;}
.prod-card:hover .prod-img img{transform:scale(1.06);}
.prod-tag{position:absolute;top:10px;left:10px;background:var(--red);color:#fff;font-size:10px;font-weight:700;padding:3px 9px;border-radius:3px;text-transform:uppercase;}
.prod-body{padding:12px 14px;}
.prod-name{font-size:14px;font-weight:600;color:var(--text);margin-bottom:6px;line-height:1.4;}
.prod-desc{font-size:12px;color:var(--muted);margin-bottom:10px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;line-height:1.5;}
.prod-price{display:flex;align-items:baseline;gap:8px;margin-bottom:12px;}
.price-main{font-family:'Montserrat',sans-serif;font-size:18px;font-weight:700;color:var(--red);}
.price-orig{font-size:12px;color:var(--muted);text-decoration:line-through;}
.prod-actions{display:grid;grid-template-columns:1fr 1fr;gap:7px;}
.btn-cart{background:transparent;border:1.5px solid var(--blue);color:var(--blue);padding:8px 6px;font-size:11px;font-weight:600;cursor:pointer;border-radius:4px;font-family:inherit;transition:all .2s;}
.btn-cart:hover{background:var(--blue);color:#fff;}
.btn-buy{background:var(--red);border:none;color:#fff;padding:8px 6px;font-size:11px;font-weight:600;cursor:pointer;border-radius:4px;font-family:inherit;}
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:400;}
.drawer{position:fixed;top:0;right:0;bottom:0;width:min(400px,100vw);background:#fff;z-index:500;display:flex;flex-direction:column;box-shadow:-8px 0 32px rgba(0,0,0,.18);}
.drawer-head{padding:18px 20px;background:var(--blue);color:#fff;display:flex;align-items:center;justify-content:space-between;}
.drawer-title{font-family:'Montserrat',sans-serif;font-size:18px;font-weight:700;}
.drawer-close{background:none;border:none;color:#fff;font-size:22px;cursor:pointer;}
.drawer-body{flex:1;overflow-y:auto;padding:16px 20px;}
.cart-empty{text-align:center;padding:50px 0;color:var(--muted);}
.cart-item{display:flex;gap:12px;padding:14px 0;border-bottom:1px solid var(--border);}
.cart-item-img{width:70px;height:70px;object-fit:cover;border-radius:6px;border:1px solid var(--border);}
.cart-item-name{font-size:13px;font-weight:600;color:var(--text);margin-bottom:4px;}
.cart-item-price{font-family:'Montserrat',sans-serif;font-size:15px;font-weight:700;color:var(--red);}
.cart-qty{display:flex;align-items:center;gap:8px;margin-top:7px;}
.qbtn{width:26px;height:26px;background:var(--bg);border:1px solid var(--border);color:var(--text);cursor:pointer;display:flex;align-items:center;justify-content:center;border-radius:4px;}
.qnum{font-size:13px;font-weight:600;min-width:22px;text-align:center;}
.rem-btn{background:none;border:none;color:#ccc;cursor:pointer;font-size:18px;margin-left:auto;}
.drawer-foot{padding:16px 20px;border-top:1px solid var(--border);background:#fafafa;}
.cart-row{display:flex;justify-content:space-between;font-size:13px;color:var(--muted);margin-bottom:6px;}
.cart-row.total{font-size:16px;font-weight:700;color:var(--text);padding-top:8px;border-top:2px solid var(--border);margin-top:4px;}
.cart-row.total .val{color:var(--red);font-family:'Montserrat',sans-serif;font-size:20px;}
.btn-checkout{width:100%;background:var(--red);color:#fff;border:none;padding:14px;font-family:'Montserrat',sans-serif;font-size:14px;font-weight:700;border-radius:6px;cursor:pointer;margin-bottom:9px;}
.btn-continue{width:100%;background:transparent;border:2px solid var(--blue);color:var(--blue);padding:11px;font-family:inherit;font-size:13px;font-weight:600;border-radius:6px;cursor:pointer;}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:600;display:flex;align-items:center;justify-content:center;padding:16px;}
.modal{background:#fff;border-radius:12px;max-width:820px;width:100%;max-height:90vh;overflow-y:auto;position:relative;}
.modal-close{position:absolute;top:12px;right:12px;z-index:10;background:#f5f5f5;border:none;width:34px;height:34px;border-radius:50%;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;color:var(--muted);}
.modal-grid{display:grid;grid-template-columns:1fr 1fr;}
.modal-img{height:380px;overflow:hidden;border-radius:12px 0 0 12px;}
.modal-img img{width:100%;height:100%;object-fit:cover;}
.modal-info{padding:28px 24px;display:flex;flex-direction:column;}
.modal-tag{display:inline-block;background:var(--red);color:#fff;font-size:10px;font-weight:700;padding:3px 10px;border-radius:3px;margin-bottom:10px;text-transform:uppercase;}
.modal-name{font-family:'Montserrat',sans-serif;font-size:22px;font-weight:800;color:var(--text);margin-bottom:10px;line-height:1.2;}
.modal-price{display:flex;align-items:baseline;gap:10px;margin-bottom:14px;}
.modal-price .mn{font-family:'Montserrat',sans-serif;font-size:28px;font-weight:700;color:var(--red);}
.modal-price .mo{font-size:13px;color:var(--muted);text-decoration:line-through;}
.modal-desc{font-size:14px;line-height:1.7;color:var(--muted);margin-bottom:18px;}
.modal-qty{display:flex;align-items:center;gap:12px;margin-bottom:18px;}
.modal-qty label{font-size:13px;font-weight:600;}
.modal-add{flex:1;background:var(--blue);color:#fff;border:none;padding:13px;border-radius:6px;font-family:'Montserrat',sans-serif;font-size:13px;font-weight:700;cursor:pointer;}
.modal-contact{font-size:12px;color:var(--muted);text-align:center;margin-top:10px;}
.modal-contact a{color:var(--blue);font-weight:600;}
.toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--blue);color:#fff;padding:12px 24px;border-radius:6px;font-size:14px;font-weight:500;z-index:999;box-shadow:0 4px 20px rgba(0,0,0,.3);animation:tup .3s ease;}
@keyframes tup{from{opacity:0;transform:translateX(-50%) translateY(12px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}
.footer{background:var(--blue-dark);color:#fff;padding:36px 20px 18px;}
.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:28px;margin-bottom:28px;}
.footer h4{font-family:'Montserrat',sans-serif;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-bottom:14px;padding-bottom:8px;border-bottom:2px solid var(--cyan);}
.footer p,.footer li{font-size:13px;opacity:.8;line-height:1.8;}
.footer ul{list-style:none;}
.footer-bottom{border-top:1px solid rgba(255,255,255,.15);padding-top:14px;text-align:center;font-size:12px;opacity:.6;}
.about-page,.contact-page{max-width:900px;margin:0 auto;padding:40px 20px;}
.about-hero{background:var(--blue);color:#fff;border-radius:12px;padding:40px;margin-bottom:32px;text-align:center;}
.about-hero h1{font-family:'Montserrat',sans-serif;font-size:36px;font-weight:800;margin-bottom:12px;}
.about-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:32px;}
.about-card{background:#fff;border-radius:10px;padding:24px;text-align:center;box-shadow:0 2px 10px rgba(0,0,0,.06);}
.about-card .icon{font-size:40px;margin-bottom:12px;}
.about-card h3{font-family:'Montserrat',sans-serif;font-size:16px;font-weight:700;color:var(--blue);margin-bottom:8px;}
.about-card p{font-size:13px;color:var(--muted);line-height:1.6;}
.about-section{background:#fff;border-radius:10px;padding:28px;margin-bottom:20px;}
.about-section h2{font-family:'Montserrat',sans-serif;font-size:20px;font-weight:700;color:var(--blue);margin-bottom:16px;}
.about-section p{font-size:14px;color:var(--muted);line-height:1.8;margin-bottom:10px;}
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;}
.contact-box{background:#fff;border-radius:10px;padding:28px;box-shadow:0 2px 10px rgba(0,0,0,.06);}
.contact-box h2{font-family:'Montserrat',sans-serif;font-size:20px;font-weight:700;color:var(--blue);margin-bottom:20px;}
.contact-item{display:flex;gap:14px;margin-bottom:18px;align-items:flex-start;}
.contact-icon{font-size:22px;flex-shrink:0;}
.contact-label{font-size:12px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:3px;}
.contact-value{font-size:15px;font-weight:600;color:var(--text);}
.contact-form input,.contact-form textarea{width:100%;border:1.5px solid var(--border);border-radius:6px;padding:11px 14px;font-size:13px;font-family:inherit;margin-bottom:12px;outline:none;}
.contact-form textarea{height:100px;resize:none;}
.contact-submit{width:100%;background:var(--blue);color:#fff;border:none;padding:13px;border-radius:6px;font-family:'Montserrat',sans-serif;font-size:14px;font-weight:700;cursor:pointer;}
@media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr;}.about-grid{grid-template-columns:1fr 1fr;}.contact-grid{grid-template-columns:1fr;}.modal-grid{grid-template-columns:1fr;}.modal-img{border-radius:12px 12px 0 0;height:250px;}}
@media(max-width:640px){.header{flex-wrap:wrap;padding:10px 12px;gap:10px;}.search-wrap{order:3;max-width:100%;width:100%;}.navbar{top:0;}.banner-wrap{height:260px;}.banner-content{padding:0 20px;}.banner-title{font-size:24px;}.benefits{flex-direction:column;}.prod-grid{grid-template-columns:1fr 1fr;}.cat-grid{grid-template-columns:1fr 1fr;}.footer-grid{grid-template-columns:1fr;}.about-grid{grid-template-columns:1fr;}}
`;

export default function App() {
  const [page, setPage] = useState("home");
  const [cat, setCat] = useState("den-trang-tri");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [dqty, setDqty] = useState(1);
  const [toast, setToast] = useState(null);
  const [bannerIdx, setBannerIdx] = useState(0);
  const [search, setSearch] = useState("");
  const timer = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setBannerIdx(i => (i+1) % BANNERS.length), 4500);
    return () => clearInterval(t);
  }, []);

  const showToast = msg => { setToast(msg); clearTimeout(timer.current); timer.current = setTimeout(() => setToast(null), 2800); };
  const addCart = (p, qty=1) => {
    setCart(prev => { const ex=prev.find(i=>i.id===p.id); if(ex) return prev.map(i=>i.id===p.id?{...i,qty:i.qty+qty}:i); return [...prev,{...p,qty}]; });
    showToast("Đã thêm vào giỏ hàng"); setDetail(null);
  };
  const items = cart.reduce((s,i)=>s+i.qty,0);
  const sub = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const ship = sub>5000000?0:80000;
  const tot = sub+ship;
  const gotoShop = k => { setCat(k); setPage("shop"); };
  const filtered = page==="shop" ? PRODUCTS.filter(p=>p.category===cat)
    : search ? PRODUCTS.filter(p=>p.name.toLowerCase().includes(search.toLowerCase())) : PRODUCTS;

  return (
    <>
      <style>{css}</style>
      <div className="topbar">
        <span>🏠 Cửa hàng đèn trang trí uy tín tại Đà Nẵng</span>
        <div><a href="tel:0935351095">📞 0935 351 095</a><a href="#">Zalo</a><a href="#">Facebook</a></div>
      </div>
      <header className="header">
        <div className="logo" onClick={()=>setPage("home")}>
          <div className="logo-img">THÁI<br/>BẢO</div>
          <div><div className="logo-name">THÁI BẢO <span>LIGHTING</span></div><div className="logo-slogan">Chiếu sáng chuyên nghiệp</div></div>
        </div>
        <div className="search-wrap">
          <input placeholder="Tìm kiếm đèn trang trí, quạt trần..." value={search}
            onChange={e=>{setSearch(e.target.value);if(e.target.value)setPage("search");else setPage("home");}}
            onKeyDown={e=>e.key==="Enter"&&search&&setPage("search")}/>
          <button className="search-btn" onClick={()=>search&&setPage("search")}>🔍</button>
        </div>
        <a href="tel:0935351095" className="hotline-btn">📞 HOTLINE: 0935 351 095</a>
        <button className="cart-btn" onClick={()=>setCartOpen(true)}>
          🛒 Giỏ hàng{items>0&&<span className="cart-badge">{items}</span>}
        </button>
      </header>
      <nav className="navbar">
        <div className="nav-inner">
          {NAV_ITEMS.map(n=>(
            <button key={n.key} className={"nav-item"+(page===n.key||(page==="shop"&&cat===n.key)?" active":"")}
              onClick={()=>{if(n.key==="home")setPage("home");else if(n.key==="about")setPage("about");else if(n.key==="catalogue")setPage("catalogue");else if(n.key==="contact")setPage("contact");else gotoShop(n.key);}}>
              {n.label}
            </button>
          ))}
        </div>
      </nav>

      {(page==="home"||page==="search")&&<>
        {page==="home"&&<>
          <div className="banner-wrap">
            {BANNERS.map((b,i)=>(
              <div key={i} className={"banner-slide"+(i===bannerIdx?" active":"")}>
                <div className="banner-bg" style={{backgroundImage:`url(${b.img})`}}/>
                <div className="banner-content">
                  <div className="banner-badge">{b.badge}</div>
                  <div className="banner-tag">{b.tag}</div>
                  <h1 className="banner-title">{b.title}</h1>
                  <p className="banner-sub">{b.sub}</p>
                  <div className="banner-btns">
                    <button className="bbtn-p" onClick={()=>setPage("catalogue")}>XEM CATALOGUE</button>
                    <button className="bbtn-s" onClick={()=>gotoShop("den-trang-tri")}>MUA NGAY</button>
                  </div>
                </div>
              </div>
            ))}
            <div className="banner-dots">{BANNERS.map((_,i)=><button key={i} className={"bdot"+(i===bannerIdx?" on":"")} onClick={()=>setBannerIdx(i)}/>)}</div>
          </div>
          <div className="benefits">
            <div className="benefit-item"><span style={{fontSize:36}}>🚚</span><div className="benefit-text"><strong>GIAO HÀNG TOÀN QUỐC</strong><span>Miễn phí nội thành Đà Nẵng</span></div></div>
            <div className="benefit-item"><span style={{fontSize:36}}>🎁</span><div className="benefit-text"><strong>CHIẾT KHẤU CAO CHO ĐẠI LÝ</strong><span>Liên hệ để được báo giá tốt nhất</span></div></div>
            <div className="benefit-item"><span style={{fontSize:36}}>🎧</span><div className="benefit-text"><strong>HỖ TRỢ KHÁCH HÀNG NHIỆT TÌNH</strong><span>Tư vấn 8:00 – 20:00 mỗi ngày</span></div></div>
          </div>
          <div className="section">
            <div className="section-header"><h2 className="section-title">📖 CATALOGUE ĐÈN TRANG TRÍ</h2><button className="see-all" onClick={()=>setPage("catalogue")}>Xem tất cả</button></div>
            <div className="cat-grid">
              {CATALOGUES_TRANG_TRI.map((c,i)=>(
                <div className="cat-card" key={i} onClick={()=>gotoShop("den-trang-tri")}>
                  <div className="cat-card-img"><img src={c.img} alt={c.name}/></div>
                  <div className="cat-card-body"><div className="cat-card-name">{c.name}</div><button className="cat-card-btn">XEM CATALOGUE</button></div>
                </div>
              ))}
            </div>
          </div>
          <div className="section" style={{background:"#fff",marginTop:8}}>
            <div className="section-header"><h2 className="section-title">✨ SẢN PHẨM NỔI BẬT</h2><button className="see-all" onClick={()=>gotoShop("den-trang-tri")}>Xem tất cả</button></div>
            <div className="prod-grid">
              {PRODUCTS.slice(0,8).map(p=>(
                <div className="prod-card" key={p.id} onClick={()=>{setDetail(p);setDqty(1);}}>
                  {p.tag&&<div className="prod-tag">{p.tag}</div>}
                  <div className="prod-img"><img src={p.img} alt={p.name}/></div>
                  <div className="prod-body">
                    <div className="prod-name">{p.name}</div>
                    <div className="prod-desc">{p.desc}</div>
                    <div className="prod-price"><span className="price-main">{fmt(p.price)}</span>{p.originalPrice&&<span className="price-orig">{fmt(p.originalPrice)}</span>}</div>
                    <div className="prod-actions">
                      <button className="btn-cart" onClick={e=>{e.stopPropagation();addCart(p);}}>🛒 Giỏ hàng</button>
                      <button className="btn-buy" onClick={e=>{e.stopPropagation();window.open("tel:0935351095");}}>Mua ngay</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>}
        {page==="search"&&<div className="section">
          <div className="section-header"><h2 className="section-title">Kết quả: "{search}"</h2></div>
          {filtered.length===0?<div style={{textAlign:"center",padding:"50px",color:"var(--muted)"}}>Không tìm thấy sản phẩm phù hợp</div>:
          <div className="prod-grid">{filtered.map(p=>(
            <div className="prod-card" key={p.id} onClick={()=>{setDetail(p);setDqty(1);}}>
              {p.tag&&<div className="prod-tag">{p.tag}</div>}
              <div className="prod-img"><img src={p.img} alt={p.name}/></div>
              <div className="prod-body">
                <div className="prod-name">{p.name}</div>
                <div className="prod-price"><span className="price-main">{fmt(p.price)}</span>{p.originalPrice&&<span className="price-orig">{fmt(p.originalPrice)}</span>}</div>
                <div className="prod-actions">
                  <button className="btn-cart" onClick={e=>{e.stopPropagation();addCart(p);}}>🛒 Giỏ hàng</button>
                  <button className="btn-buy" onClick={e=>{e.stopPropagation();window.open("tel:0935351095");}}>Mua ngay</button>
                </div>
              </div>
            </div>
          ))}</div>}
        </div>}
      </>}

      {page==="shop"&&<div className="section">
        <div className="section-header"><h2 className="section-title">{NAV_ITEMS.find(n=>n.key===cat)?.label||"Sản phẩm"}</h2><span style={{fontSize:13,color:"var(--muted)"}}>({filtered.length} sản phẩm)</span></div>
        {filtered.length===0?<div style={{textAlign:"center",padding:"50px",color:"var(--muted)"}}>Đang cập nhật sản phẩm...</div>:
        <div className="prod-grid">{filtered.map(p=>(
          <div className="prod-card" key={p.id} onClick={()=>{setDetail(p);setDqty(1);}}>
            {p.tag&&<div className="prod-tag">{p.tag}</div>}
            <div className="prod-img"><img src={p.img} alt={p.name}/></div>
            <div className="prod-body">
              <div className="prod-name">{p.name}</div>
              <div className="prod-desc">{p.desc}</div>
              <div className="prod-price"><span className="price-main">{fmt(p.price)}</span>{p.originalPrice&&<span className="price-orig">{fmt(p.originalPrice)}</span>}</div>
              <div className="prod-actions">
                <button className="btn-cart" onClick={e=>{e.stopPropagation();addCart(p);}}>🛒 Giỏ hàng</button>
                <button className="btn-buy" onClick={e=>{e.stopPropagation();window.open("tel:0935351095");}}>Mua ngay</button>
              </div>
            </div>
          </div>
        ))}</div>}
      </div>}

      {page==="catalogue"&&<div style={{padding:"24px 20px"}}>
        <div className="section-header" style={{marginBottom:20}}><h2 className="section-title">📚 CATALOGUE ĐÈN TRANG TRÍ</h2></div>
        <div className="cat-grid" style={{marginBottom:32}}>
          {CATALOGUES_TRANG_TRI.map((c,i)=>(
            <div className="cat-card" key={i}><div className="cat-card-img"><img src={c.img} alt={c.name}/></div>
            <div className="cat-card-body"><div className="cat-card-name">{c.name}</div><button className="cat-card-btn">📥 XEM / TẢI CATALOGUE</button></div></div>
          ))}
        </div>
        <div className="section-header" style={{marginBottom:20}}><h2 className="section-title">💡 CATALOGUE CHIẾU SÁNG</h2></div>
        <div className="cat-grid">{CATALOGUES_CHIEU_SANG.map((c,i)=>(
          <div className="cat-card" key={i}><div className="cat-card-img"><img src={c.img} alt={c.name}/></div>
          <div className="cat-card-body"><div className="cat-card-name">{c.name}</div><button className="cat-card-btn">📥 XEM / TẢI CATALOGUE</button></div></div>
        ))}</div>
      </div>}

      {page==="about"&&<div className="about-page">
        <div className="about-hero"><h1>THÁI BẢO LIGHTING</h1><p>Đơn vị chuyên cung cấp giải pháp chiếu sáng và trang trí nội thất toàn quốc. Hơn 500 mẫu đèn đa dạng từ bình dân đến cao cấp.</p></div>
        <div className="about-grid">
          <div className="about-card"><div className="icon">🏆</div><h3>Uy Tín Hàng Đầu</h3><p>Nhiều năm kinh nghiệm phục vụ hàng nghìn khách hàng, công trình trên toàn quốc.</p></div>
          <div className="about-card"><div className="icon">💡</div><h3>500+ Mẫu Đèn</h3><p>Đa dạng từ đèn trang trí, đèn chiếu sáng đến thiết bị điện dân dụng.</p></div>
          <div className="about-card"><div className="icon">🔧</div><h3>Gia Công Theo Yêu Cầu</h3><p>Nhận gia công đèn theo thiết kế riêng cho các công trình đặc biệt.</p></div>
        </div>
        <div className="about-section"><h2>Về Chúng Tôi</h2><p>Thái Bảo Lighting là đơn vị chuyên cung cấp giải pháp chiếu sáng và trang trí nội thất toàn quốc. Với danh mục sản phẩm đa dạng từ phân khúc bình dân đến cao cấp, chúng tôi phục vụ mọi nhu cầu từ gia đình, căn hộ đến công trình xây dựng quy mô lớn.</p><p>Chúng tôi luôn lấy chất lượng sản phẩm và sự hài lòng của khách hàng làm nền tảng phát triển.</p></div>
      </div>}

      {page==="contact"&&<div className="contact-page">
        <div className="section-header" style={{marginBottom:24}}><h2 className="section-title">📞 LIÊN HỆ VỚI CHÚNG TÔI</h2></div>
        <div className="contact-grid">
          <div className="contact-box"><h2>Thông Tin Liên Hệ</h2>
            <div className="contact-item"><div className="contact-icon">📞</div><div><div className="contact-label">Hotline</div><div className="contact-value">0935 351 095</div></div></div>
            <div className="contact-item"><div className="contact-icon">📍</div><div><div className="contact-label">Địa chỉ</div><div className="contact-value">Đà Nẵng, Việt Nam</div></div></div>
            <div className="contact-item"><div className="contact-icon">🕐</div><div><div className="contact-label">Giờ làm việc</div><div className="contact-value">8:00 – 20:00, Thứ 2 – Chủ nhật</div></div></div>
          </div>
          <div className="contact-box"><h2>Gửi Tin Nhắn</h2>
            <form className="contact-form" onSubmit={e=>{e.preventDefault();showToast("Đã gửi tin nhắn thành công!");}}>
              <input placeholder="Họ và tên" required/><input placeholder="Số điện thoại" required/><input placeholder="Email"/>
              <textarea placeholder="Nội dung tin nhắn..."/><button type="submit" className="contact-submit">GỬI TIN NHẮN</button>
            </form>
          </div>
        </div>
      </div>}

      <footer className="footer">
        <div className="footer-grid">
          <div><h4>THÁI BẢO LIGHTING</h4><p>Chiếu sáng chuyên nghiệp — Kiến tạo không gian sống</p></div>
          <div><h4>SẢN PHẨM</h4><ul>{["Đèn Trang Trí","Đèn Thả","Mâm – Ốp Trần","Quạt Trần Đèn"].map(x=><li key={x}>{x}</li>)}</ul></div>
          <div><h4>HỖ TRỢ</h4><ul>{["Hướng dẫn mua hàng","Chính sách bảo hành","Chính sách vận chuyển"].map(x=><li key={x}>{x}</li>)}</ul></div>
          <div><h4>LIÊN HỆ</h4><p>📞 0935 351 095</p><p style={{marginTop:6}}>📍 Đà Nẵng, Việt Nam</p><p style={{marginTop:6}}>🕐 8:00 – 20:00 mỗi ngày</p></div>
        </div>
        <div className="footer-bottom">© 2025 Thái Bảo Lighting. All rights reserved.</div>
      </footer>

      {cartOpen&&<><div className="overlay" onClick={()=>setCartOpen(false)}/>
        <div className="drawer">
          <div className="drawer-head"><div className="drawer-title">🛒 Giỏ Hàng ({items})</div><button className="drawer-close" onClick={()=>setCartOpen(false)}>✕</button></div>
          <div className="drawer-body">
            {cart.length===0?<div className="cart-empty"><div style={{fontSize:50}}>🛒</div><p>Giỏ hàng trống</p></div>:
            cart.map(item=>(
              <div className="cart-item" key={item.id}>
                <img className="cart-item-img" src={item.img} alt={item.name}/>
                <div style={{flex:1}}><div className="cart-item-name">{item.name}</div><div className="cart-item-price">{fmt(item.price)}</div>
                  <div className="cart-qty">
                    <button className="qbtn" onClick={()=>setCart(p=>p.map(i=>i.id===item.id?{...i,qty:Math.max(1,i.qty-1)}:i))}>−</button>
                    <span className="qnum">{item.qty}</span>
                    <button className="qbtn" onClick={()=>setCart(p=>p.map(i=>i.id===item.id?{...i,qty:i.qty+1}:i))}>+</button>
                    <button className="rem-btn" onClick={()=>setCart(p=>p.filter(i=>i.id!==item.id))}>🗑</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {cart.length>0&&<div className="drawer-foot">
            <div className="cart-row"><span>Tạm tính</span><span>{fmt(sub)}</span></div>
            <div className="cart-row"><span>Vận chuyển</span><span>{ship===0?"Miễn phí":fmt(ship)}</span></div>
            <div className="cart-row total"><span>Tổng cộng</span><span className="val">{fmt(tot)}</span></div>
            <button className="btn-checkout" style={{marginTop:14}} onClick={()=>window.open("tel:0935351095")}>ĐẶT HÀNG: 0935 351 095</button>
            <button className="btn-continue" onClick={()=>setCartOpen(false)}>← Tiếp tục mua sắm</button>
          </div>}
        </div>
      </>}

      {detail&&<div className="modal-overlay" onClick={()=>setDetail(null)}>
        <div className="modal" onClick={e=>e.stopPropagation()}>
          <button className="modal-close" onClick={()=>setDetail(null)}>✕</button>
          <div className="modal-grid">
            <div className="modal-img"><img src={detail.img} alt={detail.name}/></div>
            <div className="modal-info">
              {detail.tag&&<div className="modal-tag">{detail.tag}</div>}
              <div className="modal-name">{detail.name}</div>
              <div className="modal-price"><span className="mn">{fmt(detail.price)}</span>{detail.originalPrice&&<span className="mo">{fmt(detail.originalPrice)}</span>}</div>
              <div className="modal-desc">{detail.desc}</div>
              <div className="modal-qty">
                <label>Số lượng:</label>
                <button className="qbtn" onClick={()=>setDqty(q=>Math.max(1,q-1))}>−</button>
                <span className="qnum">{dqty}</span>
                <button className="qbtn" onClick={()=>setDqty(q=>q+1)}>+</button>
              </div>
              <button className="modal-add" onClick={()=>addCart(detail,dqty)}>🛒 Thêm vào giỏ hàng</button>
              <div className="modal-contact">Hoặc gọi <a href="tel:0935351095">0935 351 095</a> để đặt hàng</div>
            </div>
          </div>
        </div>
      </div>}

      {toast&&<div className="toast">✓ {toast}</div>}
    </>
  );
}
