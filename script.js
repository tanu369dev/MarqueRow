const IMG={i1:"images/scout-bobber-black.jpg",i2:"images/royal-enfield-hunter-350.jpg",i3:"images/scout-green-ivory.jpg",i4:"images/scout-sixty-red.jpg",i5:"images/chief-classic-red.jpg",i6:"images/scout-sixty-white.jpg",i7:"images/sport-chief-gold.jpg",i8:"images/scout-bobber-blue.jpg"};
let BIKES=[
{id:1,make:"Indian",model:"Scout Bobber",year:2023,km:4200,cc:1133,price:1450000,city:"Mumbai",type:"Cruiser",color:"Thunder black",owner:"1st owner",docs:1,img:IMG.i1},
{id:2,make:"Royal Enfield",model:"Hunter 350",year:2023,km:6800,cc:349,price:145000,city:"Pune",type:"Classic",color:"Factory silver",owner:"1st owner",docs:1,img:IMG.i2},
{id:3,make:"Indian",model:"Scout",year:2018,km:11800,cc:1133,price:1120000,city:"Bengaluru",type:"Cruiser",color:"Willow green and ivory",owner:"2nd owner",docs:1,img:IMG.i3},
{id:4,make:"Indian",model:"Scout Sixty",year:2019,km:9600,cc:999,price:890000,city:"Delhi",type:"Cruiser",color:"Ruby red",owner:"1st owner",docs:1,img:IMG.i4},
{id:5,make:"Indian",model:"Chief Classic",year:2017,km:14300,cc:1811,price:1680000,city:"Mumbai",type:"Classic",color:"Indian motorcycle red",owner:"2nd owner",docs:1,img:IMG.i5},
{id:6,make:"Indian",model:"Scout Sixty",year:2018,km:7400,cc:999,price:840000,city:"Pune",type:"Cruiser",color:"Pearl white",owner:"1st owner",docs:1,img:IMG.i6},
{id:7,make:"Indian",model:"Sport Chief",year:2024,km:2100,cc:1890,price:2750000,city:"Mumbai",type:"Tourer",color:"Amber gold, saddlebags",owner:"1st owner",docs:1,img:IMG.i7},
{id:8,make:"Indian",model:"Scout Bobber",year:2025,km:900,cc:1133,price:1590000,city:"Bengaluru",type:"Cruiser",color:"Storm blue",owner:"1st owner",docs:1,img:IMG.i8}];
const $=id=>document.getElementById(id);
const inr=n=>"₹"+n.toLocaleString("en-IN");
const km=n=>n.toLocaleString("en-IN");
const st={q:"",make:"",max:3000000,sort:"new",type:"All",saved:false};
const saved=new Set();
let nextId=100;

