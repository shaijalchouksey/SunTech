// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Solar Calculator
const calculateBtn = document.getElementById('calculateBtn');
const monthlyBillInput = document.getElementById('monthlyBill');
const roofSizeInput = document.getElementById('roofSize');
const locationSelect = document.getElementById('location');

// State-specific solar multipliers (sun hours and incentives)
const stateMultipliers = {
    // 🇮🇳 Indian States
    rajasthan: 1.5,
    gujarat: 1.6,
    maharashtra: 1.4,
    delhi: 1.3,
    karnataka: 1.5,
    tamilnadu: 1.4,
    telangana: 1.5,
    madhyapradesh: 1.4,
    uttarpradesh: 1.2,
    punjab: 1.3,
    westbengal: 1.2,
    odisha: 1.3,
    andhrapradesh: 1.4,
    bihar: 1.1,
    haryana: 1.3,
    kerala: 1.4,
    chhattisgarh: 1.3,
    jharkhand: 1.2,
    himachal: 1.3,
    jammu: 1.2,
    uttarakhand: 1.3,
    goa: 1.4,
    manipur: 1.1,
    meghalaya: 1.1,
    nagaland: 1.1,
    mizoram: 1.1,
    tripura: 1.1,
    sikkim: 1.1,
    arunachal: 1.1,
    assam: 1.2,

    // 🌎 Optional International
    california: 1.4,
    texas: 1.2,
    florida: 1.3,
    newyork: 1.0,
    arizona: 1.5
};


// Calculate Solar Savings Function
function calculateSolarSavings() {
    const monthlyBill = parseFloat(monthlyBillInput.value);
    const roofSize = parseFloat(roofSizeInput.value);
    const location = locationSelect.value;

    if (!monthlyBill || !roofSize || !location) {
        alert('Please fill in all fields to calculate your savings.');
        return;
    }

    const multiplier = stateMultipliers[location] || 1.0;

    // Calculate annual electricity cost
    const annualCost = monthlyBill * 12;

    // Estimate system size (assuming 10W per sq ft and 4 sun hours average)
    const systemSizeKW = (roofSize * 0.01) * multiplier;

    // Estimate annual production (kWh)
    const annualProduction = systemSizeKW * 1400 * multiplier; // 1400 kWh per kW average

    // Calculate savings (assuming ₹7 per kWh average in India)
    const kWhRate = 7; // INR
    const annualSavings = Math.min(annualProduction * kWhRate, annualCost * 0.9); // Max 90% offset
    const lifetimeSavings = annualSavings * 25;

    // Calculate CO2 reduction (0.92 lbs CO2 per kWh)
    const co2Reduction = (annualProduction * 0.92) / 2000; // Convert to tons

    // Show results with counter animation
    const resultsDiv = document.getElementById('results');
    resultsDiv.style.opacity = '0';
    resultsDiv.style.transform = 'translateY(20px)';

    setTimeout(() => {
        resultsDiv.style.transition = 'all 0.5s ease';
        resultsDiv.style.opacity = '1';
        resultsDiv.style.transform = 'translateY(0)';

        // Animate counters
        setTimeout(() => {
            animateCounter(document.getElementById('annualSavings'), annualSavings);
            animateCounter(document.getElementById('lifetimeSavings'), lifetimeSavings);
            animateCounter(document.getElementById('systemSize'), systemSizeKW);
            animateCounter(document.getElementById('co2Reduction'), co2Reduction);
        }, 500);
    }, 100);
}

// Add event listener for calculate button
calculateBtn.addEventListener('click', calculateSolarSavings);

// Counter animation for results
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        if (element.id === 'annualSavings' || element.id === 'lifetimeSavings') {
            element.textContent = `₹${Math.round(current).toLocaleString('en-IN')}`;
        } else if (element.id === 'systemSize') {
            element.textContent = `${current.toFixed(1)} kW`;
        } else if (element.id === 'co2Reduction') {
            element.textContent = `${current.toFixed(1)} tons/year`;
        }
    }, 16);
}


// Form submission handler
document.querySelector('.contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = this.querySelector('input[type="text"]').value.trim();
    const email = this.querySelector('input[type="email"]').value.trim();
    const phone = this.querySelector('input[type="tel"]').value.trim();
    const message = this.querySelector('textarea').value.trim();

    const statusDiv = document.getElementById('form-status');;
    function showStatus(msg, success = true) {
        statusDiv.textContent = msg;
        statusDiv.style.color = success ? 'green' : 'red';
    }

    if (!name || !email || !phone || !message) {
        showStatus('All fields are required', false);
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showStatus('Please enter a valid email address', false);
        return;
    }

    const phoneRegex = /^[1-9][0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
        showStatus('Please enter a valid 9-digit phone number ', false);
        return;
    }


    const formData = { name, email, phone, message };
    const submitBtn = this.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        let result;
        try {
            result = await res.json();
        } catch (jsonErr) {
            showStatus('Unexpected response from server.', false);
            return;
        }

        if (res.ok) {
            showStatus(result.message || 'Thank you! We will contact you shortly.', true);
            this.reset();
        } else {
            showStatus(result.error || 'Something went wrong. Please try again later.', false);
        }
    } catch (err) {
        console.error('Fetch error:', err);
        showStatus('Network error. Please try again.', false);
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});
// Hero button interactions
document.querySelectorAll('.hero-buttons .btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.querySelectorAll('.hero-buttons .btn-secondary').forEach(btn => {
    btn.addEventListener('click', () => {
        document.getElementById('about').scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});


// Observe elements for animation
document.querySelectorAll('.benefit-card, .service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');

    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    const heroElements = document.querySelectorAll('.hero h1, .hero p, .hero-buttons');
    heroElements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        setTimeout(() => {
            el.style.transition = 'all 0.8s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, i * 300);
    });
});


// Initialize
document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.about-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
    // Set initial styles for animated elements
    const animatedElements = document.querySelectorAll('.hero h1, .hero p, .hero-buttons');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });

    // Initialize calculator results display
    const resultsDiv = document.getElementById('results');
    if (resultsDiv) {
        resultsDiv.style.opacity = '0.7';
    }
});