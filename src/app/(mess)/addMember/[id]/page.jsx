'use client';

import { CheckCircle, Utensils } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

const AddMember = ({ params }) => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { data: session } = useSession();

  const onSubmit = async (data) => {
    const userId = session?.user?.id;
    const messId = params?.id;

    if (!userId || !messId) {
      toast.error("Session or Mess ID missing.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/mess/${messId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          currentUserId: userId,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to add member');
      }

      toast.success('Member added successfully! Redirecting...');
      setSuccess(true);
      setTimeout(() => router.push('/'), 2000);
    } catch (error) {
      toast.error(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Member Added Successfully!</h2>
          <p className="text-gray-600 mb-4">Redirecting to your mess dashboard...</p>
          <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Utensils className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Add a Member</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start managing your mess efficiently. Add a new member.
          </p>
        </div>

        {/* Main Form */}
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Member Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: 'Member Email is required',
                    })}
                    placeholder="Enter member email (e.g., example@mess.com)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    disabled={loading}
                  />
                  <Utensils className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer ${
                  loading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Adding Member...</span>
                  </>
                ) : (
                  <>
                    <Utensils className="w-5 h-5" />
                    <span>Add Member</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Back Button */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => router.back()}
              className="text-orange-600 hover:text-red-700 font-medium transition-colors duration-200 cursor-pointer"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default AddMember;
