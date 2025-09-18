// ===== PORTFOLIO JAVASCRIPT =====
// Main script for Valérian Vandercamme's portfolio

class Portfolio {
    constructor() {
        this.initializeApp();
        this.setupEventListeners();
        this.initializeAnimations();
        this.loadProjects();
    }

    // ===== INITIALIZATION =====
    initializeApp() {
        this.isScrolling = false;
        this.currentFilter = 'all';
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '-50px 0px'
        };
        this.observer = new IntersectionObserver(this.handleIntersection.bind(this), this.observerOptions);

        // Konami Code sequence
        this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        this.konamiSequence = [];

        // Terminal commands
        this.terminalCommands = [
            { command: 'whoami', output: 'valerian_vandercamme' },
            { command: 'pwd', output: '/home/valerian/portfolio' },
            { command: 'ls -la', output: 'drwxr-xr-x  skills/\ndrwxr-xr-x  projects/\ndrwxr-xr-x  experience/\n-rw-r--r--  README.md' },
            { command: 'cat skills.txt', output: '.NET • Azure • Blazor • React\nC# • JavaScript • SQL Server\nDocker • Git • Clean Architecture' },
            { command: 'grep -r "passion" .', output: './about.txt: Développeur passionné\n./motto.txt: Transform ideas into solutions' },
            { command: 'echo $MOTIVATION', output: 'Transformer les idées en solutions élégantes' }
        ];
        this.currentCommandIndex = 0;

        // Typing animation texts
        this.typingTexts = [
            'Développeur .NET Full-Stack',
            'Architecte de solutions',
            'Passionné d\'innovation',
            'Expert Azure & Blazor',
            'Entrepreneur-Developer'
        ];
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;

        this.setupIntersectionObserver();
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.querySelector('.theme-toggle');
        themeToggle?.addEventListener('click', this.toggleTheme.bind(this));

        // Mobile menu
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        mobileToggle?.addEventListener('click', this.toggleMobileMenu.bind(this));

        // Smooth scrolling for navigation
        document.querySelectorAll('.nav-link, .btn[href^="#"]').forEach(link => {
            link.addEventListener('click', this.handleSmoothScroll.bind(this));
        });

