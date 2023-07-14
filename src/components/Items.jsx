import React from 'react'
import SingleItem from './SingleItem';
import { useFetch } from '../reactQueryCustomHook';

const Items = () => {
  const { data, isError, isLoading, error } = useFetch();
  const items = data;

  if (isLoading) {
    return <h3 style={{ textAlign: 'center', marginTop: '2rem'}}>Loading...</h3>
  }

  if (isError) {
    return <h1 style={{ textAlign: 'center'}}><p>{error.message}</p></h1>
  }

    const displaySingleItems = items?.map((item) => {
      const { id } = item;
        return <SingleItem key={ id } item={item} />
    })
  return (
      <section className='items'>
          {displaySingleItems}
    </section>
  )
}

export default Items