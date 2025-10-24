import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Decorative Circles */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-rose-500 rounded-full opacity-70"></div>
      <div className="absolute top-40 right-20 w-48 h-48 bg-rose-400 rounded-full opacity-60"></div>
      <div className="absolute bottom-60 left-1/4 w-40 h-40 bg-rose-300 rounded-full opacity-80"></div>
      <div className="absolute top-1/3 right-10 w-24 h-24 bg-rose-600 rounded-full opacity-75"></div>
      <div className="absolute bottom-40 right-1/3 w-36 h-36 bg-rose-200 rounded-full opacity-70"></div>

      {/* Wavy Background */}
      <div className="absolute inset-0">
        <svg
          className="absolute bottom-0 w-full h-auto"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#be123c"
            fillOpacity="1"
            d="M0,160L30,176C60,192,120,224,180,213.3C240,203,300,149,360,144C420,139,480,181,540,197.3C600,213,660,203,720,170.7C780,139,840,85,900,80C960,75,1020,117,1080,154.7C1140,192,1200,224,1260,213.3C1320,203,1380,149,1410,122.7L1440,96L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
          Welcome to Ticket Tocket
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl">
          Your one-stop solution for seamless event ticketing and management.
        </p>

        <div className="mb-12">
          <Link
            to="/signup"
            className="px-8 py-3 bg-rose-700 text-white rounded-full font-semibold hover:bg-rose-800 transition-all transform hover:scale-105 shadow-lg inline-block"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="ml-4 px-8 py-3 bg-white border border-rose-700 text-gray-800 rounded-full font-semibold hover:bg-rose-800 hover:text-white transition-all transform hover:scale-105 shadow-lg inline-block"
          >
            Login
          </Link>
        </div>
      </div>

      {/* <div className="relative z-10 bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Why Choose Ticket Tocket?
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Experience the best in event ticketing with our powerful features
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-rose-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Easy Booking</h3>
              <p className="text-gray-600 leading-relaxed">Book your tickets in just a few clicks with our intuitive interface. No hassle, no complications.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-rose-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Secure Payment</h3>
              <p className="text-gray-600 leading-relaxed">Your transactions are protected with industry-standard encryption and secure payment gateways.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-rose-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Instant Delivery</h3>
              <p className="text-gray-600 leading-relaxed">Get your tickets delivered instantly to your email and phone. Access them anytime, anywhere.</p>
            </div>
          </div>
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default Hero;
