import $ from 'jquery'
import createLusterUnit from './unit'
import createElement from './element'
import Componenet from './components/component'
import jsx from '../luster/jsxparser/parse'
import diff from './domdiif/diff'
import putPatch from '../luster/domdiif/patch'

let componentUnits = []

let Luster = {
    render,
    nextRootIndex: 0,
    createElement,
    Componenet,
    componentUnits,
    renderTimes: 0,
    virtualDom: {},
}

function render(element, container) {
    let unitInstance = createLusterUnit(element)
    let markUp = unitInstance.getMarkUp(Luster.nextRootIndex)

    if (Luster.renderTimes > 0) {
        diff(Luster.virtualDom, jsx(markUp))
    }
    Luster.virtualDom = jsx(markUp)
    console.log(Luster.virtualDom)
    // debug
    let m = jsx(`
                <div name="st" data-lusterid="1" test="zxc">
                    <span tga="asd" data-lusterid="1">
                        <button data-lusterid="1" onClick="{handleClick}"><span>vbsfsgdf</span></button>
                    </span>
                    <div class="asd">
                        <span>lll</span>
                    </div>
                    <span>nv</span>
                </div>
            `)
    let patchs = diff(Luster.virtualDom, m)
    console.log('patchs ', patchs)

    $(container).html(markUp)
    let dom = document.getElementById('root')
    putPatch(dom.firstChild, patchs)
}

export default Luster