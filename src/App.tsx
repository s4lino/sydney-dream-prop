import React, { useState } from 'react';

function App() {
  const [propertyRequest, setPropertyRequest] = useState({
    name: '',
    email: '',
    wishlist: '',
    gender: '',
    budget: '',
    location: '',
    notes: '',
  });

  const [contactMessage, setContactMessage] = useState({
    email: '',
    message: '',
  });

  const [message, setMessage] = useState('');

  const handlePropertyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPropertyRequest({ ...propertyRequest, [e.target.name]: e.target.value });
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactMessage({ ...contactMessage, [e.target.name]: e.target.value });
  };

  const submitPropertyRequest = () => {
    // Submit logic (e.g. Supabase or webhook)
    setMessage('Thank you! Your property request has been submitted.');
  };

  const submitContactMessage = () => {
    // Contact message logic
    setMessage('Thanks for your message — we’ll get back to you shortly.');
  };

  return (
    <main className="min-h-screen bg-green-50 p-8 text-gray-800">
      <div className="max-w-2xl mx-auto bg-white rounded-md shadow-md p-8 space-y-12">
        <div>
          <h1 className="text-xl font-semibold mb-4">Property Request Form</h1>
          <div className="space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Full name (e.g. Jane Smith)"
              value={propertyRequest.name}
              onChange={handlePropertyChange}
              className="w-full border px-4 py-2 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              value={propertyRequest.email}
              onChange={handlePropertyChange}
              className="w-full border px-4 py-2 rounded"
            />
            <input
              type="text"
              name="wishlist"
              placeholder="What kind of property are you seeking?"
              value={propertyRequest.wishlist}
              onChange={handlePropertyChange}
              className="w-full border px-4 py-2 rounded"
            />
            <input
              type="text"
              name="gender"
              placeholder="Optional: Gender (e.g. Female)"
              value={propertyRequest.gender}
              onChange={handlePropertyChange}
              className="w-full border px-4 py-2 rounded"
            />
            <input
              type="text"
              name="budget"
              placeholder="Your budget range"
              value={propertyRequest.budget}
              onChange={handlePropertyChange}
              className="w-full border px-4 py-2 rounded"
            />
            <input
              type="text"
              name="location"
              placeholder="Preferred suburb or region"
              value={propertyRequest.location}
              onChange={handlePropertyChange}
              className="w-full border px-4 py-2 rounded"
            />
            <textarea
              name="notes"
              placeholder="Any extra details (e.g. pet-friendly, balcony, renovation okay)"
              value={propertyRequest.notes}
              onChange={handlePropertyChange}
              className="w-full border px-4 py-2 rounded"
            />
            <button
              onClick={submitPropertyRequest}
              className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
            >
              Submit Property Request
            </button>
          </div>
        </div>

        <hr className="border-t" />

        <div>
          <h1 className="text-xl font-semibold mb-4">Contact Message Form</h1>
          <div className="space-y-3">
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              value={contactMessage.email}
              onChange={handleContactChange}
              className="w-full border px-4 py-2 rounded"
            />
            <textarea
              name="message"
              placeholder="Your message or enquiry"
              value={contactMessage.message}
              onChange={handleContactChange}
              className="w-full border px-4 py-2 rounded"
            />
            <button
              onClick={submitContactMessage}
              className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
            >
              Submit Contact Message
            </button>
          </div>
        </div>

        {message && (
          <div className="text-center text-blue-600 font-medium">{message}</div>
        )}
      </div>
    </main>
  );
}

export default App;
