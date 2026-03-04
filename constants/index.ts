import { Cloud, Download, Shield, Users, Video, Zap } from "lucide-react";

  export const features = [
    {
      icon: Video,
      title: 'HD Recording',
      description: 'Record crystal-clear videos in up to 4K resolution with advanced compression technology.'
    },
    {
      icon: Zap,
      title: 'Instant Processing',
      description: 'Lightning-fast video processing and rendering with our optimized cloud infrastructure.'
    },
    {
      icon: Shield,
      title: 'Secure Storage',
      description: 'Enterprise-grade encryption keeps your videos safe and secure in the cloud.'
    },
    {
      icon: Cloud,
      title: 'Cloud Sync',
      description: 'Access your recordings from anywhere with automatic cloud synchronization.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share and collaborate on videos with your team in real-time.'
    },
    {
      icon: Download,
      title: 'Easy Export',
      description: 'Export your videos in multiple formats with just one click.'
    }
  ];

  export const stats = [
    { value: '10M+', label: 'Active Users' },
    { value: '500M+', label: 'Videos Recorded' },
    { value: '99.9%', label: 'Uptime' },
    { value: '150+', label: 'Countries' }
  ];

  export const pricingPlans = [
    {
      name: 'Starter',
      price: '$0',
      period: 'forever',
      description: 'Perfect for individuals getting started',
      features: [
        'Up to 10 videos per month',
        '720p HD recording',
        '5GB cloud storage',
        'Basic editing tools',
        'Email support'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '$29',
      period: 'per month',
      description: 'Ideal for content creators and professionals',
      features: [
        'Unlimited videos',
        '4K Ultra HD recording',
        '100GB cloud storage',
        'Advanced editing suite',
        'Priority support',
        'Custom branding',
        'Analytics dashboard'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: 'per month',
      description: 'For teams and organizations',
      features: [
        'Everything in Professional',
        'Unlimited cloud storage',
        'Team collaboration tools',
        'API access',
        'Dedicated account manager',
        'Custom integrations',
        'SLA guarantee'
      ],
      popular: false
    }
  ];

  export const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Content Creator',
      avatar: 'SJ',
      content: 'This app has completely transformed how I create content. The quality is outstanding and the interface is so intuitive!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Marketing Director',
      avatar: 'MC',
      content: 'Our team productivity has increased by 300% since we started using this platform. Highly recommended!',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Educator',
      avatar: 'ER',
      content: 'Perfect for creating educational content. My students love the quality of the videos I can now produce.',
      rating: 5
    }
  ];

  export const faqs = [
    {
      question: 'How does the video recording work?',
      answer: 'Our app uses advanced technology to capture your screen, webcam, or both simultaneously. Simply click record, and we handle the rest with automatic optimization and cloud storage.'
    },
    {
      question: 'What video quality can I expect?',
      answer: 'Depending on your plan, you can record in 720p HD, 1080p Full HD, or 4K Ultra HD. All recordings are optimized for the best quality-to-file-size ratio.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely! We use enterprise-grade encryption for all data transmission and storage. Your videos are private by default and only accessible to you and those you choose to share with.'
    },
    {
      question: 'Can I use it on multiple devices?',
      answer: 'Yes! Our app works seamlessly across desktop, mobile, and tablet devices. Your recordings sync automatically across all your devices.'
    },
    {
      question: 'What happens if I exceed my storage limit?',
      answer: 'You\'ll receive a notification when approaching your limit. You can either upgrade your plan or delete old recordings to free up space.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee on all paid plans. If you\'re not satisfied, contact our support team for a full refund.'
    }
  ];