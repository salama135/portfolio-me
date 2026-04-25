import { DemoPageShell } from '../../../components/demo-page-shell.jsx';
import { HelloDemoClient } from './hello-client.jsx';

export default async function HelloDemoPage() {
  return (
    <div className="page-shell-wide py-[clamp(2rem,6vw,3rem)]">
      <DemoPageShell slug="hello">
        <HelloDemoClient />
      </DemoPageShell>
    </div>
  );
}
