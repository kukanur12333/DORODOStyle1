import React from 'react';
import { HeroBanner } from '../components/organisms/HeroBanner';
import { CategoryPromoBanners } from '../components/organisms/CategoryPromoBanners';
import { TrendingProducts } from '../components/organisms/TrendingProducts';
import { OfferTimer } from '../components/organisms/OfferTimer';
import { GameZone } from '../components/organisms/GameZone';
import { CommunityShowcase } from '../components/organisms/CommunityShowcase';
import { NewsletterSignup } from '../components/organisms/NewsletterSignup';

export const HomePage: React.FC = () => {
  return (
    <>
      <HeroBanner />
      <CategoryPromoBanners />
      <TrendingProducts />
      <OfferTimer />
      <div id="game-zone">
        <GameZone />
      </div>
      <CommunityShowcase />
      <NewsletterSignup />
    </>
  );
};
