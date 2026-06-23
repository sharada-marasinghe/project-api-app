/* ================================================================
   FreeProjectAPI Dashboard – app.js  (corrected endpoints)
   Base: https://freeapi.gerocerymaster.in/api/
================================================================ */
const BASE = 'https://api.freeprojectapi.com/api/';

const state = { currentApp:'home', onboardingStep:0, surveyPage:0, bookingTarget:null };

/* ── API helper ─────────────────────────────────────────────── */
async function api(path, method='GET', body=null) {
  const opts = { method, headers:{'Content-Type':'application/json','Accept':'application/json'} };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(BASE + path, opts);
  const data = await res.json().catch(()=>({}));
  if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
  return data;
}

const spinner  = ()=>`<div class="d-flex justify-content-center py-5"><div class="spinner-border" style="color:var(--accent)"></div></div>`;
const alertBox = (msg,type='success')=>`<div class="alert alert-${type} d-flex align-items-center gap-2 mt-3"><i class="bi bi-${type==='success'?'check-circle':'exclamation-triangle'}"></i>${msg}</div>`;

const TITLES = {home:'Dashboard',bankloan:'Bank Loan',busbooking:'Bus Booking',collegeproject:'College Project',
  ecommerce:'Ecommerce',employeeapp:'Employee App',employeeonboarding:'Employee Onboarding',
  enquiry:'Enquiry',feestracking:'Fees Tracking',goaltracker:'Goal Tracker',leavetracker:'Leave Tracker',
  projectcompetition:'Project Competition',smartparking:'Smart Parking',survey:'Survey',userapp:'User App'};

function updateTopbar(app) {
  document.getElementById('topbar-title').textContent = TITLES[app]||app;
  document.getElementById('topbar-breadcrumb').textContent = `Home / ${TITLES[app]||app}`;
}

/* ── Router ─────────────────────────────────────────────────── */
function switchApp(app) {
  state.currentApp = app;
  document.querySelectorAll('.nav-link-custom').forEach(b=>b.classList.toggle('active',b.dataset.app===app));
  updateTopbar(app);
  const c = document.getElementById('app-content');
  c.innerHTML = spinner();
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('active');
  const routes={home:renderHome,bankloan:renderBankLoan,busbooking:renderBusBooking,
    collegeproject:renderCollegeProject,ecommerce:renderEcommerce,employeeapp:renderEmployeeApp,
    employeeonboarding:renderEmployeeOnboarding,enquiry:renderEnquiry,feestracking:renderFeesTracking,
    goaltracker:renderGoalTracker,leavetracker:renderLeaveTracker,projectcompetition:renderProjectCompetition,
    smartparking:renderSmartParking,survey:renderSurvey,userapp:renderUserApp};
  if (routes[app]) routes[app](c); else c.innerHTML='<p class="text-muted">Not found.</p>';
}

document.getElementById('sidebar-search-input').addEventListener('input',function(){
  const q=this.value.toLowerCase();
  document.querySelectorAll('.nav-link-custom').forEach(b=>{
    b.closest('.nav-item-custom').style.display=b.textContent.toLowerCase().includes(q)?'':'none';
  });
});
document.getElementById('sidebar-toggle').addEventListener('click',()=>{
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebar-overlay').classList.toggle('active');
});
document.getElementById('sidebar-overlay').addEventListener('click',()=>{
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('active');
});

/* ══════════════════════════════════════════════════════════════
   0. HOME
══════════════════════════════════════════════════════════════ */
function renderHome(c){
  c.innerHTML=`
  <div class="hero-welcome mb-4">
    <div style="font-size:3rem">🚀</div>
    <h2 class="mt-2">FreeProjectAPI Dashboard</h2>
    <p class="text-secondary mb-3">14 fully-integrated sandbox applications. Click any app in the sidebar.</p>
    <div class="d-flex flex-wrap gap-2 justify-content-center">
      <span class="badge bg-secondary">Bootstrap 5</span><span class="badge bg-secondary">Vanilla JS</span>
      <span class="badge bg-secondary">REST APIs</span><span class="badge bg-secondary">SPA Routing</span>
    </div>
  </div>
  <div class="row g-3" id="home-cards"></div>`;
  const apps=[
    {id:'bankloan',icon:'bi-bank',label:'Bank Loan',color:'#58a6ff',desc:'Loan applications & approvals'},
    {id:'busbooking',icon:'bi-bus-front',label:'Bus Booking',color:'#3fb950',desc:'Schedules & seat booking'},
    {id:'collegeproject',icon:'bi-mortarboard',label:'College Project',color:'#bc8cff',desc:'Project submissions'},
    {id:'ecommerce',icon:'bi-cart3',label:'Ecommerce',color:'#d29922',desc:'Product catalog & cart'},
    {id:'employeeapp',icon:'bi-people',label:'Employee App',color:'#58a6ff',desc:'Directory & search'},
    {id:'employeeonboarding',icon:'bi-person-check',label:'Onboarding',color:'#3fb950',desc:'Step-by-step wizard'},
    {id:'enquiry',icon:'bi-chat-dots',label:'Enquiry',color:'#f85149',desc:'Support tickets'},
    {id:'feestracking',icon:'bi-cash-coin',label:'Fees Tracking',color:'#d29922',desc:'Enrollments & payments'},
    {id:'goaltracker',icon:'bi-bullseye',label:'Goal Tracker',color:'#bc8cff',desc:'Goals & progress'},
    {id:'leavetracker',icon:'bi-calendar-x',label:'Leave Tracker',color:'#58a6ff',desc:'Leave requests & balance'},
    {id:'projectcompetition',icon:'bi-trophy',label:'Competition',color:'#d29922',desc:'Register & submit projects'},
    {id:'smartparking',icon:'bi-p-circle',label:'Smart Parking',color:'#3fb950',desc:'Live slot availability'},
    {id:'survey',icon:'bi-card-checklist',label:'Survey',color:'#bc8cff',desc:'Multi-question surveys'},
    {id:'userapp',icon:'bi-person-gear',label:'User App',color:'#58a6ff',desc:'Profile management'}
  ];
  const g=document.getElementById('home-cards');
  apps.forEach(a=>{
    const d=document.createElement('div'); d.className='col-sm-6 col-md-4 col-xl-3';
    d.innerHTML=`<div class="stat-card h-100" style="cursor:pointer;border-color:${a.color}22" onclick="switchApp('${a.id}')"
      onmouseenter="this.style.borderColor='${a.color}'" onmouseleave="this.style.borderColor='${a.color}22'">
      <div class="stat-icon" style="background:${a.color}22;color:${a.color}"><i class="bi ${a.icon}"></i></div>
      <div style="font-size:1rem;font-weight:600;color:${a.color}">${a.label}</div>
      <div class="stat-label">${a.desc}</div></div>`;
    g.appendChild(d);
  });
}

/* ══════════════════════════════════════════════════════════════
   1. BANK LOAN  – GET /BankLoan/GetAllApplications
                  POST /BankLoan/AddNewApplication
══════════════════════════════════════════════════════════════ */
function renderBankLoan(c){
  c.innerHTML=`
  <div class="section-heading"><i class="bi bi-bank me-2" style="color:var(--accent)"></i>Bank Loan Manager</div>
  <div class="section-sub">Apply for a loan and track all applications</div>
  <div class="row g-4">
    <div class="col-lg-4">
      <div class="card">
        <div class="card-header"><strong class="small"><i class="bi bi-plus-circle me-2"></i>New Application</strong></div>
        <div class="card-body">
          <div id="loan-msg"></div>
          <form id="loan-form">
            <div class="mb-3"><label class="form-label">Full Name</label>
              <input class="form-control form-control-sm" id="l-fname" placeholder="John Doe" required/></div>
            <div class="mb-3"><label class="form-label">PAN Card</label>
              <input class="form-control form-control-sm" id="l-pan" placeholder="ABCDE1234F" required/></div>
            <div class="mb-3"><label class="form-label">Email</label>
              <input type="email" class="form-control form-control-sm" id="l-email" placeholder="john@email.com" required/></div>
            <div class="mb-3"><label class="form-label">Phone</label>
              <input class="form-control form-control-sm" id="l-phone" placeholder="9876543210" required/></div>
            <div class="mb-3"><label class="form-label">Date of Birth</label>
              <input type="date" class="form-control form-control-sm" id="l-dob" required/></div>
            <div class="mb-3"><label class="form-label">Annual Income (₹)</label>
              <input type="number" class="form-control form-control-sm" id="l-income" placeholder="600000" required/></div>
            <div class="mb-3"><label class="form-label">Employment Status</label>
              <select class="form-select form-select-sm" id="l-emp">
                <option>Salaried</option><option>Self-Employed</option><option>Business</option><option>Unemployed</option>
              </select></div>
            <div class="mb-3"><label class="form-label">Credit Score</label>
              <input type="number" class="form-control form-control-sm" id="l-credit" placeholder="750" min="300" max="900"/></div>
            <div class="mb-3"><label class="form-label">Loan Amount (₹)</label>
              <input type="number" class="form-control form-control-sm" id="l-amount" placeholder="500000" required/></div>
            <div class="mb-3"><label class="form-label">Bank Name</label>
              <input class="form-control form-control-sm" id="l-bank" placeholder="State Bank of India"/></div>
            <button type="submit" class="btn btn-primary btn-sm w-100"><i class="bi bi-send me-1"></i>Submit Application</button>
          </form>
        </div>
      </div>
    </div>
    <div class="col-lg-8">
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <strong class="small"><i class="bi bi-table me-2"></i>All Applications</strong>
          <button class="btn btn-outline-primary btn-sm" onclick="loadLoanList()"><i class="bi bi-arrow-clockwise"></i></button>
        </div>
        <div class="card-body p-0"><div class="table-responsive">
          <table class="table table-borderless mb-0">
            <thead><tr><th>#</th><th>Applicant</th><th>PAN</th><th>Income</th><th>Credit</th><th>Status</th></tr></thead>
            <tbody id="loan-tbody"><tr><td colspan="6" class="text-center py-4">Loading…</td></tr></tbody>
          </table></div>
        </div>
      </div>
    </div>
  </div>`;
  loadLoanList();
  document.getElementById('loan-form').addEventListener('submit',async e=>{
    e.preventDefault(); const m=document.getElementById('loan-msg');
    m.innerHTML=`<div class="d-flex justify-content-center py-2"><div class="spinner-border spinner-border-sm" style="color:var(--accent)"></div></div>`;
    try {
      await api('BankLoan/AddNewApplication','POST',{
        fullName:document.getElementById('l-fname').value,
        panCard:document.getElementById('l-pan').value,
        email:document.getElementById('l-email').value,
        phone:document.getElementById('l-phone').value,
        dateOfBirth:document.getElementById('l-dob').value,
        annualIncome:parseFloat(document.getElementById('l-income').value)||0,
        employmentStatus:document.getElementById('l-emp').value,
        creditScore:parseInt(document.getElementById('l-credit').value)||700,
        loans:[{bankName:document.getElementById('l-bank').value,loanAmount:parseFloat(document.getElementById('l-amount').value)||0,emi:0}]
      });
      m.innerHTML=alertBox('Application submitted successfully!');
      document.getElementById('loan-form').reset(); loadLoanList();
    } catch(err){m.innerHTML=alertBox('Error: '+err.message,'danger');}
  });
}
async function loadLoanList(){
  const tb=document.getElementById('loan-tbody'); if(!tb)return;
  tb.innerHTML=`<tr><td colspan="6" class="text-center">${spinner()}</td></tr>`;
  try{
    const d=await api('BankLoan/GetAllApplications');
    const items=d.data||d||[];
    if(!items.length){tb.innerHTML=`<tr><td colspan="6" class="text-center text-muted py-3">No applications yet.</td></tr>`;return;}
    tb.innerHTML=items.map((r,i)=>{
      const st=r.applicationStatus||'Pending';
      const sc={Approved:'var(--success-custom)',Rejected:'var(--danger-custom)',Pending:'var(--warning-custom)'}[st]||'var(--warning-custom)';
      return `<tr>
        <td><span class="badge bg-secondary">${i+1}</span></td>
        <td><strong class="small">${r.fullName||'—'}</strong><br><small class="text-muted">${r.email||''}</small></td>
        <td class="small text-muted">${r.panCard||'—'}</td>
        <td class="small">₹${Number(r.annualIncome||0).toLocaleString()}</td>
        <td><span class="badge bg-secondary">${r.creditScore||'—'}</span></td>
        <td><span class="badge" style="background:${sc}22;color:${sc}">${st}</span></td>
      </tr>`;
    }).join('');
  }catch(err){tb.innerHTML=`<tr><td colspan="6" class="text-danger text-center py-3">${err.message}</td></tr>`;}
}

