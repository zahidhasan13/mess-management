import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import { Edit, Trash2 } from "lucide-react";
const stats = [
  {
    title: "Total Members",
    value: 150,
    bg: "bg-blue-100",
    text: "text-blue-800",
  },
  {
    title: "Total Meal",
    value: 120,
    bg: "bg-green-100",
    text: "text-green-800",
  },
  { title: "Total Expend", value: 30, bg: "bg-red-100", text: "text-red-800" },
  {
    title: "Meal Rate",
    value: 45,
    bg: "bg-purple-100",
    text: "text-purple-800",
  },
];
const userInfo = {
    name: "Md Zahid Hasan",
    deposit: 1000,
    meal: 50,
    expend: 20,
    due: 30,
}

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex md:items-center space-x-4 flex-col md:flex-row">
            <h1 className="text-xl font-bold text-center text-gray-800">
        Mess Dashboard
      </h1>
        <p className="text-gray-600 text-sm">( We 6 )</p>
        </div>
      <Button variant="outline" className="font-bold">Login</Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bg} rounded-md p-3 hover:scale-[1.02] transition-all duration-300 ease-in-out shadow-md`}
          >
            <h2 className={`font-semibold text-lg ${stat.text}`}>
              {stat.title}
            </h2>
            <p className={`text-3xl font-bold mt-2 ${stat.text}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
      {/* All Members Info */}
      <div>
        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">
          👥 Members Information
        </h2>
        <div className="shadow-lg rounded p-4 bg-white mb-3">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-left font-semibold">
            Md Zahid Hasan
          </AccordionTrigger>
          <AccordionContent className="p-4 bg-white">
            <div className="flex items-center justify-end mb-4">
                <Edit className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
                <Trash2 className="w-5 h-5 text-red-500 ml-2 cursor-pointer hover:text-red-700" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-100 p-3 rounded-md shadow">
                    <h3 className="text-lg font-semibold text-blue-800">Deposit</h3>
                    <p className="text-2xl font-bold text-blue-800">
                    ${userInfo.deposit}
                    </p>
                </div>
                <div className="bg-green-100 p-3 rounded-md shadow">
                    <h3 className="text-lg font-semibold text-green-800">Meal</h3>
                    <p className="text-2xl font-bold text-green-800">
                    {userInfo.meal}
                    </p>
                </div>
                <div className="bg-red-100 p-3 rounded-md shadow">
                    <h3 className="text-lg font-semibold text-red-800">Expend</h3>
                    <p className="text-2xl font-bold text-red-800">
                    ${userInfo.expend}
                    </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-md shadow">
                    <h3 className="text-lg font-semibold text-purple-800">Due</h3>
                    <p className="text-2xl font-bold text-purple-800">
                    ${userInfo.due}
                    </p>
                </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
      </div>
    </div>
  );
};

export default Dashboard;
