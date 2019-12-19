import Luster from './luster/luster'

// const element = '<button>hello luster</button>'

const element = Luster.createElement('div', {name: 'luster'}, 
                                    'hello', 
                                    Luster.createElement('button', {}, '123'))                                 
Luster.render(element, document.getElementById('root'))