import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

interface DayWiseActivity {
    date: string;
    items: {
        children: {
            count: string;
            label: string;
            fillColor: string;
        }[];
    };
}

interface ActivityMeta {
    label: string;
    fillColor: string;
}

interface BarChartProps {
    data?: DayWiseActivity[];
    activityMeta: ActivityMeta[];
}

const BarChart: React.FC<BarChartProps> = ({ data, activityMeta }) => {
    // Transform the data into the format required by Nivo
    const transformedData = data?.map(day => {
        const dayData: { [key: string]: string | number } = { date: day.date };
        day.items.children.forEach(item => {
            dayData[item.label] = parseInt(item.count, 10);
        });
        return dayData;
    });

    // Extract unique keys for activities
    const keys = Array.from(new Set(data?.flatMap(day => day.items.children.map(item => item.label))));

    // Create a color map using activityMeta
    const colors = activityMeta.reduce((acc, item) => {
        acc[item.label] = item.fillColor;
        return acc;
    }, {} as { [key: string]: string });

    return (
        <div style={{ height: 500 }}>
            <ResponsiveBar
                data={transformedData ?? []}
                keys={keys}
                indexBy="date"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={({ id }) => colors[id as string]}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={null}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                // Remove legends prop to remove right-hand side color boxes
                animate={true}
                motionConfig="gentle"
                role="application"
                ariaLabel="Day wise activity bar chart"
                barAriaLabel={function (e) {
                    return `${e.id}: ${e.formattedValue} on ${e.indexValue}`;
                }}
            />
        </div>
    );
};

export default BarChart;
