import { Link } from "wouter";
import { SiVisa, SiMastercard, SiPaypal, SiAmericanexpress } from "react-icons/si";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white text-slate-700 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Us */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/support" className="text-sm text-slate-600 hover:text-orange-500 transition-colors duration-200">
                  Customer Support
                </Link>
              </li>
              <li>
                <Link href="/guarantee" className="text-sm text-slate-600 hover:text-orange-500 transition-colors duration-200">
                  Service Guarantee
                </Link>
              </li>
            </ul>
            
            {/* Social Media */}
            <div className="mt-6 flex space-x-3">
              <a href="#" className="p-2 rounded-full bg-gray-100 hover:bg-orange-100 transition-colors" aria-label="Facebook">
                <FaFacebookF className="h-4 w-4 text-slate-600 hover:text-orange-500" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-100 hover:bg-orange-100 transition-colors" aria-label="Twitter">
                <FaTwitter className="h-4 w-4 text-slate-600 hover:text-orange-500" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-100 hover:bg-orange-100 transition-colors" aria-label="YouTube">
                <FaYoutube className="h-4 w-4 text-slate-600 hover:text-orange-500" />
              </a>
            </div>
          </div>
          
          {/* About */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-4">About</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-slate-600 hover:text-orange-500 transition-colors duration-200">
                  About TripSage
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-slate-600 hover:text-orange-500 transition-colors duration-200">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-slate-600 hover:text-orange-500 transition-colors duration-200">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-slate-600 hover:text-orange-500 transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/rewards" className="text-sm text-slate-600 hover:text-orange-500 transition-colors duration-200">
                  TripSage Rewards
                </Link>
              </li>
              <li>
                <Link href="/property" className="text-sm text-slate-600 hover:text-orange-500 transition-colors duration-200">
                  List Your Property
                </Link>
              </li>
              <li>
                <Link href="/hotels" className="text-sm text-slate-600 hover:text-orange-500 transition-colors duration-200">
                  All Hotels
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-sm text-slate-600 hover:text-orange-500 transition-colors duration-200">
                  Security
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Payment Methods */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-4">We Accept</h3>
            <div className="flex flex-wrap gap-3">
              <SiVisa className="w-10 h-10 text-blue-700" />
              <SiMastercard className="w-10 h-10 text-orange-500" />
              <SiAmericanexpress className="w-10 h-10 text-blue-500" />
              <SiPaypal className="w-10 h-10 text-blue-800" />
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-slate-600">
            © {currentYear} TripSage Travel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