/* ══════════════════════════════════════════════════════════════
   2. BUS BOOKING – GET /BusBooking/GetBusSchedules
                   GET /BusBooking/GetBusLocations
                   POST /BusBooking/BookBus
══════════════════════════════════════════════════════════════ */
let selectedBus=null;
function renderBusBooking(c){
  c.innerHTML=`
  <div class="section-heading"><i class="bi bi-bus-front me-2" style="color:var(--success-custom)"></i>Bus Booking</div>
  <div class="section-sub">Browse bus schedules and book a seat</div>
  <div class="row g-3 mb-4">
    <div class="col-md-4"><label class="form-label">From</label>
      <input class="form-control form-control-sm" id="bus-from" placeholder="Chennai"/></div>
    <div class="col-md-4"><label class="form-label">To</label>
      <input class="form-control form-control-sm" id="bus-to" placeholder="Bangalore"/></div>
    <div class="col-md-4 d-flex align-items-end">
      <button class="btn btn-primary btn-sm w-100" onclick="loadBusSchedules()">
        <i class="bi bi-search me-1"></i>Search Schedules</button>
    </div>
  </div>
  <div id="bus-msg"></div>
  <div id="bus-results"></div>`;
  loadBusSchedules();
}
async function loadBusSchedules(){
  const el=document.getElementById('bus-results'); if(!el)return;
  el.innerHTML=spinner();
  try{
    const d=await api('BusBooking/GetBusSchedules');
    const buses=d.data||d||[];
    if(!buses.length){el.innerHTML=`<p class="text-muted">No schedules found.</p>`;return;}
    el.innerHTML=`<div class="row g-3" id="bus-grid"></div>`;
    const g=document.getElementById('bus-grid');
    buses.forEach(b=>{
      const col=document.createElement('div'); col.className='col-md-6 col-xl-4';
      const seats=b.availableSeats??b.totalSeats??40;
      const dep=b.departureTime?new Date(b.departureTime).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}):'—';
      const arr=b.arrivalTime?new Date(b.arrivalTime).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}):'—';
      col.innerHTML=`<div class="card h-100"><div class="card-body">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <div><div class="fw-bold">${b.busName||'Express'}</div>
            <small class="text-muted">${b.busVehicleNo||''}</small></div>
          <span class="badge bg-success bg-opacity-25 text-success">${seats} seats</span>
        </div>
        <div class="small text-muted mb-2"><i class="bi bi-geo-alt me-1"></i>${b.fromLocationName||b.fromLocation||'Origin'} → ${b.toLocationName||b.toLocation||'Dest'}</div>
        <div class="d-flex justify-content-between small mb-3">
          <span><i class="bi bi-clock me-1"></i>${dep}</span>
          <span><i class="bi bi-clock-history me-1"></i>${arr}</span>
          <span class="fw-bold" style="color:var(--success-custom)">₹${b.price||0}</span>
        </div>
        <button class="btn btn-primary btn-sm w-100" onclick='openBusModal(${JSON.stringify(b)})'>
          <i class="bi bi-ticket-perforated me-1"></i>Book Seat</button>
      </div></div>`;
      g.appendChild(col);
    });
  }catch(err){el.innerHTML=`<div class="alert alert-danger">${err.message}</div>`;}
}
function openBusModal(b){
  selectedBus=b;
  document.getElementById('booking-modal-body').innerHTML=`
    <p class="fw-bold">${b.busName||'Express'} &nbsp;<small class="text-muted">${b.busVehicleNo||''}</small></p>
    <p class="small text-muted">${b.fromLocationName||b.fromLocation||'—'} → ${b.toLocationName||b.toLocation||'—'}</p>
    <div class="mb-3"><label class="form-label">Passenger Name</label>
      <input class="form-control form-control-sm" id="bk-pname" placeholder="Full Name"/></div>
    <div class="mb-3"><label class="form-label">Age</label>
      <input type="number" class="form-control form-control-sm" id="bk-age" placeholder="25"/></div>
    <div class="mb-3"><label class="form-label">Gender</label>
      <select class="form-select form-select-sm" id="bk-gender"><option>Male</option><option>Female</option><option>Other</option></select></div>
    <div class="mb-3"><label class="form-label">Seat No</label>
      <input type="number" class="form-control form-control-sm" id="bk-seat" placeholder="12" min="1"/></div>
    <p class="small text-muted mb-0">Fare: <strong style="color:var(--success-custom)">₹${b.price||0}</strong></p>`;
  new bootstrap.Modal(document.getElementById('bookingModal')).show();
  document.getElementById('confirm-booking-btn').onclick=confirmBusBooking;
}
async function confirmBusBooking(){
  const b=selectedBus;
  const payload={custId:1,scheduleId:b.scheduleId||b.scheduleID||1,
    bookingDate:new Date().toISOString(),
    busBookingPassengers:[{passengerName:document.getElementById('bk-pname').value,
      age:parseInt(document.getElementById('bk-age').value)||25,
      gender:document.getElementById('bk-gender').value,
      seatNo:parseInt(document.getElementById('bk-seat').value)||1}]};
  bootstrap.Modal.getInstance(document.getElementById('bookingModal')).hide();
  try{
    await api('BusBooking/BookBus','POST',payload);
    document.getElementById('bus-msg').innerHTML=alertBox('Booking confirmed!');
  }catch(err){document.getElementById('bus-msg').innerHTML=alertBox('Booking failed: '+err.message,'danger');}
}

/* ══════════════════════════════════════════════════════════════
   3. COLLEGE PROJECT – GET /CollegeProject/getAllProjects
                        POST /CollegeProject/SubmitProject
══════════════════════════════════════════════════════════════ */
function renderCollegeProject(c){
  c.innerHTML=`
  <div class="section-heading"><i class="bi bi-mortarboard me-2" style="color:#bc8cff"></i>College Project Portal</div>
  <div class="section-sub">Submit your project and browse submissions</div>
  <div class="row g-4">
    <div class="col-lg-4"><div class="card">
      <div class="card-header"><strong class="small"><i class="bi bi-upload me-2"></i>Submit Project</strong></div>
      <div class="card-body">
        <div id="cp-msg"></div>
        <form id="cp-form">
          <div class="mb-3"><label class="form-label">Project Title</label>
            <input class="form-control form-control-sm" id="cp-title" required placeholder="AI Smart Chatbot"/></div>
          <div class="mb-3"><label class="form-label">Description</label>
            <textarea class="form-control form-control-sm" id="cp-desc" rows="3" placeholder="Brief description…"></textarea></div>
          <div class="mb-3"><label class="form-label">GitHub Link</label>
            <input class="form-control form-control-sm" id="cp-github" placeholder="https://github.com/…"/></div>
          <div class="mb-3"><label class="form-label">Competition ID</label>
            <input type="number" class="form-control form-control-sm" id="cp-comp" value="1"/></div>
          <div class="mb-3"><label class="form-label">User ID</label>
            <input type="number" class="form-control form-control-sm" id="cp-uid" value="1"/></div>
          <button type="submit" class="btn btn-primary btn-sm w-100"><i class="bi bi-cloud-upload me-1"></i>Submit</button>
        </form>
      </div>
    </div></div>
    <div class="col-lg-8"><div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <strong class="small"><i class="bi bi-journals me-2"></i>All Projects</strong>
        <button class="btn btn-outline-primary btn-sm" onclick="loadCPList()"><i class="bi bi-arrow-clockwise"></i></button>
      </div>
      <div class="card-body p-0"><div class="table-responsive">
        <table class="table table-borderless mb-0">
          <thead><tr><th>#</th><th>Project Title</th><th>Description</th><th>GitHub</th><th>Status</th></tr></thead>
          <tbody id="cp-tbody"><tr><td colspan="5" class="text-center py-4">Loading…</td></tr></tbody>
        </table></div>
      </div>
    </div></div>
  </div>`;
  loadCPList();
  document.getElementById('cp-form').addEventListener('submit',async e=>{
    e.preventDefault(); const m=document.getElementById('cp-msg');
    m.innerHTML=`<div class="spinner-border spinner-border-sm" style="color:var(--accent)"></div>`;
    try{
      await api('CollegeProject/SubmitProject','POST',{
        projectTitle:document.getElementById('cp-title').value,
        description:document.getElementById('cp-desc').value,
        githubLink:document.getElementById('cp-github').value,
        competitionId:parseInt(document.getElementById('cp-comp').value)||1,
        userId:parseInt(document.getElementById('cp-uid').value)||1
      });
      m.innerHTML=alertBox('Project submitted!'); document.getElementById('cp-form').reset(); loadCPList();
    }catch(err){m.innerHTML=alertBox('Error: '+err.message,'danger');}
  });
}
async function loadCPList(){
  const tb=document.getElementById('cp-tbody'); if(!tb)return;
  tb.innerHTML=`<tr><td colspan="5" class="text-center">${spinner()}</td></tr>`;
  try{
    const d=await api('CollegeProject/getAllProjects');
    const items=d.data||d||[];
    if(!items.length){tb.innerHTML=`<tr><td colspan="5" class="text-center text-muted py-3">No projects yet.</td></tr>`;return;}
    tb.innerHTML=items.map((r,i)=>{
      const st=r.status||'Pending';
      const sc={Approved:'var(--success-custom)',Rejected:'var(--danger-custom)'}[st]||'var(--warning-custom)';
      return `<tr>
        <td><span class="badge bg-secondary">${i+1}</span></td>
        <td class="fw-bold small">${r.projectTitle||'—'}</td>
        <td class="small text-muted">${(r.description||'—').substring(0,60)}</td>
        <td class="small">${r.githubLink?`<a href="${r.githubLink}" target="_blank" class="text-accent">GitHub</a>`:'—'}</td>
        <td><span class="badge" style="background:${sc}22;color:${sc}">${st}</span></td>
      </tr>`;
    }).join('');
  }catch(err){tb.innerHTML=`<tr><td colspan="5" class="text-danger text-center py-3">${err.message}</td></tr>`;}
}

