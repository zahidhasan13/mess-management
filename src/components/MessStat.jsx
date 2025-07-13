import { Utensils } from "lucide-react";
import Link from "next/link";

const MessStat = ({userName,mess}) => {
  const totalDeposit = mess?.members?.reduce((sum, member) => sum + (member.deposit || 0), 0);
  const mealRate = mess?.totalExpend && mess?.totalMeal
  ? Number((mess.totalExpend / mess.totalMeal).toFixed(2))
  : 0;
  const role = userName?.role;

  if (role === "user") {
    return (
      <div className="my-8 p-6 bg-white rounded-xl shadow-md border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Utensils className="text-orange-500" />
          Establish Your Mess
        </h2>
        <p className="text-gray-600 mb-6">
          Set up your mess management system to streamline meal planning, member
          management, and financial tracking for your organization.
        </p>
        <Link href="/create-mess"><button
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Utensils className="w-5 h-5" />
          Create New Mess
        </button></Link>
      </div>
    );
  }

  // Loading state (commented out as we're using static data)
  // if (status === "authenticated" && !messInfo) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
  //     </div>
  //   );
  // }

  // Mess Info Summary
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
      <div className="bg-blue-100 rounded-md p-3 hover:scale-[1.02] transition-all duration-300 ease-in-out shadow-md">
        <h2 className="font-semibold text-lg text-blue-800">Total Members</h2>
        <p className="text-3xl font-bold mt-2 text-blue-800">
          {mess?.totalMembers || 0}
        </p>
      </div>
      <div className="bg-blue-100 rounded-md p-3 hover:scale-[1.02] transition-all duration-300 ease-in-out shadow-md">
        <h2 className="font-semibold text-lg text-purple-800">Total Deposit</h2>
        <p className="text-3xl font-bold mt-2 text-purple-800">
          {totalDeposit || 0}
        </p>
      </div>
      <div className="bg-blue-100 rounded-md p-3 hover:scale-[1.02] transition-all duration-300 ease-in-out shadow-md">
        <h2 className="font-semibold text-lg text-green-800">Total Expends</h2>
        <p className="text-3xl font-bold mt-2 text-green-800">
          {mess?.totalExpend || 0}
        </p>
      </div>
      <div className="bg-blue-100 rounded-md p-3 hover:scale-[1.02] transition-all duration-300 ease-in-out shadow-md">
        <h2 className="font-semibold text-lg text-green-800">Still Amount</h2>
        <p className="text-3xl font-bold mt-2 text-green-800">
          {(totalDeposit - mess?.totalExpend) || 0}
        </p>
      </div>
      <div className="bg-blue-100 rounded-md p-3 hover:scale-[1.02] transition-all duration-300 ease-in-out shadow-md">
        <h2 className="font-semibold text-lg text-red-800">Total Meals</h2>
        <p className="text-3xl font-bold mt-2 text-red-800">
          {mess?.totalMeal || 0}
        </p>
      </div>
      <div className="bg-blue-100 rounded-md p-3 hover:scale-[1.02] transition-all duration-300 ease-in-out shadow-md">
        <h2 className="font-semibold text-lg text-purple-800">Meal Rate</h2>
        <p className="text-3xl font-bold mt-2 text-purple-800">{mealRate}</p>
      </div>
    </div>
  );
};

export default MessStat;