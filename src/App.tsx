import React, { useState } from 'react';

function App() {
  const [propertyRequest, setPropertyRequest] = useState({
    name: '',
    email: '',
    wishlist: '',
    gender: '',
    budget: '',
    location: '',
  });

  const handlePropertyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPropertyRequest({ ...propertyRequest, [e.target.name]: e.target.value });
  };

  const submitPropertyRequest = () => {
    console.log('Submitted:', propertyRequest);
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100 text-gray-900">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-6">Property Request Form</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitPropertyRequest();
          }}
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={propertyRequest.name}
            onChange={handlePropertyChange}
            className="w-full px-4 py-3 border rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={propertyRequest.email}
            onChange={handlePropertyChange}
            className="w-full px-4 py-3 border rounded-md"
          />
          <input
            type="text"
            name="wishlist"
            placeholder="Property wishlist"
            value={propertyRequest.wishlist}
            onChange={handlePropertyChange}
            className="w-full px-4 py-3 border rounded-md"
          />
          <input
            type="text"
            name="gender"
            placeholder="Optional: Gender"
            value={propertyRequest.gender}
            onChange={handlePropertyChange}
            className="w-full px-4 py-3 border rounded-md"
          />
          <input
            type="text"
            name="budget"
            placeholder="Your budget"
            value={propertyRequest.budget}
            onChange={handlePropertyChange}
            className="w-full px-4 py-3 border rounded-md"
          />
          <input
            type="text"
            name="location"
            placeholder="Preferred location"
            value={propertyRequest.location}
            onChange={handlePropertyChange}
            className="w-full px-4 py-3 border rounded-md"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Submit Property Request
          </button>
        </form>
      </div>
    </main>
  );
}

export default App;
