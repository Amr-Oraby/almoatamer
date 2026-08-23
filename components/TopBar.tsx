import { Phone, Mail } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaSnapchatGhost } from 'react-icons/fa';
import { Link } from '@/i18n/routing';

export default function TopBar() {
  return (
    <div className="hidden lg:block bg-primary text-primary-foreground py-2 text-sm w-full">
      <div className="w-full px-4 md:px-12 lg:px-24 mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 sm:gap-4 flex-wrap">
        {/* Contact Info */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <a href="tel:+9660533319553" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Phone size={16} className="shrink-0" />
            <span dir="ltr" className="text-right">+966 0533319553</span>
          </a>
          <a href="mailto:info@almoatamer.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Mail size={16} className="shrink-0" />
            <span className="break-all">info@almoatamer.com</span>
          </a>
        </div>
        
        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <Link href="#" className="hover:opacity-80 transition-opacity"><FaInstagram size={16} /></Link>
          <Link href="#" className="hover:opacity-80 transition-opacity"><FaSnapchatGhost size={16} /></Link>
          <Link href="#" className="hover:opacity-80 transition-opacity"><FaFacebookF size={16} /></Link>
          <Link href="#" className="hover:opacity-80 transition-opacity"><FaTwitter size={16} /></Link>
          <Link href="#" className="hover:opacity-80 transition-opacity"><FaLinkedinIn size={16} /></Link>
          <Link href="#" className="hover:opacity-80 transition-opacity"><FaYoutube size={16} /></Link>
        </div>
      </div>
    </div>
  );
}
