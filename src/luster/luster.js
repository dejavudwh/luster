import $ from 'jquery'
import createLusterUnit from './unit'
import createElement from './element'

let Luster = {
    render,
    nextRootIndex: 0,
    createElement
}

function render(element, container) {
    let unitInstance = createLusterUnit(element)
    let markUp = unitInstance.getMarkUp(Luster.nextRootIndex)
    $(container).html(markUp)
}

export default Luster