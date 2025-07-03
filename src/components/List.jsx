import React from 'react'
import ListItem from './ListItem'
// 展示列表
export default function List({ noteList }) {
  return (
    <div className='px-10px'>
      {
        noteList?.map((item, index) => {
          return <ListItem item={item} key={item.id || index} />
        })
      }
    </div>
  )
}
