import { useDispatch, useSelector } from 'react-redux'
import { changeSearchField } from '../../redux/slice/searchSlice';

function SearchField() {
  const { search } = useSelector(state => state.search);
  const dispatch = useDispatch();
  
  function handleChage(e) {
    const { value } = e.target;
    dispatch(changeSearchField(value));
  }

  return (
    <div className='search-field'>
        <input 
        type="text" 
        className="search-field-input"
        placeholder='Type to search'  
        value={search}
        onChange={handleChage}
      />
    </div>
  )
}

export default SearchField;