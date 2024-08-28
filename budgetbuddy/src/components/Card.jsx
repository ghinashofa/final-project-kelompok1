import React from "react";

export default function Card({
    icon: Icon,
    title,
    amount,
    change,
    gradientFrom,
    gradientTo,
}) {
    return (
        <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center space-x-2 mb-4">
                <div
                    className="p-2 rounded-full inline-block"
                    style={{
                        background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
                    }}
                >
                    <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-black tracking-normal">
                    {title}
                </h3>
            </div>
            <div className="text-2xl font-bold text-[#4C3BCF] tracking-wider">
                Rp{amount.toLocaleString("id-ID")}
            </div>
            {change !== undefined && (
                <div
                    className={`mt-2 ${
                        change >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                >
                    {change >= 0
                        ? `+Rp${Math.abs(change).toLocaleString("id-ID")}`
                        : `-Rp${Math.abs(change).toLocaleString("id-ID")}`}
                </div>
            )}
        </div>
    );
}
