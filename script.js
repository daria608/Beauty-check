// ============================================
// BEAUTY CHECK - JavaScript
// Interactive functionality for the website
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // Form Validation and Handling
    // ============================================
    
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            
            // Basic validation
            if (email && password) {
                if (email.value.trim() === '') {
                    showError(email, 'Please enter your email address');
                    return;
                }
                
                if (!isValidEmail(email.value)) {
                    showError(email, 'Please enter a valid email address');
                    return;
                }
                
                if (password.value.trim() === '') {
                    showError(password, 'Please enter your password');
                    return;
                }
                
                // If validation passes, show success message
                showSuccess('Login form submitted successfully! (This is a demo)');
            }
        });
    }
    
    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show error message
    function showError(input, message) {
        // Remove existing error message
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error class to input
        input.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
        
        // Create and insert error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.setAttribute('role', 'alert');
        errorDiv.style.color = '#ff0000';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        input.parentElement.appendChild(errorDiv);
        
        // Focus on input for accessibility
        input.focus();
    }
    
    // Show success message
    function showSuccess(message) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.success-message, .error-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.setAttribute('role', 'alert');
        successDiv.style.color = '#28a745';
        successDiv.style.fontSize = '1rem';
        successDiv.style.padding = '1rem';
        successDiv.style.backgroundColor = '#d4edda';
        successDiv.style.border = '1px solid #c3e6cb';
        successDiv.style.borderRadius = '8px';
        successDiv.style.marginTop = '1rem';
        
        const form = document.querySelector('.login-form');
        if (form) {
            form.appendChild(successDiv);
        }
        
        // Remove error classes
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.classList.remove('error');
            input.removeAttribute('aria-invalid');
        });
    }
    
    // ============================================
    // Search Functionality
    // ============================================
    
    const searchBar = document.getElementById('search');
    if (searchBar) {
        searchBar.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            // If on gallery page, filter products
            const productCards = document.querySelectorAll('.product-card, .gallery-item');
            if (productCards.length > 0) {
                productCards.forEach(card => {
                    const cardText = card.textContent.toLowerCase();
                    if (cardText.includes(searchTerm) || searchTerm === '') {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
        
        // Add keyboard support
        searchBar.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                // In a real application, this would trigger a search
                console.log('Searching for:', searchBar.value);
            }
        });
    }
    
    // ============================================
    // Smooth Scrolling for Anchor Links
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ============================================
    // Image Lazy Loading Enhancement
    // ============================================
    
    // Add loading state to images
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.alt = 'Image failed to load';
            this.style.backgroundColor = '#f0f0f0';
        });
        
        // Initial opacity for fade-in effect
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
    
    // ============================================
    // Accessibility Enhancements
    // ============================================
    
    // Skip to main content link (for screen readers)
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 100;
    `;
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    // Add main content ID if not present
    const mainContent = document.querySelector('main');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    // ============================================
    // Keyboard Navigation Enhancement
    // ============================================
    
    // Add keyboard support for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, [tabindex]');
    interactiveElements.forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && this.tagName !== 'INPUT' && this.tagName !== 'BUTTON') {
                this.click();
            }
        });
    });
    
    // ============================================
    // Product Card Interactions
    // ============================================
    
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const productName = this.querySelector('.product-name')?.textContent;
            if (productName) {
                console.log('Product selected:', productName);
                // In a real application, this would navigate to product page
            }
        });
        
        // Make cards keyboard accessible
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // ============================================
    // Console Log for Development
    // ============================================
    
    console.log('BEAUTY CHECK website loaded successfully!');
    console.log('All interactive features are ready.');
    
});

// ============================================
// External Service Integration
// ============================================

// Google Maps iframe is embedded directly in HTML
// This ensures proper loading and accessibility

