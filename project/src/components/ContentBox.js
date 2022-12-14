import '../styles/ContentBox.scss'
import {useEffect, useState} from "react";
import ContentPage from "./ContentPage";
import mapLogo from "../images/maplogo.png"
import {useCookies} from "react-cookie";
import Map from "./Map";
import Check from './Check';
import sup1 from '../images/sup1.png'
import sup2 from '../images/sup2.png'
import sup3 from '../images/sup3.png'

export default function ContentBox() {
    const [recItemFocus, setRecItemFocus] = useState(false)
    const [contentFocus, setContentFocus] = useState(false)
    const [mapView,setMapView] = useState(false)
    const [cookies, setCookie] = useCookies()
    const [used,setUsed] = useState(false)
    const [connectInfo,setConnectInfo] = useState()
    const [chkView,setChkView] = useState(false)
    const [imgList,setImgList] = useState([null,null,null])
    const [sup,setSup] = useState()

    useEffect(()=>{
        connectInfo ? document.querySelector('.btnPay').classList.add('active') : document.querySelector('.btnPay').classList.remove('active')
    },[connectInfo])

    useEffect(()=>{
        used ? setImgList([sup1,sup2,sup3]) : setImgList([null,null,null])
        const items = document.querySelectorAll('.recommendItem')
        !used ? 
            items.forEach((item)=>{
                item.classList.add('hide')
            })
            :
            items.forEach((item)=>{
                item.classList.remove('hide')
            })
            
        
    },[used])

    return (<div className="contentBox">
        {
            contentFocus && <ContentPage setContentFocus={setContentFocus}></ContentPage>
        }
        {
            mapView && <Map sup={sup} setConnectInfo={setConnectInfo} setMapView={setMapView}></Map>
        }
        {
            chkView && <Check setChkView={setChkView} setUsed={setUsed}></Check>
        }
        
        <div className="recommendBox contentEl">
            <div className="recommendContent contentInner">
                <div className="recommendHeader">
                        {
                            cookies.id ? <p><strong>{cookies.id}</strong>?????? ??????????????????</p> :
                                <p><strong>????????????  ????????? ??????????????????.</strong></p>
                        }
                </div>
                <div className="recommendBody">
                    {
                        !used && <div className="recommendUsedAlertPage">
                                    <div className="recommendUsedAlert">
                                        <p>???????????? ???????????? ????????????!</p>
                                        <div className="btnQuestion" onClick={()=>{
                                            setChkView(true)
                                        }}>?????? ??????</div>
                                    </div>
                                </div>
                    }
                        <div className="recommendItem"
                             style={{"backgroundImage": `url(${imgList[0]})`}}
                             onMouseEnter={() => {
                                 setRecItemFocus(!recItemFocus)
                             }}
                             onMouseLeave={() => {
                                 setRecItemFocus(!recItemFocus)
                             }}
                             onClick={() => {
                                 setMapView(true)
                                 setSup(1)
                             }}>
                            <div className="recommendItemText">
                                <p className="recommendItemTitle">?????????</p>
                                {recItemFocus && <p className="recommendItemInfo">#?????? #??????</p>}
                            </div>
                        </div>
                        <div className="recommendItem"
                             style={{"backgroundImage": `url(${imgList[1]})`}}
                             onMouseEnter={() => {
                                 setRecItemFocus(true)
                             }}
                             onMouseLeave={() => {
                                 setRecItemFocus(false)
                             }}
                             onClick={() => {
                                 setMapView(true)
                                 setSup(3)
                             }}>
                            <div className="recommendItemText">
                                <p className="recommendItemTitle">?????????</p>
                                {recItemFocus && <p className="recommendItemInfo">#?????? #??????</p>}
                            </div>
                        </div>
                        <div className="recommendItem"
                             style={{"backgroundImage": `url(${imgList[2]})`}}
                             onMouseEnter={() => {
                                 setRecItemFocus(!recItemFocus)
                             }}
                             onMouseLeave={() => {
                                 setRecItemFocus(!recItemFocus)
                             }}
                             onClick={() => {
                                 setMapView(true)
                                 setSup(0)
                             }}>
                            <div className="recommendItemText">
                                <p className="recommendItemTitle">?????????</p>
                                {recItemFocus && <p className="recommendItemInfo">#??????</p>}
                            </div>
                        </div>
                </div>
                <div className="recommendFooter"></div>
            </div>
        </div>
        <div className="cartBox contentEl">
            <div className="cartContent contentInner">
                <div className="cartHeader">
                    <div className="cartText">
                        <p className="cartTitle">{!connectInfo ? "?????? ????????? ????????????" : "??????"}</p>
                        <p className="cartPrice">
                            <strong>{connectInfo && connectInfo.leader}</strong>
                            { connectInfo && "?????????" }
                        </p>
                    </div>
                </div>
                <div className="cartBody">
                <p>{ connectInfo && connectInfo.title }</p>
                    <p>{ connectInfo && connectInfo.date }</p>
                </div>
                <div className="cartFooter">
                    <div className="btnPay btn"> ??? ???</div>
                    <div className="btnClear btn" onClick={()=>{
                        setConnectInfo(false)
                    }}>??? ???</div>
                </div>
            </div>
        </div>
        <div className="mapBox contentEl" onClick={()=>{
            setMapView(!mapView)
        }}>
            <div className="mapContent contentInner">
                <p className="mapTitle">???????????? ??????</p>
                <p className="mapText">????????? ???????????????<br/>????????? ????????? ???????????????</p>
                <div className="mapContentFooter">
                    <div className="btnMap">????????????</div>
                    <img src={mapLogo} alt="maplogo"/>
                </div>
            </div>
        </div>
    </div>)
}