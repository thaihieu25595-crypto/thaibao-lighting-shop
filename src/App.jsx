import { useState, useRef } from "react";

const GOLD = "#C8A96E";

const PRODUCTS = [
  { id:1, category:"den-trang-tri", name:"Đèn Chùm Crystal Versailles", price:4850000, originalPrice:6200000, tag:"Bán chạy", img:"https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&q=80", desc:"Đèn chùm pha lê cao cấp phong cách cổ điển Pháp. Toả sáng 360° với 48 bóng LED, phù hợp phòng khách, sảnh khách sạn.", specs:["Kích thước: Ø80cm × H60cm","Công suất: 48W LED","Ánh sáng: 3000K vàng ấm","Bảo hành: 24 tháng"] },
  { id:2, category:"den-trang-tri", name:"Đèn Thả Nordic Minimalist", price:1250000, originalPrice:null, tag:"Mới", img:"https://images.unsplash.com/photo-1513506003901-1e6a35f09b15?w=600&q=80", desc:"Đèn thả trần phong cách Bắc Âu tối giản. Khung kim loại mạ vàng, chụp đan mây tre thiên nhiên.", specs:["Kích thước: Ø35cm × H25cm","Công suất: 12W LED","Ánh sáng: 2700K warm","Bảo hành: 18 tháng"] },
  { id:3, category:"den-trang-tri", name:"Đèn Thông Tầng Luxury", price:12500000, originalPrice:15000000, tag:"Premium", img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", desc:"Đèn thông tầng đặc biệt cho không gian cao tầng. Chuỗi pha lê dài 3–6m, lắp đặt theo yêu cầu.", specs:["Chiều dài: 3m–6m (tuỳ chọn)","Công suất: 120W LED","Ánh sáng: 3000K–6500K","Bảo hành: 36 tháng"] },
  { id:4, category:"quat-tran", name:"Quạt Trần Kết Hợp Đèn Aurora", price:3200000, originalPrice:3800000, tag:"Hot", img:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80", desc:"Quạt trần 5 cánh gỗ walnut tự nhiên, tích hợp đèn LED 3 chế độ màu. Điều khiển từ xa và app.", specs:["Cánh quạt: 5 cánh gỗ Ø132cm","Đèn: 36W LED CCT","Tốc độ: 6 cấp độ","Bảo hành: 24 tháng"] },
  { id:5, category:"led-day", name:"LED Dây RGB Thông Minh 5m", price:450000, originalPrice:null, tag:null, img:"https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee?w=600&q=80", desc:"Đèn LED dây RGB 16 triệu màu, điều khiển qua app, tương thích Alexa & Google Home.", specs:["Chiều dài: 5m / cuộn","Màu sắc: 16 triệu RGB","Kết nối: WiFi + App","Cắt được mỗi 3cm"] },
  { id:6, category:"den-trang-tri", name:"Đèn Tường Art Deco", price:890000, originalPrice:1100000, tag:null, img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", desc:"Đèn tường phong cách Art Deco với khung đồng mạ vàng, chao thuỷ tinh thổi tay.", specs:["Kích thước: W15 × H30cm","Công suất: 8W LED","Ánh sáng: 2700K","Bảo hành: 12 tháng"] },
  { id:7, category:"thiet-bi-dien", name:"Công Tắc Cảm Ứng Thông Minh", price:680000, originalPrice:null, tag:"Smart", img:"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80", desc:"Công tắc cảm ứng WiFi, điều khiển qua app, tương thích mọi thiết bị chiếu sáng.", specs:["Kết nối: WiFi 2.4GHz","Tải tối đa: 2000W","Tương thích: iOS & Android","Bảo hành: 12 tháng"] },
  { id:8, category:"den-trang-tri", name:"Đèn Sàn Reading Floor Lamp", price:2100000, originalPrice:2500000, tag:null, img:"https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=80", desc:"Đèn sàn đọc sách phong cách Scandinavia. Cần đèn điều chỉnh góc 360°, chao vải linen cao cấp.", specs:["Chiều cao: 140–165cm","Công suất: 18W LED","Điều chỉnh: 360° linh hoạt","Bảo hành: 18 tháng"] },
];

const CATEGORIES = [
  { key:"all", label:"Tất cả" },
  { key:"den-trang-tri", label:"Đèn trang trí" },
  { key:"quat-tran", label:"Quạt trần" },
  { key:"led-day", label:"LED dây" },
  { key:"thiet-bi-dien", label:"Thiết bị điện" },
];

const fmt = n => n.toLocaleString("vi-VN") + "₫";

const USERS_DB = [
  { id:1, name:"Khách Demo", email:"demo@thaibao.vn", password:"demo123", phone:"0935351095", address:"123 Nguyễn Trãi, Q.1, TP.HCM", orders:["TB841203","TB778821"] }
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
:root{--gold:#C8A96E;--gold-light:#E8D4A0;--black:#0A0A08;--near:#111109;--surf:#161610;--text:#F0EBE0;--muted:#8A8470;--dim:#5A5648;--white:#FDFAF4;}
body{font-family:'DM Sans',sans-serif;background:var(--black);color:var(--text);font-weight:300;}
.promo{background:var(--gold);color:var(--black);text-align:center;padding:9px;font-size:12px;font-weight:500;letter-spacing:.07em;}
.nav{position:sticky;top:0;z-index:200;background:rgba(10,10,8,.96);backdrop-filter:blur(20px);border-bottom:1px solid rgba(200,169,110,.12);padding:0 32px;height:64px;display:flex;align-items:center;justify-content:space-between;}
.nav-logo{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:300;letter-spacing:.12em;color:var(--white);cursor:pointer;}
.nav-logo span{color:var(--gold);}
.nav-links{display:flex;gap:24px;}
.nav-link{font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);cursor:pointer;transition:color .2s;border:none;background:none;font-family:inherit;padding:0;}
.nav-link:hover{color:var(--gold);}
.nav-right{display:flex;align-items:center;gap:10px;}
.cart-btn{position:relative;background:transparent;border:1px solid rgba(200,169,110,.3);color:var(--gold);padding:8px 14px;cursor:pointer;font-family:inherit;font-size:12px;letter-spacing:.08em;text-transform:uppercase;display:flex;align-items:center;gap:8px;transition:all .2s;}
.cart-btn:hover{background:rgba(200,169,110,.08);border-color:var(--gold);}
.cart-badge{position:absolute;top:-8px;right:-8px;background:var(--gold);color:var(--black);border-radius:50%;width:18px;height:18px;font-size:10px;font-weight:600;display:flex;align-items:center;justify-content:center;}
.user-btn{display:flex;align-items:center;gap:8px;background:transparent;border:1px solid transparent;color:var(--muted);cursor:pointer;font-family:inherit;font-size:12px;letter-spacing:.08em;text-transform:uppercase;padding:7px 12px;transition:all .2s;}
.user-btn:hover{color:var(--gold);border-color:rgba(200,169,110,.2);}
.avatar{width:30px;height:30px;background:rgba(200,169,110,.12);border:1px solid var(--gold);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;color:var(--gold);font-weight:600;flex-shrink:0;}
.dropdown{position:absolute;top:64px;right:32px;z-index:300;background:var(--near);border:1px solid rgba(200,169,110,.15);min-width:210px;box-shadow:0 16px 40px rgba(0,0,0,.5);}
.dropdown-head{padding:16px 20px;border-bottom:1px solid rgba(200,169,110,.08);}
.dropdown-name{font-family:'Cormorant Garamond',serif;font-size:17px;color:var(--white);margin-bottom:2px;}
.dropdown-email{font-size:11px;color:var(--dim);}
.ditem{display:flex;align-items:center;gap:10px;width:100%;padding:12px 20px;background:none;border:none;color:var(--muted);font-family:inherit;font-size:12px;letter-spacing:.05em;cursor:pointer;transition:all .2s;text-align:left;}
.ditem:hover{background:rgba(200,169,110,.04);color:var(--gold);}
.ditem.red:hover{color:#e05a5a;}
.ddiv{height:1px;background:rgba(200,169,110,.08);margin:4px 0;}
.auth-overlay{position:fixed;inset:0;background:rgba(0,0,0,.82);z-index:500;backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:24px;}
.auth-box{background:var(--near);border:1px solid rgba(200,169,110,.15);width:100%;max-width:430px;position:relative;overflow:hidden;}
.auth-top{padding:28px 34px 0;background:radial-gradient(ellipse 100% 80% at 50% 0%,rgba(200,169,110,.05) 0%,transparent 70%);}
.auth-brand{font-family:'Cormorant Garamond',serif;font-size:14px;font-weight:300;letter-spacing:.15em;color:var(--white);margin-bottom:22px;}
.auth-brand span{color:var(--gold);}
.auth-tabs{display:flex;border-bottom:1px solid rgba(200,169,110,.1);margin:0 -34px;padding:0 34px;}
.atab{padding:11px 0;margin-right:26px;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--dim);background:none;border:none;cursor:pointer;font-family:inherit;border-bottom:2px solid transparent;transition:all .2s;margin-bottom:-1px;}
.atab.on{color:var(--gold);border-bottom-color:var(--gold);}
.auth-body{padding:26px 34px 30px;}
.aform{display:flex;flex-direction:column;gap:14px;}
.afield{display:flex;flex-direction:column;gap:5px;}
.alabel{font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--dim);}
.ainput{background:rgba(255,255,255,.03);border:1px solid rgba(200,169,110,.15);color:var(--text);padding:11px 14px;font-family:inherit;font-size:13px;outline:none;transition:border-color .25s;width:100%;}
.ainput:focus{border-color:rgba(200,169,110,.5);}
.ainput.err{border-color:#e05a5a;}
.aerr{font-size:11px;color:#e05a5a;}
.ageneral{background:rgba(224,90,90,.08);border:1px solid rgba(224,90,90,.3);padding:10px 14px;font-size:12px;color:#e05a5a;line-height:1.5;}
.asubmit{width:100%;background:var(--gold);color:var(--black);border:none;padding:13px;font-family:inherit;font-size:12px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:all .25s;margin-top:2px;}
.asubmit:hover{background:var(--gold-light);}
.adivider{display:flex;align-items:center;gap:12px;}
.adivline{flex:1;height:1px;background:rgba(200,169,110,.1);}
.adivtxt{font-size:10px;letter-spacing:.1em;color:var(--dim);text-transform:uppercase;}
.asocial{width:100%;background:transparent;border:1px solid rgba(200,169,110,.15);color:var(--muted);padding:11px;font-family:inherit;font-size:12px;letter-spacing:.05em;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;transition:all .2s;}
.asocial:hover{border-color:rgba(200,169,110,.35);color:var(--text);}
.aclose{position:absolute;top:14px;right:14px;background:none;border:1px solid rgba(200,169,110,.15);color:var(--muted);font-size:15px;cursor:pointer;width:30px;height:30px;display:flex;align-items:center;justify-content:center;transition:all .2s;}
.aclose:hover{border-color:var(--gold);color:var(--gold);}
.aswitch{font-size:12px;color:var(--dim);text-align:center;}
.aswitch button{background:none;border:none;color:var(--gold);cursor:pointer;font-size:12px;font-family:inherit;padding:0;}
.awrap{position:relative;}
.awrap .ainput{padding-right:40px;}
.aeye{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;color:var(--dim);cursor:pointer;font-size:13px;}
.terms{font-size:11px;color:var(--dim);line-height:1.6;}
.terms span{color:var(--gold);}
.asuccess{text-align:center;padding:16px 0 4px;}
.asuccess-icon{font-size:44px;margin-bottom:10px;}
.asuccess h3{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:300;color:var(--white);margin-bottom:6px;}
.asuccess p{font-size:13px;color:var(--muted);line-height:1.5;}
.spin{display:flex;align-items:center;justify-content:center;gap:8px;color:var(--muted);font-size:13px;padding:36px 0;}
.spinner{width:16px;height:16px;border:2px solid rgba(200,169,110,.2);border-top-color:var(--gold);border-radius:50%;animation:sp .7s linear infinite;}
@keyframes sp{to{transform:rotate(360deg);}}
.fpw{display:flex;justify-content:flex-end;}<br>.fpw button{background:none;border:none;color:var(--gold);font-size:12px;cursor:pointer;font-family:inherit;}
.pfpage{max-width:780px;margin:0 auto;padding:40px 32px;}
.pfhead{display:flex;align-items:center;gap:22px;margin-bottom:36px;padding-bottom:28px;border-bottom:1px solid rgba(200,169,110,.1);}
.pfavatar{width:68px;height:68px;background:rgba(200,169,110,.1);border:2px solid var(--gold);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;color:var(--gold);flex-shrink:0;}
.pfhead-info h2{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:300;color:var(--white);margin-bottom:3px;}
.pfhead-info p{font-size:13px;color:var(--dim);}
.pftabs{display:flex;border-bottom:1px solid rgba(200,169,110,.1);margin-bottom:28px;}
.pftab{padding:11px 22px;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--dim);background:none;border:none;cursor:pointer;font-family:inherit;border-bottom:2px solid transparent;transition:all .2s;margin-bottom:-1px;}
.pftab.on{color:var(--gold);border-bottom-color:var(--gold);}
.pfsec{background:var(--surf);border:1px solid rgba(200,169,110,.1);padding:26px;margin-bottom:18px;}
.pfsec h3{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);margin-bottom:18px;display:flex;align-items:center;gap:10px;}
.pfsec h3::after{content:'';flex:1;height:1px;background:rgba(200,169,110,.1);}
.pfgrid{display:grid;grid-template-columns:1fr 1fr;gap:13px;}
.pff{display:flex;flex-direction:column;gap:5px;}
.pff.full{grid-column:span 2;}
.pflabel{font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--dim);}
.pfinput{background:rgba(255,255,255,.03);border:1px solid rgba(200,169,110,.15);color:var(--text);padding:10px 13px;font-family:inherit;font-size:13px;outline:none;transition:border-color .25s;width:100%;}
.pfinput:focus{border-color:rgba(200,169,110,.5);}
.pfsave{background:var(--gold);color:var(--black);border:none;padding:11px 28px;font-family:inherit;font-size:12px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:all .25s;margin-top:6px;}
.pfsave:hover{background:var(--gold-light);}
.emp{text-align:center;padding:44px;color:var(--dim);}
.emp .ic{font-size:38px;margin-bottom:10px;opacity:.4;}
.ohist{background:var(--near);border:1px solid rgba(200,169,110,.08);padding:18px;margin-bottom:10px;display:flex;align-items:center;gap:14px;flex-wrap:wrap;}
.ohist-code{font-family:'Cormorant Garamond',serif;font-size:17px;color:var(--gold);flex:1;}
.ohist-date{font-size:11px;color:var(--dim);margin-top:2px;}
.ohist-status{font-size:10px;letter-spacing:.1em;text-transform:uppercase;padding:3px 10px;border:1px solid rgba(200,169,110,.3);color:var(--gold);}
.ohist-total{font-family:'Cormorant Garamond',serif;font-size:17px;color:var(--white);}
.hero{position:relative;height:480px;background:linear-gradient(135deg,rgba(10,10,8,.9) 0%,rgba(10,10,8,.6) 60%,rgba(10,10,8,.85) 100%),url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1400&q=80') center/cover;display:flex;align-items:center;padding:0 48px;overflow:hidden;}
.hero::after{content:'';position:absolute;bottom:0;left:0;right:0;height:120px;background:linear-gradient(transparent,var(--black));}
.hero-c{position:relative;z-index:2;max-width:560px;}
.hero-tag{font-size:11px;letter-spacing:.25em;text-transform:uppercase;color:var(--gold);margin-bottom:16px;display:flex;align-items:center;gap:10px;}
.hero-tag::before{content:'';display:block;width:24px;height:1px;background:var(--gold);}
.hero h1{font-family:'Cormorant Garamond',serif;font-size:clamp(36px,5vw,62px);font-weight:300;line-height:1.08;color:var(--white);margin-bottom:16px;}
.hero h1 em{font-style:italic;color:var(--gold);}
.hero p{font-size:15px;line-height:1.7;color:var(--muted);margin-bottom:26px;max-width:420px;}
.ha{display:flex;gap:13px;align-items:center;}
.bp{background:var(--gold);color:var(--black);border:none;padding:13px 30px;font-family:inherit;font-size:12px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:all .25s;}
.bp:hover{background:var(--gold-light);}
.bg{background:transparent;border:1px solid rgba(200,169,110,.35);color:var(--muted);padding:13px 22px;font-family:inherit;font-size:12px;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;transition:all .25s;}
.bg:hover{border-color:var(--gold);color:var(--gold);}
.hstats{position:absolute;right:48px;top:50%;transform:translateY(-50%);z-index:2;display:flex;flex-direction:column;gap:22px;}
.hstat .num{font-family:'Cormorant Garamond',serif;font-size:34px;font-weight:300;color:var(--gold);line-height:1;}
.hstat .lbl{font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--dim);margin-top:3px;}
.shop{padding:0 32px 60px;}
.shophead{padding:34px 0 22px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;}
.shoptitle{font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:300;color:var(--white);}
.shoptitle span{font-style:italic;color:var(--gold);}
.cats{display:flex;gap:7px;flex-wrap:wrap;}
.cbt{background:transparent;border:1px solid rgba(200,169,110,.15);color:var(--dim);padding:6px 14px;font-family:inherit;font-size:11px;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:all .2s;}
.cbt:hover{border-color:rgba(200,169,110,.4);color:var(--muted);}
.cbt.on{border-color:var(--gold);color:var(--gold);background:rgba(200,169,110,.05);}
.pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(255px,1fr));gap:18px;}
.pcard{background:var(--surf);border:1px solid transparent;cursor:pointer;transition:all .3s;overflow:hidden;position:relative;}
.pcard:hover{border-color:rgba(200,169,110,.2);transform:translateY(-3px);box-shadow:0 20px 40px rgba(0,0,0,.4);}
.cimg{position:relative;height:218px;overflow:hidden;}
.cimg img{width:100%;height:100%;object-fit:cover;transition:transform .5s;opacity:.85;}
.pcard:hover .cimg img{transform:scale(1.05);opacity:1;}
.ctag{position:absolute;top:11px;left:11px;background:var(--gold);color:var(--black);font-size:10px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;padding:3px 9px;}
.cwish{position:absolute;top:9px;right:9px;background:rgba(10,10,8,.7);border:1px solid rgba(200,169,110,.2);width:31px;height:31px;display:flex;align-items:center;justify-content:center;opacity:0;transition:all .2s;cursor:pointer;font-size:13px;}
.pcard:hover .cwish{opacity:1;}
.cbody{padding:18px;}
.cname{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:400;color:var(--white);margin-bottom:7px;line-height:1.2;}
.cdesc{font-size:12px;line-height:1.6;color:var(--dim);margin-bottom:14px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
.cprice{display:flex;align-items:center;gap:9px;margin-bottom:13px;}
.pmain{font-family:'Cormorant Garamond',serif;font-size:21px;color:var(--gold);}
.porig{font-size:12px;color:var(--dim);text-decoration:line-through;}
.psave{font-size:10px;background:rgba(200,169,110,.1);color:var(--gold);padding:2px 6px;border:1px solid rgba(200,169,110,.2);}
.cadd{width:100%;background:transparent;border:1px solid rgba(200,169,110,.25);color:var(--muted);padding:9px;font-family:inherit;font-size:11px;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:all .25s;display:flex;align-items:center;justify-content:center;gap:7px;}
.cadd:hover{background:var(--gold);color:var(--black);border-color:var(--gold);}
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:300;backdrop-filter:blur(4px);}
.drawer{position:fixed;top:0;right:0;bottom:0;width:min(430px,100vw);background:var(--near);border-left:1px solid rgba(200,169,110,.15);z-index:400;display:flex;flex-direction:column;overflow:hidden;}
.dhead{padding:22px 26px;border-bottom:1px solid rgba(200,169,110,.1);display:flex;align-items:center;justify-content:space-between;}
.dtitle{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:300;color:var(--white);}
.dclose{background:none;border:none;color:var(--muted);font-size:19px;cursor:pointer;padding:4px;transition:color .2s;}
.dclose:hover{color:var(--gold);}
.dbody{flex:1;overflow-y:auto;padding:18px 26px;}
.dbody::-webkit-scrollbar{width:3px;}
.dbody::-webkit-scrollbar-thumb{background:rgba(200,169,110,.3);}
.cempty{text-align:center;padding:55px 0;}
.cempty-icon{font-size:44px;margin-bottom:14px;opacity:.4;}
.cempty p{color:var(--dim);font-size:14px;}
.citem{display:flex;gap:13px;padding:14px 0;border-bottom:1px solid rgba(200,169,110,.07);}
.citem-img{width:66px;height:66px;object-fit:cover;opacity:.85;flex-shrink:0;}
.citem-info{flex:1;min-width:0;}
.citem-name{font-size:13px;color:var(--text);line-height:1.3;margin-bottom:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.citem-price{font-family:'Cormorant Garamond',serif;font-size:17px;color:var(--gold);}
.citem-qty{display:flex;align-items:center;gap:9px;margin-top:7px;}
.qbtn{width:25px;height:25px;background:transparent;border:1px solid rgba(200,169,110,.2);color:var(--muted);font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;}
.qbtn:hover{border-color:var(--gold);color:var(--gold);}
.qnum{font-size:13px;color:var(--text);min-width:18px;text-align:center;}
.crem{background:none;border:none;color:var(--dim);font-size:15px;cursor:pointer;padding:4px;transition:color .2s;margin-left:auto;align-self:flex-start;}
.crem:hover{color:#e05a5a;}
.dfoot{padding:18px 26px;border-top:1px solid rgba(200,169,110,.1);}
.crow{display:flex;justify-content:space-between;font-size:13px;color:var(--muted);margin-bottom:7px;}
.crow.tot{font-size:15px;color:var(--white);padding-top:9px;border-top:1px solid rgba(200,169,110,.1);margin-top:3px;}
.crow.tot .val{font-family:'Cormorant Garamond',serif;font-size:21px;color:var(--gold);}
.chkbtn{width:100%;background:var(--gold);color:var(--black);border:none;padding:14px;font-family:inherit;font-size:13px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:all .25s;margin-bottom:9px;}
.chkbtn:hover{background:var(--gold-light);}
.conbtn{width:100%;background:transparent;border:1px solid rgba(200,169,110,.2);color:var(--muted);padding:11px;font-family:inherit;font-size:12px;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;transition:all .25s;}
.conbtn:hover{border-color:var(--gold);color:var(--gold);}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:300;backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:22px;}
.modal{background:var(--near);border:1px solid rgba(200,169,110,.15);max-width:800px;width:100%;max-height:90vh;overflow-y:auto;position:relative;}
.modal::-webkit-scrollbar{width:3px;}
.modal::-webkit-scrollbar-thumb{background:rgba(200,169,110,.3);}
.mclose{position:sticky;top:0;z-index:10;display:flex;justify-content:flex-end;padding:14px 18px 0;background:var(--near);}
.mclose button{background:none;border:1px solid rgba(200,169,110,.2);color:var(--muted);font-size:17px;cursor:pointer;width:34px;height:34px;display:flex;align-items:center;justify-content:center;transition:all .2s;}
.mclose button:hover{border-color:var(--gold);color:var(--gold);}
.mgrid{display:grid;grid-template-columns:1fr 1fr;}
.mimg{height:390px;overflow:hidden;}
.mimg img{width:100%;height:100%;object-fit:cover;}
.minfo{padding:28px;display:flex;flex-direction:column;}
.mtag{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:10px;}
.mname{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:400;color:var(--white);margin-bottom:8px;line-height:1.2;}
.mprice{display:flex;align-items:baseline;gap:10px;margin-bottom:14px;flex-wrap:wrap;}
.mprice .mn{font-family:'Cormorant Garamond',serif;font-size:30px;color:var(--gold);}
.mprice .mo{font-size:13px;color:var(--dim);text-decoration:line-through;}
.mdesc{font-size:14px;line-height:1.8;color:var(--muted);margin-bottom:18px;}
.mspecs{margin-bottom:22px;}
.mspecs h4{font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:var(--gold);margin-bottom:9px;}
.spec{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--muted);margin-bottom:6px;}
.spec::before{content:'';width:4px;height:4px;background:var(--gold);flex-shrink:0;transform:rotate(45deg);}
.mqty{display:flex;align-items:center;gap:11px;margin-bottom:18px;}
.mqty label{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--dim);}
.madd{flex:1;background:var(--gold);color:var(--black);border:none;padding:13px;font-family:inherit;font-size:12px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:all .25s;}
.madd:hover{background:var(--gold-light);}
.mcont{text-align:center;font-size:12px;color:var(--dim);margin-top:10px;}
.mcont a{color:var(--gold);text-decoration:none;}
.chkpage{max-width:880px;margin:0 auto;padding:30px;}
.chkpage h2{font-family:'Cormorant Garamond',serif;font-size:34px;font-weight:300;color:var(--white);margin-bottom:26px;}
.chkpage h2 em{font-style:italic;color:var(--gold);}
.chkgrid{display:grid;grid-template-columns:1fr 360px;gap:28px;}
.chksec{background:var(--surf);border:1px solid rgba(200,169,110,.1);padding:26px;margin-bottom:18px;}
.chksec h3{font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:18px;display:flex;align-items:center;gap:9px;}
.chksec h3::after{content:'';flex:1;height:1px;background:rgba(200,169,110,.1);}
.fgrid{display:grid;grid-template-columns:1fr 1fr;gap:13px;}
.fg{display:flex;flex-direction:column;gap:5px;}
.fg.full{grid-column:span 2;}
.fl{font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--dim);}
.fi,.fs,.ft{background:rgba(255,255,255,.03);border:1px solid rgba(200,169,110,.15);color:var(--text);padding:10px 13px;font-family:inherit;font-size:13px;outline:none;transition:border-color .25s;width:100%;}
.fi:focus,.fs:focus,.ft:focus{border-color:rgba(200,169,110,.5);}
.fs option{background:var(--near);}
.ft{height:78px;resize:none;}
.pm{display:flex;flex-direction:column;gap:9px;}
.pmi{display:flex;align-items:center;gap:13px;padding:13px 15px;border:1px solid rgba(200,169,110,.12);cursor:pointer;transition:all .2s;}
.pmi.sel{border-color:var(--gold);background:rgba(200,169,110,.04);}
.pmi input{accent-color:var(--gold);}
.pmicon{font-size:19px;}
.pmname{font-size:13px;color:var(--text);margin-bottom:1px;}
.pmdesc{font-size:11px;color:var(--dim);}
.osum{background:var(--surf);border:1px solid rgba(200,169,110,.1);padding:22px;position:sticky;top:80px;}
.osum h3{font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:18px;}
.oi{display:flex;gap:11px;margin-bottom:13px;padding-bottom:13px;border-bottom:1px solid rgba(200,169,110,.07);}
.oi img{width:54px;height:54px;object-fit:cover;opacity:.8;}
.oi-name{font-size:12px;color:var(--text);line-height:1.4;margin-bottom:3px;}
.oi-price{font-family:'Cormorant Garamond',serif;font-size:14px;color:var(--gold);}
.oline{display:flex;justify-content:space-between;font-size:12px;color:var(--muted);margin-bottom:7px;}
.ototl{display:flex;justify-content:space-between;padding-top:11px;border-top:1px solid rgba(200,169,110,.1);margin-top:3px;}
.ototl .lbl{font-size:13px;color:var(--white);}
.ototl .val{font-family:'Cormorant Garamond',serif;font-size:21px;color:var(--gold);}
.pobtn{width:100%;background:var(--gold);color:var(--black);border:none;padding:14px;font-family:inherit;font-size:13px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;margin-top:14px;transition:all .25s;}
.pobtn:hover{background:var(--gold-light);}
.secnote{font-size:11px;color:var(--dim);text-align:center;margin-top:9px;display:flex;align-items:center;justify-content:center;gap:5px;}
.sucpage{max-width:540px;margin:0 auto;padding:76px 28px;text-align:center;}
.sucicon{font-size:60px;margin-bottom:22px;}
.sucpage h2{font-family:'Cormorant Garamond',serif;font-size:38px;font-weight:300;color:var(--white);margin-bottom:10px;}
.sucpage h2 em{font-style:italic;color:var(--gold);}
.sucpage p{font-size:14px;line-height:1.7;color:var(--muted);margin-bottom:7px;}
.ocode{font-family:'Cormorant Garamond',serif;font-size:21px;color:var(--gold);margin:18px 0;padding:14px;background:var(--surf);border:1px solid rgba(200,169,110,.15);}
.sucac{display:flex;gap:11px;justify-content:center;margin-top:26px;flex-wrap:wrap;}
.toast{position:fixed;bottom:22px;left:50%;transform:translateX(-50%);background:var(--surf);border:1px solid rgba(200,169,110,.3);color:var(--text);padding:11px 22px;font-size:13px;z-index:999;display:flex;align-items:center;gap:9px;white-space:nowrap;box-shadow:0 8px 32px rgba(0,0,0,.5);animation:tup .3s ease;}
@keyframes tup{from{opacity:0;transform:translateX(-50%) translateY(18px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}
.tdot{width:6px;height:6px;background:var(--gold);border-radius:50%;}
@media(max-width:768px){
  .hero{height:340px;padding:0 20px;}.hstats{display:none;}.shop{padding:0 14px 40px;}
  .nav-links{display:none;}.nav{padding:0 16px;}
  .mgrid{grid-template-columns:1fr;}.mimg{height:240px;}
  .chkgrid,.fgrid{grid-template-columns:1fr;}.fg.full{grid-column:span 1;}
  .osum{position:static;}.chkpage,.pfpage{padding:16px;}
  .pfgrid{grid-template-columns:1fr;}.pff.full{grid-column:span 1;}
  .dropdown{right:14px;}.auth-box{max-width:100%;}
}
`;

export default function App() {
  const [page, setPage] = useState("shop");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [cat, setCat] = useState("all");
  const [dqty, setDqty] = useState(1);
  const [toast, setToast] = useState(null);
  const [pay, setPay] = useState("cod");
  const [orderCode] = useState("TB" + Math.floor(100000 + Math.random()*900000));

  const [user, setUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState("login");
  const [ddOpen, setDdOpen] = useState(false);
  const [pftab, setPftab] = useState("info");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [sp, setSp] = useState(false);
  const [sp2, setSp2] = useState(false);

  const [le, setLe] = useState(""); const [lp, setLp] = useState(""); const [lerr, setLerr] = useState({});
  const [rn, setRn] = useState(""); const [re, setRe] = useState(""); const [rp, setRp] = useState(""); const [rp2, setRp2] = useState(""); const [rph, setRph] = useState(""); const [rerr, setRerr] = useState({});

  const timer = useRef(null);
  const toast_ = msg => { setToast(msg); clearTimeout(timer.current); timer.current = setTimeout(()=>setToast(null), 2800); };

  const addCart = (p, qty=1) => {
    setCart(prev => { const ex=prev.find(i=>i.id===p.id); if(ex) return prev.map(i=>i.id===p.id?{...i,qty:i.qty+qty}:i); return [...prev,{...p,qty}]; });
    toast_("Đã thêm vào giỏ hàng ✓"); setDetail(null);
  };
  const remCart = id => setCart(p=>p.filter(i=>i.id!==id));
  const updQty = (id, d) => setCart(p=>p.map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+d)}:i));

  const items = cart.reduce((s,i)=>s+i.qty,0);
  const sub = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const ship = sub>5000000?0:80000;
  const tot = sub+ship;
  const filtered = cat==="all"?PRODUCTS:PRODUCTS.filter(p=>p.category===cat);

  const openAuth = (tab="login") => { setAuthTab(tab); setAuthOpen(true); setDdOpen(false); setDone(false); setLe(""); setLp(""); setLerr({}); setRn(""); setRe(""); setRp(""); setRp2(""); setRph(""); setRerr({}); setSp(false); setSp2(false); };
  const closeAuth = () => { setAuthOpen(false); setDone(false); };

  const doLogin = () => {
    const e={};
    if(!le) e.email="Vui lòng nhập email"; else if(!/\S+@\S+\.\S+/.test(le)) e.email="Email không hợp lệ";
    if(!lp) e.pwd="Vui lòng nhập mật khẩu";
    if(Object.keys(e).length){setLerr(e);return;}
    setLoading(true);
    setTimeout(()=>{
      const u=USERS_DB.find(u=>u.email===le&&u.password===lp);
      setLoading(false);
      if(u){setUser(u);setDone(true);setTimeout(()=>{closeAuth();toast_(`Chào mừng, ${u.name}! 👋`);},1300);}
      else setLerr({general:"Email hoặc mật khẩu không đúng. Demo: demo@thaibao.vn / demo123"});
    },900);
  };

  const doRegister = () => {
    const e={};
    if(!rn.trim()) e.name="Vui lòng nhập họ tên";
    if(!re) e.email="Vui lòng nhập email"; else if(!/\S+@\S+\.\S+/.test(re)) e.email="Email không hợp lệ"; else if(USERS_DB.find(u=>u.email===re)) e.email="Email này đã được đăng ký";
    if(!rp) e.pwd="Vui lòng nhập mật khẩu"; else if(rp.length<6) e.pwd="Tối thiểu 6 ký tự";
    if(rp!==rp2) e.pwd2="Mật khẩu xác nhận không khớp";
    if(!rph) e.phone="Vui lòng nhập số điện thoại";
    if(Object.keys(e).length){setRerr(e);return;}
    setLoading(true);
    setTimeout(()=>{
      const nu={id:Date.now(),name:rn,email:re,password:rp,phone:rph,address:"",orders:[]};
      USERS_DB.push(nu); setLoading(false); setUser(nu); setDone(true);
      setTimeout(()=>{closeAuth();toast_(`Đăng ký thành công! Chào ${rn} 🎉`);},1300);
    },1000);
  };

  const doLogout = () => { setUser(null); setDdOpen(false); toast_("Đã đăng xuất"); setPage("shop"); };
  const ini = u => u?u.name.split(" ").map(w=>w[0]).slice(-2).join("").toUpperCase():"";

  return (
    <>
      <style>{css}</style>

      <div className="promo">🎁 Miễn phí vận chuyển đơn trên 5.000.000₫ · Hotline: <strong>0935 351 095</strong></div>

      <nav className="nav">
        <div className="nav-logo" onClick={()=>{setPage("shop");setDdOpen(false);}}>THÁI BẢO <span>LIGHTING</span></div>
        <div className="nav-links">
          <button className="nav-link" onClick={()=>setPage("shop")}>Cửa hàng</button>
          <button className="nav-link">Dự án</button>
          <button className="nav-link">Tư vấn</button>
          <button className="nav-link">Liên hệ</button>
        </div>
        <div className="nav-right">
          {user ? (
            <div style={{position:"relative"}}>
              <button className="user-btn" onClick={()=>setDdOpen(o=>!o)}>
                <div className="avatar">{ini(user)}</div>
                <span style={{maxWidth:90,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user.name.split(" ").slice(-1)[0]}</span>
                <span style={{fontSize:9}}>{ddOpen?"▲":"▼"}</span>
              </button>
              {ddOpen && (
                <div className="dropdown">
                  <div className="dropdown-head">
                    <div className="dropdown-name">{user.name}</div>
                    <div className="dropdown-email">{user.email}</div>
                  </div>
                  <button className="ditem" onClick={()=>{setPage("profile");setPftab("info");setDdOpen(false);}}>👤 &nbsp;Tài khoản của tôi</button>
                  <button className="ditem" onClick={()=>{setPage("profile");setPftab("orders");setDdOpen(false);}}>📦 &nbsp;Đơn hàng của tôi</button>
                  <button className="ditem" onClick={()=>{toast_("Tính năng sắp ra mắt ✨");setDdOpen(false);}}>♡ &nbsp;Sản phẩm yêu thích</button>
                  <div className="ddiv"/>
                  <button className="ditem red" onClick={doLogout}>🚪 &nbsp;Đăng xuất</button>
                </div>
              )}
            </div>
          ) : (
            <div style={{display:"flex",gap:7}}>
              <button className="user-btn" onClick={()=>openAuth("login")}>Đăng nhập</button>
              <button className="bp" style={{padding:"8px 14px",fontSize:11}} onClick={()=>openAuth("register")}>Đăng ký</button>
            </div>
          )}
          <button className="cart-btn" onClick={()=>{setCartOpen(true);setDdOpen(false);}}>
            🛒 Giỏ
            {items>0&&<span className="cart-badge">{items}</span>}
          </button>
        </div>
      </nav>

      {ddOpen && <div style={{position:"fixed",inset:0,zIndex:150}} onClick={()=>setDdOpen(false)}/>}

      {/* SHOP */}
      {page==="shop" && (
        <>
          <div className="hero">
            <div className="hero-c">
              <div className="hero-tag">Chiếu sáng chuyên nghiệp</div>
              <h1>Kiến tạo<br/>không gian<br/><em>sống đẹp</em></h1>
              <p>Hơn 500 mẫu đèn trang trí & quạt cao cấp. Giao hàng toàn quốc, bảo hành chính hãng.</p>
              <div className="ha">
                <button className="bp" onClick={()=>document.getElementById("shop-s")?.scrollIntoView({behavior:"smooth"})}>Mua sắm ngay</button>
                <button className="bg" onClick={()=>!user&&openAuth("register")}>{user?`Xin chào, ${user.name.split(" ").slice(-1)[0]}! 👋`:"Đăng ký miễn phí"}</button>
              </div>
            </div>
            <div className="hstats">
              {[["10+","Năm KN"],["5000+","Công trình"],["500+","Mẫu SP"]].map(([n,l])=>(
                <div className="hstat" key={l}><div className="num">{n}</div><div className="lbl">{l}</div></div>
              ))}
            </div>
          </div>
          <div className="shop" id="shop-s">
            <div className="shophead">
              <div className="shoptitle">Sản phẩm <span>nổi bật</span></div>
              <div className="cats">
                {CATEGORIES.map(c=><button key={c.key} className={`cbt${cat===c.key?" on":""}`} onClick={()=>setCat(c.key)}>{c.label}</button>)}
              </div>
            </div>
            <div className="pgrid">
              {filtered.map(p=>{
                const sv=p.originalPrice?Math.round((1-p.price/p.originalPrice)*100):0;
                return (
                  <div className="pcard" key={p.id}>
                    <div className="cimg" onClick={()=>{setDetail(p);setDqty(1);}}>
                      <img src={p.img} alt={p.name} loading="lazy"/>
                      {p.tag&&<span className="ctag">{p.tag}</span>}
                      <button className="cwish" onClick={e=>{e.stopPropagation();user?toast_("Đã thêm vào yêu thích ♥"):openAuth("login");}}>♡</button>
                    </div>
                    <div className="cbody">
                      <div className="cname">{p.name}</div>
                      <div className="cdesc">{p.desc}</div>
                      <div className="cprice">
                        <span className="pmain">{fmt(p.price)}</span>
                        {p.originalPrice&&<span className="porig">{fmt(p.originalPrice)}</span>}
                        {sv>0&&<span className="psave">-{sv}%</span>}
                      </div>
                      <button className="cadd" onClick={()=>addCart(p)}><span>+</span> Thêm vào giỏ</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* PROFILE */}
      {page==="profile"&&user&&(
        <div className="pfpage">
          <div className="pfhead">
            <div className="pfavatar">{ini(user)}</div>
            <div className="pfhead-info">
              <h2>{user.name}</h2>
              <p>{user.email} · Thành viên từ {new Date().getFullYear()}</p>
            </div>
            <button className="bg" onClick={()=>setPage("shop")} style={{marginLeft:"auto"}}>← Mua sắm</button>
          </div>
          <div className="pftabs">
            {[["info","👤 Thông tin"],["orders","📦 Đơn hàng"],["security","🔒 Bảo mật"]].map(([k,l])=>(
              <button key={k} className={`pftab${pftab===k?" on":""}`} onClick={()=>setPftab(k)}>{l}</button>
            ))}
          </div>
          {pftab==="info"&&(
            <div className="pfsec">
              <h3>Thông tin cá nhân</h3>
              <div className="pfgrid">
                <div className="pff"><label className="pflabel">Họ và tên</label><input className="pfinput" defaultValue={user.name}/></div>
                <div className="pff"><label className="pflabel">Số điện thoại</label><input className="pfinput" defaultValue={user.phone}/></div>
                <div className="pff"><label className="pflabel">Email</label><input className="pfinput" defaultValue={user.email}/></div>
                <div className="pff"><label className="pflabel">Ngày sinh</label><input className="pfinput" type="date"/></div>
                <div className="pff full"><label className="pflabel">Địa chỉ mặc định</label><input className="pfinput" defaultValue={user.address} placeholder="Số nhà, đường, phường, quận, TP"/></div>
              </div>
              <button className="pfsave" onClick={()=>toast_("Đã lưu thông tin thành công ✓")}>Lưu thay đổi</button>
            </div>
          )}
          {pftab==="orders"&&(
            <div className="pfsec">
              <h3>Lịch sử đơn hàng</h3>
              {user.orders.length===0?(
                <div className="emp"><div className="ic">📦</div><p>Chưa có đơn hàng nào</p></div>
              ):user.orders.map((code,i)=>(
                <div className="ohist" key={code}>
                  <div><div className="ohist-code">{code}</div><div className="ohist-date">{i===0?"15/03/2025":"28/01/2025"}</div></div>
                  <span className="ohist-status">Đã giao</span>
                  <div className="ohist-total">{i===0?"4.850.000₫":"1.250.000₫"}</div>
                  <button className="bg" style={{padding:"6px 13px",fontSize:11}}>Chi tiết</button>
                </div>
              ))}
            </div>
          )}
          {pftab==="security"&&(
            <div className="pfsec">
              <h3>Đổi mật khẩu</h3>
              <div style={{display:"flex",flexDirection:"column",gap:13,maxWidth:380}}>
                {["Mật khẩu hiện tại","Mật khẩu mới","Xác nhận mật khẩu mới"].map(l=>(
                  <div className="pff" key={l}><label className="pflabel">{l}</label><input className="pfinput" type="password" placeholder="••••••••"/></div>
                ))}
                <button className="pfsave" onClick={()=>toast_("Đã đổi mật khẩu thành công ✓")}>Đổi mật khẩu</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CHECKOUT */}
      {page==="checkout"&&(
        <div className="chkpage">
          <h2>Thanh toán <em>đơn hàng</em></h2>
          <div className="chkgrid">
            <div>
              <div className="chksec">
                <h3>Thông tin người nhận</h3>
                <div className="fgrid">
                  <div className="fg"><label className="fl">Họ và tên *</label><input className="fi" defaultValue={user?.name} placeholder="Nguyễn Văn A"/></div>
                  <div className="fg"><label className="fl">Số điện thoại *</label><input className="fi" defaultValue={user?.phone} placeholder="0935 351 095"/></div>
                  <div className="fg"><label className="fl">Email</label><input className="fi" defaultValue={user?.email} placeholder="email@example.com"/></div>
                  <div className="fg"><label className="fl">Tỉnh / Thành phố *</label>
                    <select className="fs"><option>-- Chọn tỉnh thành --</option>{["TP. Hồ Chí Minh","Hà Nội","Đà Nẵng","Cần Thơ","Bình Dương","Đồng Nai","Khác"].map(c=><option key={c}>{c}</option>)}</select>
                  </div>
                  <div className="fg full"><label className="fl">Địa chỉ giao hàng *</label><input className="fi" defaultValue={user?.address} placeholder="Số nhà, đường, phường/xã, quận/huyện"/></div>
                  <div className="fg full"><label className="fl">Ghi chú</label><textarea className="ft" placeholder="Giao giờ hành chính, gọi trước khi giao..."/></div>
                </div>
              </div>
              <div className="chksec">
                <h3>Phương thức thanh toán</h3>
                <div className="pm">
                  {[{id:"cod",icon:"🚚",name:"Thanh toán khi nhận hàng (COD)",desc:"Trả tiền mặt khi nhận hàng"},{id:"transfer",icon:"🏦",name:"Chuyển khoản ngân hàng",desc:"Vietcombank · MB Bank · Techcombank"},{id:"momo",icon:"💜",name:"Ví MoMo",desc:"Quét QR hoặc số điện thoại"},{id:"zalopay",icon:"🔵",name:"ZaloPay",desc:"Thanh toán qua ZaloPay"}].map(m=>(
                    <div key={m.id} className={`pmi${pay===m.id?" sel":""}`} onClick={()=>setPay(m.id)}>
                      <input type="radio" name="pay" checked={pay===m.id} readOnly/>
                      <span className="pmicon">{m.icon}</span>
                      <div><div className="pmname">{m.name}</div><div className="pmdesc">{m.desc}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="osum">
                <h3>Đơn hàng của bạn</h3>
                {cart.map(i=>(
                  <div className="oi" key={i.id}>
                    <img src={i.img} alt={i.name}/>
                    <div><div className="oi-name">{i.name} <span style={{color:"var(--dim)"}}>×{i.qty}</span></div><div className="oi-price">{fmt(i.price*i.qty)}</div></div>
                  </div>
                ))}
                <div className="oline"><span>Tạm tính</span><span>{fmt(sub)}</span></div>
                <div className="oline"><span>Phí vận chuyển</span><span>{ship===0?"Miễn phí 🎁":fmt(ship)}</span></div>
                <div className="ototl"><span className="lbl">Tổng cộng</span><span className="val">{fmt(tot)}</span></div>
                <button className="pobtn" onClick={()=>{setPage("success");setCart([]);}}>Đặt hàng ngay →</button>
                <div className="secnote">🔒 Thông tin được bảo mật an toàn</div>
                <button className="conbtn" style={{marginTop:9}} onClick={()=>setPage("shop")}>← Tiếp tục mua sắm</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS */}
      {page==="success"&&(
        <div className="sucpage">
          <div className="sucicon">✨</div>
          <h2>Đặt hàng <em>thành công!</em></h2>
          <p>Cảm ơn bạn đã tin tưởng Thái Bảo Lighting.</p>
          <p>Chúng tôi sẽ liên hệ xác nhận trong vòng <strong style={{color:GOLD}}>30 phút</strong>.</p>
          <div className="ocode">Mã đơn hàng: <strong>{orderCode}</strong></div>
          <p style={{fontSize:13,color:"var(--dim)"}}>Hotline: <a href="tel:0935351095" style={{color:GOLD}}>0935 351 095</a></p>
          <div className="sucac">
            <button className="bp" onClick={()=>setPage("shop")}>Tiếp tục mua sắm</button>
            {user&&<button className="bg" onClick={()=>{setPage("profile");setPftab("orders");}}>Xem đơn hàng</button>}
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      {cartOpen&&(
        <>
          <div className="overlay" onClick={()=>setCartOpen(false)}/>
          <div className="drawer">
            <div className="dhead">
              <div className="dtitle">Giỏ hàng {items>0&&<span style={{fontSize:13,color:"var(--dim)",fontWeight:300}}>({items})</span>}</div>
              <button className="dclose" onClick={()=>setCartOpen(false)}>✕</button>
            </div>
            <div className="dbody">
              {cart.length===0?(
                <div className="cempty"><div className="cempty-icon">🛒</div><p>Giỏ hàng đang trống</p></div>
              ):cart.map(item=>(
                <div className="citem" key={item.id}>
                  <img className="citem-img" src={item.img} alt={item.name}/>
                  <div className="citem-info">
                    <div className="citem-name">{item.name}</div>
                    <div className="citem-price">{fmt(item.price)}</div>
                    <div className="citem-qty">
                      <button className="qbtn" onClick={()=>updQty(item.id,-1)}>−</button>
                      <span className="qnum">{item.qty}</span>
                      <button className="qbtn" onClick={()=>updQty(item.id,1)}>+</button>
                    </div>
                  </div>
                  <button className="crem" onClick={()=>remCart(item.id)}>✕</button>
                </div>
              ))}
            </div>
            {cart.length>0&&(
              <div className="dfoot">
                <div className="crow"><span>Tạm tính</span><span>{fmt(sub)}</span></div>
                <div className="crow"><span>Phí ship</span><span>{ship===0?"Miễn phí 🎁":fmt(ship)}</span></div>
                {ship>0&&<div className="crow" style={{fontSize:11,color:"var(--dim)"}}><span>Mua thêm {fmt(5000000-sub)} để miễn ship</span></div>}
                <div className="crow tot"><span>Tổng cộng</span><span className="val">{fmt(tot)}</span></div>
                <button className="chkbtn" onClick={()=>{setCartOpen(false);setPage("checkout");}}>Tiến hành thanh toán →</button>
                <button className="conbtn" onClick={()=>setCartOpen(false)}>← Tiếp tục mua sắm</button>
              </div>
            )}
          </div>
        </>
      )}

      {/* DETAIL MODAL */}
      {detail&&(
        <div className="modal-overlay" onClick={()=>setDetail(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="mclose"><button onClick={()=>setDetail(null)}>✕</button></div>
            <div className="mgrid">
              <div className="mimg"><img src={detail.img} alt={detail.name}/></div>
              <div className="minfo">
                {detail.tag&&<div className="mtag">{detail.tag}</div>}
                <div className="mname">{detail.name}</div>
                <div className="mprice">
                  <span className="mn">{fmt(detail.price)}</span>
                  {detail.originalPrice&&<span className="mo">{fmt(detail.originalPrice)}</span>}
                  {detail.originalPrice&&<span style={{fontSize:11,background:"rgba(200,169,110,.1)",color:GOLD,padding:"2px 8px",border:"1px solid rgba(200,169,110,.2)"}}>Tiết kiệm {fmt(detail.originalPrice-detail.price)}</span>}
                </div>
                <div className="mdesc">{detail.desc}</div>
                <div className="mspecs">
                  <h4>Thông số kỹ thuật</h4>
                  {detail.specs.map(s=><div className="spec" key={s}>{s}</div>)}
                </div>
                <div className="mqty">
                  <label>Số lượng:</label>
                  <button className="qbtn" onClick={()=>setDqty(q=>Math.max(1,q-1))}>−</button>
                  <span className="qnum">{dqty}</span>
                  <button className="qbtn" onClick={()=>setDqty(q=>q+1)}>+</button>
                </div>
                <button className="madd" onClick={()=>addCart(detail,dqty)}>Thêm vào giỏ hàng ({fmt(detail.price*dqty)})</button>
                <div className="mcont">Cần tư vấn? <a href="tel:0935351095">Gọi 0935 351 095</a></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AUTH MODAL */}
      {authOpen&&(
        <div className="auth-overlay" onClick={closeAuth}>
          <div className="auth-box" onClick={e=>e.stopPropagation()}>
            <button className="aclose" onClick={closeAuth}>✕</button>
            <div className="auth-top">
              <div className="auth-brand">THÁI BẢO <span>LIGHTING</span></div>
              {!done&&(
                <div className="auth-tabs">
                  <button className={`atab${authTab==="login"?" on":""}`} onClick={()=>{setAuthTab("login");setLerr({});setRerr({});}}>Đăng nhập</button>
                  <button className={`atab${authTab==="register"?" on":""}`} onClick={()=>{setAuthTab("register");setLerr({});setRerr({});}}>Đăng ký</button>
                </div>
              )}
            </div>
            <div className="auth-body">
              {done?(
                <div className="asuccess">
                  <div className="asuccess-icon">🎉</div>
                  <h3>{authTab==="login"?"Đăng nhập thành công!":"Chào mừng bạn!"}</h3>
                  <p>{authTab==="login"?"Đang chuyển hướng...":"Tài khoản đã được tạo. Đang chuyển hướng..."}</p>
                  <div className="spin" style={{paddingTop:16,paddingBottom:0}}><div className="spinner"/></div>
                </div>
              ):loading?(
                <div className="spin"><div className="spinner"/><span>Đang xử lý...</span></div>
              ):authTab==="login"?(
                <div className="aform">
                  {lerr.general&&<div className="ageneral">{lerr.general}</div>}
                  <div className="afield">
                    <label className="alabel">Email</label>
                    <input className={`ainput${lerr.email?" err":""}`} type="email" placeholder="demo@thaibao.vn" value={le} onChange={e=>{setLe(e.target.value);setLerr(p=>({...p,email:"",general:""}));}} onKeyDown={e=>e.key==="Enter"&&doLogin()}/>
                    {lerr.email&&<div className="aerr">{lerr.email}</div>}
                  </div>
                  <div className="afield">
                    <label className="alabel">Mật khẩu</label>
                    <div className="awrap">
                      <input className={`ainput${lerr.pwd?" err":""}`} type={sp?"text":"password"} placeholder="••••••••" value={lp} onChange={e=>{setLp(e.target.value);setLerr(p=>({...p,pwd:"",general:""}));}} onKeyDown={e=>e.key==="Enter"&&doLogin()}/>
                      <button className="aeye" onClick={()=>setSp(p=>!p)}>{sp?"🙈":"👁️"}</button>
                    </div>
                    {lerr.pwd&&<div className="aerr">{lerr.pwd}</div>}
                  </div>
                  <div style={{display:"flex",justifyContent:"flex-end"}}><button style={{background:"none",border:"none",color:GOLD,fontSize:12,cursor:"pointer",fontFamily:"inherit"}} onClick={()=>toast_("Vui lòng liên hệ 0935 351 095 để hỗ trợ")}>Quên mật khẩu?</button></div>
                  <button className="asubmit" onClick={doLogin}>Đăng nhập</button>
                  <div className="adivider"><div className="adivline"/><div className="adivtxt">hoặc</div><div className="adivline"/></div>
                  <button className="asocial" onClick={()=>toast_("Đăng nhập Google sắp ra mắt ✨")}>🔵 &nbsp;Tiếp tục với Google</button>
                  <div className="aswitch">Chưa có tài khoản? <button onClick={()=>{setAuthTab("register");setLerr({});}}>Đăng ký ngay</button></div>
                </div>
              ):(
                <div className="aform">
                  <div className="afield">
                    <label className="alabel">Họ và tên *</label>
                    <input className={`ainput${rerr.name?" err":""}`} placeholder="Nguyễn Văn A" value={rn} onChange={e=>{setRn(e.target.value);setRerr(p=>({...p,name:""}));}}/>
                    {rerr.name&&<div className="aerr">{rerr.name}</div>}
                  </div>
                  <div className="afield">
                    <label className="alabel">Email *</label>
                    <input className={`ainput${rerr.email?" err":""}`} type="email" placeholder="email@example.com" value={re} onChange={e=>{setRe(e.target.value);setRerr(p=>({...p,email:""}));}}/>
                    {rerr.email&&<div className="aerr">{rerr.email}</div>}
                  </div>
                  <div className="afield">
                    <label className="alabel">Số điện thoại *</label>
                    <input className={`ainput${rerr.phone?" err":""}`} type="tel" placeholder="0935 351 095" value={rph} onChange={e=>{setRph(e.target.value);setRerr(p=>({...p,phone:""}));}}/>
                    {rerr.phone&&<div className="aerr">{rerr.phone}</div>}
                  </div>
                  <div className="afield">
                    <label className="alabel">Mật khẩu *</label>
                    <div className="awrap">
                      <input className={`ainput${rerr.pwd?" err":""}`} type={sp?"text":"password"} placeholder="Tối thiểu 6 ký tự" value={rp} onChange={e=>{setRp(e.target.value);setRerr(p=>({...p,pwd:""}));}}/>
                      <button className="aeye" onClick={()=>setSp(v=>!v)}>{sp?"🙈":"👁️"}</button>
                    </div>
                    {rerr.pwd&&<div className="aerr">{rerr.pwd}</div>}
                  </div>
                  <div className="afield">
                    <label className="alabel">Xác nhận mật khẩu *</label>
                    <div className="awrap">
                      <input className={`ainput${rerr.pwd2?" err":""}`} type={sp2?"text":"password"} placeholder="Nhập lại mật khẩu" value={rp2} onChange={e=>{setRp2(e.target.value);setRerr(p=>({...p,pwd2:""}));}}/>
                      <button className="aeye" onClick={()=>setSp2(v=>!v)}>{sp2?"🙈":"👁️"}</button>
                    </div>
                    {rerr.pwd2&&<div className="aerr">{rerr.pwd2}</div>}
                  </div>
                  <div className="terms">Bằng cách đăng ký, bạn đồng ý với <span>Điều khoản dịch vụ</span> và <span>Chính sách bảo mật</span> của Thái Bảo Lighting.</div>
                  <button className="asubmit" onClick={doRegister}>Tạo tài khoản</button>
                  <div className="aswitch">Đã có tài khoản? <button onClick={()=>{setAuthTab("login");setRerr({});}}>Đăng nhập</button></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {toast&&<div className="toast"><div className="tdot"/>{toast}</div>}
    </>
  );
}
