// particles.js
export function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.classList.add('fixed', 'top-0', 'left-0', 'w-full', 'h-full', 'pointer-events-none', 'z-0');
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 50;
    const coffeeColors = ['#6F4E37', '#8B5A2B', '#A0522D', '#8B4513'];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 10;
            this.size = Math.random() * 3 + 1;
            this.speed = Math.random() * 0.5 + 0.2;
            this.color = coffeeColors[Math.floor(Math.random() * coffeeColors.length)];
            this.opacity = Math.random() * 0.5 + 0.3;
        }

        update() {
            this.y -= this.speed;
            if (this.y < -10) this.reset();
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }

    // Инициализация
    resize();
    window.addEventListener('resize', resize);
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    animate();
}
