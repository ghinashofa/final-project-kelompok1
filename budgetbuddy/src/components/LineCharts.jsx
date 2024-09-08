import React, { useEffect, useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

//Data penghasilan dan pengeluaran (fetch data disini)
const data = [
    {
        year: 2022,
        row: [
            { month: "January", income: 187, expenses: 80 },
            { month: "February", income: 305, expenses: 200 },
            { month: "March", income: 200, expenses: 120 },
            { month: "April", income: 73, expenses: 190 },
            { month: "May", income: 209, expenses: 130 },
            { month: "June", income: 250, expenses: 140 },
            { month: "July", income: 274, expenses: 100 },
            { month: "August", income: 294, expenses: 100 },
            { month: "September", income: 314, expenses: 130 },
            { month: "October", income: 214, expenses: 240 },
            { month: "November", income: 314, expenses: 190 },
            { month: "December", income: 514, expenses: 350 },
        ],
    },
    {
        year: 2023,
        row: [
            { month: "January", income: 186, expenses: 80 },
            { month: "February", income: 305, expenses: 200 },
            { month: "March", income: 237, expenses: 420 },
            { month: "April", income: 73, expenses: 190 },
            { month: "May", income: 109, expenses: 130 },
            { month: "June", income: 414, expenses: 440 },
            { month: "July", income: 214, expenses: 100 },
            { month: "August", income: 214, expenses: 200 },
            { month: "September", income: 214, expenses: 330 },
            { month: "October", income: 214, expenses: 240 },
            { month: "November", income: 214, expenses: 90 },
            { month: "December", income: 214, expenses: 150 },
        ],
    },
    {
        year: 2024,
        row: [
            { month: "January", income: 186, expenses: 80 },
            { month: "February", income: 305, expenses: 200 },
            { month: "March", income: 237, expenses: 120 },
            { month: "April", income: 73, expenses: 190 },
            { month: "May", income: 209, expenses: 130 },
            { month: "June", income: 214, expenses: 140 },
            { month: "July", income: 214, expenses: 100 },
            { month: "August", income: 214, expenses: 200 },
            { month: "September", income: 214, expenses: 130 },
            { month: "October", income: 214, expenses: 140 },
            { month: "November", income: 214, expenses: 190 },
            { month: "December", income: 214, expenses: 150 },
        ],
    },
];

//konfigurasi data penghasilan dan pengeluaran disini
const chartConfig = {
    income: {
        label: "Income",
        color: "#C7253E",
    },
    expenses: {
        label: "Expenses",
        color: "#10439F",
    },
};

const currentYear = new Date().getFullYear();

export default function LineCharts({ transaction }) {
    const [chartData, setChartData] = useState([
        { month: "January", income: 0, expenses: 0 },
        { month: "February", income: 0, expenses: 0 },
        { month: "March", income: 0, expenses: 0 },
        { month: "April", income: 0, expenses: 0 },
        { month: "May", income: 0, expenses: 0 },
        { month: "June", income: 0, expenses: 0 },
        { month: "July", income: 0, expenses: 0 },
        { month: "August", income: 0, expenses: 0 },
        { month: "September", income: 0, expenses: 0 },
        { month: "October", income: 0, expenses: 0 },
        { month: "November", income: 0, expenses: 0 },
        { month: "December", income: 0, expenses: 0 },
    ]);
    // const [data, setData] = useState([
    //   { month: "January", income: 186, expenses: 80 },
    //   { month: "February", income: 305, expenses: 200 },
    //   { month: "March", income: 237, expenses: 120 },
    //   { month: "April", income: 73, expenses: 190 },
    //   { month: "May", income: 209, expenses: 130 },
    //   { month: "June", income: 214, expenses: 140 },
    //   { month: "July", income: 214, expenses: 100 },
    //   { month: "August", income: 214, expenses: 200 },
    //   { month: "September", income: 214, expenses: 130 },
    //   { month: "October", income: 214, expenses: 140 },
    //   { month: "November", income: 214, expenses: 190 },
    //   { month: "December", income: 214, expenses: 150 },
    // ])

    const [selectedYear, setSelectedYear] = useState(currentYear);

    // Function untuk menangani perubahan saat nilai dipilih
    // const handleSelectChange = (value) => {
    //   setSelectedYear(value);
    // };

    // function fetchOneData() {
    //   const oneDataYear = data.filter((el) => el.year == selectedYear);
    //   setChartData(oneDataYear[0].row);
    // }
    // useEffect(() => {
    //   fetchOneData();
    // }, [selectedYear]);
    // console.log(chartData);

    const calculateTotalIncomeExpenses = () => {
        // console.log(new Date(transaction[0].date).getMonth(), "INI 140");
        transaction.forEach((element) => {
            if (element.status === "Income") {
                const newChartData = [...chartData];
                newChartData[new Date(element.date).getMonth()].income +=
                    element.amount;
                // console.log(newChartData, "INI DI INCOME");
                setChartData(newChartData);
            } else {
                const newChartData = [...chartData];

                newChartData[new Date(element.date).getMonth()].expenses +=
                    element.amount;
                // console.log(newChartData, "INI DI EXPENSES");

                setChartData(newChartData);
            }
        });
    };

    // return transaction.reduce((acc, transaction) => {
    //   const { status, amount, date } = transaction;
    //   if(!acc[new Date(transaction.date).getMonth()]){
    //     acc[new Date(transaction.date).getMonth()]
    //   }
    //     if (!acc[status]) {
    //       acc[status] = 0;
    //     }
    //     acc[status] += amount;
    //   setChartData(acc);
    //   console.log(acc);
    //   // formatCategoryData(acc);
    //   return acc;
    // }, {});

    useEffect(() => {
        calculateTotalIncomeExpenses();
    }, [transaction]);

    console.log(chartData, "INI CHARTDATA 172");

    return (
        <div className=" w-full h-[500px] relative py-5 space-y-1 mt-6">
            <Card className="rounded-2xl bg-white shadow-custom-combined border-none p-2">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="">
                        <CardTitle className="text-xl font-semibold leading-6 text-gray-900">
                            Wallet History
                        </CardTitle>
                        <CardDescription className="mt-2 text-sm text-[#AEAEAE]">
                            January - December 2024
                        </CardDescription>
                    </div>
                    <div className="flex gap-5">
                        <div className="flex gap-1 items-center">
                            <span className="w-3 h-[50%] bg-red-700 rounded-sm"></span>
                            <p className="text-sm text-[#222222]">Total Income </p>
                        </div>
                        <div className="flex gap-1 items-center">
                            <span className="w-3 h-[50%] bg-blue-900 rounded-sm"></span>
                            <p className="text-sm text-[#222222]">Total Expenses </p>
                        </div>
                    </div>
                    {/* <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={currentYear} />
            </SelectTrigger>
            <SelectContent>
              {data?.map((el, i) => {
                return (
                  <SelectItem key={i} value={el.year}>
                    {el.year}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select> */}
                </CardHeader>
                <CardContent className="mt-5">
                    <ChartContainer
                        className="h-[300px] w-full"
                        config={chartConfig}
                    >
                        <LineChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <YAxis
                                tickFormatter={"$"}
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickCount={4}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent />}
                            />
                            <Line
                                dataKey="income"
                                type="monotone"
                                stroke="var(--color-income)"
                                strokeWidth={2}
                                dot={false}
                            />
                            <Line
                                dataKey="expenses"
                                type="monotone"
                                stroke="var(--color-expenses)"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter>
                    <div className="flex w-full items-start gap-2 text-sm">
                        <div className="grid gap-2">
                            <div className="flex items-center gap-2 font-medium leading-none">
                                {/* Total balances in {selectedYear} */}
                            </div>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
