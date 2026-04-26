import { DemoPageShell } from '../../../components/demo-page-shell.jsx';
import { BrandFieldClient } from './brand-client.jsx';

export default async function BrandFieldPage() {
  return (
    <div className="page-shell-wide py-[clamp(2rem,6vw,3rem)]">
      <DemoPageShell slug="brand-field">
        <BrandFieldClient />
      </DemoPageShell>
    </div>
  );
}
