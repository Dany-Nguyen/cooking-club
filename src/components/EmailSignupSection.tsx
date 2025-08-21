'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { createEmailSignup } from '@/lib/emailSignup';

const EmailSignupSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError('');

    try {
      console.log('Attempting to create email signup for:', email);
      const result = await createEmailSignup({ email, source: 'landing_page' });
      console.log('Email signup successful:', result);
      setIsSubmitted(true);
      setEmail('');
    } catch (err) {
      console.error('Email signup failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to register email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="email-signup" className="py-20 sm:py-16 bg-primary/5">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to start <span className="text-primary">cooking</span> together?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Join thousands of food lovers sharing recipes, tips, and culinary adventures. 
              Get started today and discover your next favorite dish.
            </p>
          </motion.div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="rounded-lg bg-green-50 p-4 text-green-800">
                <p className="font-medium">Thank you for joining our community!</p>
                <p className="text-sm">We&apos;ll keep you updated with the latest recipes and cooking tips.</p>
              </div>
            </motion.div>
          ) : (
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 sm:py-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 border border-yellow-800"
                  required
                />
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="whitespace-nowrap"
                >
                  {isLoading ? 'Joining...' : 'Join Now'}
                </Button>
              </form>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-center"
                >
                  <div className="rounded-lg bg-red-50 p-3 text-red-800 text-sm">
                    {error}
                  </div>
                </motion.div>
              )}
            </div>
          )}

          <p className="mt-4 text-sm text-muted-foreground">
            By signing up, you agree to our{' '}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default EmailSignupSection;
