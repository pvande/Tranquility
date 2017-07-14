import styles from './Flow.css'

const without = (obj, ...keys) => {
  const newObj = Object.assign({}, obj)
  keys.forEach(key => delete newObj[key])
  return newObj
}

const NullChild = <div className={styles.Child} />

const NESTED_CLASSES = `${styles.Child} ${styles.Nested}`
const NestedFlow = ({ type, props }) =>
  <div className={NESTED_CLASSES} style={{ flex: props.flex }}>
    {React.createElement(type, without(props, 'flex'))}
  </div>

const CHILD_CLASSES = `${styles.Child} ${styles.Panel}`
const ChildPanel = ({ type, props }) =>
  <section className={CHILD_CLASSES} style={{ flex: props.flex }}>
    {React.createElement(type, without(props, 'flex'))}
  </section>

const Flow = ({ direction, children }) => {
  return (
    <div className={styles.Flow} direction={direction}>
      {React.Children.map(children, child => {
        if (!child) {
          return NullChild
        }

        const type = child.type
        if (type === Flow || type === Row || type === Column) {
          return NestedFlow(child)
        } else {
          return ChildPanel(child)
        }
      })}
    </div>
  )
}

const Row = props => <Flow {...props} direction="row" />
const Column = props => <Flow {...props} direction="column" />

export default Flow
export { Row, Column }
