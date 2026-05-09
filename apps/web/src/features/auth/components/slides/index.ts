import { type ComponentType } from 'react'
import SlideOne from './SlideOne'
import SlideTwo from './SlideTwo'
import SlideThree from './SlideThree'

export interface Slide {
  id: string
  title: string
  sub: string
  Component: ComponentType
}

export const SLIDES: Slide[] = [
  {
    id: 's1',
    title: 'Theo dõi mọi\nđơn ứng tuyển',
    sub: 'Di chuyển công việc qua Đã ứng tuyển → Phỏng vấn → Nhận offer\ntrong một pipeline trực quan.',
    Component: SlideOne,
  },
  {
    id: 's2',
    title: 'Không bỏ lỡ\nbuổi phỏng vấn nào',
    sub: 'Lên lịch phỏng vấn và nhận nhắc nhở để bạn\nluôn có mặt đúng giờ, chuẩn bị tốt nhất.',
    Component: SlideTwo,
  },
  {
    id: 's3',
    title: 'AI tối ưu\ntừng đơn ứng tuyển',
    sub: 'Tinh chỉnh CV và tạo cover letter phù hợp\nvới từng vị trí chỉ trong vài giây.',
    Component: SlideThree,
  },
]

export function Squiggle() {
  return (
    <svg className="auth-squiggle" viewBox="0 0 80 30" fill="none">
      <path d="M5 18 C 18 4, 30 4, 42 18" stroke="#A78BFA" strokeWidth="6" strokeLinecap="round" />
      <path d="M28 24 C 40 10, 52 10, 64 24" stroke="#A78BFA" strokeWidth="6" strokeLinecap="round" opacity="0.55" />
    </svg>
  )
}