        // Project filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', this.filterProjects.bind(this));
        });

        // Contact form
        const contactForm = document.getElementById('contact-form');
        contactForm?.addEventListener('submit', this.handleContactForm.bind(this));

        // Scroll events
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));

        // Resize events
        window.addEventListener('resize', this.throttle(this.handleResize.bind(this), 100));

        // Konami code
        document.addEventListener('keydown', this.handleKonamiCode.bind(this));

        // Modal events
        this.setupModalEvents();

        // Cursor events removed
    }

    // ===== CUSTOM CURSOR (REMOVED) =====
    // Custom cursor functionality has been removed

    // ===== THEME MANAGEMENT =====
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Update theme toggle icon
        const icon = document.querySelector('.theme-toggle i');
        icon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';

        // Add transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    // ===== MOBILE MENU =====
    toggleMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');

        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    }

    // ===== SMOOTH SCROLLING =====
    handleSmoothScroll(e) {
        const href = e.target.getAttribute('href');
        if (href?.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    }

    // ===== ANIMATIONS =====
    initializeAnimations() {
        this.startTypingAnimation();
        this.startTerminalAnimation();
        this.initFloatingIcons();
        this.initCodeRain();
        this.initStatCounters();
        this.initSkillBars();
    }

    startTypingAnimation() {
        const typedTextElement = document.querySelector('.typed-text');
        if (!typedTextElement) return;

        const typeSpeed = 100;
        const deleteSpeed = 50;
        const pauseTime = 2000;

        const type = () => {
            const currentText = this.typingTexts[this.currentTextIndex];

            if (!this.isDeleting) {
                typedTextElement.textContent = currentText.substring(0, this.currentCharIndex + 1);
                this.currentCharIndex++;

                if (this.currentCharIndex === currentText.length) {
                    setTimeout(() => {
                        this.isDeleting = true;
                        type();
                    }, pauseTime);
                    return;
                }

                setTimeout(type, typeSpeed);
            } else {
                typedTextElement.textContent = currentText.substring(0, this.currentCharIndex - 1);
                this.currentCharIndex--;

                if (this.currentCharIndex === 0) {
                    this.isDeleting = false;
                    this.currentTextIndex = (this.currentTextIndex + 1) % this.typingTexts.length;
                }

                setTimeout(type, deleteSpeed);
            }
        };

        type();
    }

    startTerminalAnimation() {
        const commandElement = document.getElementById('terminal-command');
        const outputElement = document.getElementById('terminal-output');

        if (!commandElement || !outputElement) return;

        const executeCommand = () => {
            const currentCommand = this.terminalCommands[this.currentCommandIndex];

            // Clear previous content
            commandElement.textContent = '';
            outputElement.textContent = '';

            // Type command
            this.typeText(commandElement, currentCommand.command, 100, () => {
                // Show output after a pause
                setTimeout(() => {
                    outputElement.textContent = currentCommand.output;

                    // Move to next command
                    setTimeout(() => {
                        this.currentCommandIndex = (this.currentCommandIndex + 1) % this.terminalCommands.length;
                        executeCommand();
                    }, 3000);
                }, 500);
            });
        };

        setTimeout(executeCommand, 1000);
    }

    typeText(element, text, speed, callback) {
        let index = 0;
        const type = () => {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
                setTimeout(type, speed);
            } else if (callback) {
                callback();
            }
        };
        type();
    }

    initFloatingIcons() {
        const container = document.querySelector('.floating-icons');
        if (!container) return;

        const icons = container.querySelectorAll('i');
        icons.forEach((icon, index) => {
            // Random starting position
            icon.style.left = Math.random() * 100 + '%';
            icon.style.animationDelay = Math.random() * 20 + 's';
            icon.style.animationDuration = (15 + Math.random() * 10) + 's';
        });
    }

    initCodeRain() {
        const codeRain = document.querySelector('.code-rain');
        if (!codeRain) return;

        const characters = '01{}</>()[]αβγδεζηθικλμνξοπρστυφχψω';
        const columns = Math.floor(codeRain.offsetWidth / 20);

        for (let i = 0; i < columns; i++) {
            const drop = document.createElement('div');
            drop.style.position = 'absolute';
            drop.style.left = i * 20 + 'px';
            drop.style.color = 'var(--accent-primary)';
            drop.style.fontSize = '14px';
            drop.style.fontFamily = 'var(--font-mono)';
            drop.style.animation = `fall ${5 + Math.random() * 10}s linear infinite`;
            drop.style.animationDelay = Math.random() * 10 + 's';

            const updateDrop = () => {
                drop.textContent = characters[Math.floor(Math.random() * characters.length)];
            };

            updateDrop();
            setInterval(updateDrop, 100);
            codeRain.appendChild(drop);
        }

        // Add falling animation to CSS if not exists
        if (!document.querySelector('#code-rain-styles')) {
            const style = document.createElement('style');
            style.id = 'code-rain-styles';
            style.textContent = `
                @keyframes fall {
                    to {
                        transform: translateY(100vh);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    initStatCounters() {
        const statCards = document.querySelectorAll('.stat-card');

        const animateCounter = (element, target) => {
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, 20);
        };

        statCards.forEach(card => {
            this.observer.observe(card);
            card.addEventListener('animate', () => {
                const numberElement = card.querySelector('.stat-number');
                const target = parseInt(card.dataset.count);
                animateCounter(numberElement, target);
            });
        });
    }

    initSkillBars() {
        const skillItems = document.querySelectorAll('.skill-item');

        skillItems.forEach(item => {
            this.observer.observe(item);
            item.addEventListener('animate', () => {
                const progressBar = item.querySelector('.skill-progress');
                const percentage = item.dataset.level;

                setTimeout(() => {
                    progressBar.style.width = percentage + '%';
                }, 200);
            });
        });
    }

    // ===== INTERSECTION OBSERVER =====
    setupIntersectionObserver() {
        // Observe sections for navigation highlighting
        document.querySelectorAll('section[id]').forEach(section => {
            this.observer.observe(section);
        });

        // Observe timeline items
        document.querySelectorAll('.timeline-item').forEach(item => {
            this.observer.observe(item);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;

                // Add visible class
                element.classList.add('visible');

                // Trigger animations
                if (element.hasAttribute('data-count') || element.classList.contains('skill-item')) {
                    element.dispatchEvent(new CustomEvent('animate'));
                }

                // Update navigation
                if (element.tagName === 'SECTION') {
                    this.updateNavigation(element.id);
                }
            }
        });
    }

    updateNavigation(activeSection) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeSection}`) {
                link.classList.add('active');
            }
        });
    }

    // ===== PROJECT MANAGEMENT =====
    async loadProjects() {
        try {
            const projects = await this.parseProjectReadmes();
            this.renderProjects(projects);
        } catch (error) {
            console.error('Error loading projects:', error);
            this.renderProjectsError();
        }
    }

    async parseProjectReadmes() {
        // Detailed project data with enhanced information for modals
        return [
            {
                title: 'DocuSync',
                description: 'Plateforme de gestion documentaire et automatisation de conformité pour entreprises. Économise 200+ heures mensuelles et assure 100% de préparation audit.',
                type: 'Enterprise',
                category: 'enterprise',
                technologies: ['.NET 8', 'Blazor Server', 'Azure Functions', 'SQL Server', 'Clean Architecture'],
                links: {
                    github: 'https://github.com/Valerian5788/docusync'
                },
                featured: true,
                image: '/assets/projects/docusync.jpg',
                fullDescription: 'DocuSync révolutionne la gestion documentaire en entreprise. Cette plateforme automatise entièrement le cycle de vie des documents, de l\'ingestion à la conformité réglementaire. Grâce à une architecture Clean Architecture robuste et des intégrations Azure poussées, DocuSync garantit une sécurité enterprise-grade tout en offrant une expérience utilisateur intuitive.',
                features: [
                    'Dashboards temps réel avec KPIs de conformité',
                    'Alertes automatisées 30/7 jours avant échéances',
                    'Intégration multi-portails unifiée',
                    'Audit trail complet et GDPR-compliant',
                    'Workflow automatisé avec retry logic',
                    'Authentification Azure AD SSO'
                ],
                metrics: [
                    { value: '200+', label: 'Heures économisées/mois' },
                    { value: '99.9%', label: 'Précision conformité' },
                    { value: '15+', label: 'Portails intégrés' },
                    { value: '85%', label: 'Couverture tests' }
                ],
                challenges: [
                    {
                        title: 'Architecture Multi-tenant Complexe',
                        description: 'Implémentation d\'une sécurité row-level avec isolation parfaite des données clients et gestion granulaire des permissions.'
                    },
                    {
                        title: 'Intégration Hétérogène',
                        description: 'Développement d\'adaptateurs pour 15+ portails avec authentifications, formats et rate limits différents.'
                    },
                    {
                        title: 'Performance Temps Réel',
                        description: 'Optimisation SignalR + Redis pour gérer 10,000+ documents avec mises à jour <200ms.'
                    }
                ],
                techDetails: [
                    { name: '.NET 8', icon: 'fab fa-microsoft' },
                    { name: 'Blazor Server', icon: 'fas fa-fire' },
                    { name: 'Azure Functions', icon: 'fas fa-cloud' },
                    { name: 'SQL Server', icon: 'fas fa-database' },
                    { name: 'Redis', icon: 'fas fa-memory' },
                    { name: 'Docker', icon: 'fab fa-docker' }
                ]
            },
            {
                title: 'CFO Portal',
                description: 'Portail de gestion financière SaaS pour PME. Interface intuitive pour suivi des KPI, reporting automatisé et tableaux de bord en temps réel.',
                type: 'SaaS',
                category: 'saas',
                technologies: ['Blazor Server', 'Entity Framework', 'Azure', 'SignalR'],
                links: {
                    github: 'https://github.com/Valerian5788/cfo-portal'
                },
                featured: true,
                image: '/assets/projects/cfo-portal.jpg',
                fullDescription: 'Plateforme SaaS complète dédiée aux directeurs financiers de PME. Le CFO Portal centralise tous les indicateurs financiers essentiels dans une interface moderne et responsive. Développé avec Blazor Server pour une expérience temps réel optimale.',
                features: [
                    'Tableaux de bord financiers personnalisables',
                    'Reporting automatisé multi-format',
                    'Alertes intelligentes sur seuils critiques',
                    'Intégration comptabilité et banques',
                    'Prévisions de trésorerie IA',
                    'Collaboration équipe temps réel'
                ],
                metrics: [
                    { value: '50+', label: 'PME utilisatrices' },
                    { value: '90%', label: 'Gain de temps reporting' },
                    { value: '24/7', label: 'Disponibilité' },
                    { value: '3s', label: 'Temps de chargement' }
                ],
                challenges: [
                    {
                        title: 'Architecture SaaS Scalable',
                        description: 'Conception d\'une architecture multi-tenant avec isolation des données et montée en charge automatique.'
                    },
                    {
                        title: 'Intégrations Bancaires',
                        description: 'Développement de connecteurs sécurisés pour les principales banques avec synchronisation temps réel.'
                    }
                ],
                techDetails: [
                    { name: 'Blazor Server', icon: 'fas fa-fire' },
                    { name: 'Entity Framework', icon: 'fas fa-server' },
                    { name: 'Azure', icon: 'fas fa-cloud' },
                    { name: 'SignalR', icon: 'fas fa-satellite-dish' },
                    { name: 'Chart.js', icon: 'fas fa-chart-line' },
                    { name: 'Bootstrap', icon: 'fab fa-bootstrap' }
                ]
            },
            {
                title: 'CFO Task Manager',
                description: 'Système de gestion des tâches intégré au portail CFO. Workflow automatisé, notifications intelligentes et collaboration équipe.',
                type: 'SaaS',
                category: 'saas',
                technologies: ['ASP.NET Core', 'React', 'Azure Service Bus', 'Redis'],
                links: {
                    github: 'https://github.com/Valerian5788/cfo-tasks'
                },
                featured: false,
                image: '/assets/projects/cfo-tasks.jpg',
                fullDescription: 'Extension du CFO Portal dédiée à la gestion des tâches financières. Automatise les workflows métiers complexes avec un système de notifications intelligent et une collaboration d\'équipe avancée.',
                features: [
                    'Workflows financiers automatisés',
                    'Notifications push intelligentes',
                    'Collaboration temps réel',
                    'Templates de processus prêts',
                    'Intégration calendrier',
                    'Reporting de productivité'
                ],
                metrics: [
                    { value: '75%', label: 'Réduction temps admin' },
                    { value: '100%', label: 'Tâches tracées' },
                    { value: '48h', label: 'Délai moyen traitement' },
                    { value: '15+', label: 'Intégrations actives' }
                ],
                challenges: [
                    {
                        title: 'Workflow Engine Complexe',
                        description: 'Développement d\'un moteur de workflow flexible pour s\'adapter aux processus métiers variés des PME.'
                    }
                ],
                techDetails: [
                    { name: 'ASP.NET Core', icon: 'fas fa-server' },
                    { name: 'React', icon: 'fab fa-react' },
                    { name: 'Azure Service Bus', icon: 'fas fa-bus' },
                    { name: 'Redis', icon: 'fas fa-memory' },
                    { name: 'TypeScript', icon: 'fab fa-js' },
                    { name: 'SCSS', icon: 'fab fa-sass' }
                ]
            },
            {
                title: 'Inline Coaching Assistant',
                description: 'Assistant IA pour coaching en temps réel. Analyse comportementale, suggestions personnalisées et suivi de progression automatique.',
                type: 'IA/ML',
                category: 'ai',
                technologies: ['Python', 'Azure Cognitive Services', '.NET API', 'ML.NET'],
                links: {
                    github: 'https://github.com/Valerian5788/coaching-assistant'
                },
                featured: true,
                image: '/assets/projects/coaching-assistant.jpg',
                fullDescription: 'Assistant intelligent utilisant l\'IA pour fournir un coaching personnalisé en temps réel. Analyse les patterns comportementaux et propose des suggestions d\'amélioration adaptées à chaque utilisateur.',
                features: [
                    'Analyse comportementale en temps réel',
                    'Suggestions personnalisées IA',
                    'Suivi de progression automatique',
                    'Insights basés sur ML.NET',
                    'Interface conversationnelle',
                    'Rapports de coaching détaillés'
                ],
                metrics: [
                    { value: '85%', label: 'Précision IA' },
                    { value: '300ms', label: 'Temps réponse' },
                    { value: '95%', label: 'Satisfaction users' },
                    { value: '40%', label: 'Amélioration perf' }
                ],
                challenges: [
                    {
                        title: 'Machine Learning Pipeline',
                        description: 'Développement d\'un pipeline ML robuste avec Azure Cognitive Services pour l\'analyse comportementale temps réel.'
                    },
                    {
                        title: 'Natural Language Processing',
                        description: 'Intégration NLP avancé pour comprendre et répondre aux questions complexes des utilisateurs.'
                    }
                ],
                techDetails: [
                    { name: 'Python', icon: 'fab fa-python' },
                    { name: 'ML.NET', icon: 'fas fa-brain' },
                    { name: 'Azure Cognitive', icon: 'fas fa-cloud' },
                    { name: '.NET API', icon: 'fab fa-microsoft' },
                    { name: 'TensorFlow', icon: 'fas fa-project-diagram' },
                    { name: 'Docker', icon: 'fab fa-docker' }
                ]
            },
            {
                title: 'MCP Compta',
                description: 'Solution d\'automatisation comptable avec OCR avancé. Traitement automatique des factures, rapprochement bancaire et reporting.',
                type: 'Automation',
                category: 'automation',
                technologies: ['C#', 'Azure Form Recognizer', 'Power Automate', 'SQL Server'],
                links: {
                    github: 'https://github.com/Valerian5788/mcp-compta'
                },
                featured: false,
                image: '/assets/projects/mcp-compta.jpg',
                fullDescription: 'Solution d\'automatisation comptable révolutionnaire utilisant l\'OCR et l\'IA pour automatiser le traitement des documents comptables. Réduit drastiquement les tâches manuelles répétitives.',
                features: [
                    'OCR intelligent documents comptables',
                    'Rapprochement bancaire automatique',
                    'Workflows Power Automate',
                    'Validation règles métier',
                    'Reporting conformité',
                    'Intégration ERP existants'
                ],
                metrics: [
                    { value: '95%', label: 'Précision OCR' },
                    { value: '80%', label: 'Réduction saisie manuelle' },
                    { value: '24h', label: 'Traitement automatique' },
                    { value: '99%', label: 'Conformité DGFIP' }
                ],
                challenges: [
                    {
                        title: 'OCR Haute Précision',
                        description: 'Optimisation d\'Azure Form Recognizer pour atteindre 95%+ de précision sur documents comptables variés.'
                    },
                    {
                        title: 'Règles Métier Complexes',
                        description: 'Implémentation de règles comptables françaises complexes avec validation automatique.'
                    }
                ],
                techDetails: [
                    { name: 'C#', icon: 'fab fa-microsoft' },
                    { name: 'Azure Form Recognizer', icon: 'fas fa-file-text' },
                    { name: 'Power Automate', icon: 'fas fa-cogs' },
                    { name: 'SQL Server', icon: 'fas fa-database' },
                    { name: 'Azure Functions', icon: 'fas fa-bolt' },
                    { name: 'REST APIs', icon: 'fas fa-exchange-alt' }
                ]
            },
            {
                title: 'FreeScraping',
                description: 'Outil d\'analyse du marché freelance avec interface GUI Python. Scraping automatique de Free-Work.com, analyse des tendances hebdomadaires et visualisation interactive.',
                type: 'Automation',
                category: 'automation',
                technologies: ['Python', 'BeautifulSoup4', 'Tkinter', 'Pandas', 'Matplotlib'],
                links: {
                    github: 'https://github.com/Valerian5788/freeScraping'
                },
                featured: false,
                image: '/assets/projects/freescraping.jpg',
                fullDescription: 'Application Python GUI pour analyser et tracker les tendances du marché freelance depuis Free-Work.com. Outil de veille concurrentielle avec scraping respectueux, analyse de données et visualisation interactive pour optimiser les stratégies freelance.',
                features: [
                    'Scraping automatique temps réel des offres Free-Work.com',
                    'Interface utilisateur tkinter intuitive',
                    'Analyse des tendances par semaine',
                    'Graphiques interactifs avec matplotlib',
                    'Intelligence marché pour technologies demandées',
                    'Recherche par mots-clés spécialisés'
                ],
                metrics: [
                    { value: '100%', label: 'Automatisation scraping' },
                    { value: '1000+', label: 'Offres analysées' },
                    { value: '10+', label: 'Technologies trackées' },
                    { value: '95%', label: 'Précision tendances' }
                ],
                challenges: [
                    {
                        title: 'Scraping Respectueux et Efficace',
                        description: 'Implémentation d\'un scraping avec gestion de pagination automatique, respect des délais et gestion robuste des erreurs réseau.'
                    },
                    {
                        title: 'Analyse Temporelle Intelligente',
                        description: 'Développement d\'algorithmes d\'agrégation hebdomadaire et de visualisation de séries temporelles pour identifier les tendances marché.'
                    }
                ],
                techDetails: [
                    { name: 'Python 3', icon: 'fab fa-python' },
                    { name: 'BeautifulSoup4', icon: 'fas fa-code' },
                    { name: 'Tkinter', icon: 'fas fa-desktop' },
                    { name: 'Pandas', icon: 'fas fa-chart-bar' },
                    { name: 'Matplotlib', icon: 'fas fa-chart-line' },
                    { name: 'SQLite', icon: 'fas fa-database' }
                ]
            },
            {
                title: 'Twitter Analyzer',
                description: 'Application full-stack combinant extension Chrome et API .NET pour collecter et analyser automatiquement les tweets avec classification de sentiment par IA.',
                type: 'IA/ML',
                category: 'ai',
                technologies: ['Extension Chrome', 'ASP.NET Core', '.NET 8', 'JavaScript ES6+', 'OpenAPI'],
                links: {
                    github: 'https://github.com/Valerian5788/twitter-analyzer'
                },
                featured: true,
                image: '/assets/projects/twitter-analyzer.jpg',
                fullDescription: 'Solution full-stack innovante combinant une extension Chrome pour collecter les tweets en temps réel et une API .NET pour l\'analyse de sentiment. Démontre l\'intégration navigateur-backend avec pipeline de données automatisé.',
                features: [
                    'Extension Chrome avec détection automatique tweets',
                    'Stockage local avec prévention doublons',
                    'API .NET 8 pour classification sentiment',
                    'Architecture async non-bloquante',
                    'Documentation Swagger/OpenAPI complète',
                    'Pipeline données temps réel navigateur→backend'
                ],
                metrics: [
                    { value: '100%', label: 'Automatisation collecte' },
                    { value: '<500ms', label: 'Temps traitement API' },
                    { value: 'Manifest v3', label: 'Standard Chrome' },
                    { value: '0%', label: 'Perte de données' }
                ],
                challenges: [
                    {
                        title: 'Extension Chrome Manifest v3',
                        description: 'Migration vers les derniers standards Chrome avec Service Workers, gestion des permissions et API modernes.'
                    },
                    {
                        title: 'Pipeline Temps Réel',
                        description: 'Synchronisation entre extension navigateur et backend API avec gestion des états et persistence locale.'
                    },
                    {
                        title: 'Architecture Full-Stack',
                        description: 'Intégration transparente JavaScript/C# avec sérialisation JSON et gestion d\'erreurs cross-platform.'
                    }
                ],
                techDetails: [
                    { name: 'Chrome Extension', icon: 'fab fa-chrome' },
                    { name: 'ASP.NET Core', icon: 'fab fa-microsoft' },
                    { name: '.NET 8', icon: 'fas fa-server' },
                    { name: 'JavaScript ES6+', icon: 'fab fa-js' },
                    { name: 'Swagger/OpenAPI', icon: 'fas fa-book' },
                    { name: 'MutationObserver', icon: 'fas fa-eye' }
                ]
            },
            {
                title: 'BlogPictures',
                description: 'Assistant IA pour créateurs de contenu utilisant OpenAI GPT pour analyser les articles de blog et suggérer des emplacements d\'images stratégiques.',
                type: 'IA/ML',
                category: 'ai',
                technologies: ['Blazor WebAssembly', '.NET 8/9', 'OpenAI GPT', 'MudBlazor', 'ASP.NET Core'],
                links: {
                    github: 'https://github.com/Valerian5788/blogpictures'
                },
                featured: true,
                image: '/assets/projects/blogpictures.jpg',
                fullDescription: 'Application web moderne utilisant l\'IA OpenAI pour analyser le contenu de blog et suggérer intelligemment des emplacements d\'images. Architecture Blazor WebAssembly avec backend API pour optimiser l\'engagement du contenu.',
                features: [
                    'Analyse IA powered by OpenAI GPT-3.5-turbo',
                    'Suggestions d\'images avec contexte détaillé',
                    'Interface Blazor WebAssembly moderne',
                    'Composants MudBlazor responsive',
                    'Prévisualisation avec marqueurs de position',
                    'API .NET Core avec documentation Swagger'
                ],
                metrics: [
                    { value: '90%', label: 'Précision suggestions IA' },
                    { value: '<3s', label: 'Temps analyse' },
                    { value: '100%', label: 'Interface responsive' },
                    { value: '5+', label: 'Images par article' }
                ],
                challenges: [
                    {
                        title: 'Intégration OpenAI Sophistiquée',
                        description: 'Optimisation des prompts GPT pour générer des suggestions d\'images contextuelles et pertinentes avec gestion des tokens et rate limiting.'
                    },
                    {
                        title: 'Architecture Hybride .NET 8/9',
                        description: 'Backend API .NET 8 stable avec frontend Blazor WebAssembly .NET 9 cutting-edge pour démontrer la maîtrise multi-versions.'
                    },
                    {
                        title: 'UX Créateur de Contenu',
                        description: 'Design d\'interface intuitive pour les créateurs avec prévisualisation temps réel et workflow optimisé.'
                    }
                ],
                techDetails: [
                    { name: 'Blazor WebAssembly', icon: 'fas fa-fire' },
                    { name: '.NET 8/9', icon: 'fab fa-microsoft' },
                    { name: 'OpenAI GPT', icon: 'fas fa-brain' },
                    { name: 'MudBlazor', icon: 'fas fa-palette' },
                    { name: 'ASP.NET Core', icon: 'fas fa-server' },
                    { name: 'Swagger/OpenAPI', icon: 'fas fa-book' }
                ]
            },
            {
                title: 'InternalTasks',
                description: 'Application desktop WPF moderne avec calendrier hebdomadaire interactif pour la gestion de tâches. Architecture MVVM pure avec interface utilisateur intuitive.',
                type: 'Desktop',
                category: 'enterprise',
                technologies: ['WPF', '.NET 8', 'MVVM', 'C#', 'CommunityToolkit.Mvvm'],
                links: {
                    github: 'https://github.com/Valerian5788/internaltasks'
                },
                featured: false,
                image: '/assets/projects/internaltasks.jpg',
                fullDescription: 'Application desktop WPF sophistiquée pour la gestion de tâches avec vue calendaire hebdomadaire. Implémentation MVVM exemplaire avec architecture propre et interface utilisateur moderne pour la productivité en entreprise.',
                features: [
                    'Calendrier hebdomadaire interactif (Lun-Ven, 7h-18h)',
                    'Création tâches par clic sur créneaux horaires',
                    'Architecture MVVM avec CommunityToolkit.Mvvm',
                    'Interface moderne avec contrôles WPF personnalisés',
                    'Validation temps réel et feedback utilisateur',
                    'Design responsive avec grille dynamique'
                ],
                metrics: [
                    { value: '100%', label: 'Architecture MVVM' },
                    { value: '30min', label: 'Créneaux horaires' },
                    { value: '5', label: 'Jours ouvrables' },
                    { value: '0', label: 'Code-behind UI' }
                ],
                challenges: [
                    {
                        title: 'MVVM Pur sans Framework Lourd',
                        description: 'Implémentation MVVM clean avec CommunityToolkit.Mvvm, separation parfaite des responsabilités et data binding avancé.'
                    },
                    {
                        title: 'Interface Calendrier Complexe',
                        description: 'Développement de contrôles WPF personnalisés pour visualisation calendaire avec gestion des créneaux et interactions utilisateur.'
                    },
                    {
                        title: 'Performance et Réactivité',
                        description: 'Optimisation de l\'interface pour une réactivité maximale avec gestion mémoire efficace et pattern Observer.'
                    }
                ],
                techDetails: [
                    { name: 'WPF', icon: 'fas fa-window-maximize' },
                    { name: '.NET 8', icon: 'fab fa-microsoft' },
                    { name: 'MVVM Pattern', icon: 'fas fa-sitemap' },
                    { name: 'C# 11+', icon: 'fas fa-code' },
                    { name: 'CommunityToolkit', icon: 'fas fa-tools' },
                    { name: 'XAML', icon: 'fas fa-file-code' }
                ]
            }
        ];
    }

    renderProjects(projects) {
        const projectsGrid = document.getElementById('projects-grid');
        if (!projectsGrid) return;

        projectsGrid.innerHTML = '';

        const filteredProjects = this.currentFilter === 'all'
            ? projects
            : projects.filter(project => project.category === this.currentFilter);

        filteredProjects.forEach((project, index) => {
            const projectCard = this.createProjectCard(project);
            projectCard.style.animationDelay = `${index * 0.1}s`;
            projectsGrid.appendChild(projectCard);
        });

        // Animate cards
        setTimeout(() => {
            projectsGrid.querySelectorAll('.project-card').forEach(card => {
                card.classList.add('visible');
            });
        }, 100);
    }

    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = `project-card ${project.category}`;
        card.innerHTML = `
            <div class="project-header">
                <h3 class="project-title">${project.title}</h3>
                <span class="project-type">${project.type}</span>
            </div>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                <button class="project-link project-details-btn" data-project="${project.title}">
                    <i class="fas fa-info-circle"></i>Détails
                </button>
                ${project.links.github ? `<a href="${project.links.github}" class="project-link" target="_blank"><i class="fab fa-github"></i>Code</a>` : ''}
            </div>
        `;

        // Add click event for details button
        const detailsBtn = card.querySelector('.project-details-btn');
        detailsBtn.addEventListener('click', () => this.openProjectModal(project));

        return card;
    }

    renderProjectsError() {
        const projectsGrid = document.getElementById('projects-grid');
        if (!projectsGrid) return;

        projectsGrid.innerHTML = `
            <div class="projects-error">
                <p>Erreur lors du chargement des projets. Veuillez rafraîchir la page.</p>
            </div>
        `;
    }

    filterProjects(e) {
        const filter = e.target.dataset.filter;
        if (filter === this.currentFilter) return;

        // Update active filter
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');

        this.currentFilter = filter;
        this.loadProjects();
    }

    // ===== CONTACT FORM =====
    async handleContactForm(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;

        try {
            // Simulate form submission (replace with actual endpoint)
            await this.simulateFormSubmission(data);

            this.showNotification('Message envoyé avec succès ! Je vous répondrai rapidement.', 'success');
            e.target.reset();
        } catch (error) {
            this.showNotification('Erreur lors de l\'envoi. Veuillez réessayer.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    async simulateFormSubmission(data) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success/failure
                if (Math.random() > 0.1) {
                    resolve(data);
                } else {
                    reject(new Error('Submission failed'));
                }
            }, 2000);
        });
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

        document.body.appendChild(notification);

        // Auto remove
        setTimeout(() => {
            notification.remove();
        }, 5000);

        // Manual remove
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
    }

    // ===== EASTER EGG (KONAMI CODE) =====
    handleKonamiCode(e) {
        this.konamiSequence.push(e.code);

        if (this.konamiSequence.length > this.konamiCode.length) {
            this.konamiSequence.shift();
        }

        if (this.konamiSequence.length === this.konamiCode.length) {
            const isMatch = this.konamiSequence.every((code, index) => code === this.konamiCode[index]);

            if (isMatch) {
                this.triggerEasterEgg();
                this.konamiSequence = [];
            }
        }
    }

    triggerEasterEgg() {
        const modal = document.getElementById('easter-egg-modal');
        if (!modal) return;

        modal.classList.add('active');
        this.initMatrixRain();

        // Play sound effect if available
        this.playSound('/assets/sounds/easter-egg.mp3');

        // Add screen shake effect
        document.body.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 500);
    }

    initMatrixRain() {
        const matrixContainer = document.querySelector('.matrix-rain');
        if (!matrixContainer) return;

        const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

        for (let i = 0; i < 20; i++) {
            const column = document.createElement('div');
            column.style.position = 'absolute';
            column.style.left = (i * 5) + '%';
            column.style.color = '#00ff88';
            column.style.fontSize = '12px';
            column.style.fontFamily = 'monospace';
            column.style.animation = `matrix-fall 2s linear infinite`;
            column.style.animationDelay = Math.random() * 2 + 's';

            const updateColumn = () => {
                column.textContent = '';
                for (let j = 0; j < 10; j++) {
                    column.textContent += characters[Math.floor(Math.random() * characters.length)] + '\\n';
                }
            };

            updateColumn();
            setInterval(updateColumn, 100);
            matrixContainer.appendChild(column);
        }
    }

    playSound(src) {
        try {
            const audio = new Audio(src);
            audio.volume = 0.3;
            audio.play().catch(e => console.log('Audio play failed:', e));
        } catch (e) {
            console.log('Audio not available');
        }
    }

    // ===== MODAL MANAGEMENT =====
    setupModalEvents() {
        // Easter egg modal
        const easterModal = document.getElementById('easter-egg-modal');
        const easterCloseBtn = easterModal?.querySelector('.modal-close');

        easterCloseBtn?.addEventListener('click', () => {
            easterModal.classList.remove('active');
        });

        easterModal?.addEventListener('click', (e) => {
            if (e.target === easterModal) {
                easterModal.classList.remove('active');
            }
        });

        // Project modal
        const projectModal = document.getElementById('project-modal');
        const projectCloseBtn = projectModal?.querySelector('.modal-close');

        projectCloseBtn?.addEventListener('click', () => {
            projectModal.classList.remove('active');
        });

        projectModal?.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                projectModal.classList.remove('active');
            }
        });

        // Escape key for all modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal.active').forEach(modal => {
                    modal.classList.remove('active');
                });
            }
        });
    }

    // ===== PROJECT MODAL =====
    openProjectModal(project) {
        const modal = document.getElementById('project-modal');
        if (!modal) return;

        // Update modal content
        document.getElementById('project-modal-title').textContent = project.title;
        document.getElementById('project-modal-type').textContent = project.type;
        document.getElementById('project-modal-description').textContent = project.fullDescription || project.description;

        // Update image - COMMENTED OUT FOR NOW (will add images later)
        const img = document.getElementById('project-modal-img');
        // Hide image section completely for now
        img.parentElement.style.display = 'none';

        // Update features
        const featuresList = document.getElementById('project-modal-features-list');
        featuresList.innerHTML = '';
        if (project.features) {
            project.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresList.appendChild(li);
            });
        }

        // Update tech stack
        const techGrid = document.getElementById('project-modal-tech-grid');
        techGrid.innerHTML = '';
        if (project.techDetails) {
            project.techDetails.forEach(tech => {
                const techItem = document.createElement('div');
                techItem.className = 'tech-item';
                techItem.innerHTML = `
                    <i class="${tech.icon}"></i>
                    <span>${tech.name}</span>
                `;
                techGrid.appendChild(techItem);
            });
        } else {
            // Fallback to simple tech list
            project.technologies.forEach(tech => {
                const techItem = document.createElement('div');
                techItem.className = 'tech-item';
                techItem.innerHTML = `
                    <i class="fas fa-code"></i>
                    <span>${tech}</span>
                `;
                techGrid.appendChild(techItem);
            });
        }

        // Update metrics
        const metricsGrid = document.getElementById('project-modal-metrics');
        metricsGrid.innerHTML = '';
        if (project.metrics) {
            project.metrics.forEach(metric => {
                const metricItem = document.createElement('div');
                metricItem.className = 'metric-item';
                metricItem.innerHTML = `
                    <span class="metric-value">${metric.value}</span>
                    <span class="metric-label">${metric.label}</span>
                `;
                metricsGrid.appendChild(metricItem);
            });
        }

        // Update challenges
        const challengesContainer = document.getElementById('project-modal-challenges');
        challengesContainer.innerHTML = '';
        if (project.challenges) {
            project.challenges.forEach(challenge => {
                const challengeItem = document.createElement('div');
                challengeItem.className = 'challenge-item';
                challengeItem.innerHTML = `
                    <div class="challenge-title">${challenge.title}</div>
                    <div class="challenge-description">${challenge.description}</div>
                `;
                challengesContainer.appendChild(challengeItem);
            });
        }

        // Update action buttons
        const githubBtn = document.getElementById('project-modal-github');
        const demoBtn = document.getElementById('project-modal-demo');

        if (project.links.github) {
            githubBtn.href = project.links.github;
            githubBtn.style.display = 'flex';
        } else {
            githubBtn.style.display = 'none';
        }

        // Hide demo button completely
        demoBtn.style.display = 'none';

        // Show modal
        modal.classList.add('active');

        // Track analytics
        if (this.analytics) {
            this.analytics.trackEvent('Project', 'Modal Open', project.title);
        }
    }

    // Global function for sharing
    shareProject() {
        const title = document.getElementById('project-modal-title').textContent;
        const url = window.location.href;

        if (navigator.share) {
            navigator.share({
                title: `${title} - Portfolio Valérian Vandercamme`,
                url: url
            });
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(url).then(() => {
                this.showNotification('Lien copié dans le presse-papiers !', 'success');
            });
        }
    }

    // ===== SCROLL HANDLING =====
    handleScroll() {
        const scrollTop = window.pageYOffset;
        const navbar = document.querySelector('.navbar');

        // Don't change navbar background - it will use CSS variables that adapt to theme
        // Just add/remove a scrolled class for any scroll-specific styling
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Remove parallax effect that causes superposition
        // Just keep smooth scroll behavior

        // Hide/show scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.opacity = scrollTop > 100 ? '0' : '1';
        }
    }

    handleResize() {
        // Reinitialize floating icons
        this.initFloatingIcons();
    }

    // ===== UTILITY FUNCTIONS =====
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
class PerformanceOptimizer {
    constructor() {
        this.initLazyLoading();
        this.preloadCriticalResources();
        this.optimizeImages();
    }

    initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    preloadCriticalResources() {
        const criticalResources = [
            '/assets/fonts/Inter-Regular.woff2',
            '/assets/fonts/SpaceGrotesk-Bold.woff2'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = 'font';
            link.type = 'font/woff2';
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }

    optimizeImages() {
        // Implement responsive images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.srcset) {
                const src = img.src || img.dataset.src;
                if (src) {
                    img.srcset = `
                        ${src}?w=400 400w,
                        ${src}?w=800 800w,
                        ${src}?w=1200 1200w
                    `;
                    img.sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
                }
            }
        });
    }
}

// ===== ANALYTICS & TRACKING =====
class Analytics {
    constructor() {
        this.trackPageView();
        this.setupEventTracking();
    }

    trackPageView() {
        // Implement analytics tracking
        console.log('Page view tracked');
    }

    trackEvent(category, action, label) {
        // Implement event tracking
        console.log(`Event tracked: ${category} - ${action} - ${label}`);
    }

    setupEventTracking() {
        // Track button clicks
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.trackEvent('Button', 'Click', e.target.textContent.trim());
            });
        });

        // Track project views
        document.querySelectorAll('.project-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const projectTitle = e.target.closest('.project-card').querySelector('.project-title').textContent;
                this.trackEvent('Project', 'View', projectTitle);
            });
        });

        // Track form submissions
        const contactForm = document.getElementById('contact-form');
        contactForm?.addEventListener('submit', () => {
            this.trackEvent('Contact', 'Form Submit', 'Contact Form');
        });
    }
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
class AccessibilityEnhancer {
    constructor() {
        this.setupKeyboardNavigation();
        this.setupAriaLabels();
        this.setupFocusManagement();
    }

