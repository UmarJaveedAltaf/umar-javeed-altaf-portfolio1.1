import React, { useEffect, useRef } from 'react';

const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    
    // Matrix characters including numbers, letters, and symbols
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*';
    const charArray = chars.split('');
    
    const fontSize = 14;
    // Use Math.ceil to ensure we cover the edge
    let columns = Math.ceil(width / fontSize);
    
    // Array of drops - one per column
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100; // Start at random positions above screen
    }

    const draw = () => {
      // Black BG for the canvas with very high transparency for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; 
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Color logic: Red dominant with Blue and Green accents
        const rand = Math.random();
        
        if (rand > 0.90) {
            ctx.fillStyle = '#3b82f6'; // Blue accent (Tailwind blue-500)
        } else if (rand > 0.80) {
            ctx.fillStyle = '#22c55e'; // Green accent (Tailwind green-500)
        } else if (rand > 0.50) {
            ctx.fillStyle = '#ef4444'; // Bright Red (Tailwind red-500)
        } else {
            ctx.fillStyle = '#7f1d1d'; // Dark Red base (Tailwind red-900)
        }
        
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly after it has crossed screen
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Increment Y coordinate
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      const newColumns = Math.ceil(width / fontSize);
      
      // If the window has grown wider, add more drops to fill the new space
      if (newColumns > drops.length) {
        for (let i = drops.length; i < newColumns; i++) {
          drops[i] = Math.random() * -100;
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.35 }}
    />
  );
};

export default MatrixBackground;