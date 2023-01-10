import { useNavigate } from 'react-router-dom';

import { ToyPreview } from './toy-preview';

export function ToyList({ toys, onRemoveToy }) {
    const navigate = useNavigate()
    function onGoToEdit(toyId) {
        navigate(`/toy/edit/${toyId}`)
    }

    function onGoToDetails(toyId) {
        navigate(`/toy/${toyId}`)
    }
    return (
        <ul className='toys-list'>
            {toys.map(toy => <li key={toy._id}>
                <ToyPreview toy={toy} />
                <div>
                    <button onClick={() => onGoToDetails(toy._id)}>details</button>
                    <button onClick={() => onGoToEdit(toy._id)}>edit</button>
                    <button onClick={() => onRemoveToy(toy._id)}>delete</button>
                </div>
            </li>)}
        </ul>
    )
}
