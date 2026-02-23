// Cursor Trail Effect
class CursorTrail {
    constructor() {
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.setupCanvas();
        this.setupEventListeners();
        this.animate();
    }

    setupCanvas() {
        this.canvas.id = 'cursor-trail-canvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '9999';
        
        document.body.appendChild(this.canvas);
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            // Create particles at cursor position
            if (Math.random() > 0.7) {
                this.createParticle(e.clientX, e.clientY);
            }
        });

        document.addEventListener('mouseenter', () => {
            this.particles = [];
        });
    }

    createParticle(x, y) {
        const particle = {
            x: x,
            y: y,
            size: Math.random() * 4 + 2,
            opacity: 1,
            velocityX: (Math.random() - 0.5) * 2,
            velocityY: (Math.random() - 0.5) * 2,
            life: 1
        };
        
        this.particles.push(particle);
    }

    animate() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            // Update particle
            particle.x += particle.velocityX;
            particle.y += particle.velocityY;
            particle.life -= 0.015;
            particle.velocityY += 0.1; // Gravity effect
            
            // Draw particle
            if (particle.life > 0) {
                this.ctx.save();
                this.ctx.fillStyle = `rgba(0, 0, 0, ${particle.life * 0.5})`;
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.restore();
            } else {
                // Remove dead particles
                this.particles.splice(i, 1);
            }
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize cursor trail when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new CursorTrail();
    });
} else {
    new CursorTrail();
}
