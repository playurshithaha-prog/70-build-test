// Change the brand and tagline here. Update the search and sharing text in index.html too.
export const site = {
  brand: '70COACH',
  brandName: '70COACH',
  tagline: 'BUILD STRENGTH. OWN YOUR PROGRESS.',
  // Use international digits only, including the country code. Leave blank until verified.
  whatsapp: '+212 605-324400',
  instagram: '',
  email: '',
  // Image files live in public/images. Replace the matching alt description with each photo.
  hero: { src: '/images/hero.webp', mobile: '/images/hero-mobile.webp', alt: 'Athlete holding heavy dumbbells in a strength gym' },
  coach: {
    name: '[Coach name]',
    bio: 'A coach biography will be added here. It will cover the coach’s training background, why they coach, and the people they work with.',
    philosophy: 'Good coaching starts with understanding your life. The plan should adapt as your goals, schedule, and training change.',
    qualifications: [],
    specialties: ['Bodybuilding', 'Strength training', 'Powerlifting', 'General fitness & conditioning'],
    photo: null,
  },
  // Add approved client stories here with name, summary, and optional photo { src, alt }.
  results: [],
  // Fill in price only when you are ready to publish it.
  services: [
    { id: 'training', name: 'Personalized Training', description: 'A training program built around your goals, equipment, and experience. Know what to do every time you train.', photo: { src: '/images/training.webp', alt: 'Athlete preparing wrist wraps on a gym bench' }, price: '' },
    { id: 'strength', name: 'Strength & Performance', description: 'Build strength with structured progressions, purposeful lifting, and clear targets from week to week.', photo: { src: '/images/strength.webp', alt: 'Athlete training with a barbell in a strength gym' }, price: '' },
    { id: 'transformation', name: 'Body Transformation', description: 'Train sustainably for muscle gain, fat loss, or body recomposition with a plan you can keep following.', photo: { src: '/images/transformation.webp', alt: 'Athlete standing with dumbbells in a gym' }, price: '' },
  ],
  faq: [
    ['Is online coaching suitable for beginners?', 'Yes. Your program starts at your current experience level and gives you clear exercises, sets, and progressions to follow.'],
    ['Do I need gym access?', 'No. Your program can be built for a gym or for home using the equipment you already have.'],
    ['How personalized is the program?', 'Exercise selection, weekly volume, and progression are planned around your goals, equipment, experience, and available time.'],
    ['How will progress be tracked?', 'We use training logs and regular check-ins. Depending on your goal, we may also track measurements, performance, or how sessions feel.'],
    ['What happens after applying?', 'You review and send your application in WhatsApp. The coach can then discuss your goals and whether the service suits you.'],
    ['Can I train with a busy schedule?', 'Yes. We discuss your weekly availability and build a schedule around the time you can consistently commit.'],
  ],
}

const whatsapp = site.whatsapp.trim()
export const whatsappUrl = /^[1-9]\d{6,14}$/.test(whatsapp) ? `https://wa.me/${whatsapp}` : ''
