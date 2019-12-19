import Luster from './luster/luster'
import Componenet from './luster/component'
// const element = '<button>hello luster</button>'

class Fuck extends Componenet {
    render() {
        return Luster.createElement('div', {name: 'luster', onClick: function(){ alert('1') }}, 
               'hello', 
               Luster.createElement('button', {}, '123'))                                 
    }
}

const element = Luster.createElement(Fuck, {name: 'luster', onClick: function(){ alert('1') }}, 
                                    'hello', 
                                    Luster.createElement('button', {}, '123'))                                 
Luster.render(element, document.getElementById('root'))