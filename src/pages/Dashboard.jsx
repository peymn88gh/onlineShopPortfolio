import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import Navbar from "components/Navbar/Index";
import { sidebarToggle } from 'utils/toggler';

const Dashboard = () => {
  // Sample data for demonstration
  const orderData = [120, 190, 130, 160, 220, 200, 180];
  const shippingData = [30, 40, 35, 45, 50, 60, 55];
  const productData = [10, 20, 15, 25, 30, 35, 40];
  const userData = [45, 55, 60, 70, 80, 90, 100];
  const userRoles = ['Admin', 'User', 'Editor', 'Guest', 'Manager'];

  const categoryLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  const categoricalXAxisOptions = {
    scales: {
      x: {
        type: 'category', // Set the x-axis scale type to "category"
        labels: categoryLabels, // Provide the category labels
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const usersDoughnutData = {
    labels: userRoles,
    datasets: [
      {
        data: userData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  };

  const productsBarData = {
    labels: categoryLabels,
    datasets: [
      {
        label: 'Product Quantities',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: productData,
      },
    ],
  };

  const usersDoughnutChartRef = useRef(null);
  const productsBarChartRef = useRef(null);
  const ordersChartRef = useRef(null);
  const shippingChartRef = useRef(null);

  useEffect(() => {
    // Initialize and render the charts
    if (usersDoughnutChartRef.current) {
      usersDoughnutChartRef.current.destroy();
    }

    if (productsBarChartRef.current) {
      productsBarChartRef.current.destroy();
    }
    if (ordersChartRef.current) {
      ordersChartRef.current.destroy();
    }

    if (shippingChartRef.current) {
      shippingChartRef.current.destroy();
    }
    const usersDoughnutCtx = document.getElementById('usersDoughnutChart').getContext('2d');
    usersDoughnutChartRef.current = new Chart(usersDoughnutCtx, {
      type: 'doughnut',
      data: usersDoughnutData,
    });

    const productsBarCtx = document.getElementById('productsBarChart').getContext('2d');
    productsBarChartRef.current = new Chart(productsBarCtx, {
      type: 'bar',
      data: productsBarData,
      options: categoricalXAxisOptions,
    });


    // Initialize and render other charts in a similar manner
    

    const ordersCtx = document.getElementById('ordersChart').getContext('2d');
    ordersChartRef.current = new Chart(ordersCtx, {
      type: 'bar',
      data: {
        labels: categoryLabels,
        datasets: [
          {
            label: 'Total Orders',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: orderData,
          },
        ],
      },
      options: categoricalXAxisOptions,
    });

    const shippingCtx = document.getElementById('shippingChart').getContext('2d');
    shippingChartRef.current = new Chart(shippingCtx, {
      type: 'line',
      data: {
        labels: categoryLabels,
        datasets: [
          {
            label: 'Total Shipments',
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            data: shippingData,
          },
        ],
      },
      options: categoricalXAxisOptions,
    });
  }, []);

  return (
    <main className="h-full">
      {/* <Navbar toggle={sidebarToggle} /> */}
      <div className="px-2 mx-auto mainCard">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Bar Chart for Orders */}
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Orders</h2>
            <canvas id="ordersChart"></canvas>
          </div>

          

          {/* Doughnut Chart for Users */}
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Users</h2>
            <canvas id="usersDoughnutChart"></canvas>
          </div>

          {/* Bar Chart for Products */}
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Products</h2>
            <canvas id="productsBarChart"></canvas>
          </div>

          {/* Line Chart for Shipping */}
          <div className="bg-white shadow-md p-4 rounded-lg md:col-span-2 lg:col-span-3">
            <h2 className="text-lg font-semibold mb-4">Shipping</h2>
            <canvas id="shippingChart"></canvas>
          </div>
          {/* ... (Other chart components) ... */}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
