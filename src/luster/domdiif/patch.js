let index = 0
function putPatch(dom, patchs) {
    walker(dom, patchs)
    index = 0
}

function walker(dom, patchs) {
    let patch = patchs[index]
    index++
    if (patch) {
        let parent = dom.parentNode
        switch (patch.type) {
            case 'TEXT':
                dom.nodeValue = patch.value
                break
            case 'REMOVE':
                parent.removeChild(dom)
                return
            case 'REPLACE':
                let node = jsx2str(patch.value)
                parent.replaceChild(str2dom(node), dom)
                return
            case 'ATTR':
                setAttr(dom, patch.value)
                break
            default:
                break
        }
    }
    
    walkChildrens(dom.childNodes, patchs)
}

function walkChildrens(childNodes, patchs) {
    childNodes.forEach((child) => {
        walker(child, patchs)
    })
}

function jsx2str(jsx) {
    // 这里应该要复用之前的代码，但是还没有想到很好的办法
    let {type, props} = jsx
    let tagStart = `<${type} `
    let tagEnd = `</${type}>`
    let contentStr = ''
    for (let key in props) {
        if (key === 'childrens') {
            contentStr = props[key].map((child) => {
                if (typeof child === 'string') {
                    return child
                } else {
                    return jsx2str(child)
                }
            })
        } else {
            tagStart += `${key}="${props[key]}"`
        }
    }

    return tagStart + '>' + contentStr + tagEnd
}

function str2dom(str) {
　　 let dom = document.createElement("div");
　　 dom.innerHTML = str;
　　 return dom.firstChild;
}

function setAttr(dom, attrs) {
    console.log('set attr ', dom, attrs)
    for (let key in attrs) {
        dom.setAttribute(key, attrs[key])
    }
}

export default putPatch