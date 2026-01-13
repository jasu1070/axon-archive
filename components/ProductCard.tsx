
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Plus, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative h-[500px] w-full glass-premium rounded-none overflow-hidden cursor-none"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="p-8 h-full flex flex-col relative z-10" style={{ transform: "translateZ(50px)" }}>
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-[10px] font-bold text-cyan-400">
            <Star size={10} fill="currentColor" />
            {product.rating}
          </div>
        </div>

        <div className="relative flex-grow flex items-center justify-center py-12">
          <motion.img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-700"
            style={{ transform: "translateZ(30px)" }}
          />
          <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <div className="mt-auto">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-1">
            {product.name}
          </h3>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-6">
            Unit: {product.id.padStart(3, '0')} // ${product.price}
          </p>
          
          <div className="flex items-center justify-between">
            <button 
              onClick={() => onAddToCart(product)}
              className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white group/btn"
            >
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-all">
                <Plus size={14} />
              </div>
              Acquire Item
            </button>
            <div className="w-12 h-[1px] bg-slate-800" />
          </div>
        </div>
      </div>
      
      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/10" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/10" />
    </motion.div>
  );
};

export default ProductCard;
