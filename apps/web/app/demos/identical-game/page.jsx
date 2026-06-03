import { DemoPageShell } from '../../../components/demo-page-shell.jsx';
import { IdenticalGameClient } from './game-client.jsx';

export default async function IdenticalGamePage() {
  return (
    <div className="page-shell-wide py-[clamp(2rem,6vw,3rem)]">
      <DemoPageShell slug="identical-game">
        <IdenticalGameClient />
      </DemoPageShell>
    </div>
  );
}
