import React, { useState } from 'react'
import { useOperational } from '@/hooks/operational'
import dayjs from 'dayjs'
// 编辑器
const Editer = ({ value, onChange, date }) => {
    return (
        <div className='w-100% flex flex-col items-center h-100% py-8px px-20px box-border'>
            <div className='text-12px color-#ccc mb-10px'>{dayjs(date).format('YYYY年MM月DD日 HH:mm')}</div>
            <textarea
                placeholder='请输入'
                resize="none"
                className='w-100% flex-1 border-none outline-none hover:outline-none target:outline-none'
                value={value}
                onChange={(e) => {
                    onChange(e.target.value)
                }} />
        </div>
    )
}

export default Editer
