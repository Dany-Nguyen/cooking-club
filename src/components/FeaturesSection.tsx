'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FeatureCard } from './ui/FeatureCard';
import { 
  ChefHat, 
  Lightbulb, 
  Calendar, 
  Home, 
  BookOpen, 
  ShoppingCart 
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      title: 'Recipe Sharing',
      description: 'Share your favorite recipes with the community and discover new dishes from around the world.',
      icon: ChefHat,
      image: '/api/placeholder/400/300?text=Recipe+Sharing',
      color: 'bg-orange-500',
    },
    {
      title: 'Cooking Tips',
      description: 'Learn from experienced cooks and share your own tips and tricks for better cooking.',
      icon: Lightbulb,
      image: '/api/placeholder/400/300?text=Cooking+Tips',
      color: 'bg-yellow-500',
    },
    {
      title: 'Community Events',
      description: 'Join virtual cooking sessions, challenges, and local meetups with fellow food enthusiasts.',
      icon: Calendar,
      image: '/api/placeholder/400/300?text=Community+Events',
      color: 'bg-green-500',
    },
    {
      title: 'Kitchen Sharing',
      description: 'Find and share kitchen spaces for cooking together and building connections.',
      icon: Home,
      image: '/api/placeholder/400/300?text=Kitchen+Sharing',
      color: 'bg-blue-500',
    },
    {
      title: 'Recipe Collections',
      description: 'Organize your favorite recipes into collections and bookmark dishes to try later.',
      icon: BookOpen,
      image: '/api/placeholder/400/300?text=Recipe+Collections',
      color: 'bg-purple-500',
    },
    {
      title: 'Ingredient Tracking',
      description: 'Keep track of ingredients, get shopping lists, and never miss a key component.',
      icon: ShoppingCart,
      image: '/api/placeholder/400/300?text=Ingredient+Tracking',
      color: 'bg-red-500',
    },
  ];

  return (
    <section className="py-20 sm:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to cook together
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our platform brings together all the tools and features you need to share, learn, and cook with others.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  image={feature.image}
                  color={feature.color}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
