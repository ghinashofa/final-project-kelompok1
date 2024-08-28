import React from "react";
import {
    CurrencyDollarIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";
import Card from "./Card";

export default function CardsDashboard({ transactions }) {
    // console.log(transactions, "INII ISI TRANSACTIONNYA");
    // Menghitung total income
    const totalIncome = transactions.reduce(
        (acc, transaction) =>
            acc + (transaction.status === "Income" ? transaction.amount : 0),
        0
    );
    //   console.log(totalIncome, "INII ISI TOTAL INCOMENYA");

    // Menghitung total expense
    const totalExpense = transactions.reduce(
        (acc, transaction) =>
            acc + (transaction.status === "Expenses" ? transaction.amount : 0),
        0
    );

    // const percentage = (totalExpense / totalIncome) * 100;

    // Menghitung balance (Net Balance)
    const balance = totalIncome - totalExpense;

    //menghitung update balance, income, dan expense
    const balanceCahnge = balance >= 0 ? balance : -balance;
    const incomeChange = totalIncome >= 0 ? totalIncome : -totalIncome;
    const expenseChange = totalExpense >= 0 ? totalExpense : -totalExpense;

    return (
        <>
            <div className="flex flex-wrap justify-between gap-6 w-full">
                <Card
                    icon={CurrencyDollarIcon}
                    title={"Net Balance"}
                    amount={balance}
                    change={balanceCahnge}
                    gradientFrom="#868CFF"
                    gradientTo="#4318FF"
                />
                <Card
                    icon={ArrowTrendingUpIcon}
                    title={"Total Income"}
                    amount={totalIncome}
                    change={incomeChange}
                    gradientFrom="#7896FF"
                    gradientTo="#066AFF"
                />
                <Card
                    icon={ArrowTrendingDownIcon}
                    title={"Total Expenses"}
                    amount={totalExpense}
                    change={expenseChange}
                    gradientFrom="#F37878"
                    gradientTo="#E52626"
                />
            </div>
        </>
    );
}
