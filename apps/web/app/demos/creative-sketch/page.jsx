import { DemoPageShell } from '../../../components/demo-page-shell.jsx';
import { CreativeSketchClient } from './creative-client.jsx';

export default async function CreativeSketchPage() {
  return (
    <div className="page-shell-wide py-[clamp(2rem,6vw,3rem)]">
      <DemoPageShell slug="creative-sketch">
        <CreativeSketchClient />
      </DemoPageShell>
    </div>
  );
}
