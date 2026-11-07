import HeroSentenceSearch from '@/components/home/HeroSentenceSearch';
import HomeAboutSection from '@/components/home/HomeAboutSection';
import LatestOpportunitiesList from '@/components/home/LatestOpportunitiesList';
import AssistantDemoSection from '@/components/home/AssistantDemoSection';
import ClosingMagneticCta from '@/components/home/ClosingMagneticCta';

export default function HomeScreen() {
  return (
    <>
      <HeroSentenceSearch />
      <HomeAboutSection />
      <LatestOpportunitiesList />
      <AssistantDemoSection />
      <ClosingMagneticCta />
    </>
  );
}
