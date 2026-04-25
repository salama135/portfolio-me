import { DemoPageShell } from '../../../components/demo-page-shell.jsx';
import { VrRoomClient } from './vr-client.jsx';

export default async function VrRoomPage() {
  return (
    <div className="page-shell-wide py-[clamp(2rem,6vw,3rem)]">
      <DemoPageShell slug="vr-room">
        <VrRoomClient />
      </DemoPageShell>
    </div>
  );
}
