import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { LabelsCountChart } from '../cmp/LabelsCountChart';
import { LabelsPriceChart } from '../cmp/LabelsPriceChart';
import { loadToys } from '../store/toy.action';




export function Home() {
  const toys = useSelector((storeState) => storeState.toyModule.toys)

  useEffect(() => {
    loadToys()
  }, [])

  function getChartsData() {
    const chartsData = toys.reduce(
      (acc, toy) => {
        toy.labels.forEach((label) => {
          acc.labelsCountMap[label] = acc.labelsCountMap[label] ? ++acc.labelsCountMap[label] : 1
          acc.labelsPriceMap[label] = acc.labelsPriceMap[label] ? (acc.labelsPriceMap[label] += toy.price) : toy.price
        })

        return acc
      },
      { labelsCountMap: {}, labelsPriceMap: {} }
    )
    Object.keys(chartsData.labelsPriceMap).forEach((label) => (chartsData.labelsPriceMap[label] /= chartsData.labelsCountMap[label]))

    return chartsData
  }
  const { labelsCountMap, labelsPriceMap } = getChartsData()



  return (
    <section >
      <h2>Hello from home page</h2>
      <div className="charts flex" >
        <LabelsCountChart dataMap={labelsCountMap} />
        <LabelsPriceChart dataMap={labelsPriceMap} />
      </div>

    </section >
  )
}