let index = 0
let patchs = []

const TEXT = 'TEXT'
const REPLACE = 'REPLACE'
const REMOVE = 'REMOVE'
const ATTR = 'ATTR'

function diff(oldTree, newTree) {
    console.log(oldTree, newTree)
    walker(oldTree, newTree)

    return patchs
}

function walker(oldChild, newChild) {
    console.log('no handle ', oldChild, newChild)
    let currentPatch = {}
    if (!newChild) {
        currentPatch[REMOVE] = oldChild
    } else if (isString(oldChild) && isString(newChild)) {
        if (oldChild !== newChild) {
            currentPatch[TEXT] = newChild
        }
    } else if (oldChild.type === newChild.type) {
        let attr = diffAttr(oldChild, newChild)
        // console.log('=== ', oldChild, newChild)
        if (Object.keys(attr).length > 0) {
            currentPatch[ATTR] = attr
        }
        diffChildrens(oldChild.props.childrens, newChild.props.childrens)
    } else {
        currentPatch[REMOVE] = oldChild
    }

    if (Object.keys(currentPatch).length > 0) {
        patchs[index] = currentPatch 
    }
}

function diffAttr(oldNode, newNode) {
    let op = oldNode.props
    let np = newNode.props
    let opk = Object.keys(op).sort()
    let npk = Object.keys(np).sort()
    console.log('opl npl ', opk, npk)
    let attr = {}
    npk.forEach((prop, idx) => {
        let v = np[prop]
        if (prop !== 'childrens' && v !== op[opk[idx]]) {
            Object.assign(attr, {
                [prop]: v
            })
        }
        console.log('attr ', prop, np[prop], v)
    })
    
    return attr
}

function diffChildrens(oldChildrens, newChildrens) {
    // console.log(oldChildrens)
    oldChildrens.forEach((child, idx) => {
        index++
        walker(child, newChildrens[idx])
    }) 
}

function isString(node) {
    return Object.prototype.toString.call(node) === '[object String]'
}

function sortObjKey(unordered) {
    const ordered = {};
    Object.keys(unordered).sort().forEach(function(key) {
        ordered[key] = unordered[key];
    });

    return ordered
}

export default diff