// components/musician-card/index.ts
Component({
    options: {
        styleIsolation: "isolated"
    },
    /**
     * 组件的属性列表
     */
    properties: {
        item: {
            type: Object,
            valeu: () => { return null }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onTab() {
            this.triggerEvent('click',this.properties.item.id)
        }
    }
})