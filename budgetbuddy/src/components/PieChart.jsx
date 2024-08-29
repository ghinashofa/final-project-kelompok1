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
  sport: {
    label: "Sport",
    color: "#9BB0C1",
  },
  fashion: {
    label: "Fashion",
    color: "#3DC2EC",
  },
  "social-life": {
    label: "Social Life",
    color: "#F05A7E",
  },
  apparel: {
    label: "Apparel",
    color: "#7A1CAC",
  },
  transport: {
    label: "Transport",
    color: "#674636",
  },
};

export default function PieCharts({ transaction }) {
  // console.log(transaction);
  const [chartData, setChartData] = useState(null);
  //   const [listCategory, setListCategory]= useState([])
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
      console.log(acc);
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

    console.log(formattedData);
    setChartData(formattedData);
    return formattedData;
  }

//   console.log(dataPerCategory, "INI PERKATEGORI");

  useEffect(() => {
    // formatChartDataCategory();
    calculateTotalPerCategory();
  }, [transaction]);

    // console.log(chartData, "INI CHARTDATA 98");

  return (
    <>
      {chartData && (
        <Card className="flex flex-col w-full md:w-[20vw] px-2 rounded-2xl">
          <CardHeader className="pb-0 flex flex-col gap-3">
            <CardDescription>Total Budgeting All Categories</CardDescription>
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
          <CardFooter className="flex-col gap-2 text-sm  items-start h-[50%] py-2">
            <div className="flex flex-col items-start gap-5">
              <div className="flex gap-1 items-center">
                <span className="w-3 h-[50%] bg-red-700 rounded-sm"></span>
                <p>Total Income </p>
              </div>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
