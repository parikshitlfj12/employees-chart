import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

interface TotalActivityChartProps {
    name: string;
    value: string | number;
}

interface ActivityMeta {
    label: string;
    fillColor: string;
}

const TotalActivityChart: React.FC<{ data?: TotalActivityChartProps[], activityMeta?: ActivityMeta[] }> = ({ data, activityMeta }) => {
    
    // Convert string values to numbers where necessary
    const formattedData = data?.map(item => ({
        ...item,
        value: typeof item.value === 'string' ? parseInt(item.value, 10) : item.value,
        fillColor: activityMeta?.find(meta => meta.label === item.name)?.fillColor || '#000000'
    }));

    return (
        <div style={{ height: 600 }}>
            <ResponsiveBar
                data={formattedData ?? []}
                keys={['value']}
                indexBy="name"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={({ id, data }) => data['fillColor']}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={null}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                animate={true}
                motionConfig="gentle"
                role="application"
                ariaLabel="Activity bar chart"
                barAriaLabel={function (e) {
                    return `${e.id}: ${e.formattedValue} in activity: ${e.indexValue}`;
                }}
            />
        </div>
    );
};

export default TotalActivityChart;
