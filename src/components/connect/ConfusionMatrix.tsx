import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ConfusionMatrixData {
  classes: string[];
  matrix: number[][];
}

const ConfusionMatrix: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ConfusionMatrixData>('http://localhost:8000/confusion_matrix');
        const data = response.data;

        const labels = data.classes;
        const matrix = data.matrix;

        const datasets = labels.map((label, i) => ({
          label,
          data: matrix[i],
          backgroundColor: `rgba(75, 192, 192, 0.5)`,
          borderColor: `rgba(75, 192, 192, 1)`,
          borderWidth: 1,
        }));

        setChartData({
          labels,
          datasets,
        });
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const options: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: { beginAtZero: true, stacked: true },
      y: { beginAtZero: true, stacked: true },
    },
  };

  return (
    <div>
      <h2>Confusion Matrix</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && <Bar data={chartData} options={options} />}
    </div>
  );
};

export default ConfusionMatrix;
