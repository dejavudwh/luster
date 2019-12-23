import $ from 'jquery'
import createLusterUnit from './unit'
import createElement from './element'
import Componenet from './components/component'
import jsx from '../luster/jsxparser/parse'
import diff from './domdiif/diff'
import putPatch from '../luster/domdiif/patch'

let componentUnits = []
let eventDom = []

let Luster = {
    render,
    nextRootIndex: 0,
    createElement,
    Componenet,
    componentUnits,
    renderTimes: 0,
    virtualDom: {},
    eventDom,
}

function render(element, container) {
    let unitInstance = createLusterUnit(element)
    let markUp = unitInstance.getMarkUp(Luster.nextRootIndex)

    if (Luster.renderTimes > 0) {
        let patchs = diff(Luster.virtualDom, jsx(markUp))
        let dom = document.getElementById('root')
        console.log('patch', patchs)
        putPatch(dom.firstChild, patchs)
    } else {
        $(container).html(markUp)
    }

    Luster.virtualDom = jsx(markUp)

    // debug
    let m = jsx(`
                <div name="st">
                    <span tga="asd">
                        <span>vbvbvb</span>
                        <button onClick="{handleClick2}"><span>button</span></button>
                    </span>
                    <div>
                        <button class="cccccc"><sapn>ds</sapn></button>
                    </div>
                    <span><span>tttttttt</span></span>
                    <Pape></Pape>
                </div>
            `)

    let patchs = diff(Luster.virtualDom, m)
    let dom = document.getElementById('root')
    putPatch(dom.firstChild, patchs)
}

export default Luster