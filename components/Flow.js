import classnames from 'classnames'
require('./Flow.css')

const Flow = ({ direction, children }) => {
  return (
    <div className="Flow" direction={direction}>
      {
        React.Children.map(children, ({ type, props }) => {
          const childProps = Object.assign({}, props)
          delete childProps.flex

          const isFlow = (type === Flow || type === Row || type === Column)
          const classNames = classnames("FlowChild", isFlow ? "FlowNested" : "FlowPanel")

          return (
            <div className={classNames} style={{ flex: props.flex }}>
              { React.createElement(type, childProps) }
            </div>
          )
        })
      }
    </div>
  )
}

const Row = (props) => (<Flow {...props} direction="row" />)
const Column = (props) => (<Flow {...props} direction="column" />)

export default Flow
export { Row, Column }
