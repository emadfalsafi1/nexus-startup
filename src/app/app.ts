import { Component, ElementRef, ViewChild, AfterViewInit, signal, computed, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Lang = 'de' | 'en';
type ServiceKey = 'av' | 'ds' | 'it';

const CONTENT = {
  de: {
    tagline: 'Your Partner in Technology.',
    brandPos: 'On-Site Management • AV, Signage & IT',
    nav: {
      home: 'Home',
      onsite: 'On-Site Management',
      av: 'Professional AV',
      ds: 'Digital Signage',
      it: 'IT & Rollout',
      about: 'Über uns',
      contact: 'Kontakt',
      cta: 'Angebot anfordern'
    },
    hero: {
      headline: 'Erfahrenes On-Site Management & Integration für Ihre AV-, Signage- und IT-Projekte.',
      subheadline: 'Verlässliche Umsetzung vor Ort in ganz Deutschland – genau so, wie Sie es selbst tun würden.',
      body: 'Technische Hürden, enge Zeitpläne, laufender Kundenbetrieb oder Sprachbarrieren auf der Baustelle: Wenn die Entsendung Ihres eigenen Teams über mehrere Standorte hinweg zu kostspielig oder unpraktikabel ist, sorgt INFAVO vor Ort dafür, dass Ihr Projekt pünktlich und nach Plan abgeschlossen wird.',
      primaryBtn: 'On-Site Management entdecken',
      secondaryBtn: 'Projekt besprechen',
      quickRouteLabel: 'Direkt zu unseren drei Kernbereichen:'
    },
    onsite: {
      eyebrow: 'ON-SITE MANAGEMENT & PROJEKTSTEUERUNG',
      title: 'Die zusätzliche Vor-Ort-Kompetenz, damit Ihr Projekt nach Plan ans Ziel kommt.',
      p1: 'Zahlreiche Faktoren können Ihr digitales Kommunikations- oder Infrastrukturprojekt vor Herausforderungen stellen: Technische Störungen, Verzögerungen, Subunternehmer oder Sprachbarrieren sind potenzielle Hindernisse, die ein erfahrenes On-Site Management erfordern. Häufig läuft der Betrieb am Standort weiter, während AV- und IT-Technologien installiert, geprüft und eingerichtet werden – und Ihre Kunden erwarten einen reibungslosen Übergang.',
      p2: 'Umgekehrt müssen Projekte oft außerhalb der Geschäftszeiten, am Wochenende oder nachts umgesetzt werden. Ohne starke Steuerung vor Ort geraten Projekte ins Stocken, verursachen Zusatzkosten und binden wertvolle Ressourcen. Zwar ist die Entsendung eines eigenen Teams oft die erste Wahl, doch über mehrere Standorte, Projekte und Ländergrenzen hinweg ist dies häufig zu teuer oder schlicht nicht machbar.',
      p3: 'Genau hier hilft INFAVO: Wir sind ein freundliches, eingespieltes Team aus qualifizierten AV- und IT-Experten und übernehmen das umfassende On-Site- und Projektmanagement für Ihre Vorhaben in Deutschland. Wenn Sie Teile Ihres Projekts auslagern, müssen Sie sich darauf verlassen können, dass Ihr Partner genauso kompetent liefert wie Sie selbst – vom nationalen oder internationalen Multi-Site-Rollout bis zur vollständigen technischen Implementierung.',
      cta: 'Anforderungen besprechen & Angebot erhalten',
      highlights: [
        {
          title: 'Laufender Betrieb & Out-of-Hours',
          desc: 'Reibungslose Installation während der Öffnungszeiten oder termingerechte Umsetzung nachts und am Wochenende.'
        },
        {
          title: 'Koordination & Problemlösung vor Ort',
          desc: 'Aktive Steuerung von Subunternehmern, direkte Behebung technischer Fehler und Vermeidung teurer Projektverzögerungen.'
        },
        {
          title: 'Keine Sprach- oder Distanzbarrieren',
          desc: 'Sichere Kommunikation auf Deutsch und Englisch direkt am Standort – ideal für internationale Auftraggeber mit Projekten in Deutschland.'
        },
        {
          title: 'Nahtloses White-Label-Auftreten',
          desc: 'Wir agieren als verlässliche Verlängerung Ihres Teams und vertreten Ihren Qualitätsanspruch souverän gegenüber dem Endkunden.'
        }
      ]
    },
    expertise: {
      eyebrow: 'UNSERE FACHBEREICHE',
      title: 'Fokussierte Expertise statt Bauchladen.',
      subtitle: 'Wir behaupten nicht, alles zu können – sondern konzentrieren uns gezielt auf die Schnittstelle aus professioneller Medientechnik (AV), Digital Signage und der zugehörigen Standort-IT.',
      selectBtn: 'Kernleistungen ansehen →',
      requestBtn: 'Projekt in diesem Bereich anfragen',
      categories: {
        av: {
          code: 'AV',
          title: 'Professional AV Solutions',
          short: 'Konferenzraumtechnik, vernetzte Audio- und Videosysteme, Systemintegration und Inbetriebnahme vor Ort.',
          items: [
            'Integration von Meeting-, Konferenz- und Kollaborationsräumen',
            'Inbetriebnahme (Commissioning), Audio-DSP & Q-SYS-Umgebungen',
            'Fachgerechte Montage und Einrichtung von Videokonferenz-Systemen',
            'Vor-Ort-Diagnose, Fehlersuche (Troubleshooting) & Systemübergabe'
          ]
        },
        ds: {
          code: 'DS',
          title: 'Digital Signage Solutions',
          short: 'Kommerzielle Displays, Video-Walls, Media-Player-Rollouts und zuverlässiger Service für Retail- und Unternehmenskunden.',
          items: [
            'Installation & Integration kommerzieller Displays und LED-/Video-Walls',
            'Rollout, Konfiguration & Netzwerkanbindung von Media-Playern',
            'Koordinierte Multi-Site-Rollouts über mehrere Filialen und Standorte',
            'Schneller Hardware-Austausch (Break & Fix) und Wartung vor Ort'
          ]
        },
        it: {
          code: 'IT',
          title: 'IT & Network Rollout',
          short: 'Das technische Fundament am Standort: Netzwerk-Rollouts, Rack-Aufbau, Verkabelung und qualifizierte Smart-Hands-Einsätze.',
          items: [
            'Netzwerk-Installation, Rack-Aufbau, Patching & Standort-Konnektivität',
            'Strukturierte IT-Hardware-Rollouts & Workplace-Bereitstellung',
            'Qualifizierte Smart-Hands-Unterstützung in enger Abstimmung mit Ihrem Remote-Team',
            'Technische Standortaufnahmen (Site Surveys) & saubere Dokumentation'
          ]
        }
      }
    },
    why: {
      eyebrow: 'FÜR WEN WIR ARBEITEN',
      title: 'Wann INFAVO der richtige Partner für Sie ist.',
      props: [
        {
          title: 'Internationale AV- & IT-Integratoren',
          desc: 'Sie realisieren Projekte in Deutschland und benötigen erfahrene Bau- und Projektleitung vor Ort, ohne eigene Teams einfliegen zu müssen.'
        },
        {
          title: 'Digital-Signage- & Systemhäuser',
          desc: 'Sie suchen für Multi-Site-Rollouts oder Auftragsspitzen ein eingespieltes Technik-Team, das zuverlässig in Ihrem Namen liefert.'
        },
        {
          title: 'Unternehmen & Filialisten',
          desc: 'Sie modernisieren Konferenzräume, Displays oder Standort-IT und wünschen sich einen Partner, der den Umbau auch im laufenden Betrieb ruhig und strukturiert steuert.'
        }
      ]
    },
    about: {
      eyebrow: 'ÜBER INFAVO',
      title: 'Ein freundliches Team aus erfahrenen AV- und IT-Experten.',
      body: 'INFAVO unterstützt Systemintegratoren, Technologiepartner und Unternehmen bei der praktischen Umsetzung und dem On-Site Management von AV-, Digital-Signage- und IT-Projekten in Deutschland. Statt endloser Schlagwortlisten setzen wir auf ehrliche Beratung, saubere Ausführung und verbindliche Kommunikation.',
      missionTitle: 'Unser Versprechen',
      mission: 'Wenn Sie einen Teil Ihres Projekts an INFAVO übergeben, können Sie sicher sein, dass wir es vor Ort mit derselben Sorgfalt, Kompetenz und Verlässlichkeit zum Abschluss bringen, wie Sie es selbst tun würden.'
    },
    contact: {
      eyebrow: 'KONTAKT & ANGEBOT',
      title: 'Besprechen Sie Ihre Anforderungen mit uns.',
      intro: 'Kontaktieren Sie INFAVO, um Ihr Vorhaben zu besprechen und ein faires, transparentes Angebot für Ihr Projekt zu erhalten.',
      fields: {
        name: 'Name *',
        company: 'Unternehmen *',
        email: 'Geschäftliche E-Mail *',
        phone: 'Telefonnummer',
        service: 'Schwerpunkt Ihres Projekts *',
        location: 'Projektstandort(e) in Deutschland',
        date: 'Geplanter Zeitraum / Startdatum',
        desc: 'Projektbeschreibung & Anforderungen *',
        file: 'Projektdatei / Leistungsverzeichnis anhängen (Optional)'
      },
      serviceOptions: [
        'On-Site Management & Projektkoordination',
        'Professional AV Solutions',
        'Digital Signage Solutions',
        'IT & Network Rollout / Smart Hands',
        'B2B-Partnerschaft / Subcontracting'
      ],
      buttons: {
        quote: 'Angebot anfordern',
        support: 'Vor-Ort-Einsatz anfragen',
        partner: 'Partnerschaft besprechen'
      },
      successMsg: 'Vielen Dank! Ihre Projektanfrage wurde erfasst. Wir melden uns in Kürze persönlich bei Ihnen.'
    },
    footer: {
      impressum: 'Impressum',
      privacy: 'Datenschutz (DSGVO)',
      rights: 'Alle Rechte vorbehalten.'
    }
  },
  en: {
    tagline: 'Your Partner in Technology.',
    brandPos: 'On-Site Management • AV, Signage & IT',
    nav: {
      home: 'Home',
      onsite: 'On-Site Management',
      av: 'Professional AV',
      ds: 'Digital Signage',
      it: 'IT & Rollout',
      about: 'About',
      contact: 'Contact',
      cta: 'Obtain a Quote'
    },
    hero: {
      headline: 'Experienced On-Site Management & Integration for Your AV, Signage and IT Projects.',
      subheadline: 'Competent On-Site Delivery Across Germany — Just as You Would.',
      body: 'Technical faults, delays, subcontractors, or language barriers: when dispatching your own team across multiple sites and territories is costly or unfeasible, INFAVO provides the skilled on-site management and technical execution your project needs to finish on plan.',
      primaryBtn: 'Explore On-Site Management',
      secondaryBtn: 'Discuss Your Project',
      quickRouteLabel: 'Jump directly to our three core areas:'
    },
    onsite: {
      eyebrow: 'ON-SITE MANAGEMENT & PROJECT DELIVERY',
      title: 'The Extra Resources Your Project Needs to Finish on Plan.',
      p1: 'Numerous complications can challenge your digital communications or infrastructure project. Technical faults, delays, subcontractors, and language barriers are potential obstacles that require experienced on-site management. Sites are routinely still operational whilst AV and IT technologies are installed, diagnosed, and managed, and clients require a smooth transition.',
      p2: 'Conversely, a project may need to be managed out of hours, at weekends, or at night. Without strong on-site management, projects flounder, incur extra costs, and deplete resources. Whilst dispatching your own on-site management team is the first choice, this may be costly or unfeasible across multiple sites, projects, and territories.',
      p3: 'Here, INFAVO can help. We are a friendly team of skilled AV and IT experts who provide comprehensive on-site and project management for your AV, digital signage, and IT projects in Germany. When outsourcing any element of your project, you need to be confident that your chosen partner will competently deliver the project just as you would — from multi-site, national, and overseas projects through to full digital implementation.',
      cta: 'Discuss Your Requirements & Obtain a Quote',
      highlights: [
        {
          title: 'Live Operational Sites & Out-of-Hours',
          desc: 'Smooth transitions while sites remain operational, or dedicated execution out of hours, at weekends, or at night.'
        },
        {
          title: 'Subcontractor & Fault Management',
          desc: 'Hands-on coordination of local trades, rapid diagnosis of technical faults, and keeping schedules on track.'
        },
        {
          title: 'Overcoming Language Barriers',
          desc: 'Fluent German and English communication on site — bridging the gap for international partners delivering projects in Germany.'
        },
        {
          title: 'Seamless White-Label Delivery',
          desc: 'We represent your business on site with the same care, reliability, and technical standards as your own team.'
        }
      ]
    },
    expertise: {
      eyebrow: 'OUR CORE CAPABILITIES',
      title: 'Focused Expertise You Can Trust.',
      subtitle: 'Rather than claiming to do everything, we focus on what we do best: the practical intersection of professional AV, digital signage, and on-site IT rollout.',
      selectBtn: 'View Core Capabilities →',
      requestBtn: 'Request Project in This Area',
      categories: {
        av: {
          code: 'AV',
          title: 'Professional AV Solutions',
          short: 'Meeting room technology, networked audio/video systems, AV integration, and on-site commissioning.',
          items: [
            'Meeting, Conference & Collaboration Room Integration',
            'System Commissioning, Audio DSP & Q-SYS Environments',
            'Video Conferencing Installation, Alignment & Testing',
            'On-Site Diagnostics, Troubleshooting & Client Handover'
          ]
        },
        ds: {
          code: 'DS',
          title: 'Digital Signage Solutions',
          short: 'Commercial displays, video walls, media player rollouts, and reliable on-site service for retail and corporate spaces.',
          items: [
            'Commercial Display & LED / Video Wall Installation',
            'Media Player Deployment, Configuration & Network Connectivity',
            'Coordinated Multi-Site Digital Signage Rollouts',
            'On-Site Fault Diagnosis, Hardware Replacement & Maintenance'
          ]
        },
        it: {
          code: 'IT',
          title: 'IT & Network Rollout',
          short: 'The on-site connectivity backbone: network hardware installation, rack build, structured cabling, and Smart Hands.',
          items: [
            'Network Hardware Installation, Rack Setup & Structured Patching',
            'Multi-Site IT Hardware Rollouts & Workplace Deployment',
            'Skilled Smart Hands & Remote Hands Support on Site',
            'Technical Site Surveys, Verification & Handover Documentation'
          ]
        }
      }
    },
    why: {
      eyebrow: 'WHO WE SUPPORT',
      title: 'When INFAVO Is the Right Partner for You.',
      props: [
        {
          title: 'International AV & IT Integrators',
          desc: 'Delivering projects across German sites without the high cost and logistics of dispatching your own team from abroad.'
        },
        {
          title: 'Digital Signage & System Providers',
          desc: 'Extending your on-site installation and project management capacity during multi-site rollouts and peak demand.'
        },
        {
          title: 'Multi-Site Retail & Corporate Clients',
          desc: 'Upgrading meeting rooms, signage, or site hardware with minimal disruption to daily business operations.'
        }
      ]
    },
    about: {
      eyebrow: 'ABOUT INFAVO',
      title: 'A Friendly Team of Skilled AV and IT Experts.',
      body: 'INFAVO is a Germany-based technology services partner specializing in on-site management, installation, and integration for AV, digital signage, and IT projects. Instead of overwhelming promises, we deliver dependable on-site execution, clear communication, and projects that finish on plan.',
      missionTitle: 'Our Promise',
      mission: 'When outsourcing any element of your digital communications or IT project to INFAVO, you can be confident that we will deliver on site just as you would.'
    },
    contact: {
      eyebrow: 'CONTACT & QUOTES',
      title: 'Discuss Your Requirements With Us.',
      intro: 'Contact INFAVO to discuss your requirements and obtain a competitive quote for your next AV, digital signage, or IT project.',
      fields: {
        name: 'Name *',
        company: 'Company *',
        email: 'Business Email *',
        phone: 'Phone Number',
        service: 'Primary Project Focus *',
        location: 'Project Location(s) in Germany',
        date: 'Preferred Timeframe / Start Date',
        desc: 'Project Description & Requirements *',
        file: 'File Attachment (Optional)'
      },
      serviceOptions: [
        'On-Site Management & Project Coordination',
        'Professional AV Solutions',
        'Digital Signage Solutions',
        'IT & Network Rollout / Smart Hands',
        'B2B Partnership / Subcontracting'
      ],
      buttons: {
        quote: 'Obtain a Competitive Quote',
        support: 'Request On-Site Support',
        partner: 'Discuss a Partnership'
      },
      successMsg: 'Thank you! Your project request has been received. Our team will get back to you shortly.'
    },
    footer: {
      impressum: 'Legal Notice (Impressum)',
      privacy: 'Privacy Policy (GDPR / DSGVO)',
      rights: 'All rights reserved.'
    }
  }
};

interface TechNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  gridX: number;
  gridY: number;
  idx: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- STICKY HEADER -->
    <header class="site-header">
      <div class="header-inner">
        <a href="#home" class="brand-logo" aria-label="INFAVO Home">
          <svg class="logo-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="navyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#0b3866" />
                <stop offset="100%" stop-color="#04162e" />
              </linearGradient>
              <linearGradient id="electricGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#38bdf8" />
                <stop offset="100%" stop-color="#0284c7" />
              </linearGradient>
              <linearGradient id="iStemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#ffffff" />
                <stop offset="100%" stop-color="#7dd3fc" />
              </linearGradient>
            </defs>
            <path d="M12 18 C12 9, 21 5, 29 9 L85 38 C93 42, 93 52, 85 56 L29 85 C21 89, 12 85, 12 76 Z" fill="url(#navyGrad)" stroke="rgba(56,189,248,0.35)" stroke-width="1.5"/>
            <path d="M46 21 L57 27 L57 38 L78 44 L46 61 L46 53 L64 44 L46 39 Z" fill="url(#electricGrad)" opacity="0.9"/>
            <polygon points="27,36 39,30 39,65 27,71" fill="url(#iStemGrad)"/>
            <circle cx="33" cy="22" r="6.5" fill="#f59e0b"/>
            <path d="M15 89 L88 52 C92 50, 96 55, 91 59 L19 96 C14 98, 11 92, 15 89 Z" fill="url(#navyGrad)" stroke="#0ea5e9" stroke-width="1"/>
          </svg>
          <div class="brand-text">
            <span class="brand-name">INFAVO<span class="tech-dot">.tech</span></span>
            <span class="brand-sub">{{ t().tagline }}</span>
          </div>
        </a>

        <nav class="main-nav">
          <a href="#home">{{ t().nav.home }}</a>
          <a href="#onsite">{{ t().nav.onsite }}</a>
          <a href="#expertise" (click)="selectService('av')">{{ t().nav.av }}</a>
          <a href="#expertise" (click)="selectService('ds')">{{ t().nav.ds }}</a>
          <a href="#expertise" (click)="selectService('it')">{{ t().nav.it }}</a>
          <a href="#about">{{ t().nav.about }}</a>
          <a href="#contact">{{ t().nav.contact }}</a>
        </nav>

        <div class="header-actions">
          <button class="lang-btn" (click)="toggleLang()" title="Sprache wechseln / Switch Language">
            <span [class.active]="lang() === 'de'">DE</span>
            <span class="sep">|</span>
            <span [class.active]="lang() === 'en'">EN</span>
          </button>
          <a href="#contact" class="btn-primary header-cta">{{ t().nav.cta }}</a>
        </div>
      </div>
    </header>

    <!-- DYNAMIC BACKGROUND CANVAS -->
    <canvas #bgCanvas class="tech-canvas"></canvas>

    <main class="site-main">

      <!-- 1. HERO SECTION -->
      <section id="home" class="section hero-section">
        <div class="container">
          <div class="badge-row">
            <span class="brand-pill">{{ t().brandPos }}</span>
            <span class="market-pill">Germany • Multi-Site & White-Label</span>
          </div>
          <h1 class="hero-headline">{{ t().hero.headline }}</h1>
          <p class="hero-subheadline">{{ t().hero.subheadline }}</p>
          <p class="hero-body">{{ t().hero.body }}</p>

          <div class="hero-cta-group">
            <a href="#onsite" class="btn-primary btn-lg">{{ t().hero.primaryBtn }}</a>
            <a href="#contact" class="btn-secondary btn-lg">{{ t().hero.secondaryBtn }}</a>
          </div>

          <!-- Direct Path Selector -->
          <div class="quick-funnel">
            <span class="funnel-label">{{ t().hero.quickRouteLabel }}</span>
            <div class="funnel-pills">
              <a href="#service-detail" (click)="selectService('av')" class="funnel-chip" [class.active]="activeService() === 'av'">
                <span class="chip-code">AV</span> Professional AV Solutions
              </a>
              <a href="#service-detail" (click)="selectService('ds')" class="funnel-chip" [class.active]="activeService() === 'ds'">
                <span class="chip-code">DS</span> Digital Signage Solutions
              </a>
              <a href="#service-detail" (click)="selectService('it')" class="funnel-chip" [class.active]="activeService() === 'it'">
                <span class="chip-code">IT</span> IT & Network Rollout
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. ON-SITE MANAGEMENT (Core Differentiator & Story) -->
      <section id="onsite" class="section alt-bg">
        <div class="container">
          <div class="onsite-layout">
            <div class="onsite-story">
              <span class="eyebrow amber">{{ t().onsite.eyebrow }}</span>
              <h2 class="section-title">{{ t().onsite.title }}</h2>
              <p class="onsite-p">{{ t().onsite.p1 }}</p>
              <p class="onsite-p">{{ t().onsite.p2 }}</p>
              <p class="onsite-p highlight-p">{{ t().onsite.p3 }}</p>
              <div class="onsite-cta-wrap">
                <a href="#contact" (click)="prefillService(t().contact.serviceOptions[0])" class="btn-primary btn-lg">
                  {{ t().onsite.cta }}
                </a>
              </div>
            </div>

            <div class="onsite-cards">
              @for (hl of t().onsite.highlights; track hl.title) {
                <div class="onsite-card">
                  <div class="onsite-card-head">
                    <span class="check-icon">✓</span>
                    <h4>{{ hl.title }}</h4>
                  </div>
                  <p>{{ hl.desc }}</p>
                </div>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- 3. FOCUSED EXPERTISE (AV, DS, IT - 4 Clear Items Each) -->
      <section id="expertise" class="section">
        <div class="container">
          <div class="section-head">
            <span class="eyebrow">{{ t().expertise.eyebrow }}</span>
            <h2 class="section-title">{{ t().expertise.title }}</h2>
            <p class="section-subtitle">{{ t().expertise.subtitle }}</p>
          </div>

          <div class="pillars-grid">
            @for (key of serviceKeys; track key) {
              <div class="pillar-card" [class.selected]="activeService() === key" (click)="selectService(key)">
                <div class="pillar-top">
                  <span class="bold-code">{{ t().expertise.categories[key].code }}</span>
                  <span class="status-dot"></span>
                </div>
                <h3>{{ t().expertise.categories[key].title }}</h3>
                <p>{{ t().expertise.categories[key].short }}</p>
                <span class="pillar-link">{{ t().expertise.selectBtn }}</span>
              </div>
            }
          </div>

          <div id="service-detail" class="service-deep-dive">
            <div class="deep-dive-header">
              <div>
                <span class="eyebrow">{{ activeCategory().code }} FOCUS</span>
                <h3>{{ activeCategory().title }}</h3>
              </div>
              <a href="#contact" (click)="prefillService(activeCategory().title)" class="btn-primary">
                {{ t().expertise.requestBtn }}
              </a>
            </div>

            <div class="capabilities-grid">
              @for (item of activeCategory().items; track item; let i = $index) {
                <div class="cap-item">
                  <span class="cap-num">0{{ i + 1 }}</span>
                  <span class="cap-text">{{ item }}</span>
                </div>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- 4. WHO WE SUPPORT & ABOUT INFAVO -->
      <section id="about" class="section alt-bg">
        <div class="container">
          <div class="section-head">
            <span class="eyebrow">{{ t().why.eyebrow }}</span>
            <h2 class="section-title">{{ t().why.title }}</h2>
          </div>
          <div class="why-grid">
            @for (prop of t().why.props; track prop.title) {
              <div class="why-card">
                <h4>{{ prop.title }}</h4>
                <p>{{ prop.desc }}</p>
              </div>
            }
          </div>

          <div class="spacer-lg"></div>

          <div class="about-box">
            <span class="eyebrow">{{ t().about.eyebrow }}</span>
            <h2 class="section-title">{{ t().about.title }}</h2>
            <p class="about-body">{{ t().about.body }}</p>
            <div class="mission-card">
              <strong>{{ t().about.missionTitle }}:</strong>
              <p>{{ t().about.mission }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. CONTACT & PROJECT REQUESTS -->
      <section id="contact" class="section">
        <div class="container">
          <div class="section-head">
            <span class="eyebrow">{{ t().contact.eyebrow }}</span>
            <h2 class="section-title">{{ t().contact.title }}</h2>
            <p class="section-subtitle">{{ t().contact.intro }}</p>
          </div>

          <form class="project-form" (ngSubmit)="submitForm($event)">
            <div class="form-grid">
              <div class="form-group">
                <label>{{ t().contact.fields.name }}</label>
                <input type="text" [(ngModel)]="formData.name" name="name" required placeholder="Max Mustermann" />
              </div>
              <div class="form-group">
                <label>{{ t().contact.fields.company }}</label>
                <input type="text" [(ngModel)]="formData.company" name="company" required placeholder="Company GmbH" />
              </div>
              <div class="form-group">
                <label>{{ t().contact.fields.email }}</label>
                <input type="email" [(ngModel)]="formData.email" name="email" required placeholder="name@company.com" />
              </div>
              <div class="form-group">
                <label>{{ t().contact.fields.phone }}</label>
                <input type="tel" [(ngModel)]="formData.phone" name="phone" placeholder="+49 ..." />
              </div>
              <div class="form-group">
                <label>{{ t().contact.fields.location }}</label>
                <input type="text" [(ngModel)]="formData.location" name="location" placeholder="Frankfurt / München / Multi-Site" />
              </div>
              <div class="form-group">
                <label>{{ t().contact.fields.date }}</label>
                <input type="date" [(ngModel)]="formData.date" name="date" />
              </div>
              <div class="form-group full-width">
                <label>{{ t().contact.fields.service }}</label>
                <select [(ngModel)]="formData.service" name="service">
                  @for (opt of t().contact.serviceOptions; track opt) {
                    <option [value]="opt">{{ opt }}</option>
                  }
                </select>
              </div>
              <div class="form-group full-width">
                <label>{{ t().contact.fields.desc }}</label>
                <textarea rows="4" [(ngModel)]="formData.description" name="description" required></textarea>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" [disabled]="isSending()" (click)="requestType = 'Quote'" class="btn-primary">
                {{ isSending() ? '...' : t().contact.buttons.quote }}
              </button>
              <button type="submit" [disabled]="isSending()" (click)="requestType = 'On-Site Support'" class="btn-secondary">
                {{ t().contact.buttons.support }}
              </button>
              <button type="submit" [disabled]="isSending()" (click)="requestType = 'Partnership'" class="btn-secondary">
                {{ t().contact.buttons.partner }}
              </button>
            </div>

            @if (formSubmitted()) {
              <div class="form-success">{{ t().contact.successMsg }}</div>
            }
            @if (formError()) {
              <div class="form-error" style="margin-top:16px; color:#f87171;">
                Fehler beim Senden. Bitte prüfen Sie Ihre Eingaben oder schreiben Sie direkt an info&#64;infavo.tech.
              </div>
            }
          </form>
        </div>
      </section>

    </main>

    <!-- FOOTER -->
    <footer class="site-footer">
      <div class="container footer-inner">
        <div class="footer-brand">
          <strong>INFAVO.tech</strong> — {{ t().brandPos }} ({{ t().tagline }})
          <p>© {{ currentYear }} INFAVO. {{ t().footer.rights }}</p>
        </div>
        <div class="footer-legal">
          <a href="#impressum" (click)="toggleLegal('impressum'); $event.preventDefault()">{{ t().footer.impressum }}</a>
          <a href="#privacy" (click)="toggleLegal('privacy'); $event.preventDefault()">{{ t().footer.privacy }}</a>
        </div>
      </div>

      @if (legalModal()) {
        <div class="legal-drawer container">
          @if (legalModal() === 'impressum') {
            <h4>Impressum (Angaben gemäß § 5 TMG / DDG)</h4>
            <p>INFAVO Technology Services • Deutschland • E-Mail: info&#64;INFAVO.tech</p>
          } @else {
            <h4>Datenschutzhinweis (DSGVO / GDPR)</h4>
            <p>Ihre eingegebenen Projektdaten werden ausschließlich zur Bearbeitung Ihrer B2B-Anfrage gemäß Art. 6 Abs. 1 lit. b DSGVO verarbeitet.</p>
          }
          <button class="lang-btn" (click)="legalModal.set(null)">Schließen / Close</button>
        </div>
      }
    </footer>
  `,
  styles: [`
    :host {
      --bg-navy: #060d1a;
      --bg-charcoal: #0f172a;
      --card-surface: rgba(15, 23, 42, 0.78);
      --electric-blue: #0ea5e9;
      --electric-glow: #38bdf8;
      --amber-accent: #f59e0b;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --border-subtle: rgba(148, 163, 184, 0.14);

      display: block;
      background-color: var(--bg-navy);
      color: var(--text-main);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      line-height: 1.6;
      scroll-behavior: smooth;
    }

    .container {
      max-width: 1220px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* HEADER */
    .site-header {
      position: fixed;
      top: 0; left: 0; width: 100%;
      height: 76px;
      background: rgba(6, 13, 26, 0.82);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border-bottom: 1px solid var(--border-subtle);
      z-index: 1000;
    }
    .header-inner {
      max-width: 1280px;
      height: 100%;
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .brand-logo {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: var(--text-main);
    }
    .logo-svg {
      width: 44px;
      height: 44px;
      flex-shrink: 0;
    }
    .brand-text {
      display: flex;
      flex-direction: column;
    }
    .brand-name {
      font-size: 1.25rem;
      font-weight: 800;
      letter-spacing: 0.5px;
      line-height: 1.1;
    }
    .tech-dot {
      color: var(--electric-blue);
      font-weight: 600;
      font-size: 0.95rem;
    }
    .brand-sub {
      font-size: 0.7rem;
      color: var(--text-muted);
      letter-spacing: 0.3px;
    }

    .main-nav {
      display: flex;
      gap: 22px;
      align-items: center;
    }
    .main-nav a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.88rem;
      font-weight: 500;
      transition: color 0.2s;
    }
    .main-nav a:hover {
      color: var(--electric-glow);
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .lang-btn {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
      padding: 6px 12px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.8rem;
    }
    .lang-btn .active {
      color: var(--electric-glow);
      font-weight: 700;
    }
    .lang-btn .sep { margin: 0 4px; opacity: 0.4; }

    /* BUTTONS */
    .btn-primary {
      background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
      color: #fff;
      text-decoration: none;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      display: inline-block;
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(14, 165, 233, 0.35);
    }
    .btn-secondary {
      background: rgba(255, 255, 255, 0.05);
      color: var(--text-main);
      text-decoration: none;
      border: 1px solid rgba(56, 189, 248, 0.35);
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      transition: background 0.2s;
      display: inline-block;
    }
    .btn-secondary:hover {
      background: rgba(14, 165, 233, 0.12);
    }
    .btn-lg {
      padding: 14px 28px;
      font-size: 1rem;
    }

    /* BACKGROUND CANVAS */
    .tech-canvas {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      z-index: 1;
      pointer-events: none;
      opacity: 0.55;
    }

    .site-main {
      position: relative;
      z-index: 2;
    }

    /* SECTIONS */
    .section {
      padding: 100px 0;
    }
    .alt-bg {
      background: rgba(15, 23, 42, 0.55);
      border-top: 1px solid var(--border-subtle);
      border-bottom: 1px solid var(--border-subtle);
    }
    .hero-section {
      min-height: 90vh;
      display: flex;
      align-items: center;
      padding-top: 130px;
    }

    .badge-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 24px;
    }
    .brand-pill {
      background: rgba(14, 165, 233, 0.14);
      border: 1px solid rgba(14, 165, 233, 0.4);
      color: var(--electric-glow);
      padding: 5px 14px;
      border-radius: 99px;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .market-pill {
      background: rgba(245, 158, 11, 0.12);
      border: 1px solid rgba(245, 158, 11, 0.35);
      color: var(--amber-accent);
      padding: 5px 14px;
      border-radius: 99px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .hero-headline {
      font-size: clamp(2.2rem, 4.4vw, 3.8rem);
      font-weight: 800;
      line-height: 1.12;
      letter-spacing: -0.02em;
      margin: 0 0 18px 0;
      max-width: 940px;
    }
    .hero-subheadline {
      font-size: clamp(1.15rem, 2vw, 1.5rem);
      color: var(--electric-glow);
      font-weight: 600;
      margin: 0 0 18px 0;
    }
    .hero-body {
      font-size: 1.08rem;
      color: var(--text-muted);
      max-width: 800px;
      margin: 0 0 36px 0;
    }
    .hero-cta-group {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 52px;
    }

    /* Quick Customer Route Funnel */
    .quick-funnel {
      border-top: 1px solid var(--border-subtle);
      padding-top: 28px;
    }
    .funnel-label {
      display: block;
      font-size: 0.82rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--text-muted);
      margin-bottom: 14px;
    }
    .funnel-pills {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
    }
    .funnel-chip {
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--card-surface);
      border: 1px solid var(--border-subtle);
      color: var(--text-main);
      padding: 10px 18px;
      border-radius: 10px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.92rem;
      transition: border-color 0.2s, transform 0.2s;
    }
    .funnel-chip:hover, .funnel-chip.active {
      border-color: var(--electric-blue);
      transform: translateY(-2px);
    }
    .chip-code {
      background: rgba(14, 165, 233, 0.2);
      color: var(--electric-glow);
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 6px;
      font-size: 0.8rem;
    }

    /* SECTION HEADERS */
    .section-head {
      margin-bottom: 48px;
    }
    .eyebrow {
      color: var(--electric-blue);
      font-size: 0.82rem;
      font-weight: 800;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      display: block;
      margin-bottom: 10px;
    }
    .eyebrow.amber { color: var(--amber-accent); }
    .section-title {
      font-size: clamp(1.85rem, 3.4vw, 2.75rem);
      font-weight: 800;
      margin: 0 0 14px 0;
      letter-spacing: -0.02em;
      line-height: 1.2;
    }
    .section-subtitle {
      color: var(--text-muted);
      font-size: 1.08rem;
      max-width: 760px;
      margin: 0;
    }

    /* ON-SITE MANAGEMENT SECTION */
    .onsite-layout {
      display: grid;
      grid-template-columns: 1.25fr 1fr;
      gap: 48px;
      align-items: start;
    }
    .onsite-p {
      color: var(--text-muted);
      font-size: 1.04rem;
      margin: 0 0 18px 0;
      line-height: 1.7;
    }
    .onsite-p.highlight-p {
      color: var(--text-main);
      background: rgba(14, 165, 233, 0.08);
      border-left: 3px solid var(--electric-blue);
      padding: 18px 20px;
      border-radius: 0 12px 12px 0;
      margin-top: 22px;
    }
    .onsite-cta-wrap {
      margin-top: 28px;
    }
    .onsite-cards {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .onsite-card {
      background: var(--card-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 14px;
      padding: 22px 24px;
      transition: border-color 0.2s;
    }
    .onsite-card:hover {
      border-color: rgba(56, 189, 248, 0.4);
    }
    .onsite-card-head {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;
    }
    .onsite-card-head h4 {
      margin: 0;
      font-size: 1.05rem;
      color: var(--text-main);
    }
    .onsite-card p {
      margin: 0;
      font-size: 0.92rem;
      color: var(--text-muted);
    }
    .check-icon {
      color: var(--amber-accent);
      font-weight: 900;
      font-size: 1.1rem;
    }

    /* PILLARS (AV, DS, IT) */
    .pillars-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      margin-bottom: 40px;
    }
    .pillar-card {
      background: var(--card-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 16px;
      padding: 32px;
      cursor: pointer;
      transition: all 0.25s ease;
    }
    .pillar-card:hover, .pillar-card.selected {
      border-color: var(--electric-blue);
      box-shadow: 0 12px 32px rgba(2, 132, 199, 0.18);
      transform: translateY(-4px);
    }
    .pillar-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 18px;
    }
    .bold-code {
      font-size: 2.4rem;
      font-weight: 900;
      letter-spacing: -1px;
      background: linear-gradient(135deg, #ffffff 0%, #38bdf8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .status-dot {
      width: 10px; height: 10px;
      border-radius: 50%;
      background: var(--electric-blue);
      box-shadow: 0 0 10px var(--electric-blue);
    }
    .pillar-card h3 {
      font-size: 1.35rem;
      margin: 0 0 12px 0;
    }
    .pillar-card p {
      color: var(--text-muted);
      font-size: 0.95rem;
      margin: 0 0 20px 0;
    }
    .pillar-link {
      color: var(--electric-glow);
      font-size: 0.88rem;
      font-weight: 600;
    }

    /* DEDICATED SERVICE DEEP-DIVE (2x2 clean grid for 4 focused items) */
    .service-deep-dive {
      background: rgba(15, 23, 42, 0.9);
      border: 1px solid rgba(14, 165, 233, 0.35);
      border-radius: 20px;
      padding: 40px;
    }
    .deep-dive-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      padding-bottom: 28px;
      margin-bottom: 28px;
      border-bottom: 1px solid var(--border-subtle);
    }
    .deep-dive-header h3 {
      font-size: 1.75rem;
      margin: 0;
    }
    .capabilities-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
    .cap-item {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--border-subtle);
      padding: 18px 22px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .cap-num {
      color: var(--electric-blue);
      font-weight: 800;
      font-size: 0.9rem;
    }
    .cap-text {
      font-weight: 600;
      font-size: 0.96rem;
    }

    /* WHO WE SUPPORT & ABOUT */
    .spacer-lg { height: 72px; }
    .why-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }
    .why-card {
      background: var(--card-surface);
      border: 1px solid var(--border-subtle);
      padding: 28px;
      border-radius: 14px;
    }
    .why-card h4 {
      margin: 0 0 10px 0;
      color: var(--electric-glow);
      font-size: 1.15rem;
    }
    .why-card p {
      margin: 0;
      color: var(--text-muted);
      font-size: 0.95rem;
    }

    .about-box {
      max-width: 860px;
    }
    .about-body {
      font-size: 1.1rem;
      color: var(--text-muted);
      margin-bottom: 28px;
    }
    .mission-card {
      background: rgba(14, 165, 233, 0.08);
      border-left: 4px solid var(--electric-blue);
      padding: 24px;
      border-radius: 0 12px 12px 0;
    }
    .mission-card p { margin: 8px 0 0 0; font-size: 1.05rem; }

    /* CONTACT FORM */
    .project-form {
      background: var(--card-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 20px;
      padding: 40px;
    }
    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin-bottom: 28px;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .form-group.full-width {
      grid-column: span 2;
    }
    .form-group label {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-muted);
    }
    .form-group input, .form-group select, .form-group textarea {
      background: rgba(6, 13, 26, 0.8);
      border: 1px solid var(--border-subtle);
      color: var(--text-main);
      padding: 12px 14px;
      border-radius: 8px;
      font-size: 0.95rem;
      font-family: inherit;
    }
    .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
      outline: none;
      border-color: var(--electric-blue);
    }
    .form-actions {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
    }
    .form-success {
      margin-top: 20px;
      padding: 16px;
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.4);
      border-radius: 8px;
      color: #34d399;
      font-weight: 600;
    }

    /* FOOTER */
    .site-footer {
      border-top: 1px solid var(--border-subtle);
      padding: 40px 0;
      background: #040914;
      position: relative;
      z-index: 2;
    }
    .footer-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;
    }
    .footer-brand p {
      margin: 6px 0 0 0;
      color: var(--text-muted);
      font-size: 0.85rem;
    }
    .footer-legal {
      display: flex;
      gap: 24px;
    }
    .footer-legal a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.9rem;
    }
    .footer-legal a:hover { color: var(--electric-glow); }
    .legal-drawer {
      margin-top: 24px;
      padding: 24px;
      background: var(--bg-charcoal);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
    }

    @media (max-width: 992px) {
      .main-nav { display: none; }
      .onsite-layout, .pillars-grid, .capabilities-grid, .why-grid {
        grid-template-columns: 1fr;
      }
      .form-grid { grid-template-columns: 1fr; }
      .form-group.full-width { grid-column: span 1; }
    }
  `]
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('bgCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  lang = signal<Lang>('de');
  t = computed(() => CONTENT[this.lang()]);

  serviceKeys: ServiceKey[] = ['av', 'ds', 'it'];
  activeService = signal<ServiceKey>('av');
  activeCategory = computed(() => this.t().expertise.categories[this.activeService()]);

  legalModal = signal<'impressum' | 'privacy' | null>(null);
  formSubmitted = signal(false);
  currentYear = new Date().getFullYear();

  formData = {
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'On-Site Management & Projektkoordination',
    location: '',
    date: '',
    description: ''
  };

  private scrollProgress = 0;
  private animId = 0;
  private nodes: TechNode[] = [];
  private time = 0;

  toggleLang() {
    this.lang.set(this.lang() === 'de' ? 'en' : 'de');
  }

  selectService(key: ServiceKey) {
    this.activeService.set(key);
  }

  prefillService(serviceName: string) {
    this.formData.service = serviceName;
  }

  toggleLegal(type: 'impressum' | 'privacy') {
    this.legalModal.set(this.legalModal() === type ? null : type);
  }

  isSending = signal(false);
  formError = signal(false);
  requestType = 'Quote';
  selectedFile: File | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  async submitForm(event: Event) {
    event.preventDefault();
    if (!this.formData.name || !this.formData.email || !this.formData.description) {
      alert(this.lang() === 'de' ? 'Bitte füllen Sie alle Pflichtfelder (*) aus.' : 'Please fill in all required fields (*).');
      return;
    }

    this.isSending.set(true);
    this.formError.set(false);

    const payload = new FormData();
    payload.append('access_key', '53a265c0-284d-44d4-8e75-b0ae21e80c42');
    payload.append('subject', `Neue INFAVO Anfrage (${this.requestType}) von ${this.formData.company || this.formData.name}`);
    payload.append('Anfrage-Typ', this.requestType);
    payload.append('Name', this.formData.name);
    payload.append('Unternehmen', this.formData.company);
    payload.append('E-Mail', this.formData.email);
    payload.append('Telefon', this.formData.phone);
    payload.append('Fachbereich', this.formData.service);
    payload.append('Standort', this.formData.location);
    payload.append('Wunschdatum', this.formData.date);
    payload.append('Projektbeschreibung', this.formData.description);

    if (this.selectedFile) {
      payload.append('attachment', this.selectedFile);
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: payload
      });

      const result = await response.json();
      if (response.ok && result.success) {
        this.formSubmitted.set(true);
        this.formData = {
          name: '', company: '', email: '', phone: '',
          service: 'On-Site Management & Projektkoordination', location: '', date: '', description: ''
        };
        this.selectedFile = null;
        setTimeout(() => this.formSubmitted.set(false), 8000);
      } else {
        this.formError.set(true);
      }
    } catch {
      this.formError.set(true);
    } finally {
      this.isSending.set(false);
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
  }

  @HostListener('window:resize')
  onResize() {
    if (this.canvasRef) this.initNodes();
  }

  ngAfterViewInit() {
    this.initNodes();
    this.renderCanvas();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animId);
  }

  private initNodes() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cols = 10;
    const rows = 6;
    this.nodes = [];
    let count = 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const gx = (canvas.width / (cols + 1)) * (c + 1);
        const gy = (canvas.height / (rows + 1)) * (r + 1);
        this.nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          gridX: gx,
          gridY: gy,
          idx: count++
        });
      }
    }
  }

  private renderCanvas = () => {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    this.time += 0.025;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const p = this.scrollProgress;
    const avWaveWeight = p < 0.5 ? Math.min(1, p * 2.5) : Math.max(0, 1 - (p - 0.5) * 2.5);
    const dsGridWeight = p > 0.45 ? Math.min(1, (p - 0.45) * 2.2) : 0;

    const positions: { x: number; y: number }[] = [];

    this.nodes.forEach((n) => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

      const waveX = (n.idx / this.nodes.length) * canvas.width;
      const waveY = canvas.height / 2 + Math.sin(waveX * 0.01 + this.time + (n.idx % 3)) * 90;

      let dx = n.x * (1 - avWaveWeight) + waveX * avWaveWeight;
      let dy = n.y * (1 - avWaveWeight) + waveY * avWaveWeight;

      dx = dx * (1 - dsGridWeight) + n.gridX * dsGridWeight;
      dy = dy * (1 - dsGridWeight) + n.gridY * dsGridWeight;

      positions.push({ x: dx, y: dy });

      ctx.fillStyle = n.idx % 12 === 0 ? '#f59e0b' : '#0ea5e9';
      ctx.beginPath();
      ctx.arc(dx, dy, dsGridWeight > 0.5 ? 3 : 2, 0, Math.PI * 2);
      ctx.fill();
    });

    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dist = Math.hypot(positions[j].x - positions[i].x, positions[j].y - positions[i].y);
        if (dist < 135) {
          ctx.strokeStyle = `rgba(14, 165, 233, ${(1 - dist / 135) * 0.22})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(positions[i].x, positions[i].y);
          ctx.lineTo(positions[j].x, positions[j].y);
          ctx.stroke();
        }
      }
    }

    this.animId = requestAnimationFrame(this.renderCanvas);
  };
}
