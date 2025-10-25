import { FaTicketAlt } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { IoMdFlash } from "react-icons/io";

const About = () => {
  return (
    <div>
      <div className="z-10 bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Why Choose Ticket Tocket?
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Experience the best in event ticketing with our powerful features
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <FaTicketAlt className="w-8 h-8 text-slate-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Easy Booking
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Book your tickets in just a few clicks with our intuitive
                interface. No hassle, no complications.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <MdSecurity className="w-8 h-8 text-slate-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Secure Payment
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Your transactions are protected with industry-standard
                encryption and secure payment gateways.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <IoMdFlash className="w-8 h-8 text-slate-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Instant Delivery
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Get your tickets delivered instantly to your email and phone.
                Access them anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
