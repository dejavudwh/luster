let index = 0
function putPatch(dom, patchs) {
    walker(dom, patchs)
}

function walker(dom, patchs) {
    let patch = patchs[index]
    index++
    if (patch) {
        console.log('patch ', patch, dom.innerText)
        let parent = dom.parentNode
        switch (patch.type) {
            case 'TEXT':
                dom.innerText = patch.value
                break
            case 'REMOVE':
                parent.removeChild(dom)
                break
            case 'REPLACE':
                let node = jsx2dom(patch.value)
                console.log('replace ', str2dom(node), dom instanceof Node)
                parent.replaceChild(str2dom(node), dom)
                break
            case 'ATTR':
                break
            default:
                break
        }
    }
    
    walkChildrens(dom.childNodes, patchs)

}

function walkChildrens(childNodes, patchs) {
    console.log('childNodes ', childNodes)
    childNodes.forEach((child) => {
        walker(child, patchs)
    })
}

function jsx2dom(jsx) {
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
                    return jsx2dom(child)
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
    console.log('str2dom ', dom)
　　 return dom.firstChild;
}

export default putPatch