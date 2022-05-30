import './Chart.css';
import { Chart } from 'react-google-charts';

export const chartData = [
    [
        "Element",
        "You Climbed",
        { role: "style" },
        {
        sourceColumn: 0,
        role: "annotation",
        type: "string",
        calc: "stringify",
        },
    ],
    ["V9", 8, "#ff981f", null],
    ["v7", 10, "skyblue", null],
    ["v4", 19, "gold", null],
    ["v2", 21, "lightblue", null],
];

export const options = {
    title: "Boulders Climbed By Grade",
    width: '100%',
    height: '95%',
    bar: { groupWidth: "90%" },
    legend: { position: "none" },
};

