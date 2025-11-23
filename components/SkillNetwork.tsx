
import React, { useEffect, useRef, useState } from 'react';
import { SKILLS_CORE, SKILLS_PROGRAMMING } from '../constants';

interface Node {
  id: string;
  label: string;
  group: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  isHub: boolean;
}

interface Link {
  source: Node;
  target: Node;
}

interface SkillNetworkProps {
  isVisible: boolean;
}

const SkillNetwork: React.FC<SkillNetworkProps> = ({ isVisible }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  
  // Track visibility in a ref for the animation loop
  const isVisibleRef = useRef(isVisible);

  // Track hovered node in a ref to avoid restart of animation loop on state change
  const hoveredNodeRef = useRef<string | null>(null);

  useEffect(() => {
    isVisibleRef.current = isVisible;
  }, [isVisible]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    
    // Handle High DPI screens
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    // --- Data Setup ---
    const nodes: Node[] = [];
    const links: Link[] = [];

    // Define Hubs
    const hubs = [
      { id: 'core', label: 'AI & ML', color: '#ef4444' }, // Red
      { id: 'lang', label: 'Languages', color: '#3b82f6' }, // Blue
      { id: 'data', label: 'Data Sci', color: '#eab308' }, // Yellow
      { id: 'tools', label: 'Big Data', color: '#10b981' }, // Green
    ];

    // Initialize Hub Nodes
    hubs.forEach((hub, i) => {
      nodes.push({
        id: hub.id,
        label: hub.label,
        group: hub.id,
        x: width / 2 + (Math.random() - 0.5) * 50,
        y: height / 2 + (Math.random() - 0.5) * 50,
        vx: 0,
        vy: 0,
        radius: 60, // Increased for Hubs
        color: hub.color,
        isHub: true
      });
    });

    // Helper to add skill nodes
    const addSkillNodes = (skills: string[], hubId: string) => {
      skills.forEach(skill => {
        const hubNode = nodes.find(n => n.id === hubId)!;
        const newNode: Node = {
          id: skill,
          label: skill,
          group: hubId,
          x: hubNode.x + (Math.random() - 0.5) * 100,
          y: hubNode.y + (Math.random() - 0.5) * 100,
          vx: 0,
          vy: 0,
          // Sizing logic: Min 30, Max 70
          radius: Math.max(30, Math.min(70, 20 + skill.length * 2.8)), 
          color: '#ffffff', 
          isHub: false
        };
        nodes.push(newNode);
        links.push({ source: hubNode, target: newNode });
      });
    };

    // Add Core Skills
    addSkillNodes(SKILLS_CORE, 'core');
    
    // Add Programming Skills
    const progCategories = SKILLS_PROGRAMMING;
    if (progCategories[0]) addSkillNodes(progCategories[0].items, 'lang');
    if (progCategories[1]) addSkillNodes(progCategories[1].items, 'data');
    if (progCategories[2]) addSkillNodes(progCategories[2].items, 'tools');

    // --- Physics Constants ---
    const REPULSION = 1000; 
    const SPRING_LENGTH = 150; 
    const SPRING_STRENGTH = 0.04;
    const DAMPING = 0.8;
    const CENTER_PULL = 0.006;
    const MOUSE_REPULSION_RADIUS = 200;
    const MAX_VELOCITY = 8;

    let animationFrameId: number;
    let mouseX = -1000;
    let mouseY = -1000;
    let isDragging = false;
    let draggedNode: Node | null = null;

    const updatePhysics = () => {
      // 1. Repulsion (Long range forces)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy) || 1;
          
          if (distance < 700) { 
             const force = REPULSION / (distance * distance);
             const fx = (dx / distance) * force;
             const fy = (dy / distance) * force;

             nodes[i].vx += fx;
             nodes[i].vy += fy;
             nodes[j].vx -= fx;
             nodes[j].vy -= fy;
          }
        }
      }

      // 2. Spring Force (Hooke's Law)
      links.forEach(link => {
        const dx = link.target.x - link.source.x;
        const dy = link.target.y - link.source.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;

        const force = (distance - SPRING_LENGTH) * SPRING_STRENGTH;
        const fx = (dx / distance) * force;
        const fy = (dy / distance) * force;

        link.source.vx += fx;
        link.source.vy += fy;
        link.target.vx -= fx;
        link.target.vy -= fy;
      });

      // 3. Center Gravity
      nodes.forEach(node => {
        const dx = width / 2 - node.x;
        const dy = height / 2 - node.y;
        node.vx += dx * CENTER_PULL;
        node.vy += dy * CENTER_PULL;
      });

      // 4. Mouse Interaction (only when not dragging a specific node to avoid fighting)
      if (!isDragging) {
        nodes.forEach(node => {
            const dx = node.x - mouseX;
            const dy = node.y - mouseY;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < MOUSE_REPULSION_RADIUS) {
                // Gentle repulsion from mouse
                const force = (MOUSE_REPULSION_RADIUS - dist) * 0.03;
                node.vx += (dx/dist) * force;
                node.vy += (dy/dist) * force;
            }
        });
      }

      // 5. Active Drag Repulsion
      // Gently push other nodes away from the dragged node to ensure visibility
      if (draggedNode) {
          nodes.forEach(node => {
              if (node === draggedNode) return;
              const dx = node.x - draggedNode!.x;
              const dy = node.y - draggedNode!.y;
              const dist = Math.sqrt(dx*dx + dy*dy) || 1;
              const minClearance = draggedNode!.radius + node.radius + 50; // Extra clearance (increased from 30)

              if (dist < minClearance) {
                  const force = (minClearance - dist) * 0.5; // Stronger local push
                  node.vx += (dx / dist) * force;
                  node.vy += (dy / dist) * force;
              }
          });
      }

      // 6. Update Position & Damping
      nodes.forEach(node => {
        if (node === draggedNode) return; // Don't move dragged node by physics

        // Cap Velocity
        const vMag = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (vMag > MAX_VELOCITY) {
            node.vx = (node.vx / vMag) * MAX_VELOCITY;
            node.vy = (node.vy / vMag) * MAX_VELOCITY;
        }

        node.x += node.vx;
        node.y += node.vy;

        // Apply damping
        node.vx *= DAMPING;
        node.vy *= DAMPING;
      });

      // 7. Resolve Overlaps (Position Correction)
      // Iterate multiple times for stability
      for (let k = 0; k < 3; k++) {
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const nodeA = nodes[i];
            const nodeB = nodes[j];
            const dx = nodeA.x - nodeB.x;
            const dy = nodeA.y - nodeB.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const minSpacing = nodeA.radius + nodeB.radius + 5; // 5px buffer

            if (dist < minSpacing) {
              const overlap = minSpacing - dist;
              const nx = dx / dist;
              const ny = dy / dist;
              const moveX = nx * overlap * 0.5;
              const moveY = ny * overlap * 0.5;

              // If a node is being dragged, it acts as a static wall to others
              if (nodeA === draggedNode) {
                nodeB.x -= moveX * 2;
                nodeB.y -= moveY * 2;
              } else if (nodeB === draggedNode) {
                nodeA.x += moveX * 2;
                nodeA.y += moveY * 2;
              } else {
                nodeA.x += moveX;
                nodeA.y += moveY;
                nodeB.x -= moveX;
                nodeB.y -= moveY;
              }
            }
          }
        }
      }

      // 8. Boundary Containment (Position based)
      nodes.forEach(node => {
        if (node === draggedNode) return;
        const margin = node.radius;
        if (node.x < margin) { node.x = margin; node.vx *= -0.5; }
        if (node.x > width - margin) { node.x = width - margin; node.vx *= -0.5; }
        if (node.y < margin) { node.y = margin; node.vy *= -0.5; }
        if (node.y > height - margin) { node.y = height - margin; node.vy *= -0.5; }
      });
    };

    const drawRoundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    };

    const drawNode = (node: Node, isDragged: boolean) => {
        const isHovered = node.id === hoveredNodeRef.current;
        
        let fillColor = node.isHub ? node.color : '#1a1a1a';
        let strokeColor = node.isHub ? '#ffffff' : (nodes.find(n => n.id === node.group)?.color || '#888');
        
        if (isHovered || isDragged) {
            fillColor = node.isHub ? node.color : '#333';
            strokeColor = '#ffffff';
        }

        // Scale up visuals if dragged
        const currentRadius = isDragged ? node.radius * 1.15 : node.radius;

        // Node Body
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = fillColor;
        ctx.fill();
        
        // Glow effect
        if (isDragged) {
           ctx.shadowColor = "rgba(239, 68, 68, 0.9)"; // Strong Red Glow
           ctx.shadowBlur = 40; // Increased blur for dragged node
        } else if (node.isHub || isHovered) {
            ctx.shadowColor = strokeColor;
            ctx.shadowBlur = 20;
        }

        // Stroke
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = isDragged ? 4 : (isHovered ? 4 : (node.isHub ? 0 : 2));
        
        if (!node.isHub || isDragged) ctx.stroke();
        else if (node.isHub && isHovered) ctx.stroke();

        ctx.shadowBlur = 0; // Reset for text

        // Label
        ctx.fillStyle = node.isHub ? '#000' : '#fff';
        ctx.font = `bold ${node.isHub ? 20 : 14}px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, node.x, node.y);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const time = Date.now();

      // Draw Links
      links.forEach(link => {
        ctx.beginPath();
        ctx.moveTo(link.source.x, link.source.y);
        ctx.lineTo(link.target.x, link.target.y);
        
        // Find the color of the hub (source of the link)
        const hubColor = (nodes.find(n => n.id === link.source.group)?.color) || '#ffffff';
        const isConnected = hoveredNodeRef.current && (link.source.id === hoveredNodeRef.current || link.target.id === hoveredNodeRef.current);
        
        // Always use hub color, but adjust opacity based on interaction
        ctx.strokeStyle = hubColor;
        if (isConnected) {
            ctx.globalAlpha = 1.0;
            ctx.lineWidth = 2;
        } else {
            ctx.globalAlpha = 0.2; // Use subtle transparency for inactive links
            ctx.lineWidth = 1;
        }
        ctx.stroke();
        ctx.globalAlpha = 1.0; // Reset alpha
      });

      // ----------------------------------------------------
      // PULSING ANIMATION FOR CORE HUB
      // ----------------------------------------------------
      const coreNode = nodes.find(n => n.id === 'core');
      if (coreNode) {
          const pulseScale = 1 + Math.sin(time * 0.002) * 0.08; // Smooth pulse
          const alpha = 0.2 + Math.sin(time * 0.002) * 0.1;
          
          ctx.beginPath();
          ctx.arc(coreNode.x, coreNode.y, coreNode.radius * pulseScale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(239, 68, 68, ${alpha})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(coreNode.x, coreNode.y, coreNode.radius * pulseScale * 1.15, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(239, 68, 68, ${alpha * 0.5})`;
          ctx.fill();
      }

      // Draw standard nodes (not dragged)
      nodes.forEach(node => {
        if (node !== draggedNode) drawNode(node, false);
      });

      // Draw dragged node last to appear on top
      if (draggedNode) {
          drawNode(draggedNode, true);
      }

      // ----------------------------------------------------
      // TOOLTIP RENDERING
      // ----------------------------------------------------
      if (hoveredNodeRef.current && !isDragging) { // Hide tooltip when dragging
        const node = nodes.find(n => n.id === hoveredNodeRef.current);
        if (node) {
            // Determine Description
            let desc = "Technical Proficiency";
            if (node.group === 'core') desc = "Core Competency & Research Focus";
            else if (node.group === 'lang') desc = "Programming & Scripting";
            else if (node.group === 'data') desc = "Data Analysis & Visualization";
            else if (node.group === 'tools') desc = "Big Data & Database Tech";
            
            if (node.isHub) desc = "Primary Knowledge Domain";

            // Metrics for box
            ctx.font = "bold 15px Inter, sans-serif";
            const titleMetrics = ctx.measureText(node.label);
            ctx.font = "12px Inter, sans-serif";
            const descMetrics = ctx.measureText(desc);

            const boxWidth = Math.max(titleMetrics.width, descMetrics.width) + 24;
            const boxHeight = 52;
            const padding = 12;
            const offset = 18;

            let tx = node.x + node.radius + offset;
            let ty = node.y - boxHeight / 2;

            // Boundary checks
            if (tx + boxWidth > width) {
                tx = node.x - node.radius - offset - boxWidth;
            }
            if (ty < 0) ty = 10;
            if (ty + boxHeight > height) ty = height - boxHeight - 10;

            // Draw Tooltip Background
            ctx.shadowColor = "rgba(0,0,0,0.5)";
            ctx.shadowBlur = 10;
            ctx.fillStyle = "rgba(10, 10, 10, 0.95)";
            ctx.strokeStyle = "rgba(239, 68, 68, 0.4)";
            
            drawRoundedRect(ctx, tx, ty, boxWidth, boxHeight, 8);
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Draw Tooltip Text
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 15px Inter, sans-serif";
            ctx.fillText(node.label, tx + padding, ty + padding - 2);

            ctx.fillStyle = "#9ca3af";
            ctx.font = "12px Inter, sans-serif";
            ctx.fillText(desc, tx + padding, ty + padding + 20);
        }
      }
    };

    const loop = () => {
      // Only run physics and draw if visible to save resources
      if (isVisibleRef.current) {
        updatePhysics();
        draw();
      }
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();

    // ----------------------------------------------------
    // EVENT HANDLERS (MOUSE + TOUCH)
    // ----------------------------------------------------
    
    // Helper to get position from mouse or touch event
    const getPointerPos = (e: MouseEvent | TouchEvent) => {
        const rect = canvas.getBoundingClientRect();
        let clientX = 0;
        let clientY = 0;
        
        if (window.TouchEvent && e instanceof TouchEvent) {
             clientX = e.touches[0].clientX;
             clientY = e.touches[0].clientY;
        } else if (e instanceof MouseEvent) {
             clientX = e.clientX;
             clientY = e.clientY;
        }
        
        return {
            x: (clientX - rect.left),
            y: (clientY - rect.top)
        };
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isVisibleRef.current || !canvas) return;

      const pos = getPointerPos(e);
      mouseX = pos.x;
      mouseY = pos.y;

      // If Dragging: directly control the node position
      if (isDragging && draggedNode) {
        // Stop scrolling on mobile if dragging
        if (e.type === 'touchmove') e.preventDefault();

        // Clamp to boundaries to prevent losing the node (Fix for "Vanishing" issue)
        const margin = draggedNode.radius;
        draggedNode.x = Math.max(margin, Math.min(width - margin, mouseX));
        draggedNode.y = Math.max(margin, Math.min(height - margin, mouseY));
        
        draggedNode.vx = 0;
        draggedNode.vy = 0;
        
        if (canvas.style.cursor !== 'grabbing') canvas.style.cursor = 'grabbing';
        
        // Return early to skip hover detection during drag (optimization + stability)
        return;
      }

      // If Not Dragging: Detect Hover (Only meaningful for Mouse, but logic is shared)
      let found: string | null = null;
      // Search in reverse to find top-most node
      for (let i = nodes.length - 1; i >= 0; i--) {
        const node = nodes[i];
        const dx = node.x - mouseX;
        const dy = node.y - mouseY;
        if (dx*dx + dy*dy < node.radius * node.radius) {
            found = node.id;
            break;
        }
      }
      
      if (hoveredNodeRef.current !== found) {
          hoveredNodeRef.current = found;
          setHoveredNode(found); 
      }

      if (!isDragging && canvas.style.cursor !== (found ? 'pointer' : 'default')) {
          canvas.style.cursor = found ? 'pointer' : 'default';
      }
    };

    const handleStart = (e: MouseEvent | TouchEvent) => {
        if (!isVisibleRef.current) return;
        
        // Prevent default browser drag behavior on Canvas
        if (e.type === 'mousedown') e.preventDefault();
        
        // For touch, update mouse pos first to ensure hit detection works
        if (window.TouchEvent && e instanceof TouchEvent) {
             const pos = getPointerPos(e);
             mouseX = pos.x;
             mouseY = pos.y;
             
             // Check hover manually for touch start
             for (let i = nodes.length - 1; i >= 0; i--) {
                const node = nodes[i];
                const dx = node.x - mouseX;
                const dy = node.y - mouseY;
                if (dx*dx + dy*dy < node.radius * node.radius) {
                    hoveredNodeRef.current = node.id;
                    break;
                }
             }
        }

        if (hoveredNodeRef.current) {
            isDragging = true;
            draggedNode = nodes.find(n => n.id === hoveredNodeRef.current) || null;
            if (canvas) canvas.style.cursor = 'grabbing';
        }
    };

    const handleEnd = () => {
        isDragging = false;
        draggedNode = null;
        if (canvas) canvas.style.cursor = hoveredNodeRef.current ? 'pointer' : 'default';
    };
    
    // Attach listeners
    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('touchstart', handleStart, { passive: false });
    
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove, { passive: false });
    
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchend', handleEnd);
    
    const handleResize = () => {
        width = container.clientWidth;
        height = container.clientHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousedown', handleStart);
      canvas.removeEventListener('touchstart', handleStart);
      
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchend', handleEnd);
      
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative bg-black/20 rounded-2xl border border-white/5 overflow-hidden group touch-none">
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
      
      <div className={`absolute bottom-4 left-4 flex flex-col gap-2 pointer-events-none transition-opacity duration-300 ${isVisible ? 'opacity-50 group-hover:opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span> <span className="text-xs text-gray-300">AI & ML Core</span>
        </div>
        <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span> <span className="text-xs text-gray-300">Languages</span>
        </div>
        <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span> <span className="text-xs text-gray-300">Data Science</span>
        </div>
        <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500"></span> <span className="text-xs text-gray-300">Big Data & Tools</span>
        </div>
      </div>
    </div>
  );
};

export default SkillNetwork;
