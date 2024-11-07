const { useState } = require("react")
import styles from '../css/Carrossel.css';
import Carousel from 'react-bootstrap/Carousel'

const Carousel = ({ children }) => {
    const [active, setActive] = useState(2)
    const count = React.Children.count(children)

    return (
        React.createElement("div", {className: "carousel"},
            active > 0 && React.createElement("button", {className: "nav left", onClick: () =>  setActive(i => i - 1) },
            React.createElement(TiChevronLeftOutline, null)),

            React.Children.map(children, (child, i) => 
            React.createElement("div", { className: "card-container", style: {
                '--active': i === active ? 1 : 0,
                '--offset': (active - i) /3,
                '--direction': Math.sign(active - i),
                '--abs-offset': Math.abs(active - i) /3,
                'pointer-events': active === i ? 'auto' : 'none',
                'opacity': Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
                'display': Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block'
            }   },
        
        child)),
        active < count - 1 && React.createElement("button", {
            className: "nav right", onClick: () => setActive(i => i + 1) },
        React.createElement(TiChevronRightOutline, null))
        )
    )
}

export default Carousel