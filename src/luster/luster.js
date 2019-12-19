import $ from 'jquery'

let Luster = {
    render
}

function render(element, container) {
    $(container).html(element)
}

export default Luster