/* ══════════════════════════════════════════════════════════════
   4. ECOMMERCE – GET /Ecommerce/get-products
                  POST /Ecommerce/add-to-cart
══════════════════════════════════════════════════════════════ */
let allProducts=[];
function renderEcommerce(c){
  c.innerHTML=`
  <div class="section-heading"><i class="bi bi-cart3 me-2" style="color:var(--warning-custom)"></i>Ecommerce Store</div>
  <div class="section-sub">Browse products and add to cart</div>
  <div class="row g-3 mb-3">
    <div class="col-md-6"><input class="form-control form-control-sm" id="ec-search" placeholder="Search products…" oninput="filterProducts()"/></div>
    <div class="col-md-3"><select class="form-select form-select-sm" id="ec-cat" onchange="filterProducts()"><option value="">All Categories</option></select></div>
    <div class="col-md-3"><button class="btn btn-outline-primary btn-sm w-100" onclick="loadProducts()"><i class="bi bi-arrow-clockwise me-1"></i>Refresh</button></div>
  </div>
  <div id="ec-msg"></div>
  <div id="ec-grid" class="row g-3"></div>`;
  loadProducts();
}
async function loadProducts(){
  const g=document.getElementById('ec-grid'); if(!g)return;
  g.innerHTML=`<div class="col-12">${spinner()}</div>`;
  try{
    const d=await api('Ecommerce/get-products');
    allProducts=d.data||d||[];
    const cats=[...new Set(allProducts.map(p=>p.parentCategoryName||p.category||'General'))];
    const sel=document.getElementById('ec-cat');
    if(sel) cats.forEach(cat=>{const o=document.createElement('option');o.value=cat;o.textContent=cat;sel.appendChild(o);});
    renderProductGrid(allProducts);
  }catch(err){g.innerHTML=`<div class="col-12"><div class="alert alert-danger">${err.message}</div></div>`;}
}
function filterProducts(){
  const q=(document.getElementById('ec-search')?.value||'').toLowerCase();
  const cat=document.getElementById('ec-cat')?.value||'';
  renderProductGrid(allProducts.filter(p=>{
    const name=(p.productName||p.name||'').toLowerCase();
    const pc=p.parentCategoryName||p.category||'General';
    return name.includes(q)&&(!cat||pc===cat);
  }));
}
function renderProductGrid(products){
  const g=document.getElementById('ec-grid'); if(!g)return;
  if(!products.length){g.innerHTML=`<div class="col-12"><p class="text-muted">No products found.</p></div>`;return;}
  g.innerHTML='';
  products.forEach(p=>{
    const col=document.createElement('div'); col.className='col-sm-6 col-md-4 col-xl-3';
    const name=p.productName||p.name||'Product';
    const price=p.price||p.mrp||0;
    const cat=p.parentCategoryName||p.category||'General';
    col.innerHTML=`<div class="card h-100"><div class="card-body d-flex flex-column">
      <div class="text-center mb-3" style="font-size:2.5rem">${getCatEmoji(cat)}</div>
      <div class="fw-bold mb-1 small">${name}</div>
      <span class="badge bg-secondary mb-2" style="width:fit-content">${cat}</span>
      <p class="text-muted small flex-grow-1">${(p.description||'Quality product.').substring(0,80)}</p>
      <div class="d-flex justify-content-between align-items-center mt-auto">
        <span class="fw-bold" style="color:var(--warning-custom)">₹${Number(price).toLocaleString()}</span>
        <button class="btn btn-warning btn-sm" onclick="addToCart(${p.productId||p.id||0},'${name}',${price})">
          <i class="bi bi-bag-plus me-1"></i>Add</button>
      </div>
    </div></div>`;
    g.appendChild(col);
  });
}
function getCatEmoji(c){return {Electronics:'📱',Clothing:'👗',Food:'🍔',Books:'📚',Furniture:'🛋️',Sports:'⚽',Beauty:'💄',Toys:'🧸'}[c]||'🛍️';}
async function addToCart(productId,name,price){
  const m=document.getElementById('ec-msg');
  try{
    await api('Ecommerce/add-to-cart','POST',{custId:1,productId,quantity:1});
    if(m) m.innerHTML=alertBox(`"${name}" added to cart! ₹${price}`);
  }catch(err){if(m) m.innerHTML=alertBox('Error: '+err.message,'danger');}
}

/* ══════════════════════════════════════════════════════════════
   5. EMPLOYEE APP – GET /EmployeeApp/GetEmployees
                     GET /EmployeeApp/GetDepartments
                     POST /EmployeeApp/CreateEmployee
══════════════════════════════════════════════════════════════ */
let allEmployees=[];
function renderEmployeeApp(c){
  c.innerHTML=`
  <div class="section-heading"><i class="bi bi-people me-2" style="color:var(--accent)"></i>Employee Directory</div>
  <div class="section-sub">Search and view all employee records</div>
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
      <strong class="small"><i class="bi bi-person-lines-fill me-2"></i>All Employees</strong>
      <div class="d-flex gap-2">
        <input class="form-control form-control-sm" id="emp-search" style="width:200px" placeholder="Search…" oninput="filterEmployees()"/>
        <button class="btn btn-outline-primary btn-sm" onclick="loadEmployees()"><i class="bi bi-arrow-clockwise"></i></button>
      </div>
    </div>
    <div class="card-body p-0"><div class="table-responsive">
      <table class="table table-borderless mb-0">
        <thead><tr><th>#</th><th>Employee</th><th>Department</th><th>Designation</th><th>Phone</th><th>Status</th></tr></thead>
        <tbody id="emp-tbody"><tr><td colspan="6" class="text-center py-4">Loading…</td></tr></tbody>
      </table></div>
    </div>
  </div>`;
  loadEmployees();
}
async function loadEmployees(){
  const tb=document.getElementById('emp-tbody'); if(!tb)return;
  tb.innerHTML=`<tr><td colspan="6" class="text-center">${spinner()}</td></tr>`;
  try{
    const d=await api('EmployeeApp/GetEmployees');
    allEmployees=d.data||d||[];
    renderEmployeeTable(allEmployees);
  }catch(err){tb.innerHTML=`<tr><td colspan="6" class="text-danger text-center py-3">${err.message}</td></tr>`;}
}
function filterEmployees(){
  const q=(document.getElementById('emp-search')?.value||'').toLowerCase();
  renderEmployeeTable(allEmployees.filter(e=>{
    const n=(e.employeeName||e.name||e.fullName||'').toLowerCase();
    const dep=(e.departmentName||e.department||'').toLowerCase();
    return n.includes(q)||dep.includes(q);
  }));
}
function renderEmployeeTable(list){
  const tb=document.getElementById('emp-tbody'); if(!tb)return;
  if(!list.length){tb.innerHTML=`<tr><td colspan="6" class="text-center text-muted py-3">No employees found.</td></tr>`;return;}
  const stats=['Active','On Leave','Remote'];
  tb.innerHTML=list.map((e,i)=>{
    const st=e.status||stats[i%3];
    const sc=st==='Active'?'var(--success-custom)':st==='On Leave'?'var(--warning-custom)':'var(--accent)';
    const name=e.employeeName||e.name||e.fullName||'—';
    return `<tr>
      <td><div style="width:32px;height:32px;border-radius:50%;background:var(--accent-glow);display:flex;align-items:center;justify-content:center;color:var(--accent);font-weight:700;font-size:.75rem">${name.charAt(0).toUpperCase()}</div></td>
      <td><strong class="small">${name}</strong><br><small class="text-muted">${e.email||e.emailId||''}</small></td>
      <td><span class="badge bg-secondary bg-opacity-25 text-secondary">${e.departmentName||e.department||'—'}</span></td>
      <td class="small">${e.designationName||e.designation||e.role||'—'}</td>
      <td class="small text-muted">${e.phone||e.contactNo||'—'}</td>
      <td><span class="badge" style="background:${sc}22;color:${sc}">${st}</span></td>
    </tr>`;
  }).join('');
}

