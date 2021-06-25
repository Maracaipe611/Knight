import React, { Component } from 'react';
import knight from '../src/Assets/knightImage.png'
import ferradura from '../src/Assets/ferradura.png'
import { sortBy, last } from 'lodash'
import { black, white } from 'chalk';

export default class Tabuleiro extends Component {
    constructor(props) {
        super();
        this.state = ({
            casaAtual: "D,8",
            movimentosPossiveis: [],
            alphabet: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
            movimento: { //Letra, index
                "norteDireita": [2, 1],
                "norteEsquerda": [2, -1],
                "sulDireita": [-2, 1],
                "sulEsquerda": [-2, -1],
                "lesteDireita": [1, 2],
                "lesteEsquerda": [1, -2],
                "oesteDireita": [-1, 2],
                "oesteEsquerda": [-1, -2],
            },
            casaCondenadas: [],
            historicoDeCasas: [],
            statusCavalo: "",
            ordenacaoTroterica: 0,
            semMovimentosPossiveis: false,
            highScore: 0,
        })
    }

    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    BlackSquare(id, position) {
        return (
            <div
                className="BlackSquare"
                style={{
                    backgroundColor: '#711a00',
                    width: 50,
                    height: 50,
                    color: white,
                    display: 'inline-grid',
                    fontSize: '7px',
                    textAlign: '-webkit-center',
                    alignItems: 'end'
                }}
                id={id + position}>
                {this.state.casaAtual === (position + "," + id) ? this.knightImage() : null}
                {this.state.historicoDeCasas?.map(x => x === (position + "," + id) ? this.ferraduraImage() : null)}
                {position + id}
            </div>
        )
    }

    WhiteSquare(id, position) {
        return (
            <div
                className="WhiteSquare"
                style={{
                    backgroundColor: 'white',
                    width: 50,
                    height: 50,
                    color: black,
                    display: 'inline-grid',
                    fontSize: '7px',
                    textAlign: '-webkit-center',
                    alignItems: 'end'
                }}
                id={id + position}>
                {this.state.casaAtual === (position + "," + id) ? this.knightImage() : null}
                {this.state.historicoDeCasas?.map(x => x === (position + "," + id) ? this.ferraduraImage() : null)}
                {position + id}
            </div>
        )
    }

    boardLineWhite(positionVertical) {
        return (
            <div className="Board"
            style={{display: 'grid'}}>
                {this.WhiteSquare("8", positionVertical, false)}
                {this.BlackSquare("7", positionVertical, false)}
                {this.WhiteSquare("6", positionVertical, false)}
                {this.BlackSquare("5", positionVertical, false)}
                {this.WhiteSquare("4", positionVertical, false)}
                {this.BlackSquare("3", positionVertical, false)}
                {this.WhiteSquare("2", positionVertical, false)}
                {this.BlackSquare("1", positionVertical, false)}
            </div>
        )
    }

    boardLineBlack(positionVertical) {
        return (
            <div className="Board"
            style={{display: 'grid'}}>
                {this.BlackSquare("8", positionVertical, false)}
                {this.WhiteSquare("7", positionVertical, false)}
                {this.BlackSquare("6", positionVertical, false)}
                {this.WhiteSquare("5", positionVertical, false)}
                {this.BlackSquare("4", positionVertical, false)}
                {this.WhiteSquare("3", positionVertical, false)}
                {this.BlackSquare("2", positionVertical, false)}
                {this.WhiteSquare("1", positionVertical, false)}
            </div>
        )
    }

    knightImage() {
        return (
            <div><img
                src={knight}
                alt={'Cavalo'}
                style={{ width: '30px', height: '30px', paddingTop: '10px' }} /></div>
        )
    }

    ferraduraImage() {
        return (
            <div><img
                src={ferradura}
                alt={'ferradura'}
                style={{ width: '30px', height: '30px', paddingTop: '10px' }} /></div>
        )
    }

    futuraCasaDesocupada(housePosition, houseIndex, movimentoPossivel) {
        let { alphabet, casaAtual, historicoDeCasas } = this.state;
        let futureHousePositionInNumber = movimentoPossivel[0] + housePosition;
        let futureHouseIndex = movimentoPossivel[1] + houseIndex;
        let futureHousePositionInLetter = alphabet[futureHousePositionInNumber];
        let joinHouses = `${futureHousePositionInLetter},${futureHouseIndex}`

        if (!!historicoDeCasas?.filter(x => x === joinHouses).length) {
            return false;
        }

        return true;
    }

