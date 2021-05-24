import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem, Text, Toggle } from '@llama/uikit'
import useI18n from 'hooks/useI18n'

const FarmTabButtons = ({ stackedOnly, setStackedOnly, removed, toggleRemoved }) => {
  const { url, isExact } = useRouteMatch()
  const TranslateString = useI18n()

  return (
    <Wrapper>
      <ToggleWrapper>
        <Toggle checked={stackedOnly} onChange={() => setStackedOnly(!stackedOnly)} />
        <Text> {TranslateString(1116, 'Staked only')}</Text>
      </ToggleWrapper>
      <ButtonMenu activeIndex={removed ? 1 : 0} size="sm" variant="subtle" onClick={toggleRemoved}>
        <ButtonMenuItem >
          {TranslateString(698, 'Active')}
        </ButtonMenuItem>
        <ButtonMenuItem >
          {TranslateString(700, 'Inactive')}
        </ButtonMenuItem>
      </ButtonMenu>
    </Wrapper>
  )
}

export default FarmTabButtons

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
    margin: 0;
    max-width: none;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 32px;

  ${Text} {
    margin-left: 8px;
  }
`
