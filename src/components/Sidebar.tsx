import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="fixed right-6 bottom-24 z-40 flex flex-col space-y-4">
      {/* TikTok */}
      <motion.a
        whileHover={{ scale: 1.1, x: -5 }}
        href="https://www.tiktok.com/@shumailkhanfx"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
        </svg>
      </motion.a>

      {/* WhatsApp */}
      <motion.a
        whileHover={{ scale: 1.1, x: -5 }}
        href="https://wa.me/923155431571"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
      >
        <MessageCircle size={24} />
      </motion.a>
    </div>
  );
}
