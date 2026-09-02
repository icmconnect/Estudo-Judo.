import { useParams } from 'react-router-dom';
import { TheoryLibrary } from '../components/TheoryLibrary';

export function TheoryLibraryPage() {
  const { trackSlug } = useParams<{ trackSlug?: string }>();
  return <TheoryLibrary initialTrackSlug={trackSlug} />;
}
