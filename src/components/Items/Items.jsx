import { useSelector } from 'react-redux'

function Items() {
  const { items, loading, error, search } = useSelector(state => state.search)

  let content; 
  
  if (loading) {
    content = <div className='message'>loading...</div>;
  } else if (error) {
    content = <div className='message error'>{error}</div>;
  } else if (!search) {
    content = <div className='message'>Type something to search...</div>
  } else {
    content = items.map(el => <div className='item' key={el.id}>{el.name}</div>);
  }

  return (
    <div className='item-list'>
      {content}
    </div>
  )
}

export default Items;