import React from 'react'
import {citiesData_1,citiesData_2,citiesData_3,citiesData_4} from '../../Citiesdata'
import './Footer.css'

function Footer2() {
  return (
    <main className="footer_2">
      <div className="div1">
          <h3 className='footer_2_h3'>WE DELIVER TO</h3>
        <div className="div1_list">
          {
            citiesData_1.map((i, index) => (
              <div className="div1_list_p1" key={index}>{ i}</div>
            ))
          }
              
          </div>
            </div>
            <div className="div2_footer_2">
        <div className="div2_list">
          {
            citiesData_2.map((i, index) => (
              <div className="div2_list_p2" key={index}>{i}</div>
            ))
          }  
          </div>
            </div>
            <div className="div3_footer_2">
        <div className="div3_list">
          {
            citiesData_3.map((i,index) => (
              <div className="div3_list_p3" key={index}>{ i}</div>
            ))
          }  
          </div>
            </div>
            <div className="div4_footer_2">
        <div className="div4_list">
          {
            citiesData_4.map((i,index) => (
              <div className="div3_list_p3" key={index}>{ i}</div>
            ))
          }
          </div>
            </div>
            {/* <hr className='hr_line'/> */}
            </main>
  )
}

export default Footer2