import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody } from '@llama/uikit'
import { TwitterTimelineEmbed } from 'react-twitter-embed/dist';
import useTheme from 'hooks/useTheme'

const StyledCard = styled(Card)`
  background-repeat: no-repeat;
  background-position: top right;
  margin-left: auto;
  margin-right: auto;
  max-width: 344px;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`
const CardTitle = styled(Heading).attrs({ size: 'lg' })`
  margin-bottom: 24px;
`

const twitterStyle = { height: '20em', 'overflow-y': 'scroll' };

const NewsCard = () => {
  const { isDark } = useTheme()

  return (
    <StyledCard>
      <CardBody>
        <CardTitle>Latest Shepherd Tweet</CardTitle>
        <div style={twitterStyle}>
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="llama_swap"
            theme={isDark ? "dark" : "light"}
            options={{ tweetLimit: '5' }}
            noBorders
            noHeader
            noFooter
            placeholder="Loading Last Shepherd Tweet"
            transparent
          />
        </div>
      </CardBody>
    </StyledCard>
  )
}

export default NewsCard
