import React, { Component } from 'react';

export default class Tabuleiro extends Component {
    constructor(props) {
        super();
    }

    BlackSquare(id, position, knight) {

        return (
            <div
                className="BlackSquare"
                style={{
                    backgroundColor: 'black',
                    width: 50,
                    height: 50,
                    color: 'white'
                }}
                id={id}>
                    {id + position}

            </div>
        )
    }

    WhiteSquare(id, position, knight) {
        return (
            <div
                className="WhiteSquare"
                style={{
                    backgroundColor: 'white',
                    width: 50,
                    height: 50
                }}
                id={id}>
                    {id + position}
            </div>
        )
    }

    boardLineWhite(positionVertical){
        return(
            <div className="Board">
                {this.WhiteSquare("8", positionVertical, false)}
                {this.BlackSquare("7",positionVertical ,false)}
                {this.WhiteSquare("6",positionVertical ,false)}
                {this.BlackSquare("5",positionVertical ,false)}
                {this.WhiteSquare("4",positionVertical ,false)}
                {this.BlackSquare("3",positionVertical ,false)}
                {this.WhiteSquare("2",positionVertical ,false)}
                {this.BlackSquare("1",positionVertical ,false)}
            </div>
        )
    }

    boardLineBlack(positionVertical){
        return(
            <div className="Board">
                {this.BlackSquare("8",positionVertical ,false)}
                {this.WhiteSquare("7",positionVertical ,false)}
                {this.BlackSquare("6",positionVertical ,false)}
                {this.WhiteSquare("5",positionVertical ,false)}
                {this.BlackSquare("4",positionVertical ,false)}
                {this.WhiteSquare("3",positionVertical ,false)}
                {this.BlackSquare("2",positionVertical ,false)}
                {this.WhiteSquare("1",positionVertical ,false)}
            </div>
        )
    }

    render() {
        return (
            <div style={{
                width: 400,
                height: 400,
                marginLeft: 'auto',
                marginRight: 'auto',
                textAlign: 'center',
                border: '1px solid black',
                display: 'inline-flex'
                }}>
                    {this.boardLineWhite("A")}
                    {this.boardLineBlack("B")}
                    {this.boardLineWhite("C")}
                    {this.boardLineBlack("D")}
                    {this.boardLineWhite("E")}
                    {this.boardLineBlack("F")}
                    {this.boardLineWhite("G")}
                    {this.boardLineBlack("H")}
            </div>
        )
    }
}