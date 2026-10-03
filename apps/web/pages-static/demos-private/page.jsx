import { loadPrivateDemos } from '../../../lib/private-demos/registry.js';
import { PrivateList } from './private-list.jsx';

export default async function PrivateDemosPage() {
  return <PrivateList demos={await loadPrivateDemos()} />;
}
