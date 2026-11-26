import { CATEGORIES } from '../lib/seed'

const catOptions = CATEGORIES.map((c) => ({ value: c.key, label: c.label }))
const catLabel = (k) => CATEGORIES.find((c) => c.key === k)?.label || k

export const RESOURCES = {
  projects: {
    title: 'Projects', singular: 'project', path: '/admin/projects/',
    blurb: 'Your portfolio work. New projects appear first on the site.',
    fields: [
      { name: 'name', label: 'Project name', type: 'text', required: true, placeholder: 'TrustMed - Mobile App For Health Care', help: 'Use “Name - short description”. The part before the dash is the card title.' },
      { name: 'category', label: 'Category', type: 'select', options: catOptions, default: 'web-dev' },
      { name: 'image', label: 'Cover image', type: 'image', urlName: 'image_url', srcName: 'image_src', help: 'Best size: 1600 × 1000 px (16:10). Other shapes are cropped to fit, keeping the top of the image.' },
      { name: 'color', label: 'Card colour', type: 'color', default: '#E7E4FF' },
      { name: 'tags', label: 'Tags', type: 'tags', help: 'Comma separated, up to 8.', default: '' },
      { name: 'description', label: 'Description', type: 'textarea', help: 'Optional. Shown on the project page.' },
      { name: 'figma_link', label: 'Figma prototype link', type: 'url' },
      { name: 'behance_link', label: 'Behance link', type: 'url' },
      { name: 'website_link', label: 'Live website link', type: 'url' },
      { name: 'featured', label: 'Show on the home page', type: 'bool', default: true },
      { name: 'published', label: 'Visible on the site', type: 'bool', default: true },
    ],
    row: (x) => ({ title: x.name, sub: `${catLabel(x.category)}${x.tags?.length ? ' · ' + x.tags.join(', ') : ''}`, thumb: x.image_src, hidden: !x.published }),
  },
  reviews: {
    title: 'Reviews', singular: 'review', path: '/admin/reviews/',
    blurb: 'Client testimonials. The reviews section stays hidden on the site until you publish one.',
    fields: [
      { name: 'name', label: 'Client name', type: 'text', required: true },
      { name: 'position', label: 'Role', type: 'text', placeholder: 'CEO' },
      { name: 'company', label: 'Company', type: 'text' },
      { name: 'rating', label: 'Rating', type: 'select', default: 5, options: [5, 4, 3, 2, 1].map((n) => ({ value: n, label: `${n} star${n > 1 ? 's' : ''}` })) },
      { name: 'review', label: 'Review', type: 'textarea', required: true },
      { name: 'avatar', label: 'Photo', type: 'image', urlName: 'avatar_url', srcName: 'avatar_src' },
      { name: 'published', label: 'Visible on the site', type: 'bool', default: true },
    ],
    row: (x) => ({ title: `${x.name} · ${'★'.repeat(x.rating)}`, sub: x.review, thumb: x.avatar_src, hidden: !x.published }),
  },
  experience: {
    title: 'Experience', singular: 'experience', path: '/admin/experience/',
    blurb: 'Shown on the About page, in the order below.',
    fields: [
      { name: 'title', label: 'Role', type: 'text', required: true, placeholder: 'Web Front End Development ~ React' },
      { name: 'period', label: 'Year or period', type: 'text', required: true, placeholder: '2025 or 2024 - 2026' },
      { name: 'description', label: 'Description', type: 'textarea' },
    ],
    row: (x) => ({ title: x.title, sub: `${x.period}${x.description ? ' · ' + x.description : ''}` }),
  },
  education: {
    title: 'Education', singular: 'education entry', path: '/admin/education/',
    blurb: 'Shown on the About page, in the order below.',
    fields: [
      { name: 'title', label: 'Course or school', type: 'text', required: true, placeholder: 'App Front End Development ~ Flutter' },
      { name: 'period', label: 'Year or period', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
    ],
    row: (x) => ({ title: x.title, sub: `${x.period}${x.description ? ' · ' + x.description : ''}` }),
  },
  faqs: {
    title: 'FAQ', singular: 'question', path: '/admin/faqs/',
    blurb: 'Questions visitors ask most. Shown on the home and Process pages.',
    fields: [
      { name: 'question', label: 'Question', type: 'text', required: true },
      { name: 'answer', label: 'Answer', type: 'textarea', required: true },
    ],
    row: (x) => ({ title: x.question, sub: x.answer }),
  },
  socials: {
    title: 'Social links', singular: 'social link', path: '/admin/socials/',
    blurb: 'Shown in the footer, About and Contact pages.',
    fields: [
      { name: 'platform', label: 'Platform', type: 'select', default: 'instagram', options: [
        ['behance', 'Behance'], ['x', 'X (Twitter)'], ['instagram', 'Instagram'], ['tiktok', 'TikTok'], ['linkedin', 'LinkedIn'],
        ['github', 'GitHub'], ['dribbble', 'Dribbble'], ['youtube', 'YouTube'], ['facebook', 'Facebook'], ['other', 'Other'],
      ].map(([value, label]) => ({ value, label })) },
      { name: 'url', label: 'Link', type: 'url', required: true, placeholder: 'instagram.com/callme_despina', help: 'https:// is added for you if you leave it out.' },
      { name: 'label', label: 'Handle (optional)', type: 'text', placeholder: 'callme_despina' },
    ],
    row: (x) => ({ title: x.platform.charAt(0).toUpperCase() + x.platform.slice(1), sub: x.url }),
  },
  tools: {
    title: 'Tools', singular: 'tool', path: '/admin/tools/',
    blurb: 'The “Tools behind my process” section on the home page.',
    fields: [
      { name: 'name', label: 'Tool name', type: 'text', required: true, placeholder: 'Figma' },
      { name: 'level', label: 'How well you know it (0 to 100)', type: 'number', min: 0, max: 100, default: 80, required: true },
      { name: 'icon', label: 'Icon', type: 'image', urlName: 'icon_url', srcName: 'icon_src' },
    ],
    row: (x) => ({ title: x.name, sub: `${x.level}%`, thumb: x.icon_src }),
  },
}
