import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ToyFilter } from '../cmp/toy-filter';
import { ToyList } from '../cmp/toy-list';
import { toyService } from '../services/toy-back.service';
import { addToy, loadToys, removeToy } from '../store/toy.action';
import { SET_FILTER } from '../store/toy.reducer';


export function ToyIndex() {

    const dispatch = useDispatch()
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
    const [searchParams, setSearchParams] = useSearchParams()
    const queryFilterBy = toyService.getFilterFromSearchParams(searchParams)
    const navigate = useNavigate()
    useEffect(() => {
        onLoadToys(queryFilterBy)
    }, [queryFilterBy])


    function onSetFilter(filterBy) {
        setSearchParams(filterBy)
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
            <ToyFilter filterBy={queryFilterBy} onSetFilter={onSetFilter} />
            <button onClick={onGoToAdd}>Add toy</button>
            <ToyList toys={toys} onRemoveToy={onRemoveToy} />

        </section>
    )


}

