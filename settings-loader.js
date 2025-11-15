// Settings Loader - Loads and applies settings from settings.json
let appSettings = {};

// Load settings from JSON file
async function loadSettings() {
    try {
        const response = await fetch('settings.json');
        if (!response.ok) {
            throw new Error('Failed to load settings.json');
        }
        appSettings = await response.json();
        applySettings();
        return appSettings;
    } catch (error) {
        console.error('Error loading settings:', error);
        // Fallback to default settings
        loadDefaultSettings();
        return appSettings;
    }
}

// Default settings fallback
function loadDefaultSettings() {
    appSettings = {
        business: { name: "WigConnect" },
        contact: { 
            countryCode: "234",
            whatsappMessage: "Hello! I'm interested in your wig import service from Vietnam, India, and Eastern Europe. I'd like to learn more about your affordable pricing for Nigeria."
        },
        theme: { mode: "light", primaryColor: "rose", secondaryColor: "purple", accentColor: "pink" },
        content: {},
        settings: { loadingDelay: 1500, phoneFormat: { countryCode: "+234", placeholder: "801 234 5678", minLength: 10, maxLength: 10 } }
    };
}

// Apply settings to the page
function applySettings() {
    if (!appSettings || Object.keys(appSettings).length === 0) return;

    // Apply business name
    applyBusinessName();
    
    // Apply theme (colors and dark/light mode)
    applyTheme();
    
    // Apply content
    applyContent();
    
    // Apply meta tags
    applyMetaTags();
    
    // Update phone input settings
    updatePhoneInput();
}

// Apply business name
function applyBusinessName() {
    const businessNameElements = document.querySelectorAll('[data-business-name]');
    businessNameElements.forEach(el => {
        el.textContent = appSettings.business?.name || 'WigConnect';
    });
}

// Apply theme (colors and dark/light mode)
function applyTheme() {
    const isDarkMode = appSettings.theme?.mode === 'dark';
    const body = document.body;
    
    // Remove existing theme classes
    body.classList.remove('dark', 'bg-gradient-to-br', 'from-rose-50', 'via-purple-50', 'to-pink-50');
    
    if (isDarkMode) {
        body.classList.add('dark', 'bg-gray-900');
        applyDarkModeStyles();
    } else {
        const primary = appSettings.theme?.primaryColor || 'rose';
        const secondary = appSettings.theme?.secondaryColor || 'purple';
        const accent = appSettings.theme?.accentColor || 'pink';
        body.classList.add(`bg-gradient-to-br`, `from-${primary}-50`, `via-${secondary}-50`, `to-${accent}-50`);
        applyLightModeStyles(primary, secondary, accent);
    }
    
    // Update Tailwind config with custom colors if provided
    if (appSettings.theme?.colorScheme) {
        updateTailwindColors(appSettings.theme.colorScheme);
    }
}

// Apply dark mode styles
function applyDarkModeStyles() {
    // Add dark mode specific classes
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (!section.id || section.id === 'contact') return;
        section.classList.remove('bg-white/50');
        section.classList.add('bg-gray-800/50');
    });
    
    // Update text colors
    const textElements = document.querySelectorAll('h1, h2, h3, p');
    textElements.forEach(el => {
        if (el.classList.contains('text-gray-900')) {
            el.classList.remove('text-gray-900');
            el.classList.add('text-white');
        }
        if (el.classList.contains('text-gray-700')) {
            el.classList.remove('text-gray-700');
            el.classList.add('text-gray-300');
        }
        if (el.classList.contains('text-gray-600')) {
            el.classList.remove('text-gray-600');
            el.classList.add('text-gray-400');
        }
    });
}

// Apply light mode styles with custom colors
function applyLightModeStyles(primary, secondary, accent) {
    // Colors are applied via Tailwind classes in HTML
    // This function can be extended for more complex color applications
}

// Update Tailwind colors dynamically
function updateTailwindColors(colorScheme) {
    // Note: Tailwind CDN doesn't support runtime config changes
    // Colors need to be set in the HTML or via CSS variables
    // For now, we'll use CSS variables as a workaround
    if (colorScheme.rose) {
        document.documentElement.style.setProperty('--rose-500', colorScheme.rose[500] || '#ec4899');
        document.documentElement.style.setProperty('--rose-600', colorScheme.rose[600] || '#db2777');
    }
    if (colorScheme.purple) {
        document.documentElement.style.setProperty('--purple-500', colorScheme.purple[500] || '#a855f7');
    }
}

