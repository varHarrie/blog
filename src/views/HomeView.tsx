import * as React from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router'

export interface Props extends RouteComponentProps {
  expanded: boolean
}

export default function HomeView(props: Props) {
  return <Wrapper>home</Wrapper>
}

const Wrapper = styled.div``
