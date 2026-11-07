import OpportunityDetailScreen from '@/screens/OpportunityDetailScreen';
export { opportunityDetailMetadata as generateMetadata, opportunityStaticParams as generateStaticParams } from '@/config/pageMetadata';
export default function Page(props) { return <OpportunityDetailScreen {...props} />; }
