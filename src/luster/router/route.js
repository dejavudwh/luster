import Component from '../components/component'
import { lusterComponent } from '../components/LusterRegister'
import Luster from '../luster'
import createLusterUnit from '../unit'

class Route extends Component {
    render() {
        // 这里需要复用，后面重构的时候一起改
        console.log('route ', this.props)
        let c = this.props.props
        let path = c['path']
        if (window.location.pathname === path) {
            let cn = c['component']
            let name = cn.slice(1, cn.length - 1)
            let component
            if (lusterComponent.hasOwnProperty(name)) {
                component = lusterComponent[name]
            }
            
            let unitInstance = createLusterUnit(component)
            let markUp = unitInstance.getMarkUp(Luster.nextRootIndex)

            return markUp
        }
    }
}

export default Route