import React, { useEffect, useLayoutEffect, useState } from 'react'
import mainstyle from '../styles/Main.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { toggleIndex, RootState } from '@/store/store';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function Menu() {
  const dispatch = useDispatch();
  const isIndexOn = useSelector((state:RootState) => state.index.Index);
  const index = useSelector((state:RootState)=>state.scrollPosition.Scroll);
  const [on, setOn] = useState(false);
  const [list, setList] = useState<NodeListOf<Element>>();
  
  useLayoutEffect(()=>{
    const li = document.querySelectorAll(".menu_pages>li");
    setList(li);
  },[])

  useEffect(()=>{
    if (index > 1 && index < 9){
      setOn(true);
      listOn(list,index);
    } else setOn(false);
  },[index])

  const listOn = (list:NodeListOf<Element>, index:number) =>{
    for(let el of list){
      el.classList.remove("on")
    }
    list[index-2].classList.add('on');
  }

  return (
    <div className={`${mainstyle.menu} z-20 ${on && mainstyle.menu_on}`}>
      { isIndexOn ? (
        <div className={`${mainstyle.menu_box}`} onClick={()=>dispatch(toggleIndex(false))}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2L30 30M2 30L30 2" stroke="var(--gray2)" strokeWidth="4"/>
          </svg>
        </div>
      ):(
        <>        
        <div className={`${mainstyle.menu_box}`} onClick={()=>dispatch(toggleIndex(true))}>
          <svg className={mainstyle.menu_icon} viewBox="0 0 42 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 28V23.3333H42V28H0ZM0 16.3333V11.6667H42V16.3333H0ZM0 4.66667V0H42V4.66667H0Z" fill="var(--gray2)"/>
          </svg>
        </div>
        <ul className={`menu_pages flex justify-center items-center flex-col
        [&>li]:w-[8px] [&>li]:h-[23px] [&>li]:mb-2 [&>li.on]:bg-[var(--gray2)] [&>li]:bg-[#BFBFBF]
        [&>li]:transition-all ease-linear duration-300`}>
        <li className='on'></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        </ul>
        </>
      )}
  </div>
  )
}

export default Menu