import classnames from 'classnames'
import styles from './Flow.css'

const without = (obj, ...keys) => {
  const newObj = Object.assign({}, obj)
  keys.forEach(key => delete newObj[key])
  return newObj
}

const NullChild = <div className={styles.Child} />

const NestedFlow = ({ type, props }) =>
  <div className={classnames(styles.Child, styles.Nested)} style={{ flex: props.flex }}>
    { React.createElement(type, without(props, 'flex')) }
  </div>

const ChildPanel = ({ type, props }) =>
  <section className={classnames(styles.Child, styles.Panel)} style={{ flex: props.flex }}>
    { React.createElement(type, without(props, 'flex')) }
  </section>

const Flow = ({ direction, children }) => {
  return (
    <div className={styles.Flow} direction={direction}>
      {
        React.Children.map(children, child => {
          if (!child) {
            return NullChild
          }

          if (child.type === Flow || child.type === Row || child.type === Column) {
            return NestedFlow(child)
          } else {
            return ChildPanel(child)
          }
        })
      }
    </div>
  )
}

const Row = (props) => (<Flow {...props} direction="row" />)
const Column = (props) => (<Flow {...props} direction="column" />)

export default Flow
export { Row, Column }