// Apply content from settings
function applyContent() {
    const content = appSettings.content;
    if (!content) return;

    // Hero section
    if (content.hero) {
        const heroTitle = document.querySelector('[data-hero-title]');
        const heroTitleHighlight = document.querySelector('[data-hero-title-highlight]');
        const heroSubtitle = document.querySelector('[data-hero-subtitle]');
        const heroBadge = document.querySelector('[data-hero-badge]');
        
        if (heroTitle && content.hero.title) heroTitle.textContent = content.hero.title;
        if (heroTitleHighlight && content.hero.titleHighlight) heroTitleHighlight.textContent = content.hero.titleHighlight;
        if (heroSubtitle && content.hero.subtitle) heroSubtitle.textContent = content.hero.subtitle;
        if (heroBadge && content.hero.badge) heroBadge.textContent = content.hero.badge;
    }

    // Features
    if (content.features && Array.isArray(content.features)) {
        const featureElements = document.querySelectorAll('[data-feature]');
        content.features.forEach((feature, index) => {
            if (featureElements[index]) {
                const iconEl = featureElements[index].querySelector('[data-feature-icon]');
                const textEl = featureElements[index].querySelector('[data-feature-text]');
                if (iconEl) iconEl.textContent = feature.icon;
                if (textEl) textEl.textContent = feature.text;
            }
        });
    }

    // About section
    if (content.about) {
        const aboutTitle = document.querySelector('[data-about-title]');
        const aboutSubtitle = document.querySelector('[data-about-subtitle]');
        if (aboutTitle && content.about.title) aboutTitle.textContent = content.about.title;
        if (aboutSubtitle && content.about.subtitle) aboutSubtitle.textContent = content.about.subtitle;
        
        // About cards
        if (content.about.cards && Array.isArray(content.about.cards)) {
            const cardElements = document.querySelectorAll('[data-about-card]');
            content.about.cards.forEach((card, index) => {
                if (cardElements[index]) {
                    const iconEl = cardElements[index].querySelector('[data-card-icon]');
                    const titleEl = cardElements[index].querySelector('[data-card-title]');
                    const descEl = cardElements[index].querySelector('[data-card-description]');
                    if (iconEl) iconEl.textContent = card.icon;
                    if (titleEl) titleEl.textContent = card.title;
                    if (descEl) descEl.textContent = card.description;
                }
            });
        }
    }

    // Services section
    if (content.services) {
        const servicesTitle = document.querySelector('[data-services-title]');
        const servicesSubtitle = document.querySelector('[data-services-subtitle]');
        if (servicesTitle && content.services.title) servicesTitle.textContent = content.services.title;
        if (servicesSubtitle && content.services.subtitle) servicesSubtitle.textContent = content.services.subtitle;
        
        // Service items
        if (content.services.items && Array.isArray(content.services.items)) {
            const serviceElements = document.querySelectorAll('[data-service-item]');
            content.services.items.forEach((service, index) => {
                if (serviceElements[index]) {
                    const iconEl = serviceElements[index].querySelector('[data-service-icon]');
                    const titleEl = serviceElements[index].querySelector('[data-service-title]');
                    const descEl = serviceElements[index].querySelector('[data-service-description]');
                    if (iconEl) iconEl.textContent = service.icon;
                    if (titleEl) titleEl.textContent = service.title;
                    if (descEl) descEl.textContent = service.description;
                }
            });
        }
    }

    // CTA section
    if (content.cta) {
        const ctaTitle = document.querySelector('[data-cta-title]');
        const ctaSubtitle = document.querySelector('[data-cta-subtitle]');
        const ctaButton = document.querySelector('[data-cta-button]');
        if (ctaTitle && content.cta.title) ctaTitle.textContent = content.cta.title;
        if (ctaSubtitle && content.cta.subtitle) ctaSubtitle.textContent = content.cta.subtitle;
        if (ctaButton && content.cta.buttonText) {
            const buttonText = ctaButton.querySelector('span:not(.whatsapp-icon)');
            if (buttonText) buttonText.textContent = content.cta.buttonText;
        }
    }

    // Footer
    if (content.footer) {
        const footerCopyright = document.querySelector('[data-footer-copyright]');
        const footerTagline = document.querySelector('[data-footer-tagline]');
        if (footerCopyright && content.footer.copyright) footerCopyright.textContent = content.footer.copyright;
        if (footerTagline && content.footer.tagline) footerTagline.textContent = content.footer.tagline;
    }

    // Navigation links - handle desktop and mobile separately
    if (appSettings.navigation?.links && Array.isArray(appSettings.navigation.links)) {
        const allNavLinks = document.querySelectorAll('[data-nav-link]');
        // Update all nav links (both desktop and mobile)
        appSettings.navigation.links.forEach((link, index) => {
            // Desktop nav links are first 3, then mobile nav links
            const desktopIndex = index;
            const mobileIndex = index + 3; // Mobile links come after desktop links
            
            if (allNavLinks[desktopIndex]) {
                allNavLinks[desktopIndex].textContent = link.label;
                allNavLinks[desktopIndex].setAttribute('href', link.href);
            }
            if (allNavLinks[mobileIndex]) {
                allNavLinks[mobileIndex].textContent = link.label;
                allNavLinks[mobileIndex].setAttribute('href', link.href);
            }
        });
    }
}

// Apply meta tags
function applyMetaTags() {
    if (appSettings.meta) {
        if (appSettings.meta.title) {
            document.title = appSettings.meta.title;
            const metaTitle = document.querySelector('meta[property="og:title"]');
            if (metaTitle) metaTitle.setAttribute('content', appSettings.meta.title);
        }
        if (appSettings.meta.description) {
            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
                metaDesc = document.createElement('meta');
                metaDesc.setAttribute('name', 'description');
                document.head.appendChild(metaDesc);
            }
            metaDesc.setAttribute('content', appSettings.meta.description);
        }
    }
}

// Update phone input settings
function updatePhoneInput() {
    const phoneInput = document.getElementById('phoneNumber');
    const countryCodeDisplay = document.querySelector('[data-country-code]');
    
    if (phoneInput && appSettings.settings?.phoneFormat) {
        const format = appSettings.settings.phoneFormat;
        phoneInput.setAttribute('placeholder', format.placeholder || '801 234 5678');
        phoneInput.setAttribute('maxlength', format.maxLength || 15);
    }
    
    if (countryCodeDisplay && appSettings.settings?.phoneFormat) {
        countryCodeDisplay.textContent = appSettings.settings.phoneFormat.countryCode || '+234';
    }
}

// Get settings (for use in other scripts)
function getSettings() {
    return appSettings;
}

// Initialize settings loader when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSettings);
} else {
    loadSettings();
}

