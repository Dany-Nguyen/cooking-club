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
  Heart 
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      title: 'Recipe Sharing',
      description: 'Share your favorite recipes with the community and discover new dishes from around the world.',
      icon: ChefHat,
      image: "https://images.unsplash.com/photo-1656711776904-993edf967bbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWNpcGUlMjBib29rJTIwc2hhcmluZ3xlbnwxfHx8fDE3NTU1NTQzMTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
      color: 'bg-orange-500',
    },
    {
      title: 'Cooking Instructions',
      description: 'Make the best of your cooking experience with instructions powered by AI.',
      icon: Lightbulb,
      image: "https://plus.unsplash.com/premium_photo-1663088985731-164aaf815976?auto=format&crop=entropy&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fGZyZWUlMjBpbWFnZXMlMjBjb29raW5nfGZyfDB8fHx8MTc1NTgwODEyMnww&ixlib=rb-4.1.0q=80&w=1080",
      color: 'bg-yellow-500',
    },
    {
      title: 'Community Events',
      description: 'Host or join local meetups with fellow food enthusiasts.',
      icon: Calendar,
      image: "https://plus.unsplash.com/premium_photo-1661717466350-b5a0756a5c86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8ZnJlZSUyMGltYWdlcyUyMGNvb2tpbmd8ZnJ8MHx8fHwxNzU1ODA4MTIyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: 'bg-green-500',
    },
    {
      title: 'Kitchen Sharing',
      description: "Rent your kitchen to fellow food lovers, or find the perfect kitchen space for your culinary adventures.",
      icon: Home,
      image: "https://images.unsplash.com/photo-1717323454555-f053c31ff4b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwcmVudGFsfGVufDF8fHx8MTc1NTU1NDMyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
      color: 'bg-blue-500',
    },
    {
      title: 'Recipe Collections',
      description: 'Organize your favorite recipes into collections and bookmark dishes to try later.',
      icon: BookOpen,
      image: "https://images.unsplash.com/photo-1676046797691-6e96294af80f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWNpcGUlMjBib29rJTIwc2hhcmluZ3xlbnwxfHx8fDE3NTU1NTQzMTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_medium=referral",
      color: 'bg-purple-500',
    },
    {
      title: 'All Ideas Welcome',
      description: 'Italian-Vietnamese fusion? We\'re all-in! From traditional family recipes to wild culinary experiments, creativity has no limits here.',
      icon: Heart,
      image: "https://images.unsplash.com/photo-1661607699778-919620c40b1f?crop=entropy&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&q=80&w=1080",
      color: 'bg-red-500',
    },
  ];

  return (
    <section className="py-20 sm:py-8">
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