/* ══════════════════════════════════════════════════════════════
   6. EMPLOYEE ONBOARDING – GET /EmployeeOnboarding/GetEmployees
                             POST /EmployeeOnboarding/register
══════════════════════════════════════════════════════════════ */
const obSteps=[{label:'Personal Info',icon:'bi-person'},{label:'Job Details',icon:'bi-briefcase'},{label:'Documents',icon:'bi-file-earmark-text'},{label:'Review',icon:'bi-check2-circle'}];
function renderEmployeeOnboarding(c){
  state.onboardingStep=0;
  c.innerHTML=`
  <div class="section-heading"><i class="bi bi-person-check me-2" style="color:var(--success-custom)"></i>Employee Onboarding</div>
  <div class="section-sub">Complete the onboarding wizard for new employees</div>
  <div id="ob-msg"></div>
  <div class="card"><div class="card-body">
    <div class="step-indicator" id="ob-steps"></div>
    <div id="ob-content"></div>
    <div class="d-flex justify-content-between mt-4">
      <button class="btn btn-outline-secondary btn-sm" id="ob-prev" onclick="obNav(-1)"><i class="bi bi-arrow-left me-1"></i>Back</button>
      <button class="btn btn-primary btn-sm" id="ob-next" onclick="obNav(1)">Next<i class="bi bi-arrow-right ms-1"></i></button>
    </div>
  </div></div>`;
  renderObStep();
}
function renderObStep(){
  const s=state.onboardingStep;
  let ind='';
  obSteps.forEach((st,i)=>{
    const cls=i<s?'done':i===s?'active':'';
    const lc=i<s?'done':'';
    ind+=`<div style="display:flex;flex-direction:column;align-items:center"><div class="step-circle ${cls}"><i class="bi ${st.icon}"></i></div><div class="step-label">${st.label}</div></div>`;
    if(i<obSteps.length-1) ind+=`<div class="step-line ${lc}"></div>`;
  });
  document.getElementById('ob-steps').innerHTML=ind;
  const forms=[
    `<div class="row g-3">
      <div class="col-md-6"><label class="form-label">First Name</label><input class="form-control form-control-sm" id="ob-fn" placeholder="John"/></div>
      <div class="col-md-6"><label class="form-label">Last Name</label><input class="form-control form-control-sm" id="ob-ln" placeholder="Doe"/></div>
      <div class="col-md-6"><label class="form-label">Email</label><input type="email" class="form-control form-control-sm" id="ob-email" placeholder="john@company.com"/></div>
      <div class="col-md-6"><label class="form-label">Phone</label><input class="form-control form-control-sm" id="ob-phone" placeholder="9876543210"/></div>
      <div class="col-md-6"><label class="form-label">Date of Birth</label><input type="date" class="form-control form-control-sm" id="ob-dob"/></div>
      <div class="col-md-6"><label class="form-label">Gender</label><select class="form-select form-select-sm" id="ob-gender"><option>Male</option><option>Female</option><option>Other</option></select></div>
    </div>`,
    `<div class="row g-3">
      <div class="col-md-6"><label class="form-label">Employee ID</label><input class="form-control form-control-sm" id="ob-eid" placeholder="EMP2024001"/></div>
      <div class="col-md-6"><label class="form-label">Department</label><input class="form-control form-control-sm" id="ob-dept" placeholder="Engineering"/></div>
      <div class="col-md-6"><label class="form-label">Designation</label><input class="form-control form-control-sm" id="ob-desg" placeholder="Software Engineer"/></div>
      <div class="col-md-6"><label class="form-label">Joining Date</label><input type="date" class="form-control form-control-sm" id="ob-jdate"/></div>
      <div class="col-md-6"><label class="form-label">Salary (₹)</label><input type="number" class="form-control form-control-sm" id="ob-sal" placeholder="60000"/></div>
      <div class="col-md-6"><label class="form-label">Company</label><input class="form-control form-control-sm" id="ob-company" placeholder="Acme Corp"/></div>
    </div>`,
    `<div class="row g-3">
      <div class="col-md-6"><label class="form-label">Aadhar Number</label><input class="form-control form-control-sm" id="ob-aadhar" placeholder="1234 5678 9012"/></div>
      <div class="col-md-6"><label class="form-label">PAN Number</label><input class="form-control form-control-sm" id="ob-pan" placeholder="ABCDE1234F"/></div>
      <div class="col-md-6"><label class="form-label">Bank Account</label><input class="form-control form-control-sm" id="ob-bank" placeholder="Account number"/></div>
      <div class="col-md-6"><label class="form-label">IFSC Code</label><input class="form-control form-control-sm" id="ob-ifsc" placeholder="SBIN0001234"/></div>
      <div class="col-12"><label class="form-label">Address</label><textarea class="form-control form-control-sm" id="ob-addr" rows="2" placeholder="123, Main St, City"></textarea></div>
    </div>`,
    `<div class="p-3" style="background:var(--surface2);border-radius:10px">
      <h6 style="color:var(--accent)"><i class="bi bi-check2-all me-2"></i>Review Details</h6>
      <div class="row g-2 small mt-2">
        <div class="col-6 text-muted">Name:</div><div class="col-6" id="rv-name">—</div>
        <div class="col-6 text-muted">Department:</div><div class="col-6" id="rv-dept">—</div>
        <div class="col-6 text-muted">Designation:</div><div class="col-6" id="rv-desg">—</div>
        <div class="col-6 text-muted">Joining Date:</div><div class="col-6" id="rv-jdate">—</div>
      </div>
    </div>`
  ];
  document.getElementById('ob-content').innerHTML=forms[s];
  if(s===3){
    document.getElementById('rv-name').textContent=`${document.getElementById('ob-fn')?.value||''} ${document.getElementById('ob-ln')?.value||''}`.trim()||'—';
    document.getElementById('rv-dept').textContent=document.getElementById('ob-dept')?.value||'—';
    document.getElementById('rv-desg').textContent=document.getElementById('ob-desg')?.value||'—';
    document.getElementById('rv-jdate').textContent=document.getElementById('ob-jdate')?.value||'—';
  }
  document.getElementById('ob-prev').style.display=s===0?'none':'';
  document.getElementById('ob-next').innerHTML=s===obSteps.length-1?'<i class="bi bi-check-lg me-1"></i>Submit':'Next<i class="bi bi-arrow-right ms-1"></i>';
}
async function obNav(dir){
  if(dir===1&&state.onboardingStep===obSteps.length-1){
    const m=document.getElementById('ob-msg');
    const payload={
      firstName:document.getElementById('ob-fn')?.value,lastName:document.getElementById('ob-ln')?.value,
      email:document.getElementById('ob-email')?.value,phone:document.getElementById('ob-phone')?.value,
      dateOfBirth:document.getElementById('ob-dob')?.value,gender:document.getElementById('ob-gender')?.value,
      employeeId:document.getElementById('ob-eid')?.value,department:document.getElementById('ob-dept')?.value,
      designation:document.getElementById('ob-desg')?.value,joiningDate:document.getElementById('ob-jdate')?.value,
      salary:parseFloat(document.getElementById('ob-sal')?.value)||0,company:document.getElementById('ob-company')?.value,
      password:'Welcome@123',role:'Employee'
    };
    try{
      await api('EmployeeOnboarding/register','POST',payload);
      m.innerHTML=alertBox('Onboarding completed!'); state.onboardingStep=0; renderObStep();
    }catch(err){m.innerHTML=alertBox('Error: '+err.message,'danger');}
    return;
  }
  state.onboardingStep=Math.max(0,Math.min(obSteps.length-1,state.onboardingStep+dir));
  renderObStep();
}

/* ══════════════════════════════════════════════════════════════
   7. ENQUIRY – GET /Enquiry/get-enquiries
                GET /Enquiry/get-categories
                POST /Enquiry/create-enquiry
══════════════════════════════════════════════════════════════ */
function renderEnquiry(c){
  c.innerHTML=`
  <div class="section-heading"><i class="bi bi-chat-dots me-2" style="color:var(--danger-custom)"></i>Customer Enquiry</div>
  <div class="section-sub">Submit support tickets and track status</div>
  <div class="row g-4">
    <div class="col-lg-5"><div class="card">
      <div class="card-header"><strong class="small"><i class="bi bi-plus-circle me-2"></i>New Enquiry</strong></div>
      <div class="card-body">
        <div id="enq-msg"></div>
        <form id="enq-form">
          <div class="mb-3"><label class="form-label">Customer Name</label>
            <input class="form-control form-control-sm" id="enq-name" required placeholder="Full Name"/></div>
          <div class="mb-3"><label class="form-label">Email</label>
            <input type="email" class="form-control form-control-sm" id="enq-email" required placeholder="email@example.com"/></div>
          <div class="mb-3"><label class="form-label">Phone</label>
            <input class="form-control form-control-sm" id="enq-phone" placeholder="9876543210"/></div>
          <div class="mb-3"><label class="form-label">Category ID</label>
            <select class="form-select form-select-sm" id="enq-cat"><option value="1">General (1)</option><option value="2">Technical (2)</option><option value="3">Billing (3)</option></select></div>
          <div class="mb-3"><label class="form-label">Message</label>
            <textarea class="form-control form-control-sm" id="enq-msg-txt" rows="4" required placeholder="Describe your issue…"></textarea></div>
          <button type="submit" class="btn btn-primary btn-sm w-100"><i class="bi bi-send me-1"></i>Submit Enquiry</button>
        </form>
      </div>
    </div></div>
    <div class="col-lg-7"><div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <strong class="small"><i class="bi bi-ticket-detailed me-2"></i>Enquiries</strong>
        <button class="btn btn-outline-primary btn-sm" onclick="loadEnquiries()"><i class="bi bi-arrow-clockwise"></i></button>
      </div>
      <div class="card-body p-0"><div class="table-responsive">
        <table class="table table-borderless mb-0">
          <thead><tr><th>#</th><th>Customer</th><th>Message</th><th>Status</th></tr></thead>
          <tbody id="enq-tbody"><tr><td colspan="4" class="text-center py-4">Loading…</td></tr></tbody>
        </table></div>
      </div>
    </div></div>
  </div>`;
  loadEnquiries();
  document.getElementById('enq-form').addEventListener('submit',async e=>{
    e.preventDefault(); const m=document.getElementById('enq-msg');
    m.innerHTML=`<div class="spinner-border spinner-border-sm" style="color:var(--accent)"></div>`;
    try{
      await api('Enquiry/create-enquiry','POST',{
        customerName:document.getElementById('enq-name').value,
        customerEmail:document.getElementById('enq-email').value,
        customerPhone:document.getElementById('enq-phone').value,
        categoryId:parseInt(document.getElementById('enq-cat').value)||1,
        message:document.getElementById('enq-msg-txt').value
      });
      m.innerHTML=alertBox('Enquiry submitted successfully!'); document.getElementById('enq-form').reset(); loadEnquiries();
    }catch(err){m.innerHTML=alertBox('Error: '+err.message,'danger');}
  });
}
async function loadEnquiries(){
  const tb=document.getElementById('enq-tbody'); if(!tb)return;
  tb.innerHTML=`<tr><td colspan="4" class="text-center">${spinner()}</td></tr>`;
  try{
    const d=await api('Enquiry/get-enquiries');
    const items=d.data||d||[];
    if(!items.length){tb.innerHTML=`<tr><td colspan="4" class="text-center text-muted py-3">No enquiries yet.</td></tr>`;return;}
    const statusColors={Open:'var(--warning-custom)','In Progress':'var(--accent)',Resolved:'var(--success-custom)',Closed:'var(--text-muted-custom)'};
    tb.innerHTML=items.map((r,i)=>{
      const st=r.statusName||r.status||'Open';
      const sc=statusColors[st]||'var(--warning-custom)';
      return `<tr>
        <td><span class="badge bg-secondary">#${1000+i}</span></td>
        <td><strong class="small">${r.customerName||'—'}</strong><br><small class="text-muted">${r.customerEmail||''}</small></td>
        <td class="small">${(r.message||'—').substring(0,60)}</td>
        <td><span class="badge" style="background:${sc}22;color:${sc}">${st}</span></td>
      </tr>`;
    }).join('');
  }catch(err){tb.innerHTML=`<tr><td colspan="4" class="text-danger text-center py-3">${err.message}</td></tr>`;}
}

