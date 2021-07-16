import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import MenuButton from '../buttons/MenuButton'
import MenuTooltip from '../Tooltips/MenuTooltip'
import { menuData } from '../../data/menu-data'

export default function Header() {
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false)
  const menuBtnRef = useRef()
  const tooltipRef = useRef()

  const tooltipToggleHandler = event => {
    event.preventDefault()
    setTooltipIsOpen(prevState => !prevState)
  }

  const outsideClickHandler = event => {
    if (
      menuBtnRef.current &&
      !menuBtnRef.current.contains(event.target) &&
      !tooltipRef.current.contains(event.target)
    ) {
      setTooltipIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', outsideClickHandler)

    return () => document.removeEventListener('mousedown', outsideClickHandler)
  }, [])

  return (
    <Wrapper>
      <Link to="/">
        <img src={'/images/logos/logo.svg'} alt="logo" />
      </Link>
      <MenuWrapper count={menuData.length} ref={menuBtnRef}>
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
        <HamburgerWrapper>
          <MenuButton
            item={{ title: '', icon: '/images/icons/hamburger.svg', link: '/' }}
            onClick={event => tooltipToggleHandler(event)}
          />
        </HamburgerWrapper>
      </MenuWrapper>
      <div ref={tooltipRef}>
        <MenuTooltip isOpen={tooltipIsOpen} />
      </div>
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

  @media (max-width: 768px) {
    top: 30px;
  }

  @media (max-width: 450px) {
    top: 20px;
    padding: 0 20px;
  }
`

const MenuWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.count}, auto);
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: auto;
    > a {
      display: none;
    }
  }
`

const HamburgerWrapper = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`
