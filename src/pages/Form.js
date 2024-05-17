import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';
import { ToastContainer, toast } from 'react-toastify';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/contact`);

      if (Array.isArray(response.data.data)) {
        setContacts(response.data.data);
      } else if (response.data && typeof response.data === 'object') {
        // If response data is an object but not an array, handle it accordingly
        console.error('Response data is not an array:', response.data);
      } else {
        console.error('Invalid response data:', response.data);
      }

      // console.log('Contacts fetched:', response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/contact`, formData);
      console.log('Contact created:', response.data);
      toast.success('Request submmited Successfully!');
      // Reset form after successful submission
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error creating contact:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-left 1/3">
      <div className="bg-white p-8 rounded-lg shadow-md w-1/3 mx-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md w-2/3 mx-10">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Existing Requests
        </h2>
        <div className="overflow-auto h-[calc(100vh-11rem)] mt-8 w-full mx-auto">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className="w-full"
              style={{ backgroundColor: '#E5E7EB' /* Background color */ }}
            >
              <div className="p-4 rounded-md mb-4 w-fit max-w-screen-md">
                <p className="font-bold">Name: {contact.name}</p>
                <p className="text-gray-700">Email: {contact.email}</p>
                <p className="text-gray-700 break-all">
                  Message: {contact.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Form;
