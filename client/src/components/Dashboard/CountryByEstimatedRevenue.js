import React, { useEffect, useState } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { useHttp } from '../../hooks/http';
import service from '../../services/app.service';
import Spinner from '../UI/Spinner/Spinner';

function CountryByEstimatedRevenue() {
  const [processRequest, isLoading, error] = useHttp();
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    const doUseEffect = async () => {
      let data = await processRequest(service.getCountryErDay());
      setFetchedData(data);
    };

    doUseEffect();
  }, []);

  return (
    <>
      {isLoading && (
        <div className="row justify-content-center align-content-center">
          <Spinner />
        </div>
      )}
      <Chart fetchedData={fetchedData} />
    </>
  );
}

export default CountryByEstimatedRevenue;

function configureChart(fetchedData) {
  const yesterdayData = {
    label: 'Yesterday',
    data: fetchedData.yesterday,
    backgroundColor: 'rgba(0, 99, 132, 0.6)',
    borderColor: 'rgba(0, 99, 132, 1)'
  };

  const todayData = {
    label: 'Today',
    data: fetchedData.today,

    backgroundColor: 'rgba(99, 132, 0, 0.6)',
    borderColor: 'rgba(99, 132, 0, 1)'
  };

  const data = {
    labels: fetchedData.country,
    datasets: [todayData, yesterdayData]
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'rgb(255, 99, 132)'
        }
      }
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          return '$' + Number(tooltipItem.value).toLocaleString('en-US');
        }
      }
    },
    title: {
      display: true,
      text: 'Country by Estimated Revenue - Today vs. Yesterday ($)'
    },
    scales: {
      yAxes: [
        {
          barPercentage: 1,
          categoryPercentage: 0.8,
          ticks: {
            // Add the diff for each country
            callback: function (value, index, values) {
              return value + ' ' + fetchedData.diff[index] + '%';
            }
          }
        }
      ],
      xAxes: [
        {
          position: 'top',
          ticks: {
            callback: function (value, index, values) {
              return '$' + Number(value).toLocaleString('en-US');
            }
          }
        }
      ]
    }
  };

  return [data, options];
}

function Chart({ fetchedData }) {
  if (!fetchedData) return null;
  const [data, options] = configureChart(fetchedData);
  return <HorizontalBar data={data} options={options} height="150" />;
}
