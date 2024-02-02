import React from 'react'
import LeagueDashboard from '../../Components/LeagueDashboard/LeagueDashboard'
import { Outlet } from 'react-router'

type Props = {}

const LeaguePage = (props: Props) => {
  return (
      <LeagueDashboard />
  )
}

export default LeaguePage