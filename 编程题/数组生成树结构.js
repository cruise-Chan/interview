const list = [
    { id: 40, parentId: null, note: "一级菜单-1" },
    { id: 20, parentId: null, note: "一级菜单-2" },
    { id: 22, parentId: 20, note: "二级菜单-22" },
    { id: 24, parentId: 22, note: "三级菜单-24" },
    { id: 34, parentId: 22, note: "三级菜单-34" },
    { id: 21, parentId: 40, note: "二级菜单-21" }
]

list2tree(list)
function list2tree(list) {
    const res = []
    for (let i = 0; i < list.length; i++) {
        if (list[i].parentId === null) {
            list[i].children = []
            res.push(list[i])
        } else {
            const parent = getParent(list, list[i])
            parent.children = []
            // getParent -> parent.children.push(list[i])
            if(parent){
                parent.children.push(list[i])
            }
        }
    }
    function getParent(list, key) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === key.parentId) {
                return list[i]
            }
        }
        return null
    }
    console.log(res)
}