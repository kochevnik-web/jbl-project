import React, { useState } from 'react';
import { Context } from '../../context';
import '../../fonts/Gordita-Regular.ttf';
import './App.css';
import CanvasJbl from '../CanvasJbl';

function App() {

  const getGLobalWidth = () => {
    if (window.innerWidth / window.innerHeight > 1.62650602) {
      let w = (window.innerHeight - window.innerWidth / 56.25 * 2) * 1.62650602;
      return w < 1350 ? w : 1350;
    }
    return window.innerWidth >= 1350 ? 1350 : window.innerWidth - window.innerWidth / 56.25 * 2;
  }

  const [globalWidth, setGlobalWidth] = useState(getGLobalWidth());
  const [countAllAns, setCountAllAns] = useState(0);
  const [room1Count, setRoom1Count] = useState(0);
  const [room2Count, setRoom2Count] = useState(0);
  const [room3Count, setRoom3Count] = useState(0);
  const [columnOn, setColumnOn] = useState(false);
  const [romm1Finish, setRomm1Finish] = useState(false)
  const [showMainMsg, setShowMainMsg] = useState(false)
  const [showRoomMainMsg, setShowRoomMainMsg] = useState(false)
  const [messages, setMessages] = useState(false)
  const [roomHints, setRoomHints] = useState([
    {name: 'msg-1', id: 'vaza'},
    {name: 'msg-2', id: 'ball-1'},
    {name: 'msg-3', id: 'column'},
    {name: 'msg-4', id: 'btn-on-off'},
    {name: 'msg-5', id: 'btn-light'},
    {name: 'msg-6', id: 'mop'},
  ])
  const [hidePuddle, setHidePuddle] = useState(false)
  const [room2BgColumn, setRoom2BgColumn] = useState(false)

  const chengeRoom1Count = (name) => {
    let c = room1Count + 1
    let a = countAllAns + 1
    setRoom1Count(c);
    setCountAllAns(a)
    setMessages(false)
    setMessages(name)
    setRoomHints(roomHints.filter(el => el.name !== name))
  }

  const chengeRoom2Count = (name) => {
    let c = room2Count + 1
    let a = countAllAns + 1
    setRoom2Count(c);
    setCountAllAns(a)
    setMessages(false)
    setMessages(name)
    setRoomHints(roomHints.filter(el => el.name !== name))
  }

  const onHidePuddle = (name) => {
    chengeRoom2Count(name)
    setHidePuddle(true)
  }

  const chengeRoom2BgColumn = (name) => {
    chengeRoom2Count(name)
    setRoom2BgColumn(true)
  }

  window.addEventListener("resize", () => setGlobalWidth(getGLobalWidth()));

  const appStyle = {
    fontSize: globalWidth / 56.25
  }

  const [level, setLevel] = useState(['start', 'level-1', 'level-2', 'level-3']);

  const changeLevel = () => {
    setLevel(level.filter((ex, i) => i > 0));
    if (level[1] === 'level-1') {
      setShowMainMsg(true)
    }
  }

  const [countBall, setCountBall] = useState(1)
  const counterBalls = () => {
    const c = countBall + 1;
    setCountBall(c)
    if (countBall === 5) {
      chengeRoom1Count('msg-2')
    }
  }

  const [displayBtnTVOff, setbtnTVOff] = useState(true)

  const btnTVOff = () => {
    chengeRoom1Count('msg-4')
    setbtnTVOff(false)
  }

  const btnLightOff = () => {
    if (room1Count === 4) {
      chengeRoom1Count('msg-5')
      setRomm1Finish(true)
    }
  }

  const hendlerColumnOnn = () => {
    chengeRoom1Count('msg-3')
    setColumnOn(true)
  }

  const onHideMainMsg = (e) => {
    e.preventDefault()
    setShowMainMsg(false)
    setShowRoomMainMsg('show')
  }

  const onBtnShowRules = () => {
    setShowMainMsg(true)
    setShowRoomMainMsg(false)
  }

  const chengeStateMessage = (name) => {
    setShowRoomMainMsg(name)
    setMessages(name)
  }

  const ononBtnShowRules = () => {
    if(roomHints.length > 0) {
      document.getElementById(roomHints[0].id).classList.add('dnd')
    }
  }

  return (
    <Context.Provider value={{
      changeLevel, counterBalls, chengeRoom1Count, btnTVOff, btnLightOff, hendlerColumnOnn, onHideMainMsg, onBtnShowRules, chengeStateMessage, ononBtnShowRules, chengeRoom2BgColumn, onHidePuddle
    }}>
      <div className="App" style={appStyle}>
        <CanvasJbl
          globalWidth={globalWidth}
          level={level[0]}
          roomcount1={room1Count}
          roomcount2={room2Count}
          roomcount3={room3Count}
          displayBtnTVOff={displayBtnTVOff}
          columnOn={columnOn}
          room1Finish={romm1Finish}
          showMainMsg={showMainMsg}
          showRoomMainMsg={showRoomMainMsg}
          messages={messages}
          hidePuddle={hidePuddle}
          room2BgColumn={room2BgColumn}
        />
      </div>
    </Context.Provider>
  );
}

export default App;
