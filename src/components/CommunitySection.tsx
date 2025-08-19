'use client';

import React from 'react';
import { Card, CardContent } from './ui/Card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar';
import { Badge } from './ui/Badge';
import { motion } from 'framer-motion';

const CommunitySection = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Home Cook',
      avatar: '/api/placeholder/40/40',
      content: 'I&apos;ve discovered so many amazing recipes here! The community is incredibly supportive and always ready to help with cooking questions.',
      rating: 5,
    },
    {
      name: 'Marcus Johnson',
      role: 'Professional Chef',
      avatar: '/api/placeholder/40/40',
      content: 'As a chef, I love sharing my knowledge with passionate home cooks. This platform makes it easy to connect and inspire others.',
      rating: 5,
    },
    {
      name: 'Elena Rodriguez',
      role: 'Food Blogger',
      avatar: '/api/placeholder/40/40',
      content: 'The recipe sharing feature is fantastic! I\'ve built a following here and connected with fellow food enthusiasts from around the world.',
      rating: 5,
    },
  ];

  const stats = [
    { label: 'Active Cooks', value: '10,000+' },
    { label: 'Recipes Shared', value: '25,000+' },
    { label: 'Countries', value: '50+' },
    { label: 'Cooking Events', value: '500+' },
  ];

  return (
    <section className="py-20 sm:py-32 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Join our thriving community
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Connect with passionate cooks from around the world and be part of something delicious.
          </p>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mx-auto mt-20 max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6">
                      &quot;{testimonial.content}&quot;
                    </p>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-foreground">{testimonial.name}</div>
                        <Badge variant="secondary" className="text-xs">
                          {testimonial.role}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
