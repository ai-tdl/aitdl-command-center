/**
 * ============================================
 * AITDL — India's AI Command Center
 * ============================================
 * @author    Jawahar Ramkripal Mallah
 * @role      Software Developer & Service 
 *            Provider since 2007
 *            Published Author | Tech Entrepreneur
 * @website   https://aitdl.com
 * @email     hello@aitdl.com
 * @copyright © 2025 All Rights Reserved
 * ============================================
 */

import React, { useEffect, useRef } from 'react';

const NeuralNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let nodes = [];
    const nodeCount = 60;
    const colors = ['#FF6B35', '#00B4D8', '#FF8E64', '#48CAE4'];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          depth: Math.random(),
          pulse: 0,
        });
      }
    };
    init();

    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      nodes.forEach((n, i) => {
        nodes.slice(i + 1).forEach((m) => {
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist / 180)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();

            // Random "Data Pulse"
            if (Math.random() > 0.998) {
              const pulsePos = Math.random();
              const px = n.x + (m.x - n.x) * pulsePos;
              const py = n.y + (m.y - n.y) * pulsePos;
              ctx.beginPath();
              ctx.arc(px, py, 2, 0, Math.PI * 2);
              ctx.fillStyle = '#fff';
              ctx.shadowBlur = 15;
              ctx.shadowColor = '#fff';
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          }
        });

        // Mouse interaction: Pushing nodes
        const mdx = n.x - mouse.x;
        const mdy = n.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 150) {
          const angle = Math.atan2(mdy, mdx);
          const force = (150 - mdist) / 1500;
          n.vx += Math.cos(angle) * force;
          n.vy += Math.sin(angle) * force;
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * (1 + n.depth), 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = n.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Motion physics
        n.x += n.vx;
        n.y += n.vy;
        n.vx *= 0.99; // Dampen
        n.vy *= 0.99;

        // Bounds check
        if (n.x < -10) n.x = canvas.width + 10;
        if (n.x > canvas.width + 10) n.x = -10;
        if (n.y < -10) n.y = canvas.height + 10;
        if (n.y > canvas.height + 10) n.y = -10;
      });

      requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('resize', init);
    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.8,
      }}
    />
  );
};

export default NeuralNetwork;
