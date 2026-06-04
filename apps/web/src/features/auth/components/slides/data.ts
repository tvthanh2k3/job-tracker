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
