import Localstorage from '@/utils/localstorage'
import {
    useEffect,
    useState
} from 'react'
import {
    debounce
} from 'lodash'

const storage = new Localstorage()
const cache = {}

export const useOperational = (key) => {
    const [data, setData] = useState([])
    const [currentItem, setCurrentItem] = useState({
        text: '',
        date: new Date().getTime()
    });
    const [isMobile, setIsMobile] = useState(false)
    const [isInEdit, setIsInEdit] = useState(true);
    // 记录是否是
    useEffect(() => {
        let decideMobile = () => {
            if (window.innerWidth <= 750) {
                setIsMobile(true)
            } else {
                setIsMobile(false)
            }

        }
        decideMobile()
        decideMobile = debounce(decideMobile, 300)
        window.addEventListener('resize', decideMobile)
        return () => {
            window.removeEventListener('resize', decideMobile)
        }
    }, [])
    const saveCurrent = async () => {
        if (currentItem?.id) {
            await storage.editItem(currentItem.id, currentItem.text);
        }
    }
    const saveItem = async (id, text) => {
        await storage.editItem(id, text);
    }

    const getData = async () => {
        let data = await storage.getAllData()
        setData(data)
        return data
    }

    const addItem = async () => {
        let item = {
            date: new Date().getTime(),
            text: ''
        }
        await storage.addItem(item)
    }

    // 删除一篇笔记
    const deleteItem = async () => {
        await storage.deleteItem(currentItem.id)
    }

    return cache.operational = {
        data,
        getData,
        addItem,
        saveCurrent,
        deleteItem,
        currentItem,
        setCurrentItem,
        saveItem,
        isMobile,
        isInEdit, 
        setIsInEdit
    }

}

export const useModel = (namespace) => {
    const model = cache[namespace]
    return model || Error(`未找到${namespace}模块`)
}