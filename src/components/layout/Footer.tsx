import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="px-4 py-8">
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#E8F5E9] to-[#FBE9E7] rounded-xl border-2 border-[#7B341E] shadow-sm">
        <div className="px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Homie Section */}
            <div>
              <Link href="/" className="inline-block mb-4">
                <img 
                  src="/logo.png" 
                  alt="Homie Logo" 
                  className="h-8 w-auto"
                />
              </Link>
              <p className="text-[#7B341E] text-sm">
                Making renting simple, transparent, and accessible for everyone.
              </p>
              <div className="flex space-x-4 mt-4">
                <Link href="#" className="text-[#7B341E] hover:text-[#266044]">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/>
                  </svg>
                </Link>
                <Link href="#" className="text-[#7B341E] hover:text-[#266044]">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"/>
                  </svg>
                </Link>
                <Link href="#" className="text-[#7B341E] hover:text-[#266044]">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                  </svg>
                </Link>
                <Link href="#" className="text-[#7B341E] hover:text-[#266044]">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.441 16.892c-2.102.144-6.784.144-8.883 0-2.276-.156-2.541-1.27-2.558-4.892.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0 2.277.156 2.541 1.27 2.559 4.892-.018 3.629-.285 4.736-2.559 4.892zm-6.441-7.892l4.917 2.892-4.917 2.892v-5.784z"/>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Quick Links Section */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#7B341E]">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/browse" className="text-[#7B341E] hover:text-[#266044] text-sm">
                    Browse Listings
                  </Link>
                </li>
                <li>
                  <Link href="/list-property" className="text-[#7B341E] hover:text-[#266044] text-sm">
                    List a Property
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-[#7B341E] hover:text-[#266044] text-sm">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-[#7B341E] hover:text-[#266044] text-sm">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Section */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#7B341E]">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-[#7B341E] hover:text-[#266044] text-sm">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-[#7B341E] hover:text-[#266044] text-sm">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-[#7B341E] hover:text-[#266044] text-sm">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="text-[#7B341E] hover:text-[#266044] text-sm">
                    Press
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Section */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#7B341E]">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-[#7B341E] hover:text-[#266044] text-sm">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-[#7B341E] hover:text-[#266044] text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookie" className="text-[#7B341E] hover:text-[#266044] text-sm">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="/accessibility" className="text-[#7B341E] hover:text-[#266044] text-sm">
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-[#7B341E] text-center text-[#7B341E] text-sm">
            <p>&copy; {new Date().getFullYear()} Homie. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
} 