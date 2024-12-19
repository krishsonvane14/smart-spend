"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CardInfo from "./_components/CardInfo";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";

function Dashboard() {
  const { user } = useUser();

  // Capitalize the first letter of the user's first name
  const firstName = user?.firstName
    ? user.firstName.charAt(0).toUpperCase() +
      user.firstName.slice(1).toLowerCase()
    : "";

  const [BudgetList, setBudgetList] = useState([]);

  useEffect(() => {
    getBudgetList();
  }, [user]);

  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetList(result);
  }
 
  return (
    <div className="p-8">
      <h2 className="text-3xl">Hi, {firstName} ✌🏻</h2>
      <p className="text-gray-600 mt-2">
        Track your finances, stay in control, and make smarter decisions with
        ease.
      </p>
      <CardInfo budgetList={BudgetList}/>
      <div className="grid grid-col-1 md:grid-cols-3 mt-6 gap-5">
      <div className="md:col-span-2">
        <BarChartDashboard
          budgetList={BudgetList}
        />
      </div>
      <div className=" grid gap-5 ">
        <h2 className="text-lg font-bold">Latest Budgets</h2>
        {BudgetList.map((budget,index)=>(
          <BudgetItem budget={budget} key={index}/>
        ))}
      </div>
      </div>
    </div>
  );
}

export default Dashboard;
