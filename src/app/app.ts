import { Component, ElementRef, ViewChild, AfterViewInit, signal, computed, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

// دیکشنری کامل دوزبانه (Deutsch & English)
const I18N = {
  de: {
    nav: { home: 'Übersicht', hardware: 'Hardware', telecom: 'Telekom & Netz', software: 'Software' },
    hero: {
      badge: 'Next-Gen Infrastruktur',
      title: 'Konnektivität. Neu definiert.',
      subtitle: 'Wir verschmelzen Hochleistungs-Hardware, intelligente Software und ultraschnelle Telekommunikationsnetze zu einem einzigen Ökosystem.',
      scrollHint: 'Scrollen zum Entdecken ↓'
    },
    hardware: {
      tag: 'HARDWARE & ROUTING',
      title: 'Gebaut für extreme Leistung.',
      desc: 'Unsere maßgeschneiderten Router und Server-Architekturen bilden das physische Rückgrat für unterbrechungsfreie Datenströme.',
      bento1Title: 'Quanten-Sicheres Routing',
      bento1Desc: 'Hardware-basierte Verschlüsselung direkt auf Chip-Ebene.',
      bento2Title: '99.999% Uptime',
      bento2Desc: 'Redundante Strom- und Glasfaser-Schnittstellen.',
      bento3Title: 'Modulares Design',
      bento3Desc: 'Nahtlose Skalierung für Rechenzentren und Edge-Nodes.'
    },
    telecom: {
      tag: 'TELEKOMMUNIKATION & NETZWERK',
      title: 'Lichtgeschwindigkeit als Standard.',
      desc: 'Von 5G-Campusnetzen bis hin zu globalen Glasfaser-Backbones – wir optimieren jede Millisekunde Ihrer Übertragung.',
      stat1: '< 1 ms',
      stat1Label: 'Ultra-Low Latency',
      stat2: '400 Gbps',
      stat2Label: 'Durchsatz pro Node',
      stat3: 'AI-Driven',
      stat3Label: 'Dynamisches Traffic-Shaping'
    },
    software: {
      tag: 'SOFTWARE & CLOUD',
      title: 'Intelligenz, die alles steuert.',
      desc: 'Ein zentrales Betriebssystem für Ihre gesamte Infrastruktur. Überwachen, konfigurieren und automatisieren Sie Ihr Netzwerk in Echtzeit.',
      cta: 'Projekt anfragen'
    }
  },
  en: {
    nav: { home: 'Overview', hardware: 'Hardware', telecom: 'Telecom & Network', software: 'Software' },
    hero: {
      badge: 'Next-Gen Infrastructure',
      title: 'Connectivity. Redefined.',
      subtitle: 'We merge high-performance hardware, intelligent software, and ultra-fast telecommunication networks into a single unified ecosystem.',
      scrollHint: 'Scroll to explore ↓'
    },
    hardware: {
      tag: 'HARDWARE & ROUTING',
      title: 'Engineered for extreme performance.',
      desc: 'Our custom-built routers and server architectures form the physical backbone for uninterrupted data streams.',
      bento1Title: 'Quantum-Safe Routing',
      bento1Desc: 'Hardware-accelerated encryption right at the silicon level.',
      bento2Title: '99.999% Uptime',
      bento2Desc: 'Redundant power and fiber-optic interfaces.',
      bento3Title: 'Modular Design',
      bento3Desc: 'Seamless scaling for data centers and edge nodes.'
    },
    telecom: {
      tag: 'TELECOM & NETWORK',
      title: 'Speed of light as standard.',
      desc: 'From private 5G campus networks to global fiber backbones – we optimize every millisecond of your transmission.',
      stat1: '< 1 ms',
      stat1Label: 'Ultra-Low Latency',
      stat2: '400 Gbps',
      stat2Label: 'Throughput per Node',
      stat3: 'AI-Driven',
      stat3Label: 'Dynamic Traffic Shaping'
    },
    software: {
      tag: 'SOFTWARE & CLOUD',
      title: 'Intelligence in full control.',
      desc: 'A unified operating system for your entire infrastructure. Monitor, configure, and automate your network in real time.',
      cta: 'Start a Project'
    }
  }
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  routerX: number;
  routerY: number;
  waveIndex: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- ناوبری شیشه‌ای به سبک اپل -->
    <header class="apple-nav">
      <div class="nav-content">
        <a href="#" class="brand">NEXUS<span class="dot">.</span></a>
        <nav class="nav-links">
          <a href="#hero">{{ t().nav.home }}</a>
          <a href="#hardware">{{ t().nav.hardware }}</a>
          <a href="#telecom">{{ t().nav.telecom }}</a>
          <a href="#software">{{ t().nav.software }}</a>
        </nav>
        <div class="lang-toggle" (click)="toggleLang()">
          <span [class.active]="lang() === 'de'">DE</span>
          <span class="divider">/</span>
          <span [class.active]="lang() === 'en'">EN</span>
        </div>
      </div>
    </header>

    <!-- بوم گرافیکی ثابت در پس‌زمینه که با اسکرول مورف می‌شود -->
    <canvas #morphCanvas class="bg-canvas"></canvas>

    <!-- محتوای اسکرول‌شونده -->
    <main class="content-wrapper">
      
      <!-- SECTION 1: HERO (Network Nodes) -->
      <section id="hero" class="screen-section hero-section">
        <span class="pill-badge">{{ t().hero.badge }}</span>
        <h1 class="hero-title">{{ t().hero.title }}</h1>
        <p class="hero-subtitle">{{ t().hero.subtitle }}</p>
        <div class="scroll-indicator">{{ t().hero.scrollHint }}</div>
      </section>

      <!-- SECTION 2: HARDWARE (Morphs into Router/Server) -->
      <section id="hardware" class="screen-section">
        <div class="section-header">
          <span class="eyebrow">{{ t().hardware.tag }}</span>
          <h2 class="section-title">{{ t().hardware.title }}</h2>
          <p class="section-desc">{{ t().hardware.desc }}</p>
        </div>

        <!-- Apple Bento Grid -->
        <div class="bento-grid">
          <div class="bento-card large">
            <div class="card-glow cyan"></div>
            <h3>{{ t().hardware.bento1Title }}</h3>
            <p>{{ t().hardware.bento1Desc }}</p>
          </div>
          <div class="bento-card">
            <h3>{{ t().hardware.bento2Title }}</h3>
            <p>{{ t().hardware.bento2Desc }}</p>
          </div>
          <div class="bento-card">
            <h3>{{ t().hardware.bento3Title }}</h3>
            <p>{{ t().hardware.bento3Desc }}</p>
          </div>
        </div>
      </section>

      <!-- SECTION 3: TELECOM & WAVES (Morphs into Sine Waves) -->
      <section id="telecom" class="screen-section">
        <div class="section-header">
          <span class="eyebrow purple">{{ t().telecom.tag }}</span>
          <h2 class="section-title">{{ t().telecom.title }}</h2>
          <p class="section-desc">{{ t().telecom.desc }}</p>
        </div>

        <div class="stats-grid">
          <div class="stat-box">
            <div class="stat-value">{{ t().telecom.stat1 }}</div>
            <div class="stat-label">{{ t().telecom.stat1Label }}</div>
          </div>
          <div class="stat-box">
            <div class="stat-value">{{ t().telecom.stat2 }}</div>
            <div class="stat-label">{{ t().telecom.stat2Label }}</div>
          </div>
          <div class="stat-box">
            <div class="stat-value">{{ t().telecom.stat3 }}</div>
            <div class="stat-label">{{ t().telecom.stat3Label }}</div>
          </div>
        </div>
      </section>

      <!-- SECTION 4: SOFTWARE & ECOSYSTEM -->
      <section id="software" class="screen-section">
        <div class="glass-showcase">
          <span class="eyebrow">{{ t().software.tag }}</span>
          <h2 class="section-title">{{ t().software.title }}</h2>
          <p class="section-desc">{{ t().software.desc }}</p>
          <button class="apple-btn">{{ t().software.cta }}</button>
        </div>
      </section>

    </main>
  `,
  styles: [`
    :host {
      display: block;
      background-color: #000000;
      color: #f5f5f7;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif;
      overflow-x: hidden;
      scroll-behavior: smooth;
    }

    /* هدر شیشه‌ای اپل */
    .apple-nav {
      position: fixed;
      top: 0; left: 0; width: 100%; height: 54px;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: saturate(180%) blur(20px);
      -webkit-backdrop-filter: saturate(180%) blur(20px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      z-index: 1000;
    }
    .nav-content {
      max-width: 1200px; height: 100%; margin: 0 auto; padding: 0 24px;
      display: flex; justify-content: space-between; align-items: center;
    }
    .brand {
      font-weight: 800; font-size: 1.2rem; color: #fff; text-decoration: none; letter-spacing: 1px;
    }
    .brand .dot { color: #00f2fe; }
    .nav-links { display: flex; gap: 32px; }
    .nav-links a {
      color: #a1a1a6; text-decoration: none; font-size: 0.85rem; transition: color 0.2s;
    }
    .nav-links a:hover { color: #fff; }
    .lang-toggle {
      cursor: pointer; font-size: 0.8rem; background: rgba(255,255,255,0.08);
      padding: 5px 12px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.12);
      user-select: none;
    }
    .lang-toggle .active { color: #00f2fe; font-weight: 700; }
    .lang-toggle .divider { margin: 0 4px; color: #555; }

    /* بوم پس‌زمینه */
    .bg-canvas {
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      z-index: 1; pointer-events: none;
    }

    /* بخش‌های صفحه */
    .content-wrapper { position: relative; z-index: 2; }
    .screen-section {
      min-height: 100vh; max-width: 1100px; margin: 0 auto; padding: 120px 24px;
      display: flex; flex-direction: column; justify-content: center; align-items: center;
      text-align: center; box-sizing: border-box;
    }

    /* تایپوگرافی اپل */
    .pill-badge {
      background: rgba(0, 242, 254, 0.1); border: 1px solid rgba(0, 242, 254, 0.3);
      color: #00f2fe; padding: 6px 16px; border-radius: 99px; font-size: 0.8rem;
      font-weight: 600; margin-bottom: 24px; letter-spacing: 0.5px;
    }
    .hero-title {
      font-size: clamp(2.8rem, 7vw, 5.5rem); font-weight: 800; letter-spacing: -0.03em;
      line-height: 1.05; margin: 0 0 24px 0;
      background: linear-gradient(180deg, #ffffff 0%, #86868b 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .hero-subtitle {
      font-size: clamp(1.1rem, 2vw, 1.5rem); color: #86868b; max-width: 720px;
      line-height: 1.5; font-weight: 400; margin-bottom: 48px;
    }
    .scroll-indicator {
      font-size: 0.85rem; color: #555; animation: bounce 2s infinite;
    }

    .eyebrow {
      color: #00f2fe; font-size: 0.85rem; font-weight: 700; letter-spacing: 1.5px;
      display: block; margin-bottom: 12px;
    }
    .eyebrow.purple { color: #b721ff; }
    .section-title {
      font-size: clamp(2.2rem, 5vw, 4rem); font-weight: 700; margin: 0 0 16px 0;
      letter-spacing: -0.02em;
    }
    .section-desc {
      color: #a1a1a6; font-size: 1.2rem; max-width: 650px; margin: 0 auto 56px auto;
      line-height: 1.6;
    }

    /* Bento Grid */
    .bento-grid {
      display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; width: 100%;
    }
    .bento-card {
      position: relative; overflow: hidden;
      background: rgba(20, 20, 25, 0.6);
      backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 28px; padding: 40px; text-align: left;
      transition: transform 0.3s ease, border-color 0.3s ease;
    }
    .bento-card:hover {
      transform: translateY(-4px); border-color: rgba(0, 242, 254, 0.4);
    }
    .bento-card.large { grid-column: span 2; }
    .bento-card h3 { font-size: 1.6rem; margin: 0 0 12px 0; color: #fff; }
    .bento-card p { color: #86868b; font-size: 1.05rem; margin: 0; line-height: 1.5; }
    .card-glow.cyan {
      position: absolute; width: 250px; height: 250px; background: #00f2fe;
      filter: blur(120px); opacity: 0.15; top: -50px; right: -50px; pointer-events: none;
    }

    /* Stats Grid */
    .stats-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; width: 100%;
    }
    .stat-box {
      background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(12px); padding: 36px 24px; border-radius: 24px;
    }
    .stat-value {
      font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 800;
      background: linear-gradient(135deg, #00f2fe 0%, #b721ff 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      margin-bottom: 8px;
    }
    .stat-label { color: #a1a1a6; font-size: 0.95rem; font-weight: 500; }

    /* Software Showcase */
    .glass-showcase {
      background: linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%);
      border: 1px solid rgba(255, 255, 255, 0.12); backdrop-filter: blur(24px);
      border-radius: 36px; padding: 80px 40px; width: 100%;
    }
    .apple-btn {
      background: #fff; color: #000; border: none; padding: 16px 36px;
      font-size: 1.05rem; font-weight: 600; border-radius: 99px; cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .apple-btn:hover {
      transform: scale(1.04); box-shadow: 0 0 30px rgba(255, 255, 255, 0.4);
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(8px); }
    }
    @media (max-width: 768px) {
      .bento-grid, .stats-grid { grid-template-columns: 1fr; }
      .bento-card.large { grid-column: span 1; }
      .nav-links { display: none; }
    }
  `]
})
export class App implements AfterViewInit, OnDestroy {
  @ViewChild('morphCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  lang = signal<'de' | 'en'>('de');
  t = computed(() => I18N[this.lang()]);

  private scrollProgress = 0;
  private animFrameId = 0;
  private particles: Particle[] = [];
  private time = 0;

  toggleLang() {
    this.lang.set(this.lang() === 'de' ? 'en' : 'de');
  }

  @HostListener('window:scroll')
  onScroll() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
  }

  @HostListener('window:resize')
  onResize() {
    if (this.canvasRef) {
      this.setupCanvas();
    }
  }

  ngAfterViewInit() {
    this.setupCanvas();
    this.animate();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animFrameId);
  }

  private setupCanvas() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const count = 90; // تعداد نودهای شبکه
    this.particles = [];

    // ایجاد شکل یک روتر / سرور در مرکز صفحه (برای مرحله دوم اسکرول)
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const boxW = Math.min(500, canvas.width * 0.7);
    const boxH = 140;

    for (let i = 0; i < count; i++) {
      // محاسبه مختصات روی شاسی روتر (مستطیل + پورت‌های داخلی)
      let rx = cx + (Math.random() - 0.5) * boxW;
      let ry = cy + (Math.random() - 0.5) * boxH;
      if (i < 40) {
        // نقاط روی قاب بیرونی روتر
        const edge = i % 4;
        if (edge === 0) { rx = cx - boxW / 2 + (i / 40) * boxW; ry = cy - boxH / 2; }
        if (edge === 1) { rx = cx - boxW / 2 + (i / 40) * boxW; ry = cy + boxH / 2; }
        if (edge === 2) { rx = cx - boxW / 2; ry = cy - boxH / 2 + (i / 40) * boxH; }
        if (edge === 3) { rx = cx + boxW / 2; ry = cy - boxH / 2 + (i / 40) * boxH; }
      } else {
        // پورت‌ها و چراغ‌های LED داخل روتر
        const col = (i - 40) % 10;
        const row = Math.floor((i - 40) / 10);
        rx = (cx - boxW / 2 + 50) + col * ((boxW - 100) / 9);
        ry = (cy - 30) + row * 20;
      }

      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        routerX: rx,
        routerY: ry,
        waveIndex: i
      });
    }
  }

  private animate = () => {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    this.time += 0.03;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const p = this.scrollProgress;
    // محاسبه وزن هر مرحله بر اساس اسکرول:
    // Stage 1 (0 -> 0.35): Network -> Router
    // Stage 2 (0.35 -> 0.75): Router -> Telecom Waves
    const routerWeight = p < 0.5 ? Math.min(1, p * 3) : Math.max(0, 1 - (p - 0.5) * 3);
    const waveWeight = p > 0.45 ? Math.min(1, (p - 0.45) * 2.2) : 0;

    // رسم قاب شیشه‌ای روتر وقتی در بخش سخت‌افزار هستیم
    if (routerWeight > 0.1) {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const boxW = Math.min(500, canvas.width * 0.7);
      const boxH = 140;
      ctx.save();
      ctx.strokeStyle = `rgba(0, 242, 254, ${routerWeight * 0.35})`;
      ctx.lineWidth = 2;
      ctx.strokeRect(cx - boxW / 2, cy - boxH / 2, boxW, boxH);
      ctx.restore();
    }

    const currentPositions: { x: number; y: number }[] = [];

    this.particles.forEach((pt, idx) => {
      // حرکت طبیعی در حالت شبکه
      pt.x += pt.vx;
      pt.y += pt.vy;
      if (pt.x < 0 || pt.x > canvas.width) pt.vx *= -1;
      if (pt.y < 0 || pt.y > canvas.height) pt.vy *= -1;

      // مختصات حالت موج مخابراتی (Sine Waves)
      const waveLayer = idx % 3;
      const waveX = (idx / this.particles.length) * canvas.width;
      const waveY = canvas.height / 2 + Math.sin(waveX * 0.008 + this.time + waveLayer) * (70 + waveLayer * 35);

      // ترکیب نرم (Linear Interpolation) بین ۳ حالت
      let drawX = pt.x * (1 - routerWeight) + pt.routerX * routerWeight;
      let drawY = pt.y * (1 - routerWeight) + pt.routerY * routerWeight;

      drawX = drawX * (1 - waveWeight) + waveX * waveWeight;
      drawY = drawY * (1 - waveWeight) + waveY * waveWeight;

      currentPositions.push({ x: drawX, y: drawY });

      // تغییر رنگ از آبی فیروزه‌ای به بنفش مخابراتی
      const hue = 190 + p * 90;
      ctx.fillStyle = `hsla(${hue}, 95%, 65%, 0.85)`;
      ctx.beginPath();
      ctx.arc(drawX, drawY, routerWeight > 0.5 ? 3.5 : 2.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // رسم خطوط شبکه و ارتباطات
    for (let i = 0; i < currentPositions.length; i++) {
      for (let j = i + 1; j < currentPositions.length; j++) {
        const dx = currentPositions[j].x - currentPositions[i].x;
        const dy = currentPositions[j].y - currentPositions[i].y;
        const dist = Math.hypot(dx, dy);
        const maxDist = waveWeight > 0.5 ? 90 : 130;

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.25;
          const hue = 190 + p * 90;
          ctx.strokeStyle = `hsla(${hue}, 90%, 60%, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(currentPositions[i].x, currentPositions[i].y);
          ctx.lineTo(currentPositions[j].x, currentPositions[j].y);
          ctx.stroke();
        }
      }
    }

    this.animFrameId = requestAnimationFrame(this.animate);
  };
}