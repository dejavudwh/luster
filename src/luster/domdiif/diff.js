let index = -1
let patchs = []

const TEXT = 'TEXT'
const REPLACE = 'REPLACE'
const REMOVE = 'REMOVE'
const ATTR = 'ATTR'

function diff(oldTree, newTree) {
    console.log(oldTree, newTree)
    walker(oldTree, newTree, 0)

    return patchs
}

function walker(oldChild, newChild, index) {
    console.log('no handle ', index, oldChild, newChild)
    let currentPatch = {}
    if (!newChild) {
        console.log('remove -------')
        currentPatch[REMOVE] = oldChild
    } else if (isString(oldChild) && isString(newChild)) {
        if (oldChild !== newChild) {
            currentPatch[TEXT] = newChild
        }
    } else if (oldChild.type === newChild.type) {
        let attr = diffAttr(oldChild, newChild)
        if (Object.keys(attr).length > 0) {
            console.log('=== ')
            currentPatch[ATTR] = attr
            patchs[index] = currentPatch 
        }
        diffChildrens(oldChild.props.childrens, newChild.props.childrens, index)
    } else {
        currentPatch[REPLACE] = newChild
    }

    if (Object.keys(currentPatch).length > 0) {
        console.log(currentPatch, index)
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
    console.log('attr ', index)
    
    return attr
}

function diffChildrens(oldChildrens, newChildrens, index) {
    // console.log(oldChildrens)
    oldChildrens.forEach((child, idx) => {
        walker(child, newChildrens[idx], ++index)
    }) 
}

function isString(node) {
    return Object.prototype.toString.call(node) === '[object String]'
}

export default diff