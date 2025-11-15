// ============================================
// SETTINGS
// ============================================

let PREDEFINED_MESSAGE = "Hello! I'm interested in your wig import service from Vietnam, India, and Eastern Europe. I'd like to learn more about your affordable pricing for Nigeria.";
let COUNTRY_CODE = "234";
let OWNER_PHONE = "2349057930710";
let LOADING_DELAY = 1500;

function initSettings() {
    try {
        if (typeof getSettings === 'function') {
            const settings = getSettings();
            if (settings) {
                PREDEFINED_MESSAGE = settings.contact?.whatsappMessage || PREDEFINED_MESSAGE;
                COUNTRY_CODE = settings.contact?.countryCode || COUNTRY_CODE;
                OWNER_PHONE = settings.contact?.ownerPhone || OWNER_PHONE;
                LOADING_DELAY = settings.settings?.loadingDelay || LOADING_DELAY;
            }
        }
    } catch (e) {
        // Use defaults
    }
}

// ============================================
// FORM STATE MANAGEMENT
// ============================================

function showForm() {
    const form = document.getElementById('whatsappForm');
    const loading = document.getElementById('formLoading');
    const success = document.getElementById('formSuccess');
    
    if (form) form.classList.remove('hidden');
    if (loading) loading.classList.add('hidden');
    if (success) success.classList.add('hidden');
}

function showLoading() {
    const form = document.getElementById('whatsappForm');
    const loading = document.getElementById('formLoading');
    const success = document.getElementById('formSuccess');
    const button = document.getElementById('submitButton');
    
    if (form) form.classList.add('hidden');
    if (loading) loading.classList.remove('hidden');
    if (success) success.classList.add('hidden');
    if (button) button.disabled = true;
}

