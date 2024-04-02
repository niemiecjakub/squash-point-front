import { Legend, PieChart, ResponsiveContainer, Pie, Cell } from "recharts";

type Props = {
    name: string;
    data: { name: string; value: number }[];
    colors: string[];
};

const PlayerStatistics = ({ data, name, colors }: Props) => {
    return (
        <div className="w-full flex-col h-64 mb-6">
            <p className="text-center w-full text-xl font-semibold">{name}</p>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Legend />
                    <Pie data={data} cx="50%" cy="50%" labelLine={true} outerRadius={80} dataKey="value" label>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PlayerStatistics;
