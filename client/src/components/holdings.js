import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function Holdings() {
    const [trades, setTrades] = useState([]);

    useEffect(() => {
        // Fetch trade data from the /api/trade endpoint
        fetch('http://localhost:3000/api/trade')
            .then((response) => response.json())
            .then((data) => setTrades(data))
            .catch((error) => console.error('Error fetching trade data:', error));
    }, []); // Empty dependency array ensures the effect runs only once

    // Calculate total holdings value
    const totalHoldingsValue = trades.reduce((total, trade) => {
        return total + trade.price * trade.quantity;
    }, 0);

    // Group holdings by industryType for the pie chart
    const industryData = trades.reduce((industryMap, trade) => {
        const industryType = trade.industryType;
        if (!industryMap[industryType]) {
            industryMap[industryType] = 0;
        }
        industryMap[industryType] += trade.price * trade.quantity;
        return industryMap;
    }, {});

    const pieChartColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF6666'];

    return (
        <div>
            <h3>Holdings</h3>
            <div style={{ width: '400px', height: '300px', overflow: 'auto' }}>
                <h2>Holdings Section</h2>
                <List>
                    {trades.map((holding) => (
                        <ListItem key={holding.symbol}>
                            <ListItemText
                                primary={<strong>{holding.symbol}</strong>}
                                secondary={`Price: ${holding.price}, Quantity: ${holding.quantity}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </div>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            dataKey="value"
                            data={Object.entries(industryData).map(([industryType, value]) => ({
                                name: `${industryType} - ${value}`,
                                value,
                            }))}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label={({ name }) => name}
                        >
                            {Object.entries(industryData).map(([industryType, value], index) => (
                                <Cell key={index} fill={pieChartColors[index % pieChartColors.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default Holdings;
