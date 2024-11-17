import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon,
} from "@ionic/react";
import React from "react";
import {Route} from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Map from "./Map";
import {homeSharp, mapSharp, person} from "ionicons/icons";

const Tabs: React.FC = () => {
    return (
    <IonTabs>
        <IonRouterOutlet>
            <Route path="/home" component={Home} />
            <Route path="/map" component={Map} />
            <Route path="/profile" component={Profile} />

        </IonRouterOutlet>
        <IonTabBar slot='bottom'>
            <IonTabButton tab='tab1' href='/home'>
                <IonIcon icon={homeSharp}></IonIcon>
                <IonLabel>Home</IonLabel>

            </IonTabButton>

            <IonTabButton tab='tab2' href='/map'>
                <IonIcon icon={mapSharp}></IonIcon>
                <IonLabel>Map</IonLabel>

            </IonTabButton>

            <IonTabButton tab='tab3' href='/profile'>
                <IonIcon icon={person}></IonIcon>
                <IonLabel>Profile</IonLabel>

            </IonTabButton>
        </IonTabBar>
    </IonTabs>
    )
}

export default Tabs