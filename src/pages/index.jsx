import { useEffect, useMemo, useRef, useState } from "react";
import Editer from '@/components/Editer'
import { useOperational } from '@/hooks/operational'
import List from '@/components/List'

export default function HomePage() {

  const {
    data,
    getData,
    addItem,
    saveCurrent,
    deleteItem,
    currentItem,
    setCurrentItem,
    saveItem, isMobile,
    isInEdit, setIsInEdit } = useOperational()

  useEffect(() => {
    (async () => {
      const data = await getData()
      // 如果没有
      if (!data[0]) {
        await addItem()
      }
      setCurrentItem(data[0])
    })()
  }, [])


  // 点击删除
  const onDelete = async () => {
    if (data.length > 1) {
      await deleteItem()
      const data = await getData()

      setCurrentItem(data[0])
    }
  }
  // 点击新增
  const onAdd = async () => {
    // 先保存
    await saveCurrent();
    await addItem();
    const data = await getData()
    setCurrentItem(data[0])
  }

  // 修改
  const onEdit = async (text) => {

    setCurrentItem((olditem) => {
      let newItem = { ...olditem, text }
      if (timer.current) {
        clearTimeout(timer.current)
      }
      timer.current = setTimeout(async function () {
        if (newItem?.id) {
          await saveItem(newItem.id, newItem.text)
          await getData()
        }
      }, 500);
      return newItem
    })
    // 防抖

  }
  let timer = useRef(null);

  const [keyWord, setKeyWord] = useState('')
  const searchByKeyWord = (e) => {
    setKeyWord(e?.target?.value || '')
  }
  const listData = useMemo(() => {
    if (!keyWord) {
      return data
    } else {
      console.log(keyWord)
      return data.filter(ele => {
        if (ele?.text?.indexOf && (ele?.text?.indexOf(keyWord) !== -1)) {
          return true
        }
        return false
      })
    }
  }, [data, keyWord])

  return (
    <div className="w-100% h-100vh flex flex-col overflow-hidden">
      <div className="flex flex justify-between items-center h-40px b-b-solid  px-20px">
        <div className="cursor-pointer" onClick={() => setIsInEdit(false)}>
          {isMobile && isInEdit ? '返回列表' : null}
        </div>
        <div>
          <span onClick={onDelete} className="px-10px cursor-pointer">删除</span>
          <span className="color-#ccc">|</span>
          <span onClick={onAdd} className="px-10px cursor-pointer">新建</span>
        </div>
      </div>
      <div className="w-100% flex-1 overflow-hidden ">
        <div className={"w-100% max-w-100% h-100% flex transition-all " + (isInEdit ? 'max-[750px]:transform-translate-x-[-100%] ' : 'max-[750px]:transform-translate-x-[0%]')}
        >

          <div className={"w-300px b-r-solid h-100% overflow-hidden  max-[750px]:w-100% flex-shrink-0 " + (isInEdit ? 'max-[750px]:b-r-0' : '')}>
            <div className="flex justify-center items-center b-b-solid ">
              <span className="p-8px pl-0">🔍</span>
              <input type="text" value={keyWord} onChange={searchByKeyWord} className="h-20px w-80%" />
            </div>
            <div className="overflow-x-hidden overflow-y-scroll h-[calc(100%-40px)]">
              <List noteList={listData} />
            </div>
          </div>

          <div className="flex-shrink-0 flex-grow-1 max-[750px]:w-100%">
            {currentItem && <Editer value={currentItem.text} date={currentItem.date} onChange={onEdit} />}
          </div>
        </div>


      </div>
    </div>
  );
}
