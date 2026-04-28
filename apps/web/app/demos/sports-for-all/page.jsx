import { DemoPageShell } from '../../../components/demo-page-shell.jsx';
import { SportsForAllClient } from './sports-for-all-client.jsx';

export default async function SportsForAllPage() {
  return (
    <div className="page-shell-wide py-[clamp(2rem,6vw,3rem)]">
      <DemoPageShell slug="sports-for-all">
        <SportsForAllClient />
      </DemoPageShell>
    </div>
  );
}
