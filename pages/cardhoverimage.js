import React from 'react';

class CardHoverImage extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'CardHoverImage';
        // 1. bind your functions in the constructor.
        this.mouseOver = this.mouseOver.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
        this.state = {
            hover: false
        };
        if(this.props.setCode == "MMQ") {
            this.props.setCode = "MM"
        }
    }
    imgStyles = {
        position:"absolute",
      };

    // 2. bind it with fat arrows.
    mouseOver = () => {
        this.setState({hover: true});
    }
    mouseOut() {
        this.setState({hover: false});
    }
    render() {
      const { item, i } = this.props;
        // 3. bind them in the render method (not recommended for performance reasons)
        return (
            <a href="#" onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)}>{this.props.cardName}
            {this.state.hover ? (<img src={"https://tcgplayer-cdn.tcgplayer.com/product/" + this.props.productId + "_200w.jpg"} style={this.imgStyles}/>) : null}       
            </a>
        )
    }
}


export default CardHoverImage;