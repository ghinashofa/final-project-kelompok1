import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Pie, PieChart } from "recharts";
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
import { useEffect, useState } from "react";

// const chartData = [
//   { category: "food", budget: 275, fill: "var(--color-food)" },
//   { category: "sport", budget: 200, fill: "var(--color-sport)" },
//   { category: "fashion", budget: 187, fill: "var(--color-fashion)" },
// ];

const chartConfig = {
  budget: {
    label: "Budget",
  },
  food: {
    label: "Food",
    color: "#4535C1",
  },
  salary: {
    label: "Salary",
    color: "#F05A7E",
  },
  apparel: {
    label: "Apparel",
    color: "#7A1CAC",
  },
  transport: {
    label: "Transport",
    color: "#1E201E",
  },
  health: {
    label: "Health",
    color: "#674636",
  },
  beauty: {
    label: "Beauty",
    color: "#FEECB3",
  },
  business: {
    label: "Business",
    color: "#7695FF",
  },
};

const colorDescriptions = [{
      label: "Food",
      color: "#4535C1",
    },
  {
      label: "Salary",
      color: "#F05A7E",
    },
    {
      label: "Apparel",
      color: "#7A1CAC",
    },
    {
      label: "Transport",
      color: "#1E201E",
    },
    {
      label: "Health",
      color: "#FABC3F",
    },
    {
      label: "Beauty",
      color: "#FEECB3",
    },
    {
      label: "Business",
      color: "#7695FF",
    },
];

export default function PieCharts({ transaction }) {
  const [chartData, setChartData] = useState(null);
  const [dataPerCategory, setDataPerCategory] = useState([]);

  // Fungsi untuk menghitung total amount per kategori
  const calculateTotalPerCategory = () => {
    return transaction.reduce((acc, transaction) => {
      const { category, amount } = transaction;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      setDataPerCategory(acc);
      // console.log(acc);
      formatCategoryData(acc);
      return acc;
    }, {});
  };

  function formatCategoryData(categoryData) {
    const formattedData = Object.keys(categoryData).map((key) => {
      return {
        category: key.toLowerCase().replace(/\s+/g, "-"), // Mengubah nama kategori menjadi huruf kecil dan mengganti spasi dengan '-'
        budget: categoryData[key],
        fill: `var(--color-${key.toLowerCase().replace(/\s+/g, "-")})`,
      };
    });

    // console.log(formattedData);
    setChartData(formattedData);
    return formattedData;
  }


  useEffect(() => {
    calculateTotalPerCategory();
  }, [transaction]);


  return (
    <>
      {chartData && (
        <Card className="flex flex-col w-full md:w-[32vw] px-2 rounded-2xl">
          <CardHeader className="pb-0 flex flex-col gap-3">
            <CardDescription>Total Transaction All Categories</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="budget"
                  nameKey="category"
                  innerRadius={60}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="hidden md:flex md:flex-col gap-2 text-sm  items-start h-[50%] py-2">
            {colorDescriptions.map((el, i) => {
              return (
                <div key={i} className="flex flex-col items-start gap-5">
                  <div className="flex gap-1 items-center">
                  <span className={`w-3 h-[50%] bg-[${el.color}] rounded-sm`}></span>
                    <p>Total {el.label} </p>
                    {/* <p>{el.color}</p> */}
                  </div>
                </div>
              );
            })}
          </CardFooter>
        </Card>
      )}
    </>
  );
}
