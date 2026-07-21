import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface MiniLiveChartProps {
  title: string;
  currentValue: number;
  color: string;
}

export const MiniLiveChart = ({
  title,
  currentValue,
  color,
}: MiniLiveChartProps) => {
  // Generate 6 data points ending with the current live value
  const scaleFactors = [0.85, 0.92, 0.88, 0.95, 0.97, 1.0];
  const chartData = scaleFactors.map((factor, index) => ({
    name: `Day ${index + 1}`,
    value: Math.round(currentValue * factor),
  }));

  const gradientId = `gradient-${title.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;

  return (
    <div className="h-12 w-full mt-5 relative overflow-hidden select-none">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 2, right: 2, left: 2, bottom: 2 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.25} />
              <stop offset="100%" stopColor={color} stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" hide />
          <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-slate-950/90 text-[10px] font-bold text-white px-2 py-1 rounded-md shadow-xs border border-slate-800 pointer-events-none">
                    {new Intl.NumberFormat("en-US").format(
                      payload[0].value as number,
                    )}
                  </div>
                );
              }
              return null;
            }}
            cursor={{ stroke: color, strokeWidth: 1, strokeDasharray: "3 3" }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            activeDot={{ r: 4, strokeWidth: 0, fill: color }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MiniLiveChart;
