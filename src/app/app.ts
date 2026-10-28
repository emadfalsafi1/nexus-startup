import { Component, ElementRef, ViewChild, AfterViewInit, signal, computed, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Lang = 'de' | 'en';
type ServiceKey = 'it' | 'av' | 'ds';

const CONTENT = {
  de: {
    tagline: 'Your Partner in Technology.',
    brandPos: 'Technology Services Provider',
    nav: {
      home: 'Home',
      it: 'IT Services',
      av: 'AV Solutions',
      ds: 'Digital Signage',
      field: 'Engineering & Field',
      partners: 'Für Partner',
      about: 'Über uns',
      contact: 'Kontakt',
      cta: 'Angebot anfordern'
    },
    hero: {
      headline: 'Technologie, die funktioniert. Service, dem Sie vertrauen können.',
      subheadline: 'Professionelle IT-, AV- & Digital Signage-Services in ganz Deutschland.',
      body: 'Von Engineering und Systemintegration bis hin zu Installation, Rollout und laufendem technischem Support liefert INFAVO zuverlässige Technologiedienstleistungen für Unternehmen, Systemintegratoren und Technologiepartner.',
      primaryBtn: 'Services entdecken',
      secondaryBtn: 'Projekt besprechen',
      quickRouteLabel: 'Direkt zum Fachbereich:'
    },
    expertise: {
      eyebrow: 'UNSERE KOMPETENZEN',
      title: 'Drei Kernbereiche. Ein verlässlicher Technologiepartner.',
      subtitle: 'Wählen Sie Ihren Fokusbereich für detaillierte Leistungsmerkmale oder entdecken Sie unser gesamtes Spektrum.',
      selectBtn: 'Leistungen im Detail ansehen →',
      requestBtn: 'Projekt in diesem Bereich anfragen',
      categories: {
        it: {
          code: 'IT',
          title: 'IT Solutions & Services',
          short: 'IT-Infrastruktur, Netzwerkinstallation & -konfiguration, Workplace-Technologie, Hardware-Rollouts, Troubleshooting und technischer Support.',
          items: [
            'IT-Infrastruktur & Netzwerk-Services',
            'Netzwerkinstallation & -konfiguration',
            'IT-Hardware-Rollout & Austausch',
            'End-User Computing & Workplace Support',
            'On-Site & Remote Technical Support',
            'Strukturierte Verkabelung & Konnektivität',
            'Break & Fix Services',
            'IT-Projekt-Rollouts & Bereitstellung',
            'Smart Hands & Remote Hands'
          ]
        },
        av: {
          code: 'AV',
          title: 'Professional AV Solutions',
          short: 'Professionelle Audio- und Videosysteme, Konferenzraumtechnik, Videokonferenzen, AV-Integration, Inbetriebnahme und Engineering.',
          items: [
            'Professionelle Audio- & Videosysteme',
            'AV-Systeminstallation & Integration',
            'Meeting- & Konferenzraum-Technologie',
            'Videokonferenz-Lösungen',
            'Audio-DSP & Steuerungssysteme',
            'Q-SYS & vernetzte AV-Lösungen',
            'AV-Engineering & Inbetriebnahme (Commissioning)',
            'AV-Troubleshooting & Wartung',
            'AV-System-Upgrades & Modernisierung'
          ]
        },
        ds: {
          code: 'DS',
          title: 'Digital Signage Solutions',
          short: 'Kommerzielle Displays, Digital Signage Installationen, Media-Player-Rollouts, Videowände, Systemintegration und laufende Wartung.',
          items: [
            'Digital Signage Installation & Integration',
            'Rollout kommerzieller Displays',
            'Media-Player Installation & Konfiguration',
            'LED-Wände & Video-Wall-Systeme',
            'Digital Signage Netzwerkanbindung',
            'Troubleshooting bei der Content-Wiedergabe',
            'Hardware-Austausch & Break & Fix',
            'Multi-Site Digital Signage Rollouts',
            'Präventive & korrektive Wartung'
          ]
        }
      }
    },
    field: {
      eyebrow: 'ENGINEERING & FIELD SERVICES',
      title: 'Technische Expertise. Überall dort, wo Sie sie brauchen.',
      intro: 'INFAVO bietet flexible Engineering- und technische Vor-Ort-Services zur Unterstützung von Technologie-Rollouts, Installationen und dem laufenden Servicebetrieb.',
      capabilities: [
        'Field Engineer Dispatch (Vor-Ort-Entsendung)',
        'On-Site Technical Support',
        'Engineering- & Technik-Ressourcen',
        'Installations- & Deployment-Services',
        'Break & Fix & Troubleshooting',
        'Site Surveys & Technische Standortanalysen',
        'Inbetriebnahme & Systemverifizierung',
        'Präventive Wartung (Preventive Maintenance)',
        'SLA-basierte Support-Vereinbarungen',
        'Multi-Site Projektkoordination',
        'White-Label Technical Services'
      ],
      note: 'Hinweis: Leistungen und Reaktionszeiten werden individuell nach Projektanforderungen und Ressourcenverfügbarkeit vereinbart.'
    },
    partners: {
      eyebrow: 'FOR TECHNOLOGY PARTNERS (B2B & SUBCONTRACTING)',
      title: 'Ihr technischer Umsetzungspartner in Deutschland.',
      subtitle: 'Erweitern Sie Ihre Servicekapazitäten mit INFAVO.',
      intro: 'Wir unterstützen IT-Dienstleister, AV-Integratoren, Digital-Signage-Unternehmen, Managed Service Provider und internationale Technologieorganisationen mit Engineering-Ressourcen, Projektabwicklung und technischem Vor-Ort-Service. Ob einzelner Ingenieur für einen dringenden Einsatz oder koordiniertes Technik-Team für einen Multi-Site-Rollout – INFAVO bietet flexible, projektbasierte Unterstützung.',
      services: [
        'Subcontracted Technical Services',
        'Entsendung von Ingenieuren & Technikern',
        'White-Label Service Delivery (in Ihrem Namen)',
        'Multi-Site Rollout-Unterstützung',
        'Projektbasierte Engineering-Ressourcen',
        'On-Site Troubleshooting & Break & Fix',
        'Installation, Inbetriebnahme & Wartung',
        'Technische Dokumentation & Reporting'
      ],
      cta: 'Partner werden'
    },
    industries: {
      eyebrow: 'BRANCHEN',
      title: 'Technologie-Services für jede Geschäftsumgebung.',
      sectors: [
        'Retail & Filialisten (Multi-Site Stores)',
        'Hospitality, Hotels & Gastronomie',
        'Unternehmenszentralen & Corporate Offices',
        'Gewerbeimmobilien (Commercial Properties)',
        'Bildungs- & Trainingseinrichtungen',
        'Entertainment & Freizeit',
        'Gesundheitswesen & Kliniken',
        'Technologie- & Systemintegrations-Unternehmen'
      ]
    },
    why: {
      eyebrow: 'WARUM INFAVO?',
      title: 'Expertise. Flexibilität. Verlässliche Umsetzung.',
      props: [
        { title: 'Ein Technologiepartner', desc: 'Integrierte Servicekompetenz über IT, Professional AV und Digital Signage hinweg.' },
        { title: 'Flexible Engineering-Ressourcen', desc: 'Zugriff auf technische Spezialisten exakt nach Projektumfang und Anforderung.' },
        { title: 'Projektfokussierte Lieferung', desc: 'Von einzelnen Serviceeinsätzen bis zu koordinierten deutschlandweiten Rollouts.' },
        { title: 'Professionelle Kommunikation', desc: 'Klare Projektkoordination, technisches Reporting und transparente Dokumentation.' },
        { title: 'Partnerorientierter Ansatz', desc: 'Nahtlose Zusammenarbeit mit Technologieanbietern, Integratoren und Geschäftskunden.' },
        { title: 'Fokus auf Deutschland', desc: 'Koordinierte technische Services für Kundenstandorte in ganz Deutschland.' }
      ]
    },
    about: {
      eyebrow: 'ÜBER INFAVO',
      title: 'Technologie-Expertise. Professionelle Service-Ausführung.',
      body: 'INFAVO ist ein in Deutschland ansässiger Technology Services Provider mit Spezialisierung auf IT, professionelle audiovisuelle Systeme und Digital Signage. Wir liefern technische Dienstleistungen für Unternehmen, Systemintegratoren und Technologiepartner – von der Installation über die Systemintegration bis hin zu Fehlersuche und Wartung.',
      missionTitle: 'Unsere Mission',
      mission: 'Unsere Mission ist es, die Umsetzung technologischer Projekte zu vereinfachen, indem wir exakt die richtige technische Expertise mit den jeweiligen Projektanforderungen verbinden.'
    },
    contact: {
      eyebrow: 'KONTAKT & PROJEKTANFRAGEN',
      title: 'Lassen Sie uns Ihr nächstes Projekt realisieren.',
      intro: 'Benötigen Sie technischen Support, einen Installationspartner oder Engineering-Ressourcen für Ihr nächstes Projekt? Teilen Sie uns Ihre Anforderungen mit.',
      fields: {
        name: 'Name *',
        company: 'Unternehmen *',
        email: 'Geschäftliche E-Mail *',
        phone: 'Telefonnummer',
        service: 'Benötigter Bereich *',
        location: 'Projektstandort (Stadt / Region in DE)',
        date: 'Gewünschter Zeitraum / Startdatum',
        desc: 'Projektbeschreibung & Anforderungen *',
        file: 'Projektdatei / Leistungsverzeichnis anhängen (Optional)'
      },
      serviceOptions: [
        'IT Solutions & Services',
        'Professional AV Solutions',
        'Digital Signage Solutions',
        'Engineering & Field Services',
        'B2B Technology Partnership / Subcontracting'
      ],
      buttons: {
        quote: 'Angebot anfordern',
        support: 'Technischen Support anfordern',
        partner: 'Partnerschaft besprechen'
      },
      successMsg: 'Vielen Dank! Ihre Projektanfrage wurde erfasst. Unser Engineering-Team meldet sich in Kürze bei Ihnen.'
    },
    footer: {
      impressum: 'Impressum',
      privacy: 'Datenschutz (DSGVO)',
      rights: 'Alle Rechte vorbehalten.'
    }
  },
  en: {
    tagline: 'Your Partner in Technology.',
    brandPos: 'Technology Services Provider',
    nav: {
      home: 'Home',
      it: 'IT Services',
      av: 'AV Solutions',
      ds: 'Digital Signage',
      field: 'Engineering & Field',
      partners: 'For Partners',
      about: 'About',
      contact: 'Contact',
      cta: 'Request a Quote'
    },
    hero: {
      headline: 'Technology That Works. Service You Can Trust.',
      subheadline: 'Professional IT, AV & Digital Signage Services Across Germany.',
      body: 'From engineering and system integration to installation, deployment and ongoing technical support, INFAVO delivers reliable technology services for businesses, system integrators and technology partners.',
      primaryBtn: 'Explore Our Services',
      secondaryBtn: 'Discuss Your Project',
      quickRouteLabel: 'Jump directly to your specialization:'
    },
    expertise: {
      eyebrow: 'OUR EXPERTISE',
      title: 'Three Core Service Areas. One Reliable Technology Partner.',
      subtitle: 'Select your area of interest to inspect dedicated capabilities or explore our full service portfolio.',
      selectBtn: 'Explore Dedicated Capabilities →',
      requestBtn: 'Request Project in This Area',
      categories: {
        it: {
          code: 'IT',
          title: 'IT Solutions & Services',
          short: 'IT infrastructure, network installation and configuration, workplace technology, hardware deployment, troubleshooting and technical support.',
          items: [
            'IT Infrastructure & Network Services',
            'Network Installation & Configuration',
            'IT Hardware Deployment & Replacement',
            'End-User Computing & Workplace Support',
            'On-Site & Remote Technical Support',
            'Structured Cabling & Connectivity',
            'Break & Fix Services',
            'IT Project Deployment & Rollouts',
            'Smart Hands & Remote Hands'
          ]
        },
        av: {
          code: 'AV',
          title: 'Professional AV Solutions',
          short: 'Professional audio and video systems, meeting room technology, video conferencing, AV integration, system commissioning and technical engineering services.',
          items: [
            'Professional Audio & Video Systems',
            'AV System Installation & Integration',
            'Meeting Room & Conference Room Technology',
            'Video Conferencing Solutions',
            'Audio DSP & Control Systems',
            'Q-SYS & Networked AV Solutions',
            'AV Engineering & Commissioning',
            'AV Troubleshooting & Maintenance',
            'AV System Upgrades & Modernization'
          ]
        },
        ds: {
          code: 'DS',
          title: 'Digital Signage Solutions',
          short: 'Commercial displays, digital signage installations, media player deployment, video walls, system integration, troubleshooting and ongoing maintenance.',
          items: [
            'Digital Signage Installation & Integration',
            'Commercial Display Deployment',
            'Media Player Installation & Configuration',
            'LED Walls & Video Wall Systems',
            'Digital Signage Network Connectivity',
            'Content Playback Troubleshooting',
            'Hardware Replacement & Break & Fix',
            'Multi-Site Digital Signage Rollouts',
            'Preventive & Corrective Maintenance'
          ]
        }
      }
    },
    field: {
      eyebrow: 'ENGINEERING & FIELD SERVICES',
      title: 'Technical Expertise. Wherever You Need It.',
      intro: 'INFAVO provides flexible engineering and technical field services to support technology deployments, installations and service operations.',
      capabilities: [
        'Field Engineer Dispatch',
        'On-Site Technical Support',
        'Engineering & Technical Resources',
        'Installation & Deployment Services',
        'Break & Fix & Troubleshooting',
        'Site Surveys & Technical Assessments',
        'Commissioning & System Verification',
        'Preventive Maintenance',
        'SLA-Based Support Agreements',
        'Multi-Site Project Coordination',
        'White-Label Technical Services'
      ],
      note: 'Note: Services and response times are agreed according to project requirements and resource availability.'
    },
    partners: {
      eyebrow: 'FOR TECHNOLOGY PARTNERS',
      title: 'Your Technical Delivery Partner in Germany.',
      subtitle: 'Extend your service capabilities with INFAVO.',
      intro: 'We support IT service providers, AV integrators, digital signage companies, managed service providers and international technology organizations with engineering resources, project execution and technical service delivery. Whether you need a single engineer for an urgent service call or a coordinated technical team for a multi-site deployment, INFAVO offers flexible project-based support.',
      services: [
        'Subcontracted Technical Services',
        'Engineer & Technician Dispatch',
        'White-Label Service Delivery',
        'Multi-Site Deployment Support',
        'Project-Based Engineering Resources',
        'On-Site Troubleshooting & Break & Fix',
        'Installation, Commissioning & Maintenance',
        'Technical Reporting & Documentation'
      ],
      cta: 'Become a Partner'
    },
    industries: {
      eyebrow: 'INDUSTRIES WE SERVE',
      title: 'Technology Services for Every Business Environment.',
      sectors: [
        'Retail & Multi-Site Stores',
        'Hospitality & Restaurants',
        'Corporate Offices',
        'Commercial Properties',
        'Education & Training Facilities',
        'Entertainment & Leisure',
        'Healthcare Facilities',
        'Technology & System Integration Companies'
      ]
    },
    why: {
      eyebrow: 'WHY INFAVO?',
      title: 'Expertise. Flexibility. Reliable Execution.',
      props: [
        { title: 'One Technology Partner', desc: 'Integrated service capabilities across IT, professional AV and digital signage.' },
        { title: 'Flexible Engineering Resources', desc: 'Access to technical specialists based on project scope and requirements.' },
        { title: 'Project-Focused Delivery', desc: 'From individual service requests to coordinated deployments and rollouts.' },
        { title: 'Professional Communication', desc: 'Clear project coordination, technical reporting and transparent service documentation.' },
        { title: 'Partner-Oriented Approach', desc: 'Flexible collaboration with technology providers, integrators and business customers.' },
        { title: 'Germany-Focused Service Delivery', desc: 'Technical services coordinated for customer sites across Germany, subject to project availability.' }
      ]
    },
    about: {
      eyebrow: 'ABOUT INFAVO',
      title: 'Technology Expertise. Professional Service Delivery.',
      body: 'INFAVO is a Germany-based technology services provider specializing in IT, professional audiovisual systems and digital signage. We deliver technical services to businesses, system integrators and technology partners, supporting projects from installation and deployment to system integration, troubleshooting and maintenance.',
      missionTitle: 'Our Mission',
      mission: 'Our mission is to simplify technology project execution by connecting the right technical expertise with the right project requirements.'
    },
    contact: {
      eyebrow: 'CONTACT & PROJECT REQUESTS',
      title: "Let's Make Your Next Project Happen.",
      intro: 'Need technical support, an installation partner or engineering resources for your next project? Tell us what you need, and our team will review your requirements.',
      fields: {
        name: 'Name *',
        company: 'Company *',
        email: 'Business Email *',
        phone: 'Phone Number',
        service: 'Service Required *',
        location: 'Project Location (City / Region in Germany)',
        date: 'Preferred Date',
        desc: 'Project Description *',
        file: 'File Attachment (Optional)'
      },
      serviceOptions: [
        'IT Solutions & Services',
        'Professional AV Solutions',
        'Digital Signage Solutions',
        'Engineering & Field Services',
        'B2B Technology Partnership / Subcontracting'
      ],
      buttons: {
        quote: 'Request a Quote',
        support: 'Request Technical Support',
        partner: 'Discuss a Partnership'
      },
      successMsg: 'Thank you! Your project request has been received. Our team will review your requirements shortly.'
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
    <!-- STICKY HEADER (Modern und Schlicht) -->
    <header class="site-header">
      <div class="header-inner">
        <!-- Brand Logo (Vector recreation of INFAVO logo) -->
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
            <!-- Main Rounded Play Triangle Body -->
            <path d="M12 18 C12 9, 21 5, 29 9 L85 38 C93 42, 93 52, 85 56 L29 85 C21 89, 12 85, 12 76 Z" fill="url(#navyGrad)" stroke="rgba(56,189,248,0.35)" stroke-width="1.5"/>
            <!-- Dynamic Electric-Blue Inner Chevrons -->
            <path d="M46 21 L57 27 L57 38 L78 44 L46 61 L46 53 L64 44 L46 39 Z" fill="url(#electricGrad)" opacity="0.9"/>
            <!-- Stylized 'i' Stem -->
            <polygon points="27,36 39,30 39,65 27,71" fill="url(#iStemGrad)"/>
            <!-- Golden/Orange Dot of 'i' -->
            <circle cx="33" cy="22" r="6.5" fill="#f59e0b"/>
            <!-- Bottom Base Bar -->
            <path d="M15 89 L88 52 C92 50, 96 55, 91 59 L19 96 C14 98, 11 92, 15 89 Z" fill="url(#navyGrad)" stroke="#0ea5e9" stroke-width="1"/>
          </svg>
          <div class="brand-text">
            <span class="brand-name">INFAVO<span class="tech-dot">.tech</span></span>
            <span class="brand-sub">{{ t().tagline }}</span>
          </div>
        </a>

        <!-- Main Navigation -->
        <nav class="main-nav">
          <a href="#home">{{ t().nav.home }}</a>
          <a href="#expertise" (click)="selectService('it')">{{ t().nav.it }}</a>
          <a href="#expertise" (click)="selectService('av')">{{ t().nav.av }}</a>
          <a href="#expertise" (click)="selectService('ds')">{{ t().nav.ds }}</a>
          <a href="#field">{{ t().nav.field }}</a>
          <a href="#partners">{{ t().nav.partners }}</a>
          <a href="#about">{{ t().nav.about }}</a>
          <a href="#contact">{{ t().nav.contact }}</a>
        </nav>

        <!-- Actions: Language Switch & Primary CTA -->
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

    <!-- DYNAMIC BACKGROUND CANVAS (IT Grid -> AV Waves -> DS Matrix) -->
    <canvas #bgCanvas class="tech-canvas"></canvas>

    <main class="site-main">

      <!-- 1. HERO SECTION -->
      <section id="home" class="section hero-section">
        <div class="container">
          <div class="badge-row">
            <span class="brand-pill">{{ t().brandPos }}</span>
            <span class="market-pill">Germany • B2B & Partners</span>
          </div>
          <h1 class="hero-headline">{{ t().hero.headline }}</h1>
          <p class="hero-subheadline">{{ t().hero.subheadline }}</p>
          <p class="hero-body">{{ t().hero.body }}</p>

          <div class="hero-cta-group">
            <a href="#expertise" class="btn-primary btn-lg">{{ t().hero.primaryBtn }}</a>
            <a href="#contact" class="btn-secondary btn-lg">{{ t().hero.secondaryBtn }}</a>
          </div>

          <!-- Smart Customer Funnel / Direct Path Selector -->
          <div class="quick-funnel">
            <span class="funnel-label">{{ t().hero.quickRouteLabel }}</span>
            <div class="funnel-pills">
              <a href="#service-detail" (click)="selectService('it')" class="funnel-chip" [class.active]="activeService() === 'it'">
                <span class="chip-code">IT</span> IT Solutions & Services
              </a>
              <a href="#service-detail" (click)="selectService('av')" class="funnel-chip" [class.active]="activeService() === 'av'">
                <span class="chip-code">AV</span> Professional AV Solutions
              </a>
              <a href="#service-detail" (click)="selectService('ds')" class="funnel-chip" [class.active]="activeService() === 'ds'">
                <span class="chip-code">DS</span> Digital Signage Solutions
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. OUR EXPERTISE & DEDICATED SERVICE PAGES (Interactive Funnel) -->
      <section id="expertise" class="section">
        <div class="container">
          <div class="section-head">
            <span class="eyebrow">{{ t().expertise.eyebrow }}</span>
            <h2 class="section-title">{{ t().expertise.title }}</h2>
            <p class="section-subtitle">{{ t().expertise.subtitle }}</p>
          </div>

          <!-- 3 Bold Overview Cards -->
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

          <!-- Dedicated Service Deep-Dive View (Page A, B, or C) -->
          <div id="service-detail" class="service-deep-dive">
            <div class="deep-dive-header">
              <div>
                <span class="eyebrow">{{ activeCategory().code }} SPECIALIZATION</span>
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

      <!-- 3. ENGINEERING & FIELD SERVICES -->
      <section id="field" class="section alt-bg">
        <div class="container">
          <div class="section-head">
            <span class="eyebrow">{{ t().field.eyebrow }}</span>
            <h2 class="section-title">{{ t().field.title }}</h2>
            <p class="section-subtitle">{{ t().field.intro }}</p>
          </div>

          <div class="badge-matrix">
            @for (cap of t().field.capabilities; track cap) {
              <div class="matrix-card">
                <span class="check-icon">✓</span>
                <span>{{ cap }}</span>
              </div>
            }
          </div>
          <p class="legal-note">{{ t().field.note }}</p>
        </div>
      </section>

      <!-- 4. FOR TECHNOLOGY PARTNERS (B2B & Subcontracting Highlight) -->
      <section id="partners" class="section">
        <div class="container">
          <div class="partner-banner">
            <div class="partner-content">
              <span class="eyebrow amber">{{ t().partners.eyebrow }}</span>
              <h2 class="section-title">{{ t().partners.title }}</h2>
              <h3 class="partner-sub">{{ t().partners.subtitle }}</h3>
              <p class="partner-intro">{{ t().partners.intro }}</p>
              <a href="#contact" (click)="prefillService('B2B Technology Partnership / Subcontracting')" class="btn-primary">
                {{ t().partners.cta }}
              </a>
            </div>
            <div class="partner-list-box">
              @for (srv of t().partners.services; track srv) {
                <div class="partner-service-row">
                  <span class="bullet-electric"></span>
                  <span>{{ srv }}</span>
                </div>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- 5. INDUSTRIES WE SERVE & 6. WHY INFAVO -->
      <section class="section alt-bg">
        <div class="container">
          <!-- Industries -->
          <div class="section-head">
            <span class="eyebrow">{{ t().industries.eyebrow }}</span>
            <h2 class="section-title">{{ t().industries.title }}</h2>
          </div>
          <div class="industries-grid">
            @for (sector of t().industries.sectors; track sector) {
              <div class="industry-tile">{{ sector }}</div>
            }
          </div>

          <div class="spacer-lg"></div>

          <!-- Why INFAVO -->
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
        </div>
      </section>

      <!-- 7. ABOUT INFAVO -->
      <section id="about" class="section">
        <div class="container">
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

      <!-- 8. CONTACT & PROJECT REQUESTS -->
      <section id="contact" class="section alt-bg">
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
      <input type="text" [(ngModel)]="formData.company" name="company" required placeholder="Tech GmbH" />
    </div>
    <div class="form-group">
      <label>{{ t().contact.fields.email }}</label>
      <input type="email" [(ngModel)]="formData.email" name="email" required placeholder="name@company.de" />
    </div>
    <div class="form-group">
      <label>{{ t().contact.fields.phone }}</label>
      <input type="tel" [(ngModel)]="formData.phone" name="phone" placeholder="+49 ..." />
    </div>
    <div class="form-group">
      <label>{{ t().contact.fields.service }}</label>
      <select [(ngModel)]="formData.service" name="service">
        @for (opt of t().contact.serviceOptions; track opt) {
          <option [value]="opt">{{ opt }}</option>
        }
      </select>
    </div>
    <div class="form-group">
      <label>{{ t().contact.fields.location }}</label>
      <input type="text" [(ngModel)]="formData.location" name="location" placeholder="Frankfurt / München / Bundesweit" />
    </div>
    <div class="form-group">
      <label>{{ t().contact.fields.date }}</label>
      <input type="date" [(ngModel)]="formData.date" name="date" />
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
    <button type="submit" [disabled]="isSending()" (click)="requestType = 'Technical Support'" class="btn-secondary">
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

    <!-- FOOTER (Impressum & DSGVO Compliant Structure) -->
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
      padding: 110px 0;
    }
    .alt-bg {
      background: rgba(15, 23, 42, 0.55);
      border-top: 1px solid var(--border-subtle);
      border-bottom: 1px solid var(--border-subtle);
    }
    .hero-section {
      min-height: 92vh;
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
      font-size: clamp(2.4rem, 5.2vw, 4.4rem);
      font-weight: 800;
      line-height: 1.08;
      letter-spacing: -0.02em;
      margin: 0 0 18px 0;
      max-width: 920px;
    }
    .hero-subheadline {
      font-size: clamp(1.2rem, 2.2vw, 1.65rem);
      color: var(--electric-glow);
      font-weight: 600;
      margin: 0 0 18px 0;
    }
    .hero-body {
      font-size: 1.1rem;
      color: var(--text-muted);
      max-width: 780px;
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
      font-size: clamp(1.9rem, 3.6vw, 2.9rem);
      font-weight: 800;
      margin: 0 0 14px 0;
      letter-spacing: -0.02em;
    }
    .section-subtitle {
      color: var(--text-muted);
      font-size: 1.08rem;
      max-width: 760px;
      margin: 0;
    }

    /* PILLARS (Bold on IT, AV, DS) */
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

    /* DEDICATED SERVICE DEEP-DIVE */
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
      font-size: 1.8rem;
      margin: 0;
    }
    .capabilities-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    .cap-item {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--border-subtle);
      padding: 16px 20px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .cap-num {
      color: var(--electric-blue);
      font-weight: 800;
      font-size: 0.85rem;
    }
    .cap-text {
      font-weight: 600;
      font-size: 0.94rem;
    }

    /* FIELD SERVICES MATRIX */
    .badge-matrix {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    }
    .matrix-card {
      background: var(--card-surface);
      border: 1px solid var(--border-subtle);
      padding: 18px 22px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 600;
    }
    .check-icon {
      color: var(--electric-glow);
      font-weight: 900;
    }
    .legal-note {
      margin-top: 24px;
      font-size: 0.88rem;
      color: var(--text-muted);
      font-style: italic;
    }

    /* PARTNERS B2B */
    .partner-banner {
      background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(11, 56, 102, 0.45) 100%);
      border: 1px solid rgba(56, 189, 248, 0.3);
      border-radius: 24px;
      padding: 48px;
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 40px;
      align-items: center;
    }
    .partner-sub {
      color: var(--electric-glow);
      margin: 0 0 16px 0;
      font-size: 1.25rem;
    }
    .partner-intro {
      color: var(--text-muted);
      margin-bottom: 28px;
    }
    .partner-list-box {
      background: rgba(6, 13, 26, 0.65);
      border: 1px solid var(--border-subtle);
      border-radius: 16px;
      padding: 28px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .partner-service-row {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 600;
      font-size: 0.95rem;
    }
    .bullet-electric {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: var(--amber-accent);
      flex-shrink: 0;
    }

    /* INDUSTRIES & WHY INFAVO */
    .industries-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }
    .industry-tile {
      background: var(--card-surface);
      border: 1px solid var(--border-subtle);
      padding: 22px;
      border-radius: 12px;
      font-weight: 700;
      text-align: center;
      transition: border-color 0.2s;
    }
    .industry-tile:hover {
      border-color: var(--electric-blue);
    }
    .spacer-lg { height: 80px; }
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

    /* ABOUT */
    .about-box {
      max-width: 860px;
    }
    .about-body {
      font-size: 1.12rem;
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
      .pillars-grid, .capabilities-grid, .why-grid, .partner-banner {
        grid-template-columns: 1fr;
      }
      .industries-grid { grid-template-columns: repeat(2, 1fr); }
      .form-grid { grid-template-columns: 1fr; }
      .form-group.full-width { grid-column: span 1; }
    }
  `]
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('bgCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  lang = signal<Lang>('de');
  t = computed(() => CONTENT[this.lang()]);

  serviceKeys: ServiceKey[] = ['it', 'av', 'ds'];
  activeService = signal<ServiceKey>('it');
  activeCategory = computed(() => this.t().expertise.categories[this.activeService()]);

  legalModal = signal<'impressum' | 'privacy' | null>(null);
  formSubmitted = signal(false);
  currentYear = new Date().getFullYear();

  formData = {
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'IT Solutions & Services',
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

    // FormData-Objekt erstellen (unterstützt auch Datei-Anhänge)
    const payload = new FormData();
    
    // HIER DEINEN WEB3FORMS ACCESS KEY EINTRAGEN:
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
      // Wenn du stattdessen Formspree nutzt, ersetze die URL durch 'https://formspree.io/f/DEINE_ID'
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: payload
      });

      const result = await response.json();
      if (response.ok && result.success) {
        this.formSubmitted.set(true);
        // Formular zurücksetzen
        this.formData = {
          name: '', company: '', email: '', phone: '',
          service: 'IT Solutions & Services', location: '', date: '', description: ''
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
    // Morphing between IT Network (top), AV Waves (middle), and Digital Signage Matrix Grid (bottom)
    const avWaveWeight = p < 0.5 ? Math.min(1, p * 2.5) : Math.max(0, 1 - (p - 0.5) * 2.5);
    const dsGridWeight = p > 0.45 ? Math.min(1, (p - 0.45) * 2.2) : 0;

    const positions: { x: number; y: number }[] = [];

    this.nodes.forEach((n) => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

      // AV Acoustic / Signal Wave coordinates
      const waveX = (n.idx / this.nodes.length) * canvas.width;
      const waveY = canvas.height / 2 + Math.sin(waveX * 0.01 + this.time + (n.idx % 3)) * 90;

      let dx = n.x * (1 - avWaveWeight) + waveX * avWaveWeight;
      let dy = n.y * (1 - avWaveWeight) + waveY * avWaveWeight;

      // Digital Signage Video-Wall Matrix coordinates
      dx = dx * (1 - dsGridWeight) + n.gridX * dsGridWeight;
      dy = dy * (1 - dsGridWeight) + n.gridY * dsGridWeight;

      positions.push({ x: dx, y: dy });

      ctx.fillStyle = n.idx % 12 === 0 ? '#f59e0b' : '#0ea5e9';
      ctx.beginPath();
      ctx.arc(dx, dy, dsGridWeight > 0.5 ? 3 : 2, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw subtle Electric-Blue connections
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