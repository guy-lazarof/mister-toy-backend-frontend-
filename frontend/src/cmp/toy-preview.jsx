import { utilService } from '../services/util.service';

export function ToyPreview({ toy }) {
    const { name, price, createdAt } = toy
    return (
        <article className='toy-preview'>
            <h3>{name}</h3>
            <p>price: {price}</p>
            <p>{utilService.formatTime(createdAt)}</p>
        </article>
    )
}