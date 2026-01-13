
import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest('button, a, input, [role="button"]'));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        style={{ x: cursorX, y: cursorY }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-400/50 pointer-events-none z-[9999] flex items-center justify-center -ml-4 -mt-4"
        animate={{ scale: isHovering ? 2 : 1, opacity: 1 }}
      >
        <div className="w-1 h-1 bg-cyan-400 rounded-full" />
      </motion.div>
      <motion.div
        animate={{ x: mousePos.x - 2, y: mousePos.y - 2 }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
        className="fixed top-0 left-0 w-1 h-1 bg-cyan-400 rounded-full pointer-events-none z-[10000]"
      />
    </>
  );
};

export default CustomCursor;
