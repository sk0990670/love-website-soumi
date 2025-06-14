// Main JavaScript functionality for the love website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    initializeStars();
    initializeScrollAnimations();
    initializeCounters();
    initializeLoveButton();
    initializePoemAnimation();
    
    console.log('💖 Love website loaded with all my heart! 💖');
});

// Create floating stars background
function initializeStars() {
    const starsContainer = document.getElementById('stars');
    const numberOfStars = 100;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position and size
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const size = Math.random() * 3 + 1;
        
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        starsContainer.appendChild(star);
    }
}

// Scroll-triggered animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animation when counter section is visible
                if (entry.target.classList.contains('counter-section')) {
                    animateCounters();
                }
                
                // Trigger poem animation when poem section is visible
                if (entry.target.classList.contains('poem-section')) {
                    animatePoem();
                }
            }
        });
    }, observerOptions);
    
    // Observe elements that need scroll animations
    const animatedElements = document.querySelectorAll('.love-card, .counter-section, .poem-section');
    animatedElements.forEach(el => observer.observe(el));
}

// Animated counters
function initializeCounters() {
    // This will be triggered by scroll animation
}

function animateCounters() {
    const counters = document.querySelectorAll('.counter-number[data-target]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const start = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOutCubic * target);
            
            counter.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
                counter.classList.add('counter-up');
            }
        }
        
        requestAnimationFrame(updateCounter);
    });
}

// Love button functionality
function initializeLoveButton() {
    const loveButton = document.getElementById('loveButton');
    const loveMessage = document.getElementById('loveMessage');
    const buttonHearts = loveButton.querySelector('.button-hearts');
    
    let clickCount = 0;
    const loveMessages = [
        "💕 Love sent to Soumi Mukherjee! 💕",
        "💖 Sending infinite hugs to Soumi! 💖",
        "💗 My heart beats only for Soumi! 💗",
        "💘 Soumi, you are my everything! 💘",
        "💝 Forever yours, beautiful Soumi! 💝",
        "💞 Every click sends more love to Soumi! 💞"
    ];
    
    loveButton.addEventListener('click', function() {
        clickCount++;
        
        // Show heart burst animation
        buttonHearts.style.opacity = '1';
        setTimeout(() => {
            buttonHearts.style.opacity = '0';
        }, 1000);
        
        // Update love message
        const messageIndex = (clickCount - 1) % loveMessages.length;
        loveMessage.textContent = loveMessages[messageIndex];
        loveMessage.classList.add('show');
        
        // Create floating hearts from button
        createFloatingHearts(loveButton);
        
        // Add ripple effect
        createRippleEffect(loveButton, event);
        
        // Vibrate on mobile devices
        if (navigator.vibrate) {
            navigator.vibrate(200);
        }
        
        console.log(`💖 Love click #${clickCount} sent to Soumi Mukherjee! 💖`);
    });
}

// Create floating hearts from button click
function createFloatingHearts(button) {
    const rect = button.getBoundingClientRect();
    const heartsToCreate = 5;
    
    for (let i = 0; i < heartsToCreate; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = (rect.left + rect.width / 2) + 'px';
        heart.style.top = (rect.top + rect.height / 2) + 'px';
        heart.style.fontSize = '1.5rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.animation = `floatingHeart 2s ease-out forwards`;
        heart.style.animationDelay = (i * 0.1) + 's';
        
        // Random direction
        const angle = (Math.PI * 2 * i) / heartsToCreate;
        const distance = 100 + Math.random() * 50;
        const endX = rect.left + rect.width / 2 + Math.cos(angle) * distance;
        const endY = rect.top + rect.height / 2 + Math.sin(angle) * distance;
        
        heart.style.setProperty('--endX', endX + 'px');
        heart.style.setProperty('--endY', endY + 'px');
        
        document.body.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 2000);
    }
    
    // Add CSS for floating heart animation
    if (!document.getElementById('floating-heart-style')) {
        const style = document.createElement('style');
        style.id = 'floating-heart-style';
        style.textContent = `
            @keyframes floatingHeart {
                0% {
                    opacity: 1;
                    transform: translate(0, 0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translate(calc(var(--endX) - 50vw), calc(var(--endY) - 50vh)) scale(0.5);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Create ripple effect on button click
function createRippleEffect(button, event) {
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    // Add ripple styles if not exist
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: rippleEffect 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes rippleEffect {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Poem animation
function initializePoemAnimation() {
    // This will be triggered by scroll animation
}

function animatePoem() {
    const poemLines = document.querySelectorAll('.poem-line');
    
    poemLines.forEach((line, index) => {
        setTimeout(() => {
            line.classList.add('visible');
        }, index * 300);
    });
}

// Add some interactive features
document.addEventListener('mousemove', function(e) {
    // Create subtle mouse trail effect
    if (Math.random() > 0.95) { // Only occasionally create hearts
        createMouseHeart(e.clientX, e.clientY);
    }
});

function createMouseHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '💕';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '0.8rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '5';
    heart.style.opacity = '0.7';
    heart.style.animation = 'fadeOutUp 2s ease-out forwards';
    
    // Add fade out animation if not exists
    if (!document.getElementById('mouse-heart-style')) {
        const style = document.createElement('style');
        style.id = 'mouse-heart-style';
        style.textContent = `
            @keyframes fadeOutUp {
                0% {
                    opacity: 0.7;
                    transform: translateY(0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-50px) scale(0.5);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 2000);
}

// Add keyboard interactions
document.addEventListener('keydown', function(e) {
    // Press 'L' for love
    if (e.key.toLowerCase() === 'l') {
        const loveButton = document.getElementById('loveButton');
        if (loveButton) {
            loveButton.click();
        }
    }
    
    // Press 'S' for Soumi
    if (e.key.toLowerCase() === 's') {
        const soumiName = document.querySelector('.highlight-name');
        if (soumiName) {
            soumiName.style.animation = 'none';
            setTimeout(() => {
                soumiName.style.animation = 'nameGlow 3s ease-in-out infinite';
            }, 10);
        }
    }
});

// Add some special effects on page load
window.addEventListener('load', function() {
    // Create welcome message
    setTimeout(() => {
        console.log('✨ Welcome to a website made with infinite love for Soumi Mukherjee! ✨');
        console.log('💡 Tip: Press "L" to send love, "S" to make Soumi\'s name glow!');
    }, 1000);
    
    // Add loading completion effect
    document.body.classList.add('loaded');
});

// Performance optimization: Reduce animations on low-end devices
if (navigator.hardwareConcurrency < 4) {
    document.documentElement.style.setProperty('--animation-duration', '0.5s');
}

// Add favicon dynamically
function addFavicon() {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">❤️</text></svg>';
    document.head.appendChild(link);
}

addFavicon();
