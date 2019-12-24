import Luster from '../luster'
import $ from 'jquery'

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
    // console.log('set attr ', dom, attrs)
    let event = {}
    for (let key in attrs) {
        if (/on[A-Z]/.test(key)) {
            event = {
                key: key.slice(2).toLocaleLowerCase(),
                val: attrs[key].slice(1, attrs[key].length - 1),
            }
        } else {
            dom.setAttribute(key, attrs[key])
        }
    }

    if (Object.keys(event).length > 0) {
        let id = dom.getAttribute('data-lusterid')
        let element = `[data-lusterid="${id}"]`
        let oe = Luster.eventDom
        let component
        $(element).unbind()
        for (let i = 0; i < oe.length; i++) {
            // console.log('=== oe ', oe[i], id)
            if (oe[i].element === element) {
                component = oe[i].component
                console.log('patch === ', oe, component, event.val)
                oe[i].eventType = event.key
                oe[i].func = () => { 
                    component[event.val]() 
                }
            }
        }
        
    }
}

export default putPatch