function fillStatic(){
  const f=BIKES[0];
  $("featLine").textContent=(f.make+" "+f.model+" · "+km(f.km)+" km · "+km(f.cc)+" cc").toUpperCase();
  $("featBtn").onclick=()=>openBike(f.id);
  const imgs=BIKES.map(b=>'<img src="'+b.img+'" alt="" loading="lazy">').join("");
  $("track").innerHTML=imgs+imgs;
  refreshFilters();
}
function refreshFilters(){
  const makes=[...new Set(BIKES.map(b=>b.make))].sort();
  $("make").innerHTML='<option value="">All makes</option>'+makes.map(m=>'<option>'+m+'</option>').join("");
  $("make").value=st.make;
  const types=["All",...new Set(BIKES.map(b=>b.type))];
  $("chips").innerHTML=types.map(t=>'<button class="chip" aria-pressed="'+(st.type===t)+'" data-t="'+t+'">'+t+'</button>').join("");
}
function list(){
  let r=BIKES.filter(b=>{
    const hay=(b.make+" "+b.model+" "+b.city+" "+b.type+" "+b.year).toLowerCase();
    return hay.includes(st.q.toLowerCase())&&(!st.make||b.make===st.make)&&b.price<=st.max&&(st.type==="All"||b.type===st.type)&&(!st.saved||saved.has(b.id));
  });
  const s={new:(a,b)=>b.id-a.id,lo:(a,b)=>a.price-b.price,hi:(a,b)=>b.price-a.price,km:(a,b)=>a.km-b.km}[st.sort];
  return r.sort(s);
}
function render(){
  const r=list();
  $("count").textContent="SHOWING "+r.length+" OF "+BIKES.length+" BIKES";
  $("savedBtn").textContent="Saved ("+saved.size+")";
  $("savedBtn").setAttribute("aria-pressed",st.saved);
  $("grid").innerHTML=r.length?r.map(b=>
  '<article class="card"><div class="ph"><img src="'+b.img+'" alt="'+b.year+' '+b.make+' '+b.model+', '+b.color+'" loading="lazy">'+
  '<span class="badge mono">'+(b.docs?"DOCUMENTS CHECKED":"CHECK PENDING")+'</span>'+
  '<button class="heart" data-h="'+b.id+'" aria-pressed="'+saved.has(b.id)+'" aria-label="Save '+b.model+'"><svg viewBox="0 0 24 24"><path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z"/></svg></button></div>'+
  '<div class="cb"><span class="make mono">'+b.make.toUpperCase()+'</span><h3>'+b.model+'</h3><span class="spec mono">'+b.year+'  '+km(b.km)+' KM  '+km(b.cc)+' CC</span>'+
  '<div class="foot"><div><div class="price">'+inr(b.price)+'</div><span class="make mono">'+b.city.toUpperCase()+'</span></div><button class="btn" data-v="'+b.id+'">View</button></div></div></article>').join(""):
  '<div class="empty" style="grid-column:1/-1">No bikes match these filters. Raise the budget or choose All makes.</div>';
}
function openBike(id){
  const b=BIKES.find(x=>x.id===id);
  $("dt").textContent=(b.make+" "+b.model).toUpperCase();
  $("dbody").innerHTML='<img src="'+b.img+'" alt="'+b.make+' '+b.model+'"><span class="make mono">'+b.make.toUpperCase()+'</span><h3>'+b.model+'</h3><div class="price">'+inr(b.price)+'</div>'+
  '<dl><dt class="mono">Year</dt><dd>'+b.year+'</dd><dt class="mono">Odometer</dt><dd>'+km(b.km)+' km</dd><dt class="mono">Engine</dt><dd>'+km(b.cc)+' cc</dd><dt class="mono">Type</dt><dd>'+b.type+'</dd><dt class="mono">Colour</dt><dd>'+b.color+'</dd><dt class="mono">Ownership</dt><dd>'+b.owner+'</dd><dt class="mono">Location</dt><dd>'+b.city+'</dd><dt class="mono">Papers</dt><dd>'+(b.docs?"Checked":"Check pending")+'</dd></dl>'+
  '<h4 style="margin:0 0 10px;font:800 18px var(--disp)">Reserve this bike</h4>'+
  '<form class="form" id="rf"><div><label class="l mono" for="rn">Your name</label><input type="text" id="rn" required autocomplete="name"></div><div><label class="l mono" for="rp">Phone</label><input type="tel" id="rp" required autocomplete="tel"></div><div class="full"><button class="btn fill" type="submit">Reserve</button></div></form><p class="ok" id="rok" hidden></p>';
  $("rf").onsubmit=e=>{e.preventDefault();$("rok").hidden=false;$("rok").textContent="Reserved, "+$("rn").value+". The seller will call you on "+$("rp").value+" to fix a viewing.";e.target.hidden=true};
  $("dlg").showModal();
}
function openSell(){
  $("dt").textContent="SELL A BIKE";
  $("dbody").innerHTML='<h3>List your bike</h3><p class="sub">Add the details and a photo. Your bike joins the floor once its papers are checked.</p>'+
  '<form class="form" id="sf">'+
  '<div><label class="l mono" for="sm">Make</label><input type="text" id="sm" required placeholder="Indian"></div>'+
  '<div><label class="l mono" for="so">Model</label><input type="text" id="so" required placeholder="Scout Bobber"></div>'+
  '<div><label class="l mono" for="sy">Year</label><input type="number" id="sy" required min="1990" max="2026" value="2022"></div>'+
  '<div><label class="l mono" for="sk">Odometer (km)</label><input type="number" id="sk" required min="0"></div>'+
  '<div><label class="l mono" for="sc">Engine (cc)</label><input type="number" id="sc" required min="50"></div>'+
  '<div><label class="l mono" for="sp">Asking price (₹)</label><input type="number" id="sp" required min="10000" step="1000"></div>'+
  '<div><label class="l mono" for="sci">City</label><input type="text" id="sci" required></div>'+
  '<div><label class="l mono" for="st">Type</label><select id="st"><option>Cruiser</option><option>Classic</option><option>Tourer</option><option>Superbike</option><option>Naked</option></select></div>'+
  '<div class="full"><label class="l mono" for="sf2">Photo</label><input type="file" id="sf2" accept="image/*"></div>'+
  '<div class="full"><button class="btn fill" type="submit">List my bike</button></div></form>';
  $("sf").onsubmit=e=>{
    e.preventDefault();
    const add=src=>{
      BIKES.push({id:nextId++,make:$("sm").value.trim(),model:$("so").value.trim(),year:+$("sy").value,km:+$("sk").value,cc:+$("sc").value,price:+$("sp").value,city:$("sci").value.trim(),type:$("st").value,color:"Not stated",owner:"Seller to confirm",docs:0,img:src});
      st.type="All";st.make="";st.q="";st.max=3000000;$("q").value="";$("price").value=3000000;$("pv").textContent="any price";
      refreshFilters();render();$("dlg").close();location.hash="floor";
    };
    const f=$("sf2").files[0];
    if(f){const r=new FileReader();r.onload=()=>add(r.result);r.readAsDataURL(f)}
    else add(IMG.i1);
  };
  $("dlg").showModal();
}
$("q").oninput=e=>{st.q=e.target.value;render()};
$("make").onchange=e=>{st.make=e.target.value;render()};
$("sort").onchange=e=>{st.sort=e.target.value;render()};
$("price").oninput=e=>{st.max=+e.target.value;$("pv").textContent=st.max>=3000000?"any price":inr(st.max);render()};
$("chips").onclick=e=>{const t=e.target.dataset.t;if(!t)return;st.type=t;refreshFilters();render()};
$("grid").onclick=e=>{
  const h=e.target.closest("[data-h]"),v=e.target.closest("[data-v]");
  if(h){const id=+h.dataset.h;saved.has(id)?saved.delete(id):saved.add(id);render()}
  else if(v)openBike(+v.dataset.v);
};
$("savedBtn").onclick=()=>{st.saved=!st.saved;render()};
$("sellOpen").onclick=openSell;$("sellOpen2").onclick=openSell;
$("dx").onclick=()=>$("dlg").close();
$("dlg").addEventListener("click",e=>{if(e.target===$("dlg"))$("dlg").close()});
fillStatic();render();
