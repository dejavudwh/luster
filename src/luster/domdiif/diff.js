let index = 0
let patchs = []

const TEXT = 'TEXT'
const REPLACE = 'REPLACE'
const REMOVE = 'REMOVE'
const ATTR = 'ATTR'

function diff(oldTree, newTree) {
    walker(oldTree, newTree)
    index = 0
    let p = patchs
    patchs = []
    return p
}

function walker(oldChild, newChild) {
    let currentPatch = {}
    if (!newChild) {
        currentPatch = {
            type: REMOVE,
            value: oldChild
        }
    } else if (isString(oldChild) && isString(newChild)) {
        if (oldChild !== newChild) {
            currentPatch = {
                type: TEXT,
                value: newChild
            }
        }
    } else if (oldChild.type === newChild.type) {
        let attr = diffAttr(oldChild, newChild)
        if (Object.keys(attr).length > 0) {
            currentPatch = {
                type: ATTR,
                value: attr
            }
            patchs[index] = currentPatch 
        }
        diffChildrens(oldChild.props.childrens, newChild.props.childrens, index)
        return
    } else {
        currentPatch = {
            type: REPLACE,
            value: newChild
        }
    }

    if (Object.keys(currentPatch).length > 0 && !patchs[index]) {
        console.log('put ', currentPatch)
        patchs[index] = currentPatch 
    }
}

function diffAttr(oldNode, newNode) {
    let op = oldNode.props
    let np = newNode.props
    let opk = Object.keys(op).sort()
    let npk = Object.keys(np).sort()
    let attr = {}
    npk.forEach((prop, idx) => {
        let v = np[prop]
        if (prop !== 'childrens' && v !== op[opk[idx]]) {
            Object.assign(attr, {
                [prop]: v
            })
        }
    })
    
    return attr
}

function diffChildrens(oldChildrens, newChildrens) {
    oldChildrens.forEach((child, idx) => {
        index++
        walker(child, newChildrens[idx])
    }) 
}

function isString(node) {
    return Object.prototype.toString.call(node) === '[object String]'
}

export default diff