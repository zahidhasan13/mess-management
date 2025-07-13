"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";

export function DailyMealTable({ dailyMeal, memberId }) {
  const memberMeal = dailyMeal?.find((dm) => dm?.user === memberId);
  console.log(memberMeal);

  return (
    <div className="w-full overflow-x-auto rounded-xl border shadow-md">
      <Table>
        <TableHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <TableRow>
            <TableHead className="text-white">Date</TableHead>
            <TableHead className="text-white">Member Meal</TableHead>
            <TableHead className="text-white">Guest Meal</TableHead>
            <TableHead className="text-white">Total Meals</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            key={memberMeal._id}
            className="hover:bg-purple-50 transition-colors"
          >
            <TableCell className="font-medium text-indigo-700">
              {moment(memberMeal?.date).format("MMMM D, YYYY")}
            </TableCell>
            <TableCell className="text-green-700 font-semibold">
              {memberMeal?.memberMeal}
            </TableCell>
            <TableCell className="text-orange-700 font-semibold">
              {memberMeal?.guestMeal}
            </TableCell>
            <TableCell className="text-blue-700 font-bold">
              {memberMeal?.mealCount}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
