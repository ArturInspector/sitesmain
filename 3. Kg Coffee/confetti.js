export function createConfetti(canvas) {
    const ctx = canvas.getContext('2d');
    const emojis = ['☕', '🫘', '🥛', '🍫', '🍯'];
    const confetti = [];
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    class Confetti {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height;
            this.emoji = emojis[Math.floor(Math.random() * emojis.length)];
            this.size = Math.random() * 20 + 10;
            this.speed = Math.random() * 5 + 2;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 2 - 1;
        }
        
        update() {
            this.y -= this.speed;
            this.rotation += this.rotationSpeed;
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.font = `${this.size}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.emoji, 0, 0);
            ctx.restore();
        }
    }
    
    // Создаем конфетти
    for (let i = 0; i < 30; i++) {
        confetti.push(new Confetti());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let active = false;
        confetti.forEach(c => {
            c.update();
            c.draw();
            if (c.y > -c.size) active = true;
        });
        
        if (active) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    
    animate();
}