    isItPossibleToMove(housePosition, houseIndex, movimentosPossiveis) {
        let { movimento } = this.state;
        if (movimento.norteDireita[0] + housePosition <= 7
            && movimento.norteDireita[0] + housePosition >= 0
            && movimento.norteDireita[1] + houseIndex <= 8
            && movimento.norteDireita[1] + houseIndex >= 1) {
            if (this.futuraCasaDesocupada(housePosition, houseIndex, movimento.norteDireita)) {
                movimentosPossiveis.push(movimento.norteDireita)
            }
        }
        if (movimento.norteEsquerda[0] + housePosition <= 7
            && movimento.norteEsquerda[0] + housePosition >= 0
            && movimento.norteEsquerda[1] + houseIndex <= 8
            && movimento.norteEsquerda[1] + houseIndex >= 1) {
            if (this.futuraCasaDesocupada(housePosition, houseIndex, movimento.norteEsquerda)) {
                movimentosPossiveis.push(movimento.norteEsquerda)
            }
        }
        if (movimento.sulDireita[0] + housePosition <= 7
            && movimento.sulDireita[0] + housePosition >= 0
            && movimento.sulDireita[1] + houseIndex <= 8
            && movimento.sulDireita[1] + houseIndex >= 1) {
            if (this.futuraCasaDesocupada(housePosition, houseIndex, movimento.sulDireita)) {
                movimentosPossiveis.push(movimento.sulDireita)
            }
        }
        if (movimento.sulEsquerda[0] + housePosition <= 7
            && movimento.sulEsquerda[0] + housePosition >= 0
            && movimento.sulEsquerda[1] + houseIndex <= 8
            && movimento.sulEsquerda[1] + houseIndex >= 1) {
            if (this.futuraCasaDesocupada(housePosition, houseIndex, movimento.sulEsquerda)) {
                movimentosPossiveis.push(movimento.sulEsquerda)
            }
        }
        if (movimento.lesteDireita[0] + housePosition <= 7
            && movimento.lesteDireita[0] + housePosition >= 0
            && movimento.lesteDireita[1] + houseIndex <= 8
            && movimento.lesteDireita[1] + houseIndex >= 1) {
            if (this.futuraCasaDesocupada(housePosition, houseIndex, movimento.lesteDireita)) {
                movimentosPossiveis.push(movimento.lesteDireita)
            }
        }
        if (movimento.lesteEsquerda[0] + housePosition <= 7
            && movimento.lesteEsquerda[0] + housePosition >= 0
            && movimento.lesteEsquerda[1] + houseIndex <= 8
            && movimento.lesteEsquerda[1] + houseIndex >= 1) {
            if (this.futuraCasaDesocupada(housePosition, houseIndex, movimento.lesteEsquerda)) {
                movimentosPossiveis.push(movimento.lesteEsquerda)
            }
        }
        if (movimento.oesteDireita[0] + housePosition <= 7
            && movimento.oesteDireita[0] + housePosition >= 0
            && movimento.oesteDireita[1] + houseIndex <= 8
            && movimento.oesteDireita[1] + houseIndex >= 1) {
            if (this.futuraCasaDesocupada(housePosition, houseIndex, movimento.oesteDireita)) {
                movimentosPossiveis.push(movimento.oesteDireita)
            }
        }
        if (movimento.oesteEsquerda[0] + housePosition <= 7
            && movimento.oesteEsquerda[0] + housePosition >= 0
            && movimento.oesteEsquerda[1] + houseIndex <= 8
            && movimento.oesteEsquerda[1] + houseIndex >= 1) {
            if (this.futuraCasaDesocupada(housePosition, houseIndex, movimento.oesteEsquerda)) {
                movimentosPossiveis.push(movimento.oesteEsquerda)
            }
        }
        return movimentosPossiveis;
    }

    async retroceder(numeracao) {
        let { casaAtual, historicoDeCasas} = this.state;
        let ultimaCasaPercorrida = last(historicoDeCasas);//H7

        if (!!casaAtual) {
            historicoDeCasas.pop();
            numeracao = numeracao - 1;
            await this.sleep(50)
            this.setState({
                historicoDeCasas,
                casaAtual: ultimaCasaPercorrida,
                ordenacaoTroterica: numeracao
            });
        } else {
            return this.setState({
                semMovimentosPossiveis: true
            });
        }

        this.moveHorse(numeracao)
    }

    verificarHighScore(numeracao)
    {
        if(numeracao >= this.state.highScore)
        {
            return this.setState({highScore: numeracao})
        }
    }

