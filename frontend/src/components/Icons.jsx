import {
  BsBehance, BsDribbble, BsFacebook, BsGithub, BsInstagram, BsLinkedin,
  BsTiktok, BsTwitterX, BsWhatsapp, BsYoutube,
} from 'react-icons/bs'

export const Arrow = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)
export const Plus = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
)
export const Menu = ({ close }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
    {close ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 9h16M4 15h16" />}
  </svg>
)
export const Sparkle = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
    <path fill="currentColor" d="M20 0c1.6 10.2 9.8 18.4 20 20-10.2 1.6-18.4 9.8-20 20C18.4 29.8 10.2 21.6 0 20 10.2 18.4 18.4 10.2 20 0z" />
  </svg>
)
export const Cursor = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M3 2l17 8.2-7.2 2.3L10 20z" />
  </svg>
)

const MAP = {
  behance: BsBehance, x: BsTwitterX, instagram: BsInstagram, tiktok: BsTiktok, linkedin: BsLinkedin,
  github: BsGithub, dribbble: BsDribbble, youtube: BsYoutube, facebook: BsFacebook, whatsapp: BsWhatsapp,
}
export function SocialIcon({ platform, ...props }) {
  const I = MAP[platform]
  return I ? <I {...props} /> : <Arrow {...props} />
}
export const PLATFORM_NAMES = {
  behance: 'Behance', x: 'X', instagram: 'Instagram', tiktok: 'TikTok', linkedin: 'LinkedIn',
  github: 'GitHub', dribbble: 'Dribbble', youtube: 'YouTube', facebook: 'Facebook', other: 'Link',
}
export { BsWhatsapp }