/* ══════════════════════════════════════════════════════════════
   8. FEES TRACKING – GET /FeesTracking/getAllEnrollments
                      GET /FeesTracking/GetDashboardStats
                      POST /FeesTracking/addNewEnrollment
══════════════════════════════════════════════════════════════ */
function renderFeesTracking(c){
  c.innerHTML=`
  <div class="section-heading"><i class="bi bi-cash-coin me-2" style="color:var(--warning-custom)"></i>Fees Tracking</div>
  <div class="section-sub">Manage student enrollments and fee payments</div>
  <div class="row g-3 mb-4" id="fee-stats"><div class="col-12 text-center py-3">${spinner()}</div></div>
  <div class="row g-4">
    <div class="col-lg-7"><div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <strong class="small"><i class="bi bi-table me-2"></i>Enrollments</strong>
        <button class="btn btn-outline-primary btn-sm" onclick="loadFees()"><i class="bi bi-arrow-clockwise"></i></button>
      </div>
      <div class="card-body p-0"><div class="table-responsive">
        <table class="table table-borderless mb-0">
          <thead><tr><th>#</th><th>Student</th><th>Batch</th><th>Total</th><th>Received</th><th>Pending</th></tr></thead>
          <tbody id="fee-tbody"><tr><td colspan="6" class="text-center py-4">Loading…</td></tr></tbody>
        </table></div>
      </div>
    </div></div>
    <div class="col-lg-5"><div class="card">
      <div class="card-header"><strong class="small"><i class="bi bi-plus-circle me-2"></i>Add Enrollment</strong></div>
      <div class="card-body">
        <div id="fee-msg"></div>
        <form id="fee-form">
          <div class="mb-3"><label class="form-label">Student Name</label>
            <input class="form-control form-control-sm" id="f-sname" required placeholder="Alice Smith"/></div>
          <div class="mb-3"><label class="form-label">Email</label>
            <input type="email" class="form-control form-control-sm" id="f-email" placeholder="alice@email.com"/></div>
          <div class="mb-3"><label class="form-label">Phone</label>
            <input class="form-control form-control-sm" id="f-phone" placeholder="9876543210"/></div>
          <div class="mb-3"><label class="form-label">Batch ID</label>
            <input type="number" class="form-control form-control-sm" id="f-batch" value="1"/></div>
          <div class="mb-3"><label class="form-label">Total Fee (₹)</label>
            <input type="number" class="form-control form-control-sm" id="f-total" placeholder="25000" required/></div>
          <div class="mb-3"><label class="form-label">Amount Received (₹)</label>
            <input type="number" class="form-control form-control-sm" id="f-received" placeholder="10000"/></div>
          <button type="submit" class="btn btn-primary btn-sm w-100"><i class="bi bi-check-circle me-1"></i>Add Enrollment</button>
        </form>
      </div>
    </div></div>
  </div>`;
  loadFees();
  document.getElementById('fee-form').addEventListener('submit',async e=>{
    e.preventDefault(); const m=document.getElementById('fee-msg');
    m.innerHTML=`<div class="spinner-border spinner-border-sm" style="color:var(--accent)"></div>`;
    const total=parseFloat(document.getElementById('f-total').value)||0;
    const received=parseFloat(document.getElementById('f-received').value)||0;
    try{
      await api('FeesTracking/addNewEnrollment','POST',{
        studentName:document.getElementById('f-sname').value,
        email:document.getElementById('f-email').value,
        phone:document.getElementById('f-phone').value,
        batchId:parseInt(document.getElementById('f-batch').value)||1,
        totalAmount:total,amountReceived:received,pendingAmount:total-received
      });
      m.innerHTML=alertBox('Enrollment added!'); document.getElementById('fee-form').reset(); loadFees();
    }catch(err){m.innerHTML=alertBox('Error: '+err.message,'danger');}
  });
}
async function loadFees(){
  const tb=document.getElementById('fee-tbody'), sc=document.getElementById('fee-stats');
  if(!tb)return;
  tb.innerHTML=`<tr><td colspan="6" class="text-center">${spinner()}</td></tr>`;
  try{
    const [listRes,statsRes]=await Promise.allSettled([api('FeesTracking/getAllEnrollments'),api('FeesTracking/GetDashboardStats')]);
    const items=(listRes.status==='fulfilled'?listRes.value.data||listRes.value:[]) ||[];
    if(sc){
      if(statsRes.status==='fulfilled'){
        const s=statsRes.value.data||statsRes.value||{};
        sc.innerHTML=`
          <div class="col-sm-4"><div class="stat-card"><div class="stat-icon" style="background:#58a6ff22;color:var(--accent)"><i class="bi bi-people"></i></div><div class="stat-value">${s.totalEnrollments||items.length}</div><div class="stat-label">Total Enrollments</div></div></div>
          <div class="col-sm-4"><div class="stat-card"><div class="stat-icon" style="background:#3fb95022;color:var(--success-custom)"><i class="bi bi-check-circle"></i></div><div class="stat-value">₹${Number(s.totalReceived||0).toLocaleString()}</div><div class="stat-label">Total Received</div></div></div>
          <div class="col-sm-4"><div class="stat-card"><div class="stat-icon" style="background:#d2992222;color:var(--warning-custom)"><i class="bi bi-clock-history"></i></div><div class="stat-value">₹${Number(s.totalPending||0).toLocaleString()}</div><div class="stat-label">Pending</div></div></div>`;
      } else sc.innerHTML='';
    }
    if(!items.length){tb.innerHTML=`<tr><td colspan="6" class="text-center text-muted py-3">No enrollments.</td></tr>`;return;}
    tb.innerHTML=items.map((r,i)=>`<tr>
      <td><span class="badge bg-secondary">${i+1}</span></td>
      <td><strong class="small">${r.studentName||'—'}</strong><br><small class="text-muted">${r.email||''}</small></td>
      <td><span class="badge bg-secondary">${r.batchName||r.batchId||'—'}</span></td>
      <td class="small fw-bold">₹${Number(r.totalAmount||0).toLocaleString()}</td>
      <td class="small" style="color:var(--success-custom)">₹${Number(r.amountReceived||0).toLocaleString()}</td>
      <td class="small" style="color:var(--warning-custom)">₹${Number(r.pendingAmount||0).toLocaleString()}</td>
    </tr>`).join('');
  }catch(err){tb.innerHTML=`<tr><td colspan="6" class="text-danger text-center py-3">${err.message}</td></tr>`;}
}

/* ══════════════════════════════════════════════════════════════
   9. GOAL TRACKER – GET /GoalTracker/getAllGoalsByUser?userId=1
                     GET /GoalTracker/dashboard
                     POST /GoalTracker/createGoalWithMilestones
══════════════════════════════════════════════════════════════ */
function renderGoalTracker(c){
  c.innerHTML=`
  <div class="section-heading"><i class="bi bi-bullseye me-2" style="color:#bc8cff"></i>Goal Tracker</div>
  <div class="section-sub">Set goals and track your progress</div>
  <div class="row g-4">
    <div class="col-lg-5"><div class="card">
      <div class="card-header"><strong class="small"><i class="bi bi-plus-circle me-2"></i>Add New Goal</strong></div>
      <div class="card-body">
        <div id="goal-msg"></div>
        <form id="goal-form">
          <div class="mb-3"><label class="form-label">Goal Title</label>
            <input class="form-control form-control-sm" id="g-title" required placeholder="Read 12 books this year"/></div>
          <div class="mb-3"><label class="form-label">Description</label>
            <textarea class="form-control form-control-sm" id="g-desc" rows="2" placeholder="Brief description…"></textarea></div>
          <div class="mb-3"><label class="form-label">Category</label>
            <select class="form-select form-select-sm" id="g-cat">
              <option>Health</option><option>Learning</option><option>Work</option><option>Finance</option><option>Personal</option>
            </select></div>
          <div class="mb-3"><label class="form-label">Start Date</label>
            <input type="date" class="form-control form-control-sm" id="g-start"/></div>
          <div class="mb-3"><label class="form-label">Target Date</label>
            <input type="date" class="form-control form-control-sm" id="g-end"/></div>
          <div class="mb-3"><label class="form-label">Frequency</label>
            <select class="form-select form-select-sm" id="g-freq"><option>Daily</option><option>Weekly</option><option>Monthly</option></select></div>
          <button type="submit" class="btn btn-primary btn-sm w-100"><i class="bi bi-plus-lg me-1"></i>Add Goal</button>
        </form>
      </div>
    </div></div>
    <div class="col-lg-7"><div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <strong class="small"><i class="bi bi-bar-chart-steps me-2"></i>My Goals</strong>
        <button class="btn btn-outline-primary btn-sm" onclick="loadGoals()"><i class="bi bi-arrow-clockwise"></i></button>
      </div>
      <div class="card-body" id="goals-list"><div class="text-center py-4">${spinner()}</div></div>
    </div></div>
  </div>`;
  loadGoals();
  document.getElementById('goal-form').addEventListener('submit',async e=>{
    e.preventDefault(); const m=document.getElementById('goal-msg');
    m.innerHTML=`<div class="spinner-border spinner-border-sm" style="color:var(--accent)"></div>`;
    try{
      await api('GoalTracker/createGoalWithMilestones','POST',{
        userId:1,title:document.getElementById('g-title').value,
        description:document.getElementById('g-desc').value,
        category:document.getElementById('g-cat').value,
        startDate:document.getElementById('g-start').value,
        targetDate:document.getElementById('g-end').value,
        frequency:document.getElementById('g-freq').value,
        milestones:[]
      });
      m.innerHTML=alertBox('Goal created!'); document.getElementById('goal-form').reset(); loadGoals();
    }catch(err){m.innerHTML=alertBox('Error: '+err.message,'danger');}
  });
}
async function loadGoals(){
  const el=document.getElementById('goals-list'); if(!el)return;
  el.innerHTML=`<div class="text-center py-4">${spinner()}</div>`;
  try{
    const d=await api('GoalTracker/getAllGoalsByUser?userId=1');
    const goals=d.data||d||[];
    if(!goals.length){el.innerHTML=`<p class="text-muted text-center py-3">No goals yet. Add one!</p>`;return;}
    const colors={Health:'#3fb950',Learning:'#58a6ff',Work:'#bc8cff',Finance:'#d29922',Personal:'#f85149'};
    el.innerHTML=goals.map(g=>{
      const cat=g.category||'Personal';
      const color=colors[cat]||'var(--accent)';
      const pct=g.progressPercentage||g.progress||Math.min(100,Math.round(Math.random()*80+10));
      const daysLeft=g.targetDate?Math.ceil((new Date(g.targetDate)-new Date())/(1000*60*60*24)):null;
      return `<div class="mb-4">
        <div class="d-flex justify-content-between align-items-start mb-1">
          <div><div class="small fw-bold">${g.title||g.goalTitle||'Goal'}</div>
            <span class="badge" style="background:${color}22;color:${color};font-size:.65rem">${cat}</span></div>
          <div class="text-end"><div class="fw-bold" style="color:${color}">${pct}%</div>
            ${daysLeft!==null?`<small class="text-muted">${daysLeft>0?daysLeft+' days left':'Overdue'}</small>`:''}
          </div>
        </div>
        <div class="progress" style="height:10px"><div class="progress-bar" style="width:${pct}%;background:${color};border-radius:20px"></div></div>
        <small class="text-muted">${g.frequency||'Daily'} goal</small>
      </div>`;
    }).join('');
  }catch(err){el.innerHTML=`<div class="alert alert-danger small">${err.message}</div>`;}
}

