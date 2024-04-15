/* eslint-disable prefer-destructuring */
import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, DropdownButton, ListGroupItem } from 'react-bootstrap'
import { faCircleRadiation } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from './ContextProvider'
import Avatar from '../daiComponents/Avatar'
import MenuCard from '../daiComponents/MeunCard'

function SideNavBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { auth, setAuth } = useContext(AuthContext)

  const contents = {
    user: [
      {
        title: 'Planning',
        subTitle: '前期計畫 + 製作',
        icon: faCircleRadiation,
        link: '/user/content',
      },
      {
        title: 'Production',
        subTitle: 'AI影片剪輯',
        icon: faCircleRadiation,
        link: '/user/making',
      },
      {
        title: 'Analytics',
        subTitle: '報表 + 成效報告',
        icon: faCircleRadiation,
        link: '/user/analyze',
      },
      {
        title: 'Premium content',
        subTitle: '頻道會員 + 課程',
        icon: faCircleRadiation,
        link: '/user/paycontent',
      },
      {
        title: 'Merchandise',
        subTitle: '電商整合',
        icon: faCircleRadiation,
        link: '/user/product',
      },
      {
        title: 'Brand Opportunities',
        subTitle: '業配商案',
        icon: faCircleRadiation,
        link: '/user/brand',
      },
    ],
    admin: [
      {
        title: 'CRM / Customer analysis',
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
      },
    ],
  }

  return (
    <div
      className={`w-100 h-100 d-flex flex-column py-3 ps-2 ${
        location.pathname.includes('admin')
          ? 'bg-admin-marmot'
          : 'bg-user-marmot'
      }`}
      style={{
        backgroundColor: '#eeeeee',
      }}
    >
      <div className="h-15 mb-4">
        <DropdownButton
          id="dropdown-button-drop-end"
          drop="end"
          className="h-100 w-100"
          title={
            <div className="text-dai fw-bolder pt-3">
              <div
                style={{
                  height: '50px',
                }}
              >
                <Avatar />
              </div>
              {auth.name}
            </div>
          }
        >
          <MenuCard />
        </DropdownButton>
      </div>
      {(location.pathname.includes('admin')
        ? contents.admin
        : contents.user
      ).map(({ title, link }) => (
        <ListGroupItem
          action
          key={link}
          active={location.pathname === link}
          onClick={() => navigate(link)}
          className="mx-auto my-2 text-start text-nowrap"
          style={{
            width: '88%',
          }}
          size="sm"
        >
          {title}
        </ListGroupItem>
      ))}
      {/* <hr className="hrClass-dashed my-3" /> */}
      <Button
        onClick={() => {
          document.cookie = `token=; Domain=${window.location.hostname}; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
          setAuth({
            authed: false,
          })
          window.location.replace('/')
        }}
        className="w-75 mx-auto mt-auto mb-2"
        variant="outline-dai"
        size="sm"
      >
        Logout
      </Button>
    </div>
  )
}

export default SideNavBar
