import React, { useState, useEffect } from 'react';
import { Star, Search, Mail, Home } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// --- IMPORTANT ---
// Please replace these with your actual Supabase project URL and anon key.
// You can find these in your Supabase project's API settings.
const supabaseUrl = ''; 
const supabaseAnonKey = '';
// -----------------

function App() {
  const [supabase, setSupabase] = useState(null);
  const [formData, setFormData] = useState({
    wishlist: '',
    name: '',
    gender: '',
    email: '',
    budget: '',
    location: '',
    notes: '',
    buyer_confirm: false,
  });

  const [contactForm, setContactForm] = useState({
    email: '',
    message: '',
  });
  
  useEffect(() => {
    // Dynamically load the Supabase script to avoid bundler issues.
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    script.async = true;

    script.onload = () => {
      // The script is loaded, now check for credentials BEFORE initializing the client.
      if (!supabaseUrl || !supabaseAnonKey) {
          // FIXED: Added quotes around strings
          console.warn("Supabase URL or Anon Key is missing. The forms will be disabled until they are provided in the code.");
          toast.error("Supabase credentials are not configured in the code.", { duration: 5000 });
          return; // Stop execution if no credentials.
      }
      
      if (window.supabase) {
        // Initialize the client only if credentials exist.
        const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseAnonKey);
        setSupabase(supabaseClient);
      } else {
          // FIXED: Added quotes around strings
          console.error("Supabase script loaded but `window.supabase` is not available.");
          toast.error("Could not load database client.");
      }
    };

    script.onerror = () => {
        // FIXED: Added quotes around strings
        toast.error("Failed to load database client script.");
        console.error("Failed to load Supabase script from CDN.");
    }

    document.body.appendChild(script);

    // Cleanup function to remove the script if the component unmounts.
    return () => {
      document.body.removeChild(script);
    };
  }, []); // The empty dependency array ensures this runs only once on component mount.


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!supabase) {
        toast.error('Database client is not ready. Please check your Supabase credentials in the code.');
        return;
    }
    if (!formData.buyer_confirm) {
        toast.error('Please confirm you are actively looking to purchase a property.');
        return;
    }
    try {
      // Destructure to remove buyer_confirm before sending to Supabase
      const { buyer_confirm, ...submissionData } = formData;
      const { error } = await supabase
        .from('property_requests')
        .insert([submissionData]);

      if (error) throw error;

      toast.success('Your property request has been submitted successfully!');
      setFormData({
        wishlist: '',
        name: '',
        gender: '',
        email: '',
        budget: '',
        location: '',
        notes: '',
        buyer_confirm: false,
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to submit your request. Please try again.');
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
     if (!supabase) {
        toast.error('Database client is not ready. Please check your Supabase credentials in the code.');
        return;
    }
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([contactForm]);

      if (error) throw error;

      toast.success('Your message has been sent successfully!');
      setContactForm({
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to send your message. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Forms should be disabled if supabase is not initialized.
  const isSubmitDisabled = !supabase || !formData.buyer_confirm;
  const isContactDisabled = !supabase;


  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Toaster position="top-right" />
      
      {/* Top Section */}
      <header className="bg-white p-12 text-center">
        <div className="relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="w-12 h-6 border-t-2 border-teal-500 flex items-center justify-center">
              <Home className="w-4 h-4 text-teal-500" />
            </div>
          </div>
        </div>
        <h1 className="text-5xl font-light text-teal-900 mb-4">Dream Property Connector</h1>
        <p className="text-teal-600 mb-4">Connecting Dreams with Reality</p>
        {/* UPDATED: Text content changed as requested */}
        <p className="text-teal-600 mb-4">Free Property Matching for Active Buyers Only | We connect qualified buyers to trusted agents | You enjoy the service free — agents connect with you directly</p>
        <div className="inline-block px-6 py-2 rounded-full bg-teal-50 text-teal-700">
          Free Property Matching Service
        </div>
      </header>

      {/* Main Content Section */}
      <main className="flex-1 flex flex-col md:flex-row">
        {/* Left Section - Property Search Form */}
        <div className="w-full md:w-1/2 bg-[#e6f4f1] p-8 md:p-12 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-light text-teal-900 mb-6 text-center">Find Your Dream Property</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="location" className="block text-sm text-teal-900">Preferred Location:</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    placeholder="e.g., Ryde, North Sydney"
                    className="w-full px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                    <label htmlFor="budget" className="block text-sm text-teal-900">Budget Range:</label>
                    <input
                        type="text"
                        id="budget"
                        name="budget"
                        required
                        placeholder="e.g. $1.2M - $1.5M"
                        className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                        value={formData.budget}
                        onChange={handleInputChange}
                    />
                    <small className="block mt-1 text-xs text-gray-600 leading-snug">
                        Please enter your estimated purchase budget (e.g. 1.2m = $1,200,000). This service is exclusively for active buyers — <span className="text-red-500"> not rentals</span>.
                    </small>
                </div>

                <div className="space-y-2">
                  <label htmlFor="wishlist" className="block text-sm text-teal-900">Property Requirements:</label>
                  <textarea
                    id="wishlist"
                    name="wishlist"
                    placeholder="e.g., Unit/House/type 3 bedrooms, 2 bathrooms, garden, close to schools"
                    required
                    rows={3}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                    value={formData.wishlist}
                    onChange={handleInputChange}
                  />
                </div>
                 <div className="space-y-2">
                    <label htmlFor="notes" className="block text-sm text-teal-900">Extra Info:</label>
                    <textarea
                        id="notes"
                        name="notes"
                        rows={3}
                        placeholder="Add any specific preferences here"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm resize-none"
                        value={formData.notes}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm text-teal-900">
                        Your Full Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="e.g. John Smith / Jane Lim"
                        className="w-full px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    <small className="block mt-1 text-xs text-gray-600 leading-snug">
                        We only share your surname until an agent agrees to a verified match. Your full name is included once the agent commits through our secure platform, ensuring privacy and legitimacy for both parties.
                    </small>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm text-teal-900">Gender:</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        required
                        className="mr-2 text-teal-500 focus:ring-teal-500"
                        checked={formData.gender === 'Male'}
                        onChange={handleInputChange}
                      />
                      <span className="text-teal-900">Male</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        required
                        className="mr-2 text-teal-500 focus:ring-teal-500"
                        checked={formData.gender === 'Female'}
                        onChange={handleInputChange}
                      />
                      <span className="text-teal-900">Female</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm text-teal-900">Email Address:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={formData.email}
                    onChange={handleInputChange}
                   />
                </div>
                
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm text-teal-900 cursor-pointer">
                    <input
                      type="checkbox"
                      name="buyer_confirm"
                      required
                      className="accent-teal-600"
                      checked={formData.buyer_confirm}
                      onChange={handleInputChange}
                    />
                    <span>I confirm I’m actively looking to purchase a property (not renting).</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white px-5 py-3 rounded-full hover:bg-teal-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={isSubmitDisabled}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Section - Background Image and Contact Form */}
        <div className="w-full md:w-1/2 relative min-h-[600px]">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
          
          {/* Contact Form */}
          <div className="relative z-10 p-8">
            <div id="contact" className="mt-4 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg max-w-sm">
               <h3 className="text-xl font-light mb-4 text-teal-900 flex items-center">
                 <Mail className="w-5 h-5 mr-2" />
                 Contact Us
               </h3>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-email" className="block text-sm text-teal-900 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    className="w-full px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={contactForm.email}
                    onChange={handleContactChange}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm text-teal-900 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                    value={contactForm.message}
                    onChange={handleContactChange}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white py-2 px-6 rounded-full hover:bg-teal-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={isContactDisabled}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-teal-900 text-white py-8 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-light mb-4 flex items-center">
              <Home className="w-5 h-5 mr-2" />
              Dream Property Connector
            </h3>
            <p className="text-teal-200 text-sm">
              We connect property seekers with their dream homes through our personalized matching service.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-light mb-4">Quick Links</h3>
            <ul className="space-y-2 text-teal-200">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-light mb-4">Contact Us</h3>
            <address className="not-italic text-teal-200 text-sm space-y-2">
              <p>Email: info@sydneydpc.com</p>
            </address>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-teal-800 text-center text-teal-300 text-sm">
          <p>© {new Date().getFullYear()} Dream Property Connector. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
