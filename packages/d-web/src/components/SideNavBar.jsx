/* eslint-disable prefer-destructuring */
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ListGroupItem, Row } from 'react-bootstrap'
import {
  faCircleRadiation,
  faClapperboard,
  faCloudArrowUp,
  faFileInvoice,
  // faGears,
  faMoneyBill,
  faPhotoFilm,
  // faReply,
  faSackDollar,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SideNavBar() {
  const location = useLocation()
  const navigate = useNavigate()

  const contents = {
    user: [
      {
        title: 'PLANNING',
        subTitle: '前期計畫 + 製作',
        icon: faCircleRadiation,
        link: '/user/content',
        sub: [
          {
            title: 'Project\nManagement',
            subTitle: '',
            icon: faUsers,
            link: '/user/content/pm',
            type: 'user',
          },
          {
            title: 'Recommendation',
            subTitle: '',
            icon: faFileInvoice,
            link: '/user/content/recommend',
            type: 'user',
          },
          {
            title: 'Trends',
            subTitle: '',
            icon: faSackDollar,
            link: '/user/content/trends',
            type: 'user',
          },
        ],
      },
      {
        title: 'PRODUCTION',
        subTitle: 'AI影片剪輯',
        icon: faCircleRadiation,
        link: '/user/making',
        sub: [
          {
            title: 'EDITING',
            subTitle: '',
            icon: faClapperboard,
            link: '/user/making/edit',
            type: 'user',
          },
          {
            title: 'METADATA',
            subTitle: '',
            icon: faPhotoFilm,
            link: '/user/making/data',
            type: 'user',
          },
          {
            title: 'DISTRIBUTION',
            subTitle: '',
            icon: faCloudArrowUp,
            link: '/user/making/publish',
            type: 'user',
          },
        ],
      },
      {
        title: 'ANALYTICS',
        subTitle: '報表 + 成效報告',
        icon: faCircleRadiation,
        link: '/user/analyze',
        sub: [
          {
            title: 'Analytics',
            subTitle: '',
            icon: faUsers,
            link: '/user/analyze/analytics',
            type: 'user',
          },
          {
            title: 'Benchmaking',
            subTitle: '',
            icon: faFileInvoice,
            link: '/user/analyze/benchmaking',
            type: 'user',
          },
          {
            title: 'Alternative Monetization',
            subTitle: '',
            icon: faSackDollar,
            link: '/user/analyze/am',
            type: 'user',
          },
        ],
      },
      {
        title: 'PREMIUM CONTENT',
        subTitle: '頻道會員 + 課程',
        icon: faCircleRadiation,
        link: '/user/paycontent',
        sub: [
          {
            title: 'Memberships',
            subTitle: '',
            icon: faUsers,
            link: '/user/paycontent/memberships',
            type: 'user',
          },
          {
            title: 'Courses',
            subTitle: '',
            icon: faFileInvoice,
            link: '/user/paycontent/courses',
            type: 'user',
          },
        ],
      },
      {
        title: 'MERCHANDISE',
        subTitle: '電商整合',
        icon: faCircleRadiation,
        link: '/user/product',
        sub: [
          {
            title: 'Sales overview',
            subTitle: '',
            link: '/user/product/insight',
            type: 'admin',
          },
          {
            title: 'Order inquiry',
            subTitle: '',
            link: '/user/product/ec',
            type: 'admin',
          },
        ],
      },
      {
        title: 'BRAND OPPORTUNITIES',
        subTitle: '業配商案',
        icon: faCircleRadiation,
        link: '/user/brand',
        sub: [
          {
            title: 'Campaigns',
            subTitle: '',
            icon: faUsers,
            link: '/user/brand/campaigns',
            type: 'user',
          },
          {
            title: 'Opportunities',
            subTitle: '',
            icon: faFileInvoice,
            link: '/user/brand/opportunities',
            type: 'user',
          },
        ],
      },
      {
        title: 'Account',
        subTitle: 'account',
        icon: faMoneyBill,
        link: '/account',
        sub: [
          {
            title: 'Profile',
            subTitle: '',
            link: '/account/profile',
            type: 'user',
          },
          {
            title: 'Access Authorization',
            subTitle: '',
            link: '/account/access',
            type: 'user',
          },
        ],
      },
    ],
    admin: [
      {
        title: 'CRM/Customer analysis',
        subTitle: 'ORCA',
        icon: faCircleRadiation,
        link: '/',
      },
      {
        title: 'Ad placement',
        subTitle: 'LUCA + DCP Partner Sales',
        icon: faCircleRadiation,
        link: '/',
      },
      {
        title: 'Influencer collaboration',
        subTitle: 'Creator connect',
        icon: faCircleRadiation,
        link: '/admin/cooperate',
      },
      {
        title: 'Merchandise',
        subTitle: 'E-commerce',
        icon: faCircleRadiation,
        link: '/admin/product',
        sub: [
          {
            title: 'Sales overview',
            subTitle: '',
            link: '/admin/product/insight',
            type: 'admin',
          },
          {
            title: 'Order inquiry',
            subTitle: '',
            link: '/admin/product/ec',
            type: 'admin',
          },
        ],
      },
    ],
  }

  return (
    <div
      className="w-100 h-100 d-flex flex-column py-3 bg-light text-secondary borderRight"
      // ${
      //   location.pathname.includes('admin')
      //     ? 'bg-admin-marmot'
      //     : 'bg-user-marmot'
      // }`}
    >
      <Row
        className="d-flex flex-column ps-2 flex-nowrap"
        style={{
          height: '85%',
        }}
      >
        {(location.pathname.includes('admin')
          ? contents.admin
          : contents.user
        ).map(({ title, link, sub }) => (
          <>
            <ListGroupItem
              action
              disabled={location.pathname.includes(link)}
              key={link}
              active={location.pathname.includes(link)}
              onClick={() => navigate(link)}
              className="mx-auto my-2 text-start text-nowrap btn-sidebar py-2 px-1"
              style={{
                width: '88%',
              }}
              size="sm"
            >
              {title}
            </ListGroupItem>
            {location.pathname.includes(link) &&
              sub &&
              sub.map((s) => (
                <ListGroupItem
                  action
                  disabled={location.pathname === s.link}
                  key={s.link}
                  active={location.pathname === s.link}
                  onClick={() => navigate(s.link)}
                  className="mx-auto text-start text-nowrap btn-sidebar px-1"
                  style={{
                    height: '8%',
                    width: '88%',
                  }}
                  size="sm"
                >
                  ▻ {s.title}
                </ListGroupItem>
              ))}
          </>
        ))}
      </Row>
      {/* <Row
        className="d-flex flex-column py-3"
        style={{
          height: '35%',
        }}
      >
        <Button
          onClick={() => navigate('/')}
          className="w-75 mx-auto mt-auto mb-2 text-start fw-bold"
          variant="outline-marmot"
          size="sm"
        >
          <FontAwesomeIcon icon={faReply} />
          &ensp; Back
        </Button>
        <Button
          onClick={() => navigate('/account')}
          className="w-75 mx-auto mt-auto mb-2 text-start fw-bold"
          variant="outline-marmot"
          size="sm"
        >
          <FontAwesomeIcon icon={faMoneyBill} />
          &ensp; Account
        </Button>
        <Button
          onClick={() => navigate('/setting')}
          className="w-75 mx-auto mt-auto mb-2 text-start fw-bold"
          variant="outline-marmot"
          size="sm"
        >
          <FontAwesomeIcon icon={faGears} />
          &ensp; Setting
        </Button>
      </Row> */}
    </div>
  )
}

export default SideNavBar
