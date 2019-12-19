import React from "react"
import styles from "./maps.module.scss"
import { Map, ImageOverlay, Marker, Popup, TileLayer } from 'react-leaflet'
import {CRS} from 'leaflet';

export default class Maps extends React.Component {
    render() {
        if (typeof window !== 'undefined') {
            return (
                <Map center={[0, 0]} zoom={0} crs={CRS.Simple} bounds={[[0,0],[-256,256]]}>
                    {/* <ImageOverlay url='factory_map.jpg' bounds={[[0,0], [1000,1400]]}></ImageOverlay> */}
                    <TileLayer url={'map_test/{z}/{x}/{y}.jpg'}></TileLayer>
                    <Marker position={[-128, 128]}>
                    <Popup>
                        A pretty CSS3 popup. <br/> Easily customizable.
                    </Popup>
                    </Marker>
                </Map>
            )
        }
        return null
    }
}

// 3869,2736