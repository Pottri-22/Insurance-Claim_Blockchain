import React from 'react'

function Search({search,setSearch}) {
  return (
    <div>
        <input className='text-green-700'  type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
  )
}

export default Search