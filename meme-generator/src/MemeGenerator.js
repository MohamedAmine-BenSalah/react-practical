import React from "react";

class MemeGenerator extends React.Component{
    constructor(){
        super()
        this.state = {
             topText : "",
             bottomText :"",
             randomImage : "http://i.imgflip.com/1bij.jpg",
             allMemesImgs : []
             
        }
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount(){
       fetch('https://api.imgflip.com/get_memes')
       .then(response=>response.json())
       .then(response=>{
           const {memes} = response.data
           //Object destructuring 
           this.setState({
            allMemesImgs : memes
           })
           
       })
    }
    handleChange(event) {
        const {name,value} = event.target
        this.setState({
            [name] : value
        })
    }
    getRandomImg(event) {
        event.preventDefault()
        let randomIndex = Math.floor(Math.random()*this.state.allMemesImgs.length)
        let newImgUrl = this.state.allMemesImgs[randomIndex].url
            this.setState({
            randomImage : newImgUrl
        })
    }
    render() {
        return (
            <div>
                <form className="meme-form">

                <input type="text" name="topText" placeholder="Top Text" value={this.state.topText} onChange={this.handleChange} />
                <br/>
                <input type="text" name="bottomText" placeholder="Bottom Text" onChange={this.handleChange} value={this.state.bottomText} />



                <button onClick={this.getRandomImg.bind(this)} >Generate</button>
                
               
                </form>
                <div className="meme">
                    <img src={this.state.randomImage} alt="random" />
                    <h2 className="top" >{this.state.topText}</h2>
                    <h2 className="bottom"> {this.state.bottomText}</h2>

                </div>



            </div>
        )
    }
}

export default MemeGenerator