function showSuccess(whatsappUrl) {
    const form = document.getElementById('whatsappForm');
    const loading = document.getElementById('formLoading');
    const success = document.getElementById('formSuccess');
    const whatsappLink = document.getElementById('whatsappLink');
    const linkToCopy = document.getElementById('linkToCopy');
    const button = document.getElementById('submitButton');
    
    if (form) form.classList.add('hidden');
    if (loading) loading.classList.add('hidden');
    if (success) success.classList.remove('hidden');
    if (button) button.disabled = false;
    
    if (whatsappLink) whatsappLink.href = whatsappUrl;
    if (linkToCopy) linkToCopy.value = whatsappUrl;
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize form state
    showForm();
    
    // ============================================
    // SMOOTH SCROLL TO FORM
    // ============================================
    
    const connectBtn = document.getElementById('connectBtn');
    if (connectBtn) {
        connectBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const formSection = document.getElementById('whatsapp-form');
            if (formSection) {
                formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setTimeout(() => {
                    const input = document.getElementById('phoneNumber');
                    if (input) input.focus();
                }, 500);
            }
        });
    }
    
    // ============================================
    // PHONE NUMBER FORMATTING
    // ============================================
    
    const phoneInput = document.getElementById('phoneNumber');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            // Get cursor position before formatting
            const cursorPosition = e.target.selectionStart;
            let value = e.target.value.replace(/\D/g, '');
            
            // Limit to 10 digits
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            
            // Format with spaces: XXX XXX XXXX
            let formatted = value;
            if (value.length > 3) {
                formatted = value.slice(0, 3) + ' ' + value.slice(3);
            }
            if (value.length > 6) {
                formatted = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6);
            }
            
            e.target.value = formatted;
            
            // Restore cursor position (adjust for added spaces)
            let newCursorPosition = cursorPosition;
            if (value.length > 3 && cursorPosition > 3) {
                newCursorPosition += 1;
            }
            if (value.length > 6 && cursorPosition > 6) {
                newCursorPosition += 1;
            }
            // Ensure cursor doesn't go beyond the value
            newCursorPosition = Math.min(newCursorPosition, formatted.length);
            e.target.setSelectionRange(newCursorPosition, newCursorPosition);
        });
        
        // Prevent non-numeric input on mobile
        phoneInput.addEventListener('keypress', function(e) {
            const char = String.fromCharCode(e.which);
            if (!/[0-9]/.test(char)) {
                e.preventDefault();
            }
        });
    }
    
    // ============================================
    // FORM SUBMISSION
    // ============================================
    
    const whatsappForm = document.getElementById('whatsappForm');
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const phoneValue = phoneInput ? phoneInput.value.replace(/\D/g, '') : '';
            
            // Validate
            if (phoneValue.length < 10) {
                const inputWrapper = phoneInput ? phoneInput.closest('.flex') : null;
                if (inputWrapper) {
                    inputWrapper.classList.add('border-red-500');
                    inputWrapper.classList.remove('border-gray-200', 'focus-within:border-rose-500');
                }
                if (phoneInput) phoneInput.focus();
                showError('Please enter a valid 10-digit phone number');
                return;
            }
            
            // Remove error styling
            const inputWrapper = phoneInput ? phoneInput.closest('.flex') : null;
            if (inputWrapper) {
                inputWrapper.classList.remove('border-red-500');
                inputWrapper.classList.add('border-gray-200', 'focus-within:border-rose-500');
            }
            
            // Show loading
            showLoading();
            
            // Format user's phone number for display in message
            let formattedUserPhone = phoneValue;
            if (formattedUserPhone.startsWith('0')) {
                formattedUserPhone = formattedUserPhone.substring(1);
            }
            const fullUserPhoneNumber = `${COUNTRY_CODE}${formattedUserPhone}`;
            
            // Format user phone for display (with spaces)
            const displayPhone = phoneInput.value.trim();
            
            // Get message template and include user's phone number
            const settings = typeof getSettings === 'function' ? getSettings() : null;
            const messageTemplate = settings?.contact?.whatsappMessage || PREDEFINED_MESSAGE;
            
            // Create message with user's phone number
            const message = `${messageTemplate}\n\nMy WhatsApp number: ${displayPhone} (${fullUserPhoneNumber})`;
            
            // Get owner's phone number
            const ownerPhone = settings?.contact?.ownerPhone || OWNER_PHONE;
            // Remove any non-digit characters from owner phone
            const cleanOwnerPhone = ownerPhone.replace(/\D/g, '');
            
            // Generate WhatsApp link to owner's number with message
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${cleanOwnerPhone}?text=${encodedMessage}`;
            
            // Show success after delay
            setTimeout(function() {
                showSuccess(whatsappUrl);
            }, LOADING_DELAY);
        });
    }
    
    // ============================================
    // RESET FORM BUTTON
    // ============================================
    
    const resetFormBtn = document.getElementById('resetForm');
    if (resetFormBtn) {
        resetFormBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const form = document.getElementById('whatsappForm');
            if (form) form.reset();
            showForm();
        });
    }
    
    // ============================================
    // COPY BUTTON
    // ============================================
    
    const copyButton = document.getElementById('copyButton');
    if (copyButton) {
        copyButton.addEventListener('click', async function() {
            const linkToCopy = document.getElementById('linkToCopy');
            if (!linkToCopy) return;
            
            try {
                await navigator.clipboard.writeText(linkToCopy.value);
                const originalText = copyButton.textContent;
                copyButton.textContent = 'Copied!';
                copyButton.classList.add('copied');
                setTimeout(function() {
                    copyButton.textContent = originalText;
                    copyButton.classList.remove('copied');
                }, 2000);
            } catch (err) {
                linkToCopy.select();
                linkToCopy.setSelectionRange(0, 99999);
                document.execCommand('copy');
                const originalText = copyButton.textContent;
                copyButton.textContent = 'Copied!';
                copyButton.classList.add('copied');
                setTimeout(function() {
                    copyButton.textContent = originalText;
                    copyButton.classList.remove('copied');
                }, 2000);
            }
        });
    }
    
    // ============================================
    // INITIALIZE SETTINGS
    // ============================================
    
    setTimeout(function() {
        initSettings();
    }, 200);
});

// ============================================
// ERROR MESSAGE
// ============================================

function showError(message) {
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = 'color: #e74c3c; font-size: 0.875rem; margin-top: 0.5rem; padding: 0.5rem; background: #fef2f2; border-radius: 0.5rem; border: 1px solid #fecaca;';
    errorDiv.textContent = message;
    
    const phoneInput = document.getElementById('phoneNumber');
    const inputWrapper = phoneInput ? phoneInput.closest('.flex') : null;
    if (inputWrapper && inputWrapper.parentElement) {
        inputWrapper.parentElement.appendChild(errorDiv);
    }
    
    setTimeout(function() {
        errorDiv.remove();
    }, 5000);
}

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#whatsapp-form') return; // Already handled above
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

window.addEventListener('load', function() {
    const elements = document.querySelectorAll('.about-card, .service-item');
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
