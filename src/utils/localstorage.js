import {
    uniqueId
} from 'lodash'


const notes = new Map()
class Localstorage {
    constructor(key = 'noteBookData') {
        this.key = key
        if (notes.has(key)) {
            this.data = notes.get(key)
        } else {
            const data = []
            notes.set(key, data)
            this.data = data
        }
    }

    // 获取所有数据
    async getAllData() {
        return new Promise((res, rej) => {
            try {
                let data = localStorage.getItem(this.key)
                data = ['undefined', undefined, '', null].includes(data) ? [] : JSON.parse(data)
                notes.set(this.key, data)
                this.data = data
                res(data)
            } catch (err) {
                rej(Error('未获取到笔记数据', err))
            }
            res(this.data)
        })
    }
    // 保存数据
    async saveData(data) {
        return new Promise((res, rej) => {
            try {
                localStorage.setItem(this.key, JSON.stringify(data))
                notes.set(this.key, data)
                this.data = data
                res(200)
            } catch (err) {
                rej(Error('未保存成功', err))
            }
        })
    }
    // 增
    async addItem(item) {
        this.data.unshift({
            text: item.text,
            date: item.date,
            id: uniqueId(new Date().getTime()),
        });
        return await this.saveData(this.data)
    }
    // 删
    async deleteItem(id) {
        this.data = this.data.filter(ele => ele?.id !== id)
        return await this.saveData(this.data)
    }
    // 改
    async editItem(id, text) {
        const index = this.data.findIndex(ele => ele.id === id)
        this.data[index].text = text
        return await this.saveData(this.data)
    }
}

export default Localstorage