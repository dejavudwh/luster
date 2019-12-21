import $ from 'jquery'
import createLusterUnit from './unit'
import createElement from './element'
import Componenet from './components/component'
import jsx from '../luster/jsxparser/parse'
import diff from './domdiif/diff'

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
                        zxc
                        <button data-lusterid="1" onClick="{handleClick}">asd</button>
                    </span>
                </div>
            `)
    let patchs = diff(Luster.virtualDom, m)
    console.log('patchs ', patchs)

    $(container).html(markUp)
}

export default Luster