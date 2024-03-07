import React from 'react'
import { CRow, CCol, CDropdown, CDropdownMenu, CDropdownItem, CDropdownToggle, CWidgetStatsA } from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'

const WidgetsDropdown = () => {
  const navigate = useNavigate() 

 
  return (
  
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          style={{ cursor: "pointer" }}
          onClick={() => { navigate("/examination") }}
          value={
            <>
              Upcoming Exam{' '}
            </>
          }
          title="Click Here"

          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          style={{ cursor: "pointer" }}
          onClick={() => { navigate("/recent-examination") }}
          value={
            <>
              Recent Exam{' '}

            </>
          }
          title="Click Here"
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          onClick={() => { navigate("/recent-examination") }}
          style={{ cursor: "pointer" }}
          value={
            <>
              Offline Exam{' '}
             
            </>
          }
          title="Click Here"
         
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: '70px' }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="danger"
          style={{ cursor: "pointer" }}
          value={
            <>
              Exam Sessions{' '}
              
            </>
          }
          title="Click Here"
         
          chart={
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: '70px' }}
             
            />
          }
        />
      </CCol>
    </CRow>
   
  )
}

export default WidgetsDropdown
