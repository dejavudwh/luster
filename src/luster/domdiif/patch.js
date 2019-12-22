import diff from './diff'

let index = 0
function putPatch(dom, patchs) {
    walker(dom, patchs)
}

function walker(dom, patchs) {
    let patch = patchs[index]
    index++
    if (patch) {
        console.log('patch ', patch, dom)
        switch (patch.type) {
            case 'TEXT':

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

export default putPatch