import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { toyService } from '../services/toy-back.service';
import { saveToy } from '../store/toy.action';

// import { toyService } from '../services/toy.service(without.backend)';
export function ToyEdit() {
  const navigate = useNavigate()
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
  const { toyId } = useParams()

  useEffect(() => {
    if (!toyId) return
    onLoadToy()
  }, [])

  function onSaveToy(ev) {
    ev.preventDefault()
    saveToy(toyToEdit)
      .then(() => { navigate('/toy') })
      .catch(() => { navigate('/toy') })
  }

  function handleChange({ target }) {
    let { value, name: field, type } = target
    value = (type === 'number') ? +value : value
    setToyToEdit({ ...toyToEdit, [field]: value })
  }

  function onLoadToy() {
    toyService.get(toyId)
      .then(setToyToEdit)
      .catch(err => console.log(err))
  }
  return (
    <section className='toy-edit'>
      <form onSubmit={onSaveToy}>
        <input type="text" name='name' id='name' placeholder='new name' onChange={handleChange} value={toyToEdit.name} />
        <input type="number" name='price' id='price' placeholder='new price' onChange={handleChange} value={toyToEdit.price} />
        <button>save</button>
      </form>
    </section>
  )
}