'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Edit, Plus, Trash2, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
const MembersList = ({mess}) => {
  const { data: session, status } = useSession();
  const [members, setMembers] = useState([]);
  const [loading,setLoading] = useState(false);
  const messData = mess[0];

useEffect(() => {
    const fetchMess = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/mess");

        // Check if response is ok
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const messData = await res.json();
        setMembers(messData?.data[0]?.members);
      } catch (err) {
        console.error("Error fetching mess data:", err);
        setError(err?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMess();
  }, [])


    return (
        <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            👥 Members Information
          </h2>
          <Link href={`/addMember/${messData?._id}`}>
          <button
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Member
          </button>
          </Link>
        </div>

        {members?.length > 0 ? (
          <div>
          {members.map((member) => (
            <div key={member._id} className="shadow-lg rounded p-4 bg-white mb-3">
            <Accordion type="single" collapsible>
                <AccordionItem value={`item-${member._id}`}>
                  <AccordionTrigger className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-left font-semibold">
                    {member.fullName} {member.role === 'admin' && "- Manager"}
                  </AccordionTrigger>
                  <AccordionContent className="p-4 bg-white">
                    <div className="flex items-center justify-end mb-4">
                      <Link href={`/updateMember/${member._id}`}>
                      <Edit
                        className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700"
                      />
                      </Link>
                      <Trash2
                        className="w-5 h-5 text-red-500 ml-2 cursor-pointer hover:text-red-700"
                        onClick={() => handleDeleteMember(member._id)}
                      />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-blue-100 p-3 rounded-md shadow">
                        <h3 className="text-lg font-semibold text-blue-800">
                          Deposit
                        </h3>
                        <p className="text-2xl font-bold text-blue-800">
                          ${member.deposit}
                        </p>
                      </div>
                      <div className="bg-green-100 p-3 rounded-md shadow">
                        <h3 className="text-lg font-semibold text-green-800">
                          Meal
                        </h3>
                        <p className="text-2xl font-bold text-green-800">
                          {member.memberTotalMeal}
                        </p>
                      </div>
                      <div className="bg-red-100 p-3 rounded-md shadow">
                        <h3 className="text-lg font-semibold text-red-800">
                          Expend
                        </h3>
                        <p className="text-2xl font-bold text-red-800">
                          ${member.expend}
                        </p>
                      </div>
                      <div className="bg-purple-100 p-3 rounded-md shadow">
                        <h3 className="text-lg font-semibold text-purple-800">
                          Due
                        </h3>
                        <p className="text-2xl font-bold text-purple-800">
                          ${member.due}
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
            </Accordion>
            </div>
              ))}
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-8 text-center">
            <Users className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No Members Found
            </h3>
            <p className="text-gray-500 mb-4">
              You haven't added any members to your mess yet.
            </p>
            <Link href={`/addMember/${messData?._id}`}>
            <button
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Your First Member
            </button>
            </Link>
            
          </div>
        )}
      </div>
    );
};

export default MembersList;