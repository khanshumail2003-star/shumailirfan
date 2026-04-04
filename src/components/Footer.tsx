import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-violet-500 rounded flex items-center justify-center text-white font-bold">
                S
              </div>
              <span className="font-bold text-white text-lg">Shumail Khan</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Passionate graphic designer specializing in creative logos, social media content, and visual storytelling.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold uppercase tracking-wider text-sm">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-violet-400" />
                <span>hafizmuhammadshumailirfan@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-violet-400" />
                <span>+92 315 5431571</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin size={16} className="text-violet-400" />
                <span>Rahim Yar Khan, Pakistan</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold uppercase tracking-wider text-sm">Follow Me</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.tiktok.com/@shumailkhanfx"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-violet-600 transition-colors"
              >
                <span className="sr-only">TikTok</span>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                </svg>
              </a>
              <a
                href="https://wa.me/923155431571"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <span className="sr-only">WhatsApp</span>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-4.821 4.766c-2.197 0-4.338-.58-6.203-1.677l-.445-.261-4.61 1.21 1.231-4.493-.285-.454C1.24 11.587.651 9.623.651 7.574c0-4.507 3.666-8.173 8.173-8.173 2.183 0 4.235.85 5.777 2.392 1.542 1.542 2.392 3.594 2.392 5.777 0 4.508-3.666 8.174-8.173 8.174m8.173-17.074c-2.183-2.183-5.085-3.385-8.173-3.385-6.37 0-11.554 5.184-11.554 11.554 0 2.037.533 4.025 1.547 5.791L0 24l6.349-1.666c1.716.935 3.64 1.428 5.599 1.428h.005c6.369 0 11.554-5.184 11.554-11.554 0-3.088-1.202-5.99-3.385-8.173" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Shumail Khan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
