// Advanced animations and effects for the love website

// Animation utility functions
class LoveAnimations {
    constructor() {
        this.initializeAdvancedEffects();
        this.setupParticleSystem();
        this.createLoveParticles();
    }

    // Initialize advanced visual effects
    initializeAdvancedEffects() {
        this.createSnowflakeHearts();
        this.setupMouseTracker();
        this.initializeTextEffects();
        this.setupScrollMagic();
    }

    // Create falling heart snowflakes
    createSnowflakeHearts() {
        const container = document.createElement('div');
        container.className = 'snowflake-hearts';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        document.body.appendChild(container);

        const hearts = ['❤️', '💖', '💕', '💗', '💘', '💝'];
        
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.createFallingHeart(container, hearts);
            }
        }, 1000);
    }

    createFallingHeart(container, hearts) {
        const heart = document.createElement('div');
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.cssText = `
            position: absolute;
            top: -50px;
            left: ${Math.random() * 100}%;
            font-size: ${Math.random() * 1.5 + 1}rem;
            opacity: ${Math.random() * 0.7 + 0.3};
            animation: fallDown ${Math.random() * 5 + 8}s linear forwards;
            z-index: 1;
        `;

        // Add falling animation
        this.addFallingAnimation();
        
        container.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 13000);
    }

    addFallingAnimation() {
        if (!document.getElementById('falling-animation')) {
            const style = document.createElement('style');
            style.id = 'falling-animation';
            style.textContent = `
                @keyframes fallDown {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Advanced mouse tracking effects
    setupMouseTracker() {
        let mouseX = 0, mouseY = 0;
        let trailing = [];

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Create magic trail
            this.createMagicTrail(mouseX, mouseY);
        });

        // Smooth trailing effect
        this.animateTrail();
    }

    createMagicTrail(x, y) {
        if (Math.random() > 0.8) {
            const trail = document.createElement('div');
            trail.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, #ff69b4, transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 10;
                animation: magicTrail 1s ease-out forwards;
            `;

            document.body.appendChild(trail);

            setTimeout(() => {
                if (trail.parentNode) {
                    trail.parentNode.removeChild(trail);
                }
            }, 1000);
        }
    }

    // Particle system for love effects
    setupParticleSystem() {
        if (!document.getElementById('magic-trail-style')) {
            const style = document.createElement('style');
            style.id = 'magic-trail-style';
            style.textContent = `
                @keyframes magicTrail {
                    0% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: scale(0) rotate(180deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    createLoveParticles() {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 2;
        `;
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        
        // Create particle system
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: Math.random() * 100,
                maxLife: 100,
                size: Math.random() * 3 + 1
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach((particle, index) => {
                particle.life--;
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.life <= 0) {
                    particles[index] = {
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        vx: (Math.random() - 0.5) * 2,
                        vy: (Math.random() - 0.5) * 2,
                        life: Math.random() * 100,
                        maxLife: 100,
                        size: Math.random() * 3 + 1
                    };
                }
                
                const alpha = particle.life / particle.maxLife;
                ctx.save();
                ctx.globalAlpha = alpha * 0.5;
                ctx.fillStyle = '#ff69b4';
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();

        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Advanced text effects
    initializeTextEffects() {
        this.addTextShimmer();
        this.setupHoverEffects();
    }

    addTextShimmer() {
        const style = document.createElement('style');
        style.textContent = `
            .shimmer-text {
                background: linear-gradient(90deg, 
                    transparent 0%, 
                    rgba(255, 255, 255, 0.8) 50%, 
                    transparent 100%);
                background-size: 200% 100%;
                -webkit-background-clip: text;
                background-clip: text;
                animation: shimmer 3s infinite;
            }
            
            @keyframes shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
            }
        `;
        document.head.appendChild(style);

        // Apply shimmer to main title periodically
        setInterval(() => {
            const title = document.querySelector('.main-title');
            if (title) {
                title.classList.add('shimmer-text');
                setTimeout(() => {
                    title.classList.remove('shimmer-text');
                }, 3000);
            }
        }, 10000);
    }

    setupHoverEffects() {
        // Add hover effects to love cards
        const loveCards = document.querySelectorAll('.love-card');
        loveCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.createHoverParticles(card);
            });
        });
    }

    createHoverParticles(element) {
        const rect = element.getBoundingClientRect();
        const particles = 10;
        
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.innerHTML = '✨';
            particle.style.cssText = `
                position: fixed;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                font-size: 1rem;
                pointer-events: none;
                z-index: 100;
                animation: sparkleFloat 2s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 2000);
        }

        // Add sparkle animation
        if (!document.getElementById('sparkle-float-style')) {
            const style = document.createElement('style');
            style.id = 'sparkle-float-style';
            style.textContent = `
                @keyframes sparkleFloat {
                    0% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-100px) scale(0.5) rotate(180deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Scroll-based magic effects
    setupScrollMagic() {
        let ticking = false;
        
        const updateScrollEffects = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            // Parallax effect for hearts
            const hearts = document.querySelectorAll('.heart');
            hearts.forEach((heart, index) => {
                const speed = (index + 1) * 0.1;
                heart.style.transform = `translateY(${rate * speed}px)`;
            });
            
            ticking = false;
        };
        
        const requestScrollUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestScrollUpdate);
    }

    // Special love burst effect
    static createLoveBurst(x, y) {
        const burstContainer = document.createElement('div');
        burstContainer.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 1000;
        `;
        
        const hearts = ['❤️', '💖', '💕', '💗', '💘'];
        const particleCount = 15;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = Math.random() * 100 + 50;
            const endX = Math.cos(angle) * velocity;
            const endY = Math.sin(angle) * velocity;
            
            particle.style.cssText = `
                position: absolute;
                font-size: 1.5rem;
                animation: burst 2s ease-out forwards;
                --endX: ${endX}px;
                --endY: ${endY}px;
            `;
            
            burstContainer.appendChild(particle);
        }
        
        document.body.appendChild(burstContainer);
        
        // Add burst animation
        if (!document.getElementById('burst-style')) {
            const style = document.createElement('style');
            style.id = 'burst-style';
            style.textContent = `
                @keyframes burst {
                    0% {
                        opacity: 1;
                        transform: translate(0, 0) scale(1) rotate(0deg);
                    }
                    100% {
                        opacity: 0;
                        transform: translate(var(--endX), var(--endY)) scale(0.3) rotate(360deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            if (burstContainer.parentNode) {
                burstContainer.parentNode.removeChild(burstContainer);
            }
        }, 2000);
    }

    // Animate trail effect
    animateTrail() {
        // This is called from setupMouseTracker and creates smooth trailing effects
    }
}

// Initialize advanced animations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const loveAnimations = new LoveAnimations();
    
    // Add double-click love burst effect
    document.addEventListener('dblclick', function(e) {
        LoveAnimations.createLoveBurst(e.clientX, e.clientY);
    });
    
    // Add special effects for Soumi's name
    const soumiName = document.querySelector('.highlight-name');
    if (soumiName) {
        soumiName.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'nameGlow 3s ease-in-out infinite, pulse 2s ease-in-out infinite';
            }, 10);
            
            // Create special effect around the name
            const rect = this.getBoundingClientRect();
            LoveAnimations.createLoveBurst(
                rect.left + rect.width / 2, 
                rect.top + rect.height / 2
            );
        });
    }
});

// Export for use in other files
window.LoveAnimations = LoveAnimations;