/* ══════════════════════════════════════════════════════════════
   10. LEAVE TRACKER – GET /LeaveTracker/getAllEmployee
                       GET /LeaveTracker/GetAllBalances
                       POST /LeaveTracker/request
══════════════════════════════════════════════════════════════ */
function renderLeaveTracker(c){
  c.innerHTML=`
  <div class="section-heading"><i class="bi bi-calendar-x me-2" style="color:var(--accent)"></i>Leave Tracker</div>
  <div class="section-sub">Apply for leave and check balances</div>
  <div class="row g-3 mb-4" id="leave-balance"></div>
  <div class="row g-4">
    <div class="col-lg-4"><div class="card">
      <div class="card-header"><strong class="small"><i class="bi bi-plus-circle me-2"></i>Apply for Leave</strong></div>
      <div class="card-body">
        <div id="leave-msg"></div>
        <form id="leave-form">
          <div class="mb-3"><label class="form-label">Employee ID</label>
            <input type="number" class="form-control form-control-sm" id="lv-eid" value="1"/></div>
          <div class="mb-3"><label class="form-label">Leave Type</label>
            <select class="form-select form-select-sm" id="lv-type">
              <option value="1">Sick Leave</option><option value="2">Casual Leave</option>
              <option value="3">Earned Leave</option><option value="4">Emergency Leave</option>
            </select></div>
          <div class="mb-3"><label class="form-label">From Date</label>
            <input type="date" class="form-control form-control-sm" id="lv-from" required/></div>
          <div class="mb-3"><label class="form-label">To Date</label>
            <input type="date" class="form-control form-control-sm" id="lv-to" required/></div>
          <div class="mb-3"><label class="form-label">Reason</label>
            <textarea class="form-control form-control-sm" id="lv-reason" rows="3" placeholder="Reason for leave…"></textarea></div>
          <button type="submit" class="btn btn-primary btn-sm w-100"><i class="bi bi-send me-1"></i>Submit Request</button>
        </form>
      </div>
    </div></div>
    <div class="col-lg-8"><div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <strong class="small"><i class="bi bi-list-check me-2"></i>Leave Requests</strong>
        <button class="btn btn-outline-primary btn-sm" onclick="loadLeaves()"><i class="bi bi-arrow-clockwise"></i></button>
      </div>
      <div class="card-body p-0"><div class="table-responsive">
        <table class="table table-borderless mb-0">
          <thead><tr><th>#</th><th>Employee</th><th>Type</th><th>From</th><th>To</th><th>Status</th></tr></thead>
          <tbody id="leave-tbody"><tr><td colspan="6" class="text-center py-4">Loading…</td></tr></tbody>
        </table></div>
      </div>
    </div></div>
  </div>`;
  loadLeaves();
  document.getElementById('leave-form').addEventListener('submit',async e=>{
    e.preventDefault(); const m=document.getElementById('leave-msg');
    m.innerHTML=`<div class="spinner-border spinner-border-sm" style="color:var(--accent)"></div>`;
    try{
      await api('LeaveTracker/request','POST',{
        employeeId:parseInt(document.getElementById('lv-eid').value)||1,
        leaveTypeId:parseInt(document.getElementById('lv-type').value)||1,
        fromDate:document.getElementById('lv-from').value,
        toDate:document.getElementById('lv-to').value,
        reason:document.getElementById('lv-reason').value
      });
      m.innerHTML=alertBox('Leave request submitted!'); document.getElementById('leave-form').reset(); loadLeaves();
    }catch(err){m.innerHTML=alertBox('Error: '+err.message,'danger');}
  });
}
async function loadLeaves(){
  const tb=document.getElementById('leave-tbody'),bc=document.getElementById('leave-balance');
  if(!tb)return;
  tb.innerHTML=`<tr><td colspan="6" class="text-center">${spinner()}</td></tr>`;
  try{
    const [balRes,empRes]=await Promise.allSettled([api('LeaveTracker/GetAllBalances'),api('LeaveTracker/getAllEmployee')]);
    if(bc&&balRes.status==='fulfilled'){
      const bals=balRes.value.data||balRes.value||[];
      bc.innerHTML=bals.slice(0,3).map(b=>`
        <div class="col-sm-4"><div class="stat-card">
          <div class="stat-icon" style="background:var(--accent-glow);color:var(--accent)"><i class="bi bi-calendar-check"></i></div>
          <div class="stat-value">${b.balance||b.availableBalance||0}</div>
          <div class="stat-label">${b.leaveTypeName||b.leaveType||'Leave'} Available</div>
        </div></div>`).join('')||'';
    }
    const d=await api('LeaveTracker/GetLeaveRequestsbyEmpId?empId=1').catch(()=>api('LeaveTracker/getAllEmployee'));
    const items=d.data||d||[];
    if(!items.length){tb.innerHTML=`<tr><td colspan="6" class="text-center text-muted py-3">No requests found.</td></tr>`;return;}
    tb.innerHTML=items.map((r,i)=>{
      const st=r.status||r.leaveStatus||'Pending';
      const sc=st==='Approved'?'var(--success-custom)':st==='Rejected'?'var(--danger-custom)':'var(--warning-custom)';
      return `<tr>
        <td><span class="badge bg-secondary">${i+1}</span></td>
        <td class="small fw-bold">${r.employeeName||r.name||'—'}</td>
        <td><span class="badge" style="background:var(--accent-glow);color:var(--accent)">${r.leaveTypeName||r.leaveType||'—'}</span></td>
        <td class="small">${r.fromDate||r.from_date||'—'}</td>
        <td class="small">${r.toDate||r.to_date||'—'}</td>
        <td><span class="badge" style="background:${sc}22;color:${sc}">${st}</span></td>
      </tr>`;
    }).join('');
  }catch(err){tb.innerHTML=`<tr><td colspan="6" class="text-danger text-center py-3">${err.message}</td></tr>`;}
}

/* ══════════════════════════════════════════════════════════════
   11. PROJECT COMPETITION – GET /ProjectCompetition/GetAllCompetition
                              GET /ProjectCompetition/project
                              POST /ProjectCompetition/project
══════════════════════════════════════════════════════════════ */
function renderProjectCompetition(c){
  c.innerHTML=`
  <div class="section-heading"><i class="bi bi-trophy me-2" style="color:var(--warning-custom)"></i>Project Competition</div>
  <div class="section-sub">Submit projects to active competitions</div>
  <div class="row g-4">
    <div class="col-lg-4"><div class="card">
      <div class="card-header"><strong class="small"><i class="bi bi-send me-2"></i>Submit Project</strong></div>
      <div class="card-body">
        <div id="pc-msg"></div>
        <form id="pc-form">
          <div class="mb-3"><label class="form-label">Project Title</label>
            <input class="form-control form-control-sm" id="pc-title" required placeholder="AI Smart City"/></div>
          <div class="mb-3"><label class="form-label">Description</label>
            <textarea class="form-control form-control-sm" id="pc-desc" rows="3" placeholder="Project description…" maxlength="500"></textarea></div>
          <div class="mb-3"><label class="form-label">GitHub Link</label>
            <input class="form-control form-control-sm" id="pc-github" placeholder="https://github.com/…"/></div>
          <div class="mb-3"><label class="form-label">Competition ID</label>
            <input type="number" class="form-control form-control-sm" id="pc-cid" value="1"/></div>
          <div class="mb-3"><label class="form-label">User ID</label>
            <input type="number" class="form-control form-control-sm" id="pc-uid" value="1"/></div>
          <button type="submit" class="btn btn-primary btn-sm w-100"><i class="bi bi-trophy me-1"></i>Submit Project</button>
        </form>
      </div>
    </div></div>
    <div class="col-lg-8"><div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <strong class="small"><i class="bi bi-list-stars me-2"></i>Submissions</strong>
        <button class="btn btn-outline-primary btn-sm" onclick="loadCompetition()"><i class="bi bi-arrow-clockwise"></i></button>
      </div>
      <div class="card-body p-0"><div class="table-responsive">
        <table class="table table-borderless mb-0">
          <thead><tr><th>Rank</th><th>Project Title</th><th>Description</th><th>GitHub</th><th>Status</th></tr></thead>
          <tbody id="pc-tbody"><tr><td colspan="5" class="text-center py-4">Loading…</td></tr></tbody>
        </table></div>
      </div>
    </div></div>
  </div>`;
  loadCompetition();
  document.getElementById('pc-form').addEventListener('submit',async e=>{
    e.preventDefault(); const m=document.getElementById('pc-msg');
    m.innerHTML=`<div class="spinner-border spinner-border-sm" style="color:var(--accent)"></div>`;
    try{
      await api('ProjectCompetition/project','POST',{
        projectTitle:document.getElementById('pc-title').value,
        description:document.getElementById('pc-desc').value,
        githubLink:document.getElementById('pc-github').value,
        competitionId:parseInt(document.getElementById('pc-cid').value)||1,
        userId:parseInt(document.getElementById('pc-uid').value)||1
      });
      m.innerHTML=alertBox('Project submitted to competition!'); document.getElementById('pc-form').reset(); loadCompetition();
    }catch(err){m.innerHTML=alertBox('Error: '+err.message,'danger');}
  });
}
async function loadCompetition(){
  const tb=document.getElementById('pc-tbody'); if(!tb)return;
  tb.innerHTML=`<tr><td colspan="5" class="text-center">${spinner()}</td></tr>`;
  try{
    const d=await api('ProjectCompetition/project');
    const items=d.data||d||[];
    if(!items.length){tb.innerHTML=`<tr><td colspan="5" class="text-center text-muted py-3">No submissions yet.</td></tr>`;return;}
    const medals=['🥇','🥈','🥉'];
    tb.innerHTML=items.map((r,i)=>{
      const st=r.status||'Pending';
      const sc=st==='Approved'?'var(--success-custom)':st==='Rejected'?'var(--danger-custom)':'var(--warning-custom)';
      return `<tr>
        <td class="text-center">${r.rank?`<span class="badge bg-secondary">${r.rank}</span>`:i<3?medals[i]:`<span class="badge bg-secondary">${i+1}</span>`}</td>
        <td class="fw-bold small">${r.projectTitle||'—'}</td>
        <td class="small text-muted">${(r.description||'—').substring(0,50)}</td>
        <td class="small">${r.githubLink?`<a href="${r.githubLink}" target="_blank" style="color:var(--accent)">GitHub</a>`:'—'}</td>
        <td><span class="badge" style="background:${sc}22;color:${sc}">${st}</span></td>
      </tr>`;
    }).join('');
  }catch(err){tb.innerHTML=`<tr><td colspan="5" class="text-danger text-center py-3">${err.message}</td></tr>`;}
}

/* ══════════════════════════════════════════════════════════════
   12. SMART PARKING – GET /SmartParking/GetAllParking
                       GET /SmartParking/GetAllClients
                       POST /SmartParking/AddParking
══════════════════════════════════════════════════════════════ */
let parkingSlots=[];
function renderSmartParking(c){
  c.innerHTML=`
  <div class="section-heading"><i class="bi bi-p-circle me-2" style="color:var(--success-custom)"></i>Smart Parking</div>
  <div class="section-sub">Live parking availability — click a slot to toggle</div>
  <div class="row g-3 mb-4" id="park-stats"></div>
  <div class="d-flex justify-content-between align-items-center mb-3">
    <div class="d-flex gap-3">
      <div class="d-flex align-items-center gap-2"><div style="width:12px;height:12px;border-radius:3px;background:var(--success-custom)"></div><small>Vacant</small></div>
      <div class="d-flex align-items-center gap-2"><div style="width:12px;height:12px;border-radius:3px;background:var(--danger-custom)"></div><small>Occupied</small></div>
    </div>
    <button class="btn btn-outline-primary btn-sm" onclick="loadParkingSlots()"><i class="bi bi-arrow-clockwise me-1"></i>Refresh</button>
  </div>
  <div id="parking-grid" class="row g-2" style="max-width:900px"></div>
  <div id="parking-msg" class="mt-3"></div>`;
  loadParkingSlots();
}
async function loadParkingSlots(){
  const g=document.getElementById('parking-grid'),s=document.getElementById('park-stats');
  if(!g)return; g.innerHTML=`<div class="col-12">${spinner()}</div>`;
  try{
    const d=await api('SmartParking/GetAllParking');
    parkingSlots=d.data||d||[];
    if(!parkingSlots.length){
      // Generate demo data if API returns empty
      parkingSlots=Array.from({length:30},(_,i)=>({
        parkingId:i+1,slotNo:`A${String(i+1).padStart(2,'0')}`,
        isOccupied:Math.random()>0.5,clientId:1,siteId:1,buildingId:1,floorId:1
      }));
    }
    const vacant=parkingSlots.filter(p=>!p.isOccupied&&(p.status||'').toLowerCase()!=='occupied').length;
    const occupied=parkingSlots.length-vacant;
    if(s) s.innerHTML=`
      <div class="col-sm-4"><div class="stat-card"><div class="stat-icon" style="background:#3fb95022;color:var(--success-custom)"><i class="bi bi-p-circle"></i></div><div class="stat-value" style="color:var(--success-custom)">${vacant}</div><div class="stat-label">Vacant</div></div></div>
      <div class="col-sm-4"><div class="stat-card"><div class="stat-icon" style="background:#f8514922;color:var(--danger-custom)"><i class="bi bi-car-front"></i></div><div class="stat-value" style="color:var(--danger-custom)">${occupied}</div><div class="stat-label">Occupied</div></div></div>
      <div class="col-sm-4"><div class="stat-card"><div class="stat-icon" style="background:#58a6ff22;color:var(--accent)"><i class="bi bi-pie-chart"></i></div><div class="stat-value">${Math.round((occupied/parkingSlots.length)*100)}%</div><div class="stat-label">Occupancy Rate</div></div></div>`;
    renderParkingGrid();
  }catch(err){g.innerHTML=`<div class="col-12"><div class="alert alert-danger">${err.message}</div></div>`;}
}
function renderParkingGrid(){
  const g=document.getElementById('parking-grid'); if(!g)return;
  g.innerHTML='';
  parkingSlots.forEach(slot=>{
    const occupied=slot.isOccupied||(slot.status||'').toLowerCase()==='occupied';
    const col=document.createElement('div'); col.className='col-2'; col.style.minWidth='70px';
    col.innerHTML=`<div class="parking-slot ${occupied?'occupied':'vacant'}" onclick="toggleSlot(${slot.parkingId||slot.id||slot._id},${occupied})" title="${occupied?'Occupied':'Vacant'} — Click to toggle">
      <i class="bi ${occupied?'bi-car-front':'bi-p-circle'}" style="font-size:1.1rem"></i>
      <span style="font-size:.6rem;margin-top:.25rem">${slot.slotNo||slot.slotNumber||slot.parkingId||''}</span>
    </div>`;
    g.appendChild(col);
  });
}
async function toggleSlot(id,isOccupied){
  const m=document.getElementById('parking-msg');
  const newOccupied=!isOccupied;
  const idx=parkingSlots.findIndex(s=>s.parkingId===id||s.id===id||s._id===id);
  if(idx>=0){parkingSlots[idx].isOccupied=newOccupied; renderParkingGrid();}
  try{
    await api('SmartParking/AddParking','POST',{parkingId:id,isOccupied:newOccupied,clientId:1,siteId:1,buildingId:1,floorId:1});
    if(m) m.innerHTML=alertBox(`Slot marked as ${newOccupied?'Occupied':'Vacant'}.`);
  }catch(err){
    if(idx>=0){parkingSlots[idx].isOccupied=isOccupied; renderParkingGrid();}
    if(m) m.innerHTML=alertBox('Update failed: '+err.message,'danger');
  }
}

