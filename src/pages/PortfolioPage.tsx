import { portfolio } from '../data/portfolio';
import { usePortfolioNavigation } from '../hooks/usePortfolioNavigation';
import { ProfilePanel } from '../components/organisms/ProfilePanel';
import { RoomScene } from '../components/organisms/RoomScene';
import { PortfolioTemplate } from '../components/templates/PortfolioTemplate';

export function PortfolioPage() {
  const navigation = usePortfolioNavigation();

  return (
    <PortfolioTemplate
      night={navigation.night}
      room={
        <RoomScene
          night={navigation.night}
          onOpen={navigation.openFromRoom}
          onToggleLight={navigation.toggleLight}
        />
      }
      profile={
        <ProfilePanel
          portfolio={portfolio}
          activeSection={navigation.activeSection}
          onSelect={navigation.openSection}
        />
      }
    />
  );
}
