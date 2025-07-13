'use client'
import {
  Save,
  X,
  DollarSign,
  Users,
  Utensils,
  CheckCircle,
  Receipt,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const fieldConfig = [
  {
    name: "deposit",
    label: "Deposit Amount",
    icon: DollarSign,
    placeholder: "0.00",
    description: "Security deposit amount",
    type: "number",
    step: "0.01"
  },
  {
    name: "guestMeal",
    label: "Guest Meals",
    icon: Users,
    placeholder: "0",
    description: "Number of guest meals",
    type: "number"
  },
  {
    name: "memberMeal",
    label: "Member Meals",
    icon: Utensils,
    placeholder: "0",
    description: "Number of member meals",
    type: "number"
  },
  {
    name: "expend",
    label: "Expend",
    icon: Receipt,
    placeholder: "0.00",
    description: "Total expenditure amount",
    type: "number",
    step: "0.01"
  },
];

const UpdateMember = ({ params }) => {
  const memberId = params?.id;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  
  const [members, setMembers] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMess = async () => {
      try {
        const res = await fetch("/api/mess");
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        
        const data = await res.json();
        setMembers(data?.mess?.members);
        console.log(data,"um");
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to load member data");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchMess();
  }, []);

  const member = members.find(mem => mem?._id === memberId);

  useEffect(() => {
    if (member) {
      reset();
    }
  }, [member, reset]);

 const onSubmit = async (data) => {
  try {
    const response = await fetch(`/api/users/${memberId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const text = await response.text(); // Get raw text (could be HTML)
    try {
      const result = JSON.parse(text); // Try parsing JSON manually
      if (!response.ok) throw new Error(result.error || 'Update failed');

      toast.success('Member updated successfully!');
      setSuccess(true);
      setTimeout(() => router.push('/'), 2000);
    } catch (parseError) {
      console.error('HTML or non-JSON response:', text); // Logs the HTML error page
      throw new Error('Invalid JSON response from server.');
    }
  } catch (error) {
    toast.error(error.message || 'Update failed');
  }
};

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Success!</h2>
          <p className="text-gray-600 mb-4">Redirecting to dashboard...</p>
          <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-gray-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Member Not Found</h2>
          <button 
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {member.fullName}
              </h1>
              <p className="text-gray-600 mt-1">
                Update meal and financial information
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Utensils className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-b-2xl shadow-sm border border-t-0 border-gray-200 p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fieldConfig.map((field) => {
              const IconComponent = field.icon;
              return (
                <div key={field.name} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IconComponent className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={field.type}
                      step={field.step}
                      placeholder={field.placeholder}
                      {...register(field.name, {
                        valueAsNumber: true,
                        min: { value: 0, message: "Value must be positive" }
                      })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors[field.name] && (
                    <p className="text-xs text-red-500">{errors[field.name].message}</p>
                  )}
                  <p className="text-xs text-gray-500">{field.description}</p>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button 
              type="button"
              onClick={() => router.push('/')}
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors flex items-center space-x-2"
              disabled={isSubmitting}
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
            <button 
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all disabled:opacity-70 flex items-center space-x-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></span>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Update Member</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default UpdateMember;