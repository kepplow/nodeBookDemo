import dayjs from 'dayjs'
import { useModel } from '@/hooks/operational'


export default function ListItem({ item }) {
    const { currentItem, setCurrentItem, setIsInEdit } = useModel('operational')
    let text = item?.text
    text = text.split('\n').map(ele => {
        return (ele.trim() || false)
    })?.filter(Boolean)
    const date = dayjs(item.date).format('YYYY/MM/DD')
    const isCurrent = currentItem.id === item.id
    const clickItem = () => {
        setCurrentItem(item)
        setIsInEdit(true)
    }
    return (
        <div onClick={clickItem} className={"mt-10px cursor-pointer b-b-solid b-b-1px b-b-[rgba(141,111,31,.3)] h-40px pl-14px pr-20px py-10px text-14px color-black  rounded-8px" + (isCurrent && ' bg-[rgba(141,111,31,.3)]')} >
            <div className='font-500 text-16px truncate box-border'>{text[0] || '新笔记'}</div>
            <div className='text-14px box-border truncate'>
                <span className='color-black mr-10px'>{date}</span>
                <span className='color-#aaa'>{text[1] || '无更多文本'}</span>
            </div>
        </div>
    )
}
