import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ToyFilter } from '../cmp/toy-filter';
import { ToyList } from '../cmp/toy-list';
import { addToy, loadToys, removeToy } from '../store/toy.action';
import { SET_FILTER } from '../store/toy.reducer';


export function ToyIndex() {

    const dispatch = useDispatch()
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
    const navigate = useNavigate()
    useEffect(() => {
        onLoadToys(filterBy)
    }, [filterBy])


    function onSetFilter(filterBy) {
        return dispatch({ type: SET_FILTER, filterBy })
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .catch(err => { console.log(err) })
    }

    function onLoadToys(filterBy) {
        loadToys(filterBy)
            .catch(err => { console.log(err) })
    }

    function onGoToAdd() {
        navigate('/toy/edit')
    }

    return (
        <section>
            <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <button onClick={onGoToAdd}>Add toy</button>
            <ToyList toys={toys} onRemoveToy={onRemoveToy} />

        </section>
    )


}

