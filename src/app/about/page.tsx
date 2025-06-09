export default function AboutPage() {
  return (
    <main className="bg-background min-h-screen py-4 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#DCFFEF] to-[#FFE4C9] rounded-xl border-2 border-[#7B341E] shadow-sm p-8">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F1B1C] to-[#B53E41] text-5xl font-bold mb-4">
            About Homie
          </h1>
          <p className="text-[#7B341E] text-xl mb-6">
            Your trusted partner in finding the perfect home.
          </p>
        </section>

        {/* Mission Section */}
        <section className="bg-white rounded-xl border-2 border-[#7B341E] shadow-sm p-8">
          <h2 className="text-3xl font-bold text-[#7B341E] mb-6">Our Mission</h2>
          <p className="text-[#7B341E] mb-6">
            At Homie, we believe finding a home should be simple, transparent, and stress-free. Our platform connects renters with verified property owners, eliminating the hassles and uncertainties traditionally associated with property rental.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-[#FFE4C9] p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-[#7B341E] mb-3">For Renters</h3>
              <ul className="space-y-2 text-[#7B341E]">
                <li>✓ Access to verified listings</li>
                <li>✓ Direct communication with property owners</li>
                <li>✓ No broker fees</li>
                <li>✓ Transparent pricing</li>
              </ul>
            </div>
            <div className="bg-[#E8F5E9] p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-[#266044] mb-3">For Property Owners</h3>
              <ul className="space-y-2 text-[#266044]">
                <li>✓ Easy listing management</li>
                <li>✓ Verified tenant profiles</li>
                <li>✓ Secure communication</li>
                <li>✓ Streamlined rental process</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-[#E8F5E9] rounded-xl border-2 border-[#266044] shadow-sm p-8">
          <h2 className="text-3xl font-bold text-center text-[#266044] mb-8">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#86DDB3] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#266044]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#266044] mb-2">Trust</h3>
              <p className="text-[#266044]">Building trust through verified listings and transparent processes.</p>
            </div>
            <div className="text-center">
              <div className="bg-[#86DDB3] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#266044]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#266044] mb-2">Community</h3>
              <p className="text-[#266044]">Creating connections between property owners and renters.</p>
            </div>
            <div className="text-center">
              <div className="bg-[#86DDB3] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#266044]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#266044] mb-2">Innovation</h3>
              <p className="text-[#266044]">Continuously improving our platform for better user experience.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 