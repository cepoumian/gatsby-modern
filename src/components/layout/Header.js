import React, { useState } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import MenuButton from '../buttons/MenuButton'
import MenuTooltip from '../Tooltips/MenuTooltip'
import { menuData } from '../../data/menu-data'

export default function Header() {
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false)

  const tooltipToggleHandler = event => {
    event.preventDefault()
    setTooltipIsOpen(prevState => !prevState)
  }

  return (
    <Wrapper>
      <Link to="/">
        <img src={'/images/logos/logo.svg'} alt="logo" />
      </Link>
      <MenuWrapper count={menuData.length}>
        {menuData.map((item, index) =>
          item.link === '/account' ? (
            <MenuButton
              item={item}
              key={index}
              onClick={event => tooltipToggleHandler(event)}
            >
              Account
            </MenuButton>
          ) : (
            <MenuButton item={item} key={index} />
          )
        )}
      </MenuWrapper>
      <MenuTooltip isOpen={tooltipIsOpen} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: 60px;
  display: grid;
  grid-template-columns: 44px auto;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  width: 100%;
`

const MenuWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.count}, auto);
  gap: 30px;
`
