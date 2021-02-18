import React from "react"
import { Route } from "react-router-dom"
import { CatDetail } from "../components/Cats/CatDetails"
import { CatForm } from "../components/Cats/CatForm"
import { CatList } from "../components/Cats/CatsList"
import { CatProvider } from "../components/Cats/CatsProvider"
import { ChatProvider } from "./CatChat/ChatProvider"
import { UserProvider } from "./Users/UsersProvider"
import { ChatForm } from "./CatChat/ChatForm"
import { PieChart } from "./CatChat/Chart"
import { Navigation } from "./Cats/NavBar"




export const ApplicationViews = () => {
    return (
        <>
            <CatProvider>
                <UserProvider>
                    <ChatProvider>
                        <Route exact path="/cats">
                        <Navigation />

                        <section className="homePage" >
                            <div name="flexLeft"> 
                               <CatList />
                               </div>
                      <div className="flexRight">
                     
                            <PieChart />
                            </div>
                            </section>
                        </Route>

                        <Route path="/cats/detail/:catId(\d+)">
                            <CatDetail />
                            <ChatForm />
                        </Route>

                        <Route exact path="/cats/create">
                            <CatForm />
                        </Route>

                    </ChatProvider>
                </UserProvider>
            </CatProvider>















        </>
    )
}