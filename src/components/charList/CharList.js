import './charList.scss';
import { Component } from 'react';

import MarvelService from '../../services/MarvelService';

class CharList extends Component {

    constructor(props){
        super(props)
        this.state = {
            charItems: [],
        }
    }

    renderCharItem = (characters) => {
        this.setState({
            charItems : characters.map(({name, thumbnail, id}) => {

                const styleImageChar = thumbnail.includes('image_not_available') ? {objectFit: 'contain'} : null;

                return (
                    <li className="char__item" 
                        key={id}
                        onClick={() => this.props.onCharSelected(id)}>
                        <img src={thumbnail} alt="icon-char" style={styleImageChar}/>
                        <div className="char__name">{name}</div>
                    </li>
                )
            })
        })
    }

    render(){
        
        const marvelService = new MarvelService;

        marvelService.getAllCharacters().then(this.renderCharItem);

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {this.state.charItems}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;