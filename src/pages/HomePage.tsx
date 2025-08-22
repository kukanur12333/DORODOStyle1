import React from 'react';
import { HeroSection } from '../components/organisms/HeroSection';
import { FeaturedCategories } from '../components/organisms/FeaturedCategories';
import { TrendingProducts } from '../components/organisms/TrendingProducts';
import { AIShowcase } from '../components/organisms/AIShowcase';
import { OfferTimer } from '../components/organisms/OfferTimer';
import { GameZone } from '../components/organisms/GameZone';
import { CommunityShowcase } from '../components/organisms/CommunityShowcase';
import { NewsletterSignup } from '../components/organisms/NewsletterSignup';

export const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <TrendingProducts />
      <OfferTimer />
      <AIShowcase />
      <div id="game-zone">
        <GameZone />
      </div>
      <CommunityShowcase />
      <NewsletterSignup />
    </>
  );
};