/* ══════════════════════════════════════════════════════════════
   13. SURVEY – GET /Survey/GetAllSurveys
                GET /Survey/GetSurveyQuestionsWithOptions/{id}
                POST /Survey/SubmitSurvey
══════════════════════════════════════════════════════════════ */
let surveyList=[], activeSurvey=null, surveyAnswers={};
function renderSurvey(c){
  state.surveyPage=0; surveyAnswers={};
  c.innerHTML=`
  <div class="section-heading"><i class="bi bi-card-checklist me-2" style="color:#bc8cff"></i>Survey</div>
  <div class="section-sub">Participate in active surveys</div>
  <div id="survey-msg"></div>
  <div id="survey-area"></div>`;
  loadSurveyList();
}
async function loadSurveyList(){
  const a=document.getElementById('survey-area'); if(!a)return;
  a.innerHTML=spinner();
  try{
    const d=await api('Survey/GetAllSurveys');
    surveyList=d.data||d||[];
    if(!surveyList.length){a.innerHTML=`<p class="text-muted">No surveys available.</p>`;return;}
    a.innerHTML=`<div class="row g-3">` + surveyList.map(s=>`
      <div class="col-md-4"><div class="card h-100">
        <div class="card-body d-flex flex-column">
          <h6 class="mb-2">${s.title||s.surveyTitle||'Survey'}</h6>
          <p class="text-muted small flex-grow-1">${(s.description||'Take this survey and share your feedback.').substring(0,100)}</p>
          <button class="btn btn-primary btn-sm mt-auto" onclick="startSurvey(${s.surveyId||s.id})">
            <i class="bi bi-play-fill me-1"></i>Take Survey</button>
        </div>
      </div></div>`).join('') + `</div>`;
  }catch(err){a.innerHTML=`<div class="alert alert-danger">${err.message}</div>`;}
}
async function startSurvey(surveyId){
  const a=document.getElementById('survey-area'); if(!a)return;
  a.innerHTML=spinner();
  try{
    const d=await api(`Survey/GetSurveyQuestionsWithOptions/${surveyId}`);
    activeSurvey={surveyId,questions:d.data||d||[]};
    state.surveyPage=0; surveyAnswers={};
    renderSurveyQ();
  }catch(err){a.innerHTML=`<div class="alert alert-danger">${err.message}</div>`;}
}
function renderSurveyQ(){
  const a=document.getElementById('survey-area'); if(!a||!activeSurvey)return;
  const qs=activeSurvey.questions; const s=state.surveyPage; const total=qs.length;
  if(!qs.length){a.innerHTML=`<p class="text-muted">No questions in this survey.</p>`;return;}
  const q=qs[s]; const pct=Math.round(((s+1)/total)*100);
  const saved=surveyAnswers[q.questionId||q.id];
  const opts=q.options||q.surveyOptions||[];
  a.innerHTML=`
  <div class="card" style="max-width:640px;margin:auto">
    <div class="card-header d-flex justify-content-between align-items-center">
      <strong class="small">Q ${s+1} of ${total}</strong>
      <span class="badge" style="background:#bc8cff22;color:#bc8cff">${pct}%</span>
    </div>
    <div class="card-body">
      <div class="progress mb-4" style="height:6px"><div class="progress-bar" style="width:${pct}%;background:#bc8cff;border-radius:20px"></div></div>
      <p class="fw-semibold mb-3">${q.questionText||q.question||'Question'}</p>
      ${opts.length?`<div class="d-flex flex-column gap-2">
        ${opts.map(o=>`<div class="survey-option ${saved===o.optionId?'selected':''}" onclick="selectSurveyOpt(${q.questionId||q.id},${o.optionId||o.id},this)">
          <div class="d-flex align-items-center gap-2">
            <div style="width:18px;height:18px;border-radius:50%;border:2px solid ${saved===o.optionId?'var(--accent)':'var(--sidebar-border)'};display:flex;align-items:center;justify-content:center;flex-shrink:0">
              ${saved===o.optionId?'<div style="width:8px;height:8px;border-radius:50%;background:var(--accent)"></div>':''}
            </div>${o.optionText||o.text||o.option}
          </div>
        </div>`).join('')}
      </div>`:
      `<textarea class="form-control form-control-sm" id="sq-text" rows="3" placeholder="Your answer…">${saved||''}</textarea>`}
      <div class="d-flex justify-content-between mt-4">
        <button class="btn btn-outline-secondary btn-sm" ${s===0?'style="display:none"':''} onclick="surveyNav(-1)"><i class="bi bi-arrow-left me-1"></i>Previous</button>
        <button class="btn btn-primary btn-sm" onclick="surveyNav(1)">${s===total-1?'<i class="bi bi-send me-1"></i>Submit':'Next<i class="bi bi-arrow-right ms-1"></i>'}</button>
      </div>
    </div>
  </div>`;
}
function selectSurveyOpt(qId,optId,el){
  surveyAnswers[qId]=optId;
  document.querySelectorAll('.survey-option').forEach(o=>o.classList.remove('selected'));
  el.classList.add('selected');
}
async function surveyNav(dir){
  if(!activeSurvey)return;
  const q=activeSurvey.questions[state.surveyPage];
  const txt=document.getElementById('sq-text');
  if(txt) surveyAnswers[q.questionId||q.id]=txt.value;
  if(dir===1&&state.surveyPage===activeSurvey.questions.length-1){
    const m=document.getElementById('survey-msg');
    try{
      await api('Survey/SubmitSurvey','POST',{
        surveyId:activeSurvey.surveyId,userId:1,
        answers:Object.entries(surveyAnswers).map(([qid,optid])=>({questionId:parseInt(qid),selectedOptionIds:[optid]}))
      });
      m.innerHTML=alertBox('Thank you! Survey submitted. 🎉');
      activeSurvey=null; surveyAnswers={}; state.surveyPage=0; loadSurveyList();
    }catch(err){m.innerHTML=alertBox('Submission failed: '+err.message,'danger');}
    return;
  }
  state.surveyPage=Math.max(0,Math.min(activeSurvey.questions.length-1,state.surveyPage+dir));
  renderSurveyQ();
}

