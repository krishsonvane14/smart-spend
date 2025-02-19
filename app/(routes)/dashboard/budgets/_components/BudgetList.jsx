"use client"
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { db } from '@/utils/dbConfig'
import { desc, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import BudgetItem from './BudgetItem'
import { Skeleton } from "@/components/ui/skeleton"


function BudgetList() {

  const [BudgetList,setBudgetList]=useState([]);

  const {user} = useUser();

  useEffect(()=>{
    getBudgetList();
  },[user])
 
  const getBudgetList=async()=>{

    const result=await db.select({
      ...getTableColumns(Budgets),
      totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
      totalItem:sql `count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
    .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
    .groupBy(Budgets.id)
    .orderBy(desc(Budgets.id));

    setBudgetList(result);
  }
  
  return (
    <div className='mt-7'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
             <CreateBudget
             refreshData={()=>getBudgetList()}/>
             { BudgetList?.length>0? BudgetList.map((budget,index)=>(
              <BudgetItem budget={budget}/>
             ))
             : Array.from({ length: BudgetList.length || 5 }).map((_, index) => ( 
              <div key={index}>
                  <Skeleton className="w-full h-[140px] rounded-lg bg-slate-100" />
              </div>
             ))
            }
        </div>
    
    </div>
  )
}

export default BudgetList
