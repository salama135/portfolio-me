import { DemoPageShell } from '../../../components/demo-page-shell.jsx';
import { ThreeShowcaseClient } from './three-client.jsx';

export default async function ThreeShowcasePage() {
  return (
    <div className="page-shell-wide py-[clamp(2rem,6vw,3rem)]">
      <DemoPageShell slug="three-showcase">
        <ThreeShowcaseClient />
      </DemoPageShell>
    </div>
  );
}
