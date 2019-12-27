import Component from '../components/component'
import Luster from '../luster'
import { lusterComponent } from '../components/LusterRegister'
import createLusterUnit from '../unit'

class Router extends Component {
    assemblyRouting(childrens) {
        for (let i = 0; i < childrens.length; i++) {
            let c = childrens[i].props
            let path = c['path']
            if (window.location.pathname === path) {
                let cn = c['component']
                let name = cn.slice(1, cn.length - 1)
                let component
                if (lusterComponent.hasOwnProperty(name)) {
                    component = lusterComponent[name]
                }
                
                return component
            }
        }
    }

    render() {
        let childrens = this.props.props.childrens
        let component = this.assemblyRouting(childrens)
        let unitInstance = createLusterUnit(component)
        let markUp = unitInstance.getMarkUp(Luster.nextRootIndex)
    
        return markUp
    }
}

export default Router