import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold text-earth-900 mb-6">Get in Touch</h1>
          <p className="text-lg text-earth-600">
            Have a question about your order, our farmers, or how it all works? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          <div>
            <h2 className="text-2xl font-semibold text-earth-900 mb-6">Contact Information</h2>
            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-earth-100 rounded-full flex items-center justify-center flex-shrink-0 text-earth-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-earth-900">Email</h3>
                  <p className="text-earth-600 mt-1">brockleyestateBSN@outlook.com</p>
                  <p className="text-sm text-earth-500 mt-1">We aim to reply within 24 hours.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-earth-100 rounded-full flex items-center justify-center flex-shrink-0 text-earth-600">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-earth-900">Phone</h3>
                  <p className="text-earth-600 mt-1">0421322541</p>
                  <p className="text-sm text-earth-500 mt-1">Mon-Fri, 9am to 5pm AEST</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-earth-100 rounded-full flex items-center justify-center flex-shrink-0 text-earth-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-earth-900">HQ</h3>
                  <p className="text-earth-600 mt-1">160 Brockley Road, Buckland, Tasmania</p>
                  <p className="text-sm text-earth-500 mt-1">Not open to the public.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-earth-100">
            <h2 className="text-2xl font-semibold text-earth-900 mb-6">Send us a message</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-earth-700 mb-1">First Name</label>
                  <input type="text" id="firstName" className="w-full px-4 py-2 border border-earth-300 rounded-md focus:ring-brand-500 focus:border-brand-500 outline-none transition-colors" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-earth-700 mb-1">Last Name</label>
                  <input type="text" id="lastName" className="w-full px-4 py-2 border border-earth-300 rounded-md focus:ring-brand-500 focus:border-brand-500 outline-none transition-colors" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-earth-700 mb-1">Email Address</label>
                <input type="email" id="email" className="w-full px-4 py-2 border border-earth-300 rounded-md focus:ring-brand-500 focus:border-brand-500 outline-none transition-colors" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-earth-700 mb-1">Subject</label>
                <select id="subject" className="w-full px-4 py-2 border border-earth-300 rounded-md focus:ring-brand-500 focus:border-brand-500 outline-none transition-colors bg-white">
                  <option>General Inquiry</option>
                  <option>Order Issue</option>
                  <option>Farmer Onboarding</option>
                  <option>Press/Media</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-earth-700 mb-1">Message</label>
                <textarea id="message" rows={5} className="w-full px-4 py-2 border border-earth-300 rounded-md focus:ring-brand-500 focus:border-brand-500 outline-none transition-colors resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-brand-600 hover:bg-brand-500 text-white font-medium py-3 px-4 rounded-md transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
