import { FC } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

type GraphData = {
    name: string;
    value: number;
};
export interface IProps {
    data: GraphData[];
}

const Graph: FC<IProps> = ({ data }) => {
    return (
        <ResponsiveContainer width='100%' height={500}>
            <AreaChart
                width={500}
                height={400}
                data={[
                    { value: 0, name: '2022-01-01T00:00:0Z' },
                    ...data,
                ]}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Area
                    connectNulls
                    type='monotone'
                    dataKey='value'
                    stroke='#82ca9d'
                    fill='#82ca9d'
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default Graph;