/* ══════════════════════════════════════════════════════════════
   14. USER APP – GET /UserApp/GetAllUsers
                  POST /UserApp/CreateNewUser
══════════════════════════════════════════════════════════════ */
function renderUserApp(c){
  c.innerHTML=`
  <div class="section-heading"><i class="bi bi-person-gear me-2" style="color:var(--accent)"></i>User Management</div>
  <div class="section-sub">Create and manage user accounts</div>
  <div class="row g-4">
    <div class="col-lg-4">
      <div class="card mb-4"><div class="card-body text-center">
        <div style="width:80px;height:80px;border-radius:50%;background:var(--accent-glow);border:3px solid var(--accent);display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;font-size:2rem;color:var(--accent)"><i class="bi bi-person-fill"></i></div>
        <h6 id="ua-dname" class="mb-1">User Profile</h6>
        <small class="text-muted" id="ua-demail">user@example.com</small>
        <div class="mt-2"><span class="badge" style="background:var(--accent-glow);color:var(--accent)">Active</span></div>
      </div></div>
      <div class="card"><div class="card-header"><strong class="small"><i class="bi bi-person-plus me-2"></i>Create User</strong></div>
        <div class="card-body">
          <div id="ua-msg"></div>
          <form id="ua-form">
            <div class="mb-3"><label class="form-label">First Name</label>
              <input class="form-control form-control-sm" id="ua-fn" required placeholder="John"/></div>
            <div class="mb-3"><label class="form-label">Last Name</label>
              <input class="form-control form-control-sm" id="ua-ln" placeholder="Doe"/></div>
            <div class="mb-3"><label class="form-label">Email</label>
              <input type="email" class="form-control form-control-sm" id="ua-email" required placeholder="john@example.com"/></div>
            <div class="mb-3"><label class="form-label">Username</label>
              <input class="form-control form-control-sm" id="ua-uname" required placeholder="johndoe"/></div>
            <div class="mb-3"><label class="form-label">Password</label>
              <input type="password" class="form-control form-control-sm" id="ua-pwd" required placeholder="Min 6 chars"/></div>
            <div class="mb-3"><label class="form-label">Phone</label>
              <input class="form-control form-control-sm" id="ua-phone" placeholder="9876543210"/></div>
            <button type="submit" class="btn btn-primary btn-sm w-100"><i class="bi bi-person-plus me-1"></i>Create User</button>
          </form>
        </div>
      </div>
    </div>
    <div class="col-lg-8"><div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <strong class="small"><i class="bi bi-people me-2"></i>All Users</strong>
        <button class="btn btn-outline-primary btn-sm" onclick="loadUsers()"><i class="bi bi-arrow-clockwise"></i></button>
      </div>
      <div class="card-body p-0"><div class="table-responsive">
        <table class="table table-borderless mb-0">
          <thead><tr><th>#</th><th>User</th><th>Username</th><th>Phone</th><th>Status</th></tr></thead>
          <tbody id="ua-tbody"><tr><td colspan="5" class="text-center py-4">Loading…</td></tr></tbody>
        </table></div>
      </div>
    </div></div>
  </div>`;
  loadUsers();
  document.getElementById('ua-form').addEventListener('submit',async e=>{
    e.preventDefault(); const m=document.getElementById('ua-msg');
    m.innerHTML=`<div class="spinner-border spinner-border-sm" style="color:var(--accent)"></div>`;
    const fn=document.getElementById('ua-fn').value, ln=document.getElementById('ua-ln').value;
    try{
      await api('UserApp/CreateNewUser','POST',{
        firstName:fn,lastName:ln,
        email:document.getElementById('ua-email').value,
        userName:document.getElementById('ua-uname').value,
        password:document.getElementById('ua-pwd').value,
        phone:document.getElementById('ua-phone').value
      });
      m.innerHTML=alertBox('User created successfully!');
      document.getElementById('ua-dname').textContent=`${fn} ${ln}`.trim();
      document.getElementById('ua-demail').textContent=document.getElementById('ua-email').value;
      document.getElementById('ua-form').reset(); loadUsers();
    }catch(err){m.innerHTML=alertBox('Error: '+err.message,'danger');}
  });
}
async function loadUsers(){
  const tb=document.getElementById('ua-tbody'); if(!tb)return;
  tb.innerHTML=`<tr><td colspan="5" class="text-center">${spinner()}</td></tr>`;
  try{
    const d=await api('UserApp/GetAllUsers');
    const users=d.data||d||[];
    if(!users.length){tb.innerHTML=`<tr><td colspan="5" class="text-center text-muted py-3">No users found.</td></tr>`;return;}
    tb.innerHTML=users.map((u,i)=>{
      const name=`${u.firstName||u.first_name||''}  ${u.lastName||u.last_name||''}`.trim()||u.userName||'User';
      const st=u.isActive===false?'Inactive':'Active';
      const sc=st==='Active'?'var(--success-custom)':'var(--text-muted-custom)';
      return `<tr>
        <td><div style="width:30px;height:30px;border-radius:50%;background:var(--accent-glow);display:flex;align-items:center;justify-content:center;color:var(--accent);font-weight:700;font-size:.7rem">${name.charAt(0).toUpperCase()}</div></td>
        <td><strong class="small">${name}</strong><br><small class="text-muted">${u.email||''}</small></td>
        <td class="small text-muted">@${u.userName||u.username||'—'}</td>
        <td class="small text-muted">${u.phone||u.contactNo||'—'}</td>
        <td><span class="badge" style="background:${sc}22;color:${sc}">${st}</span></td>
      </tr>`;
    }).join('');
  }catch(err){tb.innerHTML=`<tr><td colspan="5" class="text-danger text-center py-3">${err.message}</td></tr>`;}
}

/* ══════════════════════════════════════════════════════════════
   BOOT
══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded',()=>switchApp('home'));

/* ══════ FIELD-NAME PATCHES (applied after load) ══════════════
   Overrides specific render helpers with correct API field names
   confirmed from live responses.
══════════════════════════════════════════════════════════════ */

// Patch EmployeeApp – real fields: employeeId,fullName,email,phone,gender,departmentName,designationName
const _origRenderEmpTable = renderEmployeeTable;
renderEmployeeTable = function(list) {
  const tb = document.getElementById('emp-tbody'); if (!tb) return;
  if (!list.length) { tb.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-3">No employees found.</td></tr>`; return; }
  tb.innerHTML = list.map((e, i) => {
    const name = e.fullName || e.name || '—';
    const st   = e.employeeType || 'Active';
    const sc   = st === 'Permanent' ? 'var(--success-custom)' : st === 'Contract' ? 'var(--accent)' : 'var(--warning-custom)';
    return `<tr>
      <td><div style="width:32px;height:32px;border-radius:50%;background:var(--accent-glow);display:flex;align-items:center;justify-content:center;color:var(--accent);font-weight:700;font-size:.75rem;flex-shrink:0">${name.charAt(0).toUpperCase()}</div></td>
      <td><strong class="small">${name}</strong><br><small class="text-muted">${e.email || ''}</small></td>
      <td><span class="badge bg-secondary bg-opacity-25 text-secondary">${e.departmentName || '—'}</span></td>
      <td class="small">${e.designationName || '—'}</td>
      <td class="small text-muted">${e.phone || '—'}</td>
      <td><span class="badge" style="background:${sc}22;color:${sc}">${st}</span></td>
    </tr>`;
  }).join('');
};

// Patch SmartParking – real fields: parkId,parkSpotNo,floorNo,buildingName,siteName,inTime,outTime,vehicleNo
const _origRenderParkGrid = renderParkingGrid;
renderParkingGrid = function() {
  const g = document.getElementById('parking-grid'); if (!g) return;
  g.innerHTML = '';
  parkingSlots.forEach(slot => {
    const occupied = slot.outTime ? new Date(slot.outTime) > new Date() : !!slot.vehicleNo;
    const label = slot.parkSpotNo ? `P${slot.parkSpotNo}` : (slot.slotNo || slot.parkingId || '?');
    const col = document.createElement('div'); col.className = 'col-2'; col.style.minWidth = '70px';
    col.innerHTML = `<div class="parking-slot ${occupied ? 'occupied' : 'vacant'}"
      onclick="toggleSlot(${JSON.stringify(slot.parkId||0)},${occupied})"
      title="${occupied ? 'Occupied' : 'Vacant'} — ${slot.vehicleNo || ''}">
      <i class="bi ${occupied ? 'bi-car-front' : 'bi-p-circle'}" style="font-size:1.1rem"></i>
      <span style="font-size:.6rem;margin-top:.25rem">${label}</span>
    </div>`;
    g.appendChild(col);
  });
};

// Patch BankLoan table – real fields: fullName,email,applicationStatus,panCard,annualIncome,creditScore,customerPhone
const _origLoadLoanList = loadLoanList;
loadLoanList = async function() {
  const tb = document.getElementById('loan-tbody'); if (!tb) return;
  tb.innerHTML = `<tr><td colspan="6" class="text-center">${spinner()}</td></tr>`;
  try {
    const d = await api('BankLoan/GetAllApplications');
    const items = d.data || d || [];
    if (!items.length) { tb.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-3">No applications yet.</td></tr>`; return; }
    tb.innerHTML = items.map((r, i) => {
      const st = r.applicationStatus || 'Pending';
      const sc = st === 'Approve' || st === 'Approved' ? 'var(--success-custom)' : st === 'Reject' || st === 'Rejected' ? 'var(--danger-custom)' : 'var(--warning-custom)';
      return `<tr>
        <td><span class="badge bg-secondary">${i + 1}</span></td>
        <td><strong class="small">${r.fullName || '—'}</strong><br><small class="text-muted">${r.email || ''}</small></td>
        <td class="small text-muted">${r.panCard || '—'}</td>
        <td class="small">${r.customerPhone || '—'}</td>
        <td><span class="badge bg-secondary">${r.employmentStatus || '—'}</span></td>
        <td><span class="badge" style="background:${sc}22;color:${sc}">${st}</span></td>
      </tr>`;
    }).join('');
  } catch (err) { tb.innerHTML = `<tr><td colspan="6" class="text-danger text-center py-3">${err.message}</td></tr>`; }
};

// Patch BusBooking – real fields confirmed: scheduleId,busName,busVehicleNo,fromLocationName,toLocationName,price,availableSeats
// (already correct in main code, no patch needed)

// Patch Survey – real response: {success,message,data:[{surveyId,userId,surveyTitle,surveyDescription,isActive}]}
const _origLoadSurveyList = loadSurveyList;
loadSurveyList = async function() {
  const a = document.getElementById('survey-area'); if (!a) return;
  a.innerHTML = spinner();
  try {
    const d = await api('Survey/GetAllSurveys');
    surveyList = d.data || d || [];
    if (!surveyList.length) { a.innerHTML = `<p class="text-muted">No surveys available.</p>`; return; }
    a.innerHTML = `<div class="row g-3">` + surveyList.map(s => `
      <div class="col-md-4"><div class="card h-100"><div class="card-body d-flex flex-column">
        <h6 class="mb-2">${s.surveyTitle || s.title || 'Survey'}</h6>
        <p class="text-muted small flex-grow-1">${(s.surveyDescription || s.description || 'Take this survey.').substring(0, 100)}</p>
        <div class="d-flex align-items-center gap-2 mb-3">
          <span class="badge" style="background:${s.isActive?'var(--success-custom)':'var(--text-muted-custom)'}22;color:${s.isActive?'var(--success-custom)':'var(--text-muted-custom)'}">${s.isActive?'Active':'Closed'}</span>
        </div>
        <button class="btn btn-primary btn-sm mt-auto" onclick="startSurvey(${s.surveyId || s.id})">
          <i class="bi bi-play-fill me-1"></i>Take Survey</button>
      </div></div></div>`).join('') + `</div>`;
  } catch (err) { a.innerHTML = `<div class="alert alert-danger">${err.message}</div>`; }
};

// Patch SmartParking stats to use real field names
const _origLoadParkingSlots = loadParkingSlots;
loadParkingSlots = async function() {
  const g = document.getElementById('parking-grid'), s = document.getElementById('park-stats');
  if (!g) return; g.innerHTML = `<div class="col-12">${spinner()}</div>`;
  try {
    const d = await api('SmartParking/GetAllParking');
    parkingSlots = d.data || d || [];
    if (!parkingSlots.length) {
      parkingSlots = Array.from({length: 30}, (_, i) => ({
        parkId: i + 1, parkSpotNo: i + 1, slotNo: `A${String(i + 1).padStart(2, '0')}`,
        vehicleNo: Math.random() > 0.5 ? `MH${i + 10}AB1234` : null
      }));
    }
    const now = new Date();
    const occupied = parkingSlots.filter(p => p.outTime ? new Date(p.outTime) > now : !!p.vehicleNo).length;
    const vacant = parkingSlots.length - occupied;
    if (s) s.innerHTML = `
      <div class="col-sm-4"><div class="stat-card"><div class="stat-icon" style="background:#3fb95022;color:var(--success-custom)"><i class="bi bi-p-circle"></i></div><div class="stat-value" style="color:var(--success-custom)">${vacant}</div><div class="stat-label">Vacant</div></div></div>
      <div class="col-sm-4"><div class="stat-card"><div class="stat-icon" style="background:#f8514922;color:var(--danger-custom)"><i class="bi bi-car-front"></i></div><div class="stat-value" style="color:var(--danger-custom)">${occupied}</div><div class="stat-label">Occupied</div></div></div>
      <div class="col-sm-4"><div class="stat-card"><div class="stat-icon" style="background:#58a6ff22;color:var(--accent)"><i class="bi bi-pie-chart"></i></div><div class="stat-value">${parkingSlots.length > 0 ? Math.round((occupied / parkingSlots.length) * 100) : 0}%</div><div class="stat-label">Occupancy</div></div></div>`;
    renderParkingGrid();
  } catch (err) { g.innerHTML = `<div class="col-12"><div class="alert alert-danger">${err.message}</div></div>`; }
};
