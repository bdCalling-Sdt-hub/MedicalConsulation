import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import React from "react";

type Props = {};
const data = [
  {
    name: "Jan",
    User: 40,
    Consultant: 24,
    amt: 24,
  },
  {
    name: "Feb",
    User: 30,
    Consultant: 13,
    amt: 22,
  },
  {
    name: "Mar",
    User: 20,
    Consultant: 98,
    amt: 22,
  },
  {
    name: "Apr",
    User: 27,
    Consultant: 39,
    amt: 20,
  },
  {
    name: "May",
    User: 18,
    Consultant: 48,
    amt: 21,
  },
  {
    name: "Jun",
    User: 23,
    Consultant: 38,
    amt: 25,
  },
  {
    name: "Jul",
    User: 34,
    Consultant: 43,
    amt: 10,
  },
  {
    name: "Aug",
    User: 34,
    Consultant: 43,
    amt: 20,
  },
  {
    name: "Sep",
    User: 34,
    Consultant: 43,
    amt: 40,
  },
  {
    name: "Oct",
    User: 34,
    Consultant: 43,
    amt: 60,
  },
  {
    name: "Nov",
    User: 34,
    Consultant: 43,
    amt: 80,
  },
  {
    name: "Dec",
    User: 34,
    Consultant: 43,
    amt: 100,
  },
];
const SellerActivityChart = (props: Props) => {
  const [opacity, setOpacity] = React.useState({
    User: 1,
    Consultant: 1,
  });

  const handleMouseEnter = (o) => {
    const { dataKey } = o;

    setOpacity((op) => ({ ...op, [dataKey]: 0.5 }));
  };

  const handleMouseLeave = (o) => {
    const { dataKey } = o;

    setOpacity((op) => ({ ...op, [dataKey]: 1 }));
  };

  return (
    <div style={{ width: "100%" }}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey="amt" />
          <Tooltip />
          <Legend
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          <Line
            type="monotone"
            dataKey="User"
            // strokeOpacity={opacity.Sales}
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="Consultant"
            strokeOpacity={opacity.Consultant}
            stroke="#8884d8"
          />
        </LineChart>
      </ResponsiveContainer>
      {/* <p className="notes">Tips: Hover the legend!</p> */}
    </div>
  );
};

export default SellerActivityChart;
