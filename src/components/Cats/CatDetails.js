import React, { useContext, useEffect, useState } from "react"
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { useParams, useHistory } from "react-router-dom"
import { CatContext } from "./CatsProvider"
import Black from '../images/Black.png'

import { ChatContext } from "../CatChat/ChatProvider";
import { ChatCard } from "../CatChat/ChatCard";
import { UserContext } from "../Users/UsersProvider";
import { CatCard } from "./CatCard"
// import original from "../images/original.jpg"



export const CatDetail = () => {
  const { getCatById, deleteCat } = useContext(CatContext)
  const { chats, getChats, getChatById } = useContext(ChatContext)
  const { getUsersById } = useContext(UserContext)

  const [filteredChats, setFilteredChats] = useState([])

  const [cat, setCat] = useState({})

  const { catId } = useParams();
  //-------------------- FIND THE CATS TO DISPLAY BASED ON CAT ID (I.E. RELATED CHATS) ------------


  useEffect(() => {
    getCatById(catId)
    // console.log("this is my cat", catId)
      .then((response) => {
        // getChats(response.id)
        //   .then((chat) => {
        //     const filteredChatsByCat = chats.filter(chat => chat.catId === cat.id)
        //     setFilteredChats(filteredChats)
            
        //     debugger
        //   })
          setCat(response)
          console.log("mycat" ,response)
          

      })
  }, [])

  // cat.pic ? cat.pic : cat.pic=defaultCatPic
  if (cat.pic === "") {
    let defaultCatPic = Black
    cat.pic = defaultCatPic
}
  //-----------------HANDLE DELETE --------------------


  const history = useHistory();

  const handleRelease = () => {
    deleteCat(cat.id)
      .then(() => {
        history.push("/cats")
      })
  }

  //-------------------- DOM VIEW OF CAT DETAILS------------

  return (
    <section className="cat">
      <Card>
        <CardTitle tag="h5" className="cat__name">{cat.name}</CardTitle>
        {/* <CardImg top width="100%" src={images.blackCat.jpg}> </CardImg> */}
        <CardBody>
          <CardImg top width="20%" src={cat.pic}  className="catPic"></CardImg>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Location: {cat.zip}</CardSubtitle><div className="cat__zip"></div>
          <CardText className="cat__color">Color of Cat: {cat?.color}</CardText>
          {/* <div className="cat__adopter">Customer: {cat?.adopterId}</div> */}
          <div>
            <Button size="sm"
              className="btn btn-primary"
              onClick={handleRelease}>Delete Cat</Button>


          </div>
          <div className="chats">
            {cat.chats ? cat.chats.map(chat => {return <ChatCard key={chat.id} chat={chat} />}) : "no chats"}
           {/* { cat.chats.forEach(chat => {return <ChatCard key={chat.id} chat={chat} />})} */}
          </div>
        </CardBody>
      </Card>
    </section>
  )
}

