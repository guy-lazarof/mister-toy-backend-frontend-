import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { toyService } from '../services/toy-back.service';
import { utilService } from '../services/util.service';

// import { toyService } from '../services/toy.service(without.backend)';
export function ToyDetails() {
  const [toy, setToy] = useState(null)
  const { toyId } = useParams()
  useEffect(() => {

    onLoadToy(toyId)
  }, [])

  function onLoadToy(toyId) {
    return toyService.get(toyId)
      .then(setToy)
      .catch(err => console.log(err))
  }

  if (!toy) return <h2>Loading toy...</h2>
  return (
    <section className='toy-details'>
      <h3>{toy.name}</h3>
      <p>{toy.price}</p>
      <p>{toy.labels}</p>
      <p>{utilService.formatTime(toy.createdAt)}</p>
      <p>in stock:{toy.instock}</p>
    </section>
  )
}