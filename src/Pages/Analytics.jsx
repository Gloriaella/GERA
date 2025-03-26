import React, { useEffect, useState, useContext } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Client, Databases, Query } from 'appwrite';
import Auth from '../Context/context'; // Ensure user context is imported

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Configure Appwrite client
const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
  .setProject('67d03f3c0009ba164044'); // Replace with your Appwrite project ID

const databases = new Databases(client);

const Analytics = () => {
  const { user } = useContext(Auth); // Get current user
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [weeklyCompleted, setWeeklyCompleted] = useState(new Array(7).fill(0));

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    if (!user) return; // Prevent fetching if user is not logged in

    setLoading(true);
    databases.listDocuments('67d4f0f2003cbfbe2a79', '67d4f19d0036525e7044', [
      Query.equal('userId', user.$id),
    ])
      .then((response) => {
        const fetchedTasks = response.documents;
        setTasks(fetchedTasks);
        setTotalTasks(fetchedTasks.length);

        const completed = fetchedTasks.filter(task => task.status === 'completed');
        setCompletedTasks(completed.length);
        setPendingTasks(fetchedTasks.length - completed.length);

        const now = Date.now();
        const oneDay = 86400000;
        const weekData = new Array(7).fill(0);

        completed.forEach(task => {
          if (task.completedAt) {
            const diff = now - new Date(task.completedAt).getTime();
            const dayIndex = Math.floor(diff / oneDay);
            if (dayIndex < 7 && dayIndex >= 0) {
              weekData[6 - dayIndex] += 1;
            }
          }
        });
        setWeeklyCompleted(weekData);
      })
      .catch(error => console.error('Error fetching tasks:', error))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className='loaderanalytics'></p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white rounded-md p-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-xl shadow-md">
          <Line 
            data={{ labels: weekDays, datasets: [{ label: 'Tasks Completed', data: weeklyCompleted, borderColor: '#FB923C', backgroundColor: '#FB923C', tension: 0.4 }] }}
            options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Weekly Task Triumphs' } } }}
          />
        </div>
        <div className="bg-gray-800 p-6 rounded-xl shadow-md">
          <Bar 
            data={{ labels: ['Total Tasks', 'Completed', 'Pending'], datasets: [{ label: 'Tasks Count', data: [totalTasks, completedTasks, pendingTasks], backgroundColor: ['#60A5FA', '#22C55E', '#F87171'] }] }}
            options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Overall Task Metrics' } } }}
          />
        </div>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[{ title: 'Total Tasks', count: totalTasks }, { title: 'Completed', count: completedTasks }, { title: 'Pending', count: pendingTasks }].map((item, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-xl shadow-md text-center">
            <h2 className="text-2xl font-bold">{item.title}</h2>
            <p className="mt-2 text-4xl font-extrabold">{item.count}</p>
            <p className="mt-1 text-gray-400">{item.title === 'Total Tasks' ? 'All tasks at a glance' : item.title === 'Completed' ? 'Tasks Conquered' : 'Challenges Ahead'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;