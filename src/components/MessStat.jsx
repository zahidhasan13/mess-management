import { useSession } from "next-auth/react";

const MessStat = ({ messData }) => {
  const { data: session, status } = useSession();

  const role = session?.user?.role;

  // Loading state
    if(role==="admin" && !messData){
      return (
      <div className="my-8 p-6 bg-white rounded-xl shadow-md border border-gray-100 animate-pulse">
        <div className="text-xl font-bold text-gray-300 mb-4 flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-300 rounded-full" />
          <div className="h-5 w-1/3 bg-gray-300 rounded" />
        </div>
        <div className="space-y-2 mb-6">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 rounded" />
        </div>
        <div className="h-12 w-48 bg-gray-300 rounded-lg" />
      </div>
    );
    }

  if (role === "member" && !messData) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 animate-pulse">
        <div className="bg-blue-100 rounded-md p-3 shadow-md">
          <div className="h-5 w-1/2 bg-blue-300 rounded mb-5"></div>
          <div className="h-8 w-3/4 bg-blue-300 rounded"></div>
        </div>
        <div className="bg-blue-100 rounded-md p-3 shadow-md">
          <div className="h-5 w-1/2 bg-green-300 rounded mb-5"></div>
          <div className="h-8 w-3/4 bg-green-300 rounded"></div>
        </div>
        <div className="bg-blue-100 rounded-md p-3 shadow-md">
          <div className="h-5 w-1/2 bg-red-300 rounded mb-5"></div>
          <div className="h-8 w-3/4 bg-red-300 rounded"></div>
        </div>
        <div className="bg-blue-100 rounded-md p-3 shadow-md">
          <div className="h-5 w-1/2 bg-purple-300 rounded mb-5"></div>
          <div className="h-8 w-3/4 bg-purple-300 rounded"></div>
        </div>
      </div>
    );
  }

  // Admin view
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      <div className="bg-blue-100 rounded-md p-3 hover:scale-[1.02] transition-all duration-300 ease-in-out shadow-md">
        <h2 className="font-semibold text-lg text-blue-800">Total Members</h2>
        <p className="text-3xl font-bold mt-2 text-blue-800">
          {messData?.totalMembers}
        </p>
      </div>
      <div className="bg-blue-100 rounded-md p-3 hover:scale-[1.02] transition-all duration-300 ease-in-out shadow-md">
        <h2 className="font-semibold text-lg text-green-800">Total Expends</h2>
        <p className="text-3xl font-bold mt-2 text-green-800">
          {messData?.totalExpend}
        </p>
      </div>
      <div className="bg-blue-100 rounded-md p-3 hover:scale-[1.02] transition-all duration-300 ease-in-out shadow-md">
        <h2 className="font-semibold text-lg text-red-800">Total Meals</h2>
        <p className="text-3xl font-bold mt-2 text-red-800">
          {messData?.totalMeal}
        </p>
      </div>
      <div className="bg-blue-100 rounded-md p-3 hover:scale-[1.02] transition-all duration-300 ease-in-out shadow-md">
        <h2 className="font-semibold text-lg text-purple-800">Meal Rate</h2>
        <p className="text-3xl font-bold mt-2 text-purple-800">
          {messData?.mealRate}
        </p>
      </div>
    </div>
  );
};

export default MessStat;