    setupKeyboardNavigation() {
        // Tab navigation for custom elements
        document.querySelectorAll('.btn, .nav-link, .project-card').forEach(element => {
            if (!element.hasAttribute('tabindex')) {
                element.setAttribute('tabindex', '0');
            }
        });

        // Enter key support for buttons
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.classList.contains('btn')) {
                e.target.click();
            }
        });
    }

    setupAriaLabels() {
        // Add missing aria-labels
        const elementsNeedingLabels = document.querySelectorAll('button:not([aria-label]), a:not([aria-label])');
        elementsNeedingLabels.forEach(element => {
            if (!element.getAttribute('aria-label')) {
                const text = element.textContent.trim() || element.title || 'Interactive element';
                element.setAttribute('aria-label', text);
            }
        });
    }

    setupFocusManagement() {
        // Visible focus indicators
        const style = document.createElement('style');
        style.textContent = `
            *:focus {
                outline: 2px solid var(--accent-primary) !important;
                outline-offset: 2px !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== GLOBAL FUNCTIONS =====
function shareProject() {
    const title = document.getElementById('project-modal-title').textContent;
    const url = window.location.href;

    if (navigator.share) {
        navigator.share({
            title: `${title} - Portfolio Valérian Vandercamme`,
            url: url
        });
    } else {
        // Fallback to clipboard
        navigator.clipboard.writeText(url).then(() => {
            // Show notification
            const notification = document.createElement('div');
            notification.className = 'notification success';
            notification.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>Lien copié dans le presse-papiers !</span>
            `;
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 3000);
        });
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main portfolio
    const portfolio = new Portfolio();

    // Initialize performance optimizations
    const performanceOptimizer = new PerformanceOptimizer();

    // Initialize analytics
    const analytics = new Analytics();

    // Initialize accessibility enhancements
    const accessibilityEnhancer = new AccessibilityEnhancer();

    // Service Worker registration
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    }

    console.log('🚀 Portfolio loaded successfully!');
});

// ===== GLOBAL ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Portfolio error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Portfolio, PerformanceOptimizer, Analytics, AccessibilityEnhancer };
}