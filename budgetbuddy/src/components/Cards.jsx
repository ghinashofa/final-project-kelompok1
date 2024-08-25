import React from "react";
import {
    CurrencyDollarIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";

export default function Cards() {
    return (
        <div className="flex flex-col lg:flex-row gap-6">
            {/* === Net Balance Card === */}
            <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-custom-combined p-6">
                <div className="flex items-center space-x-2 mb-4">
                    <div className="bg-gradient-to-r from-[#868CFF] to-[#4318FF] p-2 rounded-full inline-block">
                        <CurrencyDollarIcon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-black tracking-normal">Net Balance</h3>
                </div>
                <div className="text-2xl font-bold text-[#4C3BCF] tracking-wider">
                    Rp 2.000.000
                </div>
                <div className="text-red-500 mt-2">-Rp15.800.000</div>
            </div>

            {/* === Total Income Card ===*/}
            <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-custom-combined p-6">
                <div className="flex items-center space-x-2 mb-4">
                    <div className="bg-gradient-to-r from-[#7896FF] to-[#066AFF] p-2 rounded-full inline-block">
                        <ArrowTrendingUpIcon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-black tracking-normal">Total Income</h3>
                </div>
                <div className="text-2xl font-bold text-[#4C3BCF] tracking-wider">
                    Rp3.000.000
                </div>
                <div className="text-green-500 mt-2">+Rp3.000.000</div>
            </div>

            {/* === Total Expenses Card ===*/}
            <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-custom-combined p-6">
                <div className="flex items-center space-x-2 mb-4">
                    <div className="bg-gradient-to-r from-[#F37878] to-[#E52626] p-2 rounded-full inline-block">
                        <ArrowTrendingDownIcon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-black tracking-normal">Total Expenses</h3>
                </div>
                <div className="text-2xl font-bold text-[#4C3BCF] tracking-wider">
                    Rp1.000.000
                </div>
                <div className="text-red-500 mt-2">+Rp800.000</div>
            </div>
        </div>
    );
}
