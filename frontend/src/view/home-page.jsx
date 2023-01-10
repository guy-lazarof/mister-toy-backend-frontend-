import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';




export function Home() {


  const toys = useSelector((storeState) => storeState.toyModule.toys)

  ChartJS.register(ArcElement, Tooltip, Legend);

  const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]

  const data = {
    labels: labels,
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3, 3, 2],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  // forEach => filterbyLabel => toy.price
  // let sumPrice = []
  // let sum
  // let filterToys
  // labels.forEach((label) => {
  //   filterToys = toys.filter((toy) => { toy.label === label })
  //   sum = filterToys.reduce((partialSum, toy) => {
  //     return partialSum + toy.price
  //   }, 0)
  // })


  // console.log(sum)
  return (
    <section style={{ width: '400px' }} >
      <Doughnut data={data} />
      <h2>Hello from home page</h2>

    </section >
  )
}