import React from 'react'
import mainstyle from '../styles/Main.module.scss'
import indexstyle from '../styles/Index.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { toggleIndex, RootState, updateIndex } from '@/store/store'
import { Noto_Sans_KR } from 'next/font/google'

function Index() {
  const dispatch = useDispatch();
  const isIndexToggle = useSelector((state: RootState) => state.index.Index);
  const index = useSelector((state:RootState)=>state.scrollPosition.Scroll);
  const height = useSelector((state:RootState)=>state.sectionHeights.Height);
  
  function onClickScroll(number:number){
    console.log(index, number);
    dispatch(updateIndex(number+1));
    dispatch(toggleIndex(false));
  }

  return (
    <div className={`z-[11] w-full h-screen px-20 pb-20 text-[var(--gray2)] ${indexstyle.index} ${isIndexToggle ? indexstyle['index-on'] : ''} `} style={{top:index*height+'px'}}>
      <h2 className={`${mainstyle.title1} mb-10`}>INDEX</h2>
      <div>
        <ul className={`index`}>
          <li className={indexstyle.li} onClick={()=>onClickScroll(1)}>
            <p>01</p>
            <div>            
              <div className={`w-[496px] h-[383px]`}>
                <div className={`w-full h-full
              bg-[url('../images/m_16.svg')] bg-contain bg-no-repeat`}>
                </div>
              </div>
            </div>
            <h3>FESCARO</h3>
          </li>
          <li className={indexstyle.li} onClick={()=>onClickScroll(2)}>
            <p>02</p>
            <div>            
              <div className={`w-[496px] h-[383px]`}>
                <div className={`w-full h-full
              bg-[url('../images/m_16.svg')] bg-contain bg-no-repeat`}>
                </div>
              </div>
            </div>
            <h3>삼성전기</h3>
          </li>
          <li className={indexstyle.li} onClick={()=>onClickScroll(3)}>
            <p>03</p>
              <div>            
                <div className={`w-[496px] h-[383px]`}>
                  <div className={`w-full h-full
                bg-[url('../images/m_16.svg')] bg-contain bg-no-repeat`}>
                  </div>
                </div>
              </div>
            <h3>CJ ONE</h3>
          </li>
          <li className={indexstyle.li} onClick={()=>onClickScroll(4)}>
            <p>04</p>
            <div>            
                <div className={`w-[496px] h-[383px]`}>
                  <div className={`w-full h-full
                bg-[url('../images/m_16.svg')] bg-contain bg-no-repeat`}>
                  </div>
                </div>
              </div>
            <h3>TALK APP</h3>
          </li>
          <li className={indexstyle.li} onClick={()=>onClickScroll(5)}>
            <p>05</p>
            <div>            
                <div className={`w-[496px] h-[383px]`}>
                  <div className={`w-full h-full
                bg-[url('../images/m_16.svg')] bg-contain bg-no-repeat`}>
                  </div>
                </div>
              </div>
            <h3>NETFLIX APP</h3>
          </li>
          <li className={indexstyle.li} onClick={()=>onClickScroll(6)}>
            <p>06</p>
            <div>            
                <div className={`w-[496px] h-[383px]`}>
                  <div className={`w-full h-full
                bg-[url('../images/m_16.svg')] bg-contain bg-no-repeat`}>
                  </div>
                </div>
              </div>
            <h3>PURE CSS</h3>
            <div></div>
          </li>
          {/* <li className={indexstyle.li} onClick={()=>onClickScroll(7)}>
            <p>07</p>
            <div>            
                <div className={`w-[496px] h-[383px]`}>
                  <div className={`w-full h-full
                bg-[url('../images/m_16.svg')] bg-contain bg-no-repeat`}>
                  </div>
                </div>
              </div>
            <h3>앱 기획</h3>
          </li> */}
        </ul>
      </div>
    </div>
  )
}

export default Index