    async gallop(possibleMoves, housePosition, houseIndex, numeracao) {
        let { casaAtual, alphabet, casaCondenadas, historicoDeCasas } = this.state;
        let casaFutura = [];
        let quantidadeDeMovimentos = possibleMoves.length
        let movimentoFuturo;
        let antepenultima;
        /* Qual a lógica a ser seguida aqui?
            Dependendo da quantidade de movimentos possiveis,
            a preferencia do movimento, deve ser definido pelo movimento que tem mais chances de ter um movimento futuro.
        Exceto qnd existe apenas um único movimento */

        if (quantidadeDeMovimentos >= 1) {
            possibleMoves.forEach(element => {
                let futureHousePositionInNumber = element[0] + housePosition;
                let futureHouseIndex = element[1] + houseIndex;
                let futureHousePositionInLetter = alphabet[futureHousePositionInNumber];
                let joinHouses = `${futureHousePositionInLetter},${futureHouseIndex}`
                let futurePossibleMoves = []
                antepenultima = this.state.historicoDeCasas[this.state.historicoDeCasas.length - 3];
                if (!casaCondenadas?.filter(x => x.Antepenultima === antepenultima && x.IndoPara === joinHouses && x.SaindoDaCasa === casaAtual && x.Numeracao === numeracao + 1).length &&
                    !historicoDeCasas?.filter(x => x === joinHouses).length) {
                    casaFutura.push({ "Casa": joinHouses, "QuantidadeMovimentosFuturos": this.isItPossibleToMove(futureHousePositionInNumber, futureHouseIndex, futurePossibleMoves).length });
                    casaFutura = sortBy(casaFutura, ['QuantidadeMovimentosFuturos']).reverse();
                }
            });
            movimentoFuturo = casaFutura[0];
        }else if(numeracao >= 62)
        {
            return this.setState({
                semMovimentosPossiveis: true
            });
        }
        if (!!movimentoFuturo) {
            numeracao = numeracao + 1;
            let futuraCasaCondenada = {
                "Antepenultima": antepenultima,
                "SaindoDaCasa": casaAtual,
                "IndoPara": movimentoFuturo.Casa,
                "Numeracao": numeracao };
                await this.sleep(50)
                this.setState({
                    casaAtual: movimentoFuturo.Casa,
                    casaCondenadas: this.state.casaCondenadas.concat([futuraCasaCondenada]),
                    historicoDeCasas: this.state.historicoDeCasas.concat([casaAtual]),
                    ordenacaoTroterica: numeracao,
                })
            this.verificarHighScore(numeracao);
            this.rollScroll(document.getElementById("condenados"));
            return this.moveHorse(numeracao)
        }
        return this.retroceder(numeracao);
    }

    moveHorse(ordenacaoTroterica) {
        let { casaAtual, alphabet } = this.state

        let actuallyHouseSplitted = casaAtual.split(",");
        let housePosition = actuallyHouseSplitted[0];
        let houseIndex = parseInt(actuallyHouseSplitted[1]);
        let possibleMoves = [];

        housePosition = alphabet.indexOf(housePosition);
        possibleMoves = this.isItPossibleToMove(housePosition, houseIndex, possibleMoves);
        this.gallop(possibleMoves, housePosition, houseIndex, ordenacaoTroterica)
    }

    rollScroll(element) {
        element.scrollBy(0, element.scrollHeight);
    }

    retornarCondenadas(saindoDaCasa, indoPara, ordenacaoTroterica) {
        return (
            <h3 style={{ margin: '0 0 0 0' }}>{`${ordenacaoTroterica}º: ${saindoDaCasa} -> ${indoPara}`}</h3>
        );
    }

    componentDidMount() {
        this.moveHorse(this.state.ordenacaoTroterica);
    }

    render() {

        return (
            <div style={{ width: '100%', height: 400 }}>
                <div id='condenados' style={{
                    width: 210,
                    height: 400,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    textAlign: 'center',
                    border: '1px solid black',
                    display: 'inline-grid',
                    textOverflow: 'ellipsis', overflow: 'auto', whiteSpace: 'nowrap'
                }}>
                    <h4 style={{ display: 'contents' }}>Movimentos condenados</h4>
                    <div>
                        {this.state.casaCondenadas?.map(x => {
                            return this.retornarCondenadas(x.SaindoDaCasa, x.IndoPara, x.Numeracao)
                        })}
                    </div>
                </div>
                <div style={{
                    width: 400,
                    height: 400,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    textAlign: 'center',
                    border: '1px solid black',
                    display: 'inline-flex',
                    position: 'absolute'
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
                <div style={{
                    width: 200,
                    height: 400,
                    marginLeft: '400px',
                    marginRight: 'auto',
                    textAlign: 'center',
                    border: '1px solid black',
                    display: 'inline-flex',
                    overflow: 'hidden'
                }}>
                    <h4 style={{ display: 'contents' }}>Histórico de Movimentos: {this.state.historicoDeCasas?.map(x => { return `${x} ->` })}</h4>
                </div>
                {this.state.semMovimentosPossiveis ?
                    <div><h1>Não existem mais movimentos possíveis!</h1></div>
                    :
                    null
                }
                <div><h4>
                    Maior sequência: {this.state.highScore}
                    </h4>
                </div>
            </div>
        )
    }
}