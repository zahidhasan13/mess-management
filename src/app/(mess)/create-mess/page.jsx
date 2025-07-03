'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, ChefHat, AlertCircle, CheckCircle, Utensils } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useSession } from 'next-auth/react';

export default function CreateMess() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch('/api/mess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...data, userId}),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create mess');
      }

      toast.success('Mess created successfully! Redirecting to dashboard...');
      setSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      toast.error(error.message);
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Mess Created Successfully!</h2>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Your Mess</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start managing your mess efficiently. Create a new mess and invite members to join.
          </p>
        </div>

        {/* Main Form */}
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Mess Name Input */}
              <div>
                <label htmlFor="messName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Mess Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="messName"
                    {...register('messName', { 
                      required: 'Mess name is required',
                      minLength: {
                        value: 3,
                        message: 'Mess name must be at least 3 characters'
                      }
                    })}
                    placeholder="Enter mess name (e.g., Sunrise Mess)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    disabled={loading}
                  />
                  <Utensils className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                </div>
                {errors.messName && (
                  <p className="mt-1 text-sm text-red-600">{errors.messName.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2 ${
                  loading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Mess...</span>
                  </>
                ) : (
                  <>
                    <Utensils className="w-5 h-5" />
                    <span>Create Mess</span>
                  </>
                )}
              </button>
            </form>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">What happens next?</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>You'll become the admin of this mess</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Invite members to join your mess</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Start tracking meals and expenses</span>
                </li>
              </ul>
            </div>
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
}