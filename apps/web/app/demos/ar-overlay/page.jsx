import { DemoPageShell } from '../../../components/demo-page-shell.jsx';
import { ArOverlayClient } from './ar-client.jsx';

export default async function ArOverlayPage() {
  return (
    <div className="page-shell-wide py-[clamp(2rem,6vw,3rem)]">
      <DemoPageShell slug="ar-overlay">
        <ArOverlayClient />
      </DemoPageShell>
    </div>
  );
}
