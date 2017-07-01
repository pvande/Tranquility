import Flow from 'Flow'
import {Row, Column} from 'Flow'


const Welcome = () =>
  <div style={{ vertialAlign: 'middle' }}>
    <h1>Welcome</h1>
    <h2>to Tranquility</h2>
  </div>

const Panel = ({ title, children }) =>
  <section>
    <h1>{title}</h1>
    <p>{children}</p>
  </section>

const Dashboard = (props) =>
  <Column>
    <Welcome />
    <Row>
      <Panel title="Getting Started"></Panel>
      <Panel title="Examples"></Panel>
      <Panel title="Documentation"></Panel>
    </Row>
  </Column>

window.Dashboard = Dashboard
