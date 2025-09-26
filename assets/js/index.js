document.addEventListener("DOMContentLoaded", () => {
    // Menu hambúrguer
    const burger = document.querySelector(".burger");
    const navLinks = document.querySelector(".nav-links");
    if (burger && navLinks) {
        burger.addEventListener("click", () => {
            burger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });
    }

    // Atualiza ano no footer
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Botão de WhatsApp
    const wa = document.getElementById("wa");
    if (wa) {
        wa.dataset.whatsapp = wa.dataset.whatsapp || "5599999999999"; // Trocar pelo número real
        wa.addEventListener("click", () => {
            const phone = wa.dataset.whatsapp;
            wa.href = `https://wa.me/${phone}`;
        });
    }

    // Formulário (Formspree)
    const form = document.getElementById("leadForm");
    const okMsg = document.getElementById("okMsg");
    const errMsg = document.getElementById("errMsg");
    const FORMSPREE_URL = "https://formspree.io/f/XXXXABCD"; // Troque pelo endpoint real

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            if (okMsg) okMsg.style.display = "none";
            if (errMsg) errMsg.style.display = "none";

            const data = Object.fromEntries(new FormData(form).entries());
            const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

            if (!data.nome || !data.email || !isEmail(data.email)) {
                if (errMsg) errMsg.style.display = "block";
                return;
            }

            try {
                const res = await fetch(FORMSPREE_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", Accept: "application/json" },
                    body: JSON.stringify(data),
                });

                if (!res.ok) throw new Error();
                if (okMsg) okMsg.style.display = "block";
                form.reset();
            } catch {
                if (errMsg) errMsg.style.display = "block";
            }
        });
    }

    // Multi-língua (PT/EN)
    const dicts = {
        pt: {
            'nav.services': 'Serviços', 'nav.framework': 'Framework', 'nav.process': 'Processo', 'nav.contact': 'Contato',
            'hero.eyebrow': 'Especialistas em Salesforce • Sales • Service • Experience',
            'hero.title': 'Arquitetura, desenvolvimento e integrações que aceleram <span class="hl">resultados</span>.',
            'hero.subtitle': 'Implementamos soluções Salesforce do zero ou otimizamos sua org existente com foco em escalabilidade, performance e governança de qualidade incluindo LWC, Apex, APIs REST/SOAP e automações com IA.',
            'hero.ctaPrimary': 'Solicitar diagnóstico gratuito', 'hero.ctaSecondary': 'Ver serviços',
            'hero.kpiClouds': 'Sales • Service • Experience', 'hero.kpiQuality': 'CQ / CI • LWC • Apex', 'hero.kpiIntegrations': 'SAP, DocuSign, Twilio, Stripe…',
            'offer.badge': 'Oferta', 'offer.title': 'Assessment técnico & roadmap', 'offer.desc': 'Avaliação da sua org, qualidade de código e riscos. Entregamos plano de ação e quick wins em 10-15 dias úteis.',
            'offer.item1': 'Revisão de arquitetura, automações e desempenho', 'offer.item2': 'Check de segurança, limites e governança', 'offer.item3': 'Backlog priorizado e esforço estimado', 'offer.cta1': 'Quero meu assessment', 'offer.cta2': 'Conheça Nosso framework',
            'services.title': 'Serviços', 'services.subtitle': 'Atuamos ponta a ponta, da concepção à sustentação.',
            'services.card1.badge': 'Implementação', 'services.card1.title': 'Sales, Service & Experience Cloud', 'services.card1.desc': 'Discovery, desenho de objetos, automações, LWC, fluxos e community sites com foco em UX e governança.',
            'services.card2.badge': 'Integrações', 'services.card2.title': 'APIs REST/SOAP & ETL', 'services.card2.desc': 'Orquestração com Apex/OmniStudio. Experiência com SAP, DocuSign, HubSpot, Twilio, Stripe e webhooks.',
            'services.card3.badge': 'Qualidade', 'services.card3.title': 'Arquitetura & Code Health', 'services.card3.desc': 'Revisões de performance, padrões (Trigger Handler, Service, Factory), testes, PMD e CI.',
            'framework.title': 'Nosso framework de desenvolvimento', 'framework.subtitle': 'Padronizamos entregas e aceleramos time-to-value com um conjunto de práticas, templates e automações.',
            'framework.item1': 'Arquitetura limpa: Trigger Handler, Services, Repos, DTOs, eventos.', 'framework.item2': 'Qualidade contínua: PMD, testes, coverage e code review guiado.', 'framework.item3': 'DevEx & CI: SFDX, GitHub Actions, rotas de deploy (release/main), PMD no PR.', 'framework.item4': 'Observabilidade: logs estruturados, auditoria e alertas.', 'framework.item5': 'Segurança & limites: bulk, FLS/CRUD, limites de governor.',
            'framework.result.badge': 'Resultado', 'framework.result.title': 'Mais velocidade, menos risco', 'framework.result.desc': 'Entregas consistentes, código sustentável e previsibilidade para o negócio.',
            'framework.kpi1.title': ' Velocidade', 'framework.kpi1.desc': 'Templates & CI', 'framework.kpi2.title': ' Retrabalho', 'framework.kpi2.desc': 'Padrões & review', 'framework.kpi3.title': ' Qualidade', 'framework.kpi3.desc': 'Métricas & PMD',
            'process.title': 'Como trabalhamos', 'process.subtitle': 'Transparência, cadência e foco em valor.',
            'process.step1': 'Discovery', 'process.step1.desc': 'Alinhamento de objetivos, riscos e KPIs.', 'process.step2': 'Blueprint', 'process.step2.desc': 'Arquitetura alvo e plano de execução.', 'process.step3': 'Entrega', 'process.step3.desc': 'Sprints curtas, demos e QA contínuo.', 'process.step4': 'Operar', 'process.step4.desc': 'Sustentação, evolução e governança.',
            'contact.title': 'Vamos conversar?', 'contact.subtitle': 'Conte um pouco sobre sua necessidade. Responderemos em breve.',
            'form.name.label': 'Nome *', 'form.email.label': 'E-mail *', 'form.company.label': 'Empresa', 'form.phone.label': 'Telefone/WhatsApp', 'form.interest.label': 'Interesse', 'form.source.label': 'Como nos encontrou?', 'form.message.label': 'Mensagem *',
            'form.interest.opt1': 'Assessment técnico', 'form.interest.opt2': 'Implementação', 'form.interest.opt3': 'Integrações', 'form.interest.opt4': 'Suporte / Sustentação',
            'form.source.opt1': 'LinkedIn', 'form.source.opt2': 'Indicação', 'form.source.opt3': 'Pesquisa Google', 'form.source.opt4': 'Evento',
            'form.required': '* Campos obrigatórios', 'form.submit': 'Enviar', 'form.download': 'Baixar lead (.json)', 'form.success': 'Recebemos seus dados. Entraremos em contato em breve.', 'form.error': 'Verifique os campos obrigatórios e o formato do e-mail.',
            'contact.card.badge': 'Contato', 'contact.card.email': 'E-mail', 'contact.card.site': 'Site', 'contact.card.scope': 'Atuação', 'contact.card.scope.val': 'Brasil e internacional (remoto)',
            'footer.tagline': 'Seu CRM em boas mãos.', 'footer.framework': 'Framework', 'footer.contact': 'Contato'
        },
        en: {
            'nav.services': 'Services', 'nav.framework': 'Framework', 'nav.process': 'Process', 'nav.contact': 'Contact us',
            'hero.eyebrow': 'Salesforce Specialists • Sales • Service • Experience',
            'hero.title': 'Architecture, development, and integrations that accelerate <span class="hl">results</span>.',
            'hero.subtitle': 'We implement Salesforce solutions from scratch or optimize your existing org with scalability, performance, and quality governance including LWC, Apex, REST/SOAP APIs, and AI automations.',
            'hero.ctaPrimary': 'Request free assessment', 'hero.ctaSecondary': 'See services',
            'hero.kpiClouds': 'Sales • Service • Experience ', 'hero.kpiQuality': 'CQ / CI • LWC • Apex', 'hero.kpiIntegrations': 'SAP, DocuSign, Twilio, Stripe…',
            'offer.badge': 'Offer', 'offer.title': 'Technical assessment & roadmap', 'offer.desc': 'We review your org, code quality and risks. Action plan and quick wins delivered within 10–15 business days.',
            'offer.item1': 'Architecture, automations and performance review', 'offer.item2': 'Security, limits and governance checks', 'offer.item3': 'Prioritized backlog with effort sizing', 'offer.cta1': 'I want my assessment', 'offer.cta2': 'Our framework',
            'services.title': 'Services', 'services.subtitle': 'End-to-end delivery, from discovery to support.',
            'services.card1.badge': 'Implementation', 'services.card1.title': 'Sales, Service & Experience Cloud', 'services.card1.desc': 'Object design, automations, LWC, flows and community sites focused on UX and governance.',
            'services.card2.badge': 'Integrations', 'services.card2.title': 'REST/SOAP APIs & ETL', 'services.card2.desc': 'Orchestration with Apex/OmniStudio. Experience with SAP, DocuSign, HubSpot, Twilio, Stripe and webhooks.',
            'services.card3.badge': 'Quality', 'services.card3.title': 'Architecture & Code Health', 'services.card3.desc': 'Performance reviews, patterns (Trigger Handler, Service, Factory), testing, PMD and CI.',
            'framework.title': 'Our development framework', 'framework.subtitle': 'We standardize delivery and speed up time-to-value with practices, templates and automation.',
            'framework.item1': 'Clean architecture: Trigger Handler, Services, Repos, DTOs, events.', 'framework.item2': 'Continuous quality: PMD, tests, coverage and guided code reviews.', 'framework.item3': 'DevEx & CI: SFDX, GitHub Actions, deploy routes (release/main), PMD on PRs.', 'framework.item4': 'Observability: structured logs, audit and alerts.', 'framework.item5': 'Security & limits: bulk, FLS/CRUD, governor limits.',
            'framework.result.badge': 'Result', 'framework.result.title': 'Faster, less risk', 'framework.result.desc': 'Consistent delivery, sustainable code and business predictability.',
            'framework.kpi1.title': ' Speed', 'framework.kpi1.desc': 'Templates & CI', 'framework.kpi2.title': ' Rework', 'framework.kpi2.desc': 'Patterns & reviews', 'framework.kpi3.title': ' Quality', 'framework.kpi3.desc': 'Metrics & PMD',
            'process.title': 'How we work', 'process.subtitle': 'Transparency, cadence and value focus.',
            'process.step1': 'Discovery', 'process.step1.desc': 'Objectives, risks and KPIs alignment.', 'process.step2': 'Blueprint', 'process.step2.desc': 'Target architecture and execution plan.', 'process.step3': 'Delivery', 'process.step3.desc': 'Short sprints, demos and continuous QA.', 'process.step4': 'Operate', 'process.step4.desc': 'Support, evolution and governance.',
            'contact.title': "Let's talk?", 'contact.subtitle': 'Tell us about your needs. We will get back to you soon.',
            'form.name.label': 'Name *', 'form.email.label': 'Email *', 'form.company.label': 'Company', 'form.phone.label': 'Phone/WhatsApp', 'form.interest.label': 'Interest', 'form.source.label': 'How did you find us?', 'form.message.label': 'Message *',
            'form.interest.opt1': 'Technical assessment', 'form.interest.opt2': 'Implementation', 'form.interest.opt3': 'Integrations', 'form.interest.opt4': 'Support / Sustainment',
            'form.source.opt1': 'LinkedIn', 'form.source.opt2': 'Referral', 'form.source.opt3': 'Google Search', 'form.source.opt4': 'Event',
            'form.required': '* Required fields', 'form.submit': 'Send', 'form.download': 'Download lead (.json)', 'form.success': 'Thanks! We will get back to you shortly.', 'form.error': 'Please check required fields and e-mail format.',
            'contact.card.badge': 'Contact', 'contact.card.email': 'Email', 'contact.card.site': 'Website', 'contact.card.scope': 'Coverage', 'contact.card.scope.val': 'Brazil & International (remote)',
            'footer.tagline': 'Your CRM in good hands.', 'footer.framework': 'Framework', 'footer.contact': 'Contact'
        }
    };

    let lang = (document.documentElement.lang || "pt-BR").toLowerCase().startsWith("en") ? "en" : "pt";

    function applyI18n() {
        const d = dicts[lang];
        document.querySelectorAll("[data-i18n]").forEach((el) => {
            const key = el.getAttribute("data-i18n");
            if (!d[key]) return;
            if (key === "hero.title") el.innerHTML = d[key];
            else el.textContent = d[key];
        });
    }
    applyI18n();

    const langBtn = document.getElementById("langToggle");
    if (langBtn) {
        const flags = {
            pt: `<img src="https://flagcdn.com/16x12/br.png" width="16" height="12" alt="Brasil">`,
            en: `<img src="https://flagcdn.com/16x12/us.png" width="16" height="12" alt="USA">`
        };

        const updateLabel = () => { langBtn.innerHTML = flags[lang]; };
        updateLabel();

        langBtn.addEventListener("click", () => {
            lang = lang === "pt" ? "en" : "pt";
            applyI18n();
            updateLabel();
        });
    }
});