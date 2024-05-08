import React, { useEffect, useState } from "react";
import "../css/styles.css"
import Quote from "./Quote"
import Btn from "./Btn"
import { colors } from "@mui/material";

function App() {
    const [quote, setQuote] = useState([]);
    const [newQuote, setNewQuote] = useState("");
    const [authName,setAuthName] = useState('');
    const [errorMesg,setErrorMesg] = useState('');
    const [randomColorStyle, setRandomColorStyle] = useState({
        backgroundColor: "black",
        color: "black"
    });


    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var randomColor = '#';
        for (var i = 0; i < 6; i++) {
            randomColor += letters[Math.floor(Math.random() * 16)];
        }
        setRandomColorStyle({
            backgroundColor: randomColor,
            color: randomColor
        })
    }

    useEffect(() => {
        getRandomColor();
        let cleanFetch;
        if(authName===''){
            cleanFetch = fetch("https://api.quotable.io/random")
                .then(res => res.json())
                .then(
                    (quote) => {
                        setErrorMesg("");
                        setQuote(quote)
                    }
                )
        }
        else{
                cleanFetch = fetch(`https://api.quotable.io/random?author=${authName}`)
                    .then(res => res.json())
                    .then(
                        (quote) => {
                            console.log(quote);
                            if(quote.statusCode===404){
                                setErrorMesg("Author not found");
                                setQuote('');
                            }
                            else{
                                setErrorMesg("");
                                setQuote(quote);
                            }
                            
                        }
                    )
        }
        return () => clearInterval(cleanFetch);

    }, [newQuote]);

    return (
        <div className="container" style={randomColorStyle} >
            <div className="inputContainer">
                <input className="searchInput" type='search' placeholder="enter author" value={authName} onChange={(event) => setAuthName(event.target.value)} />
                <p id="error-mesg" style={{color:'red'}}>{errorMesg}</p>
            </div>
            <div id="quote-box" >
                <Quote key={quote._id} quote={quote} />
                <div className="icon-box">
                    <Btn text={"New quote"} id={"new-quote"} onCall={setNewQuote} randomColor={randomColorStyle.color} />
                </div>
            </div>
        </div>
    );
}

